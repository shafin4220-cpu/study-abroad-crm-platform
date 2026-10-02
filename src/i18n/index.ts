export type Language = 'en' | 'bn';

export const translations = {
  en: {
    // App info
    appName: "EduFlow",
    appTagline: "Study-Abroad CRM & Booking Platform",
    roleAdmin: "Admin / Owner",
    roleManager: "Branch Manager",
    roleCounselor: "Counselor",
    roleDocOfficer: "Document & Visa Officer",
    roleReceptionist: "Receptionist",

    // Navigation
    navDashboard: "Dashboard",
    navLeads: "Leads",
    navPipeline: "Pipeline",
    navStudents: "Students",
    navDocuments: "Documents",
    navApplications: "Applications",
    navVisa: "Visa Tracker",
    navAppointments: "Appointments",
    navWhatsApp: "WhatsApp",
    navTasks: "Tasks",
    navReports: "Reports",
    navSettings: "Settings",

    // Descriptions for staff
    descDashboard: "Real-time overview of active students, upcoming interviews, and agency performance",
    descLeads: "Capture, qualify, and assign student inquiries across Facebook, WhatsApp, and Walk-ins",
    descPipeline: "Visual journey of every student from first inquiry to flight departure",
    descStudents: "Comprehensive 360° directory of all registered students with full history",
    descDocuments: "Track mandatory academic, financial, and visa documents with auto-reminders",
    descApplications: "Manage university offers, deposit deadlines, and side-by-side offer comparisons",
    descVisa: "Monitor embassy filings, biometric slots, interview dates, and decision updates",
    descAppointments: "Schedule in-person or Zoom sessions with double-booking prevention",
    descWhatsApp: "Official WhatsApp Cloud API inbox with pre-approved Bangla/English templates",
    descTasks: "Daily action items, urgent follow-ups, and auto-generated pipeline checklist tasks",
    descReports: "Counselor leaderboard, conversion rates, country-wise demand, and intake revenue",
    descSettings: "Agency configuration, checklist templates, automated WhatsApp rules, and audit logs",

    // Top Bar
    searchPlaceholder: "Search student, phone (+880...), university, or passport...",
    newLeadBtn: "+ New Lead",
    switchLanguage: "Language",
    notifications: "Notifications",
    auditLogged: "Audit Log Active",

    // Pipeline Stages
    stage_lead: "Lead",
    stage_counseling: "Counseling",
    stage_documents: "Documents",
    stage_application: "Application",
    stage_offer: "Offer",
    stage_visa: "Visa",
    stage_departed: "Departed",

    // Quick Stats
    statNewLeads: "New Leads (This Week)",
    statActiveStudents: "Active In Pipeline",
    statDocsPending: "Missing Documents",
    statVisaInProcess: "Visas In Process",
    statConversionRate: "Visa Success Rate",
    statRevenue: "Est. Intake Revenue",

    // Actions & Common
    filterByCountry: "Country",
    filterByIntake: "Intake",
    filterByCounselor: "Counselor",
    filterByStatus: "Status",
    all: "All",
    search: "Search",
    actions: "Actions",
    viewProfile: "View 360° Profile",
    quickWhatsApp: "Send WhatsApp",
    callStudent: "Call Student",
    edit: "Edit",
    delete: "Delete",
    save: "Save Changes",
    cancel: "Cancel",
    confirm: "Confirm",
    back: "Back",
    stuckAlert: "Stuck in stage",
    days: "days",
    revealSensitive: "Click to reveal (Logged)",
    maskedHint: "Protected for data privacy",
    copied: "Copied!",
    todayFocus: "Today's Immediate Focus",
    noAppointmentsToday: "No pending appointments for today",
    markComplete: "Mark Done",
    dragHint: "Drag cards between stages or click to update stage",

    // Document Checklist
    docChecklistTitle: "Document Verification & Auto-Reminder Engine",
    docProgress: "Verification Progress",
    sendBulkReminder: "Send Bulk WhatsApp Reminders",
    reminderRulesBtn: "Auto-Reminder Rules",
    status_not_requested: "Not Requested",
    status_requested: "Requested",
    status_received: "Received",
    status_verified: "Verified",
    status_rejected: "Rejected",

    // WhatsApp
    waChatTitle: "WhatsApp Business Cloud Integration",
    waConsentGiven: "WhatsApp Consent Recorded (GDPR / Privacy Compliant)",
    waNoConsent: "Consent Pending",
    waUseTemplate: "Use Template",
    waSend: "Send Message",
    waConvertLead: "Convert Chat to Lead",
    waTypePlaceholder: "Type a WhatsApp message or select quick template...",

    // Appointments
    bookAppointment: "Book New Appointment",
    meetingTypeInOffice: "In-Office (Gulshan/Dhanmondi)",
    meetingTypePhone: "Phone Call",
    meetingTypeZoom: "Zoom Video Meeting",

    // Lead drawer
    addLeadTitle: "Register New Student Lead",
    leadName: "Student Full Name",
    leadPhone: "Mobile Number (+880)",
    leadEmail: "Email Address",
    leadCountry: "Target Country",
    leadDegree: "Degree Level",
    leadIntake: "Target Intake",
    leadSource: "Acquisition Source",
    leadCounselor: "Assigned Counselor",
    leadBudget: "Estimated Annual Budget (BDT)",
    duplicateWarning: "Warning: A student with this phone number already exists!",
    createLeadSubmit: "Save & Assign Lead",

    // Reports
    counselorRankings: "Counselor Performance Leaderboard",
    conversionRate: "Conversion %",
    leadsHandled: "Leads Handled",
    applicationsSubmitted: "Applications",
    visasApproved: "Visas Approved",
    avgResponseTime: "Avg Response",
    exportReport: "Export Report (CSV/PDF)",
  },

  bn: {
    // App info
    appName: "EduFlow",
    appTagline: "স্টাডি-অ্যাবোর্ড সিআরএম ও বুকিং প্ল্যাটফর্ম",
    roleAdmin: "মালিক / অ্যাডমিন",
    roleManager: "ব্রাঞ্চ ম্যানেজার",
    roleCounselor: "কাউন্সেলর",
    roleDocOfficer: "ডকুমেন্ট ও ভিসা অফিসার",
    roleReceptionist: "রিসেপশনিস্ট",

    // Navigation
    navDashboard: "ড্যাশবোর্ড",
    navLeads: "লিড",
    navPipeline: "পাইপলাইন",
    navStudents: "স্টুডেন্ট",
    navDocuments: "ডকুমেন্ট",
    navApplications: "আবেদন",
    navVisa: "ভিসা",
    navAppointments: "অ্যাপয়েন্টমেন্ট",
    navWhatsApp: "হোয়াটসঅ্যাপ",
    navTasks: "কাজ",
    navReports: "রিপোর্ট",
    navSettings: "সেটিংস",

    // Descriptions for staff
    descDashboard: "সক্রিয় শিক্ষার্থী, আজকের ফলো-আপ এবং সামগ্রিক এজেন্সির অগ্রগতির রিয়েল-টাইম তথ্য",
    descLeads: "ফেসবুক, হোয়াটসঅ্যাপ ও সরাসরি আসা নতুন স্টুডেন্ট লিড যাচাই ও দ্রুত কাউন্সেলর অ্যাসাইন",
    descPipeline: "প্রথম পরামর্শ থেকে শুরু করে ফ্লাইট ডিপারচার পর্যন্ত শিক্ষার্থীর সম্পূর্ণ পথচলা",
    descStudents: "সকল নিবন্ধিত শিক্ষার্থীদের ৩৬০° বিস্তারিত ডিরেক্টরি এবং পূর্ণাঙ্গ হিস্ট্রি",
    descDocuments: "একাডেমিক ও ব্যাংক কাগজপত্রের চেকলিস্ট ট্র্যাকিং এবং স্বয়ংক্রিয় হোয়াটসঅ্যাপ রিমাইন্ডার",
    descApplications: "বিভিন্ন ইউনিভার্সিটির অফার লেটার, টিউশন ফি ও স্কলারশিপের তুলনামূলক বিশ্লেষণ",
    descVisa: "ভিএফএস অ্যাপয়েন্টমেন্ট, বায়োমেট্রিক্স, ভিসা ইন্টারভিউ ও চূড়ান্ত সিদ্ধান্তের ট্র্যাকিং",
    descAppointments: "অফিসে সাক্ষাৎ বা জুম মিটিং বুকিং (একই সময়ে ডাবল-বুকিং প্রতিরোধসহ)",
    descWhatsApp: "অফিসিয়াল হোয়াটসঅ্যাপ বিজনেস ইনবক্স, পূর্ব-অনুমোদিত বাংলা ও ইংরেজি টেমপ্লেটসহ",
    descTasks: "আজকের জরুরি কাজ, স্টুডেন্ট ফলো-আপ এবং পাইপলাইন থেকে তৈরি স্বয়ংক্রিয় কাজের তালিকা",
    descReports: "কাউন্সেলরদের পারফরম্যান্স র‍্যাঙ্কিং, ভিসা সাফল্যের হার এবং সেশন ভিত্তিক রাজস্ব রিপোর্ট",
    descSettings: "এজেন্সি কনফিগারেশন, চেকলিস্ট টেমপ্লেট, স্বয়ংক্রিয় রিমাইন্ডার নিয়ম ও অডিট লগ",

    // Top Bar
    searchPlaceholder: "স্টুডেন্টের নাম, মোবাইল (+৮৮০...), বিশ্ববিদ্যালয় বা পাসপোর্ট খুঁজুন...",
    newLeadBtn: "+ নতুন লিড",
    switchLanguage: "ভাষা",
    notifications: "বিজ্ঞপ্তি",
    auditLogged: "অডিট লগ সক্রিয়",

    // Pipeline Stages
    stage_lead: "লিড",
    stage_counseling: "কাউন্সেলিং",
    stage_documents: "ডকুমেন্ট",
    stage_application: "আবেদন",
    stage_offer: "অফার",
    stage_visa: "ভিসা",
    stage_departed: "ডিপার্টেড",

    // Quick Stats
    statNewLeads: "নতুন লিড (এই সপ্তাহে)",
    statActiveStudents: "পাইপলাইনে সক্রিয়",
    statDocsPending: "অসম্পূর্ণ ডকুমেন্ট",
    statVisaInProcess: "প্রক্রিয়াধীন ভিসা",
    statConversionRate: "ভিসা সাফল্যের হার",
    statRevenue: "আনুমানিক ইনটেক রেভিনিউ",

    // Actions & Common
    filterByCountry: "দেশ",
    filterByIntake: "ইনটেক",
    filterByCounselor: "কাউন্সেলর",
    filterByStatus: "স্ট্যাটাস",
    all: "সকল",
    search: "অনুসন্ধান",
    actions: "অ্যাকশন",
    viewProfile: "৩৬০° প্রোফাইল দেখুন",
    quickWhatsApp: "হোয়াটসঅ্যাপ পাঠান",
    callStudent: "কল করুন",
    edit: "সম্পাদনা",
    delete: "মুছে ফেলুন",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল",
    confirm: "নিশ্চিত করুন",
    back: "ফিরে যান",
    stuckAlert: "ধাপে আটকে আছে",
    days: "দিন",
    revealSensitive: "দেখতে ক্লিক করুন (লগ সংরক্ষণ হবে)",
    maskedHint: "তথ্য সুরক্ষায় গোপন রাখা হয়েছে",
    copied: "কপি হয়েছে!",
    todayFocus: "আজকের অগ্রাধিকার কাজ",
    noAppointmentsToday: "আজকে কোনো নির্ধারিত অ্যাপয়েন্টমেন্ট নেই",
    markComplete: "সম্পন্ন মার্ক করুন",
    dragHint: "কার্ড টেনে অন্য ধাপে নিয়ে যান অথবা ক্লিক করে ধাপ পরিবর্তন করুন",

    // Document Checklist
    docChecklistTitle: "ডকুমেন্ট যাচাইকরণ ও স্বয়ংক্রিয় রিমাইন্ডার ইঞ্জিন",
    docProgress: "ডকুমেন্ট যাচাই অগ্রগতি",
    sendBulkReminder: "একসাথে সকল হোয়াটসঅ্যাপ রিমাইন্ডার পাঠান",
    reminderRulesBtn: "অটো-রিমাইন্ডার সেটিংস",
    status_not_requested: "অনুরোধ করা হয়নি",
    status_requested: "অনুরোধ পাঠানো হয়েছে",
    status_received: "গ্রহণ করা হয়েছে",
    status_verified: "যাচাইকৃত (সঠিক)",
    status_rejected: "প্রত্যাখ্যাত",

    // WhatsApp
    waChatTitle: "হোয়াটসঅ্যাপ বিজনেস ক্লাউড সংযোগ",
    waConsentGiven: "হোয়াটসঅ্যাপ বার্তার সম্মতি সংরক্ষিত (প্রাইভেসি সুরক্ষিত)",
    waNoConsent: "সম্মতি অপেক্ষমান",
    waUseTemplate: "টেমপ্লেট নির্বাচন করুন",
    waSend: "বার্তা পাঠান",
    waConvertLead: "চ্যাট থেকে সরাসরি লিড তৈরি করুন",
    waTypePlaceholder: "হোয়াটসঅ্যাপ বার্তা লিখুন অথবা টেমপ্লেট নির্বাচন করুন...",

    // Appointments
    bookAppointment: "নতুন অ্যাপয়েন্টমেন্ট বুক করুন",
    meetingTypeInOffice: "অফিসে সাক্ষাৎ (গুলশান / ধানমন্ডি)",
    meetingTypePhone: "ফোন কল",
    meetingTypeZoom: "জুম ভিডিও মিটিং",

    // Lead drawer
    addLeadTitle: "নতুন স্টুডেন্ট লিড নিবন্ধন",
    leadName: "শিক্ষার্থীর পূর্ণ নাম",
    leadPhone: "মোবাইল নম্বর (+৮৮০)",
    leadEmail: "ইমেইল ঠিকানা",
    leadCountry: "কাঙ্ক্ষিত দেশ",
    leadDegree: "ডিগ্রির স্তর",
    leadIntake: "কাঙ্ক্ষিত ইনটেক",
    leadSource: "তথ্যের উৎস",
    leadCounselor: "দায়িত্বপ্রাপ্ত কাউন্সেলর",
    leadBudget: "বাৎসরিক বাজেট (টাকা)",
    duplicateWarning: "সতর্কতা: এই ফোন নম্বরটি দিয়ে ইতোমধ্যেই একজন শিক্ষার্থী নিবন্ধিত আছে!",
    createLeadSubmit: "সংরক্ষণ ও কাউন্সেলর নিযুক্ত করুন",

    // Reports
    counselorRankings: "কাউন্সেলর পারফরম্যান্স লিডারবোর্ড",
    conversionRate: "সাফল্যের হার %",
    leadsHandled: "মোট শিক্ষার্থী",
    applicationsSubmitted: "আবেদন সংখ্যা",
    visasApproved: "অনুমোদিত ভিসা",
    avgResponseTime: "গড় রেসপন্স টাইম",
    exportReport: "রিপোর্ট এক্সপোর্ট (CSV/PDF)",
  }
};

export const toBanglaDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export const formatBDT = (amount: number, lang: Language): string => {
  if (lang === 'bn') {
    return `৳ ${toBanglaDigits(amount.toLocaleString('en-IN'))}`;
  }
  return `৳ ${amount.toLocaleString('en-IN')}`;
};

export const formatNumber = (num: number | string, lang: Language): string => {
  if (lang === 'bn') {
    return toBanglaDigits(num);
  }
  return String(num);
};
