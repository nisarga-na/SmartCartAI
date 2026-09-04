const { searchBlinkit } =
    require("../connectors/blinkitConnector");

const { searchZepto } =
    require("../connectors/zeptoConnector");



const searchSessionCache =
    require("../utils/searchSessionCache");

const {
    groupProducts
} = require(
    "../engine/product/groupProducts"
);


async function searchProductCandidates(
    query
) {

    // Clear previous search cache

    for (
        const key
        in searchSessionCache
    ) {

        delete searchSessionCache[
            key
        ];
    }


    const results =
        await Promise.allSettled([

            searchBlinkit(query),

            searchZepto(query)
            

        ]);


    const blinkit =

        results[0].status === "fulfilled"

            ? results[0].value

            : [];


    const zepto =

        results[1].status === "fulfilled"

            ? results[1].value

            : [];

    


    console.log(
        "BLINKIT RAW:"
    );

    console.log(
        blinkit
    );


    console.log(
        "ZEPTO RAW:"
    );

    console.log(
        zepto
    );

    
   
    const combined = [

        ...blinkit,

        ...zepto

       

    ];


    console.log(
        "COMBINED:"
    );

    console.log(
        combined
    );


    // --------------------------
    // NEW PRODUCT INTELLIGENCE
    // --------------------------

    const groups =
        groupProducts(
            combined
        );


    console.log(
        "GROUPS:"
    );

    console.dir(
        groups,
        {
            depth: null
        }
    );


    const response = [];


    for (

        let i = 0;

        i < groups.length &&
        i < 40;

        i++

    ) {

        const group =
            groups[i];


        const tempId =

            "t_" +

            Date.now() +

            "_" +

            i;


        // Store complete group

        searchSessionCache[
            tempId
        ] = {

            reference:
                group.reference,

            products:
                group.products

        };


        response.push({

            id:
                tempId,

            name:
                group.reference.originalName

        });

    }


    console.log(
        "SEARCH CACHE:"
    );

    console.dir(
        searchSessionCache,
        {
            depth: null
        }
    );


    console.log(
        "FINAL RESPONSE:"
    );

    console.log(
        response
    );


    return response;

}


module.exports = {

    searchProductCandidates

};