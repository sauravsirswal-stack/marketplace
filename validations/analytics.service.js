import { getUserModel } from "../models/admin/user.model.js"
import { getInventoryModel } from "../models/user/inventory.model.js"
import { getAnalyticsModel } from "../models/admin/analytics.model.js"
import { getUserDb } from "../config/user.db.js"

export async function computeDailyAnalytics() {
  const User = await getUserModel()
  const Analytics = await getAnalyticsModel()

  const today = new Date().toISOString().split("T")[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
  const yesterday = new Date(Date.now() - 86400000)

  const totalUsers = await User.countDocuments({ activeAccount: true })

  const activeUsers = await User.countDocuments({
    lastActivityAt: { $gte: sevenDaysAgo },
  })

  const newUsers = await User.countDocuments({
    createdAt: { $gte: yesterday },
  })

  await Analytics.findOneAndUpdate(
    { date: today },
    { totalUsers, activeUsers, newUsers },
    { upsert: true }
  )
}
