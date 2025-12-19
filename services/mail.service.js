import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import env from "../config/env.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
})

export async function sendOTPEmail({ to, name, otp }) {
  const templatePath = path.join("./templates/otp.html")
  let html = fs.readFileSync(templatePath, "utf-8")

  html = html.replace("{{name}}", name).replace("{{otp}}", otp)

  await transporter.sendMail({
    from: env.MAIL_USER,
    to,
    subject: "Your OTP Code",
    html,
  })
}
