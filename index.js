import express from "express";
import mongoose from "mongoose";
import { tenderController, userController } from "./controllers/index.js";
import cors from "cors";
import { registerValidation, loginValidation, tenderCreateValidation } from './validation.js'; 
import {checkAuth, handleValidationError} from './utils/index.js'

mongoose
  .connect("mongodb://127.0.0.1:27017/Financial_Department")
  .then(() => console.log("DB is ok"))
  .catch((err) => console.log("DB error" + err));

const app = express();

app.use(express.json());
app.use(cors())

app.post('/auth/login', loginValidation, handleValidationError, userController.login)
app.post('/auth/register', registerValidation, handleValidationError, userController.register)
app.get('/auth/me', checkAuth, userController.getMe)

app.post("/tenders", tenderController.create);
app.get("/tender/:id", tenderController.getOne);
app.get("/tenders", tenderController.getAll);
app.delete("/tenders/:id", tenderController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server OK");
});



