import {
  createUser,
  getSingleUser,
  getUsers,
  updateMe,
  updateMyAvatar,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.post("/", createUser);
router.patch("/me", updateMe);
router.patch("/me/avatar", updateMyAvatar);

export default router;
