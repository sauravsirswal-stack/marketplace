import { findNearbyUsers } from "../services/user.service.js"

export async function getNearbyUsers(req, res) {
  try {
    const { lng, lat, distance } = req.query

    if (!lng || !lat) {
      return res.status(400).json({ error: "Coordinates required" })
    }

    const users = await findNearbyUsers({
      lng: Number(lng),
      lat: Number(lat),
      distanceKm: Number(distance) || 30,
      loggedInUser: req.user || null,
    })

    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
