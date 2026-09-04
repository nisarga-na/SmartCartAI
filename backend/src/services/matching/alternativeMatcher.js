function findClosestAlternative(
    selectedProduct,
    products
) {

    let bestMatch = null;

    let highestScore = 0;


    const selectedWords =

        selectedProduct
            .toLowerCase()
            .split(" ");


    for (
        const product
        of products
    ) {

        const productWords =

            product.name
                .toLowerCase()
                .split(" ");


        const commonWords =

            selectedWords.filter(
                word =>

                    productWords.includes(
                        word
                    )
            );


        const score =
            commonWords.length;


        if (
            score >
            highestScore
        ) {

            highestScore =
                score;

            bestMatch =
                product;
        }
    }


    return bestMatch;
}


module.exports = {
    findClosestAlternative
};