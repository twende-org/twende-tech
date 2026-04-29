import { Settings, Monitor, Rocket, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const flows = [
    {
      title: "Innovation",
      description: "Custom engineering cycle",
      steps: ["Requirements Analysis", "System Engineering", "Deployment & Scale"],
      color: "text-primary",
      bg: "bg-primary/5"
    },
    {
      title: "Assurance",
      description: "Continuous infrastructure care",
      steps: ["System Health Audit", "Active Monitoring", "Iterative Optimization"],
      color: "text-accent",
      bg: "bg-accent/5"
    },
    {
      title: "Deployment",
      description: "Rapid software integration",
      steps: ["Product Selection", "Instant Provisioning", "Operational Training"],
      color: "text-muted-foreground",
      bg: "bg-muted/5"
    }
  ];

  return (
    <section className="py-24 px-4 bg-bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black mb-6">How It <span className="gradient-text">Works</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Three parallel paths to digital success, designed for speed and reliability.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {flows.map((flow, i) => (
            <div key={flow.title} className="relative">
              <div className={`p-8 rounded-2xl ${flow.bg} border border-white/5 h-full`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${flow.bg} border border-white/10`}>
                    {i === 0 ? <Rocket className={flow.color} /> : i === 1 ? <Monitor className={flow.color} /> : <Settings className={flow.color} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{flow.title}</h3>
                    <p className="text-sm text-muted-foreground">{flow.description}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {flow.steps.map((step, idx) => (
                    <div key={step} className="flex items-center gap-4 group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/10 group-hover:${flow.bg} transition-colors`}>
                        {idx + 1}
                      </div>
                      <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{step}</span>
                      <CheckCircle2 className={`w-4 h-4 ml-auto opacity-20 group-hover:opacity-100 ${flow.color} transition-all`} />
                    </div>
                  ))}
                </div>
              </div>
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
