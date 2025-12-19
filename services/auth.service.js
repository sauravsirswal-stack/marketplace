import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { signJwt } from "../utils/jwt.js"
import { getUserModel } from "../models/admin/user.model.js"
import { getSessionModel } from "../models/admin/session.model.js"
import { generateAndSendOTP } from "./otp.service.js"

export async function registerUser(data) {
  const User = await getUserModel()

  const passwordHash = await bcrypt.hash(data.password, 10)

  const user = await User.create({
    email: data.email,
    username: data.username,
    passwordHash,
    location: data.location,
    emailVerified: false,
  })
  const token = jwt.sign(
    {
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  )
  // SEND VERIFY EMAIL OTP
  await generateAndSendOTP(user, "VERIFY_EMAIL", 5)

  return {user, token}
}

export async function loginUser(email, password) {
  const User = await getUserModel()
  const user = await User.findOne({ email, activeAccount: true })
  if (!user) throw new Error("Invalid credentials")

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) throw new Error("Invalid credentials")

  const Session = await getSessionModel()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await Session.create({
    userId: user._id,
    type: "LOGIN",
    expiresAt,
  })

  const token = signJwt({
    sessionId: session._id,
    userId: user._id,
    role: user.role,
  })

  return { token }
}