import { getUserModel } from "../models/admin/user.model.js"

export async function findNearbyUsers({
  lng,
  lat,
  distanceKm,
  loggedInUser,
}) {
  const User = await getUserModel()

  const maxDistance =
    loggedInUser ? distanceKm * 1000 : 30 * 1000

  return User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, lat],
        },
        distanceField: "distance",
        maxDistance,
        spherical: true,
        query: {
          activeAccount: true,
          role: "user",
        },
      },
    },
    {
      $project: {
        email: 0,
        passwordHash: 0,
        role  :0 ,
        emailVerified : 0,
        "location.type" : 0,
        activeAccount : 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ])
}
