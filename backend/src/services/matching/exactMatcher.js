function findExactProduct(
    selectedProduct,
    products
) {

    const selected =

        selectedProduct
            .toLowerCase();


    const exactMatch =

        products.find(
            product =>

                product.name
                    .toLowerCase()
                    .includes(
                        selected
                    )
        );


    return exactMatch || null;
}


module.exports = {
    findExactProduct
};