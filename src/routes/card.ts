import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/card";
import { Router } from "express";

const { celebrate, Joi } = require('celebrate');

const router = Router();

router.get("/", getCards);
router.post("/",celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().minlength(2).maxlength(30),
    link: Joi.string().required()
  })
}), createCard);
router.delete("/:userId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

export default router;
