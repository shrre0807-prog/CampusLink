import { StudentProfile } from "../types";
import { SAMPLE_STUDENTS } from "../data/mockData";
import { evaluateCandidateIntegrity } from "./integrityEngine";

const STORAGE_KEY = "campuslink_students_v3";
const ACTIVE_STUDENT_KEY = "campuslink_active_student_id_v3";

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

  const cleanGithub = (data.githubUsername || "").trim();
  const userEmail = (data.email || "").trim();
  const userPhone = (data.phone || "").trim();
  const institutionName = data.institution?.trim() || "National Institute of Technology (NIT)";
  const departmentName = data.department?.trim() || "Computer Science & Engineering";
  const degreeName = data.degree?.trim() || "B.Tech in Computer Science & Engineering";
  const numCgpa = typeof data.cgpa === "number" ? data.cgpa : parseFloat(String(data.cgpa || "0")) || 0;
  const numGradYear = typeof data.graduationYear === "number" ? data.graduationYear : parseInt(String(data.graduationYear || "2026"), 10) || 2026;
  const numAbcCredits = typeof data.abcCredits === "number" ? data.abcCredits : parseInt(String(data.abcCredits || "142"), 10) || 142;

  const generatedApaar = data.apaarId?.trim() || "";

  // Only assign resume attributes if the user actually uploaded a resume or pasted text
  const resumeName = data.resumeFileName?.trim() || undefined;
  const resumeSize = resumeName ? (data.resumeSizeKb || 185) : undefined;
  const rawText = data.resumeRawText?.trim() || undefined;

  // Run Zero-Trust Integrity Engine on all inputs (AST Code verification, contact validation, sovereign ID, prompt injections)
  const integrityAudit = evaluateCandidateIntegrity({
    name: cleanName,
    email: userEmail,
    phone: userPhone,
    institution: institutionName,
    githubUsername: cleanGithub,
    cgpa: numCgpa,
    apaarId: generatedApaar,
    resumeRawText: rawText,
    isAdversarialMode: (data as any).isAdversarialMode || false,
  });

  const vciScore = integrityAudit.vciScore;
  const isFlagged = integrityAudit.isFlagged;
  const digiLockerVerified = !isFlagged && integrityAudit.isApaarValid;

  return {
    id: studentId,
    name: cleanName,
    email: userEmail || `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "")}@unverified.edu`,
    phone: userPhone || "Unverified Phone",
    institution: institutionName,
    department: departmentName,
    degree: degreeName,
    cgpa: numCgpa,
    graduationYear: numGradYear,
    apaarId: generatedApaar || "Unverified ID",
    digiLockerVerified,
    abcCredits: numAbcCredits,
    vciScore,
    githubUsername: cleanGithub || "unverified-handle",
    githubScore: isFlagged ? 10 : Math.round(vciScore * 0.94),
    linkedinUrl: data.linkedinUrl?.trim() || undefined,
    portfolioUrl: data.portfolioUrl?.trim() || undefined,
    leetcodeUsername: data.leetcodeUsername?.trim() || undefined,
    bio:
      data.bio?.trim() ||
      (isFlagged
        ? `[ZERO-TRUST DEFICIT] Candidate submission contains unverified details or 0-commit AST telemetry deficit.`
        : `Candidate at ${institutionName} specializing in scalable systems, AST-proven software architectures, and automated testing.`),
    resumeFileName: resumeName,
    resumeUploadDate: resumeName ? new Date().toISOString().split("T")[0] : undefined,
    resumeSizeKb: resumeSize,
    resumeRawText: rawText,
    projects: isFlagged
      ? [
          {
            id: `proj_${timestamp}_1`,
            title: "Claimed Enterprise Microservices (Unverified)",
            description: "No public GitHub repository commits or AST proof found matching claimed architecture.",
            techStack: ["Kubernetes", "Kafka", "Distributed Systems"],
            githubUrl: `https://github.com/${cleanGithub}/unverified-repo`,
          },
        ]
      : [
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
    sandboxCompletionRate: isFlagged ? 15 : 94,
    skills: integrityAudit.skillsBreakdown,
    remediationRoadmap: isFlagged
      ? [
          {
            id: `REM_${timestamp}_1`,
            title: "Mandatory AST Proof: Implement Event Loop & Queue in WASM Sandbox",
            skillTarget: "Execution Verification Required",
            sourceDeficit: "Adversarial Check: Missing verifiable AST code commits for claimed skills",
            estimatedMinutes: 45,
            difficulty: "Advanced",
            completed: false,
            ncrfMicroCredits: 1.0,
          },
          {
            id: `REM_${timestamp}_2`,
            title: "Connect Verified Public GitHub Repository & Pass Unit Test Suite",
            skillTarget: "GitHub Commit Telemetry",
            sourceDeficit: "0 Public AST Commits linked to student handle",
            estimatedMinutes: 30,
            difficulty: "Intermediate",
            completed: false,
            ncrfMicroCredits: 0.5,
          },
        ]
      : [
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
    recentApplications: isFlagged
      ? [
          {
            jobId: "JOB_9011",
            company: "Razorpay",
            role: "Software Development Engineer - Intern",
            appliedDate: new Date().toISOString().split("T")[0],
            status: "Rejected_Round1",
            vciMatchScore: vciScore,
          },
        ]
      : [
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
    astStats: isFlagged
      ? {
          totalCommits: 0,
          reposAnalyzed: 0,
          linesOfCode: 0,
          entropyScore: 0.1,
          topLanguages: [{ language: "Unverified", percentage: 100 }],
        }
      : {
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
