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
  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      projectType: formData.projectType,
      message: formData.message,
      to_email: "twendedigital3@gmail.com", // Admin recipient
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error("Admin Email Alert Error:", error);
    return { success: false, error };
  }
};

// Notification to User about admin reply/message
export const sendChatNotification = async (
  toName: string,
  toEmail: string,
  chatMessage: string
) => {
  try {
    const templateParams = {
      to_name: toName,
      to_email: toEmail,
      subject: "New Message from Twende Digital Support",
      message: `Our engineering team has sent you a new message in the portal: \n\n"${chatMessage}"\n\nPlease log in to the portal to reply.`,
      from_name: "Twende Digital Support",
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error("User Notification Error:", error);
    return { success: false, error };
  }
};

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

