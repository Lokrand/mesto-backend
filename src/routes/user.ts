import { createUser, getSingleUser, getUsers } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.post("/users", createUser);

export default router;
