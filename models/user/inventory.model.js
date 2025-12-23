import mongoose from "mongoose"
import { getActivityModel } from "../admin/activity.model.js"

const inventorySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// CREATE / UPDATE HOOK
inventorySchema.post("save", async function (doc) {
  const Activity = await getActivityModel()
  await Activity.create({
    userId: doc._userId,
    action: "INVENTORY_SAVE",
    entityType: "INVENTORY",
    entityId: doc._id,
    before: doc._before || null,
    after: doc.toObject(),
  })
})
export function getInventoryModel(userDb, userId) {
  if (userDb.models.Inventory) return userDb.models.Inventory

  const schema = inventorySchema.clone()
  schema.pre("save", function (next) {
    this._userId = userId
    this._before = this.isNew ? null : this.toObject()
    next()
  })

  return userDb.model("Inventory", schema)
}

