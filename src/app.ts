import path from 'path';
import express from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use('/users', routerUser);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log("Hi, Lokrand!");
});
