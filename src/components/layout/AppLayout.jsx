import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!isMobile && (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}
      {isMobile && <MobileNav />}

      <main
        className="min-h-screen pb-20 md:pb-0 transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : (collapsed ? 72 : 256) }}
      >
        <Outlet />
      </main>
    </div>
  );
}