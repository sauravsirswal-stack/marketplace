import { verifyJwt } from "../utils/jwt.js"

export async function tempAuthForVerify(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token for verification email" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyJwt(token)

    req.user = decoded.email
    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized for verification" })
  }
}
