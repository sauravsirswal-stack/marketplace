import { registerUser, loginUser } from "../services/auth.service.js"
import { generateAndSendOTP, verifyOTP } from "../services/otp.service.js"
import bcrypt from "bcrypt"
import { getUserModel } from "../models/admin/user.model.js"
import { getUserDb } from "../config/user.db.js"
import { getInventoryModel } from "../models/user/inventory.model.js"

export async function register(req, res) {
  try {
    const {token} = await registerUser(req.body)
    res.status(201).json({
      message: "Account created. Verify email using OTP sent.",
      token
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function login(req, res) {
  try {
    const User = await getUserModel()
    const user = await User.findOne({ email: req.body.email })
    if (!user.emailVerified) {
    throw new Error("Email not verified")
} 

    const { email, password } = req.body
    const { token } = await loginUser(email, password)
    res.json({ token })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}


// SEND VERIFY EMAIL OTP
// export async function sendVerifyEmailOTP(req, res) {
//   const User = await getUserModel()
//   const user = await User.findOne({ email: req.body.email })
//   await generateAndSendOTP(user, "VERIFY_EMAIL", 5)
//   res.json({ message: "OTP sent" })
// }

// VERIFY EMAIL
export async function verifyEmail(req, res) {
  const email = req.user
  const {otp } = req.body

  const User = await getUserModel()
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if (user.emailVerified) {
    return res.status(400).json({ message: "Email already verified" })
  }
  await verifyOTP(user._id, otp, "VERIFY_EMAIL")
  user.emailVerified = true
  await user.save()
   const userDb = await getUserDb(user._id)
   await getInventoryModel(userDb, user._id)
  return res.json({ message: "Email verified successfully" })
}

// FORGOT PASSWORD
export async function forgotPassword(req, res) {
  const User = await getUserModel()
  const user = await User.findOne({ email: req.body.email })
  await generateAndSendOTP(user, "FORGOT_PASSWORD", 30)
  res.json({ message: "OTP sent" })
}

// RESET PASSWORD
export async function resetPassword(req, res) {
  const User = await getUserModel()
  const user = await User.findOne({ email: req.body.email })
  await verifyOTP(user._id, req.body.otp, "FORGOT_PASSWORD")
  user.passwordHash = await bcrypt.hash(req.body.newPassword, 10)
  await user.save()
  res.json({ message: "Password reset successful" })
}
