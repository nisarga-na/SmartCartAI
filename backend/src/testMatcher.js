const {

    parseProduct

} = require(

"./engine/product/productParser"

);

const {

    matchProducts

} = require(

"./engine/product/matcher"

);


const blinkit =

parseProduct({

name:

"Amul Gold Fresh Milk Pouch 1 L",

price:56,

platform:"Blinkit"

});


const zepto =

parseProduct({

name:

"Amul Gold Homogenised Milk 1000 ml",

price:55,

platform:"Zepto"

});


console.log(blinkit);

console.log(zepto);

console.log(

matchProducts(

blinkit,

zepto

)

);