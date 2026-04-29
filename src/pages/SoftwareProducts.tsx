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
    category: "Retail & Commerce",
    price: "0 TZS",
    rating: 5.0,
    reviews: 120,
    image: dukaImage,
    liveUrl: "https://duka.twendedigital.tech/nyumbani#pricing",
    features: [
      "Real-time Inventory Management",
      "Omnichannel Sales Tracking",
      "Integrated Cloud POS System",
      "Multi-store Sync & Analytics"
    ],
    isPopular: true,
    pricingPlans: [
      {
        name: "Community",
        price: "0 TZS",
        features: ["1 Managed Shop", "Up to 50 SKU items", "Public Online Presence"]
      },
      {
        name: "Professional",
        price: "9,900 TZS/mo",
        features: ["1 Managed Shop", "Unlimited SKU items", "Basic Sales Analytics", "Inventory Alerts"]
      },
      {
        name: "Business Plus",
        price: "29,900 TZS/mo",
        features: ["5 Managed Shops", "Unlimited Staff Roles", "Advanced Financial Reports", "Priority Tech Support"],
        isPopular: true
      },
      {
        name: "Enterprise",
        price: "79,900 TZS/mo",
        features: ["Unlimited Infrastructure", "API Access (Webhooks)", "Custom Branding", "24/7 Dedicated Account Manager"]
      }
    ]
  },
  {
    id: "docs",
    name: "Twende Docs",
    category: "Professional Services",
    price: "1,000 TZS",
    rating: 4.9,
    reviews: 85,
    image: docsImage,
    liveUrl: "https://docs.twendedigital.tech/pricing",
    features: [
      "AI-Powered Document Generation",
      "Regulatory Compliance Templates",
      "Encrypted Cloud Archiving",
      "Automated Legal Workflow"
    ],
    isNew: true,
    pricingPlans: [
      {
        name: "Lite",
        price: "1,000 TZS",
        features: ["1 Standard Credit", "Instant PDF Engine", "Cloud Auto-Save", "AI Search Indexing"]
      },
      {
        name: "Bundle",
        price: "5,000 TZS",
        features: ["10 Standard Credits", "Premium Template Library", "Bulk Export Capability", "Priority Rendering"]
      },
      {
        name: "Agent Pro",
        price: "10,000 TZS",
        features: ["25 Premium Credits", "Custom Firm Letterheads", "Team Collaboration Tools", "White-label Output"],
        isPopular: true
      }
    ]
  }
];

const SoftwareProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["Education", "Retail", "Healthcare", "Finance", "Hospitality"];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight">
            Software <span className="text-primary-glow">Marketplace</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Ready-to-use software for your business. Skip the development time and launch today with our professional white-label products.
          </p>
        </div>

        {/* Filter Section */}
        <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl mb-8 md:mb-12 border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-grow max-w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search software systems..." 
                className="pl-10 bg-bg-elevated border-white/5 focus:border-primary/50 transition-all text-sm h-10 md:h-12"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              <Button 
                variant={activeCategory === "All" ? "default" : "secondary"} 
                onClick={() => setActiveCategory("All")}
                className="rounded-full px-4 md:px-6 h-8 md:h-10 text-xs md:text-sm whitespace-nowrap"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? "default" : "secondary"} 
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 md:px-6 h-8 md:h-10 text-xs md:text-sm whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
              <Button variant="ghost" size="icon" className="text-primary"><Grid className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><ListIcon className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
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
