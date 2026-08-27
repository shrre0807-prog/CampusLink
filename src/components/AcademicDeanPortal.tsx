import React, { useState } from "react";
import {
  Layers,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  Download,
  CheckCircle2,
  TrendingDown,
  BookOpen,
  Calendar,
  FileText,
  Activity,
  ArrowRight,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { SAMPLE_REJECTION_LOGS, INITIAL_BOS_PROPOSAL } from "../data/mockData";
import { BosSyllabusProposal } from "../types";
import { downloadBosPdf } from "../lib/pdfGenerator";

interface AcademicDeanPortalProps {
  onOpenBosDemo: () => void;
}

export const AcademicDeanPortal: React.FC<AcademicDeanPortalProps> = ({ onOpenBosDemo }) => {
  const [rejectionLogs, setRejectionLogs] = useState(SAMPLE_REJECTION_LOGS);
  const [proposal, setProposal] = useState<BosSyllabusProposal>(INITIAL_BOS_PROPOSAL);

  const handleExportPdf = () => {
    downloadBosPdf(proposal);
  };

  return (
    <div id="academic-dean-portal" className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-amber-950 text-amber-400 border border-amber-800/60 rounded-full flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Institutional BoS Curriculum Realignment Studio
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NBA / NAAC OBE Criteria 2 &amp; 3 Aligned
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Department of Computer Science &amp; Engineering &bull; Anna University
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Eliminate the 3-year curriculum revision lag. Convert real-time employer rejection telemetry into accredited, credit-mapped Board-of-Studies syllabus amendment motions in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBosDemo}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch BoS Generator</span>
            </button>
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Institutional Stats */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px]">2026 Batch Enrolled</div>
            <div className="text-lg font-bold text-slate-100 mt-1">420 Students</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px]">Interview Rejection Rate</div>
            <div className="text-lg font-bold text-amber-400 mt-1">42% (Async Systems)</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px]">Syllabus Revision Cycle</div>
            <div className="text-lg font-bold text-emerald-400 mt-1">2.8s (vs 3 Years)</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px]">NCrF Compliance</div>
            <div className="text-lg font-bold text-cyan-400 mt-1">100% Level 5.5</div>
          </div>
        </div>
      </div>

      {/* Grid: Cohort Deficit Matrix & Live Recruiter Telemetry Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Columns: Cohort Deficit Heatmap */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <h3 className="text-base font-bold text-slate-200">
                  Cohort Technical Deficit Matrix (2026 Batch)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Anna Univ CSE</span>
            </div>

            {/* Deficit Bars */}
            <div className="space-y-4">
              {[
                { name: "Async Event Queues & Kafka", failureRate: 42, color: "bg-red-500", status: "Critical BoS Action Needed" },
                { name: "Container Orchestration & Docker/K8s", failureRate: 31, color: "bg-amber-500", status: "Elective Module Recommended" },
                { name: "Automated Mock Unit Testing & CI/CD", failureRate: 24, color: "bg-cyan-500", status: "Lab Practical Revision" },
                { name: "Database Indexing & Connection Pooling", failureRate: 18, color: "bg-indigo-500", status: "Minor Lab Adjustment" },
                { name: "Data Structures & Core Algorithms", failureRate: 6, color: "bg-emerald-500", status: "Adequately Covered in Syllabus" },
              ].map((def) => (
                <div key={def.name} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{def.name}</span>
                    <span className="font-mono font-bold text-amber-400">{def.failureRate}% Failure Rate</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${def.color}`} style={{ width: `${def.failureRate}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Recommendation: <strong className="text-slate-300">{def.status}</strong></span>
                    {def.failureRate >= 30 && (
                      <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
            <span>Aggregated across 142 campus recruiter technical interviews</span>
            <span className="text-cyan-400 font-semibold">Real-Time Sync</span>
          </div>
        </div>

        {/* Right 6 Columns: Live Recruiter Rejection Telemetry Feed */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-slate-200">
                  Live Recruiter Rejection Telemetry Stream
                </h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Feed
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {rejectionLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{log.roleApplied}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {log.timestamp.split("T")[0]}
                    </span>
                  </div>
                  <div className="text-[11px] text-red-400 font-medium">
                    Deficit: {log.primaryFailureMode} &bull; <span className="text-slate-300">{log.specificMissingTool}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic bg-slate-900/60 p-2 rounded border border-slate-800/80">
                    &quot;{log.notes}&quot;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Candidate: {log.candidateName}</span>
                    <span className="text-cyan-400 font-medium">Auto-mapped to CO2/CO3</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
            <span>Telemetries auto-trigger BoS syllabus drafts</span>
            <button
              onClick={onOpenBosDemo}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Auto-Draft Amendment</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Outcome-Based Education (OBE) & NBA Accreditation Alignment */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-200">
              NBA / NAAC Accreditation &amp; OBE Program Outcome (PO) Attainment
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">100% Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-200">NBA Criteria 2: Teaching-Learning Process</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Demonstrates systematic incorporation of real industry feedback into experiential lab practicals and continuous student micro-assessments.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-200">NBA Criteria 3: Course Outcomes (CO-PO)</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Automated mapping of modern tools (Kafka, Docker, OpenTelemetry) directly to Program Outcomes PO3 (Design), PO5 (Modern Tool Usage), and PO12 (Life-long Learning).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-200">National Credit Framework (NCrF)</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every micro-internship, sandbox challenge, and elective course directly awards verifiable credits synced to the student&apos;s Academic Bank of Credits (ABC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
