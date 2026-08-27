import React, { useState, useEffect } from "react";
import {
  Edit3,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Award,
  ShieldCheck,
  Globe,
  Linkedin,
  Github,
  Code2,
  X,
  CheckCircle2,
} from "lucide-react";
import { StudentProfile } from "../../types";

interface StudentEditModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveStudent: (updatedStudent: StudentProfile) => void;
}

export const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  isOpen,
  onClose,
  onSaveStudent,
}) => {
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone || "",
    institution: student.institution,
    department: student.department,
    degree: student.degree || "B.Tech in Computer Science & Engineering",
    cgpa: student.cgpa ? String(student.cgpa) : "8.8",
    graduationYear: String(student.graduationYear),
    apaarId: student.apaarId,
    digiLockerVerified: student.digiLockerVerified,
    abcCredits: String(student.abcCredits),
    githubUsername: student.githubUsername,
    linkedinUrl: student.linkedinUrl || "",
    portfolioUrl: student.portfolioUrl || "",
    leetcodeUsername: student.leetcodeUsername || "",
    bio: student.bio || "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        institution: student.institution,
        department: student.department,
        degree: student.degree || "B.Tech in Computer Science & Engineering",
        cgpa: student.cgpa ? String(student.cgpa) : "8.8",
        graduationYear: String(student.graduationYear),
        apaarId: student.apaarId,
        digiLockerVerified: student.digiLockerVerified,
        abcCredits: String(student.abcCredits),
        githubUsername: student.githubUsername,
        linkedinUrl: student.linkedinUrl || "",
        portfolioUrl: student.portfolioUrl || "",
        leetcodeUsername: student.leetcodeUsername || "",
        bio: student.bio || "",
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...student,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      department: formData.department,
      degree: formData.degree,
      cgpa: parseFloat(formData.cgpa) || student.cgpa || 8.5,
      graduationYear: parseInt(formData.graduationYear, 10) || student.graduationYear,
      apaarId: formData.apaarId,
      digiLockerVerified: formData.digiLockerVerified,
      abcCredits: parseInt(formData.abcCredits, 10) || student.abcCredits,
      githubUsername: formData.githubUsername,
      linkedinUrl: formData.linkedinUrl,
      portfolioUrl: formData.portfolioUrl,
      leetcodeUsername: formData.leetcodeUsername,
      bio: formData.bio,
    };

    onSaveStudent(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl text-white space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Edit Student Profile &amp; Academic Records
              </h3>
              <p className="text-[11px] text-slate-400">
                Update personal, university, identity (APAAR), and online handles
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Section 1: Basic Personal Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-cyan-400">
              <User className="w-3.5 h-3.5" /> Personal Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Academic & Institutional Details */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-indigo-400">
              <GraduationCap className="w-3.5 h-3.5" /> University &amp; Academic Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">University / Institute</label>
                <input
                  type="text"
                  required
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Department / Branch</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Degree Program</label>
                <input
                  type="text"
                  name="degree"
                  placeholder="e.g. B.Tech Computer Science"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Cumulative GPA / Score (out of 10)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ABC Academic Credits</label>
                <input
                  type="number"
                  name="abcCredits"
                  value={formData.abcCredits}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: National Identity & Verification */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Identity &amp; Government Verification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">APAAR (One Nation One Student ID)</label>
                <input
                  type="text"
                  name="apaarId"
                  placeholder="9928-1123-4451"
                  value={formData.apaarId}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="digiLockerVerified"
                  name="digiLockerVerified"
                  checked={formData.digiLockerVerified}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, digiLockerVerified: e.target.checked }))
                  }
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="digiLockerVerified" className="text-slate-300 font-medium cursor-pointer">
                  DigiLocker KYC &amp; Aadhaar Verified
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Online Profiles & Portfolios */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-amber-400">
              <Globe className="w-3.5 h-3.5" /> Technical Profiles &amp; Handles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">GitHub Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500 font-mono">@</span>
                  <input
                    type="text"
                    name="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">LeetCode / Codeforces</label>
                <input
                  type="text"
                  name="leetcodeUsername"
                  placeholder="username"
                  value={formData.leetcodeUsername}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Personal Portfolio / Website</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  placeholder="https://..."
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Bio */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <label className="block text-slate-400">Professional Bio &amp; Focus Area</label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Summary of background, technical domain, and career objectives..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer actions */}
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-950/40 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
