import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/50 border-t border-border/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
             
              <span className="text-xl font-black">
                <span className="gradient-text">Twende</span> Digital
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Professional software development services by skilled Tanzanian developers. 
              Creating exceptional digital solutions for global clients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-3" />
                <span className="text-muted-foreground text-sm">twendedigital@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-3" />
                <span className="text-muted-foreground text-sm">+255 676 155 385</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-primary mr-3" />
                <span className="text-muted-foreground text-sm">Dodoma, Tanzania</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Twende Digital. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;