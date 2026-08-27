import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  XCircle,
  Cpu,
  Clock,
  Zap,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Award,
  Terminal,
  Code2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { WASM_CODE_CHALLENGES } from "../../data/mockData";

export const WasmSandboxDemo: React.FC = () => {
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState<number>(0);
  const challenge = WASM_CODE_CHALLENGES[selectedChallengeIdx];

  const [code, setCode] = useState<string>(challenge.defaultCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    ran: boolean;
    allPassed: boolean;
    tests: { name: string; status: "passed" | "failed"; timeMs: number }[];
    executionTimeMs: number;
    memoryUsedMb: number;
    astComplexity: number;
    astNodeCount: number;
    vciBefore: number;
    vciAfter: number;
    rankBefore: number;
    rankAfter: number;
  }>({
    ran: false,
    allPassed: false,
    tests: [],
    executionTimeMs: 0,
    memoryUsedMb: 0,
    astComplexity: 0,
    astNodeCount: 0,
    vciBefore: 45,
    vciAfter: 45,
    rankBefore: 14,
    rankAfter: 14,
  });

  const handleSelectChallenge = (idx: number) => {
    setSelectedChallengeIdx(idx);
    setCode(WASM_CODE_CHALLENGES[idx].defaultCode);
    setTestResults({
      ran: false,
      allPassed: false,
      tests: [],
      executionTimeMs: 0,
      memoryUsedMb: 0,
      astComplexity: 0,
      astNodeCount: 0,
      vciBefore: 45,
      vciAfter: 45,
      rankBefore: 14,
      rankAfter: 14,
    });
  };

  const handleLoadSolution = () => {
    setCode(challenge.solutionCode);
  };

  const handleResetCode = () => {
    setCode(challenge.defaultCode);
    setTestResults({
      ran: false,
      allPassed: false,
      tests: [],
      executionTimeMs: 0,
      memoryUsedMb: 0,
      astComplexity: 0,
      astNodeCount: 0,
      vciBefore: 45,
      vciAfter: 45,
      rankBefore: 14,
      rankAfter: 14,
    });
  };

  const handleRunWasmVerification = () => {
    setIsRunning(true);

    // Simulate in-browser WASM compilation and test-suite execution
    setTimeout(() => {
      const isSolution = code.includes("Promise.all") || code.includes("delete(p)") || code.includes("cutoff");
      
      const tests = challenge.testCases.map((tc, idx) => ({
        name: tc.name,
        status: (isSolution || idx === 0) ? ("passed" as const) : ("failed" as const),
        timeMs: Math.floor(Math.random() * 40 + 80),
      }));

      const allPassed = isSolution;
      const vciBefore = 45;
      const vciAfter = allPassed ? 88 : 48;
      const rankBefore = 14;
      const rankAfter = allPassed ? 2 : 12;

      setTestResults({
        ran: true,
        allPassed,
        tests,
        executionTimeMs: 320,
        memoryUsedMb: 4.8,
        astComplexity: isSolution ? 3.4 : 1.2,
        astNodeCount: isSolution ? 64 : 22,
        vciBefore,
        vciAfter,
        rankBefore,
        rankAfter,
      });

      setIsRunning(false);

      if (allPassed) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 600);
  };

  return (
    <div id="wasm-sandbox-demo" className="space-y-6">
      {/* Demo Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Live Demo 2: In-Browser WASM Proof-of-Work
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Client Edge Execution | $0 Cloud Compute Cost
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Deterministic AST &amp; WebAssembly Micro-Sandbox
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Candidates prove unverified resume claims in live 60-second micro-challenges executed entirely client-side via WebAssembly. Watch AST metrics evaluate cyclomatic complexity and dynamically upgrade the candidate&apos;s Verifiable Capability Index (VCI) in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSolution}
              className="text-xs px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Load Fix Solution
            </button>
            <button
              onClick={handleResetCode}
              className="text-xs px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Reset Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Challenge Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-400">Select Interactive Challenge:</span>
          {WASM_CODE_CHALLENGES.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChallenge(idx)}
              className={`text-xs px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedChallengeIdx === idx
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{ch.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                {ch.difficulty}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Code Editor on Left, Live Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Monaco-Style Code Editor */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-slate-200 font-semibold">
                  wasm_execution_thread.ts
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span>Domain: <strong className="text-slate-300">{challenge.domain}</strong></span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  {challenge.timeLimitSeconds}s Target
                </span>
              </div>
            </div>

            {/* Problem Brief */}
            <div className="bg-slate-950/80 rounded-xl p-3.5 mb-4 text-xs text-slate-300 border border-slate-800 leading-relaxed">
              <p className="font-semibold text-cyan-300 mb-1">Micro-Challenge Objective:</p>
              <p>{challenge.description}</p>
            </div>

            {/* Interactive Code Editor Area */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950">
              <div className="bg-slate-900/90 px-4 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-slate-400">Isolated WebWorker (Pyodide / WASM Core)</span>
                </div>
                <span>Zero Server Execution</span>
              </div>
              <textarea
                id="wasm-code-editor-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="w-full bg-slate-950 text-emerald-300 font-mono text-xs p-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed resize-none"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Candidate: <span className="font-bold text-slate-200">Arjun Kumar (STU_2026_8832)</span>
            </div>
            <button
              id="btn-run-wasm-tests"
              onClick={handleRunWasmVerification}
              disabled={isRunning}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-xs"
            >
              {isRunning ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-emerald-200" />
                  <span>Compiling in WASM...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run WASM Verification Tests</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Real-Time Telemetry & Leaderboard Impact */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live VCI Impact Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Live VCI &amp; Recruiter Rank Impact
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                Self-Updating Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* VCI Score Change */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400">Verifiable Capability (VCI)</div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xl font-bold text-slate-400">
                    {testResults.ran ? `${testResults.vciBefore}%` : "45%"}
                  </span>
                  {testResults.ran && (
                    <>
                      <span className="text-xs text-slate-500">&rarr;</span>
                      <span
                        className={`text-2xl font-extrabold ${
                          testResults.allPassed ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {testResults.vciAfter}%
                      </span>
                    </>
                  )}
                </div>
                {testResults.ran && testResults.allPassed && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded mt-2">
                    <TrendingUp className="w-3 h-3" /> +43% Real-Time Boost
                  </span>
                )}
              </div>

              {/* Recruiter Leaderboard Position */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400">Recruiter Pool Rank</div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xl font-bold text-slate-400">
                    {testResults.ran ? `#${testResults.rankBefore}` : "#14"}
                  </span>
                  {testResults.ran && (
                    <>
                      <span className="text-xs text-slate-500">&rarr;</span>
                      <span
                        className={`text-2xl font-extrabold ${
                          testResults.allPassed ? "text-cyan-400" : "text-slate-300"
                        }`}
                      >
                        #{testResults.rankAfter}
                      </span>
                    </>
                  )}
                </div>
                {testResults.ran && testResults.allPassed && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded mt-2">
                    <CheckCircle2 className="w-3 h-3" /> Top 5% Interview Ready
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Test Case Execution Output */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Deterministic Test Runner
              </h3>
              {testResults.ran && (
                <span className="text-[11px] text-slate-400 font-mono">
                  Latency: {testResults.executionTimeMs}ms
                </span>
              )}
            </div>

            {testResults.ran ? (
              <div className="space-y-3">
                {testResults.tests.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      t.status === "passed"
                        ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                        : "bg-red-950/40 border-red-800/60 text-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {t.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span className="font-medium">{t.name}</span>
                    </div>
                    <span className="text-[11px] font-mono opacity-80">
                      {t.timeMs}ms
                    </span>
                  </div>
                ))}

                {/* AST Structural Specs */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5 font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>AST Cyclomatic Complexity:</span>
                    <span className="text-cyan-300 font-bold">{testResults.astComplexity} / 10.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parsed AST Syntax Nodes:</span>
                    <span className="text-slate-200 font-bold">{testResults.astNodeCount} Nodes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heap Memory Allocation:</span>
                    <span className="text-emerald-400 font-bold">{testResults.memoryUsedMb} MB</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                Click &quot;Run WASM Verification Tests&quot; to execute client-side suite.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
