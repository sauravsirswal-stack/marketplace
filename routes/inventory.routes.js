import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {create, list, update} from "../controllers/inventory.controller.js"

const router = express.Router()

router.post("/", authMiddleware, create)
router.get("/", authMiddleware, list)
router.put("/:id", authMiddleware, update)

export default router
