import React from "react";
import {
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Server,
  Lock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  GitBranch,
} from "lucide-react";

export const DpiArchitectureView: React.FC = () => {
  return (
    <div id="dpi-architecture-view" className="space-y-6 text-white">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" />
            System Architecture &amp; India DPI Blueprint
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Hybrid Client-Edge + DPI Middleware
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          CampusLink Technical &amp; Governance Architecture
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Engineered for extreme scalability across thousands of colleges in India. 90% of compute runs client-side in WebAssembly ($0 server execution cost), with native integration into India&apos;s Digital Public Infrastructure (APAAR, ABC, DigiLocker, SIDH).
        </p>
      </div>

      {/* 3-Tier Architecture Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          End-to-End Hybrid System Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Client Edge Layer */}
          <div className="bg-slate-950 border border-cyan-800/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-400">1. CLIENT EDGE LAYER</span>
              <span className="text-[10px] text-slate-500">Browser WASM</span>
            </div>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>React 19 + Tailwind CSS UI</li>
              <li>Monaco Code Editor for Challenges</li>
              <li>Pyodide (CPython WebAssembly Core)</li>
              <li>Tree-sitter WASM AST Syntax Parser</li>
              <li>Zero Server Execution Compute Cost</li>
              <li>Offline-First PWA + IndexedDB Sync</li>
            </ul>
          </div>

          {/* API & Backend Layer */}
          <div className="bg-slate-950 border border-indigo-800/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-indigo-400">2. BACKEND API &amp; WORKERS</span>
              <span className="text-[10px] text-slate-500">FastAPI + Celery</span>
            </div>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>FastAPI (Python 3.11) + Express Gateway</li>
              <li>JWT RS256 Auth &amp; ABAC/RBAC Access</li>
              <li>Celery + Redis Async Worker Queues</li>
              <li>Format-Preserving Encryption (FPE) PII Shield</li>
              <li>API Setu DPI Middleware Connector</li>
              <li>Tamper-Evident SHA-256 Audit Log</li>
            </ul>
          </div>

          {/* AI & Database Layer */}
          <div className="bg-slate-950 border border-amber-800/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400">3. AI ENGINE &amp; DB LAYER</span>
              <span className="text-[10px] text-slate-500">Dual-Engine AI</span>
            </div>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>PostgreSQL 16 + pgvector (HNSW index)</li>
              <li>SBERT (all-MiniLM-L6-v2) 384-d Vectors</li>
              <li>XGBoost VCI Regressor for Fraud Filter</li>
              <li>Gemini 1.5/3.7 Flash BoS RAG Synthesizer</li>
              <li>Closed-Loop Vector Weight Retraining</li>
              <li>AICTE &amp; NCrF Vectorized Curriculum DB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Digital Public Infrastructure (DPI) Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Digital Public Infrastructure (DPI) Native Interoperability
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">Ministry of Education Aligned</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold text-sm">APAAR ID &amp; DigiLocker</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Automated Permanent Academic Account Registry verification pulls verified transcripts and institutional identity with zero paperwork.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-indigo-400 font-bold text-sm">Academic Bank of Credits (ABC)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Completed industry micro-internships and sandbox challenges automatically sync as NCrF Level 5.5 micro-credits into the student&apos;s digital ABC account.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-sm">Skill India Digital Hub (SIDH)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Ingests verified National Occupational Standards (NOS) and government apprenticeship opportunities via API Setu.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">DPDP Act 2023 Compliance</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Format-Preserving Encryption (FPE) and k-anonymity (k &ge; 5) strip PII identifiers from candidate profiles prior to recruiter evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Bill of Materials (BOM) & Cost Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Tiered Prototype Cost Breakdown (INR / ₹)
          </h3>
          <span className="text-xs text-slate-400">Achievable on a Student Budget</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="p-3">Component Tier</th>
                <th className="p-3">Target Audience</th>
                <th className="p-3">Compute / Core Architecture</th>
                <th className="p-3">Hardware &amp; IoT Nodes</th>
                <th className="p-3 text-right">Total Cost (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 bg-emerald-950/20">
                <td className="p-3 font-bold text-emerald-400">Ultra-Low-Cost Prototype</td>
                <td className="p-3 text-slate-400">Hackathon MVP / Student Budget</td>
                <td className="p-3">Local Laptop CPU + WASM + Free Groq Tier</td>
                <td className="p-3">ESP32-S3 + OV2640 Cam + OLED (₹750)</td>
                <td className="p-3 text-right font-extrabold text-emerald-400">₹2,050</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-cyan-400">Standard Prototype</td>
                <td className="p-3 text-slate-400">Production / Institutional Pilot</td>
                <td className="p-3">NVIDIA Jetson Orin Nano (8GB) + Supabase</td>
                <td className="p-3">Dual ESP32 + BME280 Sensors + LoRa SX1276</td>
                <td className="p-3 text-right font-extrabold text-cyan-400">₹26,450</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-amber-400">Advanced Pilot</td>
                <td className="p-3 text-slate-400">Multi-Classroom / Commercial Incubator</td>
                <td className="p-3">Jetson Orin NX + Cloud Vector PGVector</td>
                <td className="p-3">IP65 Enclosure + 7&quot; Touchscreen + 5G Module</td>
                <td className="p-3 text-right font-extrabold text-amber-400">₹65,300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* System Failure Modes & Resilience Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          System Resilience &amp; Multi-Level Fallback Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-red-400 flex items-center justify-between">
              <span>1. Complete Internet Disruption at College</span>
              <span className="text-[10px] text-emerald-400 font-mono">Level 1 Offline Fallback</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Progressive Web App (PWA) executes full AST parsing &amp; Pyodide unit tests client-side in WebWorkers. Cryptographic hash proofs sync to IndexedDB and upload upon Wi-Fi restoration.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-red-400 flex items-center justify-between">
              <span>2. GitHub GraphQL API Rate Limiting</span>
              <span className="text-[10px] text-cyan-400 font-mono">Level 2 Async Fallback</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Switches seamlessly to asynchronous shallow git clone (depth=1) over worker nodes, bypassing API rate limiters entirely to parse raw AST source trees.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-red-400 flex items-center justify-between">
              <span>3. WASM Memory Out-of-Bounds Crash</span>
              <span className="text-[10px] text-amber-400 font-mono">WebWorker Isolation</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Terminates rogue WebWorker with resource quotas and spins up a fresh instance in &lt;200ms without resetting the student&apos;s active test session.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-red-400 flex items-center justify-between">
              <span>4. LLM Hallucination Guardrail</span>
              <span className="text-[10px] text-emerald-400 font-mono">Strict Deterministic Schema</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Forces zero-temperature Pydantic JSON decoding. Validates generated course codes against offline university databases; falls back to deterministic rule patches on schema mismatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
