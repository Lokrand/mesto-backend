import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { NotFoundError } from "../errors/not-found-err";
import { BadRequest } from "../errors/bad-request";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => {
      if (!users) throw new BadRequest("Пользователи не найдены");
      else res.status(201).send({ data: users });
    })
    .catch(next);
};

export const getSingleUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return User.find({ id: req.params.id })
    .then((user) => {
      if (!user)
        throw new NotFoundError("Пользователь по указанному _id не найден.");
      res.status(201).send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      if (!user)
        throw new BadRequest(
          "Переданы некорректные данные при создании пользователя."
        );
      else res.status(201).send({ data: user });
    })
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
