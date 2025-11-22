// Only the component body is shown — replace your DonationForm with this full component if easier.
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const toId = (s: string) => s.replace(/\s+/g, "-").toLowerCase();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: "Missing Information", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    if (formData.donationType === "funds" && !formData.amount) {
      toast({ title: "Amount Required", description: "Please enter donation amount", variant: "destructive" });
      return;
    }
    if (formData.donationType === "resources" && formData.resources.length === 0) {
      toast({ title: "Resources Required", description: "Please select at least one resource type", variant: "destructive" });
      return;
    }

    const donationId = `DON${Date.now()}`;
    const blockchainHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    navigate(`/donate/confirmation?id=${donationId}&hash=${blockchainHash}`);
  };

  // toggle via boolean from native checkbox change
  const onCheckboxChange = (resource: string, checked: boolean) => {
    setFormData((prev) => {
      const exists = prev.resources.includes(resource);
      let next = prev.resources.slice();
      if (checked && !exists) next = [...next, resource];
      if (!checked && exists) next = next.filter((r) => r !== resource);
      return { ...prev, resources: next };
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Make Your Donation</h1>
          <p className="text-muted-foreground text-lg">Fill in the details below to complete your donation</p>
        </div>

        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donation type kept as native radios (already stable) */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Donation Type</Label>

              <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <input
                  id="resources"
                  name="donationType"
                  type="radio"
                  value="resources"
                  checked={formData.donationType === "resources"}
                  onChange={(e) => setFormData((s) => ({ ...s, donationType: e.target.value }))}
                  className="mr-3"
                />
                <Label htmlFor="resources" className="flex-1 cursor-pointer">
                  <p className="font-semibold">Resources</p>
                  <p className="text-sm text-muted-foreground">Donate physical items</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <input
                  id="funds"
                  name="donationType"
                  type="radio"
                  value="funds"
                  checked={formData.donationType === "funds"}
                  onChange={(e) => setFormData((s) => ({ ...s, donationType: e.target.value }))}
                  className="mr-3"
                />
                <Label htmlFor="funds" className="flex-1 cursor-pointer">
                  <p className="font-semibold">Funds</p>
                  <p className="text-sm text-muted-foreground">Make a financial contribution</p>
                </Label>
              </div>
            </div>

            {/* Personal details (unchanged) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))} placeholder="Enter your full name" required />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))} placeholder="your.email@example.com" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" required />
              </div>
            </div>

            {/* Fund amount */}
            {formData.donationType === "funds" && (
              <div>
                <Label htmlFor="amount">Donation Amount (₹) *</Label>
                <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData((s) => ({ ...s, amount: e.target.value }))} placeholder="Enter amount" min="1" required />
              </div>
            )}

            {/* Resources — native checkboxes */}
            {formData.donationType === "resources" && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Select Resources to Donate *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {resourceOptions.map((resource) => {
                      const id = toId(resource);
                      const checked = formData.resources.includes(resource);
                      return (
                        <label
                          key={resource}
                          htmlFor={id}
                          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => onCheckboxChange(resource, e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="cursor-pointer flex-1">{resource}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="resourceDetails">Resource Details</Label>
                  <Textarea id="resourceDetails" value={formData.resourceDetails} onChange={(e) => setFormData((s) => ({ ...s, resourceDetails: e.target.value }))} placeholder="Please provide details..." rows={4} />
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