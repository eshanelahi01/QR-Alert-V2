"use client";

import React from "react";
import Link from "next/link";
import ActionCard from "@/components/ui/ActionCard";
import {
  AlertTriangle,
  ArrowRight,
  Bike,
  Car,
  CheckCircle,
  MapPin,
  Phone,
  QrCode,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-danger-500 selection:text-white">
      <div className="fixed top-4 left-0 z-50 w-full px-4 sm:px-6">
        <header className="mx-auto max-w-5xl rounded-full border border-ink-200/60 bg-white/70 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all">
          <div className="flex items-center justify-between gap-4">
            <div className="flex cursor-pointer items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-600 text-white shadow-md shadow-danger-600/20 transition-transform group-hover:scale-105">
                <ShieldAlert size={19} />
              </div>
              <span className="font-display text-xl font-black tracking-tight text-ink-950">
                QR<span className="text-danger-600">Alert</span>
              </span>
            </div>

            <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-600 md:flex">
              <a href="#features" className="relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-danger-600 after:transition-all hover:text-danger-600 hover:after:w-full">
                Features
              </a>
              <a href="#how-it-works" className="relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-danger-600 after:transition-all hover:text-danger-600 hover:after:w-full">
                How It Works
              </a>
              <a href="#privacy" className="relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-danger-600 after:transition-all hover:text-danger-600 hover:after:w-full">
                Privacy
              </a>
            </nav>

            <Link href="/activate/new" className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-danger-600 hover:shadow-lg hover:shadow-danger-600/20 active:scale-95">
              Activate sticker <ArrowRight size={13} />
            </Link>
          </div>
        </header>
      </div>

      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-950 pt-28 pb-20 text-white md:pt-36 md:pb-32">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-danger-600/40 bg-danger-600/10 px-4 py-1.5 text-sm font-semibold text-danger-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-danger-500" />
                Pakistan&apos;s First Smart Vehicle Tag
              </div>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                One sticker.
                <br />
                <span className="text-danger-500">Every emergency</span>
                <br />
                handled.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ink-400 sm:text-lg">
                Stick QRAlert on your car or bike. Anyone who scans it can reach you securely - wrong parking, accidents, emergencies - without ever seeing your real number.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/activate/new" className="inline-flex items-center gap-2 rounded-2xl bg-danger-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-danger-600/30 transition-colors hover:bg-danger-700 active:scale-95">
                  <QrCode size={20} /> Activate my sticker
                </Link>
                <Link href="/q/DEMO" className="inline-flex items-center gap-2 rounded-2xl border border-ink-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink-800 active:scale-95">
                  See demo scan
                </Link>
                <Link href="/activate/scan" className="inline-flex items-center gap-2 rounded-2xl border border-ink-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink-800 active:scale-95">
                  Scan QR
                </Link>
              </div>
            </div>

            <div className="relative hidden h-[440px] w-full items-center justify-center lg:col-span-5 lg:flex">
              <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-danger-600/20 blur-3xl" />

              <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 p-2.5">
                  <svg className="h-full w-full text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h6v6H3zM4.5 4.5h3v3h-3z" />
                    <path d="M15 3h6v6h-6zM16.5 4.5h3v3h-3z" />
                    <path d="M3 15h6v6H3zM4.5 16.5h3v3h-3z" />
                    <path d="M15 15h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z" />
                    <path d="M11 5h1v2h-1zM11 9h2v1h-2zM5 11h2v2H5zM9 11h2v1H9zM13 12h2v2h-2z" />
                    <path d="M12 16h1v3h-1zM16 11h3v1h-3zM19 13h2v1h-2z" />
                  </svg>
                  <div className="absolute z-10 flex h-7 w-7 items-center justify-center rounded-md border-2 border-white bg-danger-600 shadow-sm">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <FloatingBadge className="left-0 top-12" color="bg-amber-500" label="Report Wrong Parking" />
              <FloatingBadge className="-right-4 top-20" color="bg-emerald-500" label="Call Owner (Masked)" />
              <FloatingBadge className="-left-6 bottom-20" color="bg-rose-500" label="Report Emergency" />
              <FloatingBadge className="bottom-12 right-2" color="bg-blue-500" label="Accident Concern" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 border-b border-ink-100 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">
              What scanners can do
            </p>
            <h2 className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">
              4 actions. <span className="text-danger-600">Instant help.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ACTIONS.map((a, index) => (
              <ActionCard key={a.title} a={a} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-ink-100 bg-ink-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 block text-xs font-bold uppercase tracking-widest text-neutral-400">
              Setup
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Ready in <span className="text-danger-600">3 minutes</span>
            </h2>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center sm:flex-row sm:items-start">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="flex w-full flex-1 cursor-default flex-col items-center px-4 text-center transition-transform duration-300 group hover:-translate-y-1.5 sm:w-auto">
                  <div className="mb-5 flex h-[46px] w-[46px] items-center justify-center rounded-full border-[1.5px] border-ink-950 font-display text-base font-bold text-ink-950 transition-all duration-300 group-hover:border-danger-600 group-hover:bg-danger-600 group-hover:text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 font-semibold text-ink-900 transition-colors duration-300 group-hover:text-danger-600">
                    {s.title}
                  </h3>
                  <p className="max-w-[220px] text-sm text-ink-500 sm:max-w-[160px]">
                    {s.body}
                  </p>
                </div>

                {i < STEPS.length - 1 && (
                  <>
                    <div className="flex flex-col items-center py-3 sm:hidden">
                      <div className="h-8 border-l-[1.5px] border-dashed border-ink-200" />
                    </div>
                    <div className="hidden w-14 flex-none items-start pt-[22px] sm:flex">
                      <div className="w-full border-t-[1.5px] border-dashed border-ink-200" />
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="scroll-mt-24 border-b border-ink-100 bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-danger-100 bg-danger-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-danger-700">
              Security Standard
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Your number stays private. <span className="text-danger-600">Always.</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-danger-200/70 bg-neutral-50/60 p-8 shadow-[0_4px_12px_rgba(220,38,38,0.01)] sm:p-12">
            <div className="relative z-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {PRIVACY_ITEMS.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-danger-100 bg-white shadow-sm">
                    <CheckCircle size={18} className="text-danger-600" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-base font-bold tracking-tight text-ink-950">
                      {p.title}
                    </h4>
                    <p className="text-sm font-normal leading-relaxed text-ink-500">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <div className="mb-6 flex justify-center gap-4 text-ink-300">
            <Car size={40} /> <Bike size={40} />
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
            Protect your vehicle today
          </h2>
          <p className="mb-8 text-ink-500">Buy a QRAlert sticker, scan it to activate, done.</p>
          <Link href="/activate/new" className="inline-flex items-center gap-2 rounded-2xl bg-danger-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-danger-600/30 transition-colors hover:bg-danger-700">
            <ShieldAlert size={20} /> Activate my sticker now
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-900 bg-ink-950 pt-16 pb-8 text-neutral-400">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 border-b border-neutral-900 pb-12 md:grid-cols-4">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-danger-600 text-white">
                  <ShieldAlert size={15} />
                </div>
                <span className="font-display text-lg font-bold text-white">
                  QR<span className="text-danger-500">Alert</span>
                </span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
                Securing Pakistani roads and vehicles with smart masked communication technology.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="transition-colors hover:text-white">Key Features</a></li>
                <li><a href="#how-it-works" className="transition-colors hover:text-white">How It Works</a></li>
                <li><a href="#privacy" className="transition-colors hover:text-white">Privacy Logs</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Safe</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-neutral-500 sm:flex-row">
            <div className="space-y-1 text-center sm:text-left">
              <p>(c) {new Date().getFullYear()} QRAlert Inc. All rights reserved.</p>
              <p className="font-medium text-neutral-400">
                All contacts protected via Twilio masked communication.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FloatingBadge({ className, color, label }: { className: string; color: string; label: string }) {
  return (
    <div className={`absolute z-20 flex select-none items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] animate-bounce [animation-duration:4.8s] ${className}`}>
      <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
      <span className="text-xs font-bold tracking-tight text-zinc-900">{label}</span>
    </div>
  );
}

const ACTIONS = [
  { icon: Car, title: "Report Wrong Parking", body: "Attach a photo and notify the owner via WhatsApp instantly - no number shared.", border: "border-amber-200", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Phone, title: "Call the Owner", body: "One-tap masked call through Twilio Proxy - neither party's real number is ever exposed.", border: "border-brand-200", iconBg: "bg-brand-50", iconColor: "text-brand-600" },
  { icon: AlertTriangle, title: "Report Emergency", body: "Send an emergency WhatsApp + photo to the owner and their emergency contact at once.", border: "border-danger-200", iconBg: "bg-danger-50", iconColor: "text-danger-600" },
  { icon: MapPin, title: "Accident Concern", body: "Share GPS location with emergency services, alert family, and attach accident photo.", border: "border-ink-200", iconBg: "bg-ink-100", iconColor: "text-ink-700" },
];

const STEPS = [
  { title: "Buy a sticker", body: "Get a QRAlert sticker with a unique activation code printed on it." },
  { title: "Scan & activate", body: "Scan the QR, fill in your vehicle and contact details, submit." },
  { title: "Stick it on", body: "Attach to your car or bike. Anyone who scans it can help - instantly." },
];

const PRIVACY_ITEMS = [
  { title: "Encrypted Database", body: "Phone numbers are stored completely encrypted inside our secure system database." },
  { title: "100% Anonymity", body: "Scanners never see your real phone number - absolute privacy guaranteed." },
  { title: "Masked Phone Calls", body: "All calls are safely bridged through Twilio Proxy masked communication lines." },
  { title: "Secure Routing", body: "WhatsApp messages are sent directly from QRAlert, keeping your phone hidden." },
  { title: "Full Audit Logs", body: "A real-time action audit log tracks every single scan and alert instantly." },
  { title: "Instant Kill-Switch", body: "Your vehicle sticker can be suspended or deleted instantly if lost or stolen." },
];
