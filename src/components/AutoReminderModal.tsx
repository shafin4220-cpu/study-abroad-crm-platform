import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bell, 
  Clock, 
  MessageSquare, 
  Check, 
  Sliders, 
  ShieldCheck,
  Moon
} from 'lucide-react';

export const AutoReminderModal: React.FC = () => {
  const {
    isAutoReminderModalOpen,
    setIsAutoReminderModalOpen,
    reminderRules,
    lang,
    showToast
  } = useApp();

  const [activeRuleIdx, setActiveRuleIdx] = useState(0);
  const [templateEn, setTemplateEn] = useState(reminderRules[0]?.templateEn || '');
  const [templateBn, setTemplateBn] = useState(reminderRules[0]?.templateBn || '');
  const [quietHoursStart, setQuietHoursStart] = useState('21:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('09:00');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);

  if (!isAutoReminderModalOpen) return null;

  const currentRule = reminderRules[activeRuleIdx];

  const handleSave = () => {
    showToast('Auto-reminder rule preferences updated successfully!', 'success');
    setIsAutoReminderModalOpen(false);
  };

  const previewVariables = {
    '{student_name}': 'Tanvir Ahmed',
    '{document_name}': '6-Month Bank Solvency & Statement',
    '{due_date}': '05 Oct 2026',
    '{counselor_name}': 'Shamim Reza'
  };

  const renderPreview = (text: string) => {
    let replaced = text;
    for (const [key, val] of Object.entries(previewVariables)) {
      replaced = replaced.replaceAll(key, val);
    }
    return replaced;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl glass-modal border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1EC1CB]/15 border border-[#1EC1CB]/30 flex items-center justify-center text-[#1EC1CB]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'bn' ? 'স্বয়ংক্রিয় ডকুমেন্ট রিমাইন্ডার ইঞ্জিন' : 'Automated WhatsApp Reminder Engine'}
              </h2>
              <p className="text-xs text-white/50">
                {lang === 'bn' ? 'টাইমিং রুলস, টেমপ্লেট ভেরিয়েবল এবং নো-বিরক্ত কোয়ায়েট আওয়ার্স কনফিগারেশন' : 'Configure timing triggers, dynamic template variables, and quiet hours'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAutoReminderModalOpen(false)}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Rule Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
              {lang === 'bn' ? 'রিমাইন্ডার ট্রিগার রুলসমূহ' : 'Reminder Trigger Rules'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {reminderRules.map((rule, idx) => (
                <button
                  key={rule.id}
                  onClick={() => {
                    setActiveRuleIdx(idx);
                    setTemplateEn(rule.templateEn);
                    setTemplateBn(rule.templateBn);
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    activeRuleIdx === idx
                      ? 'bg-[#1EC1CB]/15 border-[#1EC1CB] text-white shadow-sm ring-1 ring-[#1EC1CB]'
                      : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">{rule.name}</div>
                  <div className="text-[11px] text-[#1EC1CB]">
                    {rule.triggerDaysBefore > 0 
                      ? `${rule.triggerDaysBefore} days before deadline`
                      : rule.triggerOnDue 
                      ? 'On deadline day'
                      : `Every ${rule.triggerIfOverdueDays} days if overdue`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Template Editors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English Template */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 flex items-center justify-between">
                <span>WhatsApp Message Template (English)</span>
                <span className="text-[10px] text-white/40 font-mono">Meta Cloud API pre-approved</span>
              </label>
              <textarea
                rows={4}
                value={templateEn}
                onChange={(e) => setTemplateEn(e.target.value)}
                className="w-full glass-input p-3 text-xs resize-none"
              />
            </div>

            {/* Bangla Template */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 flex items-center justify-between">
                <span>হোয়াটসঅ্যাপ মেসেজ টেমপ্লেট (বাংলা)</span>
                <span className="text-[10px] text-white/40 font-mono">বাংলা ও প্রমিত ভাষা</span>
              </label>
              <textarea
                rows={4}
                value={templateBn}
                onChange={(e) => setTemplateBn(e.target.value)}
                className="w-full glass-input p-3 text-xs font-bn resize-none"
              />
            </div>
          </div>

          {/* Dynamic Variables helper chips */}
          <div>
            <div className="text-xs font-medium text-white/50 mb-2">
              Available dynamic placeholder tags (click to copy):
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['{student_name}', '{document_name}', '{due_date}', '{counselor_name}'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(v);
                    showToast(`Copied ${v} to clipboard!`, 'info');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#1EC1CB] hover:bg-[#1EC1CB]/10 transition"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="glass-panel p-4 border border-[#25D366]/30 bg-[#25D366]/[0.03]">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#25D366]">
              <MessageSquare className="w-3.5 h-3.5" />
              Live WhatsApp Simulation Preview
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-white/90 font-sans leading-relaxed">
              {renderPreview(lang === 'bn' ? templateBn : templateEn)}
            </div>
          </div>

          {/* Quiet Hours Policy */}
          <div className="glass-panel p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold text-white">Quiet Hours (Anti-Spam Protocol)</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={quietHoursEnabled}
                  onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1EC1CB]"></div>
              </label>
            </div>
            <p className="text-[11px] text-white/50">
              Never send automated WhatsApp pings during late evening or early morning to respect student privacy and avoid spam reports.
            </p>
            {quietHoursEnabled && (
              <div className="flex items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Do not send from:</span>
                  <input
                    type="time"
                    value={quietHoursStart}
                    onChange={(e) => setQuietHoursStart(e.target.value)}
                    className="glass-input px-2.5 py-1 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Until:</span>
                  <input
                    type="time"
                    value={quietHoursEnd}
                    onChange={(e) => setQuietHoursEnd(e.target.value)}
                    className="glass-input px-2.5 py-1 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="text-xs text-white/40 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Meta WhatsApp Cloud API Compliance Active
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoReminderModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition shadow-lg shadow-[#1EC1CB]/20 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
