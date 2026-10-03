import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  AlertCircle, 
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { PipelineStage } from '../types';
import { formatNumber } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const PipelineView: React.FC = () => {
  const {
    students,
    users,
    updateStudentStage,
    setSelectedStudentId,
    sendWhatsAppMessage,
    lang,
    t
  } = useApp();

  const [filterCounselor, setFilterCounselor] = useState('All');
  const [filterCountry, setFilterCountry] = useState('All');
  const [draggedStudentId, setDraggedStudentId] = useState<string | null>(null);

  const stages: { stage: PipelineStage; labelEn: string; labelBn: string; color: string }[] = [
    { stage: 'lead', labelEn: 'Lead', labelBn: 'লিড', color: 'border-blue-400/30' },
    { stage: 'counseling', labelEn: 'Counseling', labelBn: 'কাউন্সেলিং', color: 'border-cyan-400/30' },
    { stage: 'documents', labelEn: 'Documents', labelBn: 'ডকুমেন্ট', color: 'border-amber-400/30' },
    { stage: 'application', labelEn: 'Application', labelBn: 'আবেদন', color: 'border-indigo-400/30' },
    { stage: 'offer', labelEn: 'Offer', labelBn: 'অফার', color: 'border-emerald-400/30' },
    { stage: 'visa', labelEn: 'Visa', labelBn: 'ভিসা', color: 'border-pink-400/30' },
    { stage: 'departed', labelEn: 'Departed', labelBn: 'ডিপার্টেড', color: 'border-emerald-500/30' },
  ];

  const filteredStudents = students.filter((s) => {
    const counselorMatch = filterCounselor === 'All' || s.counselorId === filterCounselor;
    const countryMatch = filterCountry === 'All' || s.targetCountry === filterCountry;
    return counselorMatch && countryMatch;
  });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedStudentId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedStudentId;
    if (id) {
      updateStudentStage(id, targetStage);
    }
    setDraggedStudentId(null);
  };

  const advanceStage = (e: React.MouseEvent, studentId: string, currentStage: PipelineStage) => {
    e.stopPropagation();
    const stageKeys: PipelineStage[] = ['lead', 'counseling', 'documents', 'application', 'offer', 'visa', 'departed'];
    const idx = stageKeys.indexOf(currentStage);
    if (idx < stageKeys.length - 1) {
      updateStudentStage(studentId, stageKeys[idx + 1]);
    }
  };

  const moveStageBack = (e: React.MouseEvent, studentId: string, currentStage: PipelineStage) => {
    e.stopPropagation();
    const stageKeys: PipelineStage[] = ['lead', 'counseling', 'documents', 'application', 'offer', 'visa', 'departed'];
    const idx = stageKeys.indexOf(currentStage);
    if (idx > 0) {
      updateStudentStage(studentId, stageKeys[idx - 1]);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'শিক্ষার্থী পাইপলাইন কানবান' : 'Student Counseling & Processing Pipeline'}
        description={lang === 'bn' ? '৭টি প্রধান ধাপে শিক্ষার্থীদের অগ্রগতি ও রিয়েল-টাইম ড্র্যাগ-অ্যান্ড-ড্রপ' : 'Real-time drag-and-drop kanban tracking active students across 7 intake milestones'}
        badge={`${filteredStudents.length} In Pipeline`}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">Counselor:</span>
          <div className="min-w-[150px]">
            <CustomSelect
              value={filterCounselor}
              onChange={(e) => setFilterCounselor(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">All Counselors</option>
              {users.filter(u => u.role === 'counselor').map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </CustomSelect>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">Country:</span>
          <div className="min-w-[140px]">
            <CustomSelect
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">All Countries</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Malaysia">🇲🇾 Malaysia</option>
            </CustomSelect>
          </div>
        </div>
      </PageHeader>

      {/* Top Drag Hint Banner */}
      <div className="glass-panel p-3 border border-white/10 flex items-center justify-between text-xs text-white/60">
        <span className="truncate">{t('dragHint')}</span>
        <span className="text-[11px] text-[#1EC1CB] font-mono shrink-0 ml-2">7 Milestone Stages</span>
      </div>

      {/* Kanban Horizontal Columns - 16px gap */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start min-h-[calc(100vh-270px)]">
        {stages.map((stg) => {
          const colStudents = filteredStudents.filter((s) => s.stage === stg.stage);
          return (
            <div
              key={stg.stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stg.stage)}
              className="w-80 shrink-0 glass-panel border border-white/10 rounded-2xl flex flex-col max-h-[82vh]"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between sticky top-0 rounded-t-2xl backdrop-blur-md z-10">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase">
                    {lang === 'bn' ? stg.labelBn : stg.labelEn}
                  </h3>
                  <span className="w-5 h-5 rounded-full bg-[#1EC1CB]/20 text-[#1EC1CB] text-[11px] font-bold flex items-center justify-center border border-[#1EC1CB]/30">
                    {formatNumber(colStudents.length, lang)}
                  </span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">
                  {Math.round((colStudents.length / Math.max(filteredStudents.length, 1)) * 100)}%
                </span>
              </div>

              {/* Cards List */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {colStudents.length === 0 ? (
                  <div className="p-8 text-center text-xs text-white/30 border border-dashed border-white/10 rounded-xl">
                    {lang === 'bn' ? 'কোনো শিক্ষার্থী নেই' : 'Drag students here to move stage'}
                  </div>
                ) : (
                  colStudents.map((s) => (
                    <div
                      key={s.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, s.id)}
                      onClick={() => setSelectedStudentId(s.id)}
                      className={`glass-panel glass-panel-hoverable p-3.5 rounded-xl border cursor-grab active:cursor-grabbing transition-all space-y-2.5 ${
                        s.isStuck ? 'border-amber-500/40 bg-amber-500/[0.04]' : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      {/* Card Header: Avatar & Info */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/10">
                            {s.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white hover:text-[#1EC1CB] transition line-clamp-1">
                              {lang === 'bn' ? s.nameBn : s.name}
                            </h4>
                            <div className="text-[10px] text-white/50 flex items-center gap-1">
                              <span>{s.countryFlag} {s.targetCountry}</span>
                              <span>•</span>
                              <span>{s.degreeLevel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stuck Alert or Lead Score Badge */}
                        {s.isStuck ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-semibold">
                            <Clock className="w-2.5 h-2.5" />
                            Stuck
                          </span>
                        ) : (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase ${
                            s.leadScore === 'hot' ? 'bg-red-500/20 text-red-300' :
                            s.leadScore === 'warm' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {s.leadScore}
                          </span>
                        )}
                      </div>

                      {/* Details row: Counselor & Days in Stage */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/60">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3 h-3 text-[#1EC1CB]" />
                          <span className="truncate max-w-[120px]">{s.counselorName}</span>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">
                          {formatNumber(s.daysInStage, lang)}d in stage
                        </span>
                      </div>

                      {/* Stage Move Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <button
                          type="button"
                          onClick={(e) => moveStageBack(e, s.id, s.stage)}
                          disabled={stg.stage === 'lead'}
                          className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20 transition"
                          title="Move Back"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] text-[#1EC1CB] font-semibold">
                          Click for 360° Profile
                        </span>
                        <button
                          type="button"
                          onClick={(e) => advanceStage(e, s.id, s.stage)}
                          disabled={stg.stage === 'departed'}
                          className="p-1 rounded text-white/40 hover:text-[#1EC1CB] disabled:opacity-20 transition"
                          title="Advance to Next Stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
