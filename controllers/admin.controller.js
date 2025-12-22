import { getUserModel } from "../models/admin/user.model.js"
import { getTransactionModel } from "../models/admin/transaction.model.js"
import { listActivities } from "../services/activity.service.js"
import { getUserAcquisitionStats } from "../services/acquistion.service.js"

export async function getUsers(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." })
    }
    const Users = await getUserModel()
    const users = await Users.find({"location.type": "Point"}, { passwordHash: 0 , __v: 0})
    

    res.json({
      users
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getTransactions(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." })
    }
    const Transaction = await getTransactionModel()

    const totalProducts = await Transaction.distinct("itemName")

    res.json({
      totalUniqueProducts: totalProducts,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export async function getActivities(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." })
    }
    const activity = await listActivities(req.user)

    res.json({
      activity
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export async function getUserAcquisition(req, res) {
  if(req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." })
  }
  try {
    const data = await getUserAcquisitionStats()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}