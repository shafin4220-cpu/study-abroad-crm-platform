import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  GraduationCap, 
  FileText, 
  Building2, 
  Plane, 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Search, 
  Plus, 
  Globe, 
  Bell, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  UserCheck,
  ShieldCheck,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../i18n';
import { UserRole } from '../types';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const {
    lang,
    setLang,
    t,
    currentUser,
    setCurrentUser,
    users,
    activeTab,
    setActiveTab,
    setIsAddLeadOpen,
    setIsCommandPaletteOpen,
    toasts,
    appointments,
    tasks,
    conversations,
    students
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadWhatsApp = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const dueTasksToday = tasks.filter((t) => t.dueDate === '2026-09-30' && !t.completed).length;
  const pendingDocs = students.reduce((acc, s) => acc + s.documents.filter((d) => d.status === 'requested').length, 0);

  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, labelEn: 'Dashboard', labelBn: 'ড্যাশবোর্ড', badge: null },
    { id: 'leads', icon: Users, labelEn: 'Leads', labelBn: 'লিড', badge: null },
    { id: 'pipeline', icon: Kanban, labelEn: 'Pipeline', labelBn: 'পাইপলাইন', badge: null },
    { id: 'students', icon: GraduationCap, labelEn: 'Students', labelBn: 'স্টুডেন্ট', badge: null },
    { id: 'documents', icon: FileText, labelEn: 'Documents', labelBn: 'ডকুমেন্ট', badge: pendingDocs > 0 ? pendingDocs : null },
    { id: 'applications', icon: Building2, labelEn: 'Applications', labelBn: 'আবেদন', badge: null },
    { id: 'visa', icon: Plane, labelEn: 'Visa Tracker', labelBn: 'ভিসা', badge: null },
    { id: 'appointments', icon: Calendar, labelEn: 'Appointments', labelBn: 'অ্যাপয়েন্টমেন্ট', badge: appointments.filter(a => a.date === '2026-09-30').length },
    { id: 'whatsapp', icon: MessageSquare, labelEn: 'WhatsApp', labelBn: 'হোয়াটসঅ্যাপ', badge: unreadWhatsApp > 0 ? unreadWhatsApp : null },
    { id: 'tasks', icon: CheckSquare, labelEn: 'Tasks', labelBn: 'কাজ', badge: dueTasksToday > 0 ? dueTasksToday : null },
    { id: 'reports', icon: BarChart3, labelEn: 'Reports', labelBn: 'রিপোর্ট', badge: null },
    { id: 'settings', icon: Settings, labelEn: 'Settings', labelBn: 'সেটিংস', badge: null },
  ];

  const getPageDescription = () => {
    switch (activeTab) {
      case 'dashboard': return t('descDashboard');
      case 'leads': return t('descLeads');
      case 'pipeline': return t('descPipeline');
      case 'students': return t('descStudents');
      case 'documents': return t('descDocuments');
      case 'applications': return t('descApplications');
      case 'visa': return t('descVisa');
      case 'appointments': return t('descAppointments');
      case 'whatsapp': return t('descWhatsApp');
      case 'tasks': return t('descTasks');
      case 'reports': return t('descReports');
      case 'settings': return t('descSettings');
      default: return '';
    }
  };

  const getPageTitle = () => {
    const item = navigationItems.find(n => n.id === activeTab);
    if (!item) return 'Dashboard';
    return lang === 'bn' ? item.labelBn : item.labelEn;
  };

  return (
    <div className={`min-h-screen relative flex bg-[#1C1C28] text-white overflow-hidden ${lang === 'bn' ? 'font-bn' : ''}`}>
      {/* Refracting Cyan Ambient Orbs behind glass surfaces */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#1EC1CB]/15 rounded-full blur-[130px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/3 -right-40 w-[30rem] h-[30rem] bg-[#1EC1CB]/12 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-[#1EC1CB]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Left Glass Sidebar */}
      <aside
        className={`relative z-20 shrink-0 transition-[width] duration-300 ease-in-out border-r border-white/10 bg-[#181824]/80 backdrop-blur-2xl flex flex-col h-screen sticky top-0 overflow-y-auto ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Collapse button */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1EC1CB] to-teal-200 flex items-center justify-center text-[#1C1C28] font-black text-base shadow-lg shadow-[#1EC1CB]/30">
                  E
                </div>
                <div>
                  <span className="text-base font-black tracking-tight text-white">Edu<span className="text-[#1EC1CB]">Flow</span></span>
                  <span className="block text-[9px] text-[#1EC1CB] font-mono tracking-widest uppercase -mt-0.5">Study Abroad CRM</span>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 mx-auto rounded-xl bg-gradient-to-tr from-[#1EC1CB] to-teal-200 flex items-center justify-center text-[#1C1C28] font-black text-base shadow-lg shadow-[#1EC1CB]/30">
                E
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links - 8px gap between items */}
          <nav className="p-3 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={sidebarCollapsed ? (lang === 'bn' ? item.labelBn : item.labelEn) : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer group relative ${
                    isActive
                      ? 'bg-[#1EC1CB] text-[#1C1C28] font-bold shadow-lg shadow-[#1EC1CB]/25'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1C1C28]' : 'text-white/70 group-hover:text-[#1EC1CB]'}`} />
                  
                  {!sidebarCollapsed && (
                    <span className="truncate flex-1 text-left">
                      {lang === 'bn' ? item.labelBn : item.labelEn}
                    </span>
                  )}

                  {!sidebarCollapsed && item.badge !== null && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#1C1C28]/20 text-[#1C1C28]' : 'bg-[#1EC1CB]/20 text-[#1EC1CB]'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {sidebarCollapsed && item.badge !== null && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#1EC1CB]"></span>
                  )}
                </button>
              );
            })}

            {/* User Profile Block directly below menu with 16px gap */}
            <div className="pt-2 mt-2 border-t border-white/5">
              <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/15">
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider font-mono truncate">
                        {currentUser.role.replace('_', ' ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 bg-[#181824]/60 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between gap-4 shrink-0">
          {/* Global Search & Command Palette Trigger */}
          <div 
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex-1 max-w-md hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-input text-xs text-white/40 cursor-pointer hover:bg-white/[0.06] hover:border-white/20 transition group"
          >
            <Search className="w-4 h-4 text-white/40 group-hover:text-[#1EC1CB] transition" />
            <span className="flex-1 truncate">{t('searchPlaceholder')}</span>
            <div className="flex items-center gap-1 font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60">
              <span>⌘K</span>
            </div>
          </div>

          {/* Top Actions: + New Lead, Language Toggle, Role Selector, Notifications */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* + New Lead Button */}
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-[#1EC1CB]/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('newLeadBtn')}</span>
            </button>

            {/* Language Switcher (Instant বাংলা / EN toggle) */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/90 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              title="Toggle Language (বাংলা / English)"
            >
              <Globe className="w-3.5 h-3.5 text-[#1EC1CB]" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Staff Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-1.5 transition"
                title="Switch Staff Role Perspective"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#1EC1CB]" />
                <span className="hidden md:inline capitalize">{currentUser.role.replace('_', ' ')}</span>
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 glass-modal p-2 rounded-xl border border-white/20 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-2 py-1">
                    Select Staff Role
                  </div>
                  {[
                    { role: 'admin' as const, label: 'Owner / Admin' },
                    { role: 'counselor' as const, label: 'Senior Counselor' },
                    { role: 'doc_officer' as const, label: 'Document & Visa Officer' },
                    { role: 'receptionist' as const, label: 'Receptionist' }
                  ].map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        const target = users.find(u => u.role === r.role) || users[0];
                        setCurrentUser(target);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition font-medium ${
                        currentUser.role === r.role ? 'bg-[#1EC1CB] text-[#1C1C28] font-bold' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1EC1CB] ring-2 ring-[#1C1C28]"></span>
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 glass-modal p-3 rounded-2xl border border-white/20 shadow-2xl z-50 text-xs space-y-2 animate-in fade-in zoom-in-95"
                  onClick={() => setNotificationsOpen(false)}
                >
                  <div className="font-bold text-white text-xs flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Staff Notifications</span>
                    <span className="text-[10px] text-[#1EC1CB]">3 New</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                      <div className="font-semibold text-white">Missing Bank Solvency</div>
                      <div className="text-[11px] text-white/50">Tanvir Ahmed due date is in 5 days</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                      <div className="font-semibold text-white">US Embassy Visa Mock</div>
                      <div className="text-[11px] text-white/50">Rafiul Islam session at 3:00 PM today</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable View Content Container - 24px desktop, 16px mobile, 24px bottom */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-6">
          <div key={activeTab} className="max-w-7xl mx-auto w-full space-y-4 animate-page-fade">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass-modal pointer-events-auto px-4 py-3 rounded-xl border border-white/20 shadow-2xl text-xs flex items-center gap-3 animate-in slide-in-from-bottom duration-200"
          >
            {toast.type === 'success' && (
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
            <span className="font-medium text-white">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
