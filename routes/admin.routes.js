import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { loginAdmin } from "../controllers/loginAdmin.controller.js"
import { getUsers, getTransactions , getActivities, getUserAcquisition} from "../controllers/admin.controller.js"

const router = express.Router()


router.post("/login", loginAdmin)
router.get("/getUsers", authMiddleware, getUsers)
router.get("/transactions", authMiddleware, getTransactions)
router.get("/activities", authMiddleware, getActivities)
router.get("/userAcquisitions", authMiddleware, getUserAcquisition)

export default router
