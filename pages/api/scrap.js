import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  const targetUrl = req.query.url || 'https://rubinot.com.br/?subtopic=characters&name=Ulezovisk';
  const selector = req.query.selector || '.BoxContent';

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
      headless: chromium.headless
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    const html = await page.$eval(selector, el => el.outerHTML);

    res.status(200).json({ success: true, html });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (browser) await browser.close();
  }
}
