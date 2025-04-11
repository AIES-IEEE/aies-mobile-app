'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ParamedisIndexPage() {
  const router = useRouter();
  
  // Redirect ke halaman dashboard secara default
  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-16 h-16 border-t-4 border-aies-primary border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Mengarahkan ke dashboard...</p>
    </div>
  );
}