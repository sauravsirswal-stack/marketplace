import { createAdminIfMissing } from "./scripts/createAdmin.js"

async function startServer() {
  try {
    await connectAdminDb()
    await createAdminIfMissing()

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`)
    })
  } catch (err) {
    console.error("Server startup failed:", err)
    process.exit(1)
  }
}

