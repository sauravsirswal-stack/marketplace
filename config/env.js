import dotenv from "dotenv"

dotenv.config()

const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  ADMIN_DB_NAME: process.env.ADMIN_DB_NAME || "admin_db",
  JWT_SECRET: process.env.JWT_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
}

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables")
}

export default env
