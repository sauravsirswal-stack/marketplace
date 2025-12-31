import { getUserDb } from "../config/user.db.js"
import { getInventoryModel } from "../models/user/inventory.model.js"

export async function createInventory(user, data) {
  // console.log(user._id)
  const userDb = await getUserDb(user._id)
  const Inventory = getInventoryModel(userDb, user._id)
  return Inventory.create(data)
}

export async function listInventory(user) {
  const userDb = await getUserDb(user._id)
  const Inventory = getInventoryModel(userDb, user._id)

  return Inventory.aggregate([
    { $match: { active: true } },
    { $sort: { createdAt: -1 } },
  ])
}

export async function updateInventory(user, id, data) {
  const userDb = await getUserDb(user._id)
  const Inventory = getInventoryModel(userDb, user._id)

  const item = await Inventory.findById(id)
  if (!item) throw new Error("Item not found")

  Object.assign(item, data) 
  return item.save()
}
