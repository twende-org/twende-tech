import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AuditLogData {
  adminEmail: string;
  adminId: string;
  actionType: "CREATE_PROJECT" | "UPDATE_PROJECT" | "DELETE_PROJECT" | "UPDATE_USER_ROLE" | "DELETE_TESTIMONIAL" | "UPDATE_SUPPORT_TICKET" | "DELETE_MESSAGE" | "UPDATE_LEAD" | "DELETE_LEAD";
  targetResource: string;
  details: string;
}

export const logAdminAction = async (logData: AuditLogData) => {
  try {
    await addDoc(collection(db, "audit_logs"), {
      ...logData,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error writing audit log:", error);
    return { success: false, error };
  }
};
