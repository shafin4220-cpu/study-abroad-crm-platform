import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  FileText, 
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { ApplicationStatus } from '../types';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const UniversityApplicationsView: React.FC = () => {
  const { students, setSelectedStudentId, lang, t, showToast } = useApp();

  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Flatten all applications across students
  const allApps = students.flatMap((student) =>
    student.applications.map((app) => ({
      student,
      app
    }))
  );

  const filteredApps = allApps.filter(({ student, app }) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Collect students with 2 or more applications for side-by-side comparison
  const multiOfferStudents = students.filter((s) => s.applications.length >= 2);
  const compareStudent = multiOfferStudents[0] || students.find((s) => s.applications.length > 0);

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'বিশ্ববিদ্যালয় আবেদন ও অফার লেটার ট্র্যাকিং' : 'University Applications & Offer Management'}
        description={lang === 'bn' ? 'টিউশন ফি, স্কলারশিপ ও অফার লেটার তুলনা' : 'Monitor portal IDs, tuition deposits, and side-by-side scholarship offers'}
        badge={`${filteredApps.length} Applications`}
      >
        <button
          onClick={() => setCompareDrawerOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-[#1EC1CB]/20"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'অফার লেটার তুলনা করুন' : 'Compare Offers Side-by-Side'}</span>
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
            placeholder={lang === 'bn' ? "বিশ্ববিদ্যালয় বা কোর্স খুঁজুন..." : "Filter by university name, program, or student..."}
            className="w-full glass-input pl-9 pr-3 py-1.5 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40">Status:</span>
          <div className="min-w-[190px]">
            <CustomSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input px-3 py-1.5 text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="unconditional_offer">Unconditional Offer (নিশ্চিত)</option>
              <option value="conditional_offer">Conditional Offer (শর্তসাপেক্ষ)</option>
              <option value="under_review">Under Review (পর্যালোচনাধীন)</option>
              <option value="submitted">Submitted (দাখিলকৃত)</option>
              <option value="draft">Draft (খসড়া)</option>
            </CustomSelect>
          </div>
        </div>
      </div>

      {/* Applications Cards Grid - 4 lines max, equal height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map(({ student, app }) => (
          <div
            key={app.id}
            onClick={() => setSelectedStudentId(student.id)}
            className="glass-panel glass-panel-hoverable p-4 border border-white/10 cursor-pointer space-y-2.5 flex flex-col justify-between"
          >
            {/* Line 1: Flag, University Name & Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[11px] text-white/50">{app.flag} {app.country}</span>
                <h3 className="text-xs font-bold text-white group-hover:text-[#1EC1CB] truncate">
                  {app.universityName}
                </h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase shrink-0 ${
                app.status === 'unconditional_offer' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                app.status === 'conditional_offer' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {app.status.replace('_', ' ')}
              </span>
            </div>

            {/* Line 2: Program • Degree */}
            <div className="text-xs text-[#1EC1CB] font-medium truncate">
              {app.program} • {app.degreeLevel}
            </div>

            {/* Line 3: Student Name & Intake */}
            <div className="text-xs text-white/70 flex items-center justify-between">
              <span>Student: <strong className="text-white font-medium">{student.name}</strong></span>
              <span className="text-white/50 font-mono text-[11px]">{app.intake}</span>
            </div>

            {/* Line 4: Tuition & Details Action */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-white/90 font-medium">
                  {app.currency} {app.tuitionPerYear.toLocaleString()}
                </span>
                {app.scholarshipAmount && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    +{app.currency} {app.scholarshipAmount.toLocaleString()} Sch.
                  </span>
                )}
              </div>
              <span className="text-[#1EC1CB] font-semibold flex items-center gap-1">
                Details
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Offers Drawer Modal */}
      {compareDrawerOpen && compareStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="w-full max-w-4xl glass-modal border border-white/20 rounded-2xl p-6 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">
                  University Offer Letter Comparison — {compareStudent.name}
                </h3>
                <p className="text-xs text-white/50">
                  Compare tuition fees, scholarships, and deposit deadlines side by side for informed decision-making
                </p>
              </div>
              <button
                onClick={() => setCompareDrawerOpen(false)}
                className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {compareStudent.applications.map((app) => (
                <div key={app.id} className="glass-panel p-5 border border-white/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">{app.flag} {app.country}</span>
                      <h4 className="text-base font-bold text-white mt-1">{app.universityName}</h4>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-[#1EC1CB] font-medium">{app.program}</div>

                  <div className="space-y-2 text-xs border-y border-white/10 py-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Annual Tuition:</span>
                      <span className="font-bold text-white font-mono">{app.currency} {app.tuitionPerYear.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span className="font-medium">Granted Scholarship:</span>
                      <span className="font-bold font-mono">-{app.currency} {app.scholarshipAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#1EC1CB] pt-1 border-t border-white/5">
                      <span>Net Annual Tuition:</span>
                      <span className="font-mono">{app.currency} {(app.tuitionPerYear - (app.scholarshipAmount || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-white/50">Deposit Deadline:</span>
                      <span className="text-amber-300 font-bold">{app.depositDeadline || 'N/A'}</span>
                    </div>
                  </div>

                  {app.notes && (
                    <p className="text-xs text-white/70 italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                      "{app.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                onClick={() => setCompareDrawerOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1EC1CB] text-[#1C1C28] font-bold text-xs"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
