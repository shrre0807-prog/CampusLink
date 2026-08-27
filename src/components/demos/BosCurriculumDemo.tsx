import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  Download,
  FileCode,
  CheckCircle2,
  AlertOctagon,
  Building,
  GraduationCap,
  Calendar,
  BookOpen,
  ArrowRight,
  Printer,
  FileText,
  Clock,
  Send,
  Zap,
} from "lucide-react";
import { INITIAL_BOS_PROPOSAL, SAMPLE_REJECTION_LOGS } from "../../data/mockData";
import { BosSyllabusProposal } from "../../types";
import { downloadBosPdf } from "../../lib/pdfGenerator";

export const BosCurriculumDemo: React.FC = () => {
  const [proposal, setProposal] = useState<BosSyllabusProposal>(INITIAL_BOS_PROPOSAL);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showLatex, setShowLatex] = useState<boolean>(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("Anna University, Chennai");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Computer Science & Engineering");
  const [selectedDeficit, setSelectedDeficit] = useState<string>("Async Message Brokers & Distributed Queues (Kafka / RabbitMQ)");
  const [generationTimeMs, setGenerationTimeMs] = useState<number>(2800);
  const [activeStep, setActiveStep] = useState<number>(3); // 1: Rejection, 2: Aggregation Alert, 3: Generated Proposal

  const handleTriggerRejectionAndGenerate = async () => {
    setActiveStep(1);
    setIsGenerating(true);

    // Step 1: Simulate recruiter logging rejection
    setTimeout(async () => {
      setActiveStep(2);

      // Step 2: System aggregates cohort deficit & calls backend
      try {
        const startTime = Date.now();
        const res = await fetch("/api/bos/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            institution: selectedInstitution,
            department: selectedDepartment,
            targetDeficits: [selectedDeficit, "Containerized Microservices"],
            failureRate: 42,
          }),
        });

        const data = await res.json();
        const elapsed = Date.now() - startTime;
        setGenerationTimeMs(elapsed > 0 ? elapsed : 2800);

        if (data.success && data.data) {
          setProposal({
            ...data.data,
            institution: selectedInstitution,
            department: selectedDepartment,
            generatedDate: new Date().toISOString().split("T")[0],
          });
        }
      } catch (err) {
        console.warn("Using deterministic fallback proposal:", err);
      } finally {
        setIsGenerating(false);
        setActiveStep(3);
      }
    }, 900);
  };

  const handleDownloadPdf = () => {
    downloadBosPdf(proposal);
  };

  const latexCode = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{margin=1in}
\\usepackage{tabularx}
\\usepackage{booktabs}

\\title{\\textbf{BOARD OF STUDIES (BoS) SYLLABUS AMENDMENT MOTION}\\\\\\large ${proposal.motionNumber}}
\\author{Department of ${proposal.department}\\\\${proposal.institution}}
\\date{Academic Year: ${proposal.academicYear}}

\\begin{document}
\\maketitle

\\section*{1. Executive Rationale & Industry Telemetry}
${proposal.rationale}

\\section*{2. NCrF Credit Structure (Level 5.5)}
\\begin{table}[h]
\\centering
\\begin{tabular}{ccccc}
\\toprule
\\textbf{Lecture (L)} & \\textbf{Tutorial (T)} & \\textbf{Practical (P)} & \\textbf{Total Credits} & \\textbf{NCrF Level} \\\\
\\midrule
${proposal.creditStructure.lectureHours} & ${proposal.creditStructure.tutorialHours} & ${proposal.creditStructure.practicalHours} & ${proposal.creditStructure.totalCredits} & ${proposal.creditStructure.ncrfLevel} \\\\
\\bottomrule
\\end{tabular}
\\end{table}

\\section*{3. Course Outcomes (CO) \& Bloom's Taxonomy Mapping}
\\begin{itemize}
${proposal.courseOutcomes.map((co) => `  \\item \\textbf{${co.code}}: ${co.outcome} [${co.bloomsLevel}] (Mapped: ${co.mappedPOs.join(", ")})`).join("\n")}
\\end{itemize}

\\section*{4. Syllabus Modules}
${proposal.syllabusModules.map((m) => `\\subsection*{Module ${m.moduleNumber}: ${m.title} (${m.hours} Hours)}\n\\textbf{Topics:} ${m.topics.join(", ")}\\\\\n\\textbf{Industry Alignment:} ${m.industryAlignment}`).join("\n\n")}

\\section*{5. Compliance Statement}
${proposal.obeComplianceStatement}

\\end{document}`;

  return (
    <div id="bos-curriculum-demo" className="space-y-6">
      {/* Demo Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-amber-950 text-amber-400 border border-amber-800/60 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Live Demo 3: The 3-Second Closed-Loop Syllabus Patch
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Sub-3s Generation | NCrF Level 5.5 &amp; AICTE Compliant
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Recruiter Rejection Telemetry to Board-of-Studies (BoS) Proposal
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Universities typically require 3 years to update engineering curricula due to lack of policy-ready industry feedback. CampusLink transforms recruiter interview rejections directly into an accredited, ready-to-vote Board-of-Studies course amendment document in 2.8 seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-download-bos-pdf"
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Official BoS PDF</span>
            </button>
            <button
              onClick={() => setShowLatex(!showLatex)}
              className="text-xs px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showLatex ? "View Formatted" : "View LaTeX"}</span>
            </button>
          </div>
        </div>

        {/* Live Closed-Loop Trigger Pipeline */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Target Institution:</label>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Anna University, Chennai">Anna University, Chennai</option>
              <option value="Visvesvaraya Technological University (VTU)">VTU, Belagavi</option>
              <option value="Mumbai University (MU)">Mumbai University</option>
              <option value="JNTU Hyderabad">JNTU Hyderabad</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Department:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Triggering Skill Deficit:</label>
            <select
              value={selectedDeficit}
              onChange={(e) => setSelectedDeficit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Async Message Brokers & Distributed Queues (Kafka / RabbitMQ)">Async Queues (Kafka / RabbitMQ)</option>
              <option value="Container Orchestration & Health Probes (Kubernetes)">Kubernetes & Cloud SRE</option>
              <option value="Automated Mock Unit Testing & CI/CD Pipelines">Automated CI/CD & Testing</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              id="btn-trigger-rejection-to-bos"
              onClick={handleTriggerRejectionAndGenerate}
              disabled={isGenerating}
              className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Rejection &rarr; BoS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Closed-Loop Visual Pipeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div
          className={`p-4 rounded-xl border text-xs transition-all ${
            activeStep === 1
              ? "bg-red-950/40 border-red-500 shadow-md"
              : "bg-slate-900/80 border-slate-800 text-slate-400"
          }`}
        >
          <div className="flex items-center justify-between font-semibold mb-2">
            <span className="text-red-400">Step 1: Recruiter Exit Form</span>
            <span className="text-[10px] font-mono">30-sec input</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Recruiter marks <strong>Arjun Kumar</strong> as rejected at Round 2 with structured note: <em>&quot;Lacks hands-on Kafka &amp; Async message broker experience.&quot;</em>
          </p>
        </div>

        {/* Step 2 */}
        <div
          className={`p-4 rounded-xl border text-xs transition-all ${
            activeStep === 2
              ? "bg-amber-950/40 border-amber-500 shadow-md"
              : "bg-slate-900/80 border-slate-800 text-slate-400"
          }`}
        >
          <div className="flex items-center justify-between font-semibold mb-2">
            <span className="text-amber-400">Step 2: Campus Deficit Alert</span>
            <span className="text-[10px] font-mono text-amber-300">42% Threshold Hit</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Platform aggregates 28 interview logs across the 2026 CS Batch and flags an institutional curriculum deficit to Department Head &amp; Dean.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className={`p-4 rounded-xl border text-xs transition-all ${
            activeStep === 3
              ? "bg-emerald-950/40 border-emerald-500 shadow-md"
              : "bg-slate-900/80 border-slate-800 text-slate-400"
          }`}
        >
          <div className="flex items-center justify-between font-semibold mb-2">
            <span className="text-emerald-400">Step 3: Auto-BoS Amendment</span>
            <span className="text-[10px] font-mono text-emerald-300">Generated in {generationTimeMs / 1000}s</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            AI BoS Engine generates accredited 2-Credit syllabus motion with Course Outcomes (COs) and Bloom&apos;s verbs ready for council voting.
          </p>
        </div>
      </div>

      {/* Main Document Preview Area (Formatted View vs LaTeX View) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        {showLatex ? (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs">
              <span className="font-mono text-cyan-400 font-semibold">
                LaTeX Source Output (WeasyPrint / TeX Live Ready):
              </span>
              <span className="text-slate-500 font-mono">bos_amendment_motion.tex</span>
            </div>
            <pre className="p-4 bg-slate-950 text-cyan-200 font-mono text-xs rounded-xl overflow-x-auto border border-slate-800 max-h-[500px]">
              {latexCode}
            </pre>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Document Header */}
            <div className="border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                <span className="font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  {proposal.motionNumber}
                </span>
                <span>Generated Date: {proposal.generatedDate || "2026-08-26"}</span>
                <span className="text-emerald-400 font-medium">Verified against AICTE Guidelines</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 leading-snug">
                {proposal.motionTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {proposal.institution} &bull; {proposal.department} &bull; Academic Year {proposal.academicYear}
              </p>
            </div>

            {/* Rationale */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                1. Industry Telemetry Deficit &amp; Academic Rationale
              </h4>
              <p className="text-xs text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800 leading-relaxed">
                {proposal.rationale}
              </p>
            </div>

            {/* Credit Structure Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                2. NCrF Credit &amp; Instructional Structure
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Lecture (L)</div>
                  <div className="text-base font-bold text-slate-100 mt-1">{proposal.creditStructure.lectureHours} hr/wk</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Tutorial (T)</div>
                  <div className="text-base font-bold text-slate-100 mt-1">{proposal.creditStructure.tutorialHours} hr/wk</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Practical (P)</div>
                  <div className="text-base font-bold text-slate-100 mt-1">{proposal.creditStructure.practicalHours} hr/wk</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-amber-800/40 bg-amber-950/20">
                  <div className="text-amber-300 text-[11px]">Total Credits</div>
                  <div className="text-base font-extrabold text-amber-400 mt-1">{proposal.creditStructure.totalCredits} Credits</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-[11px]">NCrF Level</div>
                  <div className="text-xs font-semibold text-cyan-300 mt-1.5">Level 5.5</div>
                </div>
              </div>
            </div>

            {/* Course Outcomes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                3. Course Outcomes (CO) &amp; Bloom&apos;s Taxonomy Mapping
              </h4>
              <div className="space-y-2">
                {proposal.courseOutcomes.map((co) => (
                  <div
                    key={co.code}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-cyan-400 shrink-0">{co.code}:</span>
                      <span className="text-slate-200">{co.outcome}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                        {co.bloomsLevel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {co.mappedPOs.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                4. Proposed Core Modules &amp; Industry Alignment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {proposal.syllabusModules.map((mod) => (
                  <div
                    key={mod.moduleNumber}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">
                        Module {mod.moduleNumber}: {mod.title}
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">{mod.hours} Hrs</span>
                    </div>
                    <ul className="text-slate-400 space-y-1 pl-4 list-disc text-[11px]">
                      {mod.topics.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-slate-800/80 text-[10px] text-cyan-300/90 font-medium">
                      Aligns: {mod.industryAlignment}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign-off & Council Voting Readiness */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 text-[11px]">Board of Studies Readiness:</div>
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Ready for Immediate Council Vote (Semester VI)
                </div>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg border border-slate-700 text-xs font-medium transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Memorandum</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
