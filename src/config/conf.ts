import { config } from "dotenv";

config();

export const { email_user, email_pass, access_token } = process.env;
