import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Student, 
  PipelineStage, 
  DocumentStatus, 
  Appointment, 
  Task, 
  WhatsAppConversation, 
  AuditLogEntry, 
  ReminderRule 
} from '../types';
import { 
  mockUsers, 
  mockStudents, 
  mockAppointments, 
  mockTasks, 
  mockWhatsAppConversations, 
  mockAuditLogs, 
  mockReminderRules,
  standardUkDocuments
} from '../data/mockData';
import { Language, translations } from '../i18n';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  students: Student[];
  appointments: Appointment[];
  tasks: Task[];
  conversations: WhatsAppConversation[];
  auditLogs: AuditLogEntry[];
  reminderRules: ReminderRule[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  isAddLeadOpen: boolean;
  setIsAddLeadOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isAutoReminderModalOpen: boolean;
  setIsAutoReminderModalOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  addStudent: (leadData: Partial<Student>) => Student;
  updateStudentStage: (studentId: string, newStage: PipelineStage) => void;
  updateDocumentStatus: (studentId: string, docId: string, status: DocumentStatus, reason?: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (aptId: string, status: Appointment['status']) => void;
  toggleTaskComplete: (taskId: string) => void;
  sendWhatsAppMessage: (studentId: string, text: string, templateUsed?: string) => void;
  logAudit: (action: string, details: string) => void;
  checkDuplicatePhone: (phone: string, excludeId?: string) => boolean;
  triggerConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[4]); // Default to Owner / Admin for full visibility
  const [users] = useState<User[]>(mockUsers);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [conversations, setConversations] = useState<WhatsAppConversation[]>(mockWhatsAppConversations);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [reminderRules, setReminderRules] = useState<ReminderRule[]>(mockReminderRules);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAutoReminderModalOpen, setIsAutoReminderModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = (key: keyof typeof translations['en']): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1EC1CB', '#FFFFFF', '#4ADE80', '#FBBF24']
    });
  };

  const logAudit = (action: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      details,
      ipAddress: '103.205.71.18 (Dhaka HQ)'
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const checkDuplicatePhone = (phone: string, excludeId?: string): boolean => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.length < 8) return false;
    return students.some((s) => s.id !== excludeId && s.phone.replace(/[^0-9]/g, '').includes(cleaned));
  };

  const addStudent = (leadData: Partial<Student>): Student => {
    const counselor = users.find((u) => u.id === leadData.counselorId) || users[0];
    const newStudent: Student = {
      id: `stu-${Date.now().toString().slice(-4)}`,
      name: leadData.name || 'New Student',
      nameBn: leadData.nameBn || leadData.name || 'নতুন শিক্ষার্থী',
      phone: leadData.phone || '+880 1700-000000',
      email: leadData.email || 'student@example.com',
      city: leadData.city || 'Dhaka',
      targetCountry: leadData.targetCountry || 'UK',
      countryFlag: leadData.targetCountry === 'UK' ? '🇬🇧' : leadData.targetCountry === 'Canada' ? '🇨🇦' : leadData.targetCountry === 'USA' ? '🇺🇸' : leadData.targetCountry === 'Australia' ? '🇦🇺' : leadData.targetCountry === 'Germany' ? '🇩🇪' : '🇲🇾',
      targetIntake: leadData.targetIntake || 'Jan 2027',
      degreeLevel: leadData.degreeLevel || 'Master',
      stage: 'lead',
      daysInStage: 1,
      leadScore: leadData.leadScore || 'warm',
      counselorId: counselor.id,
      counselorName: counselor.name,
      source: leadData.source || 'Facebook',
      budgetBDT: leadData.budgetBDT || 2500000,
      passportNumber: 'A0' + Math.floor(100000 + Math.random() * 900000),
      nidNumber: '199' + Math.floor(1000000000000 + Math.random() * 9000000000000),
      bankSolvencyBDT: (leadData.budgetBDT || 2500000) * 1.2,
      whatsappConsent: true,
      createdDate: new Date().toISOString().split('T')[0],
      lastContactDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      documents: standardUkDocuments.map(d => ({ ...d, status: 'not_requested' })),
      applications: [],
      notesCount: 1
    };

    setStudents((prev) => [newStudent, ...prev]);

    // Create an initial WhatsApp conversation
    const newConv: WhatsAppConversation = {
      id: `conv-${newStudent.id}`,
      studentId: newStudent.id,
      studentName: newStudent.name,
      phone: newStudent.phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      lastMessage: `Welcome to EduFlow! Lead assigned to ${counselor.name}.`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      assignedCounselorId: counselor.id,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'system',
          senderName: 'EduFlow System',
          text: `Welcome message queued: Assalamu Alaikum ${newStudent.name}, thank you for contacting EduFlow regarding study in ${newStudent.targetCountry}. Your counselor is ${counselor.name}.`,
          timestamp: 'Just now',
          status: 'sent',
          templateUsed: 'Welcome & Initial Counselor Intro'
        }
      ]
    };
    setConversations((prev) => [newConv, ...prev]);

    // Auto-create a welcome task
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: `Conduct initial profiling call with ${newStudent.name} (${newStudent.targetCountry})`,
      titleBn: `${newStudent.name} এর সাথে প্রাথমিক প্রোফাইলিং কল সম্পন্ন করুন`,
      studentId: newStudent.id,
      studentName: newStudent.name,
      assignedToId: counselor.id,
      assignedToName: counselor.name,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      completed: false,
      category: 'follow_up'
    };
    setTasks((prev) => [newTask, ...prev]);

    logAudit('CREATE_LEAD', `Registered new lead ${newStudent.name} (${newStudent.phone}) assigned to ${counselor.name}`);
    showToast(`Lead "${newStudent.name}" registered and assigned to ${counselor.name}!`, 'success');
    return newStudent;
  };

  const updateStudentStage = (studentId: string, newStage: PipelineStage) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const isStuck = false;
          return { ...s, stage: newStage, daysInStage: 1, isStuck };
        }
        return s;
      })
    );

    const student = students.find((s) => s.id === studentId);
    if (student) {
      logAudit('STAGE_TRANSITION', `Moved student ${student.name} to stage: ${newStage.toUpperCase()}`);
      if (newStage === 'visa' || newStage === 'departed') {
        triggerConfetti();
        showToast(`🎉 Milestone! ${student.name} moved to ${newStage.toUpperCase()}!`, 'success');
      } else {
        showToast(`Student ${student.name} moved to ${newStage.toUpperCase()}`, 'info');
      }

      // Auto-create next task based on new stage
      if (newStage === 'documents') {
        setTasks((prev) => [
          {
            id: `task-${Date.now()}`,
            title: `Issue mandatory checklist & 28-day bank holding instructions to ${student.name}`,
            titleBn: `${student.name} কে চেকলিস্ট ও ব্যাংক স্টেটমেন্ট নির্দেশিকা প্রদান করুন`,
            studentId: student.id,
            studentName: student.name,
            assignedToId: student.counselorId,
            assignedToName: student.counselorName,
            dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            priority: 'high',
            completed: false,
            category: 'document'
          },
          ...prev
        ]);
      } else if (newStage === 'application') {
        setTasks((prev) => [
          {
            id: `task-${Date.now()}`,
            title: `Review SOP & prepare portal submission for ${student.name}`,
            titleBn: `${student.name} এর এসওপি রিভিউ ও পোর্টাল সাবমিশন প্রস্তুতি নিন`,
            studentId: student.id,
            studentName: student.name,
            assignedToId: student.counselorId,
            assignedToName: student.counselorName,
            dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
            priority: 'high',
            completed: false,
            category: 'application'
          },
          ...prev
        ]);
      }
    }
  };

  const updateDocumentStatus = (studentId: string, docId: string, status: DocumentStatus, reason?: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedDocs = s.documents.map((d) => {
            if (d.id === docId) {
              return {
                ...d,
                status,
                rejectionReason: reason || d.rejectionReason,
                verifiedBy: status === 'verified' ? currentUser.name : d.verifiedBy,
                verifiedAt: status === 'verified' ? new Date().toISOString().split('T')[0] : d.verifiedAt
              };
            }
            return d;
          });
          return { ...s, documents: updatedDocs };
        }
        return s;
      })
    );

    const student = students.find((s) => s.id === studentId);
    const doc = student?.documents.find((d) => d.id === docId);
    logAudit('DOCUMENT_STATUS_CHANGE', `Changed ${doc?.name || 'document'} to ${status.toUpperCase()} for ${student?.name}`);
    showToast(`Document status updated to "${status.replace('_', ' ').toUpperCase()}"`, 'info');
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    // Check for double booking
    const conflict = appointments.some(
      (a) =>
        a.counselorId === appointmentData.counselorId &&
        a.date === appointmentData.date &&
        a.time === appointmentData.time &&
        a.status === 'scheduled'
    );

    if (conflict) {
      showToast(`Conflict Warning: Counselor already has a scheduled slot at ${appointmentData.time}!`, 'warning');
      return;
    }

    const newApt: Appointment = {
      ...appointmentData,
      id: `apt-${Date.now().toString().slice(-4)}`
    };

    setAppointments((prev) => [newApt, ...prev]);

    // Send auto WhatsApp confirmation
    sendWhatsAppMessage(
      newApt.studentId,
      `Hello ${newApt.studentName}, your appointment with ${newApt.counselorName} is confirmed for ${newApt.date} at ${newApt.time} (${newApt.type.replace('_', ' ')}: ${newApt.locationOrLink}). Topic: ${newApt.topic}.`,
      'Appointment Confirmation'
    );

    logAudit('BOOK_APPOINTMENT', `Scheduled appointment with ${newApt.studentName} on ${newApt.date} at ${newApt.time}`);
    showToast(`Appointment booked successfully! WhatsApp confirmation sent.`, 'success');
  };

  const updateAppointmentStatus = (aptId: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status } : a))
    );
    logAudit('APPOINTMENT_UPDATE', `Updated appointment ${aptId} status to ${status}`);
    showToast(`Appointment marked as ${status.replace('_', ' ')}`, 'info');
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      showToast(`Task completed! Great job.`, 'success');
    }
  };

  const sendWhatsAppMessage = (studentId: string, text: string, templateUsed?: string) => {
    const student = students.find((s) => s.id === studentId);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConversations((prev) => {
      const existing = prev.find((c) => c.studentId === studentId);
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: 'counselor' as const,
        senderName: currentUser.name,
        text,
        timestamp: timeStr,
        status: 'sent' as const,
        templateUsed
      };

      if (existing) {
        return prev.map((c) => {
          if (c.studentId === studentId) {
            return {
              ...c,
              lastMessage: text,
              lastMessageTime: timeStr,
              messages: [...c.messages, newMsg]
            };
          }
          return c;
        });
      } else if (student) {
        return [
          {
            id: `conv-${student.id}`,
            studentId: student.id,
            studentName: student.name,
            phone: student.phone,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            lastMessage: text,
            lastMessageTime: timeStr,
            unreadCount: 0,
            assignedCounselorId: student.counselorId,
            messages: [newMsg]
          },
          ...prev
        ];
      }
      return prev;
    });

    logAudit('WHATSAPP_SENT', `Sent WhatsApp message to ${student?.name || studentId}${templateUsed ? ` [${templateUsed}]` : ''}`);
    showToast(`WhatsApp sent to ${student?.name || 'student'}`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        currentUser,
        setCurrentUser,
        users,
        students,
        appointments,
        tasks,
        conversations,
        auditLogs,
        reminderRules,
        activeTab,
        setActiveTab,
        selectedStudentId,
        setSelectedStudentId,
        isAddLeadOpen,
        setIsAddLeadOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isAutoReminderModalOpen,
        setIsAutoReminderModalOpen,
        toasts,
        showToast,
        addStudent,
        updateStudentStage,
        updateDocumentStatus,
        addAppointment,
        updateAppointmentStatus,
        toggleTaskComplete,
        sendWhatsAppMessage,
        logAudit,
        checkDuplicatePhone,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
