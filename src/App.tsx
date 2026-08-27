import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Cpu,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { DashboardOverview } from "./components/DashboardOverview";
import { AdversarialResumeDemo } from "./components/demos/AdversarialResumeDemo";
import { WasmSandboxDemo } from "./components/demos/WasmSandboxDemo";
import { BosCurriculumDemo } from "./components/demos/BosCurriculumDemo";
import { StudentPortal } from "./components/StudentPortal";
import { RecruiterPortal } from "./components/RecruiterPortal";
import { AcademicDeanPortal } from "./components/AcademicDeanPortal";
import { DpiArchitectureView } from "./components/DpiArchitectureView";
import { UserRole, StudentProfile } from "./types";
import {
  getStoredStudents,
  saveStoredStudents,
  getStoredActiveStudentId,
  saveStoredActiveStudentId,
  resetToDefaultStudents,
} from "./lib/studentStorage";

export default function App() {
  // Persisted view role
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem("campuslink_active_role");
      if (saved) return saved as UserRole;
    } catch {
      // fallback
    }
    return "dashboard";
  });
  const [activeDemoTab, setActiveDemoTab] = useState<"resume" | "wasm" | "bos">("resume");

  // Global persistent student cohort state
  const [students, setStudents] = useState<StudentProfile[]>(() => getStoredStudents());
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() =>
    getStoredActiveStudentId()
  );

  // Sync active role to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("campuslink_active_role", activeRole);
    } catch (err) {
      console.error("Failed to save active role:", err);
    }
  }, [activeRole]);

  // Sync students to localStorage whenever updated
  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  // Sync active student ID to localStorage
  useEffect(() => {
    saveStoredActiveStudentId(selectedStudentId);
  }, [selectedStudentId]);

  const handleAddStudent = (newStudent: StudentProfile) => {
    setStudents((prev) => {
      const updated = [newStudent, ...prev.filter((s) => s.id !== newStudent.id)];
      saveStoredStudents(updated);
      return updated;
    });
    setSelectedStudentId(newStudent.id);
    saveStoredActiveStudentId(newStudent.id);
  };

  const handleUpdateStudent = (updatedStudent: StudentProfile) => {
    setStudents((prev) => {
      const updated = prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
      saveStoredStudents(updated);
      return updated;
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => {
      const updated = prev.filter((s) => s.id !== studentId);
      saveStoredStudents(updated);
      if (selectedStudentId === studentId && updated.length > 0) {
        setSelectedStudentId(updated[0].id);
        saveStoredActiveStudentId(updated[0].id);
      }
      return updated;
    });
  };

  const handleResetStudents = () => {
    const defaults = resetToDefaultStudents();
    setStudents(defaults);
    if (defaults[0]) {
      setSelectedStudentId(defaults[0].id);
      saveStoredActiveStudentId(defaults[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Main Navigation */}
        <Navbar
          activeRole={activeRole}
          onSelectRole={(role) => setActiveRole(role)}
          onOpenDemo={(demoId) => {
            setActiveRole("sandbox");
            if (demoId === "wasm") setActiveDemoTab("wasm");
            else if (demoId === "bos") setActiveDemoTab("bos");
            else setActiveDemoTab("resume");
          }}
        />

        {/* Global Live Operational Ticker Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono">
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <strong>99.4%</strong> Screening Speedup (12.5m &rarr; 0.42s)
              </span>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="text-emerald-300 hidden md:inline">
                <strong>77.1%</strong> Reduction in Interview Rejections
              </span>
              <span className="text-slate-600 hidden md:inline">&bull;</span>
              <span className="text-amber-300">
                <strong>2.8s</strong> BoS Syllabus Patch Generation
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-emerald-400">
                Live Prototype BOM: ₹2,050
              </span>
              <button
                onClick={() => setActiveRole("dpi")}
                className={`hover:text-cyan-300 underline ${activeRole === "dpi" ? "text-cyan-300 font-bold" : ""}`}
              >
                DPI Architecture &amp; Specs
              </button>
            </div>
          </div>
        </div>

        {/* Main Body View Controller */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* VIEW 1: ENTERPRISE DASHBOARD OVERVIEW */}
          {activeRole === "dashboard" && (
            <DashboardOverview
              onNavigate={(role) => setActiveRole(role)}
              onOpenTool={(toolId) => {
                setActiveRole("sandbox");
                setActiveDemoTab(toolId);
              }}
            />
          )}

          {/* VIEW 2: RECRUITER VCI DISCOVERY GRID */}
          {activeRole === "recruiter" && (
            <RecruiterPortal
              candidates={students}
              onDeleteCandidate={handleDeleteStudent}
            />
          )}

          {/* VIEW 3: STUDENT COCKPIT */}
          {activeRole === "student" && (
            <StudentPortal
              students={students}
              selectedStudentId={selectedStudentId}
              onSelectStudent={(id) => setSelectedStudentId(id)}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              onResetStudents={handleResetStudents}
              onLaunchSandbox={() => {
                setActiveRole("sandbox");
                setActiveDemoTab("wasm");
              }}
            />
          )}

          {/* VIEW 4: ACADEMIC DEAN & TPO BOS STUDIO */}
          {activeRole === "academic" && (
            <AcademicDeanPortal
              onOpenBosDemo={() => {
                setActiveRole("sandbox");
                setActiveDemoTab("bos");
              }}
            />
          )}

          {/* VIEW 5: INTERACTIVE TOOLS & INTEGRITY SANDBOX */}
          {(activeRole === "sandbox" || activeRole === "demos") && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    Interactive Proof-of-Work Diagnostic Suite
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live client-side WASM execution, AST code parsers, and syllabus synthesis engine
                  </p>
                </div>

                {/* Sub-Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                  <button
                    id="tab-tool-resume"
                    onClick={() => setActiveDemoTab("resume")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeDemoTab === "resume"
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>White-Font Resume Trap</span>
                  </button>

                  <button
                    id="tab-tool-wasm"
                    onClick={() => setActiveDemoTab("wasm")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeDemoTab === "wasm"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>WASM Code Runner</span>
                  </button>

                  <button
                    id="tab-tool-bos"
                    onClick={() => setActiveDemoTab("bos")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeDemoTab === "bos"
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>BoS Patch Engine</span>
                  </button>
                </div>
              </div>

              {/* Active Tool View */}
              {activeDemoTab === "resume" && <AdversarialResumeDemo />}
              {activeDemoTab === "wasm" && <WasmSandboxDemo />}
              {activeDemoTab === "bos" && <BosCurriculumDemo />}
            </div>
          )}

          {/* VIEW 6: DPI ARCHITECTURE & SYSTEM BLUEPRINT */}
          {activeRole === "dpi" && <DpiArchitectureView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-900/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-slate-200">CampusLink Platform</span>
            <span>&bull;</span>
            <span className="text-cyan-400">Zero-Trust Skill Mapping Engine</span>
            <span>&bull;</span>
            <span>NCrF &amp; AICTE Integrated</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>DPDP Act 2023 Shield</span>
            <span>&bull;</span>
            <span>WASM Client-Edge Execution</span>
            <span>&bull;</span>
            <span>pgvector SBERT Embeddings</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
