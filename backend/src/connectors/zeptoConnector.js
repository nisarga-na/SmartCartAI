const {
    createBrowser
} = require("../utils/browserManager");

const {
    retry
} = require("../utils/retryHelper");

const cache =
    require("../utils/cache");

async function searchZepto(query) {

    const cacheKey =
        "zepto_" + query.toLowerCase();

    if (cache.has(cacheKey)) {

        console.log("Zepto Cache Hit");

        return cache.get(cacheKey);
    }

    return await retry(async () => {

        const browser =
            await createBrowser();

        const page =
            await browser.newPage();

        try {

            console.log("Opening Zepto Search...");

            const url =
                `https://www.zepto.com/search?query=${encodeURIComponent(query)}`;

            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 60000
            });

            console.log("Waiting for products...");

            await page.waitForSelector(
                '[data-slot-id="ProductName"]',
                {
                    timeout: 30000
                }
            );

            // Give React time to finish rendering prices
            await page.waitForTimeout(2000);

            const cards =
                await page
                    .locator('a[href^="/pn/"]')
                    .all();

            console.log(
                "Cards Found:",
                cards.length
            );

            const products = [];

            for (const card of cards) {

                try {

                    const name =
                        (
                            await card
                                .locator(
                                    '[data-slot-id="ProductName"]'
                                )
                                .textContent()
                        )?.trim();

                    if (!name)
                        continue;

                    const priceText =
                        (
                            await card
                                .locator(
                                    '[data-slot-id="EdlpPrice"]'
                                )
                                .textContent()
                        ) || "";

                    const packSize =
                        (
                            await card
                                .locator(
                                    '[data-slot-id="PackSize"]'
                                )
                                .textContent()
                        ) || "";

                    const priceMatch =
                        priceText.match(/\d+/);

                    products.push({

                        name,

                        packSize,

                        price:
                            priceMatch
                                ? Number(priceMatch[0])
                                : 0,

                        platform:
                            "Zepto"

                    });

                }
                catch {

                    // Ignore incomplete cards

                }

            }

            console.log(
                "Zepto Products:",
                products.length
            );

            cache.set(
                cacheKey,
                products
            );

            return products;

        }
        catch (error) {

            console.log(
                "Zepto Error:",
                error.message
            );

            return [];

        }
        finally {

            try {

                await browser.close();

            }
            catch {

                console.log(
                    "Browser already closed"
                );

            }

        }

    });

}

module.exports = {
    searchZepto
};