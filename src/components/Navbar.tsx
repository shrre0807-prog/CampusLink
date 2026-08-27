import React from "react";
import {
  ShieldCheck,
  Code2,
  GraduationCap,
  Building2,
  Layers,
  CheckCircle2,
  Cpu,
  LayoutDashboard,
  Terminal,
} from "lucide-react";
import { UserRole } from "../types";

interface NavbarProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenDemo: (demoId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onSelectRole,
  onOpenDemo,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white shadow-xl">
      {/* Top DPI & Government Compliance Bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            CampusLink Enterprise
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Zero-Trust Skill Mapping &amp; Curriculum Realignment
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-cyan-200">APAAR ID / ABC Live</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 hidden sm:flex">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-200">WASM Edge Sandbox</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-200">DPDP Act 2023</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            id="nav-brand-logo"
            onClick={() => onSelectRole("dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-900/30 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white">
                  Campus<span className="text-cyan-400">Link</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-700/50 rounded">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Zero-Trust Proof-of-Work Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 md:gap-2">
            <button
              id="tab-btn-dashboard"
              onClick={() => onSelectRole("dashboard")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "dashboard"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>Overview</span>
            </button>

            <button
              id="tab-btn-recruiter"
              onClick={() => onSelectRole("recruiter")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "recruiter"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Recruiter <span className="hidden md:inline">ATS</span></span>
            </button>

            <button
              id="tab-btn-student"
              onClick={() => onSelectRole("student")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "student"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Student <span className="hidden md:inline">Portal</span></span>
            </button>

            <button
              id="tab-btn-academic"
              onClick={() => onSelectRole("academic")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "academic"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Dean <span className="hidden md:inline">&amp; BoS</span></span>
            </button>

            <button
              id="tab-btn-sandbox"
              onClick={() => onSelectRole("sandbox")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "sandbox" || activeRole === "demos"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Interactive <span className="hidden md:inline">Tools</span></span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
