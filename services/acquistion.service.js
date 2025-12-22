// services/analytics.service.js
import { getUserModel } from "../models/admin/user.model.js"

export async function getUserAcquisitionStats() {
  const User = await getUserModel()

  return User.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
    {
      $sort: { date: 1 },
    },
  ])
}
