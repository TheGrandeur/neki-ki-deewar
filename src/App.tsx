import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import DonateOptions from "./pages/DonateOptions";
import NGOList from "./pages/NGOList";
import NGODetail from "./pages/NGODetail";
import DonationForm from "./pages/DonationForm";
import DonationConfirmation from "./pages/DonationConfirmation";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/donate" element={<DonateOptions />} />
          <Route path="/ngos" element={<NGOList />} />
          <Route path="/ngo/:id" element={<NGODetail />} />
          <Route path="/donate/form" element={<DonationForm />} />
          <Route path="/donate/confirmation" element={<DonationConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
