import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface MessageData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  subject?: string;
  message: string;
}

export const submitMessage = async (messageData: MessageData) => {
  try {
    const messagesRef = collection(db, "messages");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const docRef = await addDoc(messagesRef, {
      ...messageData,
      status: "New",
      priority: "Medium",
      subject: messageData.subject || `${messageData.projectType || "General"} Inquiry`,
      date,
      time,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting message to Firestore: ", error);
    return { success: false, error };
  }
};
