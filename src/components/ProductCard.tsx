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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3 bg-black/20 backdrop-blur-[2px]">
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
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">{product.name}</h3>
          
          <ul className="space-y-2 mb-6 flex-grow">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent/60" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/5 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-black text-foreground">{product.price}</span>
                <span className="text-xs text-muted-foreground ml-1">{product.pricingPlans ? "Starting at" : "/ license"}</span>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <Zap className="w-4 h-4 text-accent" />
              </div>
            </div>
            
            <Button 
              className="w-full bg-foreground text-background hover:bg-primary hover:text-white transition-all font-bold"
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative animate-slide-up border border-white/10 shadow-2xl bg-bg-card">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full hover:bg-white/10"
              onClick={() => setShowPricing(false)}
            >
              <X className="w-6 h-6 text-foreground" />
            </Button>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-2 text-foreground">{product.name} Pricing</h2>
              <p className="text-muted-foreground text-lg">Simple & Transparent Pricing. Choose the plan that fits you.</p>
            </div>

            <div className={`grid gap-6 ${product.pricingPlans && product.pricingPlans.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
              {product.pricingPlans?.map((plan, idx) => (
                <div key={idx} className={`p-8 rounded-2xl border flex flex-col transition-all hover:scale-[1.02] ${plan.isPopular ? 'border-accent bg-accent/5 ring-2 ring-accent/20' : 'border-white/10 bg-white/5'}`}>
                  {plan.isPopular && (
                    <div className="bg-accent text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-4 mx-auto">Popular Choice</div>
                  )}
                  <h4 className="text-2xl font-bold mb-2 text-center text-foreground">{plan.name}</h4>
                  <div className="mb-6 text-center">
                    <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-tight">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-6 font-bold text-lg ${plan.isPopular ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20' : 'bg-white/10 hover:bg-white/20 text-foreground'}`}
                    onClick={handleVisit}
                  >
                    Select {plan.name}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground">
              All plans include secure cloud storage and priority support.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
