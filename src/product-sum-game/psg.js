const puppeteer = require('puppeteer');

const calculate = (numsum, numproduct) => {
    let list = [];
    for (let i = 1; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
            if (i + j === parseInt(numsum) && i * j === parseInt(numproduct)) {
                list.push(i);
                list.push(j);
            }
        }
    }
    return list;
}


const psg = async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const baseLink = "https://mathszone.co.uk";
    const path = "/resources/grid/gridsumproduct/";
    const link = `${baseLink}${path}`;

    const landingSelector = "#game > #content > #frontcover > #start > button";
    const sum01Selector = "#s1";
    const product01Selector = "#p1";
    const firstTableSelector = "#a1";

    await page.goto(link);

    await page.setViewport({ width: 1440, height: 788 })

    // Click OK on Popup. 
    await page.waitForSelector(landingSelector);
    await page.click(landingSelector);

    // Click on First Table.
    await page.waitForSelector(firstTableSelector);
    await page.click(firstTableSelector);

    // Get Number from Problem. 
    await page.waitForSelector(sum01Selector);
    const sum01 = page.$eval(sum01Selector, el => el.textContent);

    await page.waitForSelector(product01Selector);
    const product01 = page.$eval(product01Selector, el => el.textContent);

    const result01 = calculate(sum01, product01);

    return result01;
}


module.exports = psg;