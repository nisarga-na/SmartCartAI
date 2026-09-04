const express = require("express");

const router = express.Router();

const {
    searchProductCandidates
} = require("../services/productSearch");


router.get("/", async (req, res) => {

    try {

        const query =
            req.query.q;

        const products =
            await searchProductCandidates(
                query
            );

        res.json({
            products
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error:
                "Product Search Failed"
        });
    }
});


module.exports = router;