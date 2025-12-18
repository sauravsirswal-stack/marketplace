import { verifyJwt } from "../utils/jwt.js"
import { getSessionModel } from "../models/admin/session.model.js"
import { getUserModel } from "../models/admin/user.model.js"

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyJwt(token)

    const Session = await getSessionModel()
    const session = await Session.findById(decoded.sessionId)

    if (!session || session.type !== "LOGIN") {
      return res.status(401).json({ error: "Invalid session" })
    }

    const User = await getUserModel()
    const user = await User.findById(session.userId)

    if (!user || !user.activeAccount) {
      return res.status(401).json({ error: "User not active" })
    }

    req.user = {
      _id: user._id,
      role: user.role,
    }

    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}
