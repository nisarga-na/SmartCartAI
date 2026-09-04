const {
    normalizeProductName
} = require('./src/services/matching/productNormalizer');

console.log(
    normalizeProductName(
        'Amul Taaza Milk 500 ML'
    )
);