import React, { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  GitBranch,
  FileCode2,
  UserCheck,
  UserX,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Mic,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SAMPLE_JOBS, SAMPLE_REJECTION_LOGS } from "../data/mockData";
import { getStoredStudents } from "../lib/studentStorage";
import { StudentProfile, JobRequisition, RecruiterRejectionLog } from "../types";

interface RecruiterPortalProps {
  candidates?: StudentProfile[];
}

export const RecruiterPortal: React.FC<RecruiterPortalProps> = ({
  candidates: propCandidates,
}) => {
  const [jobs, setJobs] = useState<JobRequisition[]>(SAMPLE_JOBS);
  const [selectedJob, setSelectedJob] = useState<JobRequisition>(SAMPLE_JOBS[0]);
  const candidates = propCandidates && propCandidates.length > 0 ? propCandidates : getStoredStudents();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minVciFilter, setMinVciFilter] = useState<number>(50);
  const [selectedCandidate, setSelectedCandidate] = useState<StudentProfile | null>(null);

  // 30-Second Rejection Modal State
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [rejectingCandidate, setRejectingCandidate] = useState<StudentProfile | null>(null);
  const [failureMode, setFailureMode] = useState<RecruiterRejectionLog["primaryFailureMode"]>(
    "Async & Distributed Architecture"
  );
  const [specificTool, setSpecificTool] = useState<string>("Kafka consumer rebalancing & dead-letter queue handling");
  const [softSkillRating, setSoftSkillRating] = useState<number>(4);
  const [recruiterNotes, setRecruiterNotes] = useState<string>(
    "Candidate passed basic LeetCode syntax checks but failed hands-on message queue partition handling in live discussion."
  );
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch && c.vciScore >= minVciFilter;
  });

  const handleOpenRejectModal = (candidate: StudentProfile) => {
    setRejectingCandidate(candidate);
    setIsRejectModalOpen(true);
    setFeedbackSubmitted(false);
  };

  const handleSubmitRejectionFeedback = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setIsRejectModalOpen(false);
      setFeedbackSubmitted(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 1200);
  };

  return (
    <div id="recruiter-portal-container" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-full flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Recruiter Talent Discovery Grid
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Ranked by Verified AST &amp; VCI (Not Fake Keywords)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Zero-Trust Technical Talent Pipeline
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Screen candidates with 99.4% less time wasted on AI-inflated resumes. Evaluate deterministic code quality, commit entropy, and AST test ratios before scheduling expensive interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
              <div className="text-slate-400">First-Round Tech Failure:</div>
              <div className="text-emerald-400 font-bold text-sm">14.2% (Down from 62%)</div>
            </div>
          </div>
        </div>

        {/* Job Requisition Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-400">Active Job Requisitions:</span>
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`text-xs px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedJob.id === job.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{job.title} ({job.company})</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {job.stipendOrSalary}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate name, institution, or verified skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <div className="flex items-center gap-2">
            <span>Minimum VCI Threshold:</span>
            <span className="font-bold text-cyan-300 font-mono">{minVciFilter}%</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minVciFilter}
              onChange={(e) => setMinVciFilter(Number(e.target.value))}
              className="w-24 accent-cyan-500 cursor-pointer"
            />
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Showing <strong className="text-slate-100">{filteredCandidates.length}</strong> candidates
          </span>
        </div>
      </div>

      {/* Candidate Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => {
          const isGamed = cand.vciScore < 30;
          return (
            <div
              key={cand.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl text-white flex flex-col justify-between transition-all hover:border-slate-600 ${
                isGamed ? "border-red-900/50 bg-red-950/10" : "border-slate-800"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-100">{cand.name}</h3>
                      {cand.digiLockerVerified && (
                        <ShieldCheck className="w-4 h-4 text-cyan-400" title="DigiLocker Verified" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{cand.institution}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      APAAR: {cand.apaarId}
                    </p>
                  </div>

                  {/* VCI Badge */}
                  <div
                    className={`px-3 py-1.5 rounded-xl border text-center font-mono ${
                      isGamed
                        ? "bg-red-950/60 border-red-700/60 text-red-300"
                        : "bg-cyan-950/60 border-cyan-700/60 text-cyan-300"
                    }`}
                  >
                    <div className="text-lg font-extrabold">{cand.vciScore}%</div>
                    <div className="text-[9px] uppercase tracking-wider font-sans">
                      {isGamed ? "Flagged" : "VCI Score"}
                    </div>
                  </div>
                </div>

                {/* AST & Proof Stats */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 font-mono mb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>GitHub AST Score:</span>
                    <strong className={isGamed ? "text-red-400" : "text-emerald-400"}>
                      {cand.githubScore}/100
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Analyzed Repositories:</span>
                    <strong className="text-slate-200">{cand.astStats.reposAnalyzed} Repos</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total Parsed LOC:</span>
                    <strong className="text-slate-200">{cand.astStats.linesOfCode.toLocaleString()} LOC</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Commit Graph Entropy:</span>
                    <strong className={cand.astStats.entropyScore < 0.3 ? "text-red-400" : "text-cyan-300"}>
                      {cand.astStats.entropyScore} {cand.astStats.entropyScore < 0.3 ? "(Low / AI-Risk)" : "(Natural)"}
                    </strong>
                  </div>
                </div>

                {/* Top Skills Tag list */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] text-slate-400 font-semibold">Verified Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cand.skills.slice(0, 3).map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                      >
                        {s.name.split(" ")[0]} ({s.verifiedConfidence}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCandidate(cand)}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>AST Deep Dive</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenRejectModal(cand)}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-red-700/60 transition-all"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => alert(`Interview invite dispatched to ${cand.name} (${cand.email}) with verified VCI score ${cand.vciScore}%.`)}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-all"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Shortlist</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Deep-Dive Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-400">{selectedCandidate.institution} &bull; {selectedCandidate.department}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* AST Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400">Total Analyzed Commits</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">{selectedCandidate.astStats.totalCommits}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400">WASM Sandbox Pass Rate</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{selectedCandidate.sandboxCompletionRate}%</div>
              </div>
            </div>

            {/* AI Voice Screening Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Mic className="w-4 h-4 text-indigo-400" />
                <span>2-Minute AI Audio Screening Digest (Soft Skills &amp; Domain Clarity)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Candidate articulated asynchronous event looping principles clearly. Hesitation score: 1.2s avg (low). Demonstrated understanding of Kafka partitions; suggested practical remediation on distributed dead-letter queue handling.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                <span>Technical Articulation: <strong>4.5 / 5.0</strong></span>
                <span>Problem Solving under Ambiguity: <strong>4.0 / 5.0</strong></span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 30-Second Rejection Modal: Powers the Closed-Loop Feedback Engine */}
      {isRejectModalOpen && rejectingCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-800/60 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  Closed-Loop Feedback Telemetry
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                  30-Second Technical Exit Feedback
                </h3>
                <p className="text-xs text-slate-400">
                  Candidate: <strong>{rejectingCandidate.name}</strong> ({rejectingCandidate.institution})
                </p>
              </div>
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-emerald-300">Feedback Successfully Logged!</h4>
                <p className="text-xs text-slate-400">
                  Closed loop updated candidate&apos;s remediation roadmap and pushed telemetry to University BoS Deficit Matrix.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    1. Primary Technical Failure Mode:
                  </label>
                  <select
                    value={failureMode}
                    onChange={(e) =>
                      setFailureMode(e.target.value as RecruiterRejectionLog["primaryFailureMode"])
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                  >
                    <option value="Async & Distributed Architecture">Async &amp; Distributed Architecture</option>
                    <option value="Theoretical vs Hands-on Execution">Theoretical vs Hands-on Execution</option>
                    <option value="Containerization & Cloud Infrastructure">Containerization &amp; Cloud Infrastructure</option>
                    <option value="Unit Testing & CI/CD">Unit Testing &amp; CI/CD</option>
                    <option value="Problem Articulation / Soft Skills">Problem Articulation / Soft Skills</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    2. Specific Tooling / Framework Deficit:
                  </label>
                  <input
                    type="text"
                    value={specificTool}
                    onChange={(e) => setSpecificTool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                    placeholder="e.g., Kafka consumer rebalancing, Docker multi-stage builds..."
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    3. Soft Skills &amp; Communication Rating:
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSoftSkillRating(star)}
                        className={`w-8 h-8 rounded-lg font-bold transition-all ${
                          softSkillRating >= star
                            ? "bg-amber-500 text-slate-950"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    4. Brief Diagnostic Note:
                  </label>
                  <textarea
                    rows={2}
                    value={recruiterNotes}
                    onChange={(e) => setRecruiterNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400">
                    &rarr; Routes to Student Roadmap &amp; Dean BoS Engine
                  </span>
                  <button
                    onClick={handleSubmitRejectionFeedback}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-lg transition-all"
                  >
                    Submit Exit Telemetry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
