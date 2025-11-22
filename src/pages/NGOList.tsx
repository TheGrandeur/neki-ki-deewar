import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, CheckCircle2 } from "lucide-react";

// Mock NGO data
const ngos = [
  {
    id: 1,
    name: "Hope Foundation",
    city: "Mumbai",
    category: "Education",
    description: "Empowering underprivileged children through quality education",
    needs: ["Books", "Stationery", "Uniforms"],
    verified: true,
  },
  {
    id: 2,
    name: "Care & Cure",
    city: "Delhi",
    category: "Healthcare",
    description: "Providing medical care to rural communities",
    needs: ["Medical Supplies", "Medicines", "Equipment"],
    verified: true,
  },
  {
    id: 3,
    name: "Green Earth Initiative",
    city: "Bangalore",
    category: "Environment",
    description: "Protecting nature and promoting sustainability",
    needs: ["Saplings", "Tools", "Resources"],
    verified: true,
  },
  {
    id: 4,
    name: "Child Smile Orphanage",
    city: "Chennai",
    category: "Orphanage",
    description: "Creating a loving home for orphaned children",
    needs: ["Clothes", "Food", "Educational Materials"],
    verified: true,
  },
  {
    id: 5,
    name: "Skill India Trust",
    city: "Pune",
    category: "Education",
    description: "Vocational training for youth employment",
    needs: ["Training Equipment", "Computers", "Books"],
    verified: true,
  },
  {
    id: 6,
    name: "Elderly Care Foundation",
    city: "Kolkata",
    category: "Healthcare",
    description: "Supporting senior citizens with healthcare and companionship",
    needs: ["Medical Supplies", "Wheelchairs", "Care Equipment"],
    verified: true,
  },
];

const categories = ["All", "Education", "Healthcare", "Orphanage", "Environment"];

const NGOList = () => {
  const [searchParams] = useSearchParams();
  const donationType = searchParams.get("type");
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      ngo.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {donationType === "resources" && "NGOs Accepting Resources"}
            {donationType === "funds" && "NGOs Accepting Funds"}
            {!donationType && "Explore Verified NGOs"}
          </h1>
          <p className="text-muted-foreground text-lg">
            All NGOs are verified on blockchain for your trust and security
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by NGO name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* NGO Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNGOs.map((ngo) => (
            <Link key={ngo.id} to={`/ngo/${ngo.id}`}>
              <Card className="h-full shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1 cursor-pointer p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-white font-bold text-xl">
                    {ngo.name.charAt(0)}
                  </div>
                  {ngo.verified && (
                    <Badge className="bg-verified text-verified-foreground">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-xl mb-2">{ngo.name}</h3>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{ngo.city}</span>
                </div>

                <Badge variant="outline" className="mb-3">
                  {ngo.category}
                </Badge>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {ngo.description}
                </p>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Current Needs:</p>
                  <div className="flex flex-wrap gap-1">
                    {ngo.needs.slice(0, 3).map((need, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredNGOs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No NGOs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOList;
