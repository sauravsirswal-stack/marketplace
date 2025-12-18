import { getActivityModel } from "../models/admin/activity.model.js"

export async function logActivity(data) {
  const Activity = await getActivityModel()
  await Activity.create(data)
}

export async function listActivities(user) {
  const Activity = await getActivityModel()

  const matchStage =
    user.role === "admin"
      ? {}
      : { userId: user._id }

  return Activity.aggregate([
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
  ])
}
