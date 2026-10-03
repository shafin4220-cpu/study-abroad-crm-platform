import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Eye, 
  EyeOff, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Send, 
  GraduationCap, 
  DollarSign, 
  Building2, 
  Plane, 
  UserCheck, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { PipelineStage, DocumentStatus } from '../types';
import { formatBDT, formatNumber } from '../i18n';
import { CustomSelect } from './CustomSelect';

export const StudentProfileModal: React.FC = () => {
  const {
    selectedStudentId,
    setSelectedStudentId,
    students,
    updateStudentStage,
    updateDocumentStatus,
    sendWhatsAppMessage,
    logAudit,
    currentUser,
    lang,
    t,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'applications' | 'visa' | 'payments' | 'whatsapp' | 'notes'>('overview');
  const [revealedFields, setRevealedFields] = useState<{ [key: string]: boolean }>({});
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState<Array<{ id: string; author: string; text: string; date: string }>>([
    { id: 'n-1', author: 'Shamim Reza', text: 'Spoke with student father. Confirmed 28-day holding in Dutch-Bangla Bank is underway.', date: 'Yesterday 04:30 PM' },
    { id: 'n-2', author: 'Ariful Islam', text: 'Checked academic transcripts. Minimum 60% requirement met for UK Master intake.', date: '28 Sep 2026' }
  ]);
  const [quickMsg, setQuickMsg] = useState('');

  const student = students.find((s) => s.id === selectedStudentId);

  if (!student) return null;

  const toggleReveal = (fieldKey: 'passport' | 'nid' | 'bank') => {
    const isCurrentlyRevealed = revealedFields[fieldKey];
    if (!isCurrentlyRevealed) {
      logAudit('REVEAL_SENSITIVE_DATA', `User ${currentUser.name} revealed ${fieldKey.toUpperCase()} for student ${student.name} (${student.id})`);
      showToast(`Sensitive field revealed and recorded in Audit Log.`, 'info');
    }
    setRevealedFields((prev) => ({ ...prev, [fieldKey]: !isCurrentlyRevealed }));
  };

  const stages: PipelineStage[] = ['lead', 'counseling', 'documents', 'application', 'offer', 'visa', 'departed'];
  const currentStageIndex = stages.indexOf(student.stage);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotesList((prev) => [
      {
        id: `note-${Date.now()}`,
        author: currentUser.name,
        text: newNote,
        date: 'Just now'
      },
      ...prev
    ]);
    logAudit('ADD_NOTE', `Added internal counselor note to student ${student.name}`);
    setNewNote('');
    showToast('Note saved to student profile', 'success');
  };

  const handleSendQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    sendWhatsAppMessage(student.id, quickMsg);
    setQuickMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-5xl h-[92vh] glass-modal border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="p-5 border-b border-white/10 bg-white/[0.03] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1EC1CB]/30 to-white/10 border border-[#1EC1CB]/40 flex items-center justify-center text-xl font-bold text-white shadow-lg">
              {student.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  {lang === 'bn' ? student.nameBn : student.name}
                </h1>
                <span className="text-lg" title={student.targetCountry}>{student.countryFlag}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1EC1CB]/15 text-[#1EC1CB] border border-[#1EC1CB]/30 font-medium">
                  {student.targetCountry} • {student.targetIntake}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                  student.leadScore === 'hot' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  student.leadScore === 'warm' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {student.leadScore} lead
                </span>
                {student.isStuck && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lang === 'bn' ? `${formatNumber(student.daysInStage, lang)} দিন আটকে আছে` : `Stuck (${student.daysInStage}d)`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-white/60 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-white/80 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#1EC1CB]" />
                  {student.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-white/40" />
                  {student.email}
                </span>
                <span className="flex items-center gap-1 text-white/70">
                  <UserCheck className="w-3.5 h-3.5 text-[#1EC1CB]" />
                  Counselor: <strong className="text-white font-medium">{student.counselorName}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('whatsapp');
              }}
              className="px-3 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Open WhatsApp Chat"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <a
              href={`tel:${student.phone}`}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'কল' : 'Call'}
            </a>
            <button
              onClick={() => setSelectedStudentId(null)}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stage Progress Stepper Bar */}
        <div className="px-5 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {stages.map((stg, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <React.Fragment key={stg}>
                  <button
                    onClick={() => updateStudentStage(student.id, stg)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1EC1CB] text-[#1C1C28] shadow-md shadow-[#1EC1CB]/30 ring-2 ring-[#1EC1CB]/40'
                        : isPast
                        ? 'bg-white/10 text-white/90 hover:bg-white/15'
                        : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                    )}
                    <span className="capitalize">{lang === 'bn' ? (t(`stage_${stg}` as any) || stg) : stg}</span>
                  </button>
                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {currentStageIndex < stages.length - 1 && (
            <button
              onClick={() => updateStudentStage(student.id, stages[currentStageIndex + 1])}
              className="ml-4 px-3 py-1 rounded-lg bg-[#1EC1CB]/20 hover:bg-[#1EC1CB]/30 text-[#1EC1CB] border border-[#1EC1CB]/40 text-xs font-semibold flex items-center gap-1 shrink-0 transition"
            >
              <span>{lang === 'bn' ? 'পরবর্তী ধাপে নিন' : 'Advance Stage'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-5 border-b border-white/10 bg-white/[0.01] overflow-x-auto gap-2">
          {[
            { id: 'overview', label: lang === 'bn' ? 'সংক্ষিপ্ত তথ্য' : 'Overview' },
            { id: 'documents', label: `${lang === 'bn' ? 'ডকুমেন্টস' : 'Documents'} (${student.documents.length})` },
            { id: 'applications', label: `${lang === 'bn' ? 'ইউনিভার্সিটি আবেদন' : 'Applications'} (${student.applications.length})` },
            { id: 'visa', label: lang === 'bn' ? 'ভিসা কেস' : 'Visa Tracker' },
            { id: 'payments', label: lang === 'bn' ? 'পেমেন্ট ও ডিপোজিট' : 'Payments & Fees' },
            { id: 'whatsapp', label: lang === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp' },
            { id: 'notes', label: `${lang === 'bn' ? 'নোট ও হিস্ট্রি' : 'Notes & Activity'} (${notesList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#1EC1CB] text-[#1EC1CB]'
                  : 'border-transparent text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Sensitive Masked Data Card */}
                <div className="glass-panel p-4 border border-white/15 bg-white/[0.03]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#1EC1CB]" />
                      {lang === 'bn' ? 'সুরক্ষিত তথ্য (অডিট লগ সংরক্ষিত)' : 'Data-Protection Protected Identifiers'}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      Masked for GDPR / Privacy compliance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Passport */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                      <div className="text-[11px] text-white/50 mb-1">{lang === 'bn' ? 'পাসপোর্ট নম্বর' : 'Passport Number'}</div>
                      <div className="flex items-center justify-between font-mono text-sm">
                        <span className="font-semibold text-white">
                          {revealedFields['passport'] ? student.passportNumber : '••••••••••'}
                        </span>
                        <button
                          onClick={() => toggleReveal('passport')}
                          className="p-1 rounded text-white/40 hover:text-[#1EC1CB] transition"
                          title="Reveal / Mask"
                        >
                          {revealedFields['passport'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* NID */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                      <div className="text-[11px] text-white/50 mb-1">{lang === 'bn' ? 'জাতীয় পরিচয়পত্র (NID)' : 'National ID'}</div>
                      <div className="flex items-center justify-between font-mono text-sm">
                        <span className="font-semibold text-white">
                          {revealedFields['nid'] ? student.nidNumber : '••••••••••••••••'}
                        </span>
                        <button
                          onClick={() => toggleReveal('nid')}
                          className="p-1 rounded text-white/40 hover:text-[#1EC1CB] transition"
                          title="Reveal / Mask"
                        >
                          {revealedFields['nid'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Bank Solvency */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                      <div className="text-[11px] text-white/50 mb-1">{lang === 'bn' ? 'ব্যাংক সলভেন্সি ব্যালেন্স' : 'Bank Solvency Balance'}</div>
                      <div className="flex items-center justify-between font-mono text-sm">
                        <span className="font-semibold text-emerald-400">
                          {revealedFields['bank'] ? formatBDT(student.bankSolvencyBDT, lang) : '••••••••••'}
                        </span>
                        <button
                          onClick={() => toggleReveal('bank')}
                          className="p-1 rounded text-white/40 hover:text-[#1EC1CB] transition"
                          title="Reveal / Mask"
                        >
                          {revealedFields['bank'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic & Study Preferences */}
                <div className="glass-panel p-5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1EC1CB]" />
                    {lang === 'bn' ? 'একাডেমিক ও আবেদন সংক্রান্ত তথ্য' : 'Academic Profile & Preferences'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'কাঙ্ক্ষিত দেশ' : 'Target Country'}</span>
                      <span className="font-semibold text-white flex items-center gap-1 text-sm">
                        {student.countryFlag} {student.targetCountry}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'ডিগ্রির স্তর' : 'Degree Level'}</span>
                      <span className="font-semibold text-white text-sm">{student.degreeLevel}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'ইনটেক সেশন' : 'Intake'}</span>
                      <span className="font-semibold text-[#1EC1CB] text-sm">{student.targetIntake}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'ইংরেজি স্কোর' : 'English / Tests'}</span>
                      <span className="font-semibold text-white text-sm">{student.ieltsScore || 'In Progress'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'বাৎসরিক বাজেট' : 'Annual Budget'}</span>
                      <span className="font-semibold text-emerald-400 text-sm">{formatBDT(student.budgetBDT, lang)}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'তথ্যের উৎস' : 'Lead Source'}</span>
                      <span className="font-semibold text-white text-sm">{student.source}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-0.5">{lang === 'bn' ? 'নিবন্ধনের তারিখ' : 'Registration Date'}</span>
                      <span className="font-mono text-white text-sm">{student.createdDate}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add Internal Note */}
                <div className="glass-panel p-4 border border-white/10">
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                    <span>{lang === 'bn' ? 'কাউন্সেলর ইন্টারনাল নোট যোগ করুন' : 'Add Counselor Internal Note'}</span>
                    <span className="text-[11px] text-white/40">{notesList.length} notes recorded</span>
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                      placeholder={lang === 'bn' ? 'মিটিংয়ের সারাংশ বা ডকুমেন্টের আপডেট লিখুন...' : 'Type student progress update or phone call log...'}
                      className="flex-1 glass-input px-3.5 py-2 text-xs"
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition"
                    >
                      {lang === 'bn' ? 'সংরক্ষণ' : 'Add Note'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'বাধ্যতামূলক ডকুমেন্ট চেকলিস্ট' : 'Mandatory Document Checklist'}
                    </h3>
                    <p className="text-xs text-white/50">
                      {lang === 'bn' ? 'প্রতিটি কাগজের বর্তমান অবস্থা ও ভেরিফিকেশন' : 'Track verification status, file uploads, and deadlines'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sendWhatsAppMessage(student.id, `Dear ${student.name}, this is EduFlow reminder: You have ${student.documents.filter(d => d.status !== 'verified').length} documents pending for university submission. Please send high-resolution scans.`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপ রিমাইন্ডার পাঠান' : 'Send WhatsApp Reminder'}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {student.documents.map((doc) => {
                    const isOverdue = new Date(doc.dueDate) < new Date('2026-09-30') && doc.status !== 'verified';
                    return (
                      <div 
                        key={doc.id}
                        className={`p-3.5 rounded-xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                          isOverdue 
                            ? 'bg-red-500/[0.06] border-red-500/30' 
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg mt-0.5 ${
                            doc.status === 'verified' ? 'bg-emerald-500/15 text-emerald-400' :
                            doc.status === 'received' ? 'bg-[#1EC1CB]/15 text-[#1EC1CB]' :
                            doc.status === 'rejected' ? 'bg-red-500/15 text-red-400' :
                            'bg-white/10 text-white/40'
                          }`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">
                                {lang === 'bn' ? doc.nameBn : doc.name}
                              </span>
                              {doc.isRequired && (
                                <span className="text-[10px] text-red-400">*Required</span>
                              )}
                              {doc.virusScanned && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Clean
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-white/50 flex items-center gap-2 mt-0.5">
                              <span>Due: {doc.dueDate}</span>
                              {isOverdue && <span className="text-red-400 font-semibold">• OVERDUE</span>}
                              {doc.fileName && <span className="font-mono text-[#1EC1CB]">• {doc.fileName} ({doc.fileSize})</span>}
                            </div>
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2 shrink-0 min-w-[130px]">
                          <CustomSelect
                            value={doc.status}
                            onChange={(e) => updateDocumentStatus(student.id, doc.id, e.target.value as DocumentStatus)}
                            className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold ${
                              doc.status === 'verified' ? 'text-emerald-400 border-emerald-500/40' :
                              doc.status === 'received' ? 'text-[#1EC1CB] border-[#1EC1CB]/40' :
                              doc.status === 'rejected' ? 'text-red-400 border-red-500/40' :
                              'text-white/60 border-white/10'
                            }`}
                          >
                            <option value="not_requested">{t('status_not_requested')}</option>
                            <option value="requested">{t('status_requested')}</option>
                            <option value="received">{t('status_received')}</option>
                            <option value="verified">{t('status_verified')}</option>
                            <option value="rejected">{t('status_rejected')}</option>
                          </CustomSelect>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'bn' ? 'বিশ্ববিদ্যালয়ে জমাকৃত আবেদনসমূহ' : 'Submitted University Applications'}
                  </h3>
                  <button 
                    onClick={() => showToast('Application shortlisting drawer ready', 'info')}
                    className="px-3 py-1.5 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {lang === 'bn' ? 'নতুন আবেদন যোগ' : 'Add University Application'}
                  </button>
                </div>

                {student.applications.length === 0 ? (
                  <div className="p-8 text-center glass-panel border border-white/10">
                    <Building2 className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/50">
                      {lang === 'bn' ? 'এখনো কোনো বিশ্ববিদ্যালয় আবেদন জমা হয়নি' : 'No university applications submitted yet. Ready to submit once documents are verified.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {student.applications.map((app) => (
                      <div key={app.id} className="glass-panel p-4 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{app.flag}</span>
                              <h4 className="text-sm font-bold text-white">{app.universityName}</h4>
                            </div>
                            <p className="text-xs text-[#1EC1CB] font-medium">{app.program} • {app.degreeLevel}</p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                            app.status === 'unconditional_offer' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            app.status === 'conditional_offer' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            app.status === 'under_review' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-white/10 text-white/60 border border-white/15'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs pt-2 border-t border-white/10">
                          <div>
                            <span className="text-white/40 block">Intake:</span>
                            <span className="text-white font-medium">{app.intake}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Tuition / Year:</span>
                            <span className="text-white font-mono">{app.currency} {app.tuitionPerYear.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Scholarship:</span>
                            <span className="text-emerald-400 font-semibold">{app.currency} {app.scholarshipAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Deposit Deadline:</span>
                            <span className="text-amber-300 font-medium">{app.depositDeadline || 'N/A'}</span>
                          </div>
                        </div>

                        {app.notes && (
                          <p className="text-xs text-white/60 bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <strong>Note:</strong> {app.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VISA TAB */}
            {activeTab === 'visa' && (
              <div className="space-y-4">
                <div className="glass-panel p-5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#1EC1CB]" />
                      {lang === 'bn' ? 'ভিসা আবেদন ও এম্বাসি ট্র্যাকিং' : 'Embassy & Visa Case Tracker'}
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#1EC1CB]/15 text-[#1EC1CB] border border-[#1EC1CB]/30 font-semibold">
                      {student.visaCase ? student.visaCase.status.toUpperCase() : 'NOT SUBMITTED'}
                    </span>
                  </div>

                  {student.visaCase ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                          <span className="text-white/40 block mb-1">VFS / Embassy Center</span>
                          <span className="text-white font-semibold">{student.visaCase.vfsCenter}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                          <span className="text-white/40 block mb-1">CAS / I-20 Reference</span>
                          <span className="font-mono text-[#1EC1CB] font-semibold">{student.visaCase.casOrI20Number || 'Pending'}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                          <span className="text-white/40 block mb-1">Interview / Slot Date</span>
                          <span className="text-amber-300 font-bold">{student.visaCase.interviewDate || student.visaCase.appointmentDate || 'Not Booked'}</span>
                        </div>
                      </div>

                      {student.visaCase.notes && (
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200">
                          <strong>Counselor Brief:</strong> {student.visaCase.notes}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-white/50">
                      {lang === 'bn' ? 'শিক্ষার্থী এখনও ভিসা স্টেজে পৌঁছেনি' : 'Visa file preparation starts once Unconditional Offer & CAS/I-20 is issued.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WHATSAPP TAB */}
            {activeTab === 'whatsapp' && (
              <div className="glass-panel p-4 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">WhatsApp Business Cloud Chat</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Consent Active
                  </span>
                </div>

                <div className="h-64 overflow-y-auto space-y-2 p-2 bg-black/30 rounded-xl border border-white/5">
                  <div className="text-center text-[10px] text-white/30 my-2">Official WhatsApp API Session Active</div>
                  <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 max-w-sm text-xs space-y-1">
                    <div className="font-semibold text-[#1EC1CB]">EduFlow Counselor</div>
                    <p className="text-white/80">Assalamu Alaikum {student.name}, how is the bank solvency statement progressing?</p>
                    <div className="text-[10px] text-white/40 text-right">Yesterday 11:30 AM</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 max-w-sm ml-auto text-xs space-y-1 text-right">
                    <div className="font-semibold text-[#25D366]">{student.name}</div>
                    <p className="text-white/90">Going to Dutch-Bangla bank branch today to collect 28-day holding letter.</p>
                    <div className="text-[10px] text-white/40">Yesterday 12:15 PM</div>
                  </div>
                </div>

                <form onSubmit={handleSendQuickWhatsApp} className="flex gap-2">
                  <input
                    type="text"
                    value={quickMsg}
                    onChange={(e) => setQuickMsg(e.target.value)}
                    placeholder={lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ লিখুন...' : 'Type a WhatsApp message to student...'}
                    className="flex-1 glass-input px-3 py-2 text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-[#25D366]/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {lang === 'bn' ? 'পাঠান' : 'Send'}
                  </button>
                </form>
              </div>
            )}

            {/* NOTES & ACTIVITY TAB */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'bn' ? 'কার্যক্রম ও ইন্টারনাল নোট হিস্ট্রি' : 'Internal Activity & Counselor Logs'}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {notesList.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1EC1CB]">{n.author}</span>
                        <span className="text-[10px] text-white/40">{n.date}</span>
                      </div>
                      <p className="text-xs text-white/80">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="glass-panel p-5 border border-white/10 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white mb-2">Tuition Deposit & Processing Fees</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                    <span className="text-white/40 block">Estimated Annual Tuition</span>
                    <span className="text-base font-bold text-emerald-400">
                      {student.applications[0] ? `${student.applications[0].currency} ${student.applications[0].tuitionPerYear.toLocaleString()}` : '£18,200 (GBP)'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                    <span className="text-white/40 block">Tuition Deposit Paid</span>
                    <span className="text-base font-bold text-amber-300">Pending Visa Approval</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right 1 Column: Next Steps & Guardian Information */}
          <div className="space-y-4">
            {/* Guardian Card */}
            <div className="glass-panel p-4 border border-white/10 space-y-3">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
                {lang === 'bn' ? 'অভিভাবক / স্পনসর তথ্য' : 'Guardian & Financial Sponsor'}
              </span>
              <div>
                <div className="text-xs font-bold text-white">{student.guardianName || 'Dr. Rafiqul Ahmed'}</div>
                <div className="text-xs text-[#1EC1CB]">{student.guardianRelation || 'Father (Primary Financial Sponsor)'}</div>
                <div className="text-xs font-mono text-white/70 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-white/40" />
                  {student.guardianPhone || '+880 1711-554433'}
                </div>
              </div>
            </div>

            {/* Next Deadlines & Milestones */}
            <div className="glass-panel p-4 border border-white/10 space-y-3">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
                {lang === 'bn' ? 'আসন্ন সময়সীমা' : 'Upcoming Milestones'}
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">Next Follow-Up Call</span>
                    <span className="text-[10px] text-white/40">{student.nextFollowUpDate}</span>
                  </div>
                  <Clock className="w-4 h-4 text-[#1EC1CB]" />
                </div>
                <div className="p-2.5 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">Application Intake</span>
                    <span className="text-[10px] text-white/40">{student.targetIntake}</span>
                  </div>
                  <Calendar className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Counselor Info */}
            <div className="glass-panel p-4 border border-white/10 space-y-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
                {lang === 'bn' ? 'দায়িত্বপ্রাপ্ত কাউন্সেলর' : 'Assigned Advisor'}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/15">
                  {student.counselorName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{student.counselorName}</div>
                  <div className="text-[11px] text-white/50">Senior Study Abroad Counselor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
