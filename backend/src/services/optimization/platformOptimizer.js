function comparePlatforms(cartItems) {

    let blinkitTotal = 0;
    let zeptoTotal = 0;

    for (const item of cartItems) {

        blinkitTotal += item.blinkitPrice;

        zeptoTotal += item.zeptoPrice;
    }

    let recommendation;
    let savings;

    if (blinkitTotal < zeptoTotal) {

        recommendation = "Blinkit";

        savings =
            zeptoTotal - blinkitTotal;

    } else if (
        zeptoTotal < blinkitTotal
    ) {

        recommendation = "Zepto";

        savings =
            blinkitTotal - zeptoTotal;

    } else {

        recommendation = "Same Price";

        savings = 0;
    }

    return {
        recommendation,
        blinkitTotal,
        zeptoTotal,
        savings
    };
}

module.exports = {
    comparePlatforms
};