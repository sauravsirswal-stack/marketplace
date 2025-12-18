import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      enum: ["INVENTORY", "TRANSACTION"],
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    before: {
      type: Object,
      default: null,
    },

    after: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
)

let ActivityModel

export async function getActivityModel() {
  if (ActivityModel) return ActivityModel

  const adminDb = await connectAdminDb()
  ActivityModel = adminDb.model("Activity", activitySchema)
  return ActivityModel
}
