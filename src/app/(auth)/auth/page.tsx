"use client";

import { useState } from "react";
import { User, Lock, Mail, AlertCircle, Clipboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateSignIn = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullname) newErrors.fullname = "Nama lengkap wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format email tidak valid";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    else if (formData.password.length < 6)
      newErrors.password = "Password minimal 6 karakter";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Password tidak sama";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "signin") {
      if (validateSignIn()) {
        console.log("Sign In berhasil:", formData);
        // Redirect atau lakukan proses autentikasi di sini
      }
    } else {
      if (validateSignUp()) {
        console.log("Sign Up berhasil:", formData);
        // Proses pembuatan akun
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-aies-light">
      <div className="bg-white rounded-xl shadow-aies-card w-full max-w-md overflow-hidden">
        {/* Logo Header */}
        <div className="p-6 flex flex-col items-center bg-aies-secondary">
          <div className="flex items-center mb-2">
            <Image
              src="/logo-aies.png"
              alt="AIES Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-3xl font-bold ml-2 text-aies-darker">
              AIES
            </span>
          </div>
          <p className="text-sm text-aies-darker">
            Ambulance Integrated Emergency System
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b">
          <button
            className={`aies-auth-tab ${
              activeTab === "signin" ? "active" : "inactive"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`aies-auth-tab ${
              activeTab === "signup" ? "active" : "inactive"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {activeTab === "signup" && (
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-aies-darker"
                  htmlFor="fullname"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-aies-primary" />
                  </div>
                  <input
                    className={`aies-input ${
                      errors.fullname ? "border-red-500" : "border-gray-200"
                    }`}
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.fullname}
                  </p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2 text-aies-darker"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-aies-primary" />
                </div>
                <input
                  className={`aies-input ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2 text-aies-darker"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-aies-primary" />
                </div>
                <input
                  className={`aies-input ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
                </p>
              )}
            </div>

            {activeTab === "signup" && (
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2 text-aies-darker"
                  htmlFor="confirmPassword"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-aies-primary" />
                  </div>
                  <input
                    className={`aies-input ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {activeTab === "signin" && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: "var(--color-aies-primary)" }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ingat saya
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium hover:underline text-aies-primary"
                  >
                    Lupa password?
                  </a>
                </div>
              </div>
            )}

            <button
              className="w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none transition duration-300 shadow-aies-card bg-gradient-to-r from-aies-primary to-aies-dark"
              type="submit"
            >
              {activeTab === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 text-center text-xs text-aies-text">
          <p>© 2025 AIES - Ambulance Integrated Emergency System</p>
          <Link href="/" className="mt-2 inline-block hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-6 flex items-center">
        <Clipboard size={16} className="text-aies-dark mr-2" />
        <span className="text-xs text-aies-dark">
          Sistem monitoring darurat terintegrasi
        </span>
      </div>
    </div>
  );
}
