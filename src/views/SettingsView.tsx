import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings as SettingsIcon, 
  Users, 
  ShieldCheck, 
  Lock, 
  Database, 
  FileText, 
  Bell, 
  Globe, 
  Check, 
  Sliders,
  AlertTriangle,
  History,
  Key
} from 'lucide-react';
import { UserRole } from '../types';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const SettingsView: React.FC = () => {
  const {
    users,
    currentUser,
    setCurrentUser,
    auditLogs,
    lang,
    setLang,
    t,
    showToast,
    logAudit
  } = useApp();

  const [activeTab, setActiveTab] = useState<'team' | 'security' | 'audit' | 'general'>('team');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const handleRoleSwitch = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(targetUser);
    showToast(`Switched active perspective to ${targetUser.name} (${role.toUpperCase()})`, 'info');
    logAudit('SWITCH_ROLE', `User switched role perspective to ${role.toUpperCase()}`);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={`${t('navSettings')} & Security Governance`}
        description={lang === 'bn' 
          ? 'টিম মেম্বার, অ্যাক্সেস রোল, ডেটা প্রটেকশন ও অডিট লগ কন্ট্রোল' 
          : 'Role-based permissions, GDPR & student data privacy controls, and security audit logs'}
        badge="Enterprise Security"
      >
        {/* Tab switcher */}
        <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-lg transition font-semibold ${
              activeTab === 'team' ? 'bg-[#1EC1CB] text-[#1C1C28]' : 'text-white/60 hover:text-white'
            }`}
          >
            Team & Roles
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg transition font-semibold ${
              activeTab === 'security' ? 'bg-[#1EC1CB] text-[#1C1C28]' : 'text-white/60 hover:text-white'
            }`}
          >
            Data Privacy & 2FA
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition font-semibold ${
              activeTab === 'audit' ? 'bg-[#1EC1CB] text-[#1C1C28]' : 'text-white/60 hover:text-white'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </PageHeader>

      {/* TEAM & ROLES TAB */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Test Role Perspectives (Staff Simulation)
                </h3>
                <p className="text-[11px] text-white/50">
                  Switch the active user profile to experience how the application renders for different staff roles:
                </p>
              </div>
              <span className="text-xs text-[#1EC1CB] font-bold">
                Current: {currentUser.name} ({currentUser.role.toUpperCase()})
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mt-3">
              {[
                { role: 'admin' as const, label: 'Owner / Admin' },
                { role: 'counselor' as const, label: 'Senior Counselor' },
                { role: 'doc_officer' as const, label: 'Doc & Visa Officer' },
                { role: 'receptionist' as const, label: 'Receptionist' }
              ].map((r) => (
                <button
                  key={r.role}
                  onClick={() => handleRoleSwitch(r.role)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    currentUser.role === r.role
                      ? 'bg-[#1EC1CB] text-[#1C1C28] border-[#1EC1CB] shadow-md shadow-[#1EC1CB]/30'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Staff Members & Role Permissions
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {users.map((u) => (
                <div key={u.id} className="p-4 flex items-center justify-between text-xs hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm border border-white/15">
                      {u.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-white/40">{u.email} • {u.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-white/60">
                      Countries: <strong className="text-white">{u.assignedCountries.join(', ')}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-mono uppercase text-[10px] tracking-wider border border-white/15">
                      {u.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECURITY & DATA PRIVACY TAB */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2FA Card */}
            <div className="glass-panel p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#1EC1CB]" />
                  <h3 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1EC1CB]"></div>
                </label>
              </div>
              <p className="text-xs text-white/60">
                Enforces SMS OTP verification or Google Authenticator code when staff log in from new browser devices in Bangladesh.
              </p>
            </div>

            {/* Session Timeout */}
            <div className="glass-panel p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-bold text-white">Inactivity Session Timeout</h3>
              </div>
              <p className="text-xs text-white/60">
                Automatically lock screen if counselor leaves their desk without locking terminal:
              </p>
              <div className="max-w-[260px]">
                <CustomSelect
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="glass-input px-3 py-1.5 text-xs"
                >
                  <option value="15">15 Minutes of Inactivity</option>
                  <option value="30">30 Minutes of Inactivity</option>
                  <option value="60">1 Hour of Inactivity</option>
                </CustomSelect>
              </div>
            </div>
          </div>

          {/* Masked Data Protection Policy */}
          <div className="glass-panel p-5 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Student Sensitive Identifier Shield (Passport, NID & Bank Accounts)
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              In accordance with international student data protection guidelines, all Bangladeshi National ID numbers, Passport numbers, and Bank Solvency balances are masked by default with bullet characters (••••••••). Revealing unmasked numbers generates an immutable record in the agency security audit log with user timestamp and IP address.
            </p>
            <div className="p-3 bg-black/30 rounded-xl border border-white/5 flex items-center justify-between text-xs text-white/60">
              <span>Auto-Data Retention Protocol:</span>
              <span className="font-mono text-[#1EC1CB]">5 Years Post-Departure (Regulatory Standard)</span>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT LOG TAB */}
      {activeTab === 'audit' && (
        <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-[#1EC1CB]" />
                Security & Data Access Audit Log
              </h3>
              <p className="text-[11px] text-white/40">
                Tamper-resistant activity trail of sensitive data views, status changes, and exports
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-white/50 border-b border-white/10 font-mono">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Staff User</th>
                  <th className="p-3.5">Action Code</th>
                  <th className="p-3.5">Audit Event Details</th>
                  <th className="p-3.5 text-right">IP & Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.03] transition">
                    <td className="p-3.5 font-mono text-white/70 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="p-3.5 font-medium text-white whitespace-nowrap">
                      {log.userName} ({log.userRole})
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[#1EC1CB] border border-[#1EC1CB]/30 font-mono text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 text-white/80">
                      {log.details}
                    </td>
                    <td className="p-3.5 text-right font-mono text-white/40 whitespace-nowrap">
                      {log.ipAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
