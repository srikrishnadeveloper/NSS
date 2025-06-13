
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleToaster } from "@/components/SimpleToaster";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

console.log('App.tsx loaded, React version:', React.version);
console.log('React object in App:', React);

const App = () => {
  // Create QueryClient inside the component to ensure React context is available
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }), []);

  console.log('App component rendering');

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SimpleToaster />
        <Toaster />
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
};

export default App;
