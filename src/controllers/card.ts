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
  //@ts-expect-error
  return Card.create({ owner: req.user._id, name, link })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const likeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    //@ts-expect-error
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));

export const dislikeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    //@ts-expect-error
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
