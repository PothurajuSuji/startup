import { Student, School, Program, Certificate, CEODashboardStats, StudentStatus, SchoolStatus, TrainingMode } from '../types';

const INITIAL_SCHOOLS: School[] = [
  {
    id: 'HLX-SCH-2026-101',
    name: 'Delhi Public School, R.K. Puram',
    type: 'CBSE',
    principalName: 'Dr. Anita Sharma',
    contactPerson: 'Mr. Rajesh Mehra (Academic Head)',
    contactNumber: '+91 98112 34567',
    email: 'academics@dpsrkpuram.edu',
    address: 'Sector XII, R.K. Puram',
    city: 'New Delhi',
    state: 'Delhi',
    approxStudents: 1200,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Offline',
    status: 'Approved',
    registeredAt: '2026-10-12T10:30:00Z'
  },
  {
    id: 'HLX-SCH-2026-102',
    name: 'National Public School, Indiranagar',
    type: 'ICSE',
    principalName: 'Mrs. Shanti Narayanan',
    contactPerson: 'Ms. Deepa Krishnan (Student Counselor)',
    contactNumber: '+91 98450 78912',
    email: 'counselor@npsblr.edu',
    address: '12th Main Road, HAL 2nd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    approxStudents: 850,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Hybrid',
    status: 'Approved',
    registeredAt: '2026-10-18T14:15:00Z'
  },
  {
    id: 'HLX-SCH-2026-103',
    name: 'The Cathedral & John Connon School',
    type: 'ICSE',
    principalName: 'Dr. Cyrus Wadia',
    contactPerson: 'Dr. Cyrus Wadia (Principal)',
    contactNumber: '+91 98200 45678',
    email: 'principal@cathedral-school.com',
    address: '6, Purshottamdas Thakurdas Marg, Fort',
    city: 'Mumbai',
    state: 'Maharashtra',
    approxStudents: 920,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Offline',
    status: 'Approved',
    registeredAt: '2026-10-22T09:00:00Z'
  },
  {
    id: 'HLX-SCH-2026-104',
    name: 'Oakridge International School, Gachibowli',
    type: 'IB / Cambridge',
    principalName: 'Mr. David Paul',
    contactPerson: 'Ms. Rohini Varma (Curriculum Director)',
    contactNumber: '+91 99890 12345',
    email: 'admissions@oakridge.edu',
    address: 'Nanakramguda Road, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    approxStudents: 640,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Online',
    status: 'Approved',
    registeredAt: '2026-10-28T11:45:00Z'
  },
  {
    id: 'HLX-SCH-2026-105',
    name: 'DAV Boys Senior Secondary School',
    type: 'CBSE',
    principalName: 'Sri M. Rangarajan',
    contactPerson: 'Sri M. Rangarajan',
    contactNumber: '+91 94440 67890',
    email: 'davchennai@davschools.edu',
    address: '212, Lloyds Road, Gopalapuram',
    city: 'Chennai',
    state: 'Tamil Nadu',
    approxStudents: 1100,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Offline',
    status: 'Pending',
    registeredAt: '2026-11-02T16:20:00Z'
  },
  {
    id: 'HLX-SCH-2026-106',
    name: 'Symbiosis International School, Viman Nagar',
    type: 'IB',
    principalName: 'Dr. Veena Kulkarni',
    contactPerson: 'Mr. Sameer Joshi (Student Affairs)',
    contactNumber: '+91 97654 32109',
    email: 'info@symbiosisinternationalschool.edu',
    address: 'Sakore Nagar, Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    approxStudents: 580,
    interestedProgram: '14-Day Student Development Program',
    preferredMode: 'Hybrid',
    status: 'Pending',
    registeredAt: '2026-11-05T08:30:00Z'
  }
];

const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'HLX-PROG-14D-01',
    name: '14-Day Student Development Program',
    durationDays: 14,
    targetAudience: 'School Students (Grades 5 to 12)',
    teachingMethod: 'Practical, Activity-Based Learning (Learn • Practise • Participate • Perform • Assess • Certify)',
    description: 'Comprehensive 14-day transformative bootcamp covering confidence, public speaking, teamwork, leadership, problem solving, emotional intelligence and career awareness.',
    capacity: 250,
    enrolledCount: 168,
    mode: 'Hybrid',
    status: 'In Progress',
    startDate: '2026-11-01',
    assignedSchoolIds: ['HLX-SCH-2026-101', 'HLX-SCH-2026-102', 'HLX-SCH-2026-103', 'HLX-SCH-2026-104']
  },
  {
    id: 'HLX-PROG-COMM-02',
    name: 'Weekend Public Speaking & Debate Mastery',
    durationDays: 6,
    targetAudience: 'Middle & Senior School Students (Grades 7 to 11)',
    teachingMethod: 'Stage simulations, impromptu speech drills, and moderated British Parliamentary debates',
    description: 'Focused intensive module for developing articulate voice, presence, and argumentative structure.',
    capacity: 80,
    enrolledCount: 54,
    mode: 'Offline',
    status: 'Completed',
    startDate: '2026-10-05',
    assignedSchoolIds: ['HLX-SCH-2026-101', 'HLX-SCH-2026-103']
  },
  {
    id: 'HLX-PROG-LEAD-03',
    name: 'Junior Leaders & Innovation Lab',
    durationDays: 10,
    targetAudience: 'Junior & Middle School (Grades 5 to 8)',
    teachingMethod: 'Design Thinking sprints, empathy walks, and collaborative Lego prototyping',
    description: 'Nurturing curiosity, team responsibility, empathy, and creative problem solving early in school life.',
    capacity: 100,
    enrolledCount: 42,
    mode: 'Online',
    status: 'Upcoming',
    startDate: '2026-11-20',
    assignedSchoolIds: ['HLX-SCH-2026-102', 'HLX-SCH-2026-104']
  }
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'HLX-CERT-2026-8821',
    studentId: 'HLX-STU-2026-1001',
    studentName: 'Aarav Sharma',
    schoolName: 'Delhi Public School, R.K. Puram',
    programName: '14-Day Student Development Program',
    grade: 'Grade A+ (Distinction in Public Speaking)',
    score: 96,
    completionDate: '2026-10-25',
    issuedDate: '2026-10-26',
    status: 'Issued',
    verifierHash: 'e7f8c12a9d04b'
  },
  {
    id: 'HLX-CERT-2026-7419',
    studentId: 'HLX-STU-2026-1002',
    studentName: 'Diya Nair',
    schoolName: 'National Public School, Indiranagar',
    programName: '14-Day Student Development Program',
    grade: 'Grade A (Distinction in Critical Thinking)',
    score: 92,
    completionDate: '2026-10-25',
    issuedDate: '2026-10-26',
    status: 'Issued',
    verifierHash: 'b4a1f89c02d1e'
  },
  {
    id: 'HLX-CERT-2026-6105',
    studentId: 'HLX-STU-2026-1003',
    studentName: 'Rohan Mehta',
    schoolName: 'The Cathedral & John Connon School',
    programName: '14-Day Student Development Program',
    grade: 'Grade A (Excellence in Leadership & Collaboration)',
    score: 89,
    completionDate: '2026-10-28',
    issuedDate: '2026-10-29',
    status: 'Issued',
    verifierHash: 'c9d2a45e77f01'
  }
];

const INITIAL_STUDENTS: Student[] = [
  {
    id: 'HLX-STU-2026-1001',
    name: 'Aarav Sharma',
    schoolId: 'HLX-SCH-2026-101',
    schoolName: 'Delhi Public School, R.K. Puram',
    grade: 'Class 9',
    section: 'B',
    parentName: 'Vikram Sharma',
    parentContact: '+91 98101 23456',
    email: 'vikram.sharma@example.com',
    city: 'New Delhi',
    state: 'Delhi',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Certified',
    attendanceDays: 14,
    assessmentScore: 96,
    assessmentFeedback: 'Outstanding vocal delivery, active team leadership, and exemplary capstone portfolio.',
    registeredAt: '2026-10-01T09:00:00Z',
    certificateId: 'HLX-CERT-2026-8821',
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1002',
    name: 'Diya Nair',
    schoolId: 'HLX-SCH-2026-102',
    schoolName: 'National Public School, Indiranagar',
    grade: 'Class 10',
    section: 'A',
    parentName: 'Radhika Nair',
    parentContact: '+91 98451 98765',
    email: 'radhika.nair@example.com',
    city: 'Bengaluru',
    state: 'Karnataka',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Certified',
    attendanceDays: 14,
    assessmentScore: 92,
    assessmentFeedback: 'Demonstrated superb critical analysis in fake news debates and high emotional intelligence.',
    registeredAt: '2026-10-02T11:15:00Z',
    certificateId: 'HLX-CERT-2026-7419',
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1003',
    name: 'Rohan Mehta',
    schoolId: 'HLX-SCH-2026-103',
    schoolName: 'The Cathedral & John Connon School',
    grade: 'Class 8',
    section: 'C',
    parentName: 'Sunil Mehta',
    parentContact: '+91 98205 11223',
    email: 'sunil.mehta@example.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Certified',
    attendanceDays: 14,
    assessmentScore: 89,
    assessmentFeedback: 'Natural consensus builder. Led the marshmallow tower project and spoke with conviction.',
    registeredAt: '2026-10-03T14:40:00Z',
    certificateId: 'HLX-CERT-2026-6105',
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1004',
    name: 'Ananya Reddy',
    schoolId: 'HLX-SCH-2026-104',
    schoolName: 'Oakridge International School, Gachibowli',
    grade: 'Class 10',
    section: 'B',
    parentName: 'Kishore Reddy',
    parentContact: '+91 99891 22334',
    email: 'kishore.reddy@example.com',
    city: 'Hyderabad',
    state: 'Telangana',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Completed',
    attendanceDays: 14,
    assessmentScore: undefined, // Pending assessment!
    assessmentFeedback: 'Completed all 14 workshop days with full participation. Awaiting final jury rubric score.',
    registeredAt: '2026-10-10T10:10:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1005',
    name: 'Kabir Sengupta',
    schoolId: 'HLX-SCH-2026-101',
    schoolName: 'Delhi Public School, R.K. Puram',
    grade: 'Class 9',
    section: 'A',
    parentName: 'Maitreyi Sengupta',
    parentContact: '+91 98110 99887',
    email: 'm.sengupta@example.com',
    city: 'New Delhi',
    state: 'Delhi',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Completed',
    attendanceDays: 13,
    assessmentScore: undefined, // Pending assessment!
    assessmentFeedback: 'High engagement in digital awareness and problem-solving modules. Capstone project submitted.',
    registeredAt: '2026-10-12T12:00:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1006',
    name: 'Tanvi Deshmukh',
    schoolId: 'HLX-SCH-2026-106',
    schoolName: 'Symbiosis International School, Viman Nagar',
    grade: 'Class 7',
    section: 'D',
    parentName: 'Prashant Deshmukh',
    parentContact: '+91 97650 44556',
    email: 'prashant.d@example.com',
    city: 'Pune',
    state: 'Maharashtra',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'In Progress',
    attendanceDays: 9,
    assessmentScore: undefined,
    assessmentFeedback: '',
    registeredAt: '2026-10-25T15:20:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1007',
    name: 'Siddharth Iyer',
    schoolId: 'HLX-SCH-2026-102',
    schoolName: 'National Public School, Indiranagar',
    grade: 'Class 11',
    section: 'C',
    parentName: 'Ganesh Iyer',
    parentContact: '+91 98452 33445',
    email: 'ganesh.iyer@example.com',
    city: 'Bengaluru',
    state: 'Karnataka',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'In Progress',
    attendanceDays: 8,
    assessmentScore: undefined,
    assessmentFeedback: '',
    registeredAt: '2026-10-26T16:05:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1008',
    name: 'Zoya Khan',
    schoolId: 'HLX-SCH-2026-103',
    schoolName: 'The Cathedral & John Connon School',
    grade: 'Class 6',
    section: 'A',
    parentName: 'Farhan Khan',
    parentContact: '+91 98201 77889',
    email: 'farhan.khan@example.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Enrolled',
    attendanceDays: 0,
    assessmentScore: undefined,
    assessmentFeedback: '',
    registeredAt: '2026-10-30T11:10:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1009',
    name: 'Pranav Joshi',
    schoolId: 'HLX-SCH-2026-105',
    schoolName: 'DAV Boys Senior Secondary School',
    grade: 'Class 8',
    section: 'B',
    parentName: 'Meena Joshi',
    parentContact: '+91 94441 55667',
    email: 'meena.joshi@example.com',
    city: 'Chennai',
    state: 'Tamil Nadu',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Pending',
    attendanceDays: 0,
    assessmentScore: undefined,
    assessmentFeedback: '',
    registeredAt: '2026-11-04T09:30:00Z',
    certificateId: undefined,
    parentConsent: true
  },
  {
    id: 'HLX-STU-2026-1010',
    name: 'Meera Chawla',
    schoolId: 'HLX-SCH-2026-101',
    schoolName: 'Delhi Public School, R.K. Puram',
    grade: 'Class 7',
    section: 'C',
    parentName: 'Naveen Chawla',
    parentContact: '+91 98118 77665',
    email: 'n.chawla@example.com',
    city: 'New Delhi',
    state: 'Delhi',
    programId: 'HLX-PROG-14D-01',
    programName: '14-Day Student Development Program',
    status: 'Pending',
    attendanceDays: 0,
    assessmentScore: undefined,
    assessmentFeedback: '',
    registeredAt: '2026-11-06T14:45:00Z',
    certificateId: undefined,
    parentConsent: true
  }
];

class HyperLearnXStore {
  private students: Student[] = [];
  private schools: School[] = [];
  private programs: Program[] = [];
  private certificates: Certificate[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedStudents = localStorage.getItem('hyperlearnx_students_v1');
      const storedSchools = localStorage.getItem('hyperlearnx_schools_v1');
      const storedPrograms = localStorage.getItem('hyperlearnx_programs_v1');
      const storedCertificates = localStorage.getItem('hyperlearnx_certificates_v1');

      this.students = storedStudents ? JSON.parse(storedStudents) : INITIAL_STUDENTS;
      this.schools = storedSchools ? JSON.parse(storedSchools) : INITIAL_SCHOOLS;
      this.programs = storedPrograms ? JSON.parse(storedPrograms) : INITIAL_PROGRAMS;
      this.certificates = storedCertificates ? JSON.parse(storedCertificates) : INITIAL_CERTIFICATES;
    } catch {
      this.students = INITIAL_STUDENTS;
      this.schools = INITIAL_SCHOOLS;
      this.programs = INITIAL_PROGRAMS;
      this.certificates = INITIAL_CERTIFICATES;
    }
    this.persist();
  }

  private persist() {
    try {
      localStorage.setItem('hyperlearnx_students_v1', JSON.stringify(this.students));
      localStorage.setItem('hyperlearnx_schools_v1', JSON.stringify(this.schools));
      localStorage.setItem('hyperlearnx_programs_v1', JSON.stringify(this.programs));
      localStorage.setItem('hyperlearnx_certificates_v1', JSON.stringify(this.certificates));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public resetToDefaults() {
    this.students = [...INITIAL_STUDENTS];
    this.schools = [...INITIAL_SCHOOLS];
    this.programs = [...INITIAL_PROGRAMS];
    this.certificates = [...INITIAL_CERTIFICATES];
    this.persist();
  }

  // Getters
  public getStudents(): Student[] {
    return [...this.students];
  }

  public getSchools(): School[] {
    return [...this.schools];
  }

  public getPrograms(): Program[] {
    return [...this.programs];
  }

  public getCertificates(): Certificate[] {
    return [...this.certificates];
  }

  public getStudentById(id: string): Student | undefined {
    return this.students.find(s => s.id.toLowerCase() === id.trim().toLowerCase());
  }

  public getSchoolById(id: string): School | undefined {
    return this.schools.find(s => s.id.toLowerCase() === id.trim().toLowerCase());
  }

  public getCertificateById(id: string): Certificate | undefined {
    return this.certificates.find(c => c.id.toLowerCase() === id.trim().toLowerCase());
  }

  // Dynamic Dashboard Stats calculated from actual records
  public getDashboardStats(): CEODashboardStats {
    const totalRegisteredStudents = this.students.length;
    const totalRegisteredSchools = this.schools.length;
    const totalCertifiedStudents = this.students.filter(s => s.status === 'Certified').length;
    const studentsCurrentlyEnrolled = this.students.filter(s => s.status === 'Enrolled' || s.status === 'In Progress').length;
    const studentsAwaitingApproval = this.students.filter(s => s.status === 'Pending').length;
    const studentsWhoCompletedTraining = this.students.filter(s => s.status === 'Completed' || s.status === 'Certified').length;
    const studentsPendingAssessment = this.students.filter(s => s.status === 'Completed' && (!s.assessmentScore || s.assessmentScore === 0)).length;
    const totalProgramsConducted = this.programs.length;

    return {
      totalRegisteredStudents,
      totalRegisteredSchools,
      totalCertifiedStudents,
      studentsCurrentlyEnrolled,
      studentsAwaitingApproval,
      studentsWhoCompletedTraining,
      studentsPendingAssessment,
      totalProgramsConducted
    };
  }

  // Student Actions
  public registerStudent(data: Omit<Student, 'id' | 'status' | 'attendanceDays' | 'registeredAt' | 'certificateId'>): Student {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `HLX-STU-2026-${randomSuffix}`;

    const newStudent: Student = {
      ...data,
      id: newId,
      status: 'Pending',
      attendanceDays: 0,
      registeredAt: new Date().toISOString()
    };

    this.students.unshift(newStudent);
    this.persist();
    return newStudent;
  }

  public updateStudentStatus(id: string, status: StudentStatus): void {
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.status = status;
      this.persist();
    }
  }

  public updateStudentProgress(
    id: string,
    updates: Partial<Pick<Student, 'attendanceDays' | 'assessmentScore' | 'assessmentFeedback' | 'status'>>
  ): void {
    const student = this.students.find(s => s.id === id);
    if (student) {
      if (updates.attendanceDays !== undefined) student.attendanceDays = updates.attendanceDays;
      if (updates.assessmentScore !== undefined) student.assessmentScore = updates.assessmentScore;
      if (updates.assessmentFeedback !== undefined) student.assessmentFeedback = updates.assessmentFeedback;
      if (updates.status !== undefined) student.status = updates.status;
      this.persist();
    }
  }

  // School Actions
  public registerSchool(data: Omit<School, 'id' | 'status' | 'registeredAt'>): School {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `HLX-SCH-2026-${randomSuffix}`;

    const newSchool: School = {
      ...data,
      id: newId,
      status: 'Pending',
      registeredAt: new Date().toISOString()
    };

    this.schools.unshift(newSchool);
    this.persist();
    return newSchool;
  }

  public updateSchoolStatus(id: string, status: SchoolStatus): void {
    const school = this.schools.find(s => s.id === id);
    if (school) {
      school.status = status;
      this.persist();
    }
  }

  // Certificate Management
  public issueCertificate(studentId: string, customScore?: number, customGrade?: string): Certificate | null {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return null;

    const certSuffix = Math.floor(1000 + Math.random() * 9000);
    const certId = `HLX-CERT-2026-${certSuffix}`;
    const score = customScore ?? student.assessmentScore ?? 90;
    const grade = customGrade ?? (score >= 90 ? 'Grade A+ (Distinction)' : score >= 80 ? 'Grade A' : 'Grade B+');
    const today = new Date().toISOString().split('T')[0];

    const newCert: Certificate = {
      id: certId,
      studentId: student.id,
      studentName: student.name,
      schoolName: student.schoolName,
      programName: student.programName || '14-Day Student Development Program',
      grade,
      score,
      completionDate: today,
      issuedDate: today,
      status: 'Issued',
      verifierHash: Math.random().toString(36).substring(2, 12)
    };

    this.certificates.unshift(newCert);
    student.certificateId = certId;
    student.status = 'Certified';
    student.assessmentScore = score;
    this.persist();

    return newCert;
  }

  // Program Management
  public addProgram(data: Omit<Program, 'id' | 'enrolledCount'>): Program {
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const newProg: Program = {
      ...data,
      id: `HLX-PROG-${randomSuffix}`,
      enrolledCount: 0
    };
    this.programs.unshift(newProg);
    this.persist();
    return newProg;
  }

  public updateProgram(id: string, updates: Partial<Program>): void {
    const prog = this.programs.find(p => p.id === id);
    if (prog) {
      Object.assign(prog, updates);
      this.persist();
    }
  }
}

export const store = new HyperLearnXStore();
