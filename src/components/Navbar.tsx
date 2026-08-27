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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 text-slate-800 shadow-sm">
      {/* Top DPI & Government Compliance Bar */}
      <div className="bg-emerald-950 px-4 py-1.5 text-xs border-b border-emerald-900 flex flex-wrap items-center justify-between gap-2 text-emerald-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            CampusLink Enterprise
          </span>
          <span className="text-emerald-700 hidden sm:inline">|</span>
          <span className="text-emerald-200 hidden md:inline">
            Zero-Trust Skill Mapping &amp; Curriculum Realignment
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-mono text-emerald-200">APAAR ID / ABC Live</span>
          </div>
          <div className="flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60 hidden sm:flex">
            <Cpu className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-amber-200">WASM Edge Sandbox</span>
          </div>
          <div className="flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  Campus<span className="text-emerald-600">Link</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 rounded">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
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
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>Overview</span>
            </button>

            <button
              id="tab-btn-recruiter"
              onClick={() => onSelectRole("recruiter")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "recruiter"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Recruiter <span className="hidden md:inline">ATS</span></span>
            </button>

            <button
              id="tab-btn-student"
              onClick={() => onSelectRole("student")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "student"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Student <span className="hidden md:inline">Portal</span></span>
            </button>

            <button
              id="tab-btn-academic"
              onClick={() => onSelectRole("academic")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "academic"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Dean <span className="hidden md:inline">&amp; BoS</span></span>
            </button>

            <button
              id="tab-btn-sandbox"
              onClick={() => onSelectRole("sandbox")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRole === "sandbox" || activeRole === "demos"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Interactive <span className="hidden md:inline">Tools</span></span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
