import mongoose from "mongoose"
import { getUserDb } from "../config/user.db.js"
import { getInventoryModel } from "../models/user/inventory.model.js"
import { getTransactionModel } from "../models/admin/transaction.model.js"
import { logActivity } from "./activity.service.js"

export async function purchaseItem(buyer, payload) {
  const { sellerId, inventoryId, quantity } = payload

  if (buyer._id.toString() === sellerId) {
    throw new Error("Cannot purchase your own item")
  }

  const sellerDb = await getUserDb(sellerId)
  const Inventory = getInventoryModel(sellerDb, sellerId)

  //Atomic decrement
  const item = await Inventory.findOneAndUpdate(
    {
      _id: inventoryId,
      active: true,
      quantity: { $gte: quantity },
    },
    {
      $inc: { quantity: -quantity },
    },
    { new: true }
  )

  if (!item) {
    throw new Error("Insufficient quantity or item not found")
  }

  const Transaction = await getTransactionModel()

  const transaction = await Transaction.create({
    buyerId: buyer._id,
    sellerId,
    itemName: item.productName,
    quantity,
    price: item.price * quantity,
  })

  // Activity log (buyer)
  await logActivity({
    userId: buyer._id,
    action: "PURCHASE_ITEM",
    entityType: "TRANSACTION",
    entityId: transaction._id,
    before: null,
    after: transaction.toObject(),
  })

  // Activity log (seller)
  await logActivity({
    userId: sellerId,
    action: "ITEM_SOLD",
    entityType: "TRANSACTION",
    entityId: transaction._id,
    before: null,
    after: transaction.toObject(),
  })

  return transaction
}
