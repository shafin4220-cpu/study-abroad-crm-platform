import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  UserCheck, 
  FileWarning, 
  Plane, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  MessageSquare, 
  Phone, 
  CheckCircle2,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { formatBDT, formatNumber } from '../i18n';
import { PipelineStage } from '../types';
import { PageHeader } from '../components/PageHeader';

export const DashboardView: React.FC = () => {
  const {
    students,
    appointments,
    tasks,
    setSelectedStudentId,
    setActiveTab,
    setIsAddLeadOpen,
    lang,
    t
  } = useApp();

  // Metric calculations
  const totalStudents = students.length;
  const newLeads = students.filter((s) => s.stage === 'lead').length;
  const inPipeline = students.filter((s) => s.stage !== 'departed').length;
  
  // Missing or overdue documents count
  const missingDocsCount = students.reduce((acc, s) => {
    return acc + s.documents.filter((d) => d.status !== 'verified').length;
  }, 0);

  const visasInProcess = students.filter((s) => s.stage === 'visa').length;
  const departedCount = students.filter((s) => s.stage === 'departed').length;
  const totalRevenue = students.reduce((acc, s) => acc + (s.budgetBDT * 0.05), 0); // 5% agency fee estimate

  // Today's focus calculations
  const todayApts = appointments.filter((a) => a.date === '2026-09-30' && a.status === 'scheduled');
  const overdueDocsStudents = students.filter((s) => s.documents.some((d) => d.dueDate < '2026-09-30' && d.status !== 'verified'));
  const stuckStudents = students.filter((s) => s.isStuck);

  const stages: { stage: PipelineStage; name: string; nameBn: string; count: number }[] = [
    { stage: 'lead', name: 'Lead', nameBn: 'লিড', count: students.filter((s) => s.stage === 'lead').length },
    { stage: 'counseling', name: 'Counseling', nameBn: 'কাউন্সেলিং', count: students.filter((s) => s.stage === 'counseling').length },
    { stage: 'documents', name: 'Documents', nameBn: 'ডকুমেন্ট', count: students.filter((s) => s.stage === 'documents').length },
    { stage: 'application', name: 'Application', nameBn: 'আবেদন', count: students.filter((s) => s.stage === 'application').length },
    { stage: 'offer', name: 'Offer', nameBn: 'অফার', count: students.filter((s) => s.stage === 'offer').length },
    { stage: 'visa', name: 'Visa', nameBn: 'ভিসা', count: students.filter((s) => s.stage === 'visa').length },
    { stage: 'departed', name: 'Departed', nameBn: 'ডিপার্টেড', count: students.filter((s) => s.stage === 'departed').length },
  ];

  const sourceBreakdown = [
    { name: 'Facebook Ads', count: students.filter((s) => s.source === 'Facebook').length },
    { name: 'WhatsApp Inbound', count: students.filter((s) => s.source === 'WhatsApp').length },
    { name: 'Walk-in (Offices)', count: students.filter((s) => s.source === 'Walk-in').length },
    { name: 'Student Referrals', count: students.filter((s) => s.source === 'Referral').length },
    { name: 'Website Portal', count: students.filter((s) => s.source === 'Website').length },
  ].map((s) => ({
    ...s,
    percent: Math.round((s.count / Math.max(totalStudents, 1)) * 100)
  }));

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'এক্সিকিউটিভ ড্যাশবোর্ড ও অ্যানালিটিক্স' : 'Executive Dashboard & Agency Operations'}
        description={lang === 'bn' ? 'শিক্ষার্থী পাইপলাইন, ভিসার অগ্রগতি ও তাৎক্ষণিক কনসালটেন্সি ইনসাইট' : 'Real-time pipeline progression, intake conversion metrics & daily counselor focus'}
        badge="Live Agency Sync"
      >
        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-[#1EC1CB]/25 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('newLeadBtn')}</span>
        </button>
      </PageHeader>

      {/* Top Banner Alert Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-3.5 border-amber-500/30 bg-amber-500/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <FileWarning className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-amber-200 truncate">
                {lang === 'bn' ? `${formatNumber(overdueDocsStudents.length, lang)} জন শিক্ষার্থীর জরুরি ডকুমেন্ট সময়সীমা পার হয়েছে` : `${overdueDocsStudents.length} students have overdue document deadlines`}
              </div>
              <div className="text-[11px] text-amber-300/70 truncate">
                {lang === 'bn' ? 'ব্যাংক সলভেন্সি ও আইইএলটিএস টিআরএফ আটকে আছে' : 'Immediate follow-up required to avoid university intake deferral'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-semibold flex items-center gap-1 transition shrink-0 ml-3"
          >
            {lang === 'bn' ? 'দেখুন' : 'Review'}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="glass-panel p-3.5 border-[#1EC1CB]/30 bg-[#1EC1CB]/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1EC1CB]/20 text-[#1EC1CB] shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {lang === 'bn' ? 'এই সপ্তাহে ৩ জনের ইউএস ও ইউকে ভিসা ইন্টারভিউ' : '3 visa embassy interviews scheduled this week'}
              </div>
              <div className="text-[11px] text-white/60 truncate">
                {lang === 'bn' ? 'রাফিউল ইসলাম (ইউএসএ) এর মক ইন্টারভিউ সেশন বাকি' : 'Rafiul Islam (USA) mock interview scheduled today at 3:00 PM'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('visa')}
            className="px-3 py-1.5 rounded-lg bg-[#1EC1CB]/20 hover:bg-[#1EC1CB]/30 text-[#1EC1CB] text-xs font-semibold flex items-center gap-1 transition shrink-0 ml-3"
          >
            {lang === 'bn' ? 'ট্র্যাকার' : 'Tracker'}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Glass Cards - 12-column grid, equal-height */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* New Leads */}
        <div 
          onClick={() => setActiveTab('leads')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statNewLeads')}</span>
            <Users className="w-4 h-4 text-[#1EC1CB] shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {formatNumber(newLeads, lang)}
          </div>
          <div className="text-[11px] text-[#1EC1CB] flex items-center gap-1 mt-1 font-medium truncate">
            <ArrowUpRight className="w-3 h-3 shrink-0" />
            +18% vs last week
          </div>
        </div>

        {/* Active In Pipeline */}
        <div 
          onClick={() => setActiveTab('pipeline')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statActiveStudents')}</span>
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {formatNumber(inPipeline, lang)}
          </div>
          <div className="text-[11px] text-white/50 mt-1 truncate">
            Across 7 stages
          </div>
        </div>

        {/* Pending Documents */}
        <div 
          onClick={() => setActiveTab('documents')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statDocsPending')}</span>
            <FileWarning className="w-4 h-4 text-amber-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-amber-300 tabular-nums">
            {formatNumber(missingDocsCount, lang)}
          </div>
          <div className="text-[11px] text-amber-400/80 mt-1 truncate">
            {formatNumber(overdueDocsStudents.length, lang)} overdue
          </div>
        </div>

        {/* Visas In Process */}
        <div 
          onClick={() => setActiveTab('visa')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statVisaInProcess')}</span>
            <Plane className="w-4 h-4 text-[#1EC1CB] shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {formatNumber(visasInProcess, lang)}
          </div>
          <div className="text-[11px] text-[#1EC1CB] mt-1 truncate">
            VFS & Embassy
          </div>
        </div>

        {/* Success Rate */}
        <div 
          onClick={() => setActiveTab('reports')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statConversionRate')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums">
            {lang === 'bn' ? `${formatNumber(86.4, lang)}%` : '86.4%'}
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1 truncate">
            High acceptance
          </div>
        </div>

        {/* Est. Intake Revenue */}
        <div 
          onClick={() => setActiveTab('reports')}
          className="glass-panel glass-panel-hoverable p-4 cursor-pointer border border-white/10 h-full flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium truncate">{t('statRevenue')}</span>
            <DollarSign className="w-4 h-4 text-[#1EC1CB] shrink-0" />
          </div>
          <div className="text-lg font-bold text-white tabular-nums">
            {formatBDT(Math.round(totalRevenue / 100000) * 100000, lang)}
          </div>
          <div className="text-[11px] text-white/50 mt-1 truncate">
            Jan 2027 Session
          </div>
        </div>
      </div>

      {/* Main Grid: Bento Dashboard Layout - 12 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left 8 Columns: Today's Focus & Funnel */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Today's Focus Card */}
          <div className="glass-panel p-4 md:p-5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {lang === 'bn' ? 'আজকের জরুরি কাজ ও সাক্ষাৎসমূহ (Today’s Focus)' : "Today's Immediate Counselor Action Items"}
                </h3>
              </div>
              <span className="text-xs font-mono text-white/50">
                30 Sep 2026
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Appointments for today */}
              {todayApts.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedStudentId(apt.studentId)}
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#1EC1CB]/40 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#1EC1CB]/15 text-[#1EC1CB] group-hover:scale-105 transition">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#1EC1CB]">
                          {apt.time} • {apt.studentName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-medium">
                          {apt.type === 'in_office' ? 'In-Office' : apt.type === 'zoom' ? 'Zoom Call' : 'Phone'}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                        {apt.topic} (Advisor: {apt.counselorName})
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#1EC1CB] transition" />
                </div>
              ))}

              {/* Overdue Documents Item */}
              {stuckStudents.slice(0, 2).map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudentId(s.id)}
                  className="p-3.5 rounded-xl bg-amber-500/[0.04] hover:bg-amber-500/[0.08] border border-amber-500/20 hover:border-amber-500/40 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-amber-300">
                          {s.name} ({s.targetCountry} {s.countryFlag})
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {lang === 'bn' ? `${formatNumber(s.daysInStage, lang)} দিন আটকে আছে` : `Stuck ${s.daysInStage} days`}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">
                        Stage: {s.stage.toUpperCase()} • Missing 28-day bank solvency verification
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-[#1EC1CB] hover:underline font-semibold flex items-center gap-1">
                    {lang === 'bn' ? 'প্রোফাইল' : 'Profile'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Funnel Visualizer */}
          <div className="glass-panel p-4 md:p-5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {lang === 'bn' ? 'শিক্ষার্থী পাইপলাইন ফানেল' : 'Student Pipeline Conversion Funnel'}
                </h3>
                <p className="text-xs text-white/50">
                  {lang === 'bn' ? 'ইনকোয়ারি থেকে বিমান ভ্রমণ পর্যন্ত অগ্রগতি' : 'Active progression across consultancy pipeline stages'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pipeline')}
                className="text-xs text-[#1EC1CB] hover:underline font-semibold flex items-center gap-1"
              >
                {lang === 'bn' ? 'পূর্ণাঙ্গ কানবান খুলুন' : 'Open Kanban Board'}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Custom SVG / Crystal Bars */}
            <div className="space-y-3">
              {stages.map((stg, i) => {
                const maxCount = Math.max(...stages.map((s) => s.count), 1);
                const widthPercent = Math.max((stg.count / maxCount) * 100, 12);
                return (
                  <div key={stg.stage} className="flex items-center gap-3 text-xs">
                    <span className="w-24 text-white/70 font-medium truncate">
                      {lang === 'bn' ? stg.nameBn : stg.name}
                    </span>
                    <div className="flex-1 bg-white/[0.04] h-7 rounded-xl p-1 relative overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-[#1EC1CB]/40 to-[#1EC1CB] flex items-center justify-end px-2.5 transition-all duration-500 shadow-sm"
                        style={{ width: `${widthPercent}%` }}
                      >
                        <span className="text-[11px] font-bold text-[#1C1C28]">
                          {formatNumber(stg.count, lang)}
                        </span>
                      </div>
                    </div>
                    <span className="w-12 text-right font-mono text-white/40">
                      {Math.round((stg.count / totalStudents) * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Lead Sources & Intake Strip */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Leads By Source Card */}
          <div className="glass-panel p-4 md:p-5 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{lang === 'bn' ? 'তথ্যের উৎস অনুযায়ী লিড' : 'Leads by Acquisition Source'}</span>
              <span className="text-xs text-[#1EC1CB] font-mono">100% Inbound</span>
            </h3>

            <div className="space-y-3">
              {sourceBreakdown.map((src) => (
                <div key={src.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80 font-medium">{src.name}</span>
                    <span className="text-white/50 font-mono">
                      {formatNumber(src.count, lang)} ({src.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1EC1CB] rounded-full"
                      style={{ width: `${src.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Users className="w-3.5 h-3.5 text-[#1EC1CB]" />
              {lang === 'bn' ? '+ নতুন লিড অ্যাড করুন' : '+ Quick Register New Lead'}
            </button>
          </div>

          {/* Upcoming Intake Calendar Strip */}
          <div className="glass-panel p-4 md:p-5 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1EC1CB]" />
              {lang === 'bn' ? 'আসন্ন বিশ্ববিদ্যালয় ইনটেক ক্যালেন্ডার' : 'Upcoming University Intakes'}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">UK / Canada Jan 2027</div>
                  <div className="text-[11px] text-white/50">Application Deadline: 15 Nov 2026</div>
                </div>
                <span className="text-xs font-semibold text-[#1EC1CB]">46 Days left</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Australia Feb 2027</div>
                  <div className="text-[11px] text-white/50">GTE / Financial Submission</div>
                </div>
                <span className="text-xs font-semibold text-emerald-400">Open</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Germany Summer 2027</div>
                  <div className="text-[11px] text-white/50">Uni-Assist & APS Verification</div>
                </div>
                <span className="text-xs font-semibold text-amber-300">Prepare Docs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
