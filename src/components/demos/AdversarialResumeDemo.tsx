import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  GitBranch,
  Terminal,
  Zap,
  ArrowRight,
  TrendingDown,
  Cpu,
  FileText,
  Search,
  Sparkles,
  Info,
} from "lucide-react";
import { BENCHMARK_RESUMES } from "../../data/mockData";
import { BenchmarkResumeCase } from "../../types";

export const AdversarialResumeDemo: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<BenchmarkResumeCase>(
    BENCHMARK_RESUMES[0]
  );
  const [showHiddenText, setShowHiddenText] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationComplete, setEvaluationComplete] = useState<boolean>(true);
  const [customKeywords, setCustomKeywords] = useState<string>("");
  const [addedAdversarialKeywords, setAddedAdversarialKeywords] = useState<string[]>([]);

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setEvaluationComplete(false);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationComplete(true);
    }, 450);
  };

  const handleInjectKeyword = (keyword: string) => {
    if (!addedAdversarialKeywords.includes(keyword)) {
      setAddedAdversarialKeywords([...addedAdversarialKeywords, keyword]);
    }
  };

  // Dynamic TF-IDF calculation if judge adds extra keywords
  const extraBoost = addedAdversarialKeywords.length * 3;
  const currentTraditionalScore = Math.min(
    99,
    selectedCase.traditionalTfIdfScore + extraBoost
  );

  return (
    <div id="adversarial-demo-container" className="space-y-6">
      {/* Demo Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-red-950 text-red-400 border border-red-800/60 rounded-full flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Live Demo 1: The Anti-Gaming Trap
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Latency: ~400ms | AST AST-v2.1
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Adversarial Resume Inflation & ATS Benchmark
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Traditional Applicant Tracking Systems (ATS) rank candidates based on keyword term frequency (TF-IDF), easily tricked by invisible white-font stuffing. CampusLink cross-validates claims against <strong>Abstract Syntax Tree (AST) Git telemetry</strong> and local execution proof to neutralize resume inflation in 400ms.
            </p>
          </div>

          {/* Action trigger */}
          <button
            id="btn-run-anti-gaming-eval"
            onClick={handleRunEvaluation}
            disabled={isEvaluating}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Cpu className="w-5 h-5 animate-spin text-cyan-200" />
                <span>Running AST & SBERT Engine...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Live Re-Evaluate Candidate</span>
              </>
            )}
          </button>
        </div>

        {/* Candidate Selector Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-400">Select Test Candidate Profile:</span>
          {BENCHMARK_RESUMES.map((bCase) => (
            <button
              key={bCase.id}
              onClick={() => {
                setSelectedCase(bCase);
                setAddedAdversarialKeywords([]);
                handleRunEvaluation();
              }}
              className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCase.id === bCase.id
                  ? bCase.isAdversarial
                    ? "bg-red-500/20 text-red-300 border border-red-500/50 shadow-sm"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60"
              }`}
            >
              {bCase.isAdversarial ? (
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{bCase.candidateName}</span>
              {bCase.isAdversarial && (
                <span className="text-[10px] bg-red-950/80 text-red-400 px-1.5 py-0.2 rounded border border-red-800/50">
                  Hidden White Font
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Target Job Requisition Context */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Target Job Spec:</span>
          <span className="font-bold text-slate-200">
            Senior Cloud Infrastructure & Distributed Systems Engineer
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">
            Required Tools: <span className="text-cyan-300">Kubernetes, Kafka, Distributed Systems, Golang, AWS</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Target Recruiter VCI Threshold:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-bold border border-slate-700">
            &ge; 80% VCI
          </span>
        </div>
      </div>

      {/* Side-by-Side Benchmark Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Traditional Keyword ATS */}
        <div className="bg-slate-900 border border-red-900/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="text-lg font-bold text-slate-200">
                  Traditional Keyword ATS
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                TF-IDF + Cosine Frequency
              </span>
            </div>

            {/* Score Box */}
            <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-800/40 rounded-xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-red-300/80 font-medium">
                    Calculated Match Score
                  </div>
                  <div className="text-4xl font-extrabold text-red-400 mt-1">
                    {currentTraditionalScore}%
                  </div>
                  <div className="text-xs text-red-300/70 mt-1">
                    Status: <strong className="text-emerald-400">APPROVED (Rank #1)</strong>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Vulnerable to Gaming
                  </span>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Keyword Overlap: High
                  </div>
                </div>
              </div>
            </div>

            {/* Why Traditional Fails */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Screening Logic & Vulnerability:
              </h4>
              <div className="bg-slate-950 rounded-xl p-3 text-xs border border-slate-800 text-slate-300 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fooled by raw term frequency:</strong> The PDF text layer contains 18 matches for &quot;Kubernetes, Kafka, Distributed Systems&quot;.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Code Verification:</strong> Treats unverified text claims as factual competency without checking actual AST code output.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Outcome:</strong> Dishonest keyword-stuffed profile passes directly to expensive 60-min human technical interviews (62% failure rate).
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Keyword Stuffing Simulator */}
            {selectedCase.isAdversarial && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">
                    Inject Extra Invisible Keywords (Live Stress Test):
                  </span>
                  <span className="text-[10px] text-cyan-400">Simulate Candidate Hack</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {["Terraform", "eBPF", "Prometheus", "Fault-Tolerance", "High-Availability"].map(
                    (kw) => (
                      <button
                        key={kw}
                        onClick={() => handleInjectKeyword(kw)}
                        disabled={addedAdversarialKeywords.includes(kw)}
                        className={`text-[11px] px-2 py-1 rounded transition-colors ${
                          addedAdversarialKeywords.includes(kw)
                            ? "bg-red-900/50 text-red-300 line-through"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                        }`}
                      >
                        + {kw}
                      </button>
                    )
                  )}
                </div>
                {addedAdversarialKeywords.length > 0 && (
                  <p className="text-[11px] text-amber-400">
                    Injected {addedAdversarialKeywords.length} hidden terms! Traditional ATS boosted score by +{extraBoost}%.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Result: False Positive referral to recruiter</span>
            <span className="text-red-400 font-semibold">Waste: ~4.5 Hours / HR</span>
          </div>
        </div>

        {/* Right Column: CampusLink Zero-Trust Engine */}
        <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <h3 className="text-lg font-bold text-cyan-300">
                  CampusLink Zero-Trust Engine
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                SBERT + Tree-sitter AST + XGBoost VCI
              </span>
            </div>

            {/* Score Box */}
            <div
              className={`bg-gradient-to-br border rounded-xl p-5 mb-5 ${
                selectedCase.isAdversarial
                  ? "from-slate-900 to-red-950/30 border-red-500/40"
                  : "from-slate-900 to-cyan-950/40 border-cyan-500/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    Verified Capability Index (VCI)
                  </div>
                  <div
                    className={`text-4xl font-extrabold mt-1 ${
                      selectedCase.isAdversarial ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {selectedCase.avsarVciScore}%
                  </div>
                  <div className="text-xs mt-1">
                    Status:{" "}
                    <strong
                      className={
                        selectedCase.isAdversarial ? "text-red-400" : "text-emerald-400"
                      }
                    >
                      {selectedCase.avsarRank}
                    </strong>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  {selectedCase.isAdversarial ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                      Fraud Layer Stripped
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Deterministic Proof
                    </span>
                  )}
                  <div className="text-[11px] text-slate-300 font-mono">
                    AST Proof: {selectedCase.avsarAstProof}% | SBERT: {selectedCase.avsarSbertMatch}%
                  </div>
                </div>
              </div>
            </div>

            {/* AST Breakdown & Detection */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Mathematical AST & Execution Telemetry:
              </h4>
              <div className="bg-slate-950 rounded-xl p-3.5 text-xs border border-slate-800 text-slate-300 space-y-2">
                {selectedCase.detectedAnomalies.map((anomaly, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {selectedCase.isAdversarial ? (
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <span>{anomaly}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tree-sitter Code Inspector */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono">
              <div className="flex items-center justify-between mb-2 text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  GitHub AST Audit: @{selectedCase.githubHandle}
                </span>
                <span className="text-slate-500">
                  {selectedCase.realGitRepos} Repos | {selectedCase.realGitCommits} Commits
                </span>
              </div>
              <div className="text-[11px] space-y-1 text-slate-400">
                {selectedCase.isAdversarial ? (
                  <>
                    <div className="text-red-400">
                      [-] Abstract Syntax Tree: 0 Go AST nodes, 0 Dockerfiles found in public git.
                    </div>
                    <div className="text-red-300">
                      [-] VCI Formula: VCI = (0.6 * SBERT) + (0.4 * AST_Proof) &rarr; Penalized by -77%.
                    </div>
                    <div className="text-cyan-300">
                      [+] Candidate redirected to live 60-second WASM Sandbox for proof.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-emerald-400">
                      [+] Abstract Syntax Tree: 48,000+ verified lines of code across 28 repositories.
                    </div>
                    <div className="text-emerald-300">
                      [+] Cyclomatic Complexity & Unit Test ratio verified at 88%.
                    </div>
                    <div className="text-cyan-300">
                      [+] Semantic Match: SBERT contextual vector mapped &quot;RabbitMQ&quot; to &quot;Async Event Broker&quot;.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Result: 0% False Positive HR referrals</span>
            <span className="text-emerald-400 font-semibold">Deterministic Computer Science</span>
          </div>
        </div>
      </div>

      {/* Raw Resume Inspector with Invisible Text Toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-200">
              Deep Resume Layer Inspector (Visible vs Hidden Text Extraction)
            </h3>
          </div>

          {selectedCase.isAdversarial && (
            <button
              onClick={() => setShowHiddenText(!showHiddenText)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showHiddenText
                  ? "bg-red-500/20 text-red-300 border border-red-500/40"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {showHiddenText ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-red-400" />
                  <span>Highlighting Invisible White-Font (Detected)</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Invisible Layer</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Visible Document View */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <div className="text-slate-400 text-[11px] font-semibold mb-2 flex items-center justify-between">
              <span>What Human Recruiter Sees (Rendered PDF Layer):</span>
              <span className="text-slate-500">Font: Helvetica 10pt</span>
            </div>
            <div className="p-3 bg-white text-slate-900 rounded-lg min-h-[110px] shadow-inner">
              <p className="font-bold text-sm text-slate-950 mb-1">{selectedCase.candidateName}</p>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCase.visibleText}</p>
            </div>
          </div>

          {/* Machine Byte-Stream Parser */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <div className="text-slate-400 text-[11px] font-semibold mb-2 flex items-center justify-between">
              <span>Unstructured.io Font-Color Parser (Byte-Stream):</span>
              <span className="text-cyan-400">AST Ingestion Stream</span>
            </div>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-lg min-h-[110px] space-y-2">
              <p className="text-slate-400 text-[11px]">
                <span className="text-slate-500">// Visible text stream:</span> {selectedCase.visibleText}
              </p>

              {selectedCase.isAdversarial && showHiddenText && (
                <div className="p-2 bg-red-950/60 border border-red-700/60 rounded text-red-300 text-[11px] animate-pulse">
                  <span className="font-bold text-red-400">[EXTRACTED INVISIBLE WHITE-FONT LAYER (Color #FFFFFF, Size 0.5pt)]:</span>{" "}
                  {selectedCase.hiddenWhiteFontText}{" "}
                  {addedAdversarialKeywords.join(" ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
