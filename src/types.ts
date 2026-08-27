export type UserRole = "dashboard" | "student" | "recruiter" | "academic" | "sandbox" | "dpi" | "demos";

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillNode {
  name: string;
  category: "Languages" | "Backend" | "Cloud/DevOps" | "Distributed Systems" | "Frontend" | "Data/AI";
  claimedConfidence: number; // 0-100
  verifiedConfidence: number; // 0-100 (VCI)
  source: "GitHub AST" | "WASM Sandbox" | "Self-Reported" | "Interview Feedback";
  astCommitCount: number;
  cyclomaticComplexityAvg: number;
  testCoverageRatio: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  institution: string;
  department: string;
  degree?: string;
  cgpa?: number;
  graduationYear: number;
  apaarId: string;
  digiLockerVerified: boolean;
  abcCredits: number;
  vciScore: number; // 0-100
  githubUsername: string;
  githubScore: number;
  linkedinUrl?: string;
  portfolioUrl?: string;
  leetcodeUsername?: string;
  bio?: string;
  resumeFileName?: string;
  resumeUploadDate?: string;
  resumeSizeKb?: number;
  resumeRawText?: string;
  projects?: StudentProject[];
  sandboxCompletionRate: number;
  skills: SkillNode[];
  remediationRoadmap: RemediationTask[];
  recentApplications: ApplicationRecord[];
  astStats: {
    totalCommits: number;
    reposAnalyzed: number;
    linesOfCode: number;
    entropyScore: number; // 0-1
    topLanguages: { language: string; percentage: number }[];
  };
}

export interface RemediationTask {
  id: string;
  title: string;
  skillTarget: string;
  sourceDeficit: string;
  recruiterFeedbackSource?: string;
  estimatedMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
  ncrfMicroCredits: number;
  starterCode?: string;
  testCases?: string[];
}

export interface ApplicationRecord {
  jobId: string;
  company: string;
  role: string;
  appliedDate: string;
  status: "Under Review" | "Interview Scheduled" | "Offered" | "Rejected_Round1" | "Rejected_Round2" | "Verified_Shortlist";
  vciMatchScore: number;
  recruiterFeedback?: {
    primaryFailureReason: string;
    toolingDeficit: string;
    softSkillRating: number; // 1-5
    timestamp: string;
  };
}

export interface JobRequisition {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Internship" | "Remote Micro-Internship";
  stipendOrSalary: string;
  mandatorySkills: string[];
  niceToHaveSkills: string[];
  minVciScore: number;
  description: string;
  domain: string;
  applicantsCount: number;
  denseVectorRequirements: string[];
}

export interface RecruiterRejectionLog {
  id: string;
  candidateName: string;
  candidateId: string;
  institution: string;
  department: string;
  roleApplied: string;
  timestamp: string;
  primaryFailureMode: "Theoretical vs Hands-on Execution" | "Async & Distributed Architecture" | "Containerization & Cloud Infrastructure" | "Unit Testing & CI/CD" | "Problem Articulation / Soft Skills";
  specificMissingTool: string;
  softSkillRating: number; // 1-5
  notes: string;
  closedLoopTriggered: boolean;
}

export interface BosSyllabusProposal {
  motionTitle: string;
  motionNumber: string;
  institution: string;
  department: string;
  academicYear: string;
  rationale: string;
  creditStructure: {
    lectureHours: number;
    tutorialHours: number;
    practicalHours: number;
    totalCredits: number;
    ncrfLevel: string;
    notionalLearningHours: number;
  };
  courseOutcomes: {
    code: string;
    outcome: string;
    bloomsLevel: string;
    mappedPOs: string[];
  }[];
  syllabusModules: {
    moduleNumber: number;
    title: string;
    hours: number;
    topics: string[];
    industryAlignment: string;
  }[];
  practicalLabs: string[];
  recommendedBooks: string[];
  implementationTimeline: string;
  obeComplianceStatement: string;
  generatedDate: string;
}

export interface BenchmarkResumeCase {
  id: string;
  candidateName: string;
  title: string;
  claimedExperience: string;
  isAdversarial: boolean;
  adversarialTrick: string;
  visibleText: string;
  hiddenWhiteFontText: string;
  githubHandle: string;
  realGitRepos: number;
  realGitCommits: number;
  traditionalTfIdfScore: number;
  traditionalRank: string;
  traditionalVerdict: string;
  avsarSbertMatch: number;
  avsarAstProof: number;
  avsarVciScore: number;
  avsarRank: string;
  avsarVerdict: string;
  detectedAnomalies: string[];
}
