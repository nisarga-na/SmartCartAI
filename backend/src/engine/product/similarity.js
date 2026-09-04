function intersection(tokens1, tokens2) {

    return tokens1.filter(

        token => tokens2.includes(token)

    );

}

function similarity(tokens1, tokens2) {

    const common = intersection(
        tokens1,
        tokens2
    );

    const score =

        common.length /

        Math.max(
            tokens1.length,
            tokens2.length
        );

    return {

        score,

        common

    };

}

module.exports = {

    similarity

};