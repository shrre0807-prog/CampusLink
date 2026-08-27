import React, { useState } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  Cpu,
  Sparkles,
  GraduationCap,
  Building2,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileCode2,
  CheckCircle2,
  Download,
  Users,
  Activity,
  Terminal,
  Search,
  Zap,
} from "lucide-react";
import { SAMPLE_STUDENTS, SAMPLE_JOBS, SAMPLE_REJECTION_LOGS, INITIAL_BOS_PROPOSAL } from "../data/mockData";
import { UserRole } from "../types";
import { downloadBosPdf, generateStudentVciCertificate } from "../lib/pdfGenerator";

interface DashboardOverviewProps {
  onNavigate: (role: UserRole) => void;
  onOpenTool: (toolId: "resume" | "wasm" | "bos") => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onOpenTool,
}) => {
  const [quickScanCandidate, setQuickScanCandidate] = useState<string>("Siddharth Verma");
  const [scanResult, setScanResult] = useState<{
    status: "idle" | "scanning" | "done";
    vci: number;
    gamed: boolean;
  }>({ status: "idle", vci: 0, gamed: false });

  const handleQuickScan = () => {
    setScanResult({ status: "scanning", vci: 0, gamed: false });
    setTimeout(() => {
      if (quickScanCandidate.includes("Siddharth")) {
        setScanResult({ status: "done", vci: 19.4, gamed: true });
      } else {
        setScanResult({ status: "done", vci: 86.8, gamed: false });
      }
    }, 600);
  };

  return (
    <div id="dashboard-overview-container" className="space-y-6 text-white">
      {/* Top Welcome & Operational Command Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full flex items-center gap-1">
                <LayoutDashboard className="w-3.5 h-3.5" />
                CampusLink Enterprise Platform
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                DPI Cluster Online (v2.4.0)
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              Zero-Trust Academia-Industry Command Center
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              Automated proof-of-work code evaluation engine, real-time candidate integrity screening, and closed-loop Board-of-Studies curriculum realignment for universities.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-quick-wasm-runner"
              onClick={() => onOpenTool("wasm")}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02]"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch WASM Sandbox</span>
            </button>

            <button
              id="btn-quick-bos-generator"
              onClick={() => onOpenTool("bos")}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate BoS Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => onNavigate("recruiter")}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Screening Latency</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-100 mt-1">0.42 Seconds</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-emerald-400 font-semibold font-mono">99.4% Time Reduction</span>
            <span className="text-slate-500">vs 12.5m Manual</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate("recruiter")}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Interview Fail Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">14.2% (Filtered)</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-emerald-400 font-semibold font-mono">Down from 62.0%</span>
            <span className="text-slate-500">Zero AI-Bloat</span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate("academic")}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">BoS Amendment Cycle</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">2.8 Seconds</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-amber-300 font-semibold font-mono">NCrF Level 5.5</span>
            <span className="text-slate-500">vs 3-Year Lag</span>
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate("student")}
          className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Verified Credentials</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1">100% Tamper-Proof</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-indigo-300 font-semibold font-mono">APAAR &amp; ABC Synced</span>
            <span className="text-slate-500">DigiLocker Certified</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Interactive Module Quick Access & Live Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Interactive Fraud & Integrity Diagnostic Strip */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base font-bold text-slate-100">
                  Instant Candidate AST Integrity Diagnostic
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Tree-sitter WASM Engine</span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <select
                value={quickScanCandidate}
                onChange={(e) => {
                  setQuickScanCandidate(e.target.value);
                  setScanResult({ status: "idle", vci: 0, gamed: false });
                }}
                className="w-full sm:w-2/3 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Siddharth Verma (Adversarial Resume - White Font Stuffing)">
                  Siddharth Verma (Adversarial White-Font Resume)
                </option>
                <option value="Arjun Kumar (Authentic Student - Anna Univ CSE)">
                  Arjun Kumar (Authentic Student - Anna Univ)
                </option>
                <option value="Priya Sharma (Authentic Student - Mumbai Univ IT)">
                  Priya Sharma (Authentic Student - Mumbai Univ)
                </option>
              </select>

              <button
                id="btn-run-quick-ast-scan"
                onClick={handleQuickScan}
                disabled={scanResult.status === "scanning"}
                className="w-full sm:w-1/3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {scanResult.status === "scanning" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyzing AST...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run Zero-Trust Audit</span>
                  </>
                )}
              </button>
            </div>

            {/* Scan Result Output */}
            {scanResult.status === "done" && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn ${
                  scanResult.gamed
                    ? "bg-red-950/40 border-red-800/80 text-red-200"
                    : "bg-emerald-950/40 border-emerald-800/80 text-emerald-200"
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    {scanResult.gamed ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span>Adversarial Prompt Injection &amp; Keyword Stuffing Detected!</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Genuine Proof-of-Work Code Graph Verified</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    {scanResult.gamed
                      ? "Traditional Keyword ATS Score: 96% -> True AST Proof-of-Work: 19.4% VCI."
                      : "Verified 48,500 parsed LOC across GitHub AST & WASM sandboxes."}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-lg font-extrabold px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    {scanResult.vci}% VCI
                  </span>
                  <button
                    onClick={() => onOpenTool("resume")}
                    className="underline text-xs hover:text-white font-semibold"
                  >
                    View Breakdown &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Candidates Pipeline Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Live Verified Talent Pipeline
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Filtered by Verifiable Capability Index (VCI)
                </p>
              </div>
              <button
                onClick={() => onNavigate("recruiter")}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Open Recruiter Grid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="pb-2.5">Candidate</th>
                    <th className="pb-2.5">Institution</th>
                    <th className="pb-2.5">APAAR / DigiLocker</th>
                    <th className="pb-2.5">AST Score</th>
                    <th className="pb-2.5 text-right">VCI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {SAMPLE_STUDENTS.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-semibold text-slate-100">
                        {cand.name}
                        <div className="text-[10px] text-slate-500 font-mono">@{cand.githubUsername}</div>
                      </td>
                      <td className="py-3 text-slate-300">{cand.institution}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      </td>
                      <td className="py-3 font-mono text-cyan-300">
                        {cand.githubScore}/100
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`font-mono font-extrabold px-2.5 py-1 rounded-lg text-xs ${
                            cand.vciScore < 30
                              ? "bg-red-950 text-red-300 border border-red-800"
                              : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          }`}
                        >
                          {cand.vciScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live BoS Ticker & System Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Institutional BoS Telemetry Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  BoS Curriculum Engine
                </h3>
              </div>
              <span className="text-[10px] text-amber-400 font-mono uppercase bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                2.8s Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Active Motion Number:</div>
                <div className="font-mono font-bold text-amber-300 text-xs">
                  {INITIAL_BOS_PROPOSAL.motionNumber}
                </div>
                <p className="text-slate-300 text-[11px] font-medium mt-1">
                  {INITIAL_BOS_PROPOSAL.motionTitle}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Triggering Deficit:</span>
                  <strong className="text-red-400">42% Batch Failure</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>NCrF Level:</span>
                  <strong className="text-cyan-300">Level 5.5 (2 Credits)</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Council Vote:</span>
                  <strong className="text-emerald-400">Ready (Semester VI)</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => downloadBosPdf(INITIAL_BOS_PROPOSAL)}
                className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => onNavigate("academic")}
                className="w-full flex items-center justify-center gap-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs font-semibold py-2 rounded-xl border border-amber-500/50 transition-all"
              >
                <span>Dean Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Application Portals Navigator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-100 pb-2 border-b border-slate-800">
              Interactive Application Portals
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate("student")}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white">
                      Student VCI Cockpit
                    </div>
                    <div className="text-[11px] text-slate-400">
                      APAAR ID, Skills &amp; Roadmap
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("recruiter")}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white">
                      Recruiter Discovery Grid
                    </div>
                    <div className="text-[11px] text-slate-400">
                      AST Proof &amp; 30s Feedback Form
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("academic")}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white">
                      Academic Dean &amp; TPO Studio
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Cohort Deficits &amp; OBE Accreditation
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("dpi")}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white">
                      DPI Architecture &amp; Cost
                    </div>
                    <div className="text-[11px] text-slate-400">
                      ₹2,050 BOM &amp; Fallback Matrix
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
