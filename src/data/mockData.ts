import { 
  User, 
  Student, 
  Appointment, 
  WhatsAppConversation, 
  Task, 
  AuditLogEntry, 
  ReminderRule, 
  StudentDocument 
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Shamim Reza',
    nameBn: 'শামীম রেজা',
    email: 'shamim.reza@eduflow.bd',
    role: 'counselor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1711-234567',
    assignedCountries: ['UK', 'Canada']
  },
  {
    id: 'user-2',
    name: 'Sumaiya Tabassum',
    nameBn: 'সুমাইয়া তাবাসসুম',
    email: 'sumaiya.t@eduflow.bd',
    role: 'counselor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1819-876543',
    assignedCountries: ['USA', 'Australia']
  },
  {
    id: 'user-3',
    name: 'Ariful Islam',
    nameBn: 'আরিফুল ইসলাম',
    email: 'ariful.i@eduflow.bd',
    role: 'doc_officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1912-345678',
    assignedCountries: ['Germany', 'UK', 'Australia']
  },
  {
    id: 'user-4',
    name: 'Nabila Hossain',
    nameBn: 'নাবিলা হোসেন',
    email: 'nabila.h@eduflow.bd',
    role: 'counselor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1610-998877',
    assignedCountries: ['Malaysia', 'Japan', 'Canada']
  },
  {
    id: 'user-admin',
    name: 'Kazi Mahfuzur Rahman (Owner)',
    nameBn: 'কাজী মাহফুজুর রহমান (মালিক)',
    email: 'director@eduflow.bd',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1700-112233',
    assignedCountries: ['All']
  },
  {
    id: 'user-recp',
    name: 'Farzana Haque',
    nameBn: 'ফারজানা হক',
    email: 'reception@eduflow.bd',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+880 1521-445566',
    assignedCountries: ['All']
  }
];

export const standardUkDocuments: StudentDocument[] = [
  {
    id: 'doc-1',
    name: 'Passport (Current & Valid)',
    nameBn: 'বৈধ মূল পাসপোর্ট',
    category: 'identity',
    status: 'verified',
    isRequired: true,
    dueDate: '2026-10-15',
    uploadedAt: '2026-09-20',
    verifiedAt: '2026-09-21',
    verifiedBy: 'Ariful Islam',
    fileName: 'Passport_TanvirAhmed_Scan.pdf',
    fileSize: '2.4 MB',
    virusScanned: true,
    version: 1
  },
  {
    id: 'doc-2',
    name: 'SSC & HSC Transcripts & Certificates',
    nameBn: 'এসএসসি ও এইচএসসি মূল মার্কশিট ও সনদ',
    category: 'academic',
    status: 'verified',
    isRequired: true,
    dueDate: '2026-10-15',
    uploadedAt: '2026-09-22',
    verifiedAt: '2026-09-23',
    verifiedBy: 'Ariful Islam',
    fileName: 'Academic_Transcripts_Certified.pdf',
    fileSize: '4.8 MB',
    virusScanned: true,
    version: 1
  },
  {
    id: 'doc-3',
    name: 'IELTS / PTE Academic TRF (Overall 6.5+)',
    nameBn: 'আইইএলটিএস অথবা পিটিই স্কোর শিট',
    category: 'language',
    status: 'received',
    isRequired: true,
    dueDate: '2026-10-20',
    uploadedAt: '2026-09-28',
    fileName: 'IELTS_TRF_Band7.0.pdf',
    fileSize: '1.1 MB',
    virusScanned: true,
    version: 1
  },
  {
    id: 'doc-4',
    name: 'Statement of Purpose (SOP / Personal Statement)',
    nameBn: 'উদ্দেশ্যের বিবৃতি (এসওপি / পার্সোনাল স্টেটমেন্ট)',
    category: 'statement',
    status: 'requested',
    isRequired: true,
    dueDate: '2026-10-10', // soon
    version: 0
  },
  {
    id: 'doc-5',
    name: 'Two Academic Recommendation Letters (LOR)',
    nameBn: 'দুটি একাডেমিক প্রশংসাপত্র (এলওআর)',
    category: 'academic',
    status: 'requested',
    isRequired: true,
    dueDate: '2026-10-12',
    version: 0
  },
  {
    id: 'doc-6',
    name: '6-Month Bank Solvency & Statement (28-Day Holding)',
    nameBn: '৬ মাসের ব্যাংক সলভেন্সি ও স্টেটমেন্ট (২৮ দিন হোল্ডিং)',
    category: 'financial',
    status: 'requested',
    isRequired: true,
    dueDate: '2026-10-05', // Overdue!
    version: 0
  },
  {
    id: 'doc-7',
    name: 'Sponsor Affidavit & Relationship Proof',
    nameBn: 'স্পনসর এফিডেভিট ও পারিবারিক সম্পর্ক সনদ',
    category: 'financial',
    status: 'not_requested',
    isRequired: true,
    dueDate: '2026-11-01',
    version: 0
  },
  {
    id: 'doc-8',
    name: 'Police Clearance Certificate',
    nameBn: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
    category: 'identity',
    status: 'not_requested',
    isRequired: false,
    dueDate: '2026-11-15',
    version: 0
  }
];

export const mockStudents: Student[] = [
  // 1. Tanvir Ahmed (Documents Stage - Stuck on Bank Solvency)
  {
    id: 'stu-101',
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    phone: '+880 1712-889900',
    email: 'tanvir.ahmed99@gmail.com',
    city: 'Dhaka (Dhanmondi)',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'Master of Science (MSc)',
    stage: 'documents',
    daysInStage: 16,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Facebook',
    ieltsScore: '7.0 (L:7.5, R:7.0, W:6.5, S:6.5)',
    budgetBDT: 2800000,
    passportNumber: 'A08931294',
    nidNumber: '1998269123400018',
    bankSolvencyBDT: 3450000,
    whatsappConsent: true,
    createdDate: '2026-08-12',
    lastContactDate: '2026-09-28',
    nextFollowUpDate: '2026-10-01',
    documents: [
      {
        id: 'doc-101-1',
        name: 'Passport (Current & Valid)',
        nameBn: 'বৈধ মূল পাসপোর্ট',
        category: 'identity',
        status: 'verified',
        isRequired: true,
        dueDate: '2026-10-15',
        uploadedAt: '2026-09-20',
        verifiedAt: '2026-09-21',
        verifiedBy: 'Ariful Islam',
        fileName: 'Passport_TanvirAhmed_Scan.pdf',
        fileSize: '2.4 MB',
        virusScanned: true,
        version: 1
      },
      {
        id: 'doc-101-2',
        name: '6-Month Bank Solvency & Statement (28-Day Holding)',
        nameBn: '৬ মাসের ব্যাংক সলভেন্সি ও স্টেটমেন্ট (২৮ দিন হোল্ডিং)',
        category: 'financial',
        status: 'requested',
        isRequired: true,
        dueDate: '2026-10-05',
        version: 0
      }
    ],
    applications: [
      {
        id: 'app-101',
        universityName: 'Coventry University',
        country: 'UK',
        flag: '🇬🇧',
        program: 'MSc Data Science & AI',
        degreeLevel: 'Master',
        intake: 'Jan 2027',
        deadline: '2026-11-15',
        portalId: 'COV-2026-8819',
        appFee: 0,
        appFeePaid: true,
        status: 'draft',
        tuitionPerYear: 18200,
        currency: 'GBP',
        scholarshipAmount: 2500,
        notes: 'Waiting for Bank Solvency 28-day holding statement'
      }
    ],
    notesCount: 8,
    guardianName: 'Dr. Rafiqul Ahmed (Father)',
    guardianPhone: '+880 1711-554433',
    guardianRelation: 'Father (Sponsor)',
    isStuck: true
  },

  // 2. Nusrat Jahan (Offer Stage - Comparing 2 offers!)
  {
    id: 'stu-102',
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    phone: '+880 1814-776655',
    email: 'nusrat.jahan.cse@gmail.com',
    city: 'Chattogram (Nasirabad)',
    targetCountry: 'Canada',
    countryFlag: '🇨🇦',
    targetIntake: 'Jan 2027',
    degreeLevel: 'Postgraduate Diploma',
    stage: 'offer',
    daysInStage: 4,
    leadScore: 'hot',
    counselorId: 'user-4',
    counselorName: 'Nabila Hossain',
    source: 'Walk-in',
    ieltsScore: '7.5 (L:8.0, R:7.5, W:7.0, S:7.0)',
    budgetBDT: 3200000,
    passportNumber: 'B01928374',
    nidNumber: '1999269145600021',
    bankSolvencyBDT: 4100000,
    whatsappConsent: true,
    createdDate: '2026-07-20',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-02',
    documents: [
      {
        id: 'doc-102-1',
        name: 'SSC & HSC Transcripts & Certificates',
        nameBn: 'একাডেমিক সনদ ও মার্কশিট',
        category: 'academic',
        status: 'verified',
        isRequired: true,
        dueDate: '2026-08-01',
        uploadedAt: '2026-07-25',
        verifiedAt: '2026-07-26',
        verifiedBy: 'Ariful Islam',
        fileName: 'Nusrat_Transcripts.pdf',
        fileSize: '3.1 MB',
        virusScanned: true,
        version: 1
      },
      {
        id: 'doc-102-2',
        name: 'IELTS Academic TRF (Overall 7.5)',
        nameBn: 'আইইএলটিএস সনদ',
        category: 'language',
        status: 'received',
        isRequired: true,
        dueDate: '2026-08-01',
        uploadedAt: '2026-07-25',
        fileName: 'IELTS_TRF_Nusrat.pdf',
        fileSize: '1.2 MB',
        virusScanned: true,
        version: 1
      }
    ],
    applications: [
      {
        id: 'app-201',
        universityName: 'Seneca Polytechnic College',
        country: 'Canada',
        flag: '🇨🇦',
        program: 'Post-Grad Cyber Security & Threat Management',
        degreeLevel: 'Diploma',
        intake: 'Jan 2027',
        deadline: '2026-10-30',
        portalId: 'SENECA-94810',
        appFee: 11000,
        appFeePaid: true,
        status: 'unconditional_offer',
        tuitionPerYear: 17800,
        currency: 'CAD',
        scholarshipAmount: 1500,
        depositDeadline: '2026-10-15',
        notes: 'Deposit deadline is approaching. Need $2,500 CAD tuition deposit.'
      },
      {
        id: 'app-202',
        universityName: 'Conestoga College',
        country: 'Canada',
        flag: '🇨🇦',
        program: 'Applied Network Infrastructure',
        degreeLevel: 'Diploma',
        intake: 'Jan 2027',
        deadline: '2026-10-25',
        portalId: 'CON-77218',
        appFee: 11500,
        appFeePaid: true,
        status: 'conditional_offer',
        tuitionPerYear: 16900,
        currency: 'CAD',
        scholarshipAmount: 2000,
        depositDeadline: '2026-10-20'
      }
    ],
    notesCount: 14,
    guardianName: 'Kabir Jahan (Uncle / Sponsor)',
    guardianPhone: '+880 1819-332211',
    guardianRelation: 'Uncle'
  },

  // 3. Rafiul Islam (Visa Stage - Interview this week!)
  {
    id: 'stu-103',
    name: 'Rafiul Islam',
    nameBn: 'রাফিউল ইসলাম',
    phone: '+880 1913-445566',
    email: 'rafiul.usa2026@outlook.com',
    city: 'Sylhet (Zindabazar)',
    targetCountry: 'USA',
    countryFlag: '🇺🇸',
    targetIntake: 'Jan 2027',
    degreeLevel: 'Bachelor of Science',
    stage: 'visa',
    daysInStage: 9,
    leadScore: 'hot',
    counselorId: 'user-2',
    counselorName: 'Sumaiya Tabassum',
    source: 'Referral',
    ieltsScore: 'SAT 1340, Duolingo 125',
    budgetBDT: 4500000,
    passportNumber: 'A19482012',
    nidNumber: '2001912847000034',
    bankSolvencyBDT: 5800000,
    whatsappConsent: true,
    createdDate: '2026-06-10',
    lastContactDate: '2026-09-30',
    nextFollowUpDate: '2026-10-01',
    documents: [
      {
        id: 'doc-103-1',
        name: 'US DS-160 Confirmation Page',
        nameBn: 'ডিএস-১৬০ কনফার্মেশন',
        category: 'identity',
        status: 'verified',
        isRequired: true,
        dueDate: '2026-09-10',
        uploadedAt: '2026-09-08',
        verifiedAt: '2026-09-09',
        verifiedBy: 'Ariful Islam',
        fileName: 'DS160_Confirmation_Rafiul.pdf',
        fileSize: '1.4 MB',
        virusScanned: true,
        version: 1
      },
      {
        id: 'doc-103-2',
        name: 'Sponsor CA Valuation & Income Tax Certificate',
        nameBn: 'সিএ ভ্যালুয়েশন ও ট্যাক্স রিটার্ন',
        category: 'financial',
        status: 'requested',
        isRequired: true,
        dueDate: '2026-09-12',
        version: 0
      }
    ],
    applications: [
      {
        id: 'app-301',
        universityName: 'University of Texas at Arlington',
        country: 'USA',
        flag: '🇺🇸',
        program: 'BSc Computer Science',
        degreeLevel: 'Bachelor',
        intake: 'Jan 2027',
        deadline: '2026-08-01',
        portalId: 'UTA-991204',
        appFee: 10500,
        appFeePaid: true,
        status: 'unconditional_offer',
        tuitionPerYear: 28500,
        currency: 'USD',
        scholarshipAmount: 8000,
        notes: 'In-state tuition waiver granted!'
      }
    ],
    visaCase: {
      id: 'visa-301',
      country: 'USA',
      flag: '🇺🇸',
      vfsCenter: 'US Embassy Dhaka, Madani Avenue',
      casOrI20Number: 'N0038491204',
      submissionDate: '2026-09-15',
      appointmentDate: '2026-10-04',
      interviewDate: '2026-10-04',
      status: 'interview_scheduled',
      notes: 'Mock interview conducted yesterday. Re-run financial questions tomorrow at 3 PM.'
    },
    notesCount: 19,
    guardianName: 'Md. Nazrul Islam (Father)',
    guardianPhone: '+880 1711-998877',
    guardianRelation: 'Father'
  },

  // 4. Sadia Akter (Application Stage - Submitted to Deakin)
  {
    id: 'stu-104',
    name: 'Sadia Akter',
    nameBn: 'সাদিয়া আক্তার',
    phone: '+880 1612-334455',
    email: 'sadia.akter.bba@gmail.com',
    city: 'Dhaka (Uttara)',
    targetCountry: 'Australia',
    countryFlag: '🇦🇺',
    targetIntake: 'Feb 2027',
    degreeLevel: 'Master of Professional Accounting',
    stage: 'application',
    daysInStage: 7,
    leadScore: 'hot',
    counselorId: 'user-2',
    counselorName: 'Sumaiya Tabassum',
    source: 'Website',
    ieltsScore: 'PTE Academic 68 (No band less than 65)',
    budgetBDT: 3800000,
    passportNumber: 'A09482103',
    nidNumber: '1997269188000045',
    bankSolvencyBDT: 4800000,
    whatsappConsent: true,
    createdDate: '2026-08-01',
    lastContactDate: '2026-09-27',
    nextFollowUpDate: '2026-10-03',
    documents: [
      {
        id: 'doc-104-1',
        name: 'Statement of Purpose (SOP / Personal Statement)',
        nameBn: 'উদ্দেশ্যের বিবৃতি (এসওপি / পার্সোনাল স্টেটমেন্ট)',
        category: 'statement',
        status: 'received',
        isRequired: true,
        dueDate: '2026-10-10',
        uploadedAt: '2026-09-28',
        fileName: 'SOP_Sadia_Deakin.docx',
        fileSize: '0.5 MB',
        virusScanned: true,
        version: 1
      },
      {
        id: 'doc-104-2',
        name: 'Two Academic Recommendation Letters (LOR)',
        nameBn: 'দুটি একাডেমিক প্রশংসাপত্র (এলওআর)',
        category: 'academic',
        status: 'requested',
        isRequired: true,
        dueDate: '2026-10-12',
        version: 0
      }
    ],
    applications: [
      {
        id: 'app-401',
        universityName: 'Deakin University, Melbourne',
        country: 'Australia',
        flag: '🇦🇺',
        program: 'Master of International Finance & Accounting',
        degreeLevel: 'Master',
        intake: 'Feb 2027',
        deadline: '2026-11-30',
        portalId: 'DEAKIN-74912',
        appFee: 8500,
        appFeePaid: true,
        status: 'under_review',
        tuitionPerYear: 37500,
        currency: 'AUD',
        scholarshipAmount: 7500,
        notes: 'Submitted via StudyLink agent portal'
      }
    ],
    notesCount: 6
  },

  // 5. Fahim Muntasir (Lead Stage - Fresh inquiry from Facebook ad)
  {
    id: 'stu-105',
    name: 'Fahim Muntasir',
    nameBn: 'ফাহিম মুনতাসির',
    phone: '+880 1718-223344',
    email: 'fahim.muntasir.du@gmail.com',
    city: 'Dhaka (Mirpur 10)',
    targetCountry: 'Germany',
    countryFlag: '🇩🇪',
    targetIntake: 'Summer 2027',
    degreeLevel: 'MSc Mechanical Engineering (English Taught)',
    stage: 'lead',
    daysInStage: 2,
    leadScore: 'warm',
    counselorId: 'user-3',
    counselorName: 'Ariful Islam',
    source: 'Facebook',
    ieltsScore: '6.5 (Appearing GRE in Nov)',
    budgetBDT: 1500000,
    passportNumber: 'A18294719',
    nidNumber: '1998269123400099',
    bankSolvencyBDT: 1800000,
    whatsappConsent: true,
    createdDate: '2026-09-28',
    lastContactDate: '2026-09-28',
    nextFollowUpDate: '2026-09-30',
    documents: [
      {
        id: 'doc-105-1',
        name: 'German APS Certificate Application',
        nameBn: 'জার্মান এপিএস সনদ আবেদন',
        category: 'academic',
        status: 'not_requested',
        isRequired: true,
        dueDate: '2026-11-01',
        version: 0
      }
    ],
    applications: [],
    notesCount: 2
  },

  // 6. Ishrat Zahan (Counseling Stage - Booked in-office consultation)
  {
    id: 'stu-106',
    name: 'Ishrat Zahan',
    nameBn: 'ইশরাত জাহান',
    phone: '+880 1811-990011',
    email: 'ishrat.zahan.buet@gmail.com',
    city: 'Dhaka (Banani)',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'MSc Sustainable Architecture',
    stage: 'counseling',
    daysInStage: 5,
    leadScore: 'warm',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'WhatsApp',
    ieltsScore: '7.5 (L:8.5, R:8.0, W:7.0, S:7.0)',
    budgetBDT: 3100000,
    passportNumber: 'B18294012',
    nidNumber: '1999269188000078',
    bankSolvencyBDT: 3900000,
    whatsappConsent: true,
    createdDate: '2026-09-25',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-01',
    documents: [
      {
        id: 'doc-106-1',
        name: 'Bachelor Degree Certificate & Transcripts',
        nameBn: 'স্নাতক সনদ ও মার্কশিট',
        category: 'academic',
        status: 'received',
        isRequired: true,
        dueDate: '2026-10-15',
        uploadedAt: '2026-09-29',
        fileName: 'BUET_BSc_Certificates.pdf',
        fileSize: '3.8 MB',
        virusScanned: true,
        version: 1
      }
    ],
    applications: [],
    notesCount: 3
  },

  // 7. Abrar Fahim (Departed - Flying to Heathrow)
  {
    id: 'stu-107',
    name: 'Abrar Fahim',
    nameBn: 'আবরার ফাহিম',
    phone: '+880 1715-667788',
    email: 'abrar.fahim.manc@gmail.com',
    city: 'Rajshahi',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Sep 2026',
    degreeLevel: 'BSc Software Engineering',
    stage: 'departed',
    daysInStage: 12,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Referral',
    ieltsScore: '6.5',
    budgetBDT: 2600000,
    passportNumber: 'A07391823',
    nidNumber: '2000269188000012',
    bankSolvencyBDT: 3200000,
    whatsappConsent: true,
    createdDate: '2026-04-10',
    lastContactDate: '2026-09-26',
    nextFollowUpDate: '2026-10-10',
    documents: [
      {
        id: 'doc-107-1',
        name: 'UK TB Test Medical Clearance Certificate',
        nameBn: 'টিবি টেস্ট মেডিকেল সনদ',
        category: 'identity',
        status: 'verified',
        isRequired: true,
        dueDate: '2026-08-05',
        uploadedAt: '2026-08-04',
        verifiedAt: '2026-08-05',
        verifiedBy: 'Ariful Islam',
        fileName: 'IOM_TB_Clearance_Abrar.pdf',
        fileSize: '1.6 MB',
        virusScanned: true,
        version: 1
      }
    ],
    applications: [
      {
        id: 'app-701',
        universityName: 'Manchester Metropolitan University',
        country: 'UK',
        flag: '🇬🇧',
        program: 'BSc (Hons) Software Engineering',
        degreeLevel: 'Bachelor',
        intake: 'Sep 2026',
        deadline: '2026-07-30',
        portalId: 'MMU-19482',
        appFee: 0,
        appFeePaid: true,
        status: 'unconditional_offer',
        tuitionPerYear: 16500,
        currency: 'GBP',
        scholarshipAmount: 3000
      }
    ],
    visaCase: {
      id: 'visa-701',
      country: 'UK',
      flag: '🇬🇧',
      vfsCenter: 'VFS Sylhet',
      casOrI20Number: 'E4G8K91829',
      submissionDate: '2026-08-10',
      appointmentDate: '2026-08-15',
      decisionDate: '2026-08-28',
      status: 'approved',
      notes: 'Visa approved in 13 working days! BRP collection letter generated.'
    },
    notesCount: 22
  },

  // 8. Sabrina Sultana (Visa Stage - Biometrics Done)
  {
    id: 'stu-108',
    name: 'Sabrina Sultana',
    nameBn: 'সাবরিনা সুলতানা',
    phone: '+880 1817-554433',
    email: 'sabrina.sultana99@yahoo.com',
    city: 'Sylhet (Amberkhana)',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'Master of Public Health (MPH)',
    stage: 'visa',
    daysInStage: 6,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Walk-in',
    ieltsScore: '7.0',
    budgetBDT: 2900000,
    passportNumber: 'A08192847',
    nidNumber: '1998269188000088',
    bankSolvencyBDT: 3700000,
    whatsappConsent: true,
    createdDate: '2026-07-15',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-05',
    documents: [
      {
        id: 'doc-108-1',
        name: 'University of Chester CAS Letter',
        nameBn: 'ইউনিভার্সিটি সিএএস লেটার',
        category: 'academic',
        status: 'verified',
        isRequired: true,
        dueDate: '2026-09-18',
        uploadedAt: '2026-09-17',
        verifiedAt: '2026-09-18',
        verifiedBy: 'Shamim Reza',
        fileName: 'CAS_Letter_Chester.pdf',
        fileSize: '0.9 MB',
        virusScanned: true,
        version: 1
      }
    ],
    applications: [
      {
        id: 'app-801',
        universityName: 'University of Chester',
        country: 'UK',
        flag: '🇬🇧',
        program: 'Master of Public Health',
        degreeLevel: 'Master',
        intake: 'Jan 2027',
        deadline: '2026-10-31',
        portalId: 'CHEST-88192',
        appFee: 0,
        appFeePaid: true,
        status: 'unconditional_offer',
        tuitionPerYear: 15750,
        currency: 'GBP',
        scholarshipAmount: 2000
      }
    ],
    visaCase: {
      id: 'visa-801',
      country: 'UK',
      flag: '🇬🇧',
      vfsCenter: 'VFS Sylhet',
      casOrI20Number: 'CAS-CHEST-91024',
      submissionDate: '2026-09-20',
      appointmentDate: '2026-09-24',
      status: 'biometrics_done',
      notes: 'Priority visa processing opted. Decision expected in 5 working days.'
    },
    notesCount: 11
  },

  // 9. Nazmul Hossain (Documents Stage - Stuck, pending EMGS declaration)
  {
    id: 'stu-109',
    name: 'Nazmul Hossain',
    nameBn: 'নাজমুল হোসেন',
    phone: '+880 1915-112233',
    email: 'nazmul.hossain.eee@gmail.com',
    city: 'Dhaka (Uttara Sector 7)',
    targetCountry: 'Malaysia',
    countryFlag: '🇲🇾',
    targetIntake: 'Nov 2026',
    degreeLevel: 'Bachelor of Computer Science',
    stage: 'documents',
    daysInStage: 18,
    leadScore: 'cold',
    counselorId: 'user-4',
    counselorName: 'Nabila Hossain',
    source: 'Facebook',
    ieltsScore: 'Pending',
    budgetBDT: 1600000,
    passportNumber: 'A19384729',
    nidNumber: '2001269188000099',
    bankSolvencyBDT: 2100000,
    whatsappConsent: true,
    createdDate: '2026-08-01',
    lastContactDate: '2026-09-18',
    nextFollowUpDate: '2026-09-25',
    documents: [
      {
        id: 'doc-109-1',
        name: 'EMGS Health Declaration & Medical Exam Form',
        nameBn: 'ইএমজিএস হেলথ ডিক্লারেশন',
        category: 'identity',
        status: 'requested',
        isRequired: true,
        dueDate: '2026-10-18',
        version: 0
      }
    ],
    applications: [],
    notesCount: 5,
    isStuck: true
  },

  // 10. Farhan Sadik (Offer Stage - Conditional Offer from York)
  {
    id: 'stu-110',
    name: 'Farhan Sadik',
    nameBn: 'ফারহান সাদিক',
    phone: '+880 1713-778899',
    email: 'farhan.sadik.eco@gmail.com',
    city: 'Khulna (Boyra)',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'MSc Financial Economics',
    stage: 'offer',
    daysInStage: 8,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Referral',
    ieltsScore: '7.0',
    budgetBDT: 3100000,
    passportNumber: 'A07192834',
    nidNumber: '1998269188000033',
    bankSolvencyBDT: 3600000,
    whatsappConsent: true,
    createdDate: '2026-07-28',
    lastContactDate: '2026-09-28',
    nextFollowUpDate: '2026-10-02',
    documents: [],
    applications: [
      {
        id: 'app-1001',
        universityName: 'University of York',
        country: 'UK',
        flag: '🇬🇧',
        program: 'MSc Financial Economics',
        degreeLevel: 'Master',
        intake: 'Jan 2027',
        deadline: '2026-11-01',
        portalId: 'YORK-849102',
        appFee: 0,
        appFeePaid: true,
        status: 'conditional_offer',
        tuitionPerYear: 24500,
        currency: 'GBP',
        scholarshipAmount: 5000,
        depositDeadline: '2026-10-25',
        notes: 'Condition: Submit Bachelor 8th semester consolidated transcript'
      }
    ],
    notesCount: 9
  },

  // 11. Mehedi Hasan (Lead Stage)
  {
    id: 'stu-111',
    name: 'Mehedi Hasan',
    nameBn: 'মেহেদী হাসান',
    phone: '+880 1812-445566',
    email: 'mehedi.hasan.bba@gmail.com',
    city: 'Dhaka (Dhanmondi)',
    targetCountry: 'Canada',
    countryFlag: '🇨🇦',
    targetIntake: 'May 2027',
    degreeLevel: 'Global Business Management',
    stage: 'lead',
    daysInStage: 1,
    leadScore: 'warm',
    counselorId: 'user-4',
    counselorName: 'Nabila Hossain',
    source: 'WhatsApp',
    ieltsScore: 'Appearing in Oct',
    budgetBDT: 2800000,
    passportNumber: 'A09182374',
    nidNumber: '1999269188000054',
    bankSolvencyBDT: 3100000,
    whatsappConsent: true,
    createdDate: '2026-09-29',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-01',
    documents: [],
    applications: [],
    notesCount: 1
  },

  // 12. Jannatul Ferdous (Counseling Stage)
  {
    id: 'stu-112',
    name: 'Jannatul Ferdous',
    nameBn: 'জান্নাতুল ফেরদৌস',
    phone: '+880 1716-998811',
    email: 'jannat.ferdous98@gmail.com',
    city: 'Sylhet',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'MSc International Business',
    stage: 'counseling',
    daysInStage: 3,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Walk-in',
    ieltsScore: '6.5',
    budgetBDT: 2500000,
    passportNumber: 'B08291823',
    nidNumber: '1998269188000022',
    bankSolvencyBDT: 3300000,
    whatsappConsent: true,
    createdDate: '2026-09-27',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-01',
    documents: [],
    applications: [],
    notesCount: 4
  },

  // 13. Shakil Mahmud (Application Stage)
  {
    id: 'stu-113',
    name: 'Shakil Mahmud',
    nameBn: 'শাকিল মাহমুদ',
    phone: '+880 1918-332211',
    email: 'shakil.mahmud.du@gmail.com',
    city: 'Chattogram (Panchlaish)',
    targetCountry: 'Australia',
    countryFlag: '🇦🇺',
    targetIntake: 'Feb 2027',
    degreeLevel: 'Master of Information Technology',
    stage: 'application',
    daysInStage: 5,
    leadScore: 'hot',
    counselorId: 'user-2',
    counselorName: 'Sumaiya Tabassum',
    source: 'Referral',
    ieltsScore: 'PTE 72',
    budgetBDT: 3900000,
    passportNumber: 'A18294012',
    nidNumber: '1997269188000067',
    bankSolvencyBDT: 4600000,
    whatsappConsent: true,
    createdDate: '2026-08-15',
    lastContactDate: '2026-09-26',
    nextFollowUpDate: '2026-10-03',
    documents: [
      {
        id: 'doc-113-1',
        name: 'PTE Academic Official Score Card (Overall 72)',
        nameBn: 'পিটিই স্কোর কার্ড',
        category: 'language',
        status: 'received',
        isRequired: true,
        dueDate: '2026-10-08',
        uploadedAt: '2026-09-25',
        fileName: 'PTE_Score_Report_Shakil.pdf',
        fileSize: '0.7 MB',
        virusScanned: true,
        version: 1
      }
    ],
    applications: [
      {
        id: 'app-1301',
        universityName: 'Monash University',
        country: 'Australia',
        flag: '🇦🇺',
        program: 'Master of Information Technology',
        degreeLevel: 'Master',
        intake: 'Feb 2027',
        deadline: '2026-11-15',
        portalId: 'MONASH-88192',
        appFee: 10000,
        appFeePaid: true,
        status: 'submitted',
        tuitionPerYear: 44000,
        currency: 'AUD',
        scholarshipAmount: 10000
      }
    ],
    notesCount: 7
  },

  // 14. Anika Tabassum (Visa - Approved!)
  {
    id: 'stu-114',
    name: 'Anika Tabassum',
    nameBn: 'আনিকা তাবাসসুম',
    phone: '+880 1618-445566',
    email: 'anika.tabassum.uk@gmail.com',
    city: 'Dhaka (Gulshan 2)',
    targetCountry: 'UK',
    countryFlag: '🇬🇧',
    targetIntake: 'Jan 2027',
    degreeLevel: 'LLM International Commercial Law',
    stage: 'visa',
    daysInStage: 3,
    leadScore: 'hot',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    source: 'Website',
    ieltsScore: '7.5',
    budgetBDT: 3400000,
    passportNumber: 'A09482194',
    nidNumber: '1999269188000015',
    bankSolvencyBDT: 4200000,
    whatsappConsent: true,
    createdDate: '2026-06-25',
    lastContactDate: '2026-09-30',
    nextFollowUpDate: '2026-10-05',
    documents: [],
    applications: [],
    visaCase: {
      id: 'visa-1401',
      country: 'UK',
      flag: '🇬🇧',
      vfsCenter: 'VFS Dhaka, Delta Life Tower',
      casOrI20Number: 'QMUL-CAS-881923',
      submissionDate: '2026-09-12',
      appointmentDate: '2026-09-18',
      decisionDate: '2026-09-29',
      status: 'approved',
      notes: 'Visa vignette received in passport! Vignette collection completed.'
    },
    notesCount: 15
  },

  // 15. Mahmudul Hasan (Departed)
  {
    id: 'stu-115',
    name: 'Mahmudul Hasan',
    nameBn: 'মাহমুদুল হাসান',
    phone: '+880 1719-887766',
    email: 'mahmud.canada2026@gmail.com',
    city: 'Sylhet',
    targetCountry: 'Canada',
    countryFlag: '🇨🇦',
    targetIntake: 'Sep 2026',
    degreeLevel: 'BSc Computer Systems',
    stage: 'departed',
    daysInStage: 20,
    leadScore: 'hot',
    counselorId: 'user-4',
    counselorName: 'Nabila Hossain',
    source: 'Walk-in',
    ieltsScore: '7.0',
    budgetBDT: 3500000,
    passportNumber: 'A08192345',
    nidNumber: '1998269188000041',
    bankSolvencyBDT: 4500000,
    whatsappConsent: true,
    createdDate: '2026-03-12',
    lastContactDate: '2026-09-10',
    nextFollowUpDate: '2026-10-15',
    documents: [
      {
        id: 'doc-115-1',
        name: 'Canadian Biometrics Collection Instruction Letter',
        nameBn: 'কানাডা বায়োমেট্রিক্স নির্দেশনা চিঠি',
        category: 'identity',
        status: 'not_requested',
        isRequired: false,
        dueDate: '2026-11-15',
        version: 0
      }
    ],
    applications: [],
    visaCase: {
      id: 'visa-115',
      country: 'Canada',
      flag: '🇨🇦',
      vfsCenter: 'VFS Global Dhaka',
      casOrI20Number: 'CAN-STUDY-94819',
      submissionDate: '2026-07-15',
      appointmentDate: '2026-07-22',
      decisionDate: '2026-08-18',
      status: 'approved',
      notes: 'Study permit approved with PGWP eligibility.'
    },
    notesCount: 18
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    studentId: 'stu-101',
    studentName: 'Tanvir Ahmed',
    studentPhone: '+880 1712-889900',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    date: '2026-09-30', // Today
    time: '11:30 AM',
    durationMinutes: 45,
    type: 'in_office',
    locationOrLink: 'Dhanmondi Office, Room 204',
    status: 'scheduled',
    topic: 'Bank Solvency 28-day holding calculation & Coventry SOP review',
    notes: 'Father (Dr. Rafiqul Ahmed) will attend in person.'
  },
  {
    id: 'apt-2',
    studentId: 'stu-103',
    studentName: 'Rafiul Islam',
    studentPhone: '+880 1913-445566',
    counselorId: 'user-2',
    counselorName: 'Sumaiya Tabassum',
    date: '2026-09-30', // Today
    time: '03:00 PM',
    durationMinutes: 30,
    type: 'zoom',
    locationOrLink: 'https://zoom.us/j/91823749102',
    status: 'scheduled',
    topic: 'US Embassy Visa Mock Interview (Session 2)',
    notes: 'Focus on 214(b) non-immigrant intent questions.'
  },
  {
    id: 'apt-3',
    studentId: 'stu-102',
    studentName: 'Nusrat Jahan',
    studentPhone: '+880 1814-776655',
    counselorId: 'user-4',
    counselorName: 'Nabila Hossain',
    date: '2026-09-30', // Today
    time: '04:30 PM',
    durationMinutes: 30,
    type: 'phone',
    locationOrLink: '+880 1814-776655',
    status: 'scheduled',
    topic: 'Seneca vs Conestoga College offer comparison & deposit deadline',
    notes: 'Explain post-graduation work permit (PGWP) differences.'
  },
  {
    id: 'apt-4',
    studentId: 'stu-106',
    studentName: 'Ishrat Zahan',
    studentPhone: '+880 1811-990011',
    counselorId: 'user-1',
    counselorName: 'Shamim Reza',
    date: '2026-10-01',
    time: '02:00 PM',
    durationMinutes: 45,
    type: 'in_office',
    locationOrLink: 'Gulshan Branch, Boardroom A',
    status: 'scheduled',
    topic: 'UK Master in Architecture university shortlisting'
  },
  {
    id: 'apt-5',
    studentId: 'stu-105',
    studentName: 'Fahim Muntasir',
    studentPhone: '+880 1718-223344',
    counselorId: 'user-3',
    counselorName: 'Ariful Islam',
    date: '2026-10-02',
    time: '11:00 AM',
    durationMinutes: 45,
    type: 'zoom',
    locationOrLink: 'https://zoom.us/j/88391024810',
    status: 'scheduled',
    topic: 'German Public University APS & Uni-Assist admission criteria'
  }
];

export const mockWhatsAppConversations: WhatsAppConversation[] = [
  {
    id: 'conv-1',
    studentId: 'stu-101',
    studentName: 'Tanvir Ahmed',
    phone: '+880 1712-889900',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'ভাইয়া, ব্যাংক স্টেটমেন্টের সাথে কি সলভেন্সি লেটারও দেওয়া লাগবে?',
    lastMessageTime: '10:14 AM',
    unreadCount: 2,
    assignedCounselorId: 'user-1',
    messages: [
      {
        id: 'msg-1',
        sender: 'system',
        senderName: 'EduFlow Auto-Reminder',
        text: 'Dear Tanvir Ahmed, this is a reminder from EduFlow: Your Bank Solvency Statement is pending. Please provide a 28-day holding certificate before 05 Oct 2026.',
        timestamp: 'Yesterday 09:30 AM',
        status: 'read',
        templateUsed: 'Missing Document Alert (Bank)'
      },
      {
        id: 'msg-2',
        sender: 'counselor',
        senderName: 'Shamim Reza',
        text: 'আসসালামু আলাইকুম তানভীর, ব্যাংকে কি আজ কথা বলেছেন? কত ব্যালেন্স হোল্ড রাখা আছে?',
        timestamp: 'Yesterday 02:45 PM',
        status: 'read'
      },
      {
        id: 'msg-3',
        sender: 'student',
        senderName: 'Tanvir Ahmed',
        text: 'ওয়ালাইকুম আসসালাম ভাইয়া। আব্বুর ডাচ্-বাংলা ব্যাংকে ৩৫ লাখ টাকা হোল্ড করা হয়েছে গত ১০ দিন ধরে।',
        timestamp: 'Yesterday 03:10 PM',
        status: 'read'
      },
      {
        id: 'msg-4',
        sender: 'student',
        senderName: 'Tanvir Ahmed',
        text: 'ভাইয়া, ব্যাংক স্টেটমেন্টের সাথে কি সলভেন্সি লেটারও দেওয়া লাগবে?',
        timestamp: '10:14 AM',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'conv-2',
    studentId: 'stu-102',
    studentName: 'Nusrat Jahan',
    phone: '+880 1814-776655',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'Thank you apa! Seneca College er unconditional offer letter ta download korechi.',
    lastMessageTime: '09:20 AM',
    unreadCount: 0,
    assignedCounselorId: 'user-4',
    messages: [
      {
        id: 'msg-201',
        sender: 'counselor',
        senderName: 'Nabila Hossain',
        text: 'অভিনন্দন নুসরাত! সেনেকা পলিটেকনিক থেকে আপনার অফার লেটার চলে এসেছে।',
        timestamp: 'Yesterday 04:15 PM',
        status: 'read'
      },
      {
        id: 'msg-202',
        sender: 'student',
        senderName: 'Nusrat Jahan',
        text: 'Thank you apa! Seneca College er unconditional offer letter ta download korechi.',
        timestamp: '09:20 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv-3',
    studentId: 'stu-103',
    studentName: 'Rafiul Islam',
    phone: '+880 1913-445566',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'আজকে ৩টার জুম মক ইন্টারভিউতে আমি রেডি থাকব আপু।',
    lastMessageTime: '08:45 AM',
    unreadCount: 1,
    assignedCounselorId: 'user-2',
    messages: [
      {
        id: 'msg-301',
        sender: 'counselor',
        senderName: 'Sumaiya Tabassum',
        text: 'রাফিউল, ৪ অক্টোবর আপনার ইউএস এম্বাসি ইন্টারভিউ। আজ ৩টায় আমাদের সেকেন্ড মক ইন্টারভিউ হবে।',
        timestamp: 'Yesterday 06:00 PM',
        status: 'read'
      },
      {
        id: 'msg-302',
        sender: 'student',
        senderName: 'Rafiul Islam',
        text: 'আজকে ৩টার জুম মক ইন্টারভিউতে আমি রেডি থাকব আপু।',
        timestamp: '08:45 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv-4',
    studentId: 'stu-105',
    studentName: 'Fahim Muntasir',
    phone: '+880 1718-223344',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'জার্মানিতে কি টিউশন ফি ছাড়া পড়া সম্ভব?',
    lastMessageTime: '07:30 AM',
    unreadCount: 1,
    assignedCounselorId: 'user-3',
    messages: [
      {
        id: 'msg-401',
        sender: 'student',
        senderName: 'Fahim Muntasir',
        text: 'হ্যালো, ফেসবুক থেকে আপনাদের বিজ্ঞাপন দেখে মেসেজ দিচ্ছি। জার্মানিতে কি টিউশন ফি ছাড়া পড়া সম্ভব?',
        timestamp: '07:30 AM',
        status: 'delivered'
      }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Call Tanvir Ahmed regarding 28-day holding bank solvency certificate',
    titleBn: 'তানভীর আহমেদকে ২৮ দিন ব্যাংক হোল্ডিং সার্টিফিকেটের জন্য কল দিন',
    studentId: 'stu-101',
    studentName: 'Tanvir Ahmed',
    assignedToId: 'user-1',
    assignedToName: 'Shamim Reza',
    dueDate: '2026-09-30',
    priority: 'high',
    completed: false,
    category: 'document'
  },
  {
    id: 'task-2',
    title: 'Conduct US Embassy Mock Interview session 2 with Rafiul Islam',
    titleBn: 'রাফিউল ইসলামের ইউএস এম্বাসি মক ইন্টারভিউ সেশন ২ সম্পন্ন করুন',
    studentId: 'stu-103',
    studentName: 'Rafiul Islam',
    assignedToId: 'user-2',
    assignedToName: 'Sumaiya Tabassum',
    dueDate: '2026-09-30',
    priority: 'high',
    completed: false,
    category: 'visa'
  },
  {
    id: 'task-3',
    title: 'Submit Deakin University application portal documents for Sadia Akter',
    titleBn: 'সাদিয়া আক্তারের ডিকিন ইউনিভার্সিটি পোর্টাল ডকুমেন্টস সাবমিট করুন',
    studentId: 'stu-104',
    studentName: 'Sadia Akter',
    assignedToId: 'user-2',
    assignedToName: 'Sumaiya Tabassum',
    dueDate: '2026-10-01',
    priority: 'medium',
    completed: false,
    category: 'application'
  },
  {
    id: 'task-4',
    title: 'Assign new Facebook inquiries received this morning to available counselors',
    titleBn: 'আজ সকালে ফেসবুক থেকে প্রাপ্ত নতুন লিডসমূহ কাউন্সেলরদের মাঝে বণ্টন করুন',
    assignedToId: 'user-admin',
    assignedToName: 'Kazi Mahfuzur Rahman',
    dueDate: '2026-09-30',
    priority: 'high',
    completed: true,
    category: 'follow_up'
  },
  {
    id: 'task-5',
    title: 'Follow up on Seneca College $2,500 CAD tuition deposit with Nusrat Jahan',
    titleBn: 'নুসরাত জাহানের সেনেকা কলেজ টিউশন ডিপোজিট জমার আপডেট নিন',
    studentId: 'stu-102',
    studentName: 'Nusrat Jahan',
    assignedToId: 'user-4',
    assignedToName: 'Nabila Hossain',
    dueDate: '2026-10-02',
    priority: 'high',
    completed: false,
    category: 'application'
  },
  {
    id: 'task-6',
    title: 'Verify scanned IELTS TRF and Academic transcripts for Fahim Muntasir',
    titleBn: 'ফাহিম মুনতাসিরের আইইএলটিএস টিআরএফ ও একাডেমিক মার্কশিট যাচাই করুন',
    studentId: 'stu-105',
    studentName: 'Fahim Muntasir',
    assignedToId: 'user-3',
    assignedToName: 'Ariful Islam',
    dueDate: '2026-10-02',
    priority: 'medium',
    completed: false,
    category: 'document'
  }
];

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-30 10:45 AM',
    userId: 'user-1',
    userName: 'Shamim Reza',
    userRole: 'Counselor',
    action: 'REVEAL_SENSITIVE_DATA',
    details: 'Revealed masked passport number for student Tanvir Ahmed (stu-101)',
    ipAddress: '103.205.71.18 (Dhaka)'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-30 09:30 AM',
    userId: 'user-3',
    userName: 'Ariful Islam',
    userRole: 'Doc Officer',
    action: 'VERIFY_DOCUMENT',
    details: 'Verified SSC & HSC Transcripts for student Sabrina Sultana',
    ipAddress: '103.205.71.18 (Dhaka)'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-29 05:15 PM',
    userId: 'user-admin',
    userName: 'Kazi Mahfuzur Rahman',
    userRole: 'Admin',
    action: 'EXPORT_REPORT',
    details: 'Exported Counselor Performance Summary report to CSV format',
    ipAddress: '103.205.71.18 (Dhaka)'
  },
  {
    id: 'log-4',
    timestamp: '2026-09-29 03:40 PM',
    userId: 'user-1',
    userName: 'Shamim Reza',
    userRole: 'Counselor',
    action: 'STAGE_CHANGE',
    details: 'Moved Anika Tabassum from Visa Stage to Visa Approved',
    ipAddress: '103.205.71.18 (Dhaka)'
  }
];

export const mockReminderRules: ReminderRule[] = [
  {
    id: 'rule-1',
    name: '3 Days Before Document Due Date',
    triggerDaysBefore: 3,
    triggerOnDue: false,
    triggerIfOverdueDays: 0,
    channel: 'whatsapp',
    templateEn: 'Dear {student_name}, this is EduFlow reminder: Your {document_name} is due in 3 days ({due_date}). Please send us a clear scan to avoid application delays.',
    templateBn: 'প্রিয় {student_name}, EduFlow থেকে স্মরণ করিয়ে দেওয়া হচ্ছে: আপনার {document_name} জমা দেওয়ার আর ৩ দিন বাকি ({due_date})। অনুগ্রহ করে দ্রুত পাঠিয়ে দিন।',
    enabled: true,
    quietHours: { enabled: true, start: '21:00', end: '09:00' }
  },
  {
    id: 'rule-2',
    name: 'On Document Due Date',
    triggerDaysBefore: 0,
    triggerOnDue: true,
    triggerIfOverdueDays: 0,
    channel: 'whatsapp',
    templateEn: 'URGENT: Dear {student_name}, today is the deadline for {document_name}. Kindly upload the file or contact your counselor {counselor_name} immediately.',
    templateBn: 'জরুরি: প্রিয় {student_name}, আজ আপনার {document_name} জমা দেওয়ার শেষ তারিখ। দ্রুত ফাইল আপলোড করুন অথবা আপনার কাউন্সেলর {counselor_name} এর সাথে যোগাযোগ করুন।',
    enabled: true,
    quietHours: { enabled: true, start: '21:00', end: '09:00' }
  },
  {
    id: 'rule-3',
    name: 'Overdue Follow-up (Every 2 Days)',
    triggerDaysBefore: 0,
    triggerOnDue: false,
    triggerIfOverdueDays: 2,
    channel: 'whatsapp',
    templateEn: 'Action Required: Dear {student_name}, your {document_name} is currently overdue. University admission processing is on hold pending this document.',
    templateBn: 'সতর্কতা: প্রিয় {student_name}, আপনার {document_name} জমা দেওয়ার সময়সীমা উত্তীর্ণ হয়েছে। এই কাগজ ছাড়া বিশ্ববিদ্যালয় আবেদন স্থগিত রয়েছে।',
    enabled: true,
    quietHours: { enabled: true, start: '21:00', end: '09:00' }
  }
];

export const mockCounselorPerformance = [
  {
    counselorId: 'user-1',
    name: 'Shamim Reza',
    nameBn: 'শামীম রেজা',
    leadsHandled: 7,
    applications: 4,
    offers: 2,
    visasApproved: 2,
    conversionRate: 85.7,
    avgResponseMinutes: 12,
    revenueBDT: 1450000,
    rating: 4.9
  },
  {
    counselorId: 'user-2',
    name: 'Sumaiya Tabassum',
    nameBn: 'সুমাইয়া তাবাসসুম',
    leadsHandled: 3,
    applications: 2,
    offers: 1,
    visasApproved: 1,
    conversionRate: 80.0,
    avgResponseMinutes: 15,
    revenueBDT: 850000,
    rating: 4.8
  },
  {
    counselorId: 'user-4',
    name: 'Nabila Hossain',
    nameBn: 'নাবিলা হোসেন',
    leadsHandled: 4,
    applications: 2,
    offers: 1,
    visasApproved: 1,
    conversionRate: 75.0,
    avgResponseMinutes: 18,
    revenueBDT: 720000,
    rating: 4.7
  },
  {
    counselorId: 'user-3',
    name: 'Ariful Islam',
    nameBn: 'আরিফুল ইসলাম',
    leadsHandled: 1,
    applications: 1,
    offers: 0,
    visasApproved: 0,
    conversionRate: 70.0,
    avgResponseMinutes: 14,
    revenueBDT: 250000,
    rating: 4.8
  }
];
