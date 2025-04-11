'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Search, Filter, ChevronRight, Clock } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  connectionStatus: 'connected' | 'disconnected';
  lastUpdated: string;
}

export default function PasienListPage() {
  // Data contoh pasien
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Dastin Fauzi',
      age: 45,
      gender: 'Laki-laki',
      diagnosis: 'Nyeri Dada, Hipertensi',
      connectionStatus: 'connected',
      lastUpdated: '5 menit yang lalu'
    },
    {
      id: '2',
      name: 'Hafidz Shidqi',
      age: 62,
      gender: 'Laki-laki',
      diagnosis: 'Sesak Napas, Asma',
      connectionStatus: 'connected',
      lastUpdated: '2 menit yang lalu'
    },
    {
      id: '3',
      name: 'Ghaylan Fatih',
      age: 55,
      gender: 'Laki-laki',
      diagnosis: 'Trauma Kepala',
      connectionStatus: 'disconnected',
      lastUpdated: '1 jam yang lalu'
    },
    {
      id: '4',
      name: 'Sekar Vania',
      age: 30,
      gender: 'Perempuan',
      diagnosis: 'Fraktur Ekstremitas',
      connectionStatus: 'disconnected',
      lastUpdated: '2 jam yang lalu'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'connected' | 'disconnected'>('all');

  // Filter pasien berdasarkan search term dan status koneksi
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.connectionStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Daftar Pasien</h1>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex space-x-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari pasien..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'connected' | 'disconnected')}
          >
            <option value="all">Semua</option>
            <option value="connected">Terhubung</option>
            <option value="disconnected">Terputus</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-gray-500 text-xs">Total Pasien</div>
          <div className="text-lg font-bold">{patients.length}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-gray-500 text-xs">Terhubung</div>
          <div className="text-lg font-bold text-green-600">
            {patients.filter(p => p.connectionStatus === 'connected').length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-gray-500 text-xs">Terputus</div>
          <div className="text-lg font-bold text-gray-500">
            {patients.filter(p => p.connectionStatus === 'disconnected').length}
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-gray-500">Tidak ada pasien yang ditemukan</div>
          </div>
        ) : (
          filteredPatients.map(patient => (
            <Link href={`/pasien/${patient.id}`} key={patient.id}>
              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.age} tahun, {patient.gender}</p>
                  </div>
                  
                  <div className={`flex items-center ${
                    patient.connectionStatus === 'connected' 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                  }`}>
                    <div className={`h-2 w-2 rounded-full mr-1 ${
                      patient.connectionStatus === 'connected' 
                        ? 'bg-green-600 animate-pulse' 
                        : 'bg-gray-400'
                    }`}></div>
                    <span className="text-xs">
                      {patient.connectionStatus === 'connected' ? 'Terhubung' : 'Terputus'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-700">{patient.diagnosis}</p>
                </div>
                
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{patient.lastUpdated}</span>
                  </div>
                  
                  <div className="flex items-center text-aies-primary">
                    <span className="text-xs mr-1">Detail</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      
      {/* Floating Action Button untuk Tambah Pasien */}
      <Link href="/registrasi">
        <button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-aies-primary text-white shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>
        </button>
      </Link>
    </div>
  );
}