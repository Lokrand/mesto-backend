import express, { Request, Response } from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";

require('dotenv').config();

const { PORT = 3000 } = process.env;
const url = process.env.MONGO_URL ? process.env.MONGO_URL : "";
console.log(url)

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

// Middleware - для добавления id
app.use((req: Request, res: Response, next) => {
  //@ts-expect-error
  req.user = {
    _id: "643eed2e20b1ed741ac2582d",
  };
  next();
});

app.use("/users", routerUser);
app.use("/cards", routerCard);

app.use((err: any, req: Request, res: Response, next: any) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
