import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { NotFoundError } from "../errors/not-found-err";
import { BadRequest } from "../errors/bad-request";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IUser from "types/user";

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

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch(next);
};

export const updateMe = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.params.id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user)
        throw new NotFoundError("Пользователь с указанным _id не найден.");
      res.status(201).send({ data: user });
    })
    .catch(next);
};

export const updateMyAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => {
      if (!user)
        throw new NotFoundError("Пользователь с указанным _id не найден.");
      res.status(201).send({ data: user });
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  //@ts-ignore
  return User.findUserByCredentials(email, password)
    .then((user: any) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err: any) => {
      res.status(401).send("Не правильные почта или пароль.");
    });
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {

}
