'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  // Simulasi splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-aies-secondary">
        <div className="animate-pulse">
          <div className="flex flex-col items-center justify-center mb-6">
            <Image 
              src="/logo-aies.png" 
              alt="AIES Logo" 
              width={120} 
              height={120}
              priority
            />
            <span className="text-5xl font-bold mt-4 text-aies-darker">AIES</span>
          </div>
          <p className="text-xl text-center text-aies-darker">
            Ambulance Integrated Emergency System
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-aies-light">
      <div className="max-w-md mx-auto">
        <Image
          src="/logo-aies.png"
          alt="AIES Logo"
          width={100}
          height={100}
          className="mx-auto mb-6"
          priority
        />
        
        <h1 className="text-4xl font-bold mb-3 text-aies-dark">
          AIES
        </h1>
        
        <p className="text-xl mb-2 text-aies-dark">
          Ambulance Integrated Emergency System
        </p>
        
        <p className="mb-20 text-gray-600">
          Sistem penanganan darurat medis terintegrasi dengan teknologi IoT untuk ambulance
        </p>
        
        <button
          onClick={handleGetStarted}
          className="aies-button w-full"
        >
          Mulai
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          © 2025 AIES - Powered by IoT Technology
        </p>
      </div>
    </div>
  );
}