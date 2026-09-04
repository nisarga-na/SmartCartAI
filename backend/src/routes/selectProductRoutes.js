const express = require("express");

const router = express.Router();

const productCache =
    require("../utils/productCache");

const searchSessionCache =
    require(
        "../utils/searchSessionCache"
    );


router.post(
    "/",
    async (req, res) => {

        try {

            const tempId =
                req.body.tempId;

            const productData =
                searchSessionCache[
                    tempId
                ];

            if (!productData) {

                return res
                    .status(404)
                    .json({

                        error:
                            "Product not found in search cache"
                    });
            }

            const productId =
                "p_" +
                Date.now();

            //--------------------------------
            // Extract platform prices
            //--------------------------------

            const blinkitProduct =

                productData.products.find(

                    product =>

                        product.platform ===
                        "Blinkit"
                );

            const zeptoProduct =

                productData.products.find(

                    product =>

                        product.platform ===
                        "Zepto"
                );

            //--------------------------------
            // Store final product
            //--------------------------------

            productCache[
                productId
            ] = {

                name:

                    productData.reference
                        .originalName,

                blinkitPrice:

                    blinkitProduct
                        ? blinkitProduct.price
                        : null,

                zeptoPrice:

                    zeptoProduct
                        ? zeptoProduct.price
                        : null
            };

            console.log(
                "Product Cache:"
            );

            console.dir(
                productCache,
                {
                    depth: null
                }
            );

            res.json({
                productId
            });
        }

        catch (error) {

            console.error(
                error
            );

            res.status(500).json({

                error:
                    "Select Product Failed"
            });
        }
    }
);

module.exports = router;