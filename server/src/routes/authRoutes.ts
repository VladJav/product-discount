import { Router } from "express";
import { activateUser, login, refreshToken, register } from "../controllers/authController";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.patch('/acrivate/:token', activateUser);

export  { router as authRouter};