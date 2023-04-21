import {
  createUser,
  getSingleUser,
  getUsers,
  updateMe,
  updateMyAvatar,
} from "../controllers/user";
import { Router } from "express";
const { celebrate, Joi } = require("celebrate");

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().minlength(2).maxlength(30),
      about: Joi.string().required().minlength(2).maxlength(200),
      avatar: Joi.string().required(),
    }),
  }),
  createUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().minlength(2).maxlength(30),
      about: Joi.string().minlength(2).maxlength(200),
    }),
  }),
  updateMe
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateMyAvatar
);

export default router;
