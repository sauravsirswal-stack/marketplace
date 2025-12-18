import { listTransactions } from "../services/transaction.service.js"

export async function getTransactions(req, res) {
  try {
    const data = await listTransactions(req.user)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
