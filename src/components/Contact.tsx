import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/Map";
import Navigation from "./Navigation";
import Footer from "./Footer";


const Contact = () => {
  return (
    <div>
     <Navigation/>
     
     <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input placeholder="Your full name" className="bg-muted/20 border-muted" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your.email@company.com" className="bg-muted/20 border-muted" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <Input placeholder="Your company name" className="bg-muted/20 border-muted" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Project Type</label>
                <select className="w-full p-3 rounded-lg bg-muted/20 border border-muted text-foreground">
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
                    <p className="text-muted-foreground">hello@twendedigital.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+255 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-glow/10 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-primary-glow" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">+255 987 654 321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-glow/10 rounded-lg flex items-center justify-center mr-4 mt-2">
                    <MapPin className="w-6 h-6 text-accent-glow" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-3">Location</p>
                    <p className="text-muted-foreground mb-4">Dar es Salaam, Tanzania</p>
                    <Map />
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
                  "Transparent pricing"
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
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by forward-thinking companies worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-50">
            {/* Company logos would go here - using placeholders */}
            {['TechCorp', 'InnovateNow', 'FutureApps', 'DigitalPro'].map((company, index) => (
              <div key={index} className="text-lg font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      
      <Footer/>
    </div>
    
  );
};

export default Contact;