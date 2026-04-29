import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  image?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  createdAt: any;
  updatedAt: any;
  clientId?: string; // Link to a client user
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  status: string;
  avatar: string;
  date: string;
  createdAt: any;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  subject: string;
  message: string;
  phone?: string;
  status: string;
  priority: string;
  date: string;
  time: string;
  createdAt: any;
}

export interface Ticket {
  id: string;
  clientId: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: any;
}

// Helper to handle non-serializable Firestore data
const serializeData = (doc: any) => {
  const data = doc.data();
  const serialized: any = { id: doc.id };
  
  for (const key in data) {
    if (data[key]?.toDate) {
      serialized[key] = data[key].toDate().toISOString();
    } else {
      serialized[key] = data[key];
    }
  }
  return serialized;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Projects", "Testimonials", "Messages", "Leads", "Users", "Tickets"],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<Project[], void>({
      async queryFn() {
        try {
          const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(projectsQuery);
          const projects = querySnapshot.docs.map(serializeData) as Project[];
          return { data: projects };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Projects"],
    }),
    getClientProjects: builder.query<Project[], string>({
      async queryFn(clientId) {
        try {
          const projectsQuery = query(
            collection(db, "projects"), 
            where("clientId", "==", clientId),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(projectsQuery);
          const projects = querySnapshot.docs.map(serializeData) as Project[];
          return { data: projects };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation<void, any>({
      async queryFn(projectData) {
        try {
          await addDoc(collection(db, "projects"), {
            ...projectData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<void, { id: string; [key: string]: any }>({
      async queryFn({ id, ...updates }) {
        try {
          const docRef = doc(db, "projects", id);
          await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "projects", id));
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Projects"],
    }),
    
    // Testimonials
    getTestimonials: builder.query<Testimonial[], void>({
      async queryFn() {
        try {
          const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(serializeData) as Testimonial[];
          return { data };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Testimonials"],
    }),
    addTestimonial: builder.mutation<void, any>({
      async queryFn(testimonial) {
        try {
          await addDoc(collection(db, "testimonials"), {
            ...testimonial,
            createdAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Testimonials"],
    }),
    updateTestimonial: builder.mutation<void, { id: string; [key: string]: any }>({
      async queryFn({ id, ...updates }) {
        try {
          const docRef = doc(db, "testimonials", id);
          await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Testimonials"],
    }),
    deleteTestimonial: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "testimonials", id));
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Testimonials"],
    }),
    
    // Messages
    getMessages: builder.query<Message[], void>({
      async queryFn() {
        try {
          const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(messagesQuery);
          const messages = querySnapshot.docs.map(serializeData) as Message[];
          return { data: messages };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation<void, any>({
      async queryFn(messageData) {
        try {
          const now = new Date();
          const date = now.toLocaleDateString();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          const finalMessage = {
            ...messageData,
            date,
            time,
            status: "New",
            priority: messageData.priority || "Medium",
            subject: messageData.subject || `${messageData.projectType} Inquiry` || "General Inquiry",
            createdAt: serverTimestamp(),
          };

          const docRef = await addDoc(collection(db, "messages"), finalMessage);
          return { data: { id: docRef.id, ...finalMessage } as any };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Messages"],
    }),
    updateMessage: builder.mutation<void, { id: string; [key: string]: any }>({
      async queryFn({ id, ...updates }) {
        try {
          const docRef = doc(db, "messages", id);
          await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "messages", id));
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Messages"],
    }),

    // Leads
    getLeads: builder.query<any[], void>({
      async queryFn() {
        try {
          const leadsQuery = query(collection(db, "leads"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(leadsQuery);
          const leads = querySnapshot.docs.map(doc => {
            const data = serializeData(doc);
            // Format dates/times for consistency with messages UI
            const created = new Date(data.createdAt);
            return {
              ...data,
              date: created.toLocaleDateString(),
              time: created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              // Map to message-like fields for UI compatibility
              subject: `${data.serviceType} Consultation`,
              message: data.projectDetails || "",
              priority: data.budget ? (data.budget.includes("50M") ? "High" : "Medium") : "Low",
              status: data.status || "New"
            };
          });
          return { data: leads };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Leads"],
    }),
    updateLead: builder.mutation<void, { id: string; [key: string]: any }>({
      async queryFn({ id, ...updates }) {
        try {
          const docRef = doc(db, "leads", id);
          await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Leads"],
    }),
    deleteLead: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "leads", id));
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Leads"],
    }),

    // Users
    getUsers: builder.query<any[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const users = querySnapshot.docs.map(serializeData);
          return { data: users };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Users"]
    }),
    updateUserRole: builder.mutation<void, { id: string, role: string }>({
      async queryFn({ id, role }) {
        try {
          await updateDoc(doc(db, "users", id), { role });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Users"]
    }),

    // Tickets
    getSupportTickets: builder.query<Ticket[], string>({
      async queryFn(clientId) {
        try {
          const ticketsQuery = query(
            collection(db, "tickets"), 
            where("clientId", "==", clientId),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(ticketsQuery);
          const tickets = querySnapshot.docs.map(serializeData) as Ticket[];
          return { data: tickets };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Tickets"]
    }),
    addSupportTicket: builder.mutation<void, Partial<Ticket>>({
      async queryFn(ticket) {
        try {
          await addDoc(collection(db, "tickets"), {
            ...ticket,
            status: "Open",
            priority: ticket.priority || "Medium",
            createdAt: serverTimestamp()
          });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Tickets"]
    }),
  }),
});

export const { 
  useGetProjectsQuery, 
  useGetClientProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetMessagesQuery, 
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetLeadsQuery,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetSupportTicketsQuery,
  useAddSupportTicketMutation
} = apiSlice;
