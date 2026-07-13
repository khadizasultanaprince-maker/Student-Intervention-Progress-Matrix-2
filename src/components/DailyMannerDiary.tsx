import React, { useState, useEffect, useMemo } from 'react';
import { StudentRecord } from '../types';
import { 
  BookOpen, 
  Heart, 
  Award, 
  Trash2, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  User,
  Lightbulb,
  TrendingUp,
  Search,
  BookMarked,
  ShieldCheck,
  Star
} from 'lucide-react';

interface MannerEntry {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  date: string;
  category: 'Helpfulness' | 'Respect' | 'Discipline' | 'Cleanliness' | 'Truthfulness' | 'AcademicFocus';
  description: string;
  points: number; // Positive effect score
}

interface DailyMannerDiaryProps {
  records: StudentRecord[];
}

const MannerCategoryLabels: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  Helpfulness: { label: 'সহযোগিতা (Helpfulness)', icon: '🤝', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  Respect: { label: 'শ্রদ্ধাবোধ ও আচরণ (Respect)', icon: '🙏', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  Discipline: { label: 'শৃঙ্খলা ও সময়ানুবর্তিতা (Discipline)', icon: '⏰', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  Cleanliness: { label: 'পরিচ্ছন্নতা (Cleanliness)', icon: '🧹', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  Truthfulness: { label: 'সততা ও নৈতিকতা (Truthfulness)', icon: '✨', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
  AcademicFocus: { label: 'সহশিক্ষা ও একাগ্রতা (Academic Focus)', icon: '📚', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' }
};

const MannerTips = [
  { id: '1', title: 'সহযোগিতা', text: 'আজকে অন্তত একজন সহপাঠীকে যেকোনো পড়াশোনায় সাহায্য করো। এতে নিজের বোঝাপড়াও দৃঢ় হয়।' },
  { id: '2', title: 'নম্রতা', text: 'শ্রেণীকক্ষে প্রবেশের সময় এবং শিক্ষক ও সহপাঠীদের সাথে কথা বলার সময় মৃদু ও বিনয়ী স্বরে কথা বলো।' },
  { id: '3', title: 'পরিচ্ছন্নতা', text: 'নিজের বসার স্থান এবং ক্লাসরুমের পরিবেশ সবসময় পরিষ্কার রাখো। কোনো ময়লা দেখলে তা ডাস্টবিনে ফেলো।' },
  { id: '4', title: 'শৃঙ্খলা', text: 'প্রত্যেক ক্লাসে সঠিক সময়ে উপস্থিত হও এবং শিক্ষকের নির্দেশনা মনোযোগ দিয়ে শোনো।' },
  { id: '5', title: 'সততা', text: 'নিজের ভুল অকপটে স্বীকার করা একটি মহৎ গুণ। সত্য কথা বলা মনকে হালকা ও সৎ রাখে।' }
];

export default function DailyMannerDiary({ records }: DailyMannerDiaryProps) {
  // Persistence state
  const [entries, setEntries] = useState<MannerEntry[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  
  // Search student
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Form input states
  const [category, setCategory] = useState<keyof typeof MannerCategoryLabels>('Helpfulness');
  const [description, setDescription] = useState<string>('');
  const [points, setPoints] = useState<number>(5);
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Load manner entries
  useEffect(() => {
    const saved = localStorage.getItem('student_manner_diary_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing manner entries', e);
      }
    }
  }, []);

  // Save manner entries
  const saveEntries = (newEntries: MannerEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('student_manner_diary_entries', JSON.stringify(newEntries));
  };

  // Pre-select first student if available
  useEffect(() => {
    if (records.length > 0 && !selectedStudentId) {
      setSelectedStudentId(records[0].id);
    }
  }, [records, selectedStudentId]);

  // Selected student record object
  const selectedStudent = useMemo(() => {
    return records.find(r => r.id === selectedStudentId);
  }, [records, selectedStudentId]);

  // Filtered students for quick search select
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return records.slice(0, 5); // Show first 5 by default
    return records.filter(r => 
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentClass.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [records, searchTerm]);

  // Total points per student
  const studentMannerStats = useMemo(() => {
    const stats: Record<string, { totalPoints: number; count: number }> = {};
    entries.forEach(entry => {
      if (!stats[entry.studentId]) {
        stats[entry.studentId] = { totalPoints: 0, count: 0 };
      }
      stats[entry.studentId].totalPoints += entry.points;
      stats[entry.studentId].count += 1;
    });
    return stats;
  }, [entries]);

  // Current selected student's entries
  const currentStudentEntries = useMemo(() => {
    return entries.filter(e => e.studentId === selectedStudentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, selectedStudentId]);

  // Random Tip index rotating daily-ish or statically
  const [randomTipIndex, setRandomTipIndex] = useState(0);
  useEffect(() => {
    const day = new Date().getDate();
    setRandomTipIndex(day % MannerTips.length);
  }, []);

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedStudent) return;
    if (!description.trim()) {
      alert('দয়া করে ভালো কাজের বিবরণ বা অর্জিত আচরণটি লিখুন।');
      return;
    }

    const newEntry: MannerEntry = {
      id: crypto.randomUUID(),
      studentId: selectedStudentId,
      studentName: selectedStudent.studentName,
      studentClass: selectedStudent.studentClass,
      date: formDate,
      category,
      description: description.trim(),
      points: Number(points)
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    setDescription(''); // reset
    alert('অভিনন্দন! ডায়েরিতে নতুন ভালো কাজের স্বীকৃতি সফলভাবে যোগ হয়েছে।');
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm('আপনি কি এই ডায়েরি এন্ট্রিটি মুছে ফেলতে চান?')) {
      const filtered = entries.filter(e => e.id !== entryId);
      saveEntries(filtered);
    }
  };

  return (
    <div id="daily-manner-diary" className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-12 transition-all duration-300">
      
      {/* Banner/Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 animate-pulse">
                <Heart className="w-5 h-5 fill-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
                ডিজিটাল আচরণ মূল্যায়ন (Manner Hub)
              </span>
            </div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span>শিক্ষার্থীদের 'ডেইলি ম্যানার ডায়েরি' ও ভালো কাজের স্বীকৃতি</span>
            </h3>
            <p className="text-xs text-slate-400">
              শ্রেণীকক্ষে শিক্ষার্থীদের ভালো কাজ, নিয়মানুবর্তিতা ও আচার-ব্যবহার নথিবদ্ধ করার মাধ্যমে সুনাম স্কোর বৃদ্ধি করুন।
            </p>
          </div>

          {/* Banner Tip */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 max-w-sm flex items-start gap-2 text-xs">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="font-bold text-slate-300">আজকের আচরণ টিপ: {MannerTips[randomTipIndex].title}</p>
              <p className="text-slate-400 mt-0.5 text-[11px] leading-relaxed">"{MannerTips[randomTipIndex].text}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 md:p-6">
        
        {/* Left Column: Student Selector & Quick Stats (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-950/30 rounded-2xl p-4 border border-white/5 space-y-4">
            
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-400" /> শিক্ষার্থী খুঁজুন
              </label>
              <input
                type="text"
                placeholder="নাম, শ্রেণী বা আইডি দিয়ে সার্চ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/40 text-xs border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Quick Select Student List */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">শিক্ষার্থী নির্বাচন করুন:</p>
              
              {records.length === 0 ? (
                <p className="text-xs text-slate-500 italic">কোনো শিক্ষার্থী পাওয়া যায়নি</p>
              ) : (
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  {filteredStudents.map(student => {
                    const stats = studentMannerStats[student.id] || { totalPoints: 0, count: 0 };
                    const isSelected = student.id === selectedStudentId;

                    return (
                      <button
                        key={student.id}
                        onClick={() => setSelectedStudentId(student.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-white shadow-md' 
                            : 'bg-transparent border-white/5 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">{student.studentName}</p>
                          <p className="text-[10px] text-slate-400 truncate">ID: {student.studentId} | {student.studentClass}</p>
                        </div>

                        {/* Manner Point Tag */}
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/10">
                            <Star className="w-3 h-3 fill-emerald-400" />
                            <span>+{stats.totalPoints}</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Active Student Card */}
          {selectedStudent && (
            <div className="bg-gradient-to-br from-slate-950/40 to-slate-900/40 rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  {selectedStudent.studentName[0] || 'S'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedStudent.studentName}</h4>
                  <p className="text-xs text-slate-400">শ্রেণী ও শাখা: {selectedStudent.studentClass}</p>
                </div>
              </div>

              {/* Behavior and Talent summary */}
              <div className="space-y-2 border-t border-white/5 pt-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">সাধারণ আচরণ:</span>
                  <span className="font-semibold text-slate-200">{selectedStudent.behavior || 'অনির্ধারিত'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">প্রগতি সংকেত:</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      selectedStudent.progressSignal === 'Green' ? 'bg-green-500' : selectedStudent.progressSignal === 'Yellow' ? 'bg-amber-400' : 'bg-red-500'
                    }`}></span>
                    {selectedStudent.progressSignal === 'Green' ? 'সবুজ (সন্তোষজনক)' : selectedStudent.progressSignal === 'Yellow' ? 'হলুদ (উন্নতিশীল)' : 'লাল (ধীর)'}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-2.5 mt-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Award className="w-4 h-4" />
                    <span>মোট সুনাম পয়েন্ট:</span>
                  </div>
                  <span className="text-sm font-black text-emerald-300">
                    +{studentMannerStats[selectedStudent.id]?.totalPoints || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Middle Column: Add Deed Form (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-950/20 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-400" /> ডায়েরিতে নতুন এন্ট্রি লিখুন
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">নির্বাচিত শিক্ষার্থীর জন্য ভালো কাজ বা আচরণ রেকর্ড করুন।</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">আচরণ বা কাজের ধরন:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-xs border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {Object.entries(MannerCategoryLabels).map(([key, item]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">
                    {item.icon} {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">তারিখ:</label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full bg-slate-950 text-xs border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Description Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">ভালো কাজের বিবরণ:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="যেমন: ক্লাসের পর সহপাঠীদের সাথে বসার বেঞ্চ ও ডেক্স গুছাতে সাহায্য করেছে।"
                rows={3}
                className="w-full bg-slate-950 text-xs border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Point values */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex justify-between">
                <span>প্রভাব স্কোর (সুনাম পয়েন্ট):</span>
                <span className="text-emerald-400 font-bold">+{points} পয়েন্ট</span>
              </label>
              <input
                type="range"
                min="5"
                max="25"
                step="5"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 px-1">
                <span>+৫ (মৃদু)</span>
                <span>+১৫ (মাঝারি)</span>
                <span>+২৫ (উচ্চ প্রভাব)</span>
              </div>
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              disabled={!selectedStudentId}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>ডায়েরিতে এন্ট্রি যোগ করুন</span>
            </button>

          </form>
        </div>

        {/* Right Column: Diary Timeline / History (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-950/20 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-emerald-400" /> আচরণ ডায়েরি ইতিহাস
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">শিক্ষার্থীর সাম্প্রতিক ভালো আচরণের বিবরণী।</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {currentStudentEntries.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Heart className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs italic">এই শিক্ষার্থীর জন্য ডায়েরিতে এখনো কোনো ভালো কাজের স্বীকৃতি যোগ করা হয়নি।</p>
                  <p className="text-[11px] text-slate-600 mt-1">বামদিকের ফর্মটি পূরণ করে সুনাম পয়েন্ট দিয়ে শুরু করুন।</p>
                </div>
              ) : (
                currentStudentEntries.map(entry => {
                  const catInfo = MannerCategoryLabels[entry.category] || { label: 'অন্যান্য', icon: '✨', color: 'text-slate-300', bg: 'bg-slate-500/10' };
                  return (
                    <div 
                      key={entry.id}
                      className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 space-y-2.5 relative group hover:border-emerald-500/20 transition-all"
                    >
                      {/* Top labels */}
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${catInfo.bg} ${catInfo.color}`}>
                            {catInfo.icon} {catInfo.label}
                          </span>
                          <p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{entry.date}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                            +{entry.points}
                          </span>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-slate-600 hover:text-rose-400 transition-all p-1 rounded hover:bg-rose-500/10 cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Main desc */}
                      <p className="text-[11px] text-slate-300 leading-relaxed italic bg-slate-900/40 p-2 rounded-lg border border-white/5">
                        "{entry.description}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Interactive footer details */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-[11px] text-slate-400 flex items-start gap-2 mt-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>মূল্যায়ন সমন্বয়:</strong> শিক্ষার্থীর এই সুনাম পয়েন্টগুলো আচরণ রিপোর্টে যুক্ত হয়ে সার্বিক লাল/হলুদ/সবুজ প্রগতি সংকেতকে ইতিবাচকভাবে প্রভাবিত করবে।
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
