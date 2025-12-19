import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    activeAccount: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// GEO INDEX
userSchema.index({ location: "2dsphere" })

let UserModel

export async function getUserModel() {
  if (UserModel) return UserModel

  const adminDb = await connectAdminDb()
  UserModel = adminDb.model("User", userSchema)
  return UserModel
}
