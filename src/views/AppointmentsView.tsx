import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  Video, 
  Plus, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  UserCheck,
  Search,
  MessageSquare
} from 'lucide-react';
import { Appointment } from '../types';
import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';

export const AppointmentsView: React.FC = () => {
  const {
    appointments,
    users,
    students,
    addAppointment,
    updateAppointmentStatus,
    setSelectedStudentId,
    lang,
    t,
    showToast
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCounselor, setFilterCounselor] = useState('All');
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [counselorId, setCounselorId] = useState(users[0]?.id || '');
  const [date, setDate] = useState('2026-10-01');
  const [time, setTime] = useState('11:00 AM');
  const [type, setType] = useState<'in_office' | 'phone' | 'zoom'>('in_office');
  const [topic, setTopic] = useState('');
  const [locationOrLink, setLocationOrLink] = useState('Dhanmondi Office, Room 204');

  const filteredAppointments = appointments.filter((a) => {
    return filterCounselor === 'All' || a.counselorId === filterCounselor;
  });

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    const counselor = users.find((u) => u.id === counselorId);

    if (!student || !counselor) return;

    addAppointment({
      studentId: student.id,
      studentName: student.name,
      studentPhone: student.phone,
      counselorId: counselor.id,
      counselorName: counselor.name,
      date,
      time,
      durationMinutes: 45,
      type,
      locationOrLink: type === 'zoom' ? 'https://zoom.us/j/eduflow-meet' : locationOrLink,
      status: 'scheduled',
      topic: topic || 'Initial Study-Abroad Consultation'
    });

    setIsModalOpen(false);
    setTopic('');
  };

  return (
    <div className="space-y-4 w-full">
      {/* Shared Page Header */}
      <PageHeader
        title={lang === 'bn' ? 'কাউন্সেলিং ও সাক্ষাৎকার অ্যাপয়েন্টমেন্ট শিডিউলার' : 'Counseling & Student Appointment Scheduler'}
        description={lang === 'bn' ? 'অফিস মিটিং ও জুম কনসালটেশন (ডাবল-বুকিং প্রতিরোধ সক্রিয়)' : 'In-office, phone, and Zoom bookings with instant double-booking prevention'}
        badge={`${filteredAppointments.length} Bookings`}
      >
        <div className="min-w-[170px]">
          <CustomSelect
            value={filterCounselor}
            onChange={(e) => setFilterCounselor(e.target.value)}
            className="glass-input px-3 py-2 text-xs"
          >
            <option value="All">All Counselors</option>
            {users.filter(u => u.role === 'counselor').map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </CustomSelect>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#1EC1CB] hover:bg-[#19abb4] text-[#1C1C28] font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-[#1EC1CB]/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t('bookAppointment')}</span>
        </button>
      </PageHeader>

      {/* Appointment Cards List - 4 lines max, equal height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            className="glass-panel glass-panel-hoverable p-4 border border-white/10 space-y-2.5 flex flex-col justify-between"
          >
            {/* Line 1: Type icon, Student Name, Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 ${
                  apt.type === 'in_office' ? 'bg-[#1EC1CB]/15 text-[#1EC1CB]' :
                  apt.type === 'zoom' ? 'bg-indigo-500/15 text-indigo-400' :
                  'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {apt.type === 'in_office' && <MapPin className="w-3.5 h-3.5" />}
                  {apt.type === 'zoom' && <Video className="w-3.5 h-3.5" />}
                  {apt.type === 'phone' && <Phone className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <button
                    onClick={() => setSelectedStudentId(apt.studentId)}
                    className="text-xs font-bold text-white hover:text-[#1EC1CB] transition text-left truncate block"
                  >
                    {apt.studentName}
                  </button>
                  <p className="text-[11px] text-white/40 font-mono truncate">{apt.studentPhone}</p>
                </div>
              </div>

              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase shrink-0 ${
                apt.status === 'scheduled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                apt.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {apt.status}
              </span>
            </div>

            {/* Line 2: Date • Time • Duration */}
            <div className="text-xs text-white/70 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <Clock className="w-3 h-3 text-[#1EC1CB]" />
                {apt.date} • {apt.time}
              </span>
              <span className="text-[11px] text-white/40 font-mono">{apt.durationMinutes}m</span>
            </div>

            {/* Line 3: Topic & Advisor */}
            <div className="text-xs text-white/60 truncate">
              Topic: <strong className="text-white/80 font-medium">{apt.topic}</strong> (Adv: {apt.counselorName})
            </div>

            {/* Line 4: Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <div className="flex items-center gap-1.5">
                {apt.status === 'scheduled' ? (
                  <>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-medium transition"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'no_show')}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-medium transition"
                    >
                      No Show
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] text-white/40 italic">Completed</span>
                )}
              </div>

              <button
                onClick={() => setSelectedStudentId(apt.studentId)}
                className="text-xs text-[#1EC1CB] hover:underline font-semibold"
              >
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div 
            className="w-full max-w-lg glass-modal border border-white/20 rounded-2xl p-6 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Book New Student Appointment</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">Select Student</label>
                <CustomSelect
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full glass-input px-3 py-2 text-xs"
                >
                  {students.slice(0, 20).map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
                  ))}
                </CustomSelect>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Assigned Counselor</label>
                <CustomSelect
                  value={counselorId}
                  onChange={(e) => setCounselorId(e.target.value)}
                  className="w-full glass-input px-3 py-2 text-xs"
                >
                  {users.filter(u => u.role === 'counselor').map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </CustomSelect>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full glass-input px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Time Slot</label>
                  <CustomSelect
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-xs"
                  >
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </CustomSelect>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Meeting Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'in_office', label: 'In-Office' },
                    { id: 'zoom', label: 'Zoom Video' },
                    { id: 'phone', label: 'Phone Call' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setType(m.id as any)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-semibold ${
                        type === m.id ? 'bg-[#1EC1CB] text-[#1C1C28] border-[#1EC1CB]' : 'bg-white/5 border-white/10 text-white/60'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Discussion Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Bank Solvency review & university shortlist"
                  className="w-full glass-input px-3 py-2"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1EC1CB] text-[#1C1C28] font-bold"
                >
                  Confirm & Send WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
