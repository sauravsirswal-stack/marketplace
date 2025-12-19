import { purchaseItem } from "../services/purchase.service.js"

export async function purchase(req, res) {
  try {
    const transaction = await purchaseItem(req.user, req.body)
    res.status(201).json(transaction)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
