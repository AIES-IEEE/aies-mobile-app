'use client';

import { useState } from 'react';
import { Activity, Heart, Thermometer, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: 'Stabil' | 'Darurat' | 'Kritis';
  vitalSigns: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    spo2: number;
  };
  timeConnected: string;
}

export default function DashboardPage() {
  // Data contoh pasien yang sedang ditangani
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activePatients, setActivePatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'dastin fauzi',
      age: 45,
      gender: 'Laki-laki',
      condition: 'Stabil',
      vitalSigns: {
        heartRate: 78,
        bloodPressure: '120/80',
        temperature: 36.7,
        spo2: 98
      },
      timeConnected: '2 jam 15 menit'
    },
    {
      id: '2',
      name: 'hafidz shidqi',
      age: 62,
      gender: 'Perempuan',
      condition: 'Darurat',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '145/95',
        temperature: 38.2,
        spo2: 92
      },
      timeConnected: '45 menit'
    }
  ]);

  const getStatusColor = (condition: string) => {
    switch (condition) {
      case 'Stabil': return 'bg-green-500';
      case 'Darurat': return 'bg-amber-500';
      case 'Kritis': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getTextColor = (condition: string) => {
    switch (condition) {
      case 'Stabil': return 'text-green-500';
      case 'Darurat': return 'text-amber-500';
      case 'Kritis': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Update terakhir: Baru saja
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-gray-700">Pasien Aktif</h2>
            <div className="text-aies-primary font-semibold">{activePatients.length}</div>
          </div>
          <div className="flex items-center mt-2">
            <Users className="h-5 w-5 text-aies-primary mr-2" />
            <span className="text-sm text-gray-600">Terhubung dengan alat IoT</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-gray-700">Perlu Perhatian</h2>
            <div className="text-amber-500 font-semibold">1</div>
          </div>
          <div className="flex items-center mt-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-sm text-gray-600">Parameter di luar normal</span>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-lg text-gray-800 mb-3">Pasien Dalam Pemantauan</h2>
      
      <div className="space-y-4">
        {activePatients.map((patient) => (
          <Link href={`/pasien/${patient.id}`} key={patient.id}>
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.age} tahun, {patient.gender}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${getTextColor(patient.condition)} mr-2`}>
                    {patient.condition}
                  </span>
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(patient.condition)}`}></div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 mb-1">
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-xs text-gray-500">HR</div>
                  <div className="font-semibold">{patient.vitalSigns.heartRate}</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 mb-1">
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-xs text-gray-500">BP</div>
                  <div className="font-semibold">{patient.vitalSigns.bloodPressure}</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 mb-1">
                    <Thermometer className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="text-xs text-gray-500">TEMP</div>
                  <div className="font-semibold">{patient.vitalSigns.temperature}°</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-xs text-gray-500">SPO2</div>
                  <div className="font-semibold">{patient.vitalSigns.spo2}%</div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Terhubung: {patient.timeConnected}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Komponen Users icon untuk dashboard
function Users({ className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}