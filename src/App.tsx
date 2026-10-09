import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SmoothScroll from "./components/SmoothScroll";
import ArchivePage from "./pages/ArchivePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import EventGallery from "./pages/EventGallery";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import SitemapPage from "./pages/SitemapPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <SmoothScroll>
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<AboutPage />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/work" element={<Navigate to="/archive" replace />} />
              <Route path="/work/:eventId" element={<EventGallery />} />
              <Route path="/shop" element={<ProductsPage />} />
              <Route path="/shop/:productId" element={<ProductDetail />} />
              <Route path="/products" element={<Navigate to="/shop" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SmoothScroll>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
