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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Projects", "Testimonials", "Messages"],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<Project[], void>({
      async queryFn() {
        try {
          const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(projectsQuery);
          const projects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
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
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[];
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
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Message[];
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
  }),
});

export const { 
  useGetProjectsQuery, 
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
  useDeleteMessageMutation
} = apiSlice;
