export type PipelineStage = 
  | 'lead' 
  | 'counseling' 
  | 'documents' 
  | 'application' 
  | 'offer' 
  | 'visa' 
  | 'departed';

export type LeadScore = 'hot' | 'warm' | 'cold';

export type UserRole = 'admin' | 'manager' | 'counselor' | 'doc_officer' | 'receptionist';

export interface User {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  assignedCountries: string[];
}

export type DocumentStatus = 'not_requested' | 'requested' | 'received' | 'verified' | 'rejected';

export interface StudentDocument {
  id: string;
  name: string;
  nameBn: string;
  category: 'academic' | 'identity' | 'financial' | 'language' | 'statement';
  status: DocumentStatus;
  isRequired: boolean;
  dueDate: string;
  uploadedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  virusScanned?: boolean;
  version: number;
}

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'conditional_offer' 
  | 'unconditional_offer' 
  | 'rejected' 
  | 'withdrawn';

export interface UniversityApplication {
  id: string;
  universityName: string;
  country: string;
  flag: string;
  program: string;
  degreeLevel: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  intake: string; // e.g. "Sep 2026", "Jan 2027"
  deadline: string;
  portalId?: string;
  appFee: number; // BDT
  appFeePaid: boolean;
  status: ApplicationStatus;
  tuitionPerYear: number; // in Foreign Currency e.g. GBP or USD
  currency: string;
  scholarshipAmount?: number;
  depositDeadline?: string;
  notes?: string;
}

export type VisaStatus = 
  | 'file_prepared' 
  | 'appointment_booked' 
  | 'biometrics_done' 
  | 'interview_scheduled' 
  | 'approved' 
  | 'refused';

export interface VisaCase {
  id: string;
  country: string;
  flag: string;
  vfsCenter: string; // e.g. "VFS Dhaka, Delta Life Tower" or "VFS Sylhet"
  casOrI20Number?: string;
  submissionDate?: string;
  appointmentDate?: string;
  interviewDate?: string;
  decisionDate?: string;
  status: VisaStatus;
  refusalReason?: string;
  canReapply?: boolean;
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  nameBn: string;
  phone: string;
  email: string;
  city: string;
  targetCountry: string;
  countryFlag: string;
  targetIntake: string;
  degreeLevel: string;
  stage: PipelineStage;
  daysInStage: number;
  leadScore: LeadScore;
  counselorId: string;
  counselorName: string;
  source: 'Facebook' | 'WhatsApp' | 'Walk-in' | 'Referral' | 'Website';
  ieltsScore?: string;
  budgetBDT: number;
  passportNumber: string; // Masked by default
  nidNumber: string; // Masked by default
  bankSolvencyBDT: number;
  whatsappConsent: boolean;
  createdDate: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  documents: StudentDocument[];
  applications: UniversityApplication[];
  visaCase?: VisaCase;
  notesCount: number;
  guardianName?: string;
  guardianPhone?: string;
  guardianRelation?: string;
  isStuck?: boolean;
}

export interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  counselorId: string;
  counselorName: string;
  date: string; // YYYY-MM-DD
  time: string; // "11:00 AM"
  durationMinutes: number;
  type: 'in_office' | 'phone' | 'zoom';
  locationOrLink: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  topic: string;
  notes?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'student' | 'counselor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  templateUsed?: string;
}

export interface WhatsAppConversation {
  id: string;
  studentId: string;
  studentName: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  assignedCounselorId: string;
  messages: WhatsAppMessage[];
}

export interface Task {
  id: string;
  title: string;
  titleBn: string;
  studentId?: string;
  studentName?: string;
  assignedToId: string;
  assignedToName: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category: 'follow_up' | 'document' | 'application' | 'visa' | 'general';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface ReminderRule {
  id: string;
  name: string;
  triggerDaysBefore: number;
  triggerOnDue: boolean;
  triggerIfOverdueDays: number;
  channel: 'whatsapp';
  templateEn: string;
  templateBn: string;
  enabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // e.g. "21:00"
    end: string;   // e.g. "09:00"
  };
}
