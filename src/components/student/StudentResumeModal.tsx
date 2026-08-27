import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { StudentProfile } from "../../types";

interface StudentResumeModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveResume: (resumeData: {
    fileName?: string;
    sizeKb?: number;
    rawText?: string;
  }) => void;
}

export const StudentResumeModal: React.FC<StudentResumeModalProps> = ({
  student,
  isOpen,
  onClose,
  onSaveResume,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>(student.resumeRawText || "");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (student) {
      setResumeText(student.resumeRawText || "");
      setSelectedFile(null);
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);

    // If it's a text file or readable, read text directly
    if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text || "");
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else {
      // For PDF / Docx, extract sample text representation
      setTimeout(() => {
        const extractedText = `${student.name.toUpperCase()} — TECHNICAL RESUME\n` +
          `File: ${file.name} (${Math.round(file.size / 1024)} KB)\n` +
          `Email: ${student.email} | Institution: ${student.institution}\n` +
          `Degree: ${student.degree || "B.Tech Computer Science"} | CGPA: ${student.cgpa || 8.8}/10\n` +
          `Primary Skills: ${student.skills.map((s) => s.name).join(", ")}\n` +
          `Projects: ${student.projects.map((p) => p.title).join(", ") || "Full-stack web application"}`;
        setResumeText(extractedText);
        setIsProcessing(false);
      }, 400);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveResume = () => {
    onSaveResume({
      fileName: undefined,
      sizeKb: undefined,
      rawText: undefined,
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasText = Boolean(resumeText.trim());
    const fileName = selectedFile
      ? selectedFile.name
      : (hasText ? (student.resumeFileName || `${student.name.replace(/\s+/g, "_")}_Resume.txt`) : undefined);
    const sizeKb = selectedFile
      ? Math.round(selectedFile.size / 1024)
      : (hasText ? (student.resumeSizeKb || Math.max(2, Math.round(resumeText.length / 1024))) : undefined);
    
    onSaveResume({
      fileName,
      sizeKb,
      rawText: hasText ? resumeText.trim() : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl text-white space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Upload &amp; Manage Student Resume
              </h3>
              <p className="text-[11px] text-slate-400">
                Candidate: <strong className="text-slate-200">{student.name}</strong> ({student.institution})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Resume Info if available */}
        {student.resumeFileName && !selectedFile && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-semibold text-slate-200">{student.resumeFileName}</div>
                <div className="text-[10px] text-slate-400">
                  {student.resumeSizeKb || 184} KB &bull; Uploaded on {student.resumeUploadDate || "Recent"}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800">
              Active on Profile
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag and drop upload zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-cyan-400 bg-cyan-950/30"
                : selectedFile
                ? "border-emerald-500/60 bg-emerald-950/20"
                : "border-slate-700 hover:border-slate-600 bg-slate-950/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt,.md"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                {selectedFile ? (
                  <FileCheck className="w-6 h-6 text-emerald-400" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>

              {selectedFile ? (
                <div>
                  <p className="text-xs font-bold text-emerald-300">{selectedFile.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {Math.round(selectedFile.size / 1024)} KB &bull; Ready to process
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Drag and drop resume here, or <span className="text-cyan-400 underline">browse files</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports PDF, DOCX, TXT (up to 15MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Resume Text Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Extracted Resume Text &amp; Skill Content</span>
              </label>
              {isProcessing && (
                <span className="text-[11px] text-cyan-400 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Parsing...
                </span>
              )}
            </div>
            <textarea
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste or review raw resume contents here..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed placeholder-slate-600"
            />
            <p className="text-[10px] text-slate-500">
              CampusLink AST engine parses this text to cross-check claims against real GitHub code commits and WASM unit tests.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <div>
              {student.resumeFileName && (
                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/80 text-xs font-semibold transition"
                >
                  Detach / Remove Resume
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/40 transition disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save &amp; Update Resume</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
