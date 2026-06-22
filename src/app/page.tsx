"use client";

import React from "react";
import Link from "next/link";
import ActionCard from "@/components/ui/ActionCard";
import {
  ShieldAlert,
  QrCode,
  Phone,
  AlertTriangle,
  MapPin,
  Car,
  Bike,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-danger-500 selection:text-white">

      {/* NAVBAR */}
      <div className="fixed top-4 left-0 z-50 w-full px-4 sm:px-6">
        <header className="mx-auto max-w-5xl rounded-full border border-ink-200/60 bg-white/70 px-6 py-3 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-600 text-white">
                <ShieldAlert size={19} />
              </div>
              <span className="font-bold text-xl">
                QR<span className="text-danger-600">Alert</span>
              </span>
            </div>

            {/* Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-ink-600">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#privacy">Privacy</a>
            </nav>

            {/* Button */}
            <Link
              href="/activate/new"
              className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-white"
            >
              Activate <ArrowRight size={13} />
            </Link>

          </div>
        </header>
      </div>

      {/* HERO SECTION (ONLY ONE - FIXED) */}
      <section className="relative overflow-hidden bg-ink-950 text-white pt-28 pb-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-danger-600/10 px-4 py-1.5 text-sm text-danger-400">
                <span className="h-2 w-2 rounded-full bg-danger-500 animate-pulse" />
                Pakistan's First Smart Vehicle Tag
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                One sticker. <br />
                <span className="text-danger-500">Every emergency</span> handled.
              </h1>

              <p className="text-ink-400 max-w-xl">
                Stick QRAlert on your car or bike. Scanning connects you safely without exposing your number.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Link className="bg-danger-600 px-6 py-3 rounded-xl font-bold" href="/activate/new">
                  <QrCode className="inline mr-2" size={18} />
                  Activate
                </Link>

                <Link className="border border-white/20 px-6 py-3 rounded-xl" href="/q/DEMO">
                  Demo Scan
                </Link>
                <Link className="border border-white/20 px-6 py-3 rounded-xl" href="/activate/scan">
                  Scan now
                </Link>
                 <Link className="border border-white/20 px-6 py-3 rounded-xl" href="/admin/qr-generator">
                  generate qr
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:flex justify-center">
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center text-black">
                QR
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            4 Actions. Instant Help.
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {ACTIONS.map((a, i) => (
              <ActionCard key={i} a={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Ready in 3 minutes
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {STEPS.map((s, i) => (
              <div key={i}>
                <div className="w-12 h-12 mx-auto rounded-full border flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Your number stays private
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {PRIVACY_ITEMS.map((p, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-danger-600" />
                <div>
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Protect your vehicle today</h2>
        <Link
          href="/activate/new"
          className="bg-danger-600 text-white px-8 py-4 rounded-xl font-bold"
        >
          Activate Now
        </Link>
      </section>

    </div>
  );
}

/* CONSTANTS */
const ACTIONS = [
  {
    icon: Car,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Report Wrong Parking",
    body: "Notify owner instantly via QR scan.",
  },
  {
    icon: Phone,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    title: "Masked Call",
    body: "Call without exposing number.",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    title: "Emergency Alert",
    body: "Send instant emergency message.",
  },
  {
    icon: MapPin,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Accident Help",
    body: "Share location instantly.",
  },
];

const STEPS = [
  { title: "Buy Sticker", body: "Get QR sticker." },
  { title: "Scan", body: "Activate it online." },
  { title: "Stick", body: "Place on vehicle." },
];

const PRIVACY_ITEMS = [
  { title: "Encrypted Data", body: "Fully secure storage." },
  { title: "Masked Calls", body: "No number exposure." },
  { title: "Secure System", body: "Protected routing." },
  { title: "Kill Switch", body: "Deactivate anytime." },
];