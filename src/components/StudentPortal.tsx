import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  GitCommit,
  GitBranch,
  Terminal,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  BookOpen,
  Zap,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Users,
  Search,
  PlusCircle,
  FileText,
  UploadCloud,
  Edit3,
  Globe,
  Linkedin,
  FolderGit2,
  GraduationCap,
  Mail,
  Phone,
  Building,
  Check,
  Code2,
  Eye,
  FileCheck,
  UserCheck,
  Plus,
} from "lucide-react";
import { SAMPLE_STUDENTS } from "../data/mockData";
import { StudentProfile, RemediationTask, StudentProject } from "../types";
import { generateStudentVciCertificate } from "../lib/pdfGenerator";
import { StudentResumeModal } from "./student/StudentResumeModal";
import { StudentEditModal } from "./student/StudentEditModal";
import { StudentAddModal } from "./student/StudentAddModal";
import { StudentProjectModal } from "./student/StudentProjectModal";

interface StudentPortalProps {
  onLaunchSandbox?: () => void;
  students?: StudentProfile[];
  selectedStudentId?: string;
  onSelectStudent?: (id: string) => void;
  onAddStudent?: (newStudent: StudentProfile) => void;
  onUpdateStudent?: (updatedStudent: StudentProfile) => void;
  onResetStudents?: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  onLaunchSandbox,
  students: propStudents,
  selectedStudentId: propSelectedId,
  onSelectStudent,
  onAddStudent,
  onUpdateStudent,
  onResetStudents,
}) => {
  const [internalStudents, setInternalStudents] = useState<StudentProfile[]>(SAMPLE_STUDENTS);
  const [internalSelectedId, setInternalSelectedId] = useState<string>(SAMPLE_STUDENTS[0].id);

  const customStudents = propStudents && propStudents.length > 0 ? propStudents : internalStudents;
  const currentSelectedId = propSelectedId || internalSelectedId;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "resume" | "projects" | "remediation">("overview");

  // Modals
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const student =
    customStudents.find((s) => s.id === currentSelectedId) ||
    customStudents[0] ||
    SAMPLE_STUDENTS[0];

  const setSelectedStudentId = (id: string) => {
    if (onSelectStudent) {
      onSelectStudent(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleDownloadTranscript = () => {
    const doc = generateStudentVciCertificate(student);
    doc.save(`CampusLink_VCI_Transcript_${student.name.replace(/\s+/g, "_")}.pdf`);
    triggerNotification(`Exported official VCI transcript for ${student.name}`);
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    const updated = {
      ...student,
      remediationRoadmap: student.remediationRoadmap.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    };
    if (onUpdateStudent) {
      onUpdateStudent(updated);
    } else {
      setInternalStudents((prev) => prev.map((s) => (s.id === student.id ? updated : s)));
    }
  };

  const handleSaveResume = (resumeData: {
    fileName: string;
    sizeKb: number;
    rawText: string;
  }) => {
    const updated: StudentProfile = {
      ...student,
      resumeFileName: resumeData.fileName,
      resumeSizeKb: resumeData.sizeKb,
      resumeUploadDate: new Date().toISOString().split("T")[0],
      resumeRawText: resumeData.rawText,
    };
    if (onUpdateStudent) {
      onUpdateStudent(updated);
    } else {
      setInternalStudents((prev) => prev.map((s) => (s.id === student.id ? updated : s)));
    }
    triggerNotification(`Resume updated for ${student.name}: ${resumeData.fileName}`);
  };

  const handleSaveStudentDetails = (updatedStudent: StudentProfile) => {
    if (onUpdateStudent) {
      onUpdateStudent(updatedStudent);
    } else {
      setInternalStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    }
    triggerNotification(`Student profile updated for ${updatedStudent.name}`);
  };

  const handleAddNewStudent = (newStudent: StudentProfile) => {
    if (onAddStudent) {
      onAddStudent(newStudent);
    } else {
      setInternalStudents((prev) => [newStudent, ...prev]);
      setInternalSelectedId(newStudent.id);
    }
    setSelectedStudentId(newStudent.id);
    triggerNotification(`Successfully registered and activated profile for ${newStudent.name}`);
  };

  const handleAddProject = (project: StudentProject) => {
    const updated: StudentProfile = {
      ...student,
      projects: [...(student.projects || []), project],
    };
    if (onUpdateStudent) {
      onUpdateStudent(updated);
    } else {
      setInternalStudents((prev) => prev.map((s) => (s.id === student.id ? updated : s)));
    }
    triggerNotification(`Added project "${project.title}" to ${student.name}'s portfolio`);
  };

  const filteredStudents = customStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.githubUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="student-portal-container" className="space-y-6">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950 text-cyan-200 border border-cyan-700/80 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Top Student Switcher Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Select Active Student Profile
              </h2>
              <p className="text-[11px] text-slate-400">
                Switch between university candidates to view live resumes, academic credentials, and AST proof-of-work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate / university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-60 font-sans"
              />
            </div>

            {/* Add New Student & Resume Button */}
            <button
              id="btn-add-new-student"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Student &amp; Resume</span>
            </button>

            {onResetStudents && (
              <button
                onClick={onResetStudents}
                title="Restore default sample student profiles"
                className="text-[11px] text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-xl transition shrink-0"
              >
                Reset Demo Data
              </button>
            )}
          </div>
        </div>

        {/* Student Selector Chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
          {/* Quick Add Pill */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-dashed border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 shrink-0 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Register New Student</span>
          </button>

          {filteredStudents.map((s) => {
            const isSelected = s.id === student.id;
            const isAdversarial = s.vciScore < 30;

            return (
              <button
                key={s.id}
                onClick={() => setSelectedStudentId(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium border shrink-0 transition-all ${
                  isSelected
                    ? "bg-indigo-950/90 text-indigo-200 border-indigo-500 shadow-md ring-1 ring-indigo-500/50"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isAdversarial
                      ? "bg-red-950 text-red-400 border border-red-800"
                      : "bg-indigo-900 text-indigo-300 border border-indigo-700"
                  }`}
                >
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>

                <div className="text-left">
                  <div className="font-semibold text-xs flex items-center gap-1">
                    <span>{s.name}</span>
                    {s.resumeFileName && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Resume Attached" />
                    )}
                    {isAdversarial && (
                      <span className="px-1 py-0.2 bg-red-950 text-red-400 text-[9px] rounded font-mono border border-red-800">
                        Audit Case
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    VCI: <strong className={isAdversarial ? "text-red-400" : "text-cyan-300"}>{s.vciScore}%</strong> &bull; {s.institution.split(",")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Student Profile Hero Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Student Info & Identity */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-950/50 shrink-0">
              {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-100">{student.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-700/60">
                  <ShieldCheck className="w-3.5 h-3.5" /> DigiLocker KYC Verified
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                  APAAR: {student.apaarId}
                </span>
              </div>

              <p className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                <span>{student.degree || "B.Tech in Computer Science"}</span>
                <span>&bull;</span>
                <strong className="text-slate-200">{student.institution}</strong>
                <span>(Class of {student.graduationYear})</span>
                {student.cgpa && (
                  <>
                    <span>&bull;</span>
                    <span className="text-cyan-300 font-semibold font-mono">CGPA: {student.cgpa}/10</span>
                  </>
                )}
              </p>

              {/* Bio snippet */}
              {student.bio && (
                <p className="text-xs text-slate-400 max-w-2xl pt-1 leading-relaxed">
                  {student.bio}
                </p>
              )}

              {/* Contact & Profile links */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                {student.email && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {student.email}
                  </span>
                )}
                {student.phone && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {student.phone}
                  </span>
                )}
                <span className="flex items-center gap-1 font-mono text-indigo-300">
                  <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                  @{student.githubUsername}
                </span>
                {student.linkedinUrl && (
                  <a
                    href={student.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {student.portfolioUrl && (
                  <a
                    href={student.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Hub & VCI Score */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* VCI Score Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-center min-w-[130px]">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">VCI Score</div>
              <div className={`text-2xl font-extrabold mt-0.5 ${student.vciScore < 30 ? "text-red-400" : "text-cyan-400"}`}>
                {student.vciScore}%
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">Proof-of-Work</div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  id="btn-upload-replace-resume"
                  onClick={() => setShowResumeModal(true)}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold px-3 py-2 rounded-xl transition shadow"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{student.resumeFileName ? "Replace Resume" : "Upload Resume"}</span>
                </button>

                <button
                  id="btn-edit-student-profile"
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-indigo-500/50 text-xs font-semibold px-3 py-2 rounded-xl transition shadow"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edit Details</span>
                </button>
              </div>

              <button
                id="btn-download-vci-cert"
                onClick={handleDownloadTranscript}
                className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg shadow-cyan-950/40 transition hover:scale-[1.02]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export VCI Transcript (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resume Status Banner */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 flex items-center gap-2">
                <span>{student.resumeFileName || "No Resume File Attached"}</span>
                {student.resumeFileName && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-mono">
                    AST Indexed
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {student.resumeFileName
                  ? `${student.resumeSizeKb || 184} KB &bull; Uploaded on ${student.resumeUploadDate || "2026-08-20"} &bull; Synced with Tree-sitter Code Parser`
                  : "Upload a PDF or DOCX resume to auto-verify claimed skills against GitHub AST commits."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("resume")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View Resume Text &amp; Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "overview"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <GitCommit className="w-3.5 h-3.5" />
          <span>Verified AST Skills Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "resume"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume &amp; Credential Hub</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "projects"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects &amp; Portfolio ({student.projects?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("remediation")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "remediation"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Remediation &amp; Applications ({student.recentApplications?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & AST SKILLS MATRIX */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 6 Columns: AST Skill Vectors */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-base font-bold text-slate-200">
                    Verified AST Skill Vectors vs Claimed
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Tree-sitter Traversal
                </span>
              </div>

              {/* Skill Breakdown */}
              <div className="space-y-4">
                {student.skills.map((skill) => {
                  const isUnderverified = skill.claimedConfidence - skill.verifiedConfidence > 20;
                  return (
                    <div
                      key={skill.name}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-200">{skill.name}</span>
                          <span className="ml-2 text-[10px] text-slate-500">({skill.category})</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-slate-500 text-[11px]">Claimed: {skill.claimedConfidence}%</span>
                          <span className="text-slate-600">|</span>
                          <span
                            className={`font-bold ${
                              isUnderverified ? "text-amber-400" : "text-cyan-400"
                            }`}
                          >
                            VCI: {skill.verifiedConfidence}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full ${
                            isUnderverified ? "bg-amber-500" : "bg-cyan-500"
                          }`}
                          style={{ width: `${skill.verifiedConfidence}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>
                          Source: <strong className="text-slate-300">{skill.source}</strong> ({skill.astCommitCount} commits)
                        </span>
                        <span>
                          Test Ratio: <strong className="text-emerald-400">{Math.round(skill.testCoverageRatio * 100)}%</strong>
                        </span>
                      </div>

                      {isUnderverified && (
                        <div className="text-[10px] text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-800/40 flex items-center justify-between">
                          <span>Low execution proof &bull; Interview feedback penalty applied</span>
                          {onLaunchSandbox && (
                            <button
                              onClick={onLaunchSandbox}
                              className="font-bold underline hover:text-white"
                            >
                              Take 60s Micro-Sandbox &rarr;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
              <span>AST Code Complexity Avg: <strong>3.4 (Modular)</strong></span>
              <span>Total Parsed Code: <strong>{student.astStats.linesOfCode.toLocaleString()} LOC</strong></span>
            </div>
          </div>

          {/* Right 6 Columns: Summary Metrics & Academic Bank of Credits */}
          <div className="lg:col-span-6 space-y-6">
            {/* AST Code Intelligence Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-200">
                    AST Code Telemetry &amp; Entropy Analysis
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Tamper-Resistant
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">Total Commits</div>
                  <div className="text-lg font-bold text-slate-100 mt-0.5">
                    {student.astStats.totalCommits.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">Repos Audited</div>
                  <div className="text-lg font-bold text-indigo-400 mt-0.5">
                    {student.astStats.reposAnalyzed}
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">Lines of Code</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">
                    {Math.round(student.astStats.linesOfCode / 1000)}k
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">Commit Entropy</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    {student.astStats.entropyScore}
                  </div>
                </div>
              </div>

              {/* Language Distribution */}
              <div className="space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Language Breakdown:</div>
                <div className="space-y-1.5">
                  {student.astStats.topLanguages.map((lang) => (
                    <div key={lang.language} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{lang.language}</span>
                      <div className="flex items-center gap-2 w-48">
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${lang.percentage}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-300 w-8 text-right">
                          {lang.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Bank of Credits & Government Integration */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-200">
                    Academic Bank of Credits (ABC) &amp; NCrF
                  </h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  Level 5 Aligned
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ABC Account Credits:</span>
                  <strong className="text-emerald-400 font-mono">{student.abcCredits} Earned Credits</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">National APAAR ID:</span>
                  <strong className="text-slate-200 font-mono">{student.apaarId}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">DigiLocker Identity:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Authenticated
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Degree &amp; Score:</span>
                  <span className="text-slate-200">{student.degree || "B.Tech"} &bull; {student.cgpa || 8.8} CGPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RESUME & CREDENTIAL HUB */}
      {activeTab === "resume" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Candidate Resume &amp; Keyword Cross-Verification Hub
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload candidate resume files, extract technical claims, and compare against AST commit telemetry.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow transition"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload / Replace Resume</span>
                </button>
              </div>
            </div>

            {/* Resume Metadata Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Attached Resume File</div>
                <div className="text-sm font-bold text-slate-100 mt-1 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{student.resumeFileName || "Not yet uploaded"}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Size: {student.resumeSizeKb || 184} KB &bull; Synced {student.resumeUploadDate || "2026-08-20"}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">AST Verification Match</div>
                <div className="text-sm font-bold text-cyan-400 mt-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{student.vciScore}% Verified Integrity</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {student.skills.length} Technical skill vectors cross-matched
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Anti-Inflation Filter</div>
                <div className={`text-sm font-bold mt-1 flex items-center gap-2 ${student.vciScore < 30 ? "text-red-400" : "text-emerald-400"}`}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{student.vciScore < 30 ? "Inflation Flagged" : "Zero Keyword Stuffing"}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  400ms Abstract Syntax Tree Audit
                </div>
              </div>
            </div>

            {/* Extracted Resume Content Viewer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Parsed Resume Content &amp; Telemetry
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  UTF-8 Text Stream
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                {student.resumeRawText || (
                  <span className="text-slate-500 italic">
                    No raw resume text provided yet. Click "Upload / Replace Resume" to attach a resume document or paste content.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS & PORTFOLIO */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-emerald-400" />
                  Technical Projects &amp; Open Source Repositories
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified code repositories with commit telemetry, live deployment links, and architectural notes.
                </p>
              </div>

              <button
                onClick={() => setShowProjectModal(true)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects List */}
            {(!student.projects || student.projects.length === 0) ? (
              <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No projects added to this student profile yet</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Add projects with GitHub links and live demos to demonstrate practical execution depth.
                </p>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                >
                  + Add First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-100 text-sm">{proj.title}</h3>
                        <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono shrink-0">
                          Verified
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-800 text-xs">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-300 hover:text-white font-medium"
                        >
                          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                          <span>GitHub Repo</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3 text-cyan-600" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: REMEDIATION & RECENT APPLICATIONS */}
      {activeTab === "remediation" && (
        <div className="space-y-6">
          {/* Closed-Loop Remediation Roadmap */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-slate-200">
                  Closed-Loop Remediation Roadmap
                </h2>
              </div>
              <span className="text-[11px] text-amber-300 font-mono">
                Fed by Recruiter Telemetry
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Unlike static course links, these targeted micro-tasks are generated directly from <strong>actual interview rejection failure logs</strong> to fix precise execution deficits.
            </p>

            <div className="space-y-3">
              {student.remediationRoadmap.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  No pending remediation tasks. AST execution metrics are within target benchmark!
                </div>
              ) : (
                student.remediationRoadmap.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border text-xs transition-all ${
                      task.completed
                        ? "bg-slate-950/60 border-slate-800/60 opacity-60"
                        : "bg-slate-950 border-slate-700 shadow-md hover:border-cyan-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTaskCompletion(task.id)}
                          className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                        <div>
                          <h3 className={`font-bold ${task.completed ? "line-through text-slate-400" : "text-slate-100"}`}>
                            {task.title}
                          </h3>
                          <span className="text-[10px] text-cyan-300 font-mono">
                            Target: {task.skillTarget} &bull; {task.estimatedMinutes} Mins
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 shrink-0">
                        +{task.ncrfMicroCredits} NCrF Credit
                      </span>
                    </div>

                    {task.recruiterFeedbackSource && (
                      <div className="mt-2 text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-800/40">
                        <strong>Recruiter Origin:</strong> {task.recruiterFeedbackSource}
                      </div>
                    )}

                    {!task.completed && onLaunchSandbox && (
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-[10px] text-slate-400">Execution Mode: WASM Sandbox</span>
                        <button
                          onClick={onLaunchSandbox}
                          className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
                        >
                          <span>Launch Sandbox Challenge</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Status & Recruiter Telemetry History */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-slate-200">
                Recent Applications &amp; Transparent Recruiter Diagnostic Logs
              </h2>
              <span className="text-xs text-slate-400">Zero Black-Box Rejections</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {student.recentApplications.map((app) => (
                <div
                  key={app.jobId + app.company}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">{app.company}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        app.status === "Offered"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : app.status.includes("Rejected")
                          ? "bg-red-950 text-red-300 border border-red-800"
                          : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                      }`}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-slate-300">{app.role}</p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Applied: {app.appliedDate} &bull; VCI Match: <strong className="text-cyan-300">{app.vciMatchScore}%</strong>
                  </div>

                  {app.recruiterFeedback && (
                    <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-300">
                      <div className="text-red-400 font-medium">
                        Deficit: {app.recruiterFeedback.primaryFailureReason}
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        Tooling: {app.recruiterFeedback.toolingDeficit}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Resume Upload & Management Modal */}
      <StudentResumeModal
        student={student}
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onSaveResume={handleSaveResume}
      />

      {/* 2. Edit Student Details Modal */}
      <StudentEditModal
        student={student}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSaveStudent={handleSaveStudentDetails}
      />

      {/* 3. Add New Student Modal */}
      <StudentAddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddStudent={handleAddNewStudent}
      />

      {/* 4. Add Project Modal */}
      <StudentProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};
