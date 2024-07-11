import { Router } from "express";
import ProfileController from "../Controllers/ProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, ProfileController.index);
router.patch("/:id", authMiddleware, ProfileController.update);
router.delete("/:id", authMiddleware, ProfileController.destroy);

export default router;
