import { Star, Loader2 } from "lucide-react";
import { useGetTestimonialsQuery, Testimonial } from "@/store/apiSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialTestimonials } from "@/data/initialData";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery(undefined);

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Only show approved testimonials from Firestore
  const firestoreApproved = testimonials?.filter(t => t.status === "Approved") || [];
  
  // Filter out duplicates if already in initialTestimonials
  const otherTestimonials = firestoreApproved.filter(
    ft => !initialTestimonials.some(it => it.name === ft.name)
  );

  const allTestimonials = [...initialTestimonials, ...otherTestimonials] as Testimonial[];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Client <span className="gradient-text">Feedback</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Twende Digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTestimonials.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="glass-card p-8 rounded-xl hover-lift">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-lg text-foreground/80 mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
};

export default Testimonials;
