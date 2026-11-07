export type StudentStatus = 'Pending' | 'Approved' | 'Enrolled' | 'In Progress' | 'Completed' | 'Certified';
export type SchoolStatus = 'Pending' | 'Approved' | 'Active' | 'Rejected';
export type CertificateStatus = 'Generated' | 'Pending Approval' | 'Issued';
export type ProgramStatus = 'Upcoming' | 'In Progress' | 'Completed';
export type TrainingMode = 'Online' | 'Offline' | 'Hybrid';

export interface Student {
  id: string; // e.g., 'HLX-STU-2026-1042'
  name: string;
  schoolId: string;
  schoolName: string;
  grade: string; // e.g., 'Class 9'
  section?: string;
  parentName: string;
  parentContact: string;
  email?: string;
  city: string;
  state: string;
  programId: string;
  programName: string;
  status: StudentStatus;
  attendanceDays: number; // 0 - 14
  assessmentScore?: number; // 0 - 100
  assessmentFeedback?: string;
  registeredAt: string;
  certificateId?: string;
  parentConsent: boolean;
}

export interface School {
  id: string; // e.g., 'HLX-SCH-2026-301'
  name: string;
  type: string; // CBSE, ICSE, State Board, IB, etc.
  principalName: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  approxStudents: number;
  interestedProgram: string;
  preferredMode: TrainingMode;
  status: SchoolStatus;
  registeredAt: string;
}

export interface Program {
  id: string;
  name: string;
  durationDays: number;
  targetAudience: string;
  teachingMethod: string;
  description: string;
  capacity: number;
  enrolledCount: number;
  mode: TrainingMode;
  status: ProgramStatus;
  startDate: string;
  assignedSchoolIds: string[];
}

export interface Certificate {
  id: string; // e.g., 'HLX-CERT-2026-8821'
  studentId: string;
  studentName: string;
  schoolName: string;
  programName: string;
  grade: string;
  score: number;
  completionDate: string;
  issuedDate: string;
  status: CertificateStatus;
  verifierHash: string;
}

export interface SkillDetail {
  id: number;
  name: string;
  dayNumber: number;
  tagline: string;
  explanation: string;
  whatStudentsLearn: string[];
  practicalActivities: string[];
  expectedOutcome: string;
}

export interface CEODashboardStats {
  totalRegisteredStudents: number;
  totalRegisteredSchools: number;
  totalCertifiedStudents: number;
  studentsCurrentlyEnrolled: number;
  studentsAwaitingApproval: number;
  studentsWhoCompletedTraining: number;
  studentsPendingAssessment: number;
  totalProgramsConducted: number;
}
