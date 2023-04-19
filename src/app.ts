import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";
import { createUser, login } from "controllers/user";
import auth from "./middlewares/auth";

const { celebrate, Joi } = require("celebrate");
require("dotenv").config();
const { errors } = require("celebrate");

const { PORT = 3000 } = process.env;

// Ссылку на сервер беру с сайта mongodb
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

// роуты
app.post("/signin", login);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().minlength(2).maxlength(30),
      about: Joi.string().minlength(2).maxlength(200),
      avatar: Joi.string(),
    }),
  }),
  createUser
);

//@ts-expect-error
app.use("/", auth);

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
