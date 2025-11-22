import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Package, DollarSign } from "lucide-react";

const DonateOptions = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Donation Type</h1>
          <p className="text-xl text-muted-foreground">
            Select how you'd like to contribute and make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/ngos?type=resources" className="block">
            <Card className="h-full shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-2 cursor-pointer overflow-hidden group">
              <div className="p-8">
                <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Donate Resources</h2>
                <p className="text-muted-foreground mb-6">
                  Contribute clothes, stationery, books, medical supplies, and other essential items directly to NGOs
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Clothes & Textiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Educational Supplies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Food & Essentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Medical Equipment</span>
                  </li>
                </ul>
              </div>
              <div className="h-2 gradient-hero w-full" />
            </Card>
          </Link>

          <Link to="/ngos?type=funds" className="block">
            <Card className="h-full shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-2 cursor-pointer overflow-hidden group">
              <div className="p-8">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Donate Funds</h2>
                <p className="text-muted-foreground mb-6">
                  Make financial contributions that NGOs can use for their most pressing needs and operational costs
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Flexible Amount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Instant Transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Tax Benefits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Zero Platform Fees</span>
                  </li>
                </ul>
              </div>
              <div className="h-2 bg-secondary w-full" />
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateOptions;
