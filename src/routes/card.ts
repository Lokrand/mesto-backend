import { createCard, deleteCard, getCards } from "../controllers/card";
import { Router } from "express";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:userId", deleteCard);

export default router;
