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
router.get("/me", );

export default router;
