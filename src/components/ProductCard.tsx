import { ShoppingCart, Eye, Star, ShieldCheck, Zap, X, Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
    liveUrl?: string;
    features: string[];
    isNew?: boolean;
    isPopular?: boolean;
    pricingPlans?: PricingPlan[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showPricing, setShowPricing] = useState(false);

  const handleVisit = () => {
    if (product.liveUrl) {
      window.open(product.liveUrl, "_blank");
    }
  };

  return (
    <>
      <div className="glass-card rounded-2xl overflow-hidden hover-lift group border border-white/5 flex flex-col h-full bg-bg-card">
        {/* Image Area */}
        <div className="relative h-48 bg-bg-elevated overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-white border-none shadow-lg">New Release</Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-accent text-white border-none shadow-lg">Best Seller</Badge>
            )}
          </div>
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity gap-3 bg-black/40 backdrop-blur-[2px] z-10 lg:opacity-0 lg:group-hover:opacity-100 max-lg:opacity-100 max-lg:bg-black/20">
            <Button variant="secondary" size="sm" className="rounded-full shadow-xl" onClick={() => setShowPricing(true)}>
              <Eye className="w-4 h-4 mr-2" />
              View Pricing
            </Button>
            {product.liveUrl && (
              <Button variant="hero" size="sm" className="rounded-full shadow-xl" onClick={handleVisit}>
                Visit Platform
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-wider uppercase">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] md:text-xs font-bold text-foreground">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">{product.name}</h3>
          
          <ul className="space-y-2 mb-6 flex-grow">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent/60 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xl md:text-2xl font-black text-foreground">{product.price}</span>
                <span className="text-[10px] md:text-xs text-muted-foreground ml-1">{product.pricingPlans ? "Starting at" : "/ license"}</span>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <Zap className="w-4 h-4 text-accent" />
              </div>
            </div>
            
            <Button 
              className="w-full bg-foreground text-background hover:bg-primary hover:text-white transition-all font-bold text-sm md:text-base"
              onClick={handleVisit}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.pricingPlans ? "Choose Plan" : "Purchase License"}
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-md">
          <div className="glass-card w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl md:rounded-3xl p-4 md:p-8 relative animate-slide-up border border-white/10 shadow-2xl bg-bg-card">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 md:top-4 md:right-4 rounded-full hover:bg-white/10 z-10"
              onClick={() => setShowPricing(false)}
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </Button>

            <div className="text-center mb-8 md:mb-12 pt-4 md:pt-0">
              <h2 className="text-2xl md:text-4xl font-black mb-2 text-foreground">{product.name} Pricing</h2>
              <p className="text-muted-foreground text-sm md:text-lg px-4">Simple & Transparent. Choose the plan that fits you.</p>
            </div>

            <div className={`grid gap-4 md:gap-6 ${product.pricingPlans && product.pricingPlans.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
              {product.pricingPlans?.map((plan, idx) => (
                <div key={idx} className={`p-5 md:p-8 rounded-xl md:rounded-2xl border flex flex-col transition-all hover:scale-[1.01] ${plan.isPopular ? 'border-accent bg-accent/5 ring-1 md:ring-2 ring-accent/20' : 'border-white/10 bg-white/5'}`}>
                  {plan.isPopular && (
                    <div className="bg-accent text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-4 mx-auto">Popular Choice</div>
                  )}
                  <h4 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-center text-foreground">{plan.name}</h4>
                  <div className="mb-4 md:mb-6 text-center">
                    <span className="text-2xl md:text-3xl font-black text-foreground">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground leading-tight">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-4 md:py-6 font-bold text-sm md:text-lg ${plan.isPopular ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20' : 'bg-white/10 hover:bg-white/20 text-foreground'}`}
                    onClick={handleVisit}
                  >
                    Select {plan.name}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 text-center text-[10px] md:text-sm text-muted-foreground">
              All plans include secure cloud storage and priority support.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
