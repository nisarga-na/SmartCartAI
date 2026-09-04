const {

    parseProduct

} = require(

"./engine/product/productParser"

);


const tests = [

{

name:

"Amul Gold Milk 1 L",

price:56,

platform:"Blinkit"

},

{

name:

"Amul Gold Milk 1000 ml",

price:55,

platform:"Zepto"

},

{

name:

"Aashirvaad Atta 5 kg",

price:290,

platform:"Blinkit"

},

{

name:

"Aashirvaad Atta 5000 g",

price:291,

platform:"Zepto"

}

];


for (

const product

of tests

) {

console.log(

parseProduct(

product

)

);

}