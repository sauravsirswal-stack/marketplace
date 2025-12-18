import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getTransactions } from "../controllers/transaction.controller.js"

const router = express.Router()

router.get("/", authMiddleware, getTransactions)

export default router
