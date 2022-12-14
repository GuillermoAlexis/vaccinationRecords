import { Router } from "express";
import { methods as userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", userController.addUser);
router.post("/login", userController.newSession);

export default router;
