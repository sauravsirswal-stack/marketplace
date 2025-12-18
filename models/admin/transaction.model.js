import mongoose from "mongoose"
import { connectAdminDb } from "../../config/admin.db.js"

const transactionSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

let TransactionModel

export async function getTransactionModel() {
  if (TransactionModel) return TransactionModel

  const adminDb = await connectAdminDb()
  TransactionModel = adminDb.model("Transaction", transactionSchema)
  return TransactionModel
}
