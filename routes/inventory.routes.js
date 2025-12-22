import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {create, list, update} from "../controllers/inventory.controller.js"

const router = express.Router()

router.post("/create", authMiddleware, create)
router.get("/list", authMiddleware, list)
router.put("/update/:id", authMiddleware, update)

export default router
