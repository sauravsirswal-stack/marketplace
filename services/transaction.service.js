import { getTransactionModel } from "../models/admin/transaction.model.js"

export async function listTransactions(user) {
  const Transaction = await getTransactionModel()

  const matchStage =
    user.role === "admin"
      ? {}
      : {
          $or: [
            { buyerId: user._id },
            { sellerId: user._id },
          ],
        }

  return Transaction.aggregate([
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
  ])
}
