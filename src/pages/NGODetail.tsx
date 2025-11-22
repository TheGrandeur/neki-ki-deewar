import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, Heart, Share2 } from "lucide-react";

// Mock NGO data
const ngoData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Hope Foundation",
    city: "Mumbai",
    category: "Education",
    description: "Hope Foundation has been empowering underprivileged children through quality education since 2010. We believe every child deserves access to learning opportunities that can transform their future.",
    longDescription: "Our mission is to provide comprehensive educational support to children from marginalized communities. We run after-school programs, provide scholarships, and ensure access to quality learning materials. Over the past decade, we've helped over 5,000 children achieve their educational goals.",
    needs: [
      { item: "Books & Textbooks", quantity: "500 units", priority: "High" },
      { item: "Stationery Sets", quantity: "300 sets", priority: "High" },
      { item: "School Uniforms", quantity: "200 sets", priority: "Medium" },
      { item: "Computer Equipment", quantity: "10 units", priority: "Medium" },
      { item: "Sports Equipment", quantity: "Various", priority: "Low" },
    ],
    verified: true,
    blockchainHash: "0x8f7e3d2c1b9a5f4e3d2c1b9a8f7e3d2c",
    contact: "contact@hopefoundation.org",
    established: "2010",
    beneficiaries: "5000+",
  },
};

const NGODetail = () => {
  const { id } = useParams();
  const ngo = ngoData[id || "1"];

  if (!ngo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">NGO not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center text-white font-bold text-3xl">
                {ngo.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{ngo.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{ngo.city}</span>
                  </div>
                  <Badge variant="outline">{ngo.category}</Badge>
                  {ngo.verified && (
                    <Badge className="bg-verified text-verified-foreground">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-lg text-muted-foreground">{ngo.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-primary">{ngo.established}</p>
            <p className="text-sm text-muted-foreground">Established</p>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-primary">{ngo.beneficiaries}</p>
            <p className="text-sm text-muted-foreground">Beneficiaries</p>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-verified">100%</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </Card>
        </div>

        {/* About */}
        <Card className="p-6 mb-8 shadow-card">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-muted-foreground leading-relaxed">{ngo.longDescription}</p>
        </Card>

        {/* Current Needs */}
        <Card className="p-6 mb-8 shadow-card">
          <h2 className="text-2xl font-bold mb-4">Current Needs</h2>
          <p className="text-muted-foreground mb-6">
            Help us by donating any of the following items we currently need:
          </p>
          <div className="space-y-3">
            {ngo.needs.map((need: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div>
                  <p className="font-semibold">{need.item}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {need.quantity}</p>
                </div>
                <Badge
                  variant={need.priority === "High" ? "default" : "outline"}
                  className={need.priority === "High" ? "bg-primary" : ""}
                >
                  {need.priority}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Blockchain Verification */}
        <Card className="p-6 mb-8 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-verified flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Blockchain Verified</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This NGO's verification is recorded on the blockchain for transparency and trust.
              </p>
              <div className="bg-background/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Verification Hash:</p>
                <p className="font-mono text-xs break-all">{ngo.blockchainHash}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="flex gap-4">
          <Link to={`/donate/form?ngo=${ngo.id}`} className="flex-1">
            <Button size="lg" className="w-full">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NGODetail;
