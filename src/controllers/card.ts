import { Request, Response, Router } from "express";
import Card from "models/card";

const router = Router();

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.body;

  return Card.remove({ _id: id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return Card.create({ name, about, avatar })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};