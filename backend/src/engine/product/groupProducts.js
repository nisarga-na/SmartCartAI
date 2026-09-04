const {
    parseProduct
} = require("./productParser");

const {
    matchProducts
} = require("./matcher");


function groupProducts(products) {

    const groups = [];


    for (

        const product

        of products

    ) {

        const parsed =

            parseProduct(product);


        let found = false;


        for (

            const group

            of groups

        ) {

            const result =

                matchProducts(

                    parsed,

                    group.reference

                );


            if (

                result.isMatch

            ) {

                group.products.push(

                    product

                );

                found = true;

                break;
            }

        }


        if (!found) {

            groups.push({

                reference:

                    parsed,

                products: [

                    product

                ]

            });

        }

    }


    return groups;

}


module.exports = {

    groupProducts

};