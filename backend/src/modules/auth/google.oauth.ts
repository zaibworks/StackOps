import { google } from "googleapis";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (!clientId || !clientSecret || !callbackUrl) {
  throw new Error("Google OAuth environment variables are missing");
}

export const googleOAuthClient = new google.auth.OAuth2(
  clientId,
  clientSecret,
  callbackUrl
);