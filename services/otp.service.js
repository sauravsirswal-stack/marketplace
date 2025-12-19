import crypto from "crypto"
import { getOTPModel } from "../models/admin/otp.model.js"
import { sendOTPEmail } from "./mail.service.js"

export async function generateAndSendOTP(user, type, minutes) {
  const OTP = await getOTPModel()

  const code = crypto.randomInt(100000, 999999).toString()
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000)

  await OTP.create({
    userId: user._id,
    code,
    type,
    expiresAt,
  })

  await sendOTPEmail({
    to: user.email,
    name: user.username,
    otp: code,
  })
}

export async function verifyOTP(userId, code, type) {
  const OTP = await getOTPModel()

  const record = await OTP.findOne({
    userId,
    code,
    type,
  })

  if (!record) throw new Error("Invalid or expired OTP")

  await record.deleteOne()
}
