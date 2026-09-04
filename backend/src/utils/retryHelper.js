async function retry(fn, attempts = 2) {

    for (

        let i = 0;

        i < attempts;

        i++
    ) {

        try {

            return await fn();

        } catch (error) {

            console.log(

                "Retry:",
                i + 1
            );

            if (

                i === attempts - 1
            ) {

                throw error;
            }
        }
    }
}

module.exports = {
    retry
};