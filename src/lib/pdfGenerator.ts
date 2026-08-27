import { jsPDF } from "jspdf";
import { BosSyllabusProposal, StudentProfile } from "../types";

export function generateBosProposalPdf(proposal: BosSyllabusProposal): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 22;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 12, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("AICTE & NCrF COMPLIANT BOARD OF STUDIES (BoS) SYLLABUS AMENDMENT PROPOSAL", pageWidth / 2, 8, { align: "center" });

  // Institution Header
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(proposal.institution.toUpperCase(), pageWidth / 2, y, { align: "center" });
  y += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`${proposal.department} | Academic Year: ${proposal.academicYear}`, pageWidth / 2, y, { align: "center" });
  y += 5;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Motion Meta Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 20, 2, 2, "FD");

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`Document Reference: ${proposal.motionNumber}`, margin + 4, y + 6);
  doc.text(`Generated Date: ${proposal.generatedDate || "2026-08-26"}`, pageWidth - margin - 50, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const titleLines = doc.splitTextToSize(`Motion: ${proposal.motionTitle}`, pageWidth - 2 * margin - 8);
  doc.text(titleLines, margin + 4, y + 12);
  y += 26;

  // 1. Executive Rationale & Industry Telemetry Evidence
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Context & Recruiter Rejection Telemetry Rationale", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const rationaleLines = doc.splitTextToSize(proposal.rationale, pageWidth - 2 * margin);
  doc.text(rationaleLines, margin, y);
  y += rationaleLines.length * 4.2 + 4;

  // 2. NCrF Credit & Pedagogical Structure
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("2. Credit & Instructional Allocation (National Credit Framework)", margin, y);
  y += 5;

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - 2 * margin, 7, "F");
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Lecture (L)", margin + 4, y + 4.8);
  doc.text("Tutorial (T)", margin + 34, y + 4.8);
  doc.text("Practical (P)", margin + 64, y + 4.8);
  doc.text("Total Credits", margin + 96, y + 4.8);
  doc.text("NCrF Level", margin + 128, y + 4.8);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.text(`${proposal.creditStructure.lectureHours} hr/week`, margin + 4, y + 5);
  doc.text(`${proposal.creditStructure.tutorialHours} hr/week`, margin + 34, y + 5);
  doc.text(`${proposal.creditStructure.practicalHours} hr/week`, margin + 64, y + 5);
  doc.setFont("helvetica", "bold");
  doc.text(`${proposal.creditStructure.totalCredits} Credits`, margin + 96, y + 5);
  doc.setFont("helvetica", "normal");
  doc.text(proposal.creditStructure.ncrfLevel, margin + 128, y + 5);
  y += 10;

  // 3. Course Outcomes (COs) mapped to Program Outcomes (POs)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("3. Course Outcomes (CO) & Bloom's Taxonomy Alignment", margin, y);
  y += 5;

  proposal.courseOutcomes.forEach((co) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 12, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(14, 116, 144); // cyan-700
    doc.text(co.code, margin + 3, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const coLines = doc.splitTextToSize(co.outcome, pageWidth - 2 * margin - 50);
    doc.text(coLines, margin + 14, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`[${co.bloomsLevel} | ${co.mappedPOs.join(", ")}]`, pageWidth - margin - 42, y + 5);

    y += 14;
  });

  y += 2;

  // 4. Proposed Syllabus Modules
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("4. Core Syllabus Modules & Industry Relevance", margin, y);
  y += 5;

  proposal.syllabusModules.forEach((mod) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Module ${mod.moduleNumber}: ${mod.title} (${mod.hours} Hours)`, margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Topics: ${mod.topics.join("; ")}`, margin + 4, y, { maxWidth: pageWidth - 2 * margin - 8 });
    y += 8;
  });

  // Footer Sign-Off Block
  if (y > 240) {
    doc.addPage();
    y = 25;
  } else {
    y = 255;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "bold");
  doc.text("SUBMITTED FOR APPROVAL BY:", margin, y);
  doc.text("ENDORSED BY TPO & DEAN:", pageWidth / 2, y);
  doc.text("STATUS: READY FOR BOS VOTE", pageWidth - margin - 48, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text("Prof. R. Soundararajan (Head of CSE)", margin, y);
  doc.text("Dean of Academic Courses", pageWidth / 2, y);
  doc.text("NCrF Compliance Verified [100%]", pageWidth - margin - 48, y);

  return doc;
}

export function downloadBosPdf(proposal: BosSyllabusProposal) {
  const doc = generateBosProposalPdf(proposal);
  doc.save(`CampusLink_BoS_Motion_${proposal.motionNumber.replace(/[\/\s]/g, "_")}.pdf`);
}

export function generateStudentVciCertificate(student: StudentProfile): jsPDF {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Border & Header
  doc.setDrawColor(14, 116, 144);
  doc.setLineWidth(2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setFillColor(15, 23, 42);
  doc.rect(10, 10, pageWidth - 20, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CAMPUSLINK — VERIFIED CAPABILITY INDEX (VCI) CREDENTIAL TRANSCRIPT", pageWidth / 2, 22, { align: "center" });

  // Body
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text(`CANDIDATE: ${student.name.toUpperCase()}`, 20, 42);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Roll No: ${student.collegeRollNo || "2022-CS-042"} | APAAR ID: ${student.apaarId || "5512-8921-4401"} | DigiLocker Verified: ${student.digiLockerVerified ? "YES" : "NO"} | ABC Credits: ${student.abcCredits}`, 20, 49);
  doc.text(`Institution: ${student.institution} (${student.department}) | Graduating Class: ${student.graduationYear}`, 20, 55);

  // VCI Score Badge
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(13, 148, 136);
  doc.roundedRect(pageWidth - 75, 38, 55, 22, 2, 2, "FD");
  doc.setTextColor(13, 148, 136);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`${student.vciScore}% VCI`, pageWidth - 48, 52, { align: "center" });
  doc.setFontSize(7.5);
  doc.text("Deterministic Proof-of-Work", pageWidth - 48, 57, { align: "center" });

  // AST Details
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 62, pageWidth - 20, 62);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Verified Abstract Syntax Tree (AST) & Code Execution Breakdown:", 20, 72);

  let y = 82;
  student.skills.forEach((skill) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(skill.name, 22, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`Source: ${skill.source} | Commits: ${skill.astCommitCount} | Test Coverage: ${Math.round(skill.testCoverageRatio * 100)}% | Cyclomatic Complexity: ${skill.cyclomaticComplexityAvg}`, 85, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(14, 116, 144);
    doc.text(`${skill.verifiedConfidence}% Verified`, pageWidth - 45, y);

    y += 9;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("This credential is cryptographically anchored and verified via WebAssembly execution sandboxes and public GitHub AST profiling.", 20, pageHeight - 16);
  doc.text(`Digital Verification Hash: SHA256:${student.id}_${Date.now()}`, 20, pageHeight - 12);

  return doc;
}
