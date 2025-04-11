'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Search, User, ChevronRight, Phone, Video } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
  unreadCount?: number;
  lastMessage?: {
    text: string;
    time: string;
  };
}

export default function ChatPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'dr. Ahmad Santoso',
      specialization: 'Dokter Umum',
      status: 'online',
      unreadCount: 2,
      lastMessage: {
        text: 'Mohon pantau pasien hafidz shidqi',
        time: '10:30'
      }
    },
    {
      id: '2',
      name: 'dr. Dewi Pratiwi, Sp.JP',
      specialization: 'Kardiologi',
      status: 'online',
      lastMessage: {
        text: 'Hasil EKG dastin fauzi normal',
        time: '09:15'
      }
    },
    {
      id: '3',
      name: 'dr. Budi Setiawan, Sp.KJ',
      specialization: 'Kejiwaan',
      status: 'offline',
      lastSeen: '1 jam yang lalu',
      lastMessage: {
        text: 'Terima kasih atas laporannya',
        time: 'Kemarin'
      }
    },
    {
      id: '4',
      name: 'dr. Rini Fitriani, Sp.B',
      specialization: 'Bedah',
      status: 'offline',
      lastSeen: '3 jam yang lalu'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter dokter berdasarkan search term
  const filteredDoctors = doctors.filter(doctor => {
    return doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort dokter (online first, then with unread messages, then by name)
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    if ((a.unreadCount || 0) > 0 && (!b.unreadCount || b.unreadCount === 0)) return -1;
    if ((!a.unreadCount || a.unreadCount === 0) && (b.unreadCount || 0) > 0) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Konsultasi</h1>
      </div>
      
      {/* Search */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari dokter..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Quick Call Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-aies-secondary text-aies-darker rounded-lg py-3 flex items-center justify-center font-medium">
          <Phone className="h-5 w-5 mr-2" />
          Panggilan Cepat
        </button>
        
        <button className="bg-aies-light text-aies-dark rounded-lg py-3 flex items-center justify-center font-medium">
          <Video className="h-5 w-5 mr-2" />
          Video Conference
        </button>
      </div>
      
      {/* Doctor List */}
      <div className="space-y-3">
        {sortedDoctors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-gray-500">Tidak ada dokter yang ditemukan</div>
          </div>
        ) : (
          sortedDoctors.map(doctor => (
            <Link href={`/chat/${doctor.id}`} key={doctor.id}>
              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="relative">
                    {doctor.avatar ? (
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white ${
                      doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800">{doctor.name}</div>
                      <div className="text-xs text-gray-500">
                        {doctor.lastMessage?.time || (doctor.status === 'online' ? 'Online' : doctor.lastSeen)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{doctor.specialization}</div>
                    {doctor.lastMessage && (
                      <div className="text-sm text-gray-600 mt-1 truncate">{doctor.lastMessage.text}</div>
                    )}
                  </div>
                  
                  <div className="ml-2 flex flex-col items-end">
                    {doctor.unreadCount && doctor.unreadCount > 0 && (
                      <div className="bg-aies-primary text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                        {doctor.unreadCount}
                      </div>
                    )}
                    <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}