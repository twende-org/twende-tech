import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_placeholder";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "user_placeholder";

export const sendLeadResponse = async (
  toName: string,
  toEmail: string,
  subject: string,
  message: string
) => {
  try {
    const templateParams = {
      to_name: toName,
      to_email: toEmail,
      subject: subject,
      message: message,
      from_name: "Twende Digital Admin",
      reply_to: "twendedigital3@gmail.com",
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error("EmailJS Error:", error);
    return { success: false, error };
  }
};
