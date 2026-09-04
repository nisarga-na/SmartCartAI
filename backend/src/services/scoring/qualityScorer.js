function scoreProduct(productName) {

    const name =
        productName.toLowerCase();

    let score = 0;

    if (name.includes("organic"))
        score += 3;

    if (name.includes("a2"))
        score += 3;

    if (name.includes("high protein"))
        score += 2;

    if (name.includes("premium"))
        score += 2;

    if (name.includes("fresh"))
        score += 1;

    return score;
}

module.exports = {
    scoreProduct
};