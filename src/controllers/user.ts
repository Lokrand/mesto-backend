import { Request, Response, Router } from "express";
import user from "../models/user";

const router = Router();

export const getUsers = (req: Request, res: Response) => {
  router.get("/users", (req: Request, res: Response) => {
    return user
      .find({})
      .then((users) => res.send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  });
};

export const getSingleUser = (req: Request, res: Response) => {
  const { id } = req.body;

  router.get(`users/${id}`, (req: Request, res: Response) => {
    return user
      .find({ _id: id })
      .then((users) => res.send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  });
};

export const createUser = (req: Request, res: Response) => {
  router.post("/users", (req: Request, res: Response) => {
    const { name, about, avatar } = req.body;
    return user
      .create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  });
};
