import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function PasienLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-aies-secondary px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="/logo-aies.png" 
              alt="AIES Logo" 
              width={32} 
              height={32}
              priority
            />
            <div className="ml-2">
              <h1 className="text-aies-darker font-bold text-lg">AIES Pasien</h1>
              <p className="text-aies-dark text-xs">Ambulance Integrated Emergency System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-aies-primary text-white flex items-center justify-center">
                <span className="text-sm font-medium">AP</span>
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-white"></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow px-4 py-6 overflow-y-auto pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}