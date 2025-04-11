import Navbar from '../components/Navbar';
import Image from 'next/image';
import { BellIcon, UserIcon } from 'lucide-react';

export default function ParamedisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-aies-secondary px-4 py-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="/logo-aies.png" 
              alt="AIES Logo" 
              width={34} 
              height={34}
              priority
            />
            <div className="ml-2">
              <h1 className="text-aies-darker font-bold text-lg">AIES Paramedis</h1>
              <p className="text-aies-dark text-xs">Ambulance Integrated Emergency System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1">
              <BellIcon className="h-6 w-6 text-aies-dark" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-aies-primary text-white flex items-center justify-center">
                <UserIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow px-4 py-4 overflow-y-auto pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}