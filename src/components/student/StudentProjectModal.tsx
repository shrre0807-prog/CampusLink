import React, { useState } from "react";
import { FolderGit2, Plus, X, CheckCircle2, Globe, Github } from "lucide-react";
import { StudentProject } from "../../types";

interface StudentProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: StudentProject) => void;
}

export const StudentProjectModal: React.FC<StudentProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [techStackInput, setTechStackInput] = useState<string>("TypeScript, Node.js, PostgreSQL");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [liveUrl, setLiveUrl] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const techStack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: StudentProject = {
      id: `proj_${Date.now()}`,
      title,
      description,
      techStack: techStack.length > 0 ? techStack : ["Full-Stack", "JavaScript"],
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-white space-y-5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Add Technical Project</h3>
              <p className="text-[11px] text-slate-400">Showcase code repository and deployment links</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g., High-Throughput Event Streaming Gateway"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Description &amp; Key Features</label>
            <textarea
              rows={3}
              placeholder="Describe problem solved, architecture patterns, throughput, or outcomes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              placeholder="Python, FastAPI, Kafka, Redis, Docker"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">GitHub Repository Link</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Live Demo / Deployment URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-950/40 transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
