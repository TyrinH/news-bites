import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import fetchArticles from "./fetchArticles.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/fetchNewsArticles", async (req, res) => {
  await fetchArticles();
  res.send("done");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
