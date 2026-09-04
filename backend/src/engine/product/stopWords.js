const STOP_WORDS = [

    "fresh",
    "premium",
    "classic",

    "pack",
    "packet",
    "pouch",
    "combo",

    "family",

    "small",
    "medium",
    "large",

    "offer",

    "rich",

    "creamy",

    "new",

    "with",

    "and",

    "|"

];

function removeStopWords(words) {

    return words.filter(

        word =>

            !STOP_WORDS.includes(

                word.toLowerCase()

            )

    );

}

module.exports = {

    removeStopWords

};