import { Request, Response } from "express";
import User from "../models/user";
import { NotFoundError } from "../errors/not-found-err";
import { BadRequest } from "../errors/bad-request";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => {
      if (!users) throw new BadRequest("Пользователи не найдены");
      else res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const getSingleUser = (req: Request, res: Response) => {
  const { id } = req.body;

  return User.find({ id })
    .then((user) => {
      if (!user)
        throw new NotFoundError("Пользователь по указанному _id не найден.");
      else res.status(201).send({ data: user });
    })
    // .catch(next);
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  // if (!name || !about || !avatar)
  //   return Promise.reject(
  //     new Error("Переданы некорректные данные при создании пользователя")
  //   );
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
