function optimizeCart(matchedProducts) {

    let totalCost = 0;

    const optimizedCart = [];

    for (const item of matchedProducts) {

        let cheapestPlatform;
        let cheapestPrice;

        if (item.blinkitPrice <
            item.zeptoPrice) {

            cheapestPlatform =
                "Blinkit";

            cheapestPrice =
                item.blinkitPrice;

        } else if (
            item.zeptoPrice <
            item.blinkitPrice
        ) {

            cheapestPlatform =
                "Zepto";

            cheapestPrice =
                item.zeptoPrice;

        } else {

            cheapestPlatform =
                "Same Price";

            cheapestPrice =
                item.blinkitPrice;
        }

        totalCost += cheapestPrice;

        optimizedCart.push({

            product: item.product,

            cheapestPlatform,

            cheapestPrice
        });
    }

    return {
        optimizedCart,
        totalCost
    };
}

module.exports = {
    optimizeCart
};