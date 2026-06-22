"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import JSZip from "jszip";
import {
  ShieldAlert, QrCode, Download, RefreshCw, CheckCircle2,
  Clock, Ban, Search, Loader2, Copy, Check, X, PackageOpen,
  ChevronDown, ChevronUp,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface GeneratedCode {
  activation_code: string; // "QRA-4X7K"
  qr_code: string;         // "4X7K"
  scan_url: string;        // "https://qralert.pk/q/4X7K"
}

interface Sticker {
  id: string;
  activation_code: string;
  qr_code: string;
  status: "unactivated" | "activated" | "suspended";
  created_at: string;
  owner_first_name?: string;
  plate_number?: string;
  scan_count: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Sticker["status"] }) {
  if (status === "activated")
    return <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700"><CheckCircle2 size={10} /> Activated</span>;
  if (status === "suspended")
    return <span className="inline-flex items-center gap-1 rounded-full bg-danger-50 px-2.5 py-0.5 text-xs font-semibold text-danger-600"><Ban size={10} /> Suspended</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700"><Clock size={10} /> Unactivated</span>;
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
      className="ml-1 rounded p-0.5 text-ink-300 hover:text-ink-700 transition-colors" title="Copy">
      {copied ? <Check size={11} className="text-brand-600" /> : <Copy size={11} />}
    </button>
  );
}

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-xl animate-fade-up ${type === "success" ? "bg-brand-600" : "bg-danger-600"}`}>
      {msg}
    </div>
  );
}

// ── Off-screen full-res canvases (for ZIP export) ─────────────────────────────
// Hidden, but rendered in the DOM so toDataURL() works reliably.

function HiddenCanvases({ codes }: { codes: GeneratedCode[] }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -9999, top: -9999, pointerEvents: "none" }}>
      {codes.map((c) => (
        <QRCodeCanvas
          key={c.activation_code}
          id={`qr-hidden-${c.qr_code}`}
          value={c.scan_url}
          size={400}
          level="H"
          includeMargin
          bgColor="#ffffff"
          fgColor="#080808"
        />
      ))}
    </div>
  );
}

// ── QR preview card (visible grid) ───────────────────────────────────────────

function QrCard({ code, onDownload }: { code: GeneratedCode; onDownload: (c: GeneratedCode) => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 hover:border-danger-200 transition-colors">
      <QRCodeCanvas value={code.scan_url} size={130} level="H" includeMargin bgColor="#ffffff" fgColor="#080808" />
      <div className="text-center w-full">
        <p className="font-mono text-xs font-black tracking-[0.14em] text-ink-950">{code.activation_code}</p>
        <p className="font-mono text-[10px] text-ink-400 truncate">/q/{code.qr_code}</p>
      </div>
      <button
        onClick={() => onDownload(code)}
        className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-danger-600 transition-colors"
      >
        <Download size={11} /> PNG
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminQrGeneratorPage() {
  const [count, setCount]                 = useState(10);
  const [baseUrl, setBaseUrl]             = useState("");
  const [generating, setGenerating]       = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [lastBatch, setLastBatch]         = useState<GeneratedCode[]>([]);
  const [batchExpanded, setBatchExpanded] = useState(true);
  const [stickers, setStickers]           = useState<Sticker[]>([]);
  const [loadingStickers, setLoadingStickers] = useState(true);
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilterStatus]   = useState<"all"|"unactivated"|"activated"|"suspended">("all");
  const [toast, setToast]                 = useState<{ msg: string; type: "success"|"error" } | null>(null);

  useEffect(() => { setBaseUrl(window.location.origin); }, []);

  const showToast = useCallback((msg: string, type: "success"|"error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchStickers = useCallback(async () => {
    setLoadingStickers(true);
    try {
      const { data } = await axios.get("/api/admin/generate-qrs");
      setStickers(data.stickers || []);
    } catch { showToast("Failed to load stickers.", "error"); }
    finally { setLoadingStickers(false); }
  }, [showToast]);

  useEffect(() => { fetchStickers(); }, [fetchStickers]);

  // ── Generate batch ──────────────────────────────────────────────────────────
  async function handleGenerate() {
    if (!baseUrl.trim()) { showToast("Site URL is required.", "error"); return; }
    setGenerating(true);
    try {
      const { data } = await axios.post("/api/admin/generate-qrs", { count, base_url: baseUrl.trim() });
      setLastBatch(data.codes || []);
      setBatchExpanded(true);
      showToast(`${data.generated} QR codes created and saved!`, "success");
      fetchStickers();
    } catch (err: unknown) {
  console.error("QR Generation Error:", err);

  if (axios.isAxiosError(err)) {
    console.error("Response:", err.response?.data);
    console.error("Status:", err.response?.status);
  }

  const msg = axios.isAxiosError(err)
    ? err.response?.data?.error
    : "Generation failed.";

  showToast(msg || "Generation failed.", "error");
}
     finally { setGenerating(false); }
  }

  // ── Download single PNG ─────────────────────────────────────────────────────
  // Reads from the hidden off-screen canvas by ID
  function downloadSingle(code: GeneratedCode) {
    setTimeout(() => {
      const canvas = document.getElementById(`qr-hidden-${code.qr_code}`) as HTMLCanvasElement | null;
      if (!canvas) { showToast("Canvas not ready, try again.", "error"); return; }
      const link = document.createElement("a");
      link.download = `qr_${code.activation_code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }, 100);
  }

  // ── Download all as ZIP ─────────────────────────────────────────────────────
  async function downloadZip() {
    if (lastBatch.length === 0) return;
    setDownloadingZip(true);
    try {
      await new Promise((r) => setTimeout(r, 150)); // let canvases paint
      const zip    = new JSZip();
      const folder = zip.folder("qr-codes")!;
      let missing  = 0;

      for (const code of lastBatch) {
        const canvas = document.getElementById(`qr-hidden-${code.qr_code}`) as HTMLCanvasElement | null;
        if (!canvas) { missing++; continue; }
        folder.file(`qr_${code.activation_code}.png`, canvas.toDataURL("image/png").split(",")[1], { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qralert-batch-${Date.now()}.zip`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      showToast(missing > 0 ? `Downloaded ${lastBatch.length - missing} (${missing} not ready).` : `Downloaded ${lastBatch.length} QR codes as ZIP!`, missing > 0 ? "error" : "success");
    } catch (e) {
      console.error(e);
      showToast("ZIP failed. Try individual PNG downloads.", "error");
    } finally { setDownloadingZip(false); }
  }

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = stickers.filter((s) => {
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      s.activation_code.toLowerCase().includes(q) ||
      s.qr_code.toLowerCase().includes(q) ||
      (s.owner_first_name || "").toLowerCase().includes(q) ||
      (s.plate_number     || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total:       stickers.length,
    activated:   stickers.filter((s) => s.status === "activated").length,
    unactivated: stickers.filter((s) => s.status === "unactivated").length,
    suspended:   stickers.filter((s) => s.status === "suspended").length,
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ink-50">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Hidden full-res canvases for ZIP export */}
      <HiddenCanvases codes={lastBatch} />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-600">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <span className="font-display text-lg font-black text-ink-950">
              QR<span className="text-danger-600">Alert</span>
            </span>
            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ink-500">Admin</span>
          </div>
          <button onClick={fetchStickers}
            className="flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-50 transition-colors">
            <RefreshCw size={13} className={loadingStickers ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total",       value: stats.total,       bg: "bg-ink-950 text-white" },
            { label: "Activated",   value: stats.activated,   bg: "bg-brand-600 text-white" },
            { label: "Unactivated", value: stats.unactivated, bg: "bg-amber-500 text-white" },
            { label: "Suspended",   value: stats.suspended,   bg: "bg-danger-600 text-white" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 ${s.bg}`}>
              <p className="font-display text-3xl font-black">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest opacity-70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Generator */}
        <div className="rounded-3xl bg-white border border-ink-100 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950">
              <QrCode size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-black text-ink-950">Generate new batch</h2>
              <p className="text-sm text-ink-400">Codes saved to Supabase instantly. QR images rendered in-browser.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Batch size</label>
              <div className="flex items-center gap-4">
                <input type="range" min={1} max={200} value={count} onChange={(e) => setCount(Number(e.target.value))} className="flex-1 accent-danger-600" />
                <span className="font-display text-2xl font-black text-ink-950 w-12 text-right tabular-nums">{count}</span>
              </div>
              <div className="flex justify-between text-xs text-ink-400 mt-1"><span>1</span><span>200 max</span></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Site URL <span className="text-danger-500">*</span></label>
              <input type="url" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://qralert.pk"
                className="w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm font-mono text-ink-900 focus:outline-none focus:border-ink-800" />
              <p className="mt-1.5 text-xs text-ink-400">
                QR encodes: <span className="font-mono">{baseUrl || "https://qralert.pk"}/q/<span className="text-danger-500">XXXX</span></span>
              </p>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={generating}
            className="inline-flex items-center gap-2 rounded-2xl bg-danger-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-danger-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-danger-600/20">
            {generating ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><QrCode size={16} /> Generate {count} QR code{count !== 1 ? "s" : ""}</>}
          </button>
        </div>

        {/* Last batch — QR grid */}
        {lastBatch.length > 0 && (
          <div className="rounded-3xl bg-white border border-ink-100 shadow-sm overflow-hidden">
            <button onClick={() => setBatchExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-6 sm:px-8 py-5 hover:bg-ink-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100">
                  <CheckCircle2 size={16} className="text-brand-600" />
                </div>
                <div className="text-left">
                  <p className="font-display font-black text-ink-950">Last batch — {lastBatch.length} code{lastBatch.length !== 1 ? "s" : ""}</p>
                  <p className="text-xs text-ink-400">Saved to database · Download individual PNGs or all as ZIP</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); downloadZip(); }} disabled={downloadingZip}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-ink-950 px-4 py-2 text-xs font-bold text-white hover:bg-danger-600 transition-colors disabled:opacity-60">
                  {downloadingZip ? <Loader2 size={12} className="animate-spin" /> : <PackageOpen size={12} />} Download all ZIP
                </button>
                {batchExpanded ? <ChevronUp size={18} className="text-ink-400 shrink-0" /> : <ChevronDown size={18} className="text-ink-400 shrink-0" />}
              </div>
            </button>

            {batchExpanded && (
              <div className="border-t border-ink-100">
                <div className="sm:hidden px-6 py-3 border-b border-ink-100">
                  <button onClick={downloadZip} disabled={downloadingZip}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
                    {downloadingZip ? <Loader2 size={12} className="animate-spin" /> : <PackageOpen size={12} />} Download all as ZIP
                  </button>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {lastBatch.map((code) => (
                    <QrCard key={code.activation_code} code={code} onDownload={downloadSingle} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All stickers table */}
        <div className="rounded-3xl bg-white border border-ink-100 shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-ink-100">
            <h2 className="font-display text-xl font-black text-ink-950 mb-4">All QR codes</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="text" placeholder="Search code, slug, owner, plate…" value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border-2 border-ink-200 bg-white pl-9 pr-9 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-ink-800" />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={14} className="text-ink-400 hover:text-ink-700" />
                  </button>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all","activated","unactivated","suspended"] as const).map((f) => (
                  <button key={f} onClick={() => setFilterStatus(f)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold capitalize transition-colors ${filterStatus === f ? "bg-ink-950 text-white" : "border border-ink-200 text-ink-500 hover:bg-ink-50"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loadingStickers ? (
            <div className="flex items-center justify-center py-20 gap-3 text-ink-400">
              <Loader2 size={20} className="animate-spin" /><span className="text-sm font-medium">Loading…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <QrCode size={40} className="mx-auto text-ink-200 mb-3" />
              <p className="text-sm text-ink-400 font-medium">
                {search || filterStatus !== "all" ? "No codes match your filters." : "No codes yet — generate your first batch above."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ink-50 border-b border-ink-100">
                  <tr>
                    {["Activation code","URL slug","Status","Scan URL","Owner","Plate","Scans","Created"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-ink-400 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-ink-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-black tracking-[0.1em] text-ink-950 whitespace-nowrap text-xs">
                        {s.activation_code}<CopyBtn text={s.activation_code} />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-ink-500 whitespace-nowrap">{s.qr_code}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                      <td className="px-5 py-3.5 max-w-[200px]">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-[10px] text-ink-400 truncate">{baseUrl}/q/{s.qr_code}</span>
                          <CopyBtn text={`${baseUrl}/q/${s.qr_code}`} />
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-ink-700 whitespace-nowrap">{s.owner_first_name ?? <span className="text-ink-300">—</span>}</td>
                      <td className="px-5 py-3.5 font-mono text-xs text-ink-700 whitespace-nowrap">{s.plate_number ?? <span className="text-ink-300">—</span>}</td>
                      <td className="px-5 py-3.5 text-center font-bold text-xs text-ink-700">{s.scan_count}</td>
                      <td className="px-5 py-3.5 text-ink-400 text-xs whitespace-nowrap">
                        {new Date(s.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 border-t border-ink-100 text-xs text-ink-400">
                Showing {filtered.length} of {stickers.length} codes
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
