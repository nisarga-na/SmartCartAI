function optimizeCart(products) {

    let blinkitOnly = 0;
    let zeptoOnly = 0;

    let blinkitPossible = true;
    let zeptoPossible = true;


    // PURE STRATEGIES

    for (const item of products) {

        if (
            item.blinkitAvailable
        ) {

            blinkitOnly +=
                item.blinkitPrice;
        }

        else {

            blinkitPossible =
                false;
        }


        if (
            item.zeptoAvailable
        ) {

            zeptoOnly +=
                item.zeptoPrice;
        }

        else {

            zeptoPossible =
                false;
        }
    }


    // HYBRID

    let cheapestMix = 0;

    const mixedCart = [];


    for (const item of products) {


        // both available

        if (
            item.blinkitAvailable &&
            item.zeptoAvailable
        ) {

            if (
                item.blinkitPrice <=
                item.zeptoPrice
            ) {

                cheapestMix +=
                    item.blinkitPrice;

                mixedCart.push({

                    product:
                        item.product,

                    platform:
                        "Blinkit"
                });
            }

            else {

                cheapestMix +=
                    item.zeptoPrice;

                mixedCart.push({

                    product:
                        item.product,

                    platform:
                        "Zepto"
                });
            }
        }


        // only Blinkit

        else if (
            item.blinkitAvailable
        ) {

            cheapestMix +=
                item.blinkitPrice;

            mixedCart.push({

                product:
                    item.product,

                platform:
                    "Blinkit"
            });
        }


        // only Zepto

        else if (
            item.zeptoAvailable
        ) {

            cheapestMix +=
                item.zeptoPrice;

            mixedCart.push({

                product:
                    item.product,

                platform:
                    "Zepto"
            });
        }
    }


    // recommendation

    let recommendation =
        "Cheapest Mix";


    if (

        blinkitPossible &&

        blinkitOnly < cheapestMix
    ) {

        recommendation =
            "Blinkit Only";
    }


    else if (

        zeptoPossible &&

        zeptoOnly < cheapestMix
    ) {

        recommendation =
            "Zepto Only";
    }


    return {

        recommendation,

        strategies: {

            blinkitOnly:

                blinkitPossible

                    ? blinkitOnly

                    : null,


            zeptoOnly:

                zeptoPossible

                    ? zeptoOnly

                    : null,


            cheapestMix
        },

        mixedCart
    };
}


module.exports = {
    optimizeCart
};