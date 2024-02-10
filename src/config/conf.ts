import { config } from "dotenv";

config();

export const { email_user, email_pass } = process.env;
