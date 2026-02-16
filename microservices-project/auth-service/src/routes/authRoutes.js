import { Router } from "express";
import { register, login, validate } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validate);

export default router;
