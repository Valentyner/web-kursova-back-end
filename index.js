import express from "express";
import mongoose from "mongoose";
import { tenderController } from "./controllers/index.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/Financial_Department")
  .then(() => console.log("DB is ok"))
  .catch((err) => console.log("DB error" + err));

const app = express();

app.use(express.json());

app.post("/tenders", tenderController.create);
app.get("/tenders/:id", tenderController.getOne)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server OK");
});
