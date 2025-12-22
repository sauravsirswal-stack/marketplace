import { findNearbyUsers } from "../services/user.service.js"
import mongoose from "mongoose"
import { getUserDb } from "../config/user.db.js"
import { getInventoryModel } from "../models/user/inventory.model.js"

export async function getNearbyUsers(req, res) {
  try {
    const { lng, lat, distance } = req.body

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

export async function getUserInventory(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" })
    }
    const userDb = await getUserDb(id)

    const Inventory = getInventoryModel(userDb, id)

    const inventory = await Inventory.find({ active: true }, {active : 0, __v : 0, createdAt : 0}).sort({
      createdAt: -1,
    })

    return res.json({
      userId: id,
      inventory,
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}