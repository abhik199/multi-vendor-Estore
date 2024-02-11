import jwt from "jsonwebtoken";
import { access_token } from "../config/conf";

// some issue after some add access token in .env file
interface Payload {
  [key: string]: any;
}

export function sign(
  payload: Payload,
  expiry: string = "60s",
  secret: string = "df54da6s87ase87da3a2s4aaaa8e"
): string {
  return jwt.sign(payload, secret, { expiresIn: expiry });
}

export function verify(
  token: string,
  secret: string = "df54da6s87ase87da3a2s4aaaa8e"
) {
  return jwt.verify(token, secret);
}
