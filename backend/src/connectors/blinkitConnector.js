const {
    createBrowser
} = require(
    "../utils/browserManager"
);

const {
    retry
} = require(
    "../utils/retryHelper"
);

const cache =
    require(
        "../utils/cache"
    );


async function searchBlinkit(
    query
) {

    const cacheKey =
        "blinkit_" + query;


    if (
        cache.has(
            cacheKey
        )
    ) {

        console.log(
            "Blinkit Cache Hit"
        );

        return cache.get(
            cacheKey
        );
    }


    return await retry(

        async () => {

            const browser =
                await createBrowser();


            // IMPORTANT
            // restore old session

            const context =
                await browser.newContext({

                    storageState:
                        "blinkit-state.json"
                });


            const page =
                await context.newPage();


            try {

                console.log(
                    "Opening Blinkit..."
                );


                await page.goto(

                    `https://blinkit.com/s/?q=${encodeURIComponent(query)}`,

                    {
                        waitUntil:
                            "domcontentloaded",

                        timeout:
                            60000
                    }
                );


                // restore old waits

                await page.waitForTimeout(
                    7000
                );

                await page.waitForTimeout(
                    4000
                );


                const names =

                    (

                        await page

                            .locator(
                                ".tw-text-300.tw-font-semibold"
                            )

                            .allTextContents()

                    )

                    .filter(

                        text =>

                            text.trim() !== "ADD"
                    );


                const sizes =

                    await page

                        .locator(
                            ".tw-text-200.tw-font-medium"
                        )

                        .allTextContents();


                const prices =

                    await page

                        .locator(
                            ".tw-text-200.tw-font-semibold"
                        )

                        .allTextContents();


                const products =

                    names.map(

                        (
                            name,
                            index
                        ) => ({

                            name:

                                `${name} ${sizes[index] || ""}`,

                            price:

                                Number(

                                    prices[index]
                                        ?.replace(
                                            "₹",
                                            ""
                                        )

                                ) || 0,

                            platform:
                                "Blinkit"
                        })
                    );


                console.log(
                    "Blinkit Products:",
                    products.length
                );


                cache.set(
                    cacheKey,
                    products
                );


                return products;
            }

            finally {

    try {

        if (browser) {

            await browser.close();

        }

    }

    catch (error) {

        console.log(
            "Browser already closed"
        );

    }
}
        }
    );
}


module.exports = {
    searchBlinkit
};