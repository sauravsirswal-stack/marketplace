import { loginUser } from "../services/auth.service.js"

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const { token } = await loginUser(email, password)
    res.json({ token })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}
