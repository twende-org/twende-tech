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
              About <span className="gradient-text">Twende Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a premier pan-African digital engineering firm. Our mission is to accelerate the digital transformation of businesses through high-performance software, managed services, and industry-proven products.
            </p>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 rounded-2xl hover-lift text-center border border-white/5">
              <Target className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower African enterprises with world-class digital infrastructure that drives measurable efficiency, scalability, and sustainable growth.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift text-center border border-white/5">
              <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Core Values</h3>
              <ul className="text-muted-foreground space-y-2 text-left inline-block">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Engineering Excellence</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Radical Transparency</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Security-First Mindset</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Iterative Innovation</li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-lift text-center border border-white/5">
              <MapPin className="w-12 h-12 text-primary-glow mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Presence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Headquartered in Dodoma, Tanzania. We serve a global portfolio of clients across education, retail, healthcare, and financial services.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Managed Support",
                description: "Proactive infrastructure oversight, security auditing, and high-priority technical support desk.",
                icon: Users
              },
              {
                title: "Software Marketplace",
                description: "Enterprise-ready, verified software products designed for rapid deployment and zero friction.",
                icon: Target
              },
              {
                title: "Enterprise Engineering",
                description: "Bespoke digital architecture and development for complex, high-scale business requirements.",
                icon: MapPin
              }
            ].map((service) => (
              <div key={service.title} className="glass-card p-8 rounded-2xl hover-lift text-center border border-white/5">
                <service.icon className="w-10 h-10 text-primary mx-auto mb-6 opacity-80" />
                <h4 className="text-xl font-bold mb-3 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
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