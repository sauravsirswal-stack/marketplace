import bcrypt from "bcrypt"
import { signJwt } from "../utils/jwt.js"
import { getUserModel } from "../models/admin/user.model.js"
import { getSessionModel } from "../models/admin/session.model.js"

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