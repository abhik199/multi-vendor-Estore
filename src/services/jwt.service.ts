import { config } from "dotenv";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { access_token } from "../config/conf";

config();

interface Payload {
  [key: string]: any;
}

// const jwtSecret = process.env.access_token || ""; // Use a more descriptive name for the environment variable

// export function sign(payload: Payload, expiry: string = "60s"): string {
//   const options: SignOptions = { expiresIn: expiry };
//   return jwt.sign(payload, jwtSecret, options);
// }

// export function verify(token: string): Payload {
//   try {
//     const decoded = jwt.verify(token, jwtSecret) as Payload;
//     return decoded;
//   } catch (error) {
//     throw new Error("Token verification failed");
//   }
// }

const jwtSecret = access_token || "";

export function sign(payload: Payload, expiry: string = "24h") {
  return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}

export function verify(token: string) {
  return jwt.verify(token, jwtSecret);
}
