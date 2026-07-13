import React, { useState, useEffect } from 'react';
import { StudentRecord, WeaknessCategoryLabels, WeaknessLevelLabels } from '../types';
import { 
  ClipboardCheck, 
  AlertOctagon, 
  CheckCircle, 
  PenTool, 
  Clock, 
  Calendar, 
  Sparkles, 
  UserCheck,
  ChevronRight,
  ShieldAlert,
  Megaphone,
  Check,
  RotateCcw
} from 'lucide-react';

interface TeacherQuickPanelProps {
  records: StudentRecord[];
}

export default function TeacherQuickPanel({ records }: TeacherQuickPanelProps) {
  // State for signed student IDs, stored in localStorage for persistence
  const [signedIds, setSignedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'signatures' | 'urgent'>('signatures');
  const [signatureDate, setSignatureDate] = useState<string>(
    new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  );

  // Load signed student IDs on mount
  useEffect(() => {
    const saved = localStorage.getItem('teacher_signed_student_ids');
    if (saved) {
      try {
        setSignedIds(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing signed student IDs', e);
      }
    }
  }, []);

  // Save signed student IDs on changes
  const saveSignedIds = (newIds: string[]) => {
    setSignedIds(newIds);
    localStorage.setItem('teacher_signed_student_ids', JSON.stringify(newIds));
  };

  // Sign a single record
  const handleSignRecord = (id: string) => {
    if (!signedIds.includes(id)) {
      const updated = [...signedIds, id];
      saveSignedIds(updated);
    }
  };

  // Unsign a single record (undo option)
  const handleUnsignRecord = (id: string) => {
    const updated = signedIds.filter(item => item !== id);
    saveSignedIds(updated);
  };

  // Clear all signatures (Reset)
  const handleResetSignatures = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সকল স্বাক্ষর মুছে ফেলতে চান?')) {
      saveSignedIds([]);
    }
  };

  // Filter records that need signatures
  // Let's assume all records require signatures, and those not in `signedIds` are pending.
  const pendingRecords = records.filter(r => !signedIds.includes(r.id));
  const signedRecords = records.filter(r => signedIds.includes(r.id));

  // Filter records that need urgent intervention
  // Criteria: Severe weakness level OR Red progress signal
  const urgentRecords = records.filter(r => r.weaknessLevel === 'Severe' || r.progressSignal === 'Red');

  return (
    <div id="teacher-quick-panel" className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      
      {/* Banner Header with Quick Stats */}
      <div className="p-5 bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-indigo-950/80 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-400/20">
              <ClipboardCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              টিচার্স কুইক প্যানেল (Teacher's Work Hub)
            </span>
          </div>
          <h3 className="text-lg font-black text-white">শ্রেণী শিক্ষক কাজের ড্যাশবোর্ড ও কুইক অ্যাকশন</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>আজকের তারিখ: {signatureDate}</span>
          </p>
        </div>

        {/* Unsign / Reset Action */}
        {signedIds.length > 0 && (
          <button
            onClick={handleResetSignatures}
            className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>স্বাক্ষর রিসেট করুন ({signedIds.length})</span>
          </button>
        )}
      </div>

      {/* Tabs Selector Row */}
      <div className="flex border-b border-white/5 bg-slate-950/40 p-2 gap-2">
        <button
          onClick={() => setActiveTab('signatures')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'signatures'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>পেন্ডিং সিগনেচার ও অনুমোদন ({pendingRecords.length})</span>
          {pendingRecords.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black animate-pulse">
              {pendingRecords.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('urgent')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'urgent'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/15 border border-rose-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>জরুরি হস্তক্ষেপ প্রয়োজন ({urgentRecords.length})</span>
          {urgentRecords.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black">
              {urgentRecords.length}
            </span>
          )}
        </button>
      </div>

      {/* Content Space */}
      <div className="p-5">
        {records.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-xs italic">কোনো শিক্ষার্থীর রেকর্ড সংরক্ষিত নেই। প্রথমে শিক্ষার্থী তালিকা যোগ করুন।</p>
          </div>
        ) : activeTab === 'signatures' ? (
          /* PENDING SIGNATURES VIEW */
          <div className="space-y-4">
            
            <div className="bg-slate-950/20 border border-white/5 rounded-xl p-3 text-slate-300 text-xs flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>
                <strong>সাপ্তাহিক প্রগতি রিপোর্ট অনুমোদন:</strong> নিচে তালিকাভুক্ত শিক্ষার্থীদের দৈনিক/সাপ্তাহিক অগ্রগতি বিবরণীসমূহ যাচাই করে আপনার ডিজিটাল সিগনেচার দিন। এটি প্রিন্ট রিপোর্টে প্রতিফলিত হবে।
              </span>
            </div>

            {pendingRecords.length === 0 ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-6 text-center space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto text-green-400" />
                <h4 className="font-bold text-sm text-green-300">সকল রিপোর্টে স্বাক্ষর করা সম্পন্ন হয়েছে!</h4>
                <p className="text-xs text-slate-400">নতুন শিক্ষার্থী যুক্ত হলে বা প্রগতি ডাটা পরিবর্তন হলে স্বাক্ষর পেন্ডিং দেখাবে।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {pendingRecords.map(student => (
                  <div 
                    key={student.id}
                    className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 flex items-center justify-between gap-4 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-100 truncate">{student.studentName}</h4>
                        <span className="text-[9px] font-bold text-slate-400 px-1.5 py-0.5 rounded bg-white/5 shrink-0">
                          ID: {student.studentId}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">শ্রেণী ও শাখা: {student.studentClass}</p>
                      
                      {/* Short details */}
                      <div className="text-[10px] text-slate-400 pt-1 flex flex-wrap gap-x-2 gap-y-1">
                        <span className="text-indigo-300">
                          দুর্বলতা: {WeaknessCategoryLabels[student.weaknessCategory]}
                        </span>
                        <span className="text-slate-500">|</span>
                        <span className="text-slate-300 font-medium">
                          প্রগতি: {student.currentStatus || 'অনির্ধারিত'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSignRecord(student.id)}
                      className="px-3.5 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>স্বাক্ষর করুন</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Signed List Accordion */}
            {signedRecords.length > 0 && (
              <div className="pt-4 border-t border-white/5 mt-4">
                <h4 className="text-xs font-bold text-indigo-400 mb-2 flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  <span>ইতিমধ্যে স্বাক্ষরিত ও অনুমোদিত রেকর্ডসমূহ ({signedRecords.length})</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {signedRecords.map(student => (
                    <div 
                      key={student.id} 
                      className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-[10px] text-emerald-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="font-bold">{student.studentName}</span>
                      <button 
                        onClick={() => handleUnsignRecord(student.id)}
                        className="text-slate-400 hover:text-rose-400 font-bold ml-1 hover:scale-110 cursor-pointer"
                        title="স্বাক্ষর প্রত্যাহার করুন"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* URGENT INTERVENTIONS VIEW */
          <div className="space-y-4">
            
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3 text-red-300 text-xs flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 animate-bounce" />
              <span>
                <strong>জরুরি অ্যালার্ট:</strong> নিচে তালিকাভুক্ত শিক্ষার্থীদের দুর্বলতা অত্যন্ত গভীর বা অগ্রগতি খুবই ধীর (লাল সংকেত)। বিশেষ যত্ন, শিখন শৈলীর পরিবর্তন অথবা অভিভাবক কাউন্সিলিং প্রয়োজন।
              </span>
            </div>

            {urgentRecords.length === 0 ? (
              <div className="bg-slate-950/20 border border-white/5 rounded-xl p-6 text-center space-y-1">
                <Check className="w-10 h-10 mx-auto text-emerald-400" />
                <h4 className="font-bold text-sm text-slate-200">কোনো তীব্র বা উদ্বেগজনক লাল সংকেত শিক্ষার্থী নেই!</h4>
                <p className="text-xs text-slate-400">সকল শিক্ষার্থী চমৎকার ও সন্তোষজনক অগ্রগতিতে রয়েছে।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentRecords.map(student => (
                  <div 
                    key={student.id}
                    className="bg-slate-950/40 border border-rose-500/10 rounded-xl p-4 space-y-3 hover:border-rose-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-rose-200">{student.studentName}</h4>
                          <p className="text-[10px] text-slate-400">শ্রেণী: {student.studentClass} | ID: {student.studentId}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wide ${
                          student.weaknessLevel === 'Severe' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        }`}>
                          {WeaknessLevelLabels[student.weaknessLevel]}
                        </span>
                      </div>

                      {/* Diagnostic details */}
                      <div className="text-[10px] space-y-1 text-slate-300 bg-slate-950/20 p-2.5 rounded-lg border border-white/5">
                        <p><strong className="text-slate-400">দুর্বলতা:</strong> {WeaknessCategoryLabels[student.weaknessCategory]}</p>
                        <p><strong className="text-slate-400">মূল কারণ:</strong> {student.rootCause}</p>
                        {student.teacherRemarks && (
                          <p className="italic text-slate-400"><strong className="text-slate-400 font-normal">মন্তব্য:</strong> "{student.teacherRemarks}"</p>
                        )}
                      </div>
                    </div>

                    {/* Quick Guidance Recommendation */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold bg-amber-500/5 border border-amber-500/10 px-2 py-1 rounded">
                        <Megaphone className="w-3.5 h-3.5" />
                        <span>প্রস্তাবনা: পৃথক ডেস্ক ও অতিরিক্ত সময় বরাদ্দ দিন</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}
