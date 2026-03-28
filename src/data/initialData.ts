export const initialProjects = [
  {
    id: "static-1",
    title: "Twende Docs",
    description: "Professional document creation platform designed to save you time and help you present yourself effectively",
    image: "/assets/portfolio/twendedocs.png",
    tech: ["React Typescript", "Django", "Azam Pesa", "PostgreSQL"],
    category: "E-Document",
    liveUrl: "https://docs.twendedigital.tech",
    githubUrl: "https://github.com/FineDR/document_project",
    challenge: "Many professionals in Tanzania struggled with creating standardized, high-quality documents quickly. Manual formatting was prone to errors and time-consuming.",
    solution: "We built an automated document generation engine with pre-vetted templates and a seamless payment integration via Azam Pesa.",
    results: ["90% faster document generation", "Over 1,000 active users in the first month", "Zero payment processing errors"]
  },
  {
    id: "static-2",
    title: "Tulete App",
    description: "Tulete is your one-stop app for anything you need. Order food, shop for anything, anytime, anywhere, and enjoy convenient laundry services.",
    image: "/assets/portfolio/tuleteApp.webp",
    tech: ["Flutter", "Firebase", "Google Maps", "Push Notifications"],
    category: "Mobile App",
    liveUrl: "https://tulete.page.link/3Ds",
    githubUrl: "https://github.com/mushi2/Tulete-Client-New/tree/master",
    challenge: "Fragmented local services in Dodoma made it difficult for residents to find reliable delivery and laundry options in one place.",
    solution: "A cross-platform mobile app gathering vetted vendors into a single ecosystem with real-time tracking and push notifications.",
    results: ["15% increase in local vendor revenue", "Average delivery time reduced to 25 mins", "4.8/5 star rating on stores"]
  },
  {
    id: "static-3",
    title: "Tulete Web",
    description: "Tulete connects you to the best vetted restaurants, vetted convenient shopping stores, and laundry services all through one powerful mobile app.",
    image: "/assets/portfolio/tuleteweb.png",
    tech: ["React Typescript", "Tailwind CSS"],
    category: "Web App",
    liveUrl: "https://tulete.onrender.com",
    githubUrl: "https://github.com/MushiVerse/tulete-dodoma-web",
    challenge: "Vendors needed a way to manage inventory and orders from a larger screen, while customers wanted a desktop option for browsing.",
    solution: "A responsive web companion for the Tulete ecosystem, optimized for both vendor management and customer browsing.",
    results: ["Enabled 24/7 order management for vendors", "Reduced order processing time by 30%", "Improved SEO visibility for partnered restaurants"]
  },
  {
    id: "static-4",
    title: "Twende Digital Website",
    description: "Professional software development by skilled Tanzanian developers. We create exceptional solutions for international clients.",
    image: "/assets/portfolio/twendedigital.png",
    tech: ["React Typescript", "Tailwind CSS"],
    category: "Website",
    liveUrl: "https://twendedigital.tech",
    githubUrl: "https://github.com/twende-org/twende-tech/",
    challenge: "Global clients often perceive a 'trust gap' with remote development teams. We needed a premium digital home that reflects our standards.",
    solution: "A high-performance, aesthetically stunning website featuring modern animations, dark mode, and detailed case studies.",
    results: ["200% increase in inbound inquiries", "Improved brand perception among EU/US clients", "Lighthouse accessibility score of 100"]
  },
  {
    id: "static-5",
    title: "Twende Admin",
    description: "The Twende Digital Website Portal",
    image: "/assets/portfolio/twendeAdmin.png",
    tech: ["React Typescript", "Express JS", "Tailwind CSS"],
    category: "Web System",
    liveUrl: "https://twendedigital.tech/admin",
    githubUrl: "https://github.com/twende-org/twende-tech/",
    challenge: "Managing static content and client inquiries via raw database access was slow and risky.",
    solution: "A robust admin portal with real-time Firestore integration, secure authentication, and a custom content management system.",
    results: ["Content updates reduced from 2 hours to 5 minutes", "Centralized message management", "Enhanced data security via Firebase Auth"]
  },
  {
    id: "static-6",
    title: "Twende Duka",
    description: "The System For Shops and Adivertising Products",
    image: "/assets/portfolio/dashboard_real_1774592847866.png",
    tech: ["React Typescript", "firebase", "Tailwind CSS", "Google Maps","redux","redux-toolkit"],
    category: "Cross Platform",
    liveUrl: "https://duka.twendedigital.tech/",
    githubUrl: "https://github.com/twende-org/twende-tech/biashara-connect-4c1472b1",
    challenge: "Small shop owners in Tanzania lacks a simple way to track inventory and advertise to nearby customers.",
    solution: "A unified system that combines POS inventory tracking with a location-based advertising network.",
    results: ["Helped 50+ shops digitize inventory", "Increased local discovery by 40%", "Real-time stock alerts for owners"]
  }
];

export const initialTestimonials = [
  {
    id: "static-t1",
    name: "Baraka Mallya",
    company: "Kilimanjaro Coffee Co.",
    position: "Operations Manager",
    content: "Habari! Twende Digital transformed our supply chain tracking with a custom solution that actually works for our local context. Safi sana!",
    rating: 5,
    status: "Approved",
    avatar: "/assets/avatars/alex-mwenda.webp",
    email: "mallya.baraka@kilicoffee.co.tz",
    date: "March 2024"
  },
  {
    id: "static-t2",
    name: "Neema Kavishe",
    company: "Zanzibar Exports",
    position: "Founder",
    content: "The mobile app they built for us has seen fantastic user engagement from our clients across East Africa. This team is very reliable. Asante sana!",
    rating: 5,
    status: "Approved",
    avatar: "/assets/avatars/grace-kileo.webp",
    email: "neema.k@zanex.co.tz",
    date: "February 2024"
  }
];
