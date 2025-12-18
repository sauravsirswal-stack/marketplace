import mongoose from "mongoose"
import env from "./env.js"

let adminConnection = null

export async function connectAdminDb() {
  if (adminConnection) return adminConnection

  adminConnection = await mongoose.createConnection(
    `${env.MONGO_URI}/${env.ADMIN_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  console.log("Connected to admin database")
  return adminConnection
}
