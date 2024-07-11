import { Router } from "express";
import NewsController from "../Controllers/NewsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, NewsController.index);
router.post("/", authMiddleware, NewsController.store);
router.get("/:id", authMiddleware, NewsController.show);
router.patch("/:id", authMiddleware, NewsController.update);
router.delete("/:id", authMiddleware, NewsController.destroy);

export default router;
