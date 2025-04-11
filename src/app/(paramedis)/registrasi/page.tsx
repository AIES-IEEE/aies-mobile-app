"use client";

import { useState } from "react";
import { ChevronRight, Save, X, UserPlus } from "lucide-react";

export default function RegistrasiPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    nik: "",
    address: "",
    contact: "",
    emergency_contact: "",
    emergency_relation: "",
    complaint: "",
    blood_type: "",
    allergies: "",
    medical_history: "",
    device_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted with data:", formData);
    // Redirect or show success message
    alert("Pasien berhasil didaftarkan!");
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <UserPlus className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Registrasi Pasien</h1>
      </div>

      {/* Stepper */}
      <div className="mb-6">
        <div className="flex items-center">
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center font-semibold text-white ${
              step >= 1 ? "bg-aies-primary" : "bg-gray-300"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 flex-grow mx-2 ${
              step > 1 ? "bg-aies-primary" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center font-semibold text-white ${
              step >= 2 ? "bg-aies-primary" : "bg-gray-300"
            }`}
          >
            2
          </div>
          <div
            className={`h-1 flex-grow mx-2 ${
              step > 2 ? "bg-aies-primary" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center font-semibold text-white ${
              step >= 3 ? "bg-aies-primary" : "bg-gray-300"
            }`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className={step >= 1 ? "text-aies-primary font-medium" : ""}>
            Data Pribadi
          </div>
          <div className={step >= 2 ? "text-aies-primary font-medium" : ""}>
            Riwayat Medis
          </div>
          <div className={step >= 3 ? "text-aies-primary font-medium" : ""}>
            Koneksi Perangkat
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Data Pribadi */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Data Pribadi Pasien
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Usia
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                    required
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="nik"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  NIK
                </label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  No. Telepon
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="emergency_contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kontak Darurat
                </label>
                <input
                  type="tel"
                  id="emergency_contact"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="emergency_relation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hubungan dengan Pasien
                </label>
                <input
                  type="text"
                  id="emergency_relation"
                  name="emergency_relation"
                  value={formData.emergency_relation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Riwayat Medis */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informasi Medis
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="complaint"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Keluhan Utama
                </label>
                <textarea
                  id="complaint"
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="blood_type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Golongan Darah
                  </label>
                  <select
                    id="blood_type"
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                  >
                    <option value="">Pilih</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alergi
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                  placeholder="Jika ada, tuliskan alergi yang dimiliki"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="medical_history"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Riwayat Penyakit
                </label>
                <textarea
                  id="medical_history"
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                  placeholder="Misalnya: hipertensi, diabetes, dll."
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Koneksi Perangkat */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Koneksi Perangkat IoT
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="device_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ID Perangkat
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="device_id"
                    name="device_id"
                    value={formData.device_id}
                    onChange={handleChange}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aies-primary focus:border-transparent"
                    placeholder="Masukkan ID perangkat atau scan QR code"
                    required
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-aies-secondary text-aies-darker rounded-r-lg"
                  >
                    Scan
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-700 mb-2">
                  Perangkat yang Tersedia
                </h3>

                <div className="space-y-2">
                  <div
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-aies-primary"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        device_id: "AIES-MT102",
                      }))
                    }
                  >
                    <div>
                      <div className="font-medium">AIES Monitor Type 102</div>
                      <div className="text-xs text-gray-500">
                        ID: AIES-MT102
                      </div>
                    </div>
                    <div className="text-aies-primary">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-aies-primary"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        device_id: "AIES-VP103",
                      }))
                    }
                  >
                    <div>
                      <div className="font-medium">
                        AIES Vital Parameter 103
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: AIES-VP103
                      </div>
                    </div>
                    <div className="text-aies-primary">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-aies-primary"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        device_id: "AIES-ECG104",
                      }))
                    }
                  >
                    <div>
                      <div className="font-medium">AIES ECG Monitor 104</div>
                      <div className="text-xs text-gray-500">
                        ID: AIES-ECG104
                      </div>
                    </div>
                    <div className="text-aies-primary">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {formData.device_id && (
                <div className="border rounded-lg p-4 bg-aies-secondary border-aies-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-aies-primary rounded-full flex items-center justify-center text-white mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-aies-darker">
                          Perangkat Siap Digunakan
                        </div>
                        <div className="text-xs text-aies-dark">
                          ID: {formData.device_id}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-aies-dark hover:text-red-500"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, device_id: "" }))
                      }
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Kembali
            </button>
          ) : (
            <div></div> // Empty div for spacing
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-aies-primary text-white rounded-lg hover:bg-aies-dark"
            >
              Lanjut
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-aies-primary text-white rounded-lg hover:bg-aies-dark"
            >
              <Save className="h-5 w-5 mr-1" />
              Daftarkan Pasien
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
