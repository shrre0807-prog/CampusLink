import {
  StudentProfile,
  JobRequisition,
  RecruiterRejectionLog,
  BenchmarkResumeCase,
  BosSyllabusProposal,
} from "../types";

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: "STU_2026_9104",
    name: "Priya Sharma",
    email: "priya.s@vtu.ac.in",
    phone: "+91 97112 34567",
    institution: "Visvesvaraya Technological University (VTU)",
    department: "Information Science & Engineering",
    degree: "B.E. in Information Science",
    cgpa: 9.45,
    graduationYear: 2026,
    collegeRollNo: "2022-IS-042",
    digiLockerVerified: true,
    collegeVerified: true,
    abcCredits: 150,
    vciScore: 92,
    githubUsername: "priya-devops",
    githubScore: 94,
    linkedinUrl: "https://linkedin.com/in/priya-sharma-cloud",
    portfolioUrl: "https://priyasharma.io",
    leetcodeUsername: "priya_golang",
    bio: "Cloud infrastructure architect and Go systems developer. Certified Kubernetes Administrator (CKA) with experience building high-reliability gRPC microservices.",
    resumeFileName: "Priya_Sharma_Cloud_Resume.pdf",
    resumeUploadDate: "2026-08-21",
    resumeSizeKb: 210,
    resumeRawText: `PRIYA SHARMA | priya.s@vtu.ac.in | +91 97112 34567 | Bengaluru, India
EDUCATION: VTU, Karnataka — B.E. Information Science (2022-2026) | CGPA: 9.45/10 (Rank 2)
SKILLS: Go, Kubernetes, Terraform, Helm, AWS, gRPC, Docker, Prometheus, Grafana, Linux
PROJECTS:
1. Multi-Cluster Kubernetes Operator: Custom CRD in Go for automatic canary deployment rollouts.
2. High-Performance gRPC Broker: Zero-copy protobuf stream engine handling 45k QPS.
EXPERIENCE: Cloud Platform Intern at CloudScale Technologies.`,
    projects: [
      {
        id: "proj_p1",
        title: "Multi-Cluster Kubernetes Canary Operator",
        description: "Engineered a Kubernetes Operator in Golang that automates zero-downtime blue/green and canary rollouts based on Prometheus latency SLAs.",
        techStack: ["Go", "Kubernetes", "Helm", "Prometheus", "Docker"],
        githubUrl: "https://github.com/priya-devops/canary-operator",
        liveUrl: "https://canary-docs.priyasharma.io",
      },
    ],
    sandboxCompletionRate: 98,
    skills: [
      {
        name: "Go (Golang Microservices)",
        category: "Backend",
        claimedConfidence: 95,
        verifiedConfidence: 94,
        source: "GitHub AST",
        astCommitCount: 520,
        cyclomaticComplexityAvg: 3.1,
        testCoverageRatio: 0.94,
      },
      {
        name: "Kubernetes & Helm",
        category: "Cloud/DevOps",
        claimedConfidence: 90,
        verifiedConfidence: 91,
        source: "GitHub AST",
        astCommitCount: 310,
        cyclomaticComplexityAvg: 2.4,
        testCoverageRatio: 0.89,
      },
      {
        name: "gRPC & Protocol Buffers",
        category: "Distributed Systems",
        claimedConfidence: 92,
        verifiedConfidence: 90,
        source: "WASM Sandbox",
        astCommitCount: 240,
        cyclomaticComplexityAvg: 3.6,
        testCoverageRatio: 0.91,
      },
      {
        name: "Terraform & AWS",
        category: "Cloud/DevOps",
        claimedConfidence: 85,
        verifiedConfidence: 84,
        source: "GitHub AST",
        astCommitCount: 180,
        cyclomaticComplexityAvg: 2.2,
        testCoverageRatio: 0.85,
      },
    ],
    remediationRoadmap: [
      {
        id: "REM_04",
        title: "eBPF Kernel Tracing for Distributed Observability",
        skillTarget: "eBPF / Linux Internals",
        sourceDeficit: "Advanced Cloud Track Recommendation",
        estimatedMinutes: 45,
        difficulty: "Advanced",
        completed: false,
        ncrfMicroCredits: 1.0,
      },
    ],
    recentApplications: [
      {
        jobId: "JOB_9011",
        company: "Razorpay",
        role: "Backend Platform Engineer",
        appliedDate: "2026-08-21",
        status: "Offered",
        vciMatchScore: 96,
      },
    ],
    astStats: {
      totalCommits: 2150,
      reposAnalyzed: 38,
      linesOfCode: 82000,
      entropyScore: 0.92,
      topLanguages: [
        { language: "Go", percentage: 56 },
        { language: "TypeScript", percentage: 22 },
        { language: "HCL / Terraform", percentage: 14 },
        { language: "Python", percentage: 8 },
      ],
    },
  },
  {
    id: "STU_2026_4412",
    name: "Rahul Verma (Adversarial Test Case)",
    email: "rahul.v@testcampus.edu",
    institution: "Autonomous Institute of Technology",
    department: "Computer Science",
    graduationYear: 2026,
    collegeRollNo: "2022-CS-991",
    digiLockerVerified: false,
    collegeVerified: false,
    abcCredits: 128,
    vciScore: 19, // Severely penalized for keyword stuffing & empty repos
    githubUsername: "rahul-tech-dev",
    githubScore: 12,
    sandboxCompletionRate: 20,
    skills: [
      {
        name: "Kubernetes & Distributed Architecture",
        category: "Distributed Systems",
        claimedConfidence: 99,
        verifiedConfidence: 8,
        source: "Self-Reported",
        astCommitCount: 0,
        cyclomaticComplexityAvg: 0,
        testCoverageRatio: 0,
      },
      {
        name: "AWS Solutions Architecture",
        category: "Cloud/DevOps",
        claimedConfidence: 98,
        verifiedConfidence: 5,
        source: "Self-Reported",
        astCommitCount: 0,
        cyclomaticComplexityAvg: 0,
        testCoverageRatio: 0,
      },
      {
        name: "HTML5 & Basic CSS",
        category: "Frontend",
        claimedConfidence: 80,
        verifiedConfidence: 65,
        source: "GitHub AST",
        astCommitCount: 14,
        cyclomaticComplexityAvg: 1.1,
        testCoverageRatio: 0.05,
      },
    ],
    remediationRoadmap: [
      {
        id: "REM_05",
        title: "Hands-on AST Verification: Linux Shell & Git Basics",
        skillTarget: "Fundamental Execution",
        sourceDeficit: "Anti-Gaming VCI Audit Flag: Zero commit proof",
        estimatedMinutes: 20,
        difficulty: "Beginner",
        completed: false,
        ncrfMicroCredits: 0.5,
      },
    ],
    recentApplications: [
      {
        jobId: "JOB_9011",
        company: "Razorpay",
        role: "Backend Platform Engineer",
        appliedDate: "2026-08-25",
        status: "Rejected_Round1",
        vciMatchScore: 19,
        recruiterFeedback: {
          primaryFailureReason: "Theoretical vs Hands-on Execution",
          toolingDeficit: "Keyword inflation detected; failed basic interactive sandbox",
          softSkillRating: 2,
          timestamp: "2026-08-25T11:00:00Z",
        },
      },
    ],
    astStats: {
      totalCommits: 14,
      reposAnalyzed: 2,
      linesOfCode: 850,
      entropyScore: 0.12, // Monolithic single commit clone
      topLanguages: [{ language: "HTML/CSS", percentage: 95 }, { language: "JavaScript", percentage: 5 }],
    },
  },
  {
    id: "STU_2026_5521",
    name: "Ananya Iyer",
    email: "ananya.iyer@mu.ac.in",
    institution: "University of Mumbai",
    department: "Artificial Intelligence & Data Science",
    graduationYear: 2026,
    collegeRollNo: "2022-AI-019",
    digiLockerVerified: true,
    collegeVerified: true,
    abcCredits: 148,
    vciScore: 89,
    githubUsername: "ananya-mlops",
    githubScore: 88,
    sandboxCompletionRate: 94,
    skills: [
      {
        name: "PyTorch & Transformers",
        category: "Data/AI",
        claimedConfidence: 94,
        verifiedConfidence: 91,
        source: "GitHub AST",
        astCommitCount: 390,
        cyclomaticComplexityAvg: 3.8,
        testCoverageRatio: 0.86,
      },
      {
        name: "FastAPI & Vector DBs (pgvector/Pinecone)",
        category: "Data/AI",
        claimedConfidence: 90,
        verifiedConfidence: 89,
        source: "GitHub AST",
        astCommitCount: 260,
        cyclomaticComplexityAvg: 3.1,
        testCoverageRatio: 0.84,
      },
      {
        name: "MLflow & Model CI/CD",
        category: "Cloud/DevOps",
        claimedConfidence: 85,
        verifiedConfidence: 82,
        source: "WASM Sandbox",
        astCommitCount: 120,
        cyclomaticComplexityAvg: 2.5,
        testCoverageRatio: 0.78,
      },
      {
        name: "Distributed Training / Horovod",
        category: "Distributed Systems",
        claimedConfidence: 80,
        verifiedConfidence: 65,
        source: "Interview Feedback",
        astCommitCount: 35,
        cyclomaticComplexityAvg: 2.1,
        testCoverageRatio: 0.45,
      },
    ],
    remediationRoadmap: [
      {
        id: "REM_06",
        title: "Multi-GPU Distributed Data Parallel (DDP) Optimization",
        skillTarget: "Distributed Deep Learning",
        sourceDeficit: "AICTE Level 6 Advanced Computing Recommendation",
        estimatedMinutes: 35,
        difficulty: "Advanced",
        completed: false,
        ncrfMicroCredits: 0.5,
      },
      {
        id: "REM_07",
        title: "Quantization-Aware Model Pruning with ONNX Runtime",
        skillTarget: "Edge AI Optimization",
        sourceDeficit: "Micro-Sandbox Diagnostic Flag",
        estimatedMinutes: 25,
        difficulty: "Intermediate",
        completed: true,
        ncrfMicroCredits: 0.5,
      },
    ],
    recentApplications: [
      {
        jobId: "JOB_9015",
        company: "Postman",
        role: "AI Systems Intern",
        appliedDate: "2026-08-22",
        status: "Verified_Shortlist",
        vciMatchScore: 92,
      },
      {
        jobId: "JOB_9011",
        company: "Razorpay",
        role: "Backend Platform Engineer",
        appliedDate: "2026-08-19",
        status: "Interview Scheduled",
        vciMatchScore: 88,
      },
    ],
    astStats: {
      totalCommits: 1680,
      reposAnalyzed: 24,
      linesOfCode: 64200,
      entropyScore: 0.89,
      topLanguages: [
        { language: "Python", percentage: 72 },
        { language: "C++ / CUDA", percentage: 16 },
        { language: "TypeScript", percentage: 8 },
        { language: "Shell", percentage: 4 },
      ],
    },
  },
  {
    id: "STU_2026_7734",
    name: "Karthik Raman",
    email: "karthik.r@nitt.edu",
    institution: "National Institute of Technology (NIT), Trichy",
    department: "Electronics & Communication Engineering",
    graduationYear: 2026,
    apaarId: "8833-2211-5544",
    digiLockerVerified: true,
    abcCredits: 154,
    vciScore: 95,
    githubUsername: "karthik-rust-embedded",
    githubScore: 96,
    sandboxCompletionRate: 100,
    skills: [
      {
        name: "Rust (Async Tokio & Memory Safety)",
        category: "Backend",
        claimedConfidence: 98,
        verifiedConfidence: 96,
        source: "GitHub AST",
        astCommitCount: 680,
        cyclomaticComplexityAvg: 4.4,
        testCoverageRatio: 0.96,
      },
      {
        name: "WASM & WebAssembly Edge Runtime",
        category: "Cloud/DevOps",
        claimedConfidence: 94,
        verifiedConfidence: 93,
        source: "WASM Sandbox",
        astCommitCount: 310,
        cyclomaticComplexityAvg: 3.5,
        testCoverageRatio: 0.92,
      },
      {
        name: "Low-Latency Networking & IPC",
        category: "Distributed Systems",
        claimedConfidence: 92,
        verifiedConfidence: 90,
        source: "GitHub AST",
        astCommitCount: 240,
        cyclomaticComplexityAvg: 4.1,
        testCoverageRatio: 0.88,
      },
    ],
    remediationRoadmap: [
      {
        id: "REM_08",
        title: "SIMD Vectorization for High-Frequency JSON Deserialization",
        skillTarget: "Rust SIMD / Compiler Intrinsics",
        sourceDeficit: "Advanced Low-Latency Challenge Track",
        estimatedMinutes: 30,
        difficulty: "Advanced",
        completed: false,
        ncrfMicroCredits: 0.5,
      },
    ],
    recentApplications: [
      {
        jobId: "JOB_9012",
        company: "Zerodha",
        role: "SRE & Infrastructure Systems Intern",
        appliedDate: "2026-08-23",
        status: "Offered",
        vciMatchScore: 98,
      },
    ],
    astStats: {
      totalCommits: 2840,
      reposAnalyzed: 42,
      linesOfCode: 105000,
      entropyScore: 0.96,
      topLanguages: [
        { language: "Rust", percentage: 68 },
        { language: "C++", percentage: 20 },
        { language: "WebAssembly", percentage: 8 },
        { language: "Python", percentage: 4 },
      ],
    },
  },
];

export const SAMPLE_JOBS: JobRequisition[] = [
  {
    id: "JOB_9011",
    title: "Cloud Native & Distributed Backend Engineer",
    company: "Razorpay",
    location: "Bengaluru / Hybrid",
    type: "Full-Time",
    stipendOrSalary: "₹18-24 LPA",
    mandatorySkills: ["Kafka / RabbitMQ", "FastAPI / Node.js", "Docker & Kubernetes", "Async IO & Concurrency"],
    niceToHaveSkills: ["gRPC", "Prometheus / OpenTelemetry", "pgvector"],
    minVciScore: 80,
    description: "Build high-throughput transaction routing engines processing 50,000 requests/second with zero downtime. Requires verifiable execution proof with distributed message queues and concurrency.",
    domain: "Fintech & Cloud Systems",
    applicantsCount: 142,
    denseVectorRequirements: ["Asynchronous Event Processing", "Dead Letter Queue Routing", "Containerized Deployment"],
  },
  {
    id: "JOB_9012",
    title: "SRE & Infrastructure Systems Intern",
    company: "Zerodha",
    location: "Bengaluru / Remote",
    type: "Internship",
    stipendOrSalary: "₹65,000 / month",
    mandatorySkills: ["Go (Golang) / Python", "Linux Internals", "Docker & CI/CD", "PostgreSQL"],
    niceToHaveSkills: ["eBPF", "Redis Streams", "Kubernetes"],
    minVciScore: 75,
    description: "Join the core platform team maintaining high-performance market feeds. We value evidence-verified code commits and AST test coverage over static resume keywords.",
    domain: "Capital Markets & Low Latency",
    applicantsCount: 88,
    denseVectorRequirements: ["Linux Kernel Systems", "Low Latency Networking", "Automated Testing"],
  },
  {
    id: "JOB_9015",
    title: "API Platform & Microservices Developer",
    company: "Postman",
    location: "Bengaluru / Remote",
    type: "Full-Time",
    stipendOrSalary: "₹16-22 LPA",
    mandatorySkills: ["TypeScript / Node.js", "API Gateways", "Unit & Integration Testing", "Docker"],
    niceToHaveSkills: ["GraphQL", "Kafka", "WebAssembly"],
    minVciScore: 78,
    description: "Develop developer tooling and scalable API test engines used by over 30 million engineers worldwide.",
    domain: "Developer Tools & SaaS",
    applicantsCount: 110,
    denseVectorRequirements: ["REST / OpenAPI Specifications", "Test Driven Development", "Reactive Architecture"],
  },
];

export const SAMPLE_REJECTION_LOGS: RecruiterRejectionLog[] = [
  {
    id: "REJ_101",
    candidateName: "Arjun Kumar",
    candidateId: "STU_2026_8832",
    institution: "Anna University",
    department: "Computer Science & Engineering",
    roleApplied: "Backend Platform Engineer (Razorpay)",
    timestamp: "2026-08-22T14:30:00Z",
    primaryFailureMode: "Async & Distributed Architecture",
    specificMissingTool: "Kafka consumer group rebalancing & dead-letter queue orchestration",
    softSkillRating: 4,
    notes: "Solid conceptual syntax in Python/Node, but struggled when asked to handle network partitions and async race conditions in message broker pipelines.",
    closedLoopTriggered: true,
  },
  {
    id: "REJ_102",
    candidateName: "Karthik R.",
    candidateId: "STU_2026_1120",
    institution: "Anna University",
    department: "Computer Science & Engineering",
    roleApplied: "Cloud Infrastructure Specialist (Swiggy)",
    timestamp: "2026-08-23T11:15:00Z",
    primaryFailureMode: "Containerization & Cloud Infrastructure",
    specificMissingTool: "Multi-stage Docker builds & Kubernetes liveness/readiness probes",
    softSkillRating: 3,
    notes: "Candidate relied on basic monolithic scripts. Lacked understanding of microservice health checks and container volume persistence.",
    closedLoopTriggered: true,
  },
  {
    id: "REJ_103",
    candidateName: "Deepak N.",
    candidateId: "STU_2026_5541",
    institution: "Anna University",
    department: "Computer Science & Engineering",
    roleApplied: "Distributed Systems Intern (PhonePe)",
    timestamp: "2026-08-24T16:00:00Z",
    primaryFailureMode: "Async & Distributed Architecture",
    specificMissingTool: "Distributed Lock Managers (Redis Redlock / Zookeeper) & idempotency",
    softSkillRating: 4,
    notes: "Good DSA score on paper, but unable to design idempotent payment webhooks.",
    closedLoopTriggered: true,
  },
  {
    id: "REJ_104",
    candidateName: "Sanjay M.",
    candidateId: "STU_2026_9033",
    institution: "Anna University",
    department: "Computer Science & Engineering",
    roleApplied: "DevOps Engineer (Zerodha)",
    timestamp: "2026-08-25T09:45:00Z",
    primaryFailureMode: "Unit Testing & CI/CD",
    specificMissingTool: "Automated Mock Testing frameworks (Jest/Pytest) & GitHub Actions pipelines",
    softSkillRating: 3,
    notes: "Never wrote integration tests; assumed manual browser testing is sufficient for production deployments.",
    closedLoopTriggered: true,
  },
];

export const BENCHMARK_RESUMES: BenchmarkResumeCase[] = [
  {
    id: "ADV_RESUME_01",
    candidateName: "Rahul S. (Adversarial White-Font Trap)",
    title: "Senior Distributed Systems & Cloud Infrastructure Specialist",
    claimedExperience: "4 Years (Claimed - Student with zero Git proof)",
    isAdversarial: true,
    adversarialTrick: "Invisible White-Font Keyword Stuffing (FontColor #FFFFFF, Size 1pt)",
    visibleText: `Rahul S. - Engineering Student. Skills: Basic HTML, CSS, JavaScript, Calculator App, Todo List. Participated in College Tech Fest.`,
    hiddenWhiteFontText: `Kubernetes AWS Distributed Systems Microservices Kafka RabbitMQ System Design Golang Terraform eBPF Prometheus Docker Swarm Redis Cluster CI CD PostgreSQL gRPC Apache Cassandra Fault Tolerance High Availability`,
    githubHandle: "rahul-empty-git",
    realGitRepos: 1,
    realGitCommits: 3,
    traditionalTfIdfScore: 96,
    traditionalRank: "Rank #1 MATCH (Score: 96%)",
    traditionalVerdict: "APPROVED BY ATS — High keyword frequency matched against job description.",
    avsarSbertMatch: 88,
    avsarAstProof: 8,
    avsarVciScore: 19,
    avsarRank: "Rank #38 (DISQUALIFIED / FLAGGED)",
    avsarVerdict: "FLAGGED FOR RESUME INFLATION: 0 matching Git AST nodes for 18 claimed distributed systems terms. VCI penalty: -77%.",
    detectedAnomalies: [
      "White-Font Layer Detected: 18 high-tier tech terms stripped from invisible PDF layer",
      "Tree-sitter AST Audit: 0 lines of Go, 0 Dockerfiles, 0 Kubernetes YAML found in public repositories",
      "Commit Graph Entropy: 0.08 (Anomalous single-commit pattern)",
      "Automated Recruiter Alert Dispatched: Candidate directed to 10-min live WASM micro-sandbox",
    ],
  },
  {
    id: "GEN_RESUME_02",
    candidateName: "Priya Sharma (Verified Proof-of-Work)",
    title: "Full Stack & Cloud Systems Engineer",
    claimedExperience: "Student Portfolio (38 Public Repositories)",
    isAdversarial: false,
    adversarialTrick: "None (Genuine Codebase with High AST Density)",
    visibleText: `Priya Sharma. Core Projects: Distributed Task Queue in Go, Containerized API Gateway with OpenTelemetry, Redis Cache with TTL eviction. 38 GitHub repos with 2,150 commits.`,
    hiddenWhiteFontText: "None",
    githubHandle: "priya-devops",
    realGitRepos: 38,
    realGitCommits: 2150,
    traditionalTfIdfScore: 78,
    traditionalRank: "Rank #12 (Sparse keyword repetition)",
    traditionalVerdict: "MODERATE MATCH — Traditional ATS missed synonyms and ranked below keyword stuffers.",
    avsarSbertMatch: 94,
    avsarAstProof: 94,
    avsarVciScore: 94,
    avsarRank: "Rank #1 (VERIFIED TOP TIER)",
    avsarVerdict: "VERIFIED PROOF-OF-WORK: AST tree traversal confirmed 82,000 LOC, 94% test coverage, and active CI/CD pipelines.",
    detectedAnomalies: [
      "Zero keyword stuffing detected (100% clean formatting)",
      "High Cyclomatic Modularity: Clean function boundaries (Avg complexity 3.1)",
      "Verified Public Repositories: Active GitHub commits across 18 consecutive months",
    ],
  },
  {
    id: "GEN_RESUME_03",
    candidateName: "Arjun Kumar (Contextual SBERT Proof)",
    title: "Backend & Systems Developer",
    claimedExperience: "Student Portfolio (28 Public Repositories)",
    isAdversarial: false,
    adversarialTrick: "Uses Synonyms (e.g. 'RabbitMQ & Message Broker' instead of literal JD text)",
    visibleText: `Arjun Kumar. Projects: Event-Driven Order Dispatcher using RabbitMQ exchanges, Async FastAPIs with PostgreSQL connection pooling, Dockerized microservices.`,
    hiddenWhiteFontText: "None",
    githubHandle: "arjun-k-dev",
    realGitRepos: 28,
    realGitCommits: 1420,
    traditionalTfIdfScore: 68,
    traditionalRank: "Rank #18 (Failed literal term match for 'Asynchronous Queues')",
    traditionalVerdict: "WEAK OVERLAP — TF-IDF failed to map RabbitMQ to Asynchronous Queues.",
    avsarSbertMatch: 88,
    avsarAstProof: 82,
    avsarVciScore: 84,
    avsarRank: "Rank #3 (INTERVIEW READY)",
    avsarVerdict: "SEMANTIC VECTOR MATCH: SBERT mapped RabbitMQ to Asynchronous Message Queues with 88% dense proximity. VCI: 84%.",
    detectedAnomalies: [
      "Semantic Equivalence Confirmed: RabbitMQ / AMQP recognized as Asynchronous Event Broker",
      "Tree-sitter AST verified: 48,500 LOC with robust error handling blocks",
    ],
  },
];

export const INITIAL_BOS_PROPOSAL: BosSyllabusProposal = {
  motionTitle: "Motion to Amend B.Tech Computer Science & Engineering Curriculum: Introduction of CS408 - Distributed Async Architectures & Message Systems",
  motionNumber: "BoS/CSE/2026/AM-04",
  institution: "Anna University, Chennai",
  department: "Department of Computer Science & Engineering",
  academicYear: "2026-2027",
  rationale: "Analysis of 42% technical interview failure telemetry across the 2026 batch reveals systemic execution deficits in Asynchronous Event Loops, Message Broker Partitioning (Kafka/RabbitMQ), and Production Container Debugging. In accordance with AICTE Model Curriculum Guidelines and NCrF Level 5.5, this amendment introduces a 2-Credit applied elective module with hands-on AST verification to close the classroom-to-industry gap in 1 semester rather than the typical 3-year revision cycle.",
  creditStructure: {
    lectureHours: 1,
    tutorialHours: 0,
    practicalHours: 2,
    totalCredits: 2,
    ncrfLevel: "Level 5.5 (Engineering Undergraduate)",
    notionalLearningHours: 60,
  },
  courseOutcomes: [
    {
      code: "CO1",
      outcome: "Analyze event-driven message architectures and consumer group rebalancing protocols (Kafka & RabbitMQ).",
      bloomsLevel: "Analyze (Level 4)",
      mappedPOs: ["PO1", "PO2", "PO3"],
    },
    {
      code: "CO2",
      outcome: "Design race-condition free asynchronous non-blocking services with dead-letter queue retry strategies.",
      bloomsLevel: "Create (Level 6)",
      mappedPOs: ["PO3", "PO4", "PO5"],
    },
    {
      code: "CO3",
      outcome: "Implement containerized microservice deployments with OpenTelemetry observability and health probes.",
      bloomsLevel: "Apply & Evaluate (Level 5)",
      mappedPOs: ["PO5", "PO12"],
    },
  ],
  syllabusModules: [
    {
      moduleNumber: 1,
      title: "Asynchronous Concurrency & Event Loop Mechanics",
      hours: 6,
      topics: [
        "Event loop internals in Node.js & Python AsyncIO",
        "Non-blocking I/O vs Thread Pools",
        "Backpressure handling and reactive data streams",
        "Common concurrency pitfalls: deadlocks & race conditions",
      ],
      industryAlignment: "Resolves 38% recruiter failure mode in initial technical interview rounds",
    },
    {
      moduleNumber: 2,
      title: "Distributed Message Brokers & Event Sourcing",
      hours: 8,
      topics: [
        "Apache Kafka architecture: topics, partitions & consumer groups",
        "RabbitMQ exchanges, queues & AMQP protocol semantics",
        "Idempotency patterns & Exactly-Once Semantics (EOS)",
        "Dead Letter Queues (DLQ) & exponential backoff strategies",
      ],
      industryAlignment: "Directly satisfies mandatory skill requirement for Top Fintech & Cloud recruiters",
    },
    {
      moduleNumber: 3,
      title: "Microservices Resiliency & Observability",
      hours: 8,
      topics: [
        "Circuit breaker, bulkhead, and rate-limiting patterns",
        "Distributed tracing using OpenTelemetry & Jaeger",
        "Containerization best practices with Docker multi-stage builds",
        "Kubernetes liveness and readiness probe orchestration",
      ],
      industryAlignment: "Aligns student capabilities with modern DevOps & SRE job descriptions",
    },
  ],
  practicalLabs: [
    "Lab 1: Design and benchmark an async order processing pipeline handling 2,000 requests/sec with Redis Streams",
    "Lab 2: Simulate network partition and observe consumer rebalancing in a multi-node Kafka cluster",
    "Lab 3: Build an idempotent payment webhook receiver with automated retry dead-letter queues and Jest integration tests",
  ],
  recommendedBooks: [
    "Designing Data-Intensive Applications by Martin Kleppmann (O'Reilly)",
    "Building Microservices (2nd Edition) by Sam Newman",
    "AICTE Model Curriculum for Computer Science 2023",
  ],
  implementationTimeline: "Immediate rollout for Semester VI Elective Pool; credits synced automatically to Academic Bank of Credits (ABC).",
  obeComplianceStatement: "Complies with NBA Accreditation Criteria 2 (Teaching-Learning Process) and Criteria 3 (Course Outcomes & Program Outcomes Attainment).",
  generatedDate: "2026-08-26",
};

export const WASM_CODE_CHALLENGES = [
  {
    id: "CHALLENGE_ASYNC_QUEUE",
    title: "Fix Race Condition & Deadlock in Async Task Queue",
    domain: "Concurrency & Event Loops",
    difficulty: "Intermediate",
    timeLimitSeconds: 60,
    description: "The function below processes an array of asynchronous tasks concurrently. However, it suffers from an unhandled concurrency race condition where failed promises deadlock the queue and throw unhandled rejections. Modify it to use Promise.allSettled with concurrency batching and dead-letter retry logic.",
    defaultCode: `// Client-Side WASM Micro-Sandbox (Zero Server Load)
// Candidate ID: Arjun Kumar (STU_2026_8832)

async function processTaskQueue(tasks, maxConcurrency = 3) {
  // BUGGY IMPLEMENTATION: Lacks concurrency limits & error containment
  const results = [];
  
  // TODO: Implement concurrency chunking and fault-tolerant execution
  for (const task of tasks) {
    const res = await task.run(); // Blocks sequentially!
    results.push(res);
  }
  
  return results;
}`,
    solutionCode: `async function processTaskQueue(tasks, maxConcurrency = 3) {
  const results = [];
  const executing = new Set();
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task.run())
      .then(val => ({ status: 'fulfilled', value: val }))
      .catch(err => ({ status: 'rejected', reason: err }))
      .finally(() => executing.delete(p));
      
    results.push(p);
    executing.add(p);
    
    if (executing.size >= maxConcurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}`,
    testCases: [
      { name: "Concurrency Limiting (Max 3 concurrent executions)", timeoutMs: 500 },
      { name: "Deadlock Prevention on Rejected Promises", timeoutMs: 300 },
      { name: "Memory Leak & Execution Resource Check", timeoutMs: 200 },
    ],
  },
  {
    id: "CHALLENGE_KAFKA_IDEMPOTENCY",
    title: "Idempotent Message Deduplication with TTL Eviction",
    domain: "Distributed Systems",
    difficulty: "Advanced",
    timeLimitSeconds: 90,
    description: "Implement an in-memory sliding-window deduplication filter for high-throughput streaming events. Ensure duplicate message IDs within a 5-second window are safely dropped without memory growth.",
    defaultCode: `class IdempotentEventFilter {
  constructor(windowMs = 5000) {
    this.windowMs = windowMs;
    this.seenIds = new Map();
  }

  isDuplicate(eventId, timestamp = Date.now()) {
    // TODO: Implement cleanup of expired IDs and check duplication
    if (this.seenIds.has(eventId)) {
      return true;
    }
    this.seenIds.set(eventId, timestamp);
    return false;
  }
}`,
    solutionCode: `class IdempotentEventFilter {
  constructor(windowMs = 5000) {
    this.windowMs = windowMs;
    this.seenIds = new Map();
  }

  isDuplicate(eventId, timestamp = Date.now()) {
    const cutoff = timestamp - this.windowMs;
    
    // Purge expired keys
    for (const [id, time] of this.seenIds.entries()) {
      if (time < cutoff) {
        this.seenIds.delete(id);
      } else {
        break; // Map maintains insertion order
      }
    }

    if (this.seenIds.has(eventId)) {
      return true;
    }

    this.seenIds.set(eventId, timestamp);
    return false;
  }
}`,
    testCases: [
      { name: "Duplicate Message Suppression within Window", timeoutMs: 300 },
      { name: "Memory Eviction after TTL Expiry", timeoutMs: 400 },
      { name: "High Throughput Scale Test (10,000 ops)", timeoutMs: 500 },
    ],
  },
];
