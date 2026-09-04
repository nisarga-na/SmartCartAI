const productCache =
    require("../utils/productCache");

const {
    optimizeCart
} = require(
    "./optimization/hybridOptimizer"
);


async function processSingleProduct(
    cartItem
) {

    const productId =
        cartItem.productId;

    const quantity =
        cartItem.quantity;


    // read from cache

    console.log(
    "LOOKING FOR:",
    productId
);

console.log(
    "CURRENT PRODUCT CACHE:"
);

console.dir(
    productCache,
    {
        depth: null
    }
);

const cachedProduct =

    productCache[
        productId
    ];


    if (
        !cachedProduct
    ) {

        console.log(
            "Product missing from cache"
        );

        return null;
    }


    return {

        product:
            cachedProduct.name,

        quantity,


        blinkitAvailable:

            cachedProduct
                .blinkitPrice !== null,


        zeptoAvailable:

            cachedProduct
                .zeptoPrice !== null,


        blinkitPrice:

            cachedProduct
                .blinkitPrice !== null

                ? cachedProduct
                    .blinkitPrice *
                  quantity

                : null,


        zeptoPrice:

            cachedProduct
                .zeptoPrice !== null

                ? cachedProduct
                    .zeptoPrice *
                  quantity

                : null
    };
}



async function searchProducts(
    cart
) {

    const tasks =
        cart.map(
            processSingleProduct
        );


    const results =
        await Promise.all(
            tasks
        );


    const validItems =
        results.filter(
            item =>
                item !== null
        );


    console.log(
        "OPTIMIZE USING CACHE:"
    );

    console.log(
        validItems
    );


    const optimized =
        optimizeCart(
            validItems
        );


    return {

        comparedProducts:
            validItems,

        ...optimized
    };
}


module.exports = {
    searchProducts
};