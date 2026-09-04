function randomDelay() {

    const time =

        Math.floor(

            Math.random() * 2000
        ) + 1000;


    return new Promise(

        resolve =>

            setTimeout(
                resolve,
                time
            )
    );
}

module.exports = {
    randomDelay
};