import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface TicketReplyData {
  senderId: string;
  senderEmail: string;
  senderRole: "admin" | "client";
  text: string;
}

export const submitTicketReply = async (ticketId: string, replyData: TicketReplyData) => {
  try {
    const repliesRef = collection(db, "tickets", ticketId, "replies");
    
    // 1. Add reply document
    const replyDoc = await addDoc(repliesRef, {
      ...replyData,
      createdAt: serverTimestamp(),
    });

    // 2. Update ticket status and timestamp
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, {
      updatedAt: serverTimestamp(),
      // If admin replies, change ticket status to "In Progress"
      ...(replyData.senderRole === "admin" ? { status: "In Progress" } : {})
    });

    return { success: true, id: replyDoc.id };
  } catch (error) {
    console.error("Error submitting ticket reply:", error);
    return { success: false, error };
  }
};
