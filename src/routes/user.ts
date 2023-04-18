import { createUser, getSingleUser, getUsers } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.post("/", createUser);
router.patch("/", )

export default router;
