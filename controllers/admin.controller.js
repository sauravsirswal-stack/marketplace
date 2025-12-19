import { getAnalyticsModel } from "../models/admin/analytics.model.js"
import { getTransactionModel } from "../models/admin/transaction.model.js"

export async function getDashboardStats(req, res) {
  try {
    const Analytics = await getAnalyticsModel()
    const Transaction = await getTransactionModel()

    const stats = await Analytics.find().sort({ date: 1 })
    const totalProducts = await Transaction.distinct("itemName")

    res.json({
      graphData: stats,
      totalUniqueProducts: totalProducts.length,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
