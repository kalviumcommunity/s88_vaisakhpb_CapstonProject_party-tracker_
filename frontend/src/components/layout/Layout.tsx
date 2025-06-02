import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const isNotFound = location.pathname !== '/' && !location.pathname.match(/^\/(?:events|clubs|student-zone|auth)\/?/);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Header />
      <main className="flex-grow bg-zinc-950 relative">
        {/* Page content with fade transition */}
        <div className="animate-fadeIn">
          <Outlet />
        </div>

        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 to-zinc-950/20 pointer-events-none bg-blend-overlay" />
             
        {/* Noise texture */}
        <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      </main>
      {!isNotFound && <Footer />}
    </div>
  );
};

export default Layout;