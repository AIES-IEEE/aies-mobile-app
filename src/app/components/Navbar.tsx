'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Users, LayoutDashboard, PlusCircle } from 'lucide-react';
import { JSX } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-6 w-6" />
    },
    {
      path: '/pasien',
      label: 'Pasien',
      icon: <Users className="h-6 w-6" />
    },
    {
      path: '/registrasi',
      label: 'Registrasi',
      icon: <PlusCircle className="h-6 w-6" />
    },
    {
      path: '/chat',
      label: 'Konsultasi',
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 shadow-lg z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          
          return (
            <Link 
              href={item.path} 
              key={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'text-aies-darker font-semibold' 
                  : 'text-gray-500 hover:text-aies-dark'
              }`}
            >
              {/* Conditional rendering untuk warna icon */}
              <div className={isActive ? 'text-aies-darker' : 'text-gray-500'}>
                {item.icon}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <div className="h-1 w-8 rounded-full bg-aies-darker mt-1"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}