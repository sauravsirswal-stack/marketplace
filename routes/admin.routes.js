import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
// import { adminMiddleware } from "../middleware/admin.middleware.js"
import { getDashboardStats } from "../controllers/admin.controller.js"

const router = express.Router()

router.get("/dashboard", authMiddleware, getDashboardStats)

export default router
