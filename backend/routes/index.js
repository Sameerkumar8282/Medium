import { Router } from "express";
import AuthRoutes from "./auths.js";
import userRoutes from "./user.js"
import newsRoutes from "./news.js"

const router = Router();

router.use("/api", AuthRoutes);
router.use("/user", userRoutes);
router.use("/news", newsRoutes);

export default router;
