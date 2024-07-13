import { Router } from "express";
import AuthController from "../Controllers/AuthController.js";


const router = Router();

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)
router.patch("/auth/reset-password/:id",AuthController.resetPassword)

export default router;