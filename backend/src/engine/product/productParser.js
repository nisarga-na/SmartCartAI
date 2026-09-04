const {
    removeStopWords
} = require("./stopWords");

const {
    normalizeQuantity
} = require("./unitNormalizer");

const {
    createFingerprintKey
} = require("./fingerprint");

const {
    extractBrand
} = require("./brandExtractor");


function extractQuantity(text) {

    if (!text) {

        return {

            quantity: null,

            unit: null

        };

    }

    const match =
        text.match(
            /(\d+(\.\d+)?)\s*(kg|g|gm|ml|l|ltr|litre|litres)/i
        );

    if (!match) {

        return {

            quantity: null,

            unit: null

        };

    }

    return {

        quantity: Number(match[1]),

        unit: match[3].toLowerCase()

    };

}


function extractPackCount(text) {

    if (!text)
        return 1;

    const match =
        text.match(
            /pack\s*of\s*(\d+)/i
        );

    return match
        ? Number(match[1])
        : 1;

}


function parseProduct(product) {

    // -------------------------
    // Try extracting quantity from product name
    // -------------------------

    let {

        quantity,

        unit

    } = extractQuantity(

        product.name

    );

    // -------------------------
    // If not found, try packSize
    // (Needed for Zepto)
    // -------------------------

    if (

        quantity === null &&

        product.packSize

    ) {

        const extracted =

            extractQuantity(

                product.packSize

            );

        quantity =

            extracted.quantity;

        unit =

            extracted.unit;

    }

    const normalized =

        normalizeQuantity(

            quantity,

            unit

        );

    const brand =

        extractBrand(

            product.name

        );

    const rawTokens =

        removeStopWords(

            product.name

                .replace(
                    /\b\d+(\.\d+)?\s*(kg|g|gm|ml|l|ltr|litre|litres)\b/gi,
                    " "
                )

                .replace(/[^a-zA-Z ]/g, " ")

                .split(/\s+/)

                .filter(Boolean)

        )

        .map(

            token => token.toLowerCase()

        );

    const brandWords =

        brand.split(" ");

    const tokens =

        rawTokens.filter(

            token =>

                !brandWords.includes(token)

        );

    const fingerprint = {

        brand,

        tokens,

        quantity:

            normalized.quantity,

        unit:

            normalized.unit,

        packCount:

            extractPackCount(

                product.packSize ||

                product.name

            )

    };

    fingerprint.key =

        createFingerprintKey(

            fingerprint

        );

    return {

        originalName:

            product.name,

        fingerprint,

        platform:

            product.platform,

        price:

            product.price

    };

}

module.exports = {

    parseProduct

};