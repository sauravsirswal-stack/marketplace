import { listActivities } from "../services/activity.service.js"

export async function getActivities(req, res) {
  try {
    const data = await listActivities(req.user)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
