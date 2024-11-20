import twilio from "twilio";
import { Verification } from "../models";

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Twilio Phone Number

const client = twilio(accountSid, authToken);

/**
 * Send OTP to a given phone number and save it in the Validation table.
 * @param phoneNo - The phone number to which the OTP will be sent.
 * @returns {Promise<void>}
 */
export const sendOtpToPhone = async (
  phoneNo: string,
  userId: number
): Promise<void> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Verification.create({ phoneNo, otp, userId });

  //   await client.messages.create({
  //     body: `Your OTP is: ${otp}`,
  //     from: twilioPhoneNumber,
  //     to: `+91${phoneNo}`,
  //   });
};
