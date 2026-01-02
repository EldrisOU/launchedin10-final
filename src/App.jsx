import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ConciergePanel from './components/ConciergePanel';

import Home from './pages/Home';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--bg-warm)] selection:bg-[var(--teal)] selection:text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            {/* ELITE BLOG INFRASTRUCTURE */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:category" element={<BlogIndex />} />
            <Route path="/blog/:category/:slug" element={<BlogPost />} />

            {/* LEGAL & POLICY */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* SEO REDIRECTS - Handle legacy flat structures */}
            <Route path="/blog/:slug" element={<Navigate to="/blog" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
          <ConciergePanel />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
