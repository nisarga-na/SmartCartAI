import re

from app.model import model
from sklearn.metrics.pairwise import cosine_similarity


MATCH_THRESHOLD = 0.75


def product_text(product):

    return (
        product.get("name", "")
        + " "
        + product.get("packSize", "")
    )


def extract_total_quantity(text):

    text = text.lower()

    # Detect patterns like:
    # 2 x 200 ml
    # 2x200ml
    # 3 x 500 g
    multipack = re.search(
        r"(\d+)\s*x\s*(\d+(?:\.\d+)?)\s*"
        r"(kg|g|gm|mg|l|ltr|litre|litres|ml)",
        text
    )

    if multipack:

        count = float(multipack.group(1))
        value = float(multipack.group(2))
        unit = multipack.group(3)

        value *= count

    else:

        single = re.search(
            r"(\d+(?:\.\d+)?)\s*"
            r"(kg|g|gm|mg|l|ltr|litre|litres|ml)",
            text
        )

        if not single:
            return None

        value = float(single.group(1))
        unit = single.group(2)

    if unit == "kg":
        value *= 1000
        unit = "g"

    elif unit == "gm":
        unit = "g"

    elif unit in [
        "l",
        "ltr",
        "litre",
        "litres"
    ]:
        value *= 1000
        unit = "ml"

    return value, unit


def quantities_compatible(name1, name2):

    q1 = extract_total_quantity(name1)
    q2 = extract_total_quantity(name2)

    if q1 is None or q2 is None:
        return True

    return q1 == q2


def find_matches(
    blinkit_products,
    zepto_products
):

    blinkit_names = [
        product_text(product)
        for product in blinkit_products
    ]

    zepto_names = [
        product_text(product)
        for product in zepto_products
    ]

    blinkit_embeddings = model.encode(
        blinkit_names
    )

    zepto_embeddings = model.encode(
        zepto_names
    )

    similarity_matrix = cosine_similarity(
        blinkit_embeddings,
        zepto_embeddings
    )

    matches = []

    used_zepto = set()

    for i, blinkit_product in enumerate(
        blinkit_products
    ):

        ranked_indices = (
            similarity_matrix[i]
            .argsort()[::-1]
        )

        for best_index in ranked_indices:

            similarity = float(
                similarity_matrix[i][best_index]
            )

            if similarity < MATCH_THRESHOLD:
                break

            if best_index in used_zepto:
                continue

            zepto_product = zepto_products[
                best_index
            ]

            if not quantities_compatible(
                product_text(
                    blinkit_product
                ),
                product_text(
                    zepto_product
                )
            ):
                continue

            matches.append({
                "blinkit": blinkit_product,
                "zepto": zepto_product,
                "similarity": similarity
            })

            used_zepto.add(best_index)

            break

    return matches