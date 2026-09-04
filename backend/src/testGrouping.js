const {

    groupProducts

} = require(

"./engine/product/groupProducts"

);


const products = [

{

name:

"Amul Gold Fresh Milk Pouch 1 L",

price:56,

platform:"Blinkit"

},

{

name:

"Amul Gold Homogenised Milk 1000 ml",

price:55,

platform:"Zepto"

},

{

name:

"Amul Taaza Milk 1 L",

price:52,

platform:"Blinkit"

},

{

name:

"Amul Taaza Milk 1000 ml",

price:50,

platform:"Zepto"

}

];


const groups =

groupProducts(

products

);


console.dir(

groups,

{

depth:null

}

);