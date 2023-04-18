import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const getSingleUser = (req: Request, res: Response) => {
  const { id } = req.body;

  return User.find({ _id: id })
    .then((users) => res.status(201).send({ data: users }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const updateMe = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.params.id,
    { name, about, avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const updateMyAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};
