import bcrypt from "bcrypt"
import { getUserModel } from "../models/admin/user.model.js"
import { getUserDb } from "../config/user.db.js"
import { getInventoryModel } from "../models/user/inventory.model.js"

function randomLocation(lat, lng, radiusKm) {
  const r = radiusKm / 111
  const u = Math.random()
  const v = Math.random()
  const w = r * Math.sqrt(u)
  const t = 2 * Math.PI * v

  return {
    lat: lat + w * Math.cos(t),
    lng: lng + w * Math.sin(t),
  }
}


export async function seedUsersAndInventory() {
  const User = await getUserModel()

  const count = await User.countDocuments({ role: "user" })
  if (count >= 20) {
    console.log(" Users already seeded")
    return
  }

  const center = { lat: 12.9716, lng: 77.5946 }

  console.log(" Seeding users & inventory...")

  for (let i = 1; i <= 20; i++) {
    const loc = randomLocation(center.lat, center.lng, 50)
    const passwordHash = await bcrypt.hash("user123", 10)

    const user = await User.create({
      email: `user${i}@test.com`,
      username: `user${i}`,
      passwordHash,
      emailVerified: true,
      location: {
        type: "Point",
        coordinates: [loc.lng, loc.lat],
      },
    })

    const userDb = await getUserDb(user._id)
    const Inventory = getInventoryModel(userDb, user._id)

    const items = Math.floor(Math.random() * 16) + 5 // 5–20

    const inventoryDocs = Array.from({ length: items }).map(() => ({
      productName: `Product-${Math.random().toString(36).substring(7)}`,
      price: Math.floor(Math.random() * 900) + 100,
      quantity: Math.floor(Math.random() * 50) + 1,
    }))

    await Inventory.insertMany(inventoryDocs)
  }

  console.log("Users & inventory seeded")
}
