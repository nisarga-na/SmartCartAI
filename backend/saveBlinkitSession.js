const { chromium } = require("playwright");

async function saveSession() {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://blinkit.com");

    console.log("Select your location manually");

    await page.pause();

    await context.storageState({
        path: "blinkit-state.json"
    });

    console.log("Session Saved!");

    await browser.close();
}

saveSession();