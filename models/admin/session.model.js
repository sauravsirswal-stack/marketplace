import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["LOGIN", "VERIFY_EMAIL", "FORGOT_PASSWORD"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
)

// TTL INDEX
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

let SessionModel

export async function getSessionModel() {
  if (SessionModel) return SessionModel

  const adminDb = await connectAdminDb()
  SessionModel = adminDb.model("Session", sessionSchema)
  return SessionModel
}
