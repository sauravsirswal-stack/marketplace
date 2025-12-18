import express from "express"
import authRoutes from "./routes/auth.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import activityRoutes from "./routes/activity.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

app.use("/auth", authRoutes)
app.use("/transactions", transactionRoutes)
app.use("/activities", activityRoutes)
app.use("/inventory", inventoryRoutes)

export default app