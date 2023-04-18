import { Request, Response, Router } from "express";
import Card from "../models/card";

const router = Router();

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCard = (req: Request, res: Response) => {
  return Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  return Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
