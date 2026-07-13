import React, { useState, useEffect } from 'react';
import { StudentRecord, WeaknessCategoryLabels } from '../types';
import { 
  Bell, 
  BellRing, 
  X, 
  AlertTriangle, 
  Check, 
  User, 
  PhoneCall, 
  Mail, 
  Calendar, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface AlertNotificationCenterProps {
  records: StudentRecord[];
}

export default function AlertNotificationCenter({ records }: AlertNotificationCenterProps) {
  // Acknowledged warning IDs
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load acknowledged alerts on mount
  useEffect(() => {
    const saved = localStorage.getItem('acknowledged_red_alerts');
    if (saved) {
      try {
        setAcknowledgedIds(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading acknowledged alerts', e);
      }
    }
  }, []);

  // Save acknowledged alerts to localStorage
  const saveAcknowledged = (newIds: string[]) => {
    setAcknowledgedIds(newIds);
    localStorage.setItem('acknowledged_red_alerts', JSON.stringify(newIds));
  };

  // Find all students with a red progress signal
  const redSignalStudents = records.filter(r => r.progressSignal === 'Red');
  
  // Filter out those already acknowledged
  const activeAlertStudents = redSignalStudents.filter(r => !acknowledgedIds.includes(r.id));

  // Acknowledge single alert
  const handleAcknowledge = (id: string, name: string) => {
    const updated = [...acknowledgedIds, id];
    saveAcknowledged(updated);
  };

  // Reset/Show all alerts again
  const handleResetAlerts = () => {
    saveAcknowledged([]);
  };

  if (redSignalStudents.length === 0) return null;

  return (
    <div id="alert-notification-center" className="space-y-3 no-print">
      
      {/* Alarm Banner Trigger / Status Indicator */}
      <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl ${
        activeAlertStudents.length > 0 
          ? 'bg-gradient-to-r from-red-950/70 via-slate-950/90 to-red-950/70 border-red-500/35 shadow-red-950/20' 
          : 'bg-slate-900/40 border-white/10'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <span className={`p-2.5 rounded-xl border flex items-center justify-center ${
              activeAlertStudents.length > 0 
                ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                : 'bg-slate-800 border-white/10 text-slate-400'
            }`}>
              {activeAlertStudents.length > 0 ? (
                <BellRing className="w-5 h-5 animate-bounce" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </span>
            {activeAlertStudents.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center animate-pulse">
                {activeAlertStudents.length}
              </span>
            )}
          </div>
          
          <div className="space-y-0.5">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <span>শিক্ষক লাইভ এলার্ট ও প্রগতি পর্যবেক্ষণ</span>
              {activeAlertStudents.length > 0 && (
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded-full animate-pulse">
                  জরুরি হস্তক্ষেপ প্রয়োজন
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-400">
              {activeAlertStudents.length > 0 
                ? `লাল (Red) সংকেতযুক্ত ৩টি ক্যাটাগরির মধ্যে ${activeAlertStudents.length} জন শিক্ষার্থীর বিশেষ সাহায্য প্রয়োজন।`
                : `শ্রেণীকক্ষে লাল (Red) প্রগতি সম্পন্ন সকল শিক্ষার্থীর সমস্যা পর্যবেক্ষণ করা হয়েছে।`
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
          {acknowledgedIds.length > 0 && (
            <button
              onClick={handleResetAlerts}
              className="text-[10px] font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-2 rounded-xl transition cursor-pointer"
            >
              সকল এলার্ট পুনরায় দেখান ({acknowledgedIds.length})
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 text-xs font-black rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
              activeAlertStudents.length > 0 
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-lg shadow-red-600/15' 
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
            }`}
          >
            <span>{isOpen ? 'অ্যালার্ট বন্ধ করুন' : 'অ্যালার্ট তালিকা দেখুন'}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded Alert Notifications List */}
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {redSignalStudents.map(student => {
            const isAcknowledged = acknowledgedIds.includes(student.id);

            return (
              <div 
                key={student.id} 
                className={`border rounded-2xl p-4.5 space-y-3.5 shadow-xl transition-all duration-300 relative overflow-hidden group ${
                  isAcknowledged
                    ? 'bg-slate-950/20 border-white/5 opacity-50 hover:opacity-80'
                    : 'bg-gradient-to-br from-red-950/30 to-slate-950/50 border-red-500/20 hover:border-red-500/45'
                }`}
              >
                {/* Decorative Red Blur background for active alert */}
                {!isAcknowledged && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/15 transition-all"></div>
                )}

                {/* Top header line */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-rose-300 truncate">{student.studentName}</span>
                      <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        ID: {student.studentId}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        শ্রেণী: {student.studentClass}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      <strong>শনাক্তকৃত সমস্যা:</strong> {WeaknessCategoryLabels[student.weaknessCategory] || student.weaknessCategory}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 z-10">
                    {isAcknowledged ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        <Check className="w-3 h-3" />
                        <span>পর্যবেক্ষিত</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAcknowledge(student.id, student.studentName)}
                        className="px-2.5 py-1 bg-red-500/15 hover:bg-red-500/30 text-red-300 border border-red-500/20 rounded-lg text-[10px] font-black transition cursor-pointer flex items-center gap-1"
                        title="এলার্টটি সাময়িকভাবে আড়াল করুন"
                      >
                        <Check className="w-3 h-3" />
                        <span>রিসিভ করুন</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Strategy block */}
                <div className="bg-slate-950/40 border border-white/5 rounded-xl p-3 text-xs text-slate-300 space-y-1.5">
                  <p className="text-red-300 font-bold flex items-center gap-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>ধীর গতির মূল কারণ:</span>
                  </p>
                  <p className="text-slate-300 text-[11px] leading-relaxed italic">
                    "{student.rootCause}"
                  </p>
                  <div className="pt-2 border-t border-white/5 mt-1 text-[10.5px] text-slate-400 space-y-1">
                    <p>
                      <strong>প্রস্তাবিত শিখন শৈলী:</strong> {student.learningStyle === 'Visual' ? '👀 দৃশ্যমান চিত্র বা ভিডিও' : student.learningStyle === 'Auditory' ? '🗣️ শুনে শেখা ও আলোচনা' : student.learningStyle === 'Kinesthetic' ? '🛠️ হাতেকলমে বা প্র্যাক্টিক্যাল কাজ' : '👥 গ্রুপ ওয়ার্ক ও ইন্টারঅ্যাকশন'}
                    </p>
                    <p>
                      <strong>চলতি সপ্তাহে কৌশল:</strong> "{student.strategyUsed}"
                    </p>
                  </div>
                </div>

                {/* Recommended Immediate Actions */}
                {!isAcknowledged && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">জরুরি পদক্ষেপ সুপারিশমালা:</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <a
                        href={`tel:01700000000`} // placeholder/demo number action
                        className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg text-indigo-300 font-bold flex items-center justify-center gap-1.5 transition text-center"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`অভিভাবকের সাথে যোগাযোগের জন্য ফোন নম্বর: ০১৭০০০০০০০০। (এটি ডেমো ডায়াল)।`);
                        }}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>অভিভাবককে কল দিন</span>
                      </a>
                      
                      <button
                        onClick={() => {
                          const tableElem = document.getElementById('student-table');
                          if (tableElem) {
                            tableElem.scrollIntoView({ behavior: 'smooth' });
                            alert(`শিক্ষার্থী ${student.studentName}-এর পাশে ইমেইল আইকনে ক্লিক করে মেসেজ ড্রাফট অন করুন।`);
                          }
                        }}
                        className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>অভিভাবক বার্তা ড্রাফট</span>
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
