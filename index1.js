import puppeteer from "puppeteer";

const getPlantInfo = async() => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://www.paccentraljc.org/"), {
        waitUntil: "documentloaded"
    }

    // Get page data
    const links = await page.evaluate(() => {
        // Fetch results that include links to years of plants
        const link = document.querySelector('[href="href_value"]');

        console.log(link);
    })

    // Close the browser
    // await browser.close();
}

// Start the scraping
getPlantInfo();