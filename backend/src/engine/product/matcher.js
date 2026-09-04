const {
    similarity
} = require("./similarity");

const {
    calculateScore,
    RULES
} = require("./scorer");


function matchProducts(
    productA,
    productB
) {

    const fp1 =
        productA.fingerprint;

    const fp2 =
        productB.fingerprint;


    //----------------------------------
    // BRAND CHECK
    //----------------------------------

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


    //----------------------------------
    // EXACT FINGERPRINT
    //----------------------------------

    if (
        fp1.key === fp2.key
    ) {

        return {

            isMatch: true,

            score: 100,

            matchedTokens:
                fp1.tokens,

            reasons: [

                "Exact fingerprint match"

            ]

        };

    }


    //----------------------------------
    // TOKEN SIMILARITY
    //----------------------------------

    const similarityResult =

        similarity(

            fp1.tokens,

            fp2.tokens

        );


    //----------------------------------
    // SCORE
    //----------------------------------

    const scoreResult =

        calculateScore(

            similarityResult,

            fp1,

            fp2

        );


    return {

        isMatch:

            scoreResult.score >=
            RULES.threshold,

        score:
            scoreResult.score,

        matchedTokens:

            similarityResult.common,

        reasons:

            scoreResult.reasons

    };

}


module.exports = {

    matchProducts

};