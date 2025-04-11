'use client';

import { LayoutDashboard, Activity, Heart, Thermometer, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  // Data contoh untuk vital signs
  const vitalSigns = [
    {
      name: 'Detak Jantung',
      value: '78',
      unit: 'bpm',
      icon: <Heart className="h-5 w-5 text-red-500" />,
      color: 'bg-red-100',
      trend: 'normal'
    },
    {
      name: 'Tekanan Darah',
      value: '120/80',
      unit: 'mmHg',
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-100',
      trend: 'normal'
    },
    {
      name: 'Suhu Tubuh',
      value: '36.7',
      unit: '°C',
      icon: <Thermometer className="h-5 w-5 text-yellow-500" />,
      color: 'bg-yellow-100',
      trend: 'normal'
    },
    {
      name: 'SpO2',
      value: '98',
      unit: '%',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      color: 'bg-green-100',
      trend: 'normal'
    }
  ];

  // Riwayat aktivitas
  const activities = [
    {
      type: 'Pemeriksaan',
      time: '2 jam yang lalu',
      description: 'Pemeriksaan tanda vital oleh Dr. Budi'
    },
    {
      type: 'Medikasi',
      time: '4 jam yang lalu',
      description: 'Pemberian obat anti nyeri'
    },
    {
      type: 'Pengukuran',
      time: '5 jam yang lalu',
      description: 'Pengukuran tekanan darah dan detak jantung'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <LayoutDashboard className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="font-semibold text-gray-800 mb-2">Status Pasien</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
          <span>Stabil</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4" />
          <span>Update terakhir: 5 menit yang lalu</span>
        </div>
      </div>

      <h2 className="font-semibold text-lg text-gray-800 mb-3">Tanda Vital</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {vitalSigns.map((sign, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center mb-2">
              <div className={`${sign.color} p-2 rounded-lg mr-2`}>
                {sign.icon}
              </div>
              <div className="text-xs text-gray-600">{sign.name}</div>
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-gray-800">{sign.value}</div>
              <div className="text-xs text-gray-500 ml-1 mb-1">{sign.unit}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-lg text-gray-800 mb-3">Aktivitas Terakhir</h2>
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 flex items-start">
            <div className="bg-aies-light p-2 rounded-lg mr-3">
              <Clock className="h-5 w-5 text-aies-primary" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-gray-800">{activity.type}</h3>
                <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}