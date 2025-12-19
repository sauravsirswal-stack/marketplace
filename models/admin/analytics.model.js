import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      unique: true,
    },

    totalUsers: Number,
    activeUsers: Number,
    newUsers: Number,
  },
  { timestamps: true }
)

// TTL → keep only 7 days
analyticsSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 }
)

let AnalyticsModel

export async function getAnalyticsModel() {
  if (AnalyticsModel) return AnalyticsModel
  const adminDb = await connectAdminDb()
  AnalyticsModel = adminDb.model("AnalyticsDaily", analyticsSchema)
  return AnalyticsModel
}
