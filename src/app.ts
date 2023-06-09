import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";

require("dotenv").config();
const { errors } = require("celebrate");

const { PORT = 3000 } = process.env;

// Ссылку на сервер беру с сайта mongodb
//"mongodb+srv://Login:Password@cluster0.6peharq.mongodb.net/test"

const url = process.env.MONGO_URL ? process.env.MONGO_URL : "";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, {}, (err) => {
  if (err) {
    console.log("mongo is not connected", err);
  } else {
    console.log("mongo connected successfull");
  }
});

// Middleware - для добавления тестового id
app.use((req: Request, res: Response, next) => {
  //@ts-expect-error
  req.user = {
    _id: "643eed2e20b1ed741ac2582d",
  };
  next();
});

// роуты
app.use("/users", routerUser);
app.use("/cards", routerCard);

// обработчики ошибок
app.use(errors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT);
