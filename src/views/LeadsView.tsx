import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Download, 
  Upload, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  MoreVertical,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { formatBDT, formatNumber } from '../i18n';
import { LeadScore } from '../types';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const LeadsView: React.FC = () => {
  const {
    students,
    users,
    setSelectedStudentId,
    setIsAddLeadOpen,
    sendWhatsAppMessage,
    lang,
    t,
    showToast,
    logAudit,
    activeTab
  } = useApp();

  const isStudentsTab = activeTab === 'students';
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCounselor, setSelectedCounselor] = useState('All');
  const [selectedScore, setSelectedScore] = useState<string>('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkCounselorId, setBulkCounselorId] = useState('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Filter students
  const filteredLeads = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || s.targetCountry === selectedCountry;
    const matchesCounselor = selectedCounselor === 'All' || s.counselorId === selectedCounselor;
    const matchesScore = selectedScore === 'All' || s.leadScore === selectedScore;
    return matchesSearch && matchesCountry && matchesCounselor && matchesScore;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkAssign = () => {
    if (!bulkCounselorId || selectedLeadIds.length === 0) return;
    const counselor = users.find((u) => u.id === bulkCounselorId);
    showToast(`Bulk assigned ${selectedLeadIds.length} leads to ${counselor?.name}`, 'success');
    logAudit('BULK_ASSIGN', `Assigned ${selectedLeadIds.length} leads to ${counselor?.name}`);
    setSelectedLeadIds([]);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name,Phone,Email,Country,Stage,Score,Counselor,Budget']
        .concat(
          filteredLeads.map(
            (l) =>
              `"${l.name}","${l.phone}","${l.email}","${l.targetCountry}","${l.stage}","${l.leadScore}","${l.counselorName}","${l.budgetBDT}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eduflow_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported successfully as CSV!', 'success');
    logAudit('EXPORT_LEADS', `Exported ${filteredLeads.length} leads to CSV`);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={isStudentsTab
          ? (lang === 'bn' ? 'সকল শিক্ষার্থী ডিরেক্টরি' : 'Registered Students Directory')
          : (lang === 'bn' ? 'শিক্ষার্থী ও লিড ডিরেক্টরি' : 'Student Leads & Inquiries Directory')
        }
        description={isStudentsTab
          ? (lang === 'bn' ? 'সকল সক্রিয় ও নথিভুক্ত শিক্ষার্থীর বিস্তারিত প্রোফাইল' : 'Comprehensive directory of all registered students with full history')
          : (lang === 'bn' ? 'মাল্টি-চ্যানেল ইনকোয়ারি, স্কোরিং ও কাউন্সেলর অ্যাসাইনমেন্ট' : 'Multi-channel inquiry intake, qualification scores & counselor assignment')
        }
        badge={isStudentsTab ? `${filteredLeads.length} Students` : `${filteredLeads.length} Leads`}
      >
        {/* View Toggle */}
        <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition ${
              viewMode === 'table' ? 'bg-[#1EC1CB] text-[#1C1C28]' : 'text-white/50 hover:text-white'
            }`}
            title="Table View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-lg transition ${
              viewMode === 'cards' ? 'bg-[#1EC1CB] text-[#1C1C28]' : 'text-white/50 hover:text-white'
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Export CSV */}
        <button
          onClick={handleExportCSV}
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition text-xs font-semibold flex items-center gap-1.5"
          title="Export CSV"
        >
          <Download className="w-3.5 h-3.5 text-[#1EC1CB]" />
          <span>Export</span>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-[#1EC1CB]/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t('newLeadBtn')}</span>
        </button>
      </PageHeader>

      {/* Filter and Control Bar */}
      <div className="glass-panel p-3.5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? "নাম বা ফোন নম্বর দিয়ে খুঁজুন..." : "Filter by name, mobile (+880), or email..."}
            className="w-full glass-input pl-9 pr-4 py-1.5 text-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Country */}
          <div className="min-w-[130px]">
            <CustomSelect
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">{lang === 'bn' ? 'সকল দেশ' : 'All Countries'}</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Malaysia">🇲🇾 Malaysia</option>
            </CustomSelect>
          </div>

          {/* Counselor */}
          <div className="min-w-[140px]">
            <CustomSelect
              value={selectedCounselor}
              onChange={(e) => setSelectedCounselor(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">{lang === 'bn' ? 'সকল কাউন্সেলর' : 'All Counselors'}</option>
              {users.filter(u => u.role === 'counselor').map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </CustomSelect>
          </div>

          {/* Lead Score */}
          <div className="min-w-[110px]">
            <CustomSelect
              value={selectedScore}
              onChange={(e) => setSelectedScore(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">{lang === 'bn' ? 'সকল স্কোর' : 'All Scores'}</option>
              <option value="hot">🔥 Hot</option>
              <option value="warm">⚡ Warm</option>
              <option value="cold">❄️ Cold</option>
            </CustomSelect>
          </div>
        </div>
      </div>

      {/* Bulk action toolbar when items are selected */}
      {selectedLeadIds.length > 0 && (
        <div className="glass-panel p-3 border-[#1EC1CB]/40 bg-[#1EC1CB]/10 flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 font-medium text-white">
            <span className="w-5 h-5 rounded-full bg-[#1EC1CB] text-[#1C1C28] text-[11px] font-bold flex items-center justify-center">
              {selectedLeadIds.length}
            </span>
            <span>{selectedLeadIds.length} leads selected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="min-w-[200px]">
              <CustomSelect
                value={bulkCounselorId}
                onChange={(e) => setBulkCounselorId(e.target.value)}
                className="glass-input px-3 py-1.5 text-xs"
              >
                <option value="">Select Counselor to Assign...</option>
                {users.filter(u => u.role === 'counselor').map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </CustomSelect>
            </div>
            <button
              onClick={handleBulkAssign}
              className="px-3 py-1.5 rounded-lg bg-[#1EC1CB] text-[#1C1C28] font-bold text-xs transition shrink-0"
            >
              Reassign Leads
            </button>
          </div>
        </div>
      )}

      {/* Main View: Table (max 5 columns) or Cards (max 4 lines) */}
      {viewMode === 'table' ? (
        <div className="glass-panel border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-white/50 border-b border-white/10">
                <tr>
                  <th className="p-3.5 font-semibold">{lang === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="p-3.5 font-semibold">{lang === 'bn' ? 'দেশ ও সেশন' : 'Destination'}</th>
                  <th className="p-3.5 font-semibold">{lang === 'bn' ? 'ধাপ ও স্কোর' : 'Stage & Score'}</th>
                  <th className="p-3.5 font-semibold">{lang === 'bn' ? 'কাউন্সেলর' : 'Counselor'}</th>
                  <th className="p-3.5 font-semibold text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => {
                  const isExpanded = expandedRowId === lead.id;
                  return (
                    <React.Fragment key={lead.id}>
                      <tr
                        className="hover:bg-white/[0.04] transition group cursor-pointer"
                        onClick={() => setSelectedStudentId(lead.id)}
                      >
                        {/* 1. Student Name & Checkbox */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(lead.id)}
                              onChange={() => handleToggleSelect(lead.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded bg-black/40 border-white/20 text-[#1EC1CB]"
                            />
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/10 shrink-0">
                              {lead.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white group-hover:text-[#1EC1CB] transition truncate max-w-[160px]">
                                {lang === 'bn' ? lead.nameBn : lead.name}
                              </div>
                              <div className="text-[11px] text-white/40 truncate font-mono">{lead.phone}</div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Destination */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5 font-medium text-white">
                            <span>{lead.countryFlag}</span>
                            <span className="truncate">{lead.targetCountry}</span>
                          </div>
                          <div className="text-[11px] text-white/40 font-mono">{lead.targetIntake}</div>
                        </td>

                        {/* 3. Stage & Score */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-medium text-[10px] uppercase tracking-wider">
                              {lead.stage}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                              lead.leadScore === 'hot' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              lead.leadScore === 'warm' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {lead.leadScore}
                            </span>
                          </div>
                        </td>

                        {/* 4. Counselor */}
                        <td className="p-3.5 text-white/80">
                          <span className="text-xs truncate block max-w-[120px]">{lead.counselorName}</span>
                        </td>

                        {/* 5. Actions & Row Expand */}
                        <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                sendWhatsAppMessage(lead.id, `Hello ${lead.name}, thank you for connecting with EduFlow! How can we assist your study abroad plans today?`);
                              }}
                              className="p-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition"
                              title="Quick WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setSelectedStudentId(lead.id)}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#1EC1CB] text-xs font-semibold transition"
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => setExpandedRowId(isExpanded ? null : lead.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition"
                              title={isExpanded ? "Collapse Details" : "Expand Details"}
                            >
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Row Expand for secondary details */}
                      {isExpanded && (
                        <tr className="bg-white/[0.02]">
                          <td colSpan={5} className="p-3.5 px-6 border-b border-white/5 text-xs">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-white/70">
                              <div>
                                <span className="text-white/40 block text-[11px]">Email:</span>
                                <span className="text-white font-mono">{lead.email}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[11px]">City & Source:</span>
                                <span className="text-white">{lead.city} • {lead.source}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[11px]">Degree Level:</span>
                                <span className="text-white">{lead.degreeLevel}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[11px]">Est. Budget:</span>
                                <span className="text-emerald-400 font-mono font-semibold">{formatBDT(lead.budgetBDT, lang)}</span>
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
      ) : (
        /* Cards Grid View - Max 4 Lines */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedStudentId(lead.id)}
              className="glass-panel glass-panel-hoverable p-4 border border-white/10 cursor-pointer space-y-2.5 flex flex-col justify-between"
            >
              {/* Line 1: Avatar + Name + Score */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/10 shrink-0">
                    {lead.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#1EC1CB] truncate">
                    {lang === 'bn' ? lead.nameBn : lead.name}
                  </h4>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase shrink-0 ${
                  lead.leadScore === 'hot' ? 'bg-red-500/20 text-red-300' :
                  lead.leadScore === 'warm' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {lead.leadScore}
                </span>
              </div>

              {/* Line 2: Destination & Intake */}
              <div className="text-xs text-white/70 flex items-center justify-between">
                <span className="font-medium text-white">{lead.countryFlag} {lead.targetCountry}</span>
                <span className="text-white/50 font-mono text-[11px]">{lead.targetIntake}</span>
              </div>

              {/* Line 3: Counselor & Stage */}
              <div className="text-xs text-white/60 flex items-center justify-between">
                <span>Counselor: <strong className="text-white font-medium">{lead.counselorName}</strong></span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 uppercase font-mono">{lead.stage}</span>
              </div>

              {/* Line 4: Phone & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <span className="text-[11px] font-mono text-white/40">{lead.phone}</span>
                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => sendWhatsAppMessage(lead.id, `Hello ${lead.name}, EduFlow follow-up message.`)}
                    className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition"
                    title="Quick WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
