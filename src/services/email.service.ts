import { email_pass, email_user } from "../config/conf";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export interface emailKey {
  email: string;
  name: string;
  otp: number;
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
      path.join(__dirname, "../views/otp.ejs"),
      { name: emailData.name, otp: emailData.otp },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const message = {
            from: "grocery store",
            to: emailData.email,
            subject: "otp Verification Mail",
            html: data,
          };
          transporter.sendMail(message, (error, info) => {
            if (error) {
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
// };

// emailService(exampleEmailData);
