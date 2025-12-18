import mongoose from "mongoose"
import env from "./env.js"

const userDbConnections = new Map()

export async function getUserDb(userId) {
  if (userDbConnections.has(userId.toString())) {
    return userDbConnections.get(userId.toString())
  }

  const conn = await mongoose.createConnection(
    `${env.MONGO_URI}/user_${userId}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  userDbConnections.set(userId.toString(), conn)
  return conn
}
