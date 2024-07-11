import { Router } from "express";
import AuthController from "../Controllers/AuthController.js";


const router = Router();

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)

export default router;