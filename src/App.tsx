
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleToaster } from "@/components/SimpleToaster";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SimpleToaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/coach/dashboard" element={<CoachDashboard />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
