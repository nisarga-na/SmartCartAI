const {
    chromium
} = require(
    "playwright-extra"
);

const StealthPlugin =
    require(
        "puppeteer-extra-plugin-stealth"
    );

chromium.use(
    StealthPlugin()
);


async function createBrowser() {

    const browser =
        await chromium.launch({

            headless: true
        });


    return browser;
}


module.exports = {
    createBrowser,
    chromium
};