import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Trophy, 
  Clock, 
  DollarSign, 
  Users, 
  Award,
  Globe,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { mockCounselorPerformance } from '../data/mockData';
import { formatBDT, formatNumber } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const ReportsView: React.FC = () => {
  const { lang, t, showToast, logAudit, students } = useApp();

  const [dateRange, setDateRange] = useState('Jan 2026 - Sep 2026');
  const [expandedCounselorId, setExpandedCounselorId] = useState<string | null>(null);

  const countryDemand = [
    { country: 'United Kingdom', flag: '🇬🇧', count: students.filter(s => s.targetCountry === 'UK').length },
    { country: 'Canada', flag: '🇨🇦', count: students.filter(s => s.targetCountry === 'Canada').length },
    { country: 'Australia', flag: '🇦🇺', count: students.filter(s => s.targetCountry === 'Australia').length },
    { country: 'United States', flag: '🇺🇸', count: students.filter(s => s.targetCountry === 'USA').length },
    { country: 'Germany', flag: '🇩🇪', count: students.filter(s => s.targetCountry === 'Germany').length },
    { country: 'Malaysia', flag: '🇲🇾', count: students.filter(s => s.targetCountry === 'Malaysia').length },
  ].map((c) => ({
    ...c,
    share: Math.round((c.count / Math.max(students.length, 1)) * 100)
  }));

  const handleExport = () => {
    showToast('Exporting comprehensive agency performance report (CSV)...', 'success');
    logAudit('EXPORT_REPORT', 'Generated and downloaded counselor-wise performance report');
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={t('counselorRankings')}
        description={lang === 'bn' 
          ? 'কাউন্সেলর ভিত্তিক কনভার্সন রেট, রেভিনিউ ও রেসপন্স টাইমের তুলনামূলক পারফরম্যান্স' 
          : 'Conversion velocity, visa approval rates, and revenue contributions per advisor'}
        badge="Performance Leaderboard"
      >
        <div className="min-w-[210px]">
          <CustomSelect
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="glass-input px-3 py-2 text-xs"
          >
            <option value="Jan 2026 - Sep 2026">Jan 2026 - Present (Full Year)</option>
            <option value="Jul 2026 - Sep 2026">Q3 (Jul - Sep 2026)</option>
            <option value="Sep 2026">Current Month (Sep 2026)</option>
          </CustomSelect>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-[#1EC1CB]/20"
        >
          <Download className="w-4 h-4" />
          <span>{t('exportReport')}</span>
        </button>
      </PageHeader>

      {/* Leaderboard Table - 5 Columns Max, rest in row expansion */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-white/50 border-b border-white/10">
              <tr>
                <th className="p-3.5 font-semibold">Rank & Counselor</th>
                <th className="p-3.5 font-semibold text-center">{t('leadsHandled')}</th>
                <th className="p-3.5 font-semibold text-center">{t('visasApproved')}</th>
                <th className="p-3.5 font-semibold text-center">{t('conversionRate')}</th>
                <th className="p-3.5 font-semibold text-right">Intake Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockCounselorPerformance.map((c, idx) => {
                const isExpanded = expandedCounselorId === c.counselorId;
                return (
                  <React.Fragment key={c.counselorId}>
                    <tr 
                      onClick={() => setExpandedCounselorId(isExpanded ? null : c.counselorId)}
                      className="hover:bg-white/[0.04] transition cursor-pointer group"
                    >
                      {/* 1. Rank & Counselor */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            idx === 0 ? 'bg-amber-400 text-black' :
                            idx === 1 ? 'bg-slate-300 text-black' :
                            idx === 2 ? 'bg-amber-600 text-white' :
                            'bg-white/10 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-xs group-hover:text-[#1EC1CB] transition truncate">
                              {lang === 'bn' ? c.nameBn : c.name}
                            </div>
                            <div className="text-[11px] text-white/40">Rating: ⭐ {c.rating}</div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Leads Handled */}
                      <td className="p-3.5 text-center font-mono text-white text-xs">
                        {formatNumber(c.leadsHandled, lang)}
                      </td>

                      {/* 3. Visas Approved */}
                      <td className="p-3.5 text-center font-mono text-emerald-400 font-bold text-xs">
                        {formatNumber(c.visasApproved, lang)}
                      </td>

                      {/* 4. Conversion Rate */}
                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold font-mono text-[11px]">
                          {formatNumber(c.conversionRate, lang)}%
                        </span>
                      </td>

                      {/* 5. Intake Revenue & Expand Toggle */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-bold text-[#1EC1CB] font-mono text-xs">
                            {formatBDT(c.revenueBDT, lang)}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${isExpanded ? 'rotate-180 text-[#1EC1CB]' : ''}`} />
                        </div>
                      </td>
                    </tr>

                    {/* Secondary details row expansion */}
                    {isExpanded && (
                      <tr className="bg-black/25">
                        <td colSpan={5} className="p-4 border-t border-white/5">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="text-white/40 block text-[11px]">Applications Submitted:</span>
                              <span className="font-mono text-white font-bold">{formatNumber(c.applications, lang)} applications</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="text-white/40 block text-[11px]">University Offers Issued:</span>
                              <span className="font-mono text-emerald-400 font-bold">{formatNumber(c.offers, lang)} unconditional/conditional</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="text-white/40 block text-[11px]">Avg WhatsApp Response Time:</span>
                              <span className="font-mono text-[#1EC1CB] font-bold">{formatNumber(c.avgResponseMinutes, lang)} minutes (Fast SLA)</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Country Demand & Intake Trend Bento Cards - 12-column grid, equal alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Country Demand Breakdown */}
        <div className="lg:col-span-6 glass-panel p-4 md:p-5 border border-white/10 space-y-3 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Destination Country Demand & Student Share</span>
            <Globe className="w-4 h-4 text-[#1EC1CB]" />
          </h3>

          <div className="space-y-2.5">
            {countryDemand.map((cd) => (
              <div key={cd.country} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 font-medium">
                    {cd.flag} {cd.country}
                  </span>
                  <span className="text-white/50 font-mono">
                    {formatNumber(cd.count, lang)} students ({cd.share}%)
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1EC1CB]/60 to-[#1EC1CB] rounded-full"
                    style={{ width: `${cd.share}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intake Revenue & Delay Insights */}
        <div className="lg:col-span-6 glass-panel p-4 md:p-5 border border-white/10 space-y-3 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Intake Velocity & Document Delay Metrics</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/40 block mb-1">Avg Stage Duration</span>
              <span className="text-base font-bold text-white font-mono">11.4 Days</span>
              <span className="text-[11px] text-emerald-400 block mt-0.5">2.3 days faster</span>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/40 block mb-1">Biggest Bottleneck</span>
              <span className="text-xs font-bold text-amber-300">Bank Solvency</span>
              <span className="text-[11px] text-white/50 block mt-0.5">28-day holding delay</span>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/40 block mb-1">WhatsApp Response</span>
              <span className="text-base font-bold text-[#1EC1CB] font-mono">16 Mins</span>
              <span className="text-[11px] text-[#1EC1CB] block mt-0.5">94% within 1 hr</span>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/40 block mb-1">Visa Success Ratio</span>
              <span className="text-base font-bold text-emerald-400 font-mono">92.3%</span>
              <span className="text-[11px] text-emerald-400 block mt-0.5">1 refusal in 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
