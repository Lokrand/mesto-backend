import express, { Request, Response } from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {}, (err) => {
  if (err) {
    console.log("mongo is not connected", err);
  } else {
    console.log("mongo connected successfull");
  }
});

// Middleware - для добавления id
app.use((req: Request, res: Response, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
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
