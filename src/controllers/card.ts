import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const deleteCard = (req: Request, res: Response) => {
  return Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  return Card.create({ name, link })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const likeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    // { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));

export const dislikeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    // { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
