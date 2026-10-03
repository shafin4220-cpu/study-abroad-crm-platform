import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  UserPlus, 
  AlertTriangle, 
  Check, 
  Phone, 
  Mail, 
  Globe, 
  GraduationCap, 
  DollarSign, 
  Users,
  Building
} from 'lucide-react';
import { LeadScore } from '../types';
import { CustomSelect } from './CustomSelect';

export const QuickAddLeadDrawer: React.FC = () => {
  const {
    isAddLeadOpen,
    setIsAddLeadOpen,
    users,
    addStudent,
    checkDuplicatePhone,
    lang,
    t
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+880 1');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [targetCountry, setTargetCountry] = useState('UK');
  const [degreeLevel, setDegreeLevel] = useState('Master');
  const [targetIntake, setTargetIntake] = useState('Jan 2027');
  const [budgetBDT, setBudgetBDT] = useState<number>(2800000);
  const [source, setSource] = useState<'Facebook' | 'WhatsApp' | 'Walk-in' | 'Referral' | 'Website'>('Facebook');
  const [counselorId, setCounselorId] = useState(users[0]?.id || 'user-1');
  const [leadScore, setLeadScore] = useState<LeadScore>('hot');

  if (!isAddLeadOpen) return null;

  const isDuplicate = checkDuplicatePhone(phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStudent({
      name,
      nameBn: name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city,
      targetCountry,
      degreeLevel,
      targetIntake,
      budgetBDT,
      source,
      counselorId,
      leadScore
    });

    setIsAddLeadOpen(false);
    // Reset form
    setName('');
    setPhone('+880 1');
    setEmail('');
  };

  const countries = [
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'USA', flag: '🇺🇸' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Japan', flag: '🇯🇵' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-lg h-full glass-modal border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1EC1CB]/15 border border-[#1EC1CB]/30 flex items-center justify-center text-[#1EC1CB]">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'bn' ? 'নতুন স্টুডেন্ট লিড নিবন্ধন' : 'Register New Student Lead'}
                </h2>
                <p className="text-xs text-white/50">
                  {lang === 'bn' ? 'স্টুডেন্টের তথ্য সংগ্রহ ও তাৎক্ষণিক কাউন্সেলর নির্ধারণ' : 'Capture inquiry & assign to counselor in seconds'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAddLeadOpen(false)}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form id="add-lead-form" onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                {lang === 'bn' ? 'শিক্ষার্থীর নাম *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed / নুসরাত জাহান"
                className="w-full glass-input px-3.5 py-2.5 text-sm"
              />
            </div>

            {/* Mobile Number & Duplicate Check */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1 flex items-center justify-between">
                <span>{lang === 'bn' ? 'মোবাইল নম্বর (+৮৮০) *' : 'Mobile Number (+880) *'}</span>
                {isDuplicate && (
                  <span className="text-[11px] text-amber-400 flex items-center gap-1 font-normal">
                    <AlertTriangle className="w-3 h-3" />
                    {lang === 'bn' ? 'নম্বরটি আগে থেকেই বিদ্যমান!' : 'Duplicate phone detected!'}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1712-345678"
                  className={`w-full glass-input px-3.5 py-2.5 text-sm font-mono ${
                    isDuplicate ? 'border-amber-400/60 focus:border-amber-400' : ''
                  }`}
                />
                <Phone className="w-4 h-4 text-white/40 absolute right-3 top-3 pointer-events-none" />
              </div>
              {isDuplicate && (
                <p className="mt-1 text-[11px] text-amber-300/80 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  {lang === 'bn' 
                    ? 'সতর্কতা: এই ফোন নম্বরে পূর্বেই লিড তৈরি করা রয়েছে। প্রয়োজনে স্টুডেন্ট প্রোফাইল চেক করুন।' 
                    : 'Notice: Another student with this phone number exists. You can still create this lead if it is a new family member/application.'}
                </p>
              )}
            </div>

            {/* Email & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'ইমেইল' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full glass-input px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'শহর / জেলা' : 'Home City'}
                </label>
                <CustomSelect
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Barishal">Barishal (বরিশাল)</option>
                </CustomSelect>
              </div>
            </div>

            {/* Target Country & Degree */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'কাঙ্ক্ষিত দেশ' : 'Target Country'}
                </label>
                <CustomSelect
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </CustomSelect>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'ডিগ্রির স্তর' : 'Degree Level'}
                </label>
                <CustomSelect
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  <option value="Bachelor">Bachelor (অনার্স)</option>
                  <option value="Master">Master (মাস্টার্স)</option>
                  <option value="Diploma">Postgraduate Diploma</option>
                  <option value="PhD">Doctorate (PhD)</option>
                </CustomSelect>
              </div>
            </div>

            {/* Target Intake & Estimated Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'কাঙ্ক্ষিত সেশন' : 'Target Intake'}
                </label>
                <CustomSelect
                  value={targetIntake}
                  onChange={(e) => setTargetIntake(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  <option value="Jan 2027">Jan / Feb 2027</option>
                  <option value="May 2027">May / Summer 2027</option>
                  <option value="Sep 2026">Sep / Fall 2026</option>
                  <option value="Nov 2026">Nov / Winter 2026</option>
                </CustomSelect>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'বাজেট (টাকা ৳)' : 'Annual Budget (BDT)'}
                </label>
                <input
                  type="number"
                  step="100000"
                  value={budgetBDT}
                  onChange={(e) => setBudgetBDT(Number(e.target.value))}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Source & Assigned Counselor */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'তথ্যের উৎস' : 'Lead Source'}
                </label>
                <CustomSelect
                  value={source}
                  onChange={(e) => setSource(e.target.value as any)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  <option value="Facebook">Facebook Ads</option>
                  <option value="WhatsApp">WhatsApp Inbound</option>
                  <option value="Walk-in">Walk-in to Office</option>
                  <option value="Referral">Student Referral</option>
                  <option value="Website">Website Form</option>
                </CustomSelect>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {lang === 'bn' ? 'কাউন্সেলর নিয়োগ' : 'Assign Counselor'}
                </label>
                <CustomSelect
                  value={counselorId}
                  onChange={(e) => setCounselorId(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-sm"
                >
                  {users.filter(u => u.role === 'counselor' || u.role === 'admin').map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.assignedCountries.join(', ')})
                    </option>
                  ))}
                </CustomSelect>
              </div>
            </div>

            {/* Lead Temperature / Score */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                {lang === 'bn' ? 'লিডের মান (অগ্রাধিকার)' : 'Lead Qualification Score'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'hot', label: '🔥 Hot (Urgent)', color: 'text-red-400 border-red-500/30' },
                  { value: 'warm', label: '⚡ Warm (Normal)', color: 'text-amber-400 border-amber-500/30' },
                  { value: 'cold', label: '❄️ Cold (Future)', color: 'text-blue-400 border-blue-500/30' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLeadScore(item.value as LeadScore)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                      leadScore === item.value 
                        ? 'bg-white/10 border-[#1EC1CB] text-white shadow-sm ring-1 ring-[#1EC1CB]' 
                        : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-white/10 flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setIsAddLeadOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm transition"
          >
            {lang === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            form="add-lead-form"
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-sm transition shadow-lg shadow-[#1EC1CB]/20 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {lang === 'bn' ? 'সংরক্ষণ ও অ্যাসাইন করুন' : 'Save & Assign Lead'}
          </button>
        </div>
      </div>
    </div>
  );
};
