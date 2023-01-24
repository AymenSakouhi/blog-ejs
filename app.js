import express from "express";
import "dotenv/config";
import path from "path";
import morgan from "morgan";
import mongoConnect from "./db.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(express.json());

//register view engine
app.set("view engine", "ejs");

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //for accepting for data otherwise it will be undefined
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const PORT = process.env.PORT || 8000;

mongoConnect(() => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`app working and listening to ${PORT}`);
  });
});
