import { createAdminIfMissing } from "./createAdmin.js"
import { seedUsersAndInventory } from "../services/seed.service.js"

export async function seedOnStartup() {
  await createAdminIfMissing()
  await seedUsersAndInventory()
}
