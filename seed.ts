import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./src/lib/firebase";
import { initialProjects, initialTestimonials } from "./src/data/initialData";

const messages = [
  {
    name: "Juma Rashid",
    email: "j.rashid@dodomaretails.co.tz",
    subject: "Inventory System Inquiry",
    message: "Habari, I'm interested in building a custom inventory management system for my retail shops in Dodoma and Arusha. Can we schedule a virtual meeting?",
    phone: "+255 754 123 456",
    status: "New",
    priority: "High",
    date: "2024-03-27",
    time: "10:30 AM"
  }
];

export const seedData = async () => {
  // Seed Projects
  for (const project of initialProjects) {
    const { id, ...projectData } = project; // Remove static ID
    await addDoc(collection(db, "projects"), {
      ...projectData,
      createdAt: serverTimestamp()
    });
  }

  // Seed Testimonials
  for (const testimonial of initialTestimonials) {
    const { id, ...testimonialData } = testimonial; // Remove static ID
    await addDoc(collection(db, "testimonials"), {
      ...testimonialData,
      createdAt: serverTimestamp()
    });
  }

  // Seed Messages
  for (const message of messages) {
    await addDoc(collection(db, "messages"), {
      ...message,
      createdAt: serverTimestamp()
    });
  }

  console.log("Seeding complete!");
};
