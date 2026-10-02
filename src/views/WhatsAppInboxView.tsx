import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  ShieldCheck, 
  UserPlus, 
  Check, 
  CheckCheck,
  Paperclip,
  Smile,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export const WhatsAppInboxView: React.FC = () => {
  const {
    conversations,
    students,
    users,
    currentUser,
    sendWhatsAppMessage,
    setSelectedStudentId,
    setIsAddLeadOpen,
    lang,
    t,
    showToast
  } = useApp();

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const linkedStudent = students.find((s) => s.id === activeConv?.studentId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendWhatsAppMessage(activeConv.studentId, inputText);
    setInputText('');
  };

  const templates = [
    {
      label: 'Document Pending Alert',
      text: 'Dear {student_name}, this is an urgent reminder from EduFlow regarding your pending documents. Please send high-resolution PDF scans today.'
    },
    {
      label: 'Offer Letter Received (Bangla)',
      text: 'অভিনন্দন! আপনার কাঙ্ক্ষিত বিশ্ববিদ্যালয় থেকে অফার লেটার চলে এসেছে। বিস্তারিত জানতে অফিসে যোগাযোগ করুন অথবা কল দিন।'
    },
    {
      label: 'Visa Interview Tips',
      text: 'Dear student, your visa interview is scheduled soon. Please bring all original academic certificates and 28-day holding bank solvency statements.'
    }
  ];

  const applyTemplate = (tpl: string) => {
    let replaced = tpl;
    if (linkedStudent) {
      replaced = replaced.replace('{student_name}', linkedStudent.name);
    }
    setInputText(replaced);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'হোয়াটসঅ্যাপ বিজনেস ক্লাউড ইনবক্স' : 'WhatsApp Cloud Messaging & Notification Hub'}
        description={lang === 'bn' ? 'মেটা ভেরিফায়েড অফিশিয়াল এপিআই ও স্টুডেন্ট কনসেন্ট সিকিউরড চ্যাট' : 'Meta Cloud API v19.0 verified direct messaging with student consent logging'}
        badge="Live Cloud v19.0"
      >
        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-[#25D366]/20"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{t('waConvertLead')}</span>
        </button>
      </PageHeader>

      {/* Main Chat Panel */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden h-[calc(100vh-270px)] flex flex-col md:flex-row">
        {/* Left Pane: Conversations List */}
        <div className="w-full md:w-80 border-r border-white/10 flex flex-col bg-black/20 shrink-0">
          {/* Search & Cloud API Banner */}
          <div className="p-3.5 border-b border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              WhatsApp Business API
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
              Live Cloud v19.0
            </span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat by name or phone..."
              className="w-full glass-input pl-8 pr-3 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* List items */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 text-left transition flex items-start gap-3 cursor-pointer ${
                  isSelected ? 'bg-white/[0.08] border-l-2 border-[#1EC1CB]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs shrink-0 border border-white/10">
                  {conv.studentName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {conv.studentName}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white/[0.01]">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/10">
                {activeConv.studentName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white">{activeConv.studentName}</h3>
                  <span className="text-[11px] font-mono text-white/50">{activeConv.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Student Consent Recorded</span>
                  <span>•</span>
                  <span>Assigned: {users.find(u => u.id === activeConv.assignedCounselorId)?.name || 'Counselor'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {linkedStudent ? (
                <button
                  onClick={() => setSelectedStudentId(linkedStudent.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-semibold flex items-center gap-1 transition"
                >
                  360° Profile
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAddLeadOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#1EC1CB] text-[#1C1C28] text-xs font-bold flex items-center gap-1 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {t('waConvertLead')}
                </button>
              )}
            </div>
          </div>

          {/* Quick Pre-Approved Templates Bar */}
          <div className="px-4 py-2 border-b border-white/5 bg-black/20 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-white/40 font-semibold shrink-0">Quick Templates:</span>
            {templates.map((tpl, i) => (
              <button
                key={i}
                onClick={() => applyTemplate(tpl.text)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white shrink-0 transition"
              >
                {tpl.label}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/30">
            {activeConv.messages.map((msg) => {
              const isCounselor = msg.sender === 'counselor';
              const isSystem = msg.sender === 'system';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isSystem
                      ? 'items-center my-3'
                      : isCounselor
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  {isSystem ? (
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono text-center max-w-md">
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-md ${
                        isCounselor
                          ? 'bg-[#25D366]/20 border border-[#25D366]/35 text-white rounded-br-none'
                          : 'bg-white/[0.07] border border-white/15 text-white rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-white/40 mb-0.5">
                        <span className="font-semibold text-white/70">{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.templateUsed && (
                        <div className="text-[9px] text-[#1EC1CB] font-mono mt-1">
                          Template: {msg.templateUsed}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSend} className="p-3.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('waTypePlaceholder')}
              className="flex-1 glass-input px-3.5 py-2.5 text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-[#25D366]/20"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-xs text-white/40">
          Select a chat to begin messaging
        </div>
      )}
      </div>
    </div>
  );
};
