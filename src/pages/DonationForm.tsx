import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const DonationForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ngoId = searchParams.get("ngo");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    donationType: "resources",
    name: "",
    email: "",
    phone: "",
    amount: "",
    resources: [] as string[],
    resourceDetails: "",
  });

  const resourceOptions = [
    "Clothes",
    "Books",
    "Stationery",
    "Food Items",
    "Medical Supplies",
    "Electronics",
    "Toys",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.donationType === "funds" && !formData.amount) {
      toast({
        title: "Amount Required",
        description: "Please enter donation amount",
        variant: "destructive",
      });
      return;
    }

    if (formData.donationType === "resources" && formData.resources.length === 0) {
      toast({
        title: "Resources Required",
        description: "Please select at least one resource type",
        variant: "destructive",
      });
      return;
    }

    // Generate mock donation ID and hash
    const donationId = `DON${Date.now()}`;
    const blockchainHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    // Navigate to confirmation
    navigate(`/donate/confirmation?id=${donationId}&hash=${blockchainHash}`);
  };

  const toggleResource = (resource: string) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.includes(resource)
        ? prev.resources.filter((r) => r !== resource)
        : [...prev.resources, resource],
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Make Your Donation</h1>
          <p className="text-muted-foreground text-lg">
            Fill in the details below to complete your donation
          </p>
        </div>

        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donation Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Donation Type</Label>
              <RadioGroup
                value={formData.donationType}
                onValueChange={(value) => setFormData({ ...formData, donationType: value })}
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-smooth cursor-pointer">
                  <RadioGroupItem value="resources" id="resources" />
                  <Label htmlFor="resources" className="flex-1 cursor-pointer">
                    <p className="font-semibold">Resources</p>
                    <p className="text-sm text-muted-foreground">Donate physical items</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-smooth cursor-pointer">
                  <RadioGroupItem value="funds" id="funds" />
                  <Label htmlFor="funds" className="flex-1 cursor-pointer">
                    <p className="font-semibold">Funds</p>
                    <p className="text-sm text-muted-foreground">Make a financial contribution</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            {/* Conditional: Fund Amount */}
            {formData.donationType === "funds" && (
              <div>
                <Label htmlFor="amount">Donation Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
            )}

            {/* Conditional: Resources */}
            {formData.donationType === "resources" && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Select Resources to Donate *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {resourceOptions.map((resource) => (
                      <div
                        key={resource}
                        className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-smooth cursor-pointer"
                        onClick={() => toggleResource(resource)}
                      >
                        <Checkbox
                          id={resource}
                          checked={formData.resources.includes(resource)}
                          onCheckedChange={() => toggleResource(resource)}
                        />
                        <Label htmlFor={resource} className="cursor-pointer flex-1">
                          {resource}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="resourceDetails">Resource Details</Label>
                  <Textarea
                    id="resourceDetails"
                    value={formData.resourceDetails}
                    onChange={(e) => setFormData({ ...formData, resourceDetails: e.target.value })}
                    placeholder="Please provide details about the resources you're donating (quantity, condition, etc.)"
                    rows={4}
                  />
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              Complete Donation
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DonationForm;
