import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: "Innovation" | "Assurance" | "Deployment" | "Other";
  projectDetails: string;
  budget?: string;
  timeline?: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: any;
}

export const submitLead = async (leadData: Omit<Lead, "status" | "createdAt">) => {
  try {
    const leadsRef = collection(db, "leads");
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting lead: ", error);
    return { success: false, error };
  }
};
