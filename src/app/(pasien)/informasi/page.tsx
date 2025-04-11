'use client';

import { Info, Heart, Activity, Ambulance } from 'lucide-react';

export default function InformasiPage() {
  const infoItems = [
    {
      title: 'Layanan Darurat',
      description: 'Tindakan cepat penanganan kasus medis darurat',
      icon: <Ambulance className="h-6 w-6 text-red-500" />,
      color: 'bg-red-100'
    },
    {
      title: 'Vital Signs Monitoring',
      description: 'Pemantauan tanda vital pasien secara real-time',
      icon: <Activity className="h-6 w-6 text-aies-primary" />,
      color: 'bg-aies-secondary'
    },
    {
      title: 'Cardiac Care',
      description: 'Perawatan jantung darurat dengan peralatan modern',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      color: 'bg-red-100'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <Info className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Informasi</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">Selamat Datang di AIES</h2>
        <p className="text-gray-600">
          AIES (Ambulance Integrated Emergency System) adalah sistem terintegrasi untuk penanganan darurat
          dengan fitur monitoring pasien berbasis IoT, memastikan penanganan medis optimal
          bahkan sebelum tiba di rumah sakit.
        </p>
      </div>

      <h2 className="font-semibold text-lg text-gray-800 mb-3">Layanan Kami</h2>
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-start">
            <div className={`${item.color} p-3 rounded-lg mr-4`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}