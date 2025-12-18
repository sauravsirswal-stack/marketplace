import bcrypt from "bcrypt"
import { getUserModel } from "../models/admin/user.model.js"

export async function createAdminIfMissing() {
  const User = await getUserModel()

  const adminExists = await User.findOne({ role: "admin" })
  if (adminExists) {
    console.log("Admin already exists")
    return
  }

  const passwordHash = await bcrypt.hash("admin123", 10)

  await User.create({
    email: "admin@marketplace.com",
    username: "admin",
    passwordHash,
    role: "admin",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716],
    },
  })

  console.log("Admin user created")
}
