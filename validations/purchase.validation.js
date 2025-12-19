import Joi from "joi"

export const purchaseSchema = Joi.object({
  sellerId: Joi.string().required(),
  inventoryId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
})
