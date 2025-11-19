import { Users, MapPin, Target, Heart } from "lucide-react";
import kululinda from "@/assets/alex-mwenda.webp";
import norman from "@/assets/john-massawe.webp";


const About = () => {
  const founders = [
    {
      name: "Kululinda Mlekwa",
      role: "Full-Stack Developer & Co-Founder",
      expertise: "React, Node.js, Cloud Architecture",
      description: "Passionate about creating scalable web applications and leading technical innovation.",
      image: kululinda
    },
    {
      name: "Joshua Massawe",
      role: "UI/UX Designer & Co-Founder",
      expertise: "Design Systems, User Research, Figma",
      description: "Crafting beautiful and intuitive user experiences that drive business results.",
      image: norman
    },
    {
      name: "Norman Mushi",
      role: "Mobile Developer & Co-Founder",
      expertise: "React Native, Flutter, iOS/Android",
      description: "Building high-performance mobile applications that users love to interact with.",
      image: kululinda
    }
  ];

  return (
    <div>


      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              About <span className="gradient-text">Twende</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Twende Digital is led by a team of experienced Tanzanian software developers, designers, and IT professionals who build scalable web and mobile applications, custom software, and digital solutions for businesses across Africa.
            </p>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 rounded-xl hover-lift text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                Empower businesses and organizations in Tanzania and Africa with reliable, affordable, and innovative digital solutions that improve efficiency and growth.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl hover-lift text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <ul className="text-muted-foreground list-disc list-inside text-left">
                <li>Innovation – Continuously improve to meet client needs</li>
                <li>Reliability – Stable, secure, dependable systems</li>
                <li>Integrity – Transparent, honest, professional</li>
                <li>Customer-Centered – Prioritize client needs</li>
                <li>Quality – High standards in development & design</li>
                <li>Continuous Improvement – Learn, optimize, stay ahead</li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-xl hover-lift text-center">
              <MapPin className="w-12 h-12 text-primary-glow mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Our Location</h3>
              <p className="text-muted-foreground">
                Based in Dodoma, Tanzania. Serving schools, clinics, SACCOs, hotels, and businesses locally and globally.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "On-Demand Software Team",
                description: "Regular updates, bug fixes, hosting, security, and WhatsApp/email support",
                icon: Users
              },
              {
                title: "White-Label Software Products",
                description: "Ready-made solutions for schools, clinics, SACCOs, hotels, retail businesses",
                icon: Target
              },
              {
                title: "Custom Software Development",
                description: "Tailored web/mobile apps, API integrations, scalable solutions",
                icon: MapPin
              },
              {
                title: "IT Support & Maintenance",
                description: "Cloud hosting management, system monitoring, monthly reports",
                icon: Heart
              },
              {
                title: "Design & UX Services",
                description: "Website and app design, dashboard & workflow optimization",
                icon: Users
              }
            ].map((service) => (
              <div key={service.title} className="glass-card p-8 rounded-xl hover-lift text-center">
                <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>



          {/* Team Members */}
          {/* <div className="mb-16">
            <div className="flex items-center justify-center mb-12">
              <Users className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-3xl font-bold">Meet Our Team</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {founders.map((founder, index) => (
                <div key={founder.name} className="glass-card p-8 rounded-xl hover-lift group">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    <img
                      src={founder.image}
                      alt={`${founder.name} - ${founder.role}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">{founder.name}</h4>
                    <p className="text-primary font-medium mb-3">{founder.role}</p>
                    <p className="text-sm text-accent mb-4">{founder.expertise}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {founder.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-8 rounded-xl">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "50+", label: "Projects Completed" },
              { number: "20+", label: "Happy Clients" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;