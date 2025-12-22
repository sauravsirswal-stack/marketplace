import { getUserModel } from "../models/admin/user.model.js"
import { loginUser } from "../services/auth.service.js"

export async function loginAdmin(req, res) {
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