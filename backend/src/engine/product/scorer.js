const RULES = {

    tokenWeight: 50,

quantityWeight: 25,

unitWeight: 15,

packWeight: 10,

threshold: 65

};


function calculateScore(

    similarity,

    fp1,

    fp2

) {

    let score = 0;

    const reasons = [];


    // ------------------------
    // Quantity
    // ------------------------

    if (

        fp1.quantity === fp2.quantity

    ) {

        score += RULES.quantityWeight;

        reasons.push(

            "Quantity matched"

        );

    }


    // ------------------------
    // Unit
    // ------------------------

    if (

        fp1.unit === fp2.unit

    ) {

        score += RULES.unitWeight;

        reasons.push(

            "Unit matched"

        );

    }


    // ------------------------
    // Pack Count
    // ------------------------

    if (

        fp1.packCount === fp2.packCount

    ) {

        score += RULES.packWeight;

        reasons.push(

            "Pack matched"

        );

    }


    // ------------------------
    // Token Similarity
    // ------------------------

    score +=

        similarity.score *

        RULES.tokenWeight;


    reasons.push(

        `${similarity.common.length} important tokens matched`

    );


    return {

        score:

            Number(

                score.toFixed(2)

            ),

        reasons

    };

}


module.exports = {

    RULES,

    calculateScore

};