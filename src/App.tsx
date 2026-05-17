import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LogoComparison from "./pages/LogoComparison";
import PitchDeck from "./pages/PitchDeck";
import Helios from "./pages/Helios";
import Dataroom from "./pages/Dataroom";
import BrandGuide from "./pages/BrandGuide";
import DeckE from "./pages/DeckE";
import BlogPrimitives from "./pages/BlogPrimitives";
import BlogIndexDemo from "./pages/BlogIndexDemo";
import BlogArticleDemo from "./pages/BlogArticleDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logos" element={<LogoComparison />} />
          <Route path="/decks" element={<PitchDeck />} />
          <Route path="/helios" element={<Helios />} />
          <Route path="/dataroom" element={<Dataroom />} />
          <Route path="/brand" element={<BrandGuide />} />
          <Route path="/deck-e" element={<DeckE />} />
          <Route path="/blog/primitives" element={<BlogPrimitives />} />
          <Route path="/blog/index-demo" element={<BlogIndexDemo />} />
          <Route path="/blog/article-demo" element={<BlogArticleDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
