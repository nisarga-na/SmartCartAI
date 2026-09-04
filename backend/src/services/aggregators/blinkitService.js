const { chromium } = require("playwright");

async function searchBlinkit(query) {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext({
        storageState: "blinkit-state.json"
    });

    const page = await context.newPage();

    await page.goto(
    `https://blinkit.com/s/?q=${encodeURIComponent(query)}`,
    {
        waitUntil: "domcontentloaded",
        timeout: 60000
    }
);
await page.waitForTimeout(5000);
console.log("Opening Blinkit...");

    //await page.waitForLoadState("networkidle");

    await page.waitForTimeout(3000);
    console.log("Searching:", query);
    console.log("Page Loaded");

    const names = (await page
        .locator('.tw-text-300.tw-font-semibold')
        .allTextContents())
        .filter(text => text.trim() !== "ADD");
    console.log("Names found:", names.length);

    const sizes = await page
    .locator(
        '.tw-text-200.tw-font-medium'
    )
    .allTextContents();


    const prices = await page
        .locator('.tw-text-200.tw-font-semibold')
        .allTextContents();
    console.log("Prices found:", prices.length);

    const products = names.map(
    (
        name,
        index
    ) => ({

        name:

            `${name} ${sizes[index] || ""}`,

        price: Number(
            prices[index]
              .replace("₹", "")
        ),

        platform:
            "Blinkit"
    })
);

    await browser.close();

    return products;
}

module.exports = {
    searchBlinkit
};