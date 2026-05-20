import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_placeholder";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "user_placeholder";

// Notification to Admin about new lead/message
export const sendAdminNotification = async (
  formData: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    message: string;
  }
) => {
  console.log("Simulating Admin Notification (EmailJS Disabled):", formData);
  return { success: true, mocked: true };
};

// Notification to User about admin reply/message
export const sendChatNotification = async (
  toName: string,
  toEmail: string,
  chatMessage: string
) => {
  console.log(`Simulating User Notification to ${toEmail} (EmailJS Disabled):`, chatMessage);
  return { success: true, mocked: true };
};

export const sendLeadResponse = async (
  toName: string,
  toEmail: string,
  subject: string,
  message: string
) => {
  console.log(`Simulating Lead Response to ${toEmail} - Subject: ${subject} (EmailJS Disabled):`, message);
  return { success: true, mocked: true };
};

