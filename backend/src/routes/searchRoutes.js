const express = require("express");

const router = express.Router();

const {
    searchProducts
} = require("../services/searchAggregator");


// POST request now
router.post("/", async (req, res) => {

    try {

        // receive cart from frontend
        const cart =
            req.body.cart;

        const results =
            await searchProducts(
                cart
            );

        res.json(results);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error:
                "Search Failed"
        });
    }
});


module.exports = router;