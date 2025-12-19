import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { purchase } from "../controllers/purchase.controller.js"
import { purchaseSchema } from "../validations/purchase.validation.js"

const router = express.Router()

router.post("/", authMiddleware, purchase)

export default router