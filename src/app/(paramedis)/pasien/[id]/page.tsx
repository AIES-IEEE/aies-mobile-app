"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  Heart,
  Thermometer,
  TrendingUp,
  Clock,
  MessageSquare,
  User,
  AlertCircle,
  Battery,
} from "lucide-react";

interface PatientDetail {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  condition: "Stabil" | "Darurat" | "Kritis";
  deviceInfo: {
    id: string;
    name: string;
    battery: number;
    connectionStatus: "connected" | "disconnected";
  };
  vitalSigns: {
    heartRate: {
      current: number;
      min: number;
      max: number;
      unit: string;
      history: { value: number; time: string }[];
    };
    bloodPressure: {
      current: string;
      min: string;
      max: string;
      unit: string;
      history: { value: string; time: string }[];
    };
    temperature: {
      current: number;
      min: number;
      max: number;
      unit: string;
      history: { value: number; time: string }[];
    };
    spo2: {
      current: number;
      min: number;
      max: number;
      unit: string;
      history: { value: number; time: string }[];
    };
  };
  lastUpdated: string;
}

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  // Example patient data (this would come from an API)
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchPatient = () => {
      // This would be an actual API call in a real app
      setTimeout(() => {
        setPatient({
          id: patientId,
          name: "dastin fauzi",
          age: 45,
          gender: "Laki-laki",
          diagnosis: "Nyeri Dada, Hipertensi",
          condition: "Stabil",
          deviceInfo: {
            id: "AIES-MT102",
            name: "AIES Monitor Type 102",
            battery: 85,
            connectionStatus: "connected",
          },
          vitalSigns: {
            heartRate: {
              current: 78,
              min: 60,
              max: 100,
              unit: "bpm",
              history: [
                { value: 76, time: "15:00" },
                { value: 77, time: "15:15" },
                { value: 78, time: "15:30" },
              ],
            },
            bloodPressure: {
              current: "120/80",
              min: "90/60",
              max: "140/90",
              unit: "mmHg",
              history: [
                { value: "122/82", time: "15:00" },
                { value: "121/81", time: "15:15" },
                { value: "120/80", time: "15:30" },
              ],
            },
            temperature: {
              current: 36.7,
              min: 36.1,
              max: 37.5,
              unit: "°C",
              history: [
                { value: 36.8, time: "15:00" },
                { value: 36.7, time: "15:15" },
                { value: 36.7, time: "15:30" },
              ],
            },
            spo2: {
              current: 98,
              min: 95,
              max: 100,
              unit: "%",
              history: [
                { value: 97, time: "15:00" },
                { value: 98, time: "15:15" },
                { value: 98, time: "15:30" },
              ],
            },
          },
          lastUpdated: "Baru saja",
        });
        setLoading(false);
      }, 1000);
    };

    fetchPatient();
  }, [patientId]);

  const getStatusColor = (condition: string) => {
    switch (condition) {
      case "Stabil":
        return "bg-green-500";
      case "Darurat":
        return "bg-amber-500";
      case "Kritis":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTextColor = (condition: string) => {
    switch (condition) {
      case "Stabil":
        return "text-green-500";
      case "Darurat":
        return "text-amber-500";
      case "Kritis":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getBatteryColor = (percentage: number) => {
    if (percentage > 70) return "text-green-500";
    if (percentage > 30) return "text-amber-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen -mt-16">
        <div className="w-12 h-12 border-t-4 border-aies-primary border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-semibold">Pasien tidak ditemukan</h2>
        <p className="text-gray-500 mt-2">
          Pasien dengan ID {patientId} tidak dapat ditemukan
        </p>
        <Link href="/pasien">
          <button className="mt-4 px-4 py-2 bg-aies-primary text-white rounded-lg">
            Kembali ke Daftar Pasien
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button & Patient Name */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-aies-primary mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 flex-grow">
          {patient.name}
        </h1>
        <Link
          href={`/chat/doctor?patient=${patient.id}`}
          className="p-2 rounded-full bg-aies-primary text-white"
        >
          <MessageSquare className="h-5 w-5" />
        </Link>
      </div>

      {/* Patient Info & Status */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                {patient.age} tahun, {patient.gender}
              </span>
            </div>
            <div className="mt-1 text-gray-700">{patient.diagnosis}</div>
          </div>

          <div className="flex items-center">
            <span
              className={`text-sm font-medium ${getTextColor(
                patient.condition
              )} mr-2`}
            >
              {patient.condition}
            </span>
            <div
              className={`h-3 w-3 rounded-full ${getStatusColor(
                patient.condition
              )}`}
            ></div>
          </div>
        </div>

        {/* Device Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`h-2 w-2 rounded-full mr-1 ${
                  patient.deviceInfo.connectionStatus === "connected"
                    ? "bg-green-600 animate-pulse"
                    : "bg-gray-400"
                }`}
              ></div>
              <span className="text-xs text-gray-500">
                {patient.deviceInfo.connectionStatus === "connected"
                  ? `Terhubung: ${patient.deviceInfo.name} (${patient.deviceInfo.id})`
                  : "Terputus"}
              </span>
            </div>

            <div className="flex items-center">
              <Battery
                className={`h-4 w-4 mr-1 ${getBatteryColor(
                  patient.deviceInfo.battery
                )}`}
              />
              <span
                className={`text-xs ${getBatteryColor(
                  patient.deviceInfo.battery
                )}`}
              >
                {patient.deviceInfo.battery}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <h2 className="font-semibold text-lg text-gray-800 mb-3">Tanda Vital</h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Heart Rate */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg mr-2">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-sm text-gray-700">Detak Jantung</div>
            </div>
            <div className="text-xs text-gray-500">
              {patient.vitalSigns.heartRate.unit}
            </div>
          </div>

          <div className="flex items-end">
            <div className="text-3xl font-bold text-gray-800">
              {patient.vitalSigns.heartRate.current}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div>Min: {patient.vitalSigns.heartRate.min}</div>
            <div>Max: {patient.vitalSigns.heartRate.max}</div>
          </div>

          {/* Simplified chart (could be replaced with a real chart component) */}
          <div className="mt-3 h-10 flex items-end">
            {patient.vitalSigns.heartRate.history.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-4 bg-red-200 rounded-t-sm"
                  style={{
                    height: `${
                      (item.value / patient.vitalSigns.heartRate.max) * 100
                    }%`,
                  }}
                ></div>
                <div className="text-xs mt-1 text-gray-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-2">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-sm text-gray-700">Tekanan Darah</div>
            </div>
            <div className="text-xs text-gray-500">
              {patient.vitalSigns.bloodPressure.unit}
            </div>
          </div>

          <div className="flex items-end">
            <div className="text-3xl font-bold text-gray-800">
              {patient.vitalSigns.bloodPressure.current}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div>Min: {patient.vitalSigns.bloodPressure.min}</div>
            <div>Max: {patient.vitalSigns.bloodPressure.max}</div>
          </div>

          {/* Simplified representation for blood pressure history */}
          <div className="mt-3 h-10 flex items-center justify-around">
            {patient.vitalSigns.bloodPressure.history.map((item, index) => (
              <div key={index} className="text-xs text-gray-500">
                {item.time}: {item.value}
              </div>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-lg mr-2">
                <Thermometer className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-sm text-gray-700">Suhu Tubuh</div>
            </div>
            <div className="text-xs text-gray-500">
              {patient.vitalSigns.temperature.unit}
            </div>
          </div>

          <div className="flex items-end">
            <div className="text-3xl font-bold text-gray-800">
              {patient.vitalSigns.temperature.current}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div>Min: {patient.vitalSigns.temperature.min}</div>
            <div>Max: {patient.vitalSigns.temperature.max}</div>
          </div>

          {/* Simplified chart */}
          <div className="mt-3 h-10 flex items-end">
            {patient.vitalSigns.temperature.history.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-4 bg-yellow-200 rounded-t-sm"
                  style={{ height: `${((item.value - 35) / 3) * 100}%` }}
                ></div>
                <div className="text-xs mt-1 text-gray-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SpO2 */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm text-gray-700">SpO2</div>
            </div>
            <div className="text-xs text-gray-500">
              {patient.vitalSigns.spo2.unit}
            </div>
          </div>

          <div className="flex items-end">
            <div className="text-3xl font-bold text-gray-800">
              {patient.vitalSigns.spo2.current}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div>Min: {patient.vitalSigns.spo2.min}</div>
            <div>Max: {patient.vitalSigns.spo2.max}</div>
          </div>

          {/* Simplified chart */}
          <div className="mt-3 h-10 flex items-end">
            {patient.vitalSigns.spo2.history.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-4 bg-green-200 rounded-t-sm"
                  style={{ height: `${((item.value - 90) / 10) * 100}%` }}
                ></div>
                <div className="text-xs mt-1 text-gray-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-aies-secondary text-aies-darker rounded-lg py-3 flex items-center justify-center font-medium">
          <MessageSquare className="h-5 w-5 mr-2" />
          Konsultasi
        </button>

        <button className="bg-red-100 text-red-500 rounded-lg py-3 flex items-center justify-center font-medium">
          <AlertCircle className="h-5 w-5 mr-2" />
          Darurat
        </button>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-500 flex items-center justify-center">
        <Clock className="h-3 w-3 mr-1" />
        Update terakhir: {patient.lastUpdated}
      </div>
    </div>
  );
}
