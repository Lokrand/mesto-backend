import path from "path";
import express from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

// Middleware - для добавления id
// app.use((req:any, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.use("/users", routerUser);
app.use("/cards", routerCard);

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
