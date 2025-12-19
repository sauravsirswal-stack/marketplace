import express from "express"
import { getNearbyUsers } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()
router.get("/nearby", getNearbyUsers)
router.get("/nearby-auth", authMiddleware, getNearbyUsers)
export default router