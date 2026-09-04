function intersection(a, b) {

    return a.filter(

        token =>

            b.includes(token)

    );

}


function compareProducts(a, b) {

    const fp1 = a.fingerprint;

    const fp2 = b.fingerprint;

    //------------------------------------
// Brand Check
//------------------------------------

if (

    fp1.brand !== fp2.brand

) {

    return {

        isMatch: false,

        score: 0,

        matchedTokens: [],

        reasons: [

            "Different brands"

        ]

    };

}


    let score = 0;

    const reasons = [];


    //----------------------------------
    // Quantity
    //----------------------------------

    if (

        fp1.quantity === fp2.quantity

    ) {

        score += 30;

        reasons.push(

            "Quantity matched"

        );

    }

    else {

        return {

            isMatch: false,

            score: 0,

            reasons: [

                "Quantity mismatch"

            ]

        };

    }


    //----------------------------------
    // Unit
    //----------------------------------

    if (

        fp1.unit === fp2.unit

    ) {

        score += 20;

        reasons.push(

            "Unit matched"

        );

    }

    else {

        return {

            isMatch: false,

            score: 0,

            reasons: [

                "Unit mismatch"

            ]

        };

    }


    //----------------------------------
    // Pack Count
    //----------------------------------

    if (

        fp1.packCount === fp2.packCount

    ) {

        score += 10;

        reasons.push(

            "Pack matched"

        );

    }


    //----------------------------------
    // Token Similarity
    //----------------------------------

    const common =

        intersection(

            fp1.tokens,

            fp2.tokens

        );


    const similarity =

        common.length /

        Math.max(

            fp1.tokens.length,

            fp2.tokens.length

        );


    score +=

        similarity * 40;


    reasons.push(

        `${common.length} important tokens matched`

    );


    return {

        isMatch:

            score >= 80,

        score:

            Number(

                score.toFixed(2)

            ),

        matchedTokens:

            common,

        reasons

    };

}

module.exports = {

    compareProducts

};