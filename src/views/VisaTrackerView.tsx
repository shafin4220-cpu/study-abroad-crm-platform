import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plane, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { VisaStatus } from '../types';
import { PageHeader } from '../components/PageHeader';

export const VisaTrackerView: React.FC = () => {
  const { students, setSelectedStudentId, updateStudentStage, triggerConfetti, lang, t, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  // Filter students who have an active visaCase (exactly 5 cases)
  const visaStudents = students.filter((s) => Boolean(s.visaCase));

  const filtered = visaStudents.filter((s) => {
    if (filterStatus === 'All') return true;
    return s.visaCase?.status === filterStatus;
  });

  const handleApprove = (studentId: string, studentName: string) => {
    triggerConfetti();
    updateStudentStage(studentId, 'departed');
    showToast(`🎉 Visa Approved for ${studentName}! Celebration confetti triggered!`, 'success');
  };

  const getNextDateInfo = (vCase?: typeof visaStudents[0]['visaCase']) => {
    if (!vCase) return 'Pending Schedule';
    if (vCase.interviewDate && vCase.status === 'interview_scheduled') {
      return `Interview: ${vCase.interviewDate}`;
    }
    if (vCase.status === 'biometrics_done') {
      return `Decision due: 05 Oct 2026`;
    }
    if (vCase.status === 'approved') {
      return `Granted: ${vCase.decisionDate || 'Approved'}`;
    }
    if (vCase.appointmentDate) {
      return `Appointment: ${vCase.appointmentDate}`;
    }
    return 'Processing';
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'ভিসা আবেদন ও এম্বাসি ট্র্যাকার' : 'Embassy & Visa Case Management'}
        description={lang === 'bn' ? 'ভিএফএস ঢাকা/সিলেট অ্যাপয়েন্টমেন্ট, বায়োমেট্রিক্স ও ইন্টারভিউ ট্র্যাকিং' : 'Monitor VFS Dhaka & Sylhet biometric slots, interview dates, and decision updates'}
        badge={`${filtered.length} Active Cases`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="text-white/40">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="glass-input px-3 py-1.5 bg-[#1C1C28]"
          >
            <option value="All">All Visa Cases</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="biometrics_done">Biometrics Done</option>
            <option value="appointment_booked">Appointment Booked</option>
            <option value="approved">Approved (ভিসাপ্রাপ্ত)</option>
          </select>
        </div>
      </PageHeader>

      {/* Cards list - 4 lines max per card */}
      <div className="space-y-4">
        {filtered.map((student) => {
          const vCase = student.visaCase;
          const isInterviewSoon = vCase?.interviewDate === '2026-10-04';
          const isExpanded = expandedCaseId === student.id;
          return (
            <div
              key={student.id}
              onClick={() => setSelectedStudentId(student.id)}
              className="glass-panel glass-panel-hoverable p-4 md:p-5 border border-white/10 cursor-pointer space-y-3"
            >
              {/* Line 1: Student info & Visa status / Action */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1EC1CB]/15 border border-[#1EC1CB]/30 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {student.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white hover:text-[#1EC1CB]">
                        {lang === 'bn' ? student.nameBn : student.name}
                      </h3>
                      <span className="text-xs">{student.countryFlag} {student.targetCountry}</span>
                      {isInterviewSoon && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                          ⚡ Interview In 4 Days
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/50">{student.degreeLevel} • Counselor: {student.counselorName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                    vCase?.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    vCase?.status === 'interview_scheduled' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-[#1EC1CB]/20 text-[#1EC1CB] border border-[#1EC1CB]/30'
                  }`}>
                    {vCase?.status.replace('_', ' ') || 'PROCESSING'}
                  </span>

                  {vCase?.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(student.id, student.name)}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {/* Key Info Strip: Current Step, Next Date, Center */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-2.5 border-t border-white/5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider">Current Step</span>
                  <span className="font-semibold text-white mt-0.5 truncate flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1EC1CB]" />
                    {vCase?.status === 'approved' ? 'Visa Approved' :
                     vCase?.status === 'interview_scheduled' ? 'Embassy Interview' :
                     vCase?.status === 'biometrics_done' ? 'Biometrics Completed' : 'Appointment Booked'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider">Next Date</span>
                  <span className="font-semibold text-[#1EC1CB] font-mono mt-0.5 truncate flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1EC1CB]" />
                    {getNextDateInfo(vCase)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider">Embassy / VFS Center</span>
                  <span className="font-semibold text-white/90 mt-0.5 truncate flex items-center gap-1.5" title={vCase?.vfsCenter}>
                    <MapPin className="w-3.5 h-3.5 text-white/50" />
                    {vCase?.vfsCenter || 'Dhaka Visa Center'}
                  </span>
                </div>
              </div>

              {/* Line 3: More Details Toggle */}
              <div className="flex items-center justify-between pt-0.5 text-xs">
                <span className="text-[11px] text-white/40 font-mono">
                  Ref: {vCase?.casOrI20Number || 'Pending'}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCaseId(isExpanded ? null : student.id);
                  }}
                  className="text-xs text-[#1EC1CB] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Less Info' : 'More Details'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Secondary Details Section (Toggled) */}
              {isExpanded && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-black/20 p-3 rounded-xl border border-white/5 animate-in fade-in duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <span className="text-white/40 block text-[11px]">VFS / Embassy Center:</span>
                    <span className="text-white font-medium">{vCase?.vfsCenter || 'VFS Dhaka, Delta Life Tower'}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[11px]">CAS / I-20 Reference:</span>
                    <span className="font-mono text-[#1EC1CB] font-semibold">{vCase?.casOrI20Number || 'Pending'}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[11px]">Counselor Notes:</span>
                    <span className="text-white/80 line-clamp-2">{vCase?.notes || 'All financial sponsorship documents verified.'}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
