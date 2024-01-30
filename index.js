import puppeteer from "puppeteer";

const getQuotes = async() => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/"), {
        waitUntil: "documentloaded"
    }

    // Get page data
    const quotes = await page.evaluate(() => {
        //Fetch first element with class "quote"
        const quoteList = document.querySelectorAll(".quote");

        // Convert the quoteList to an iterable array
        // For each quote fetch the text and author

        return Array.from(quoteList).map((quote) => { 
            // Fetch sub elments from previously fetched quote element
            // Get the displayed text and return it ('.innerText')
            const text = quote.querySelector(".text").innerText;
            const author = quote.querySelector(".author").innerText;

            return {text, author}
        })
    })

    // Display the quotes
    console.log(quotes)

    // Click on the "Next Page" button
    await page.click(".pager > .next > a");

    // Close the browser
    // await browser.close();

}

// Start the scraping
getQuotes();