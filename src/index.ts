import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import fetchArticles from "./fetchArticles.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/fetchNewsArticles", async (req, res) => {
  const newArticle = await fetchArticles();
  console.log("newArticle:", newArticle);
  res.send(newArticle);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
