import { Router } from "express";
import ProfileController from "../Controllers/ProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, ProfileController.index);
router.put("/", authMiddleware, ProfileController.store);
router.get("/:id", authMiddleware, ProfileController.show);
router.patch("/:id", authMiddleware, ProfileController.update);
router.delete("/:id", authMiddleware, ProfileController.destroy);

export default router;
