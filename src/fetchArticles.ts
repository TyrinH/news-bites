import puppeteer from "puppeteer";
import Parser from "rss-parser";
import fs from "fs";
import { openAIApi } from "./aiSummarizer.js";

let parser = new Parser();

const fetchArticles = async () => {
  let feed = await parser.parseURL("https://www.kmbc.com/topstories-rss");
  console.log(feed.title);

  scrapeInfo(feed.items);
};

const scrapeInfo = async (urls) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < 1; i++) {
    const item = urls[i];
    console.log(item.title + ":" + item.link);
    await page.goto(item.link);

    interface article {
      title?: string;
      content?: string;
      summary?: string;
      source?: string;
      link?: string;
      guid?: string;
      pubDate?: string;
    }
    const article = await page.$$eval(".article-content", (elements) =>
      elements.map((e: HTMLElement) => ({
        title: (e.querySelector(".article-headline--title") as HTMLElement)
          .innerText,
        content: (e.querySelector(".article-content--body-text") as HTMLElement)
          .innerText,
        summary: null,
        source: "KMBC",
        link: null,
        guid: null,
        pubDate: null,
      }))
    );

    const summary = await openAIApi(article[0].content);
    console.log("summary:", summary.data.choices[0].text);
    article[0].summary = summary.data.choices[0].text;
    article[0].link = item.link;
    article[0].guid = item.guid;
    article[0].pubDate = item.pubDate;

    fs.writeFile(
      `KMBC:${item.title}.json`,
      JSON.stringify(article[0]),
      (err) => {
        if (err) throw err;
        console.log("FILE SAVED:", item.title);
      }
    );
  }
  browser.close();
};

export default fetchArticles;
