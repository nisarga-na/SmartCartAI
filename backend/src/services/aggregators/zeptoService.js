const { chromium } = require("playwright");

async function searchZepto(query) {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    // Open Zepto (better loading)
    await page.goto(
        "https://www.zeptonow.com",
        {
            waitUntil: "domcontentloaded",
            timeout: 60000
        }
    );
    console.log("Zepto Opened");

    // Wait until search bar exists
    await page.waitForSelector(
        '[data-testid="searchBar"]',
        { timeout: 60000 }
    );

    // Click search bar
    await page.click('[data-testid="searchBar"]');

    await page.waitForTimeout(3000);

    const searchInput = page.locator(
        'input[placeholder="Search for over 5000 products"]'
    );
   await searchInput.click();

await page.keyboard.press("Control+A");

await page.keyboard.press("Backspace");

await searchInput.fill(query);
const typedValue =
    await searchInput.inputValue();

console.log("ZEPTO INPUT VALUE:");
console.log(typedValue);

    await searchInput.press("Enter");

    await page.waitForTimeout(8000);

    const names = await page
        .locator('[data-slot-id="ProductName"]')
        .allTextContents();

    const prices = await page
        .locator('[data-slot-id="EdlpPrice"]')
        .allTextContents();

    const products = names.map((name, index) => {

        const priceMatch =
            prices[index]?.match(/₹(\d+)/);

        return {
            name,
            price: priceMatch
                ? Number(priceMatch[1])
                : null,
            platform: "Zepto"
        };
    });

    await browser.close();

    return products;
}

module.exports = {
    searchZepto
};