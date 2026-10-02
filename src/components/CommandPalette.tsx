import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  X, 
  UserPlus, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  User as UserIcon,
  Clock
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    students,
    setActiveTab,
    setSelectedStudentId,
    setIsAddLeadOpen,
    lang,
    setLang,
    t
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const filteredStudents = query.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.phone.includes(query) ||
          s.targetCountry.toLowerCase().includes(query.toLowerCase()) ||
          s.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : students.slice(0, 4);

  const quickActions = [
    {
      id: 'new-lead',
      title: lang === 'bn' ? 'নতুন লিড যোগ করুন' : 'Register New Student Lead',
      icon: UserPlus,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsAddLeadOpen(true);
      }
    },
    {
      id: 'pipeline',
      title: lang === 'bn' ? 'স্টুডেন্ট পাইপলাইন খুলুন' : 'Open Student Pipeline Kanban',
      icon: ArrowRight,
      action: () => {
        setIsCommandPaletteOpen(false);
        setActiveTab('pipeline');
      }
    },
    {
      id: 'appointments',
      title: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট ক্যালেন্ডার' : 'View Appointment Schedule',
      icon: Calendar,
      action: () => {
        setIsCommandPaletteOpen(false);
        setActiveTab('appointments');
      }
    },
    {
      id: 'documents',
      title: lang === 'bn' ? 'ডকুমেন্ট চেকলিস্ট ও রিমাইন্ডার' : 'Document Checklist & Reminders',
      icon: FileText,
      action: () => {
        setIsCommandPaletteOpen(false);
        setActiveTab('documents');
      }
    },
    {
      id: 'toggle-lang',
      title: lang === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন',
      icon: Globe,
      action: () => {
        setLang(lang === 'en' ? 'bn' : 'en');
        setIsCommandPaletteOpen(false);
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl glass-modal rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.03]">
          <Search className="w-5 h-5 text-[#1EC1CB] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'bn' ? "শিক্ষার্থী, ফোন নম্বর, দেশ বা কমান্ড অনুসন্ধান করুন..." : "Search student by name, phone (+880...), country, or run a command..."}
            className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none text-base"
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {!query && (
            <div>
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-2">
                {lang === 'bn' ? 'দ্রুত অ্যাকশন' : 'Quick Actions'}
              </div>
              <div className="space-y-1">
                {quickActions.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.08] text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1EC1CB]/10 flex items-center justify-center text-[#1EC1CB] group-hover:scale-105 transition">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-white/90 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-[#1EC1CB] font-mono">
                      ↵ Enter
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Student Matches */}
          <div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
              <span>{lang === 'bn' ? 'শিক্ষার্থীবৃন্দ' : 'Students'}</span>
              <span className="text-[11px] text-[#1EC1CB]">
                {filteredStudents.length} {lang === 'bn' ? 'ফলাফল' : 'matches'}
              </span>
            </div>
            {filteredStudents.length === 0 ? (
              <div className="p-6 text-center text-sm text-white/40">
                {lang === 'bn' ? 'কোনো শিক্ষার্থী পাওয়া যায়নি' : 'No students found matching your search'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStudentId(s.id);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.08] text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/90 font-medium text-sm border border-white/10">
                        {s.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white group-hover:text-[#1EC1CB]">
                            {lang === 'bn' ? s.nameBn : s.name}
                          </span>
                          <span className="text-xs">{s.countryFlag} {s.targetCountry}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                            s.leadScore === 'hot' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                            s.leadScore === 'warm' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {s.leadScore}
                          </span>
                        </div>
                        <div className="text-xs text-white/50 flex items-center gap-2 mt-0.5">
                          <span>{s.phone}</span>
                          <span>•</span>
                          <span>{s.degreeLevel}</span>
                          <span>•</span>
                          <span className="text-[#1EC1CB]">Stage: {s.stage.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-white/40 flex items-center gap-1 group-hover:text-white">
                      <span>{lang === 'bn' ? 'প্রোফাইল' : 'View Profile'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#1EC1CB]" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">ESC</kbd>
              Close
            </span>
          </div>
          <span className="text-[#1EC1CB]">
            EduFlow Fast Navigation
          </span>
        </div>
      </div>
    </div>
  );
};
