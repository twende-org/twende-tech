import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";

const EnvVar = import.meta.env;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    // console.log("FormData",formData)
    emailjs
      .send(
        serviceId,       
        templateId,      
        formData,
        publicKey
      )
      .then(
        () => {
          setStatus("Message sent successfully ✅");
          setFormData({
            name: "",
            email: "",
            company: "",
            projectType: "",
            message: "",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus("Failed to send ❌");
        }
      );
  };
  return (
    <div className="w-full">

      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? Get in touch with us and let's discuss
              how we can help bring your project to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="Your full name" name="name" value={formData.name} onChange={handleChange} className="bg-muted/20 border-muted" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your.email@company.com" name="email" value={formData.email} onChange={handleChange} className="bg-muted/20 border-muted" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input placeholder="Your company name" name="company" value={formData.company} onChange={handleChange} className="bg-muted/20 border-muted" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-muted/20 border border-muted text-foreground"
                  >
                    <option value="">Select Project Type</option>
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Custom Software</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Project Details</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    rows={5}
                    className="bg-muted/20 border-muted resize-none"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
              {status && <p className="text-center mt-4 text-sm">{status}</p>}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info.twendedigital@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+255 692 671 206</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-glow/10 rounded-lg flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-primary-glow" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground">+255 692 671 206</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-glow/10 rounded-lg flex items-center justify-center mr-4 mt-2">
                      <MapPin className="w-6 h-6 text-accent-glow" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-3">Location</p>
                      <p className="text-muted-foreground mb-4">Dodoma Urban, Tanzania</p>
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d507760.24018899363!2d35.47778506204196!3d-6.147234251628365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184d9833e8887535%3A0xe9916b3ec90617fc!2sDodoma%20Urban!5e0!3m2!1sen!2stz!4v1753169818038!5m2!1sen!2stz"
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="glass-card p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-4">Quick Response Guarantee</h4>
                <p className="text-muted-foreground mb-4">
                  We understand that time is crucial for your business. That's why we guarantee:
                </p>
                <ul className="space-y-2">
                  {[
                    "Response within 24 hours",
                    "Free initial consultation",
                    "Detailed project proposal",
                    "Transparent pricing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button variant="accent" size="lg" className="w-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center max-w-5xl mx-auto">
            <p className="text-muted-foreground mb-8">
              Trusted by forward-thinking companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-50">
              {["TechCorp", "InnovateNow", "FutureApps", "DigitalPro"].map((company, index) => (
                <div
                  key={index}
                  className="text-lg font-bold text-muted-foreground whitespace-nowrap"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


    </div>
  );
};

export default Contact;
