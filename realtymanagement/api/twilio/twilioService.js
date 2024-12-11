import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendPriceDropNotification = async (to, propertyTitle, newPrice) => {
  const message = `ELITE RESIDENCES-GREAT OPPORTUNITY!! The price of the property "${propertyTitle}" you saved has been reduced to ${newPrice}.`;

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: `+91${to}`, // Ensure 'to' is just the number without country code
    });
    return response;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
};
