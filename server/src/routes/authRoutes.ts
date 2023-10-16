import { Router } from "express";
import {activateUser, confirmLogin, login, refreshToken, register} from "../controllers/authController";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.patch('/activate/:token', activateUser);
router.patch('/confirm/:token', confirmLogin);

export  { router as authRouter};