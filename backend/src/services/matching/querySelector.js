const {
    scoreProduct
} = require(
    "../scoring/qualityScorer"
);


function selectBestProduct(
    products,
    preference
) {

    if (
        !products ||
        products.length === 0
    ) {
        return null;
    }


    // BUDGET MODE
    if (
        preference === "budget"
    ) {

        return products.reduce(
            (cheapest, item) =>

                item.price <
                cheapest.price

                    ? item

                    : cheapest
        );
    }


    // PREMIUM MODE
    if (
        preference === "premium"
    ) {

        return products.reduce(
            (best, item) => {

                const currentScore =
                    scoreProduct(
                        item.name
                    );

                const bestScore =
                    scoreProduct(
                        best.name
                    );

                return currentScore >
                    bestScore

                    ? item

                    : best;
            }
        );
    }


    // BALANCED MODE
    // quality / price ratio

    return products.reduce(
        (best, item) => {

            const currentRatio =

                scoreProduct(
                    item.name
                ) /

                item.price;


            const bestRatio =

                scoreProduct(
                    best.name
                ) /

                best.price;


            return currentRatio >
                bestRatio

                ? item

                : best;
        }
    );
}


module.exports = {
    selectBestProduct
};