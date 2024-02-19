import { email_pass, email_user } from "../config/conf";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export interface emailKey {
  email: string;
  name: string;
  otp?: number;
  url?: string;
  paths: string;
}

const emailService = async (emailData: emailKey) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: email_user,
      pass: email_pass,
    },
  });

  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, `${emailData.paths}`),
      {
        name: emailData.name,
        ...(emailData.paths === "../views/otp.ejs"
          ? { otp: emailData.otp }
          : { url: emailData.url }),
      },
      (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const message = {
            from: "grocery store",
            to: emailData.email,
            subject: "otp Verification Mail",
            html: data,
          };
          transporter.sendMail(message, (error, info) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              resolve(info.response);
            }
          });
        }
      }
    );
  });
};

export default emailService;

// Example usage:
// const exampleEmailData: emailKey = {
//   email: "example@example.com",
//   name: "John Doe",
//   otp: 123456,
//   path: "../views/otp.ejs"
// };

// emailService(exampleEmailData);
