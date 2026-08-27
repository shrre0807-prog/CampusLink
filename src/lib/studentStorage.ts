import { StudentProfile } from "../types";
import { SAMPLE_STUDENTS } from "../data/mockData";
import { evaluateCandidateIntegrity } from "./integrityEngine";

const STORAGE_KEY = "campuslink_students_v2";
const ACTIVE_STUDENT_KEY = "campuslink_active_student_id_v2";

/**
 * Retrieves all student profiles from persistent browser storage,
 * falling back to default sample students if not yet saved.
 */
export function getStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to load students from localStorage:", err);
  }
  return SAMPLE_STUDENTS;
}

/**
 * Persists the students array to browser storage.
 */
export function saveStoredStudents(students: StudentProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error("Failed to save students to localStorage:", err);
  }
}

/**
 * Retrieves the currently selected student ID from browser storage.
 */
export function getStoredActiveStudentId(defaultId?: string): string {
  try {
    const saved = localStorage.getItem(ACTIVE_STUDENT_KEY);
    if (saved) return saved;
  } catch (err) {
    console.error("Failed to get active student ID:", err);
  }
  return defaultId || SAMPLE_STUDENTS[0]?.id || "STU_2026_001";
}

/**
 * Persists the selected student ID.
 */
export function saveStoredActiveStudentId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_STUDENT_KEY, id);
  } catch (err) {
    console.error("Failed to save active student ID:", err);
  }
}

/**
 * Resets storage back to default sample dataset.
 */
export function resetToDefaultStudents(): StudentProfile[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_STUDENT_KEY);
  } catch (err) {
    console.error("Failed to reset students storage:", err);
  }
  return SAMPLE_STUDENTS;
}

/**
 * Helper to construct a complete, validated StudentProfile with realistic telemetry.
 */
export function createNewStudentProfile(data: {
  name: string;
  email?: string;
  phone?: string;
  institution?: string;
  department?: string;
  degree?: string;
  cgpa?: number | string;
  graduationYear?: number | string;
  githubUsername?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  leetcodeUsername?: string;
  apaarId?: string;
  abcCredits?: number | string;
  bio?: string;
  resumeFileName?: string;
  resumeSizeKb?: number;
  resumeRawText?: string;
}): StudentProfile {
  const timestamp = Date.now();
  const cleanName = data.name.trim();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const studentId = `STU_2026_${randomSuffix}`;

  const cleanGithub = (
    data.githubUsername ||
    cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-")
  ).trim();

  const institutionName = data.institution?.trim() || "National Institute of Technology (NIT)";
  const departmentName = data.department?.trim() || "Computer Science & Engineering";
  const degreeName = data.degree?.trim() || "B.Tech in Computer Science & Engineering";
  const numCgpa = typeof data.cgpa === "number" ? data.cgpa : parseFloat(String(data.cgpa || "8.8")) || 8.8;
  const numGradYear = typeof data.graduationYear === "number" ? data.graduationYear : parseInt(String(data.graduationYear || "2026"), 10) || 2026;
  const numAbcCredits = typeof data.abcCredits === "number" ? data.abcCredits : parseInt(String(data.abcCredits || "142"), 10) || 142;

  const generatedApaar =
    data.apaarId?.trim() ||
    `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const resumeName = data.resumeFileName || `${cleanName.replace(/\s+/g, "_")}_Resume_2026.pdf`;
  const resumeSize = data.resumeSizeKb || 185;
  const rawText =
    data.resumeRawText ||
    `${cleanName.toUpperCase()}\n` +
    `Email: ${data.email || `${cleanGithub}@${institutionName.toLowerCase().replace(/[^a-z]/g, "")}.edu`} | Phone: ${data.phone || "+91 98400 12345"}\n` +
    `GitHub: github.com/${cleanGithub} | LinkedIn: ${data.linkedinUrl || `linkedin.com/in/${cleanGithub}`}\n\n` +
    `EDUCATION\n` +
    `${institutionName} — ${degreeName} (Class of ${numGradYear}) | CGPA: ${numCgpa}/10\n\n` +
    `CORE COMPETENCIES & TECHNICAL SKILLS\n` +
    `Languages & Runtimes: TypeScript, Python, Go, C++, SQL\n` +
    `Frameworks & Systems: React, Node.js, FastAPI, Docker, PostgreSQL, Redis\n` +
    `Tools: Git, Linux, WebAssembly, CI/CD Actions\n\n` +
    `PROJECTS & EXPERIENCE\n` +
    `1. High-Performance Full-Stack Service: Implemented modular architecture with Redis caching and PostgreSQL.\n` +
    `2. Microservices Dispatch Engine: Designed asynchronous message processing with automated unit testing.\n`;

  // Calculate high confidence scores based on inputs
  const vciScore = Math.min(96, Math.max(78, Math.round(75 + numCgpa * 2 + (numAbcCredits > 130 ? 5 : 0))));

  return {
    id: studentId,
    name: cleanName,
    email: data.email?.trim() || `${cleanGithub}@${institutionName.toLowerCase().replace(/[^a-z]/g, "")}.edu`,
    phone: data.phone?.trim() || "+91 98400 12345",
    institution: institutionName,
    department: departmentName,
    degree: degreeName,
    cgpa: numCgpa,
    graduationYear: numGradYear,
    apaarId: generatedApaar,
    digiLockerVerified: true,
    abcCredits: numAbcCredits,
    vciScore,
    githubUsername: cleanGithub,
    githubScore: Math.round(vciScore * 0.94),
    linkedinUrl: data.linkedinUrl?.trim() || `https://linkedin.com/in/${cleanGithub}`,
    portfolioUrl: data.portfolioUrl?.trim() || `https://${cleanGithub}.dev`,
    leetcodeUsername: data.leetcodeUsername?.trim() || `${cleanGithub}_algo`,
    bio:
      data.bio?.trim() ||
      `Ambitious ${departmentName} candidate focused on scalable software architectures, verified AST codebases, and distributed systems.`,
    resumeFileName: resumeName,
    resumeUploadDate: new Date().toISOString().split("T")[0],
    resumeSizeKb: resumeSize,
    resumeRawText: rawText,
    projects: [
      {
        id: `proj_${timestamp}_1`,
        title: "Enterprise Full-Stack Cloud Application",
        description: "High-concurrency web service built with strict AST modularity, automated test suites, and Docker containers.",
        techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
        githubUrl: `https://github.com/${cleanGithub}/enterprise-platform`,
        liveUrl: `https://${cleanGithub}-app.dev`,
      },
      {
        id: `proj_${timestamp}_2`,
        title: "Real-Time Telemetry & Asynchronous Queue Processor",
        description: "Event-driven message pipeline implementing exponential backoff retries and idempotent task execution.",
        techStack: ["Python", "FastAPI", "Redis", "Docker"],
        githubUrl: `https://github.com/${cleanGithub}/event-stream-processor`,
      },
    ],
    sandboxCompletionRate: 94,
    skills: [
      {
        name: "React, TypeScript & Modern UI",
        category: "Frontend",
        claimedConfidence: 94,
        verifiedConfidence: 90,
        source: "GitHub AST",
        astCommitCount: 310,
        cyclomaticComplexityAvg: 2.5,
        testCoverageRatio: 0.86,
      },
      {
        name: "Node.js & Asynchronous Backend",
        category: "Backend",
        claimedConfidence: 91,
        verifiedConfidence: 88,
        source: "GitHub AST",
        astCommitCount: 220,
        cyclomaticComplexityAvg: 3.1,
        testCoverageRatio: 0.82,
      },
      {
        name: "PostgreSQL & Database Optimization",
        category: "Data/AI",
        claimedConfidence: 87,
        verifiedConfidence: 85,
        source: "WASM Sandbox",
        astCommitCount: 140,
        cyclomaticComplexityAvg: 2.2,
        testCoverageRatio: 0.8,
      },
      {
        name: "Docker, Linux & Cloud Infrastructure",
        category: "Cloud/DevOps",
        claimedConfidence: 83,
        verifiedConfidence: 80,
        source: "GitHub AST",
        astCommitCount: 85,
        cyclomaticComplexityAvg: 1.8,
        testCoverageRatio: 0.76,
      },
    ],
    remediationRoadmap: [
      {
        id: `REM_${timestamp}_1`,
        title: "Token Bucket Rate Limiting & Concurrency Synchronization",
        skillTarget: "API Reliability & Race Conditions",
        sourceDeficit: "CampusLink AST Verification: Advanced concurrency control",
        estimatedMinutes: 25,
        difficulty: "Intermediate",
        completed: false,
        ncrfMicroCredits: 0.5,
      },
    ],
    recentApplications: [
      {
        jobId: "JOB_9011",
        company: "Razorpay",
        role: "Software Development Engineer - Intern",
        appliedDate: new Date().toISOString().split("T")[0],
        status: "Verified_Shortlist",
        vciMatchScore: vciScore,
      },
      {
        jobId: "JOB_9012",
        company: "Swiggy",
        role: "Backend Engineer (Campus 2026)",
        appliedDate: new Date().toISOString().split("T")[0],
        status: "Interview Scheduled",
        vciMatchScore: Math.round(vciScore * 0.96),
      },
    ],
    astStats: {
      totalCommits: 680,
      reposAnalyzed: 12,
      linesOfCode: 28900,
      entropyScore: 0.88,
      topLanguages: [
        { language: "TypeScript", percentage: 52 },
        { language: "Python", percentage: 30 },
        { language: "SQL", percentage: 18 },
      ],
    },
  };
}
