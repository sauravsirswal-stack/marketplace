import express from "express"
import {register, login , verifyEmail, forgotPassword, resetPassword} from "../controllers/auth.controller.js"
import {tempAuthForVerify} from "../middleware/tempAuthForVerify.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
// router.post("/verify/send", sendVerifyEmailOTP)
router.post("/verify", tempAuthForVerify, verifyEmail)      //router.post("/verify/confirm", verifyEmail)
router.post("/forgot", forgotPassword)
router.post("/reset", resetPassword)


export default router
