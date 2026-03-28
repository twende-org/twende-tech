import { CheckCircle2, MessageSquare, Palette, Code, Zap } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery & Strategy",
    description: "We dive deep into your goals, target audience, and market to define a winning product strategy.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Our designers create intuitive, high-fidelity interfaces that prioritize user experience and brand identity.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    icon: Code,
    title: "Agile Development",
    description: "We build your solution using modern tech stacks, ensuring scalability, security, and performance.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Zap,
    title: "Launch & Growth",
    description: "From deployment to ongoing support, we ensure your launch is flawless and your product scales.",
    color: "text-accent",
    bg: "bg-accent/10"
  }
];

const Process = () => {
  return (
    <section className="py-24 px-4 bg-background/50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            How we transform your vision into a high-performance digital reality. 
            A structured, transparent journey from idea to impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-2xl hover-lift relative group overflow-hidden border-border/50"
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-4xl font-black opacity-5 text-foreground group-hover:opacity-10 transition-opacity">
                0{index + 1}
              </div>

              <div className={`w-14 h-14 ${step.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>

              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>

              {/* Decorative line for non-last items on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border/50 z-20"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm border border-primary/20">
            <CheckCircle2 className="w-4 h-4" />
            Guaranteed Quality & Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
