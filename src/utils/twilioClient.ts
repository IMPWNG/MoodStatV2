/* eslint-disable import/no-extraneous-dependencies */
import { Twilio } from 'twilio';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;

export const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const createBrowserTwilioClient = () => {
  return new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
};
