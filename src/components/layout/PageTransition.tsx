'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [routePulse, setRoutePulse] = useState(false);

  useEffect(() => {
    setRoutePulse(true);
    const t = setTimeout(() => setRoutePulse(false), 520);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {/* Top Route Transition Shimmer Bar */}
      <div
        className={`fixed top-0 inset-x-0 z-[70] h-[2.5px] pointer-events-none transition-opacity duration-300 ${
          routePulse ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`h-full bg-gradient-to-r from-[#0f2544] via-[#208EC1] to-sky-400 transition-all duration-500 ease-out ${
            routePulse ? 'w-full' : 'w-0'
          }`}
        />
      </div>

      {/* Animated Page Container keyed by pathname so every route change animates in */}
      <div key={pathname} className="flex-1 page-enter">
        {children}
      </div>
    </>
  );
}
