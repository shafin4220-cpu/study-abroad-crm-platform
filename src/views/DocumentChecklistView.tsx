import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Send, 
  Sliders, 
  Search, 
  Filter, 
  FileCheck, 
  ShieldCheck,
  Eye,
  CheckCircle2,
  XCircle,
  ChevronDown
} from 'lucide-react';
import { DocumentStatus } from '../types';
import { formatNumber } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const DocumentChecklistView: React.FC = () => {
  const {
    students,
    updateDocumentStatus,
    sendWhatsAppMessage,
    setIsAutoReminderModalOpen,
    setSelectedStudentId,
    lang,
    t,
    showToast
  } = useApp();

  const [selectedStudentFilter, setSelectedStudentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all documents across students
  const allDocRows = students.flatMap((student) =>
    student.documents.map((doc) => ({
      student,
      doc
    }))
  );

  const filteredDocs = allDocRows.filter(({ student, doc }) => {
    const matchStudent = selectedStudentFilter === 'All' || student.id === selectedStudentFilter;
    const matchStatus = statusFilter === 'All' || doc.status === statusFilter;
    const matchSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStudent && matchStatus && matchSearch;
  });

  const verifiedCount = allDocRows.filter(({ doc }) => doc.status === 'verified').length;
  const progressPercent = Math.round((verifiedCount / Math.max(allDocRows.length, 1)) * 100);

  const handleBulkRemind = () => {
    const overdueCount = allDocRows.filter(({ doc }) => doc.status !== 'verified' && doc.dueDate < '2026-09-30').length;
    showToast(`Bulk WhatsApp reminders queued for ${overdueCount} pending documents across students!`, 'success');
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={t('docChecklistTitle')}
        description={lang === 'bn' 
          ? 'কাউন্সেলর ও ডকুমেন্ট অফিসারের জন্য স্বয়ংক্রিয় ট্র্যাকিং ও তাৎক্ষণিক হোয়াটসঅ্যাপ রিমাইন্ডার' 
          : 'Centralized document verification with Meta WhatsApp Cloud reminder triggers'}
        badge={`${filteredDocs.length} Documents • ${progressPercent}% Verified`}
      >
        <button
          onClick={() => setIsAutoReminderModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <Sliders className="w-3.5 h-3.5 text-[#1EC1CB]" />
          <span>{t('reminderRulesBtn')}</span>
        </button>

        <button
          onClick={handleBulkRemind}
          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{t('sendBulkReminder')}</span>
        </button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-3.5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? "শিক্ষার্থী বা কাগজের নাম দিয়ে খুঁজুন..." : "Filter by document name or student..."}
            className="w-full glass-input pl-9 pr-3 py-1.5 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40 shrink-0">Student:</span>
          <div className="min-w-[170px]">
            <CustomSelect
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">All Students</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.targetCountry})</option>
              ))}
            </CustomSelect>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40 shrink-0">Status:</span>
          <div className="min-w-[160px]">
            <CustomSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="verified">Verified (যাচাইকৃত)</option>
              <option value="received">Received (প্রাপ্ত)</option>
              <option value="requested">Requested (অনুরোধ পাঠানো)</option>
              <option value="not_requested">Not Requested (অপেক্ষমাণ)</option>
              <option value="rejected">Rejected (বাতিল)</option>
            </CustomSelect>
          </div>
        </div>
      </div>

      {/* Documents Table - 5 Columns Max */}
      <div className="glass-panel border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-white/50 border-b border-white/10">
              <tr>
                <th className="p-3.5 font-semibold">Student</th>
                <th className="p-3.5 font-semibold">Required Document</th>
                <th className="p-3.5 font-semibold">Due Date</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDocs.map(({ student, doc }) => {
                const isOverdue = doc.status !== 'verified' && doc.dueDate < '2026-09-30';
                return (
                  <tr key={`${student.id}-${doc.id}`} className="hover:bg-white/[0.04] transition">
                    {/* 1. Student */}
                    <td className="p-3.5">
                      <button
                        onClick={() => setSelectedStudentId(student.id)}
                        className="text-left group"
                      >
                        <div className="font-bold text-white group-hover:text-[#1EC1CB] transition truncate max-w-[150px]">
                          {lang === 'bn' ? student.nameBn : student.name}
                        </div>
                        <div className="text-[11px] text-white/40 truncate">
                          {student.countryFlag} {student.targetCountry}
                        </div>
                      </button>
                    </td>

                    {/* 2. Required Document & File Status */}
                    <td className="p-3.5">
                      <div className="font-semibold text-white">
                        {lang === 'bn' ? doc.nameBn : doc.name}
                      </div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5">
                        <span className="uppercase font-mono text-white/40">{doc.category}</span>
                        {doc.fileName ? (
                          <span className="font-mono text-[#1EC1CB] flex items-center gap-1">
                            <FileCheck className="w-3 h-3 text-emerald-400" />
                            {doc.fileName}
                          </span>
                        ) : (
                          <span className="text-white/30 italic">No upload</span>
                        )}
                      </div>
                    </td>

                    {/* 3. Due Date */}
                    <td className="p-3.5">
                      <div className={`font-mono ${isOverdue ? 'text-red-400 font-bold' : 'text-white/80'}`}>
                        {doc.dueDate}
                      </div>
                      {isOverdue && (
                        <div className="text-[10px] text-red-400 flex items-center gap-1 font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          OVERDUE
                        </div>
                      )}
                    </td>

                    {/* 4. Status Selector */}
                    <td className="p-3.5">
                      <div className="min-w-[130px]">
                        <CustomSelect
                          value={doc.status}
                          onChange={(e) => updateDocumentStatus(student.id, doc.id, e.target.value as DocumentStatus)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${
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
                    </td>

                    {/* 5. Actions */}
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          sendWhatsAppMessage(
                            student.id,
                            `Dear ${student.name}, reminder: Your ${doc.name} is due on ${doc.dueDate}. Please send a clean scan to proceed with your university submission.`
                          );
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold flex items-center gap-1 ml-auto transition"
                        title="Send WhatsApp Reminder"
                      >
                        <Send className="w-3 h-3" />
                        Remind
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
