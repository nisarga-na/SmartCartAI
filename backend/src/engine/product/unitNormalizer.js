function normalizeQuantity(quantity, unit) {

    if (quantity == null || unit == null) {

        return {

            quantity: null,

            unit: null

        };

    }

    unit = unit.toLowerCase();

    if (unit === "kg") {

        return {

            quantity: quantity * 1000,

            unit: "g"

        };

    }

    if (unit === "g" || unit === "gm") {

        return {

            quantity,

            unit: "g"

        };

    }

    if (

        unit === "l" ||

        unit === "ltr" ||

        unit === "litre" ||

        unit === "litres"

    ) {

        return {

            quantity: quantity * 1000,

            unit: "ml"

        };

    }

    if (unit === "ml") {

        return {

            quantity,

            unit: "ml"

        };

    }

    return {

        quantity,

        unit

    };

}

module.exports = {

    normalizeQuantity

};