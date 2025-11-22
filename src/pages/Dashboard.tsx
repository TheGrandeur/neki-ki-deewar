import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, DollarSign, CheckCircle2, Clock, TrendingUp } from "lucide-react";

// Mock data
const donations = [
  {
    id: "DON1234567890",
    ngo: "Hope Foundation",
    type: "resources",
    items: "Books, Stationery",
    date: "2025-01-15",
    status: "delivered",
    hash: "0x8f7e3d2c1b9a5f4e3d2c1b9a8f7e3d2c",
  },
  {
    id: "DON0987654321",
    ngo: "Care & Cure",
    type: "funds",
    amount: "₹5,000",
    date: "2025-01-10",
    status: "completed",
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
  },
  {
    id: "DON5555555555",
    ngo: "Green Earth Initiative",
    type: "resources",
    items: "Saplings, Tools",
    date: "2025-01-08",
    status: "in-progress",
    hash: "0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k",
  },
];

const ngoNeeds = [
  {
    ngo: "Hope Foundation",
    category: "Education",
    items: ["Books", "Stationery", "Computers"],
    priority: "High",
  },
  {
    ngo: "Child Smile Orphanage",
    category: "Orphanage",
    items: ["Clothes", "Food", "Toys"],
    priority: "High",
  },
  {
    ngo: "Elderly Care Foundation",
    category: "Healthcare",
    items: ["Medical Supplies", "Wheelchairs"],
    priority: "Medium",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Track your donations and manage NGO needs
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
            </div>
            <p className="text-3xl font-bold">12</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Funds</p>
            </div>
            <p className="text-3xl font-bold">₹45,000</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-verified/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-verified" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
            </div>
            <p className="text-3xl font-bold">9</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">NGOs Helped</p>
            </div>
            <p className="text-3xl font-bold">6</p>
          </Card>
        </div>

        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="needs">NGO Needs</TabsTrigger>
          </TabsList>

          <TabsContent value="donations">
            <Card className="shadow-card">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Your Donations</h2>
                <p className="text-muted-foreground">Track all your contributions</p>
              </div>
              <div className="divide-y">
                {donations.map((donation) => (
                  <div key={donation.id} className="p-6 hover:bg-muted/30 transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${donation.type === 'funds' ? 'bg-secondary' : 'gradient-hero'} flex items-center justify-center text-white`}>
                          {donation.type === "funds" ? (
                            <DollarSign className="h-6 w-6" />
                          ) : (
                            <Package className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{donation.ngo}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {donation.type === "funds" ? donation.amount : donation.items}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Donation ID: {donation.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            donation.status === "delivered" || donation.status === "completed"
                              ? "default"
                              : "outline"
                          }
                          className={
                            donation.status === "delivered" || donation.status === "completed"
                              ? "bg-verified"
                              : ""
                          }
                        >
                          {donation.status === "delivered" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {donation.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                          {donation.status.replace("-", " ")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">{donation.date}</p>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Blockchain Hash:</p>
                      <p className="font-mono text-xs break-all">{donation.hash}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="needs">
            <Card className="shadow-card">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Current NGO Needs</h2>
                <p className="text-muted-foreground">Help NGOs by fulfilling their urgent needs</p>
              </div>
              <div className="divide-y">
                {ngoNeeds.map((need, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/30 transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{need.ngo}</h3>
                        <Badge variant="outline" className="mb-3">
                          {need.category}
                        </Badge>
                        <div className="flex flex-wrap gap-2">
                          {need.items.map((item, itemIdx) => (
                            <Badge key={itemIdx} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge
                          variant={need.priority === "High" ? "default" : "outline"}
                          className={need.priority === "High" ? "bg-primary" : ""}
                        >
                          {need.priority} Priority
                        </Badge>
                        <Button size="sm" className="w-full">
                          Donate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
