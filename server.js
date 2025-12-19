import app from "./app.js"
import { createAdminIfMissing } from "./scripts/createAdmin.js"
import { seedOnStartup } from "./scripts/seedOnStartup.js"
import { connectAdminDb } from "./config/admin.db.js"

async function startServer() {
  try {
    await connectAdminDb()
    await seedOnStartup()   // 🚫 BLOCKS STARTUP
    await createAdminIfMissing()

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (err) {
    console.error("Server startup failed:", err)
  }
}

startServer()
