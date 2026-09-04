function parseProductName(
    productName
) {

    const name =

        productName
            .toLowerCase();


    // ---------- FIND QUANTITY ----------

    let quantity = null;

    let unit = null;


    // matches:
    // 500 ml
    // 1 ltr
    // 100 g
    // 2 kg

    const quantityMatch =

        name.match(

            /(\d+)\s?(ml|ltr|l|litre|kg|g|gm)/i
        );


    if (quantityMatch) {

        quantity =

            Number(
                quantityMatch[1]
            );


        unit =
            quantityMatch[2]
                .toLowerCase();
    }


    // ---------- NORMALIZE UNITS ----------


    // litres → ml

    if (

        unit === "ltr" ||

        unit === "l" ||

        unit === "litre"
    ) {

        quantity =
            quantity * 1000;

        unit = "ml";
    }


    // kg → grams

    if (
        unit === "kg"
    ) {

        quantity =
            quantity * 1000;

        unit = "g";
    }


    // gm → g

    if (
        unit === "gm"
    ) {

        unit = "g";
    }


    // ---------- REMOVE QUANTITY FROM NAME ----------

    const cleanName =

        name.replace(

            /(\d+)\s?(ml|ltr|l|litre|kg|g|gm)/i,

            ""
        )


        .replace(
            /\s+/g,
            " "
        )


        .trim();


    return {

        originalName:
            productName,

        cleanName,

        quantity,

        unit
    };
}


module.exports = {
    parseProductName
};