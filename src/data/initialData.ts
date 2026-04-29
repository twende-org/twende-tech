import { Project } from "@/store/apiSlice";

export const initialProjects: Project[] = [
  {
    id: "legal-ai",
    title: "Enterprise Legal Intelligence",
    category: "Enterprise Innovation",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    description: "Architecting a high-performance legal analysis engine that automates document discovery using advanced NLP and private cloud architecture.",
    challenge: "Law firms were spending 40% of their billable hours on manual document review, leading to burnout and human error in critical cases.",
    solution: "We engineered a proprietary legal-LLM wrapper with RAG (Retrieval-Augmented Generation) hosted on a secure, local Kubernetes cluster to ensure total data sovereignty.",
    tech: ["React", "Python", "Kubernetes", "Redis", "VectorDB"],
    results: [
      "75% Reduction in review time",
      "Enterprise-grade security (SOC2 compliant)",
      "Processed 1M+ documents in 4 weeks"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "Completed"
  },
  {
    id: "twende-docs",
    title: "Twende Docs Platform",
    category: "Verified Marketplace",
    image: "/assets/portfolio/twendedocs.png",
    description: "A specialized e-document engine designed for the Tanzanian market, automating legal and professional document creation.",
    challenge: "Professionals in Tanzania lacked accessible tools to generate legally sound documents quickly, often relying on expensive manual drafting.",
    solution: "We built a high-availability web platform with integrated Azam Pesa payments and dynamic PDF generation optimized for local legal standards.",
    tech: ["React", "Django", "PostgreSQL", "Azam Pesa"],
    results: [
      "90% Faster document generation",
      "1,000+ Active users in Month 1",
      "Seamless mobile payment integration"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "Completed"
  },
  {
    id: "tulete-app",
    title: "Tulete Super-App",
    category: "Managed Tech Services",
    image: "/assets/portfolio/tuleteApp.webp",
    description: "A comprehensive hyperlocal service ecosystem providing food delivery, shopping, and laundry services in one unified mobile interface.",
    challenge: "Fragmented service delivery in regional cities caused massive logistical headaches for both vendors and customers.",
    solution: "We engineered a cross-platform Flutter application with real-time GPS tracking and a centralized vendor management dashboard.",
    tech: ["Flutter", "Firebase", "Google Maps", "Cloud Functions"],
    results: [
      "15% Increase in vendor revenue",
      "25 Min average delivery time",
      "4.8/5 Average app store rating"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "Completed"
  },
  {
    id: "duka-pos",
    title: "Verified Marketplace Engine",
    category: "Verified Marketplace",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    description: "A resilient multi-tenant retail platform designed for rapid deployment and seamless inventory synchronization across 500+ locations.",
    challenge: "Existing POS systems in the region were fragile, losing critical sales data during frequent internet outages.",
    solution: "Implemented an offline-first architecture using PWA technology and background sync workers, ensuring zero data loss regardless of connectivity.",
    tech: ["React", "TypeScript", "Node.js", "PWA", "Firebase"],
    results: [
      "100% Data integrity in offline mode",
      "50% Faster checkout performance",
      "Scaled to 10k daily transactions"
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "Completed"
  }
];

export const initialTestimonials = [
  {
    id: "t1",
    name: "Dr. Maria Kamau",
    company: "Kamau & Associates Legal",
    position: "Managing Partner",
    content: "The AI Legal Intelligence system transformed our practice. What used to take our juniors weeks now takes minutes, with zero compromise on accuracy.",
    rating: 5,
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=maria",
    date: "April 2026",
    createdAt: new Date()
  },
  {
    id: "t2",
    name: "John Mwangi",
    company: "Global Logistics Ltd",
    position: "Operations Director",
    content: "Twende Digital's Managed Tech Services gave us the visibility we've been missing for a decade. Our fleet efficiency is at an all-time high.",
    rating: 5,
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=john",
    date: "March 2026",
    createdAt: new Date()
  }
];
