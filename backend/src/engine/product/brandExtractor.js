function extractBrand(productName) {

    if (!productName) {

        return null;

    }

    const words =

        productName
            .toLowerCase()
            .trim()
            .split(/\s+/);

    // Brand = first one or two words

    if (words.length >= 2) {

        // Handle brands like:
        // Mother Dairy
        // Milky Mist
        // Sid's Farm

        const twoWordBrands = [

            "mother dairy",
            "milky mist",
            "sids farm",
            "sid's farm",
            "country delight"

        ];

        const firstTwo =

            words[0] + " " + words[1];

        if (

            twoWordBrands.includes(firstTwo)

        ) {

            return firstTwo;

        }

    }

    return words[0];

}

module.exports = {

    extractBrand

};