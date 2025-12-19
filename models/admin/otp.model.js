import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    code: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["VERIFY_EMAIL", "FORGOT_PASSWORD"],
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

// TTL
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

let OTPModel

export async function getOTPModel() {
  if (OTPModel) return OTPModel
  const adminDb = await connectAdminDb()
  OTPModel = adminDb.model("OTP", otpSchema)
  return OTPModel
}
