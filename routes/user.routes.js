import express from "express"
import { getNearbyUsers , getUserInventory} from "../controllers/user.controller.js"

const router = express.Router()
router.get("/nearby", getNearbyUsers)
router.get("/nearby/:id", getUserInventory)
export default router