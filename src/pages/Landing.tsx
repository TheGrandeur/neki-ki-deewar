import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, TrendingUp, CheckCircle2 } from "lucide-react";
import ChatWindow from "@/components/ui/ChatWindow";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ChatWindow />
      <section className="gradient-hero py-20 px-4 text-center text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Donate with Trust. <br />Empower NGOs.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Secure, transparent donations verified by blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/donate">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Donate Now
              </Button>
            </Link>
            <Link to="/ngos">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                Explore NGOs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Neki Ki Deewar?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Blockchain Verified"
              description="Every donation is recorded and verified on the blockchain"
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8" />}
              title="Zero Platform Fees"
              description="100% of your donation goes directly to NGOs"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Full Transparency"
              description="Track your donations in real-time"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-8 w-8" />}
              title="Verified NGOs"
              description="All NGOs are thoroughly verified"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <Step
              number="1"
              title="Choose an NGO"
              description="Browse verified NGOs and see their specific needs"
            />
            <Step
              number="2"
              title="Select Donation Type"
              description="Choose to donate funds or resources like clothes, stationery, essentials"
            />
            <Step
              number="3"
              title="Complete Donation"
              description="Fill in your details and submit - we'll generate a blockchain verification"
            />
            <Step
              number="4"
              title="Track Impact"
              description="Receive a unique donation ID and blockchain hash to track your contribution"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of donors making verified, transparent contributions
          </p>
          <Link to="/donate">
            <Button size="lg" className="text-lg px-8">
              Start Donating
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card shadow-card rounded-2xl p-6 text-center transition-smooth hover:shadow-elevated hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const Step = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-hero text-white flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Landing;
