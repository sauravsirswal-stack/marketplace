import {
  createInventory,
  listInventory,
  updateInventory,
} from "../services/inventory.service.js"

export async function create(req, res) {
  try {
    const item = await createInventory(req.user, req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function list(req, res) {
  try {
    const items = await listInventory(req.user)
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function update(req, res) {
  try {
    const item = await updateInventory(req.user, req.params.id, req.body)
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
