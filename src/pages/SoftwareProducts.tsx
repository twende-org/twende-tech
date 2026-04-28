import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, Grid, List as ListIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dukaImage from "@/assets/products/twendeduka.png";
import docsImage from "@/assets/products/twendedocs.png";

const products = [
  {
    id: "duka",
    name: "Twende Duka",
    category: "Retail",
    price: "0 TZS",
    rating: 5.0,
    reviews: 120,
    image: dukaImage,
    liveUrl: "https://duka.twendedigital.tech/nyumbani#pricing",
    features: ["Inventory Tracking", "Shop Visible Online", "POS System", "Multi-store Support"],
    isPopular: true,
    pricingPlans: [
      {
        name: "Free",
        price: "0 TZS",
        features: ["1 Shop", "Up to 20 products", "Shop visible online"]
      },
      {
        name: "Small",
        price: "9,900 TZS/m",
        features: ["1 Shop", "Up to 50 products", "Shop visible online", "Basic reports"]
      },
      {
        name: "Business",
        price: "29,900 TZS/m",
        features: ["5 Shops", "Unlimited products", "10 Staff", "Shops visible online", "Detailed reports", "Priority support"],
        isPopular: true
      },
      {
        name: "Enterprise",
        price: "79,900 TZS/m",
        features: ["Unlimited shops", "Unlimited products", "Unlimited staff", "API access", "24/7 Support"]
      }
    ]
  },
  {
    id: "docs",
    name: "Twende Docs",
    category: "Education",
    price: "1,000 TZS",
    rating: 4.9,
    reviews: 85,
    image: docsImage,
    liveUrl: "https://docs.twendedigital.tech/pricing",
    features: ["Instant PDF Generation", "Cloud Auto-Save", "AI Search Optimization", "Professional Templates"],
    isNew: true,
    pricingPlans: [
      {
        name: "Single Boost",
        price: "1,000 TZS",
        features: ["1 Credit", "Instant PDF Generation", "Cloud Auto-Save", "AI Search Optimization", "Priority Support"]
      },
      {
        name: "Basic Bundle",
        price: "5,000 TZS",
        features: ["10 Credits", "Instant PDF Generation", "Cloud Auto-Save", "AI Search Optimization", "Priority Support"]
      },
      {
        name: "Agent Pro",
        price: "10,000 TZS",
        features: ["25 Credits", "Instant PDF Generation", "Cloud Auto-Save", "AI Search Optimization", "Priority Support"],
        isPopular: true
      }
    ]
  }
];

const SoftwareProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Education", "Retail", "Healthcare", "Finance", "Hospitality"];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Software <span className="gradient-text">Marketplace</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Ready-to-use software for your business. Skip the development time and launch today with our professional white-label products.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              className="pl-12 py-6 bg-white/5 border-white/10 rounded-xl focus:ring-primary" 
              placeholder="Search software systems..." 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "secondary" : "ghost"}
                className={`rounded-full px-6 ${activeCategory === cat ? "bg-primary text-white" : "border border-white/5"}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 border-l border-white/10 pl-6">
            <Button variant="ghost" size="icon" className="rounded-lg bg-white/5"><Grid className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-lg"><ListIcon className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-xl text-muted-foreground">No products found in this category.</p>
          </div>
        )}

        {/* Marketplace Footer */}
        <div className="mt-24 p-12 glass-card rounded-3xl border border-white/5 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't see what you need?</h3>
          <p className="text-muted-foreground mb-8">We can customize any of our existing products or build a completely new one for you.</p>
          <Button variant="hero" size="lg">Request Custom Feature</Button>
        </div>
      </div>
    </section>
  );
};

export default SoftwareProducts;
