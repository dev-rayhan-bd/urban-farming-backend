import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `MD Rayhan Shorker ${config.smtp_from}`,
    to,
    subject,
    text,
  });
};
