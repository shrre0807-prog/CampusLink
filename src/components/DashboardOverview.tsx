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
    <div id="dashboard-overview-container" className="space-y-6 text-slate-900">
      {/* Top Welcome & Operational Command Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 border border-emerald-700/60 rounded-2xl p-6 shadow-md relative overflow-hidden text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 rounded-full flex items-center gap-1">
                <LayoutDashboard className="w-3.5 h-3.5" />
                CampusLink Enterprise Platform
              </span>
              <span className="text-xs text-emerald-300 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                DPI Cluster Online (v2.4.0)
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Zero-Trust Academia-Industry Command Center
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1.5 max-w-3xl leading-relaxed">
              Automated proof-of-work code evaluation engine, real-time candidate integrity screening, and closed-loop Board-of-Studies curriculum realignment for universities.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-quick-wasm-runner"
              onClick={() => onOpenTool("wasm")}
              className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-[1.02]"
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Launch WASM Sandbox</span>
            </button>

            <button
              id="btn-quick-bos-generator"
              onClick={() => onOpenTool("bos")}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-emerald-500 shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
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
          className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md rounded-2xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Screening Latency</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">0.42 Seconds</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-emerald-600 font-semibold font-mono">99.4% Time Reduction</span>
            <span className="text-slate-400">vs 12.5m Manual</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate("recruiter")}
          className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md rounded-2xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Interview Fail Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">14.2% (Filtered)</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-emerald-600 font-semibold font-mono">Down from 62.0%</span>
            <span className="text-slate-400">Zero AI-Bloat</span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate("academic")}
          className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md rounded-2xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">BoS Amendment Cycle</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1">2.8 Seconds</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-amber-700 font-semibold font-mono">NCrF Level 5.5</span>
            <span className="text-slate-400">vs 3-Year Lag</span>
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate("student")}
          className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md rounded-2xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Verified Credentials</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">100% Tamper-Proof</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-emerald-700 font-semibold font-mono">APAAR &amp; ABC Synced</span>
            <span className="text-slate-400">DigiLocker Certified</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Interactive Module Quick Access & Live Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Interactive Fraud & Integrity Diagnostic Strip */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Instant Candidate AST Integrity Diagnostic
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">Tree-sitter WASM Engine</span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <select
                value={quickScanCandidate}
                onChange={(e) => {
                  setQuickScanCandidate(e.target.value);
                  setScanResult({ status: "idle", vci: 0, gamed: false });
                }}
                className="w-full sm:w-2/3 bg-slate-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
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
                className="w-full sm:w-1/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                    ? "bg-red-50 border-red-200 text-red-800"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900"
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    {scanResult.gamed ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Adversarial Prompt Injection &amp; Keyword Stuffing Detected!</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Genuine Proof-of-Work Code Graph Verified</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {scanResult.gamed
                      ? "Traditional Keyword ATS Score: 96% -> True AST Proof-of-Work: 19.4% VCI."
                      : "Verified 48,500 parsed LOC across GitHub AST & WASM sandboxes."}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`font-mono text-lg font-extrabold px-3 py-1 rounded-lg border ${scanResult.gamed ? "bg-red-100 text-red-800 border-red-300" : "bg-emerald-100 text-emerald-800 border-emerald-300"}`}>
                    {scanResult.vci}% VCI
                  </span>
                  <button
                    onClick={() => onOpenTool("resume")}
                    className="underline text-xs hover:text-emerald-700 font-semibold"
                  >
                    View Breakdown &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Candidates Pipeline Table */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Live Verified Talent Pipeline
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filtered by Verifiable Capability Index (VCI)
                </p>
              </div>
              <button
                onClick={() => onNavigate("recruiter")}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                <span>Open Recruiter Grid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                    <th className="pb-2.5">Candidate</th>
                    <th className="pb-2.5">Institution</th>
                    <th className="pb-2.5">APAAR / DigiLocker</th>
                    <th className="pb-2.5">AST Score</th>
                    <th className="pb-2.5 text-right">VCI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {SAMPLE_STUDENTS.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-semibold text-slate-900">
                        {cand.name}
                        <div className="text-[10px] text-slate-500 font-mono">@{cand.githubUsername}</div>
                      </td>
                      <td className="py-3 text-slate-600">{cand.institution}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-medium">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                        </span>
                      </td>
                      <td className="py-3 font-mono text-emerald-700 font-semibold">
                        {cand.githubScore}/100
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`font-mono font-extrabold px-2.5 py-1 rounded-lg text-xs ${
                            cand.vciScore < 30
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
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
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  BoS Curriculum Engine
                </h3>
              </div>
              <span className="text-[10px] text-emerald-800 font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                2.8s Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="text-slate-500 text-[11px]">Active Motion Number:</div>
                <div className="font-mono font-bold text-emerald-800 text-xs">
                  {INITIAL_BOS_PROPOSAL.motionNumber}
                </div>
                <p className="text-slate-800 text-[11px] font-medium mt-1">
                  {INITIAL_BOS_PROPOSAL.motionTitle}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Triggering Deficit:</span>
                  <strong className="text-red-600 font-bold">42% Batch Failure</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>NCrF Level:</span>
                  <strong className="text-emerald-700 font-bold">Level 5.5 (2 Credits)</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Council Vote:</span>
                  <strong className="text-emerald-700 font-bold">Ready (Semester VI)</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => downloadBosPdf(INITIAL_BOS_PROPOSAL)}
                className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-xl border border-slate-200 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => onNavigate("academic")}
                className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold py-2 rounded-xl border border-emerald-300 transition-all"
              >
                <span>Dean Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Application Portals Navigator */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Interactive Application Portals
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate("student")}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800">
                      Student VCI Cockpit
                    </div>
                    <div className="text-[11px] text-slate-500">
                      APAAR ID, Skills &amp; Roadmap
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("recruiter")}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800">
                      Recruiter Discovery Grid
                    </div>
                    <div className="text-[11px] text-slate-500">
                      AST Proof &amp; 30s Feedback Form
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("academic")}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800">
                      Academic Dean &amp; TPO Studio
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Cohort Deficits &amp; OBE Accreditation
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate("dpi")}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800">
                      DPI Architecture &amp; Cost
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ₹2,050 BOM &amp; Fallback Matrix
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
