import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DonationConfirmation = () => {
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get("id");
  const blockchainHash = searchParams.get("hash");
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const timestamp = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-verified mx-auto mb-6 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Donation Successful!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your generous contribution
          </p>
        </div>

        {/* Donation Details Card */}
        <Card className="p-8 mb-6 shadow-elevated">
          <div className="space-y-6">
            {/* Donation ID */}
            <div>
              <Label>Donation ID</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-3 rounded-lg bg-muted font-mono text-sm">
                  {donationId}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(donationId || "", "Donation ID")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Blockchain Hash */}
            <div>
              <Label>Blockchain Verification Hash</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 font-mono text-sm break-all">
                  {blockchainHash}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(blockchainHash || "", "Blockchain Hash")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your donation has been recorded on the blockchain for transparency
              </p>
            </div>

            {/* Timestamp */}
            <div>
              <Label>Transaction Timestamp</Label>
              <div className="p-3 rounded-lg bg-muted mt-2">
                {timestamp}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-verified/10 border border-verified/20">
              <CheckCircle2 className="h-5 w-5 text-verified" />
              <div>
                <p className="font-semibold text-verified">Verified & Confirmed</p>
                <p className="text-sm text-muted-foreground">
                  Your donation has been successfully verified on the blockchain
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="p-6 mb-6 shadow-card">
          <h2 className="font-bold text-xl mb-4">What happens next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-semibold">NGO Notification</p>
                <p className="text-sm text-muted-foreground">
                  The NGO will be notified about your donation
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-semibold">Coordination</p>
                <p className="text-sm text-muted-foreground">
                  They will contact you to arrange pickup or transfer
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-semibold">Email Confirmation</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive a detailed receipt via email
                </p>
              </div>
            </li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full">Track My Donation</Button>
          </Link>
        </div>

        {/* Additional Donation */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Want to make another donation?
          </p>
          <Link to="/ngos">
            <Button variant="outline">Explore More NGOs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
    {children}
  </p>
);

export default DonationConfirmation;
