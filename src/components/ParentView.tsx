/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { StudentRecord, ProgressSignalLabels, WeaknessCategoryLabels, WeaknessLevelLabels, LearningStyleLabels, ProgressSignal } from '../types';
import { 
  ArrowLeft, 
  LogOut, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Activity, 
  Smile, 
  AlertCircle, 
  Printer, 
  Calendar,
  User,
  Phone,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ParentViewProps {
  records: StudentRecord[];
  onBackToTeacher: () => void;
  onUpdateGoalStatus?: (id: string, status: 'In Progress' | 'Achieved' | 'Needs Improvement') => void;
}

export default function ParentView({ records, onBackToTeacher, onUpdateGoalStatus }: ParentViewProps) {
  const [studentIdInput, setStudentIdInput] = useState('');
  const [loggedInStudent, setLoggedInStudent] = useState<StudentRecord | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPrintCard, setShowPrintCard] = useState(false);

  const handleUpdateParentGoalStatus = (status: 'In Progress' | 'Achieved' | 'Needs Improvement') => {
    if (!loggedInStudent) return;
    onUpdateGoalStatus?.(loggedInStudent.id, status);
    setLoggedInStudent(prev => prev ? {
      ...prev,
      shortTermGoal: prev.shortTermGoal ? {
        ...prev.shortTermGoal,
        status,
        updatedAt: new Date().toISOString()
      } : undefined
    } : null);
  };

  // Available students in system for easy simulation
  const availableStudents = useMemo(() => {
    return records.map(r => ({ id: r.studentId, name: r.studentName, class: r.studentClass }));
  }, [records]);

  const handleLogin = (idToSubmit: string) => {
    const idClean = idToSubmit.trim();
    if (!idClean) {
      setLoginError('দয়া করে একটি সঠিক আইডি বা রোল নম্বর প্রদান করুন।');
      return;
    }

    const student = records.find(
      r => r.studentId.toLowerCase() === idClean.toLowerCase() || 
           r.studentName.toLowerCase().includes(idClean.toLowerCase())
    );

    if (student) {
      setLoggedInStudent(student);
      setLoginError(null);
    } else {
      setLoginError('এই আইডি দিয়ে কোনো শিক্ষার্থীর তথ্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডিটি পুনরায় টাইপ করুন বা নিচের তালিকা থেকে একটি সিলেক্ট করুন।');
    }
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
    setStudentIdInput('');
    setLoginError(null);
    setShowPrintCard(false);
  };

  const getBengaliDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('bn-BD', options);
  };

  // Score mapping for Progress Signals
  const signalToScore = (sig: ProgressSignal): number => {
    switch (sig) {
      case 'Green': return 3;
      case 'Yellow': return 2;
      case 'Red': return 1;
      default: return 2;
    }
  };

  // Trajectory analytics
  const studentTrajectory = useMemo(() => {
    if (!loggedInStudent) return null;
    
    const currSig = loggedInStudent.progressSignal || 'Yellow';
    const lastSig = loggedInStudent.lastWeekProgressSignal || currSig;
    const currScore = signalToScore(currSig);
    const lastScore = signalToScore(lastSig);

    let trend: 'Improving' | 'Stagnant' | 'Regressed' = 'Stagnant';
    let trendText = 'গত সপ্তাহের মতোই সন্তোষজনক প্রগতি বজায় রয়েছে।';
    let trendTitle = 'ধারাবাহিকতা বজায় রয়েছে';
    let alertColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';

    if (currScore > lastScore) {
      trend = 'Improving';
      trendText = 'অভিনন্দন! গত সপ্তাহের তুলনায় আপনার সন্তানের প্রগতির হার লক্ষণীয়ভাবে বৃদ্ধি পেয়েছে। শিক্ষকের বিশেষ হস্তক্ষেপ ও কৌশল ফলপ্রসূ হয়েছে।';
      trendTitle = 'চমৎকার উন্নতি লক্ষ্য করা গেছে!';
      alertColor = 'text-green-600 bg-green-500/10 border-green-500/20';
    } else if (currScore < lastScore) {
      trend = 'Regressed';
      trendText = 'দুঃখিত, গত সপ্তাহের তুলনায় আপনার সন্তানের প্রগতির হার কিছুটা ধীর হয়েছে। শ্রেণী শিক্ষকের গৃহীত নতুন মডিউল ও কৌশল অনুযায়ী বাড়িতেও বিশেষ যত্ন নেওয়া প্রয়োজন।';
      trendTitle = 'বাড়তি মনোযোগ প্রয়োজন';
      alertColor = 'text-rose-600 bg-rose-500/10 border-rose-500/20';
    } else if (currSig === 'Red') {
      trendText = 'আপনার সন্তানের শিখন গতি কিছুটা ধীর। শ্রেণী শিক্ষক বিশেষ টিচিং এইড এবং ধাপে ধাপে অনুশীলনের মাধ্যমে সর্বোচ্চ যত্ন নিচ্ছেন। বাড়িতেও দৈনিক ১০-১৫ মিনিট নিবিড় অনুশীলন আবশ্যক।';
      trendTitle = 'ধীর প্রগতি, নিবিড় তদারকি চলমান';
      alertColor = 'text-rose-600 bg-rose-500/10 border-rose-500/20';
    } else if (currSig === 'Yellow') {
      trendText = 'আপনার সন্তান মাঝারি ধারায় উন্নতি করছে। তার ভীতি অনেকটাই কেটেছে। ধারাবাহিক অনুশীলন অব্যাহত রাখলে শীঘ্রই কাঙ্ক্ষিত লক্ষ্য অর্জন সম্ভব হবে।';
      trendTitle = 'ধারাবাহিক মাঝারি প্রগতি';
      alertColor = 'text-amber-600 bg-amber-500/10 border-amber-500/20';
    }

    return {
      currSig,
      lastSig,
      currScore,
      lastScore,
      trend,
      trendText,
      trendTitle,
      alertColor
    };
  }, [loggedInStudent]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Role Navigation Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-600/20">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">সিমুলেটেড অভিভাবক কর্নার (Parent Portal)</h2>
            <p className="text-[10px] text-slate-400 font-light">অভিভাবকদের জন্য সন্তানের ব্যক্তিগত অগ্রগতি পর্যবেক্ষণ ব্যবস্থা</p>
          </div>
        </div>
        
        <button
          onClick={onBackToTeacher}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white rounded-xl cursor-pointer transition active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>শিক্ষক ড্যাশবোর্ডে ফিরুন</span>
        </button>
      </div>

      {/* LOGIN SCREEN IF NOT LOGGED IN */}
      {!loggedInStudent ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Login Form Box - 7 Cols */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>নিরাপদ অভিভাবক প্রবেশদ্বার</span>
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">আপনার সন্তানের অগ্রগতি রিপোর্ট দেখুন</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                শ্রেণী শিক্ষকের তৈরি আপনার সন্তানের বিশেষ হস্তক্ষেপ ডায়েরি, প্রগতি চার্ট এবং সাপ্তাহিক মূল্যায়ন রিপোর্ট অ্যাক্সেস করতে নিচে শিক্ষার্থীর রোল বা ইউনিক আইডি দিন।
              </p>

              <div className="space-y-2.5 pt-4">
                <label className="block text-xs font-bold text-slate-600">শিক্ষার্থীর আইডি / রোল নম্বর প্রদান করুন <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => {
                      setStudentIdInput(e.target.value);
                      setLoginError(null);
                    }}
                    placeholder="যেমন: ID-2026-A01"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(studentIdInput)}
                    className="flex-1 text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl text-slate-800 font-bold placeholder-slate-400"
                  />
                  <button
                    onClick={() => handleLogin(studentIdInput)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 cursor-pointer transition active:scale-95"
                  >
                    রিপোর্ট দেখুন
                  </button>
                </div>
                
                {loginError && (
                  <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 mt-2 font-medium">
                    <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Info Box */}
            <div className="border-t border-slate-100 pt-5 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-indigo-500" />
                <span>অভিভাবকদের জন্য বিশেষ নির্দেশিকা:</span>
              </p>
              <p className="font-light leading-relaxed">
                এই পোর্টালটির মাধ্যমে শ্রেণী শিক্ষক সরাসরি আপনার সাথে সংযোগ স্থাপন করছেন। সপ্তাহে অন্তত একবার অগ্রগতি গ্রাফটি দেখে শিক্ষকের নির্দেশনা অনুযায়ী বাড়িতে কার্যক্রম পরিচালনা করুন।
              </p>
            </div>
          </div>

          {/* Quick Simulation Chips Sidebar - 5 Cols */}
          <div className="md:col-span-5 bg-gradient-to-b from-indigo-950 to-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-3">
                <User className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-100">টেস্ট আইডি দিয়ে সহজ সিমুলেশন (Test accounts)</h4>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed font-light mb-4">
                সিস্টেমে ইতিমধ্যে ৩টি নমুনা শিক্ষার্থীর ডাটা লোড করা আছে। অভিভাবক ড্যাশবোর্ডটি সরাসরি পরীক্ষা করতে নিচে যেকোনো শিক্ষার্থীর নামের ওপর ক্লিক করুন:
              </p>

              {/* Student Quick Login Chips List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {availableStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => {
                      setStudentIdInput(student.id);
                      handleLogin(student.id);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition text-left cursor-pointer group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition">{student.name}</h5>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">আইডি: {student.id}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 group-hover:text-white transition">
                      <span>প্রবেশ করুন</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-indigo-200/60 bg-white/5 p-3 rounded-xl border border-white/5">
              💡 আপনি যদি শিক্ষক ড্যাশবোর্ডে নতুন কোনো শিক্ষার্থী ও আইডি যুক্ত করেন, সেই আইডিটিও এখানে অভিভাবক হিসেবে টাইপ করে লগইন করতে পারবেন।
            </div>
          </div>

        </div>
      ) : (
        /* LOGGED IN DASHBOARD VIEW */
        <div className="space-y-6">
          
          {/* Dashboard Header Banner with Child Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-50/70 via-white to-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left Profile Details */}
              <div className="flex items-start md:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-600/10">
                  {loggedInStudent.studentName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-800">{loggedInStudent.studentName}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                      শ্রেণী: {loggedInStudent.studentClass}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 font-mono">
                      রোল/আইডি: {loggedInStudent.studentId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-light leading-normal">
                    শ্রেণী শিক্ষকের পর্যবেক্ষণ কার্যক্রমের অধীনে শিক্ষার্থীর ব্যক্তিগত বিকাশ ডায়েরি।
                  </p>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowPrintCard(!showPrintCard)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md shadow-slate-950/10 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{showPrintCard ? 'অনলাইন ভিউ দেখুন' : 'প্রিন্টযোগ্য প্রগতি কার্ড (A4)'}</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 hover:text-rose-800 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট (Logout)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Conditional single student printable summary layout */}
          {showPrintCard ? (
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-2xl max-w-4xl mx-auto space-y-6 text-left relative overflow-hidden" id="individual-student-progress-card">
              
              {/* Printable Header Decorative */}
              <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-end">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-900">সরকারি প্রাথমিক/মাধ্যমিক বিদ্যালয় প্রগতি বিবরণী</h4>
                  <p className="text-xs font-bold text-slate-600">বিশেষ উন্নয়ন কার্যক্রম ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স (২০২৬ শিক্ষাবর্ষ)</p>
                  <p className="text-[10px] text-slate-400">ব্যক্তিগত অভিভাবক বাতায়ন হতে সংগৃহীত • প্রকাশের তারিখ: {getBengaliDate()}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold border border-slate-800 px-3 py-1 bg-slate-50 uppercase rounded">নিরাপদ নথি</span>
                </div>
              </div>

              {/* Identity Matrix */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <p className="text-slate-400 font-bold">শিক্ষার্থীর নাম</p>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{loggedInStudent.studentName}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">শ্রেণী ও রোল আইডি</p>
                  <p className="font-bold text-slate-700 mt-0.5">{loggedInStudent.studentClass} | {loggedInStudent.studentId}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">দুর্বলতার ক্ষেত্র</p>
                  <p className="font-bold text-slate-700 mt-0.5">{WeaknessCategoryLabels[loggedInStudent.weaknessCategory]} ({WeaknessLevelLabels[loggedInStudent.weaknessLevel]})</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">শিখন শৈলী (Learning Style)</p>
                  <p className="font-bold text-slate-700 mt-0.5">{LearningStyleLabels[loggedInStudent.learningStyle]}</p>
                </div>
              </div>

              {/* Progress Core Data */}
              <div className="space-y-4 pt-2">
                <h5 className="font-extrabold text-slate-800 border-l-4 border-indigo-600 pl-2 text-sm">১. যোগ্যতা ও প্রগতি স্থানাঙ্ক</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200/80 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-rose-600">প্রাথমিক অবস্থা (Baseline Status):</p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{loggedInStudent.baselineStatus}</p>
                  </div>
                  <div className="border border-slate-200/80 p-4 rounded-xl space-y-2 bg-emerald-50/20">
                    <p className="text-xs font-bold text-emerald-600">বর্তমান অবস্থা (Current Status):</p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{loggedInStudent.currentStatus}</p>
                  </div>
                </div>
              </div>

              {/* Intervention Strategies and Remarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200/80 p-4 rounded-xl space-y-2">
                  <h5 className="font-extrabold text-slate-800 text-xs">২. গৃহীত বিশেষ হস্তক্ষেপ কৌশল</h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{loggedInStudent.strategyUsed}</p>
                </div>
                <div className="border border-slate-200/80 p-4 rounded-xl space-y-2 bg-indigo-50/20">
                  <h5 className="font-extrabold text-slate-800 text-xs">৩. শ্রেণী শিক্ষকের মূল্যবান মন্তব্য</h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold italic">“{loggedInStudent.teacherRemarks}”</p>
                </div>
              </div>

              {/* 2-Week Goal on Print Card */}
              {loggedInStudent.shortTermGoal && (
                <div className="border border-rose-200 p-4 rounded-xl bg-rose-50/10 space-y-1 text-xs">
                  <h5 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>২ সপ্তাহের নির্ধারিত প্রগতি লক্ষ্য (Short-Term Goal)</span>
                  </h5>
                  <p className="text-slate-800 font-bold">লক্ষ্য: {loggedInStudent.shortTermGoal.title}</p>
                  <p className="text-slate-600 font-medium">
                    পূরণের শেষ সময়: {new Date(loggedInStudent.shortTermGoal.targetDate).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })} 
                    {' | '} 
                    অবস্থা: <span className="font-extrabold text-indigo-700">
                      {loggedInStudent.shortTermGoal.status === 'Achieved' ? '🏆 অর্জিত' :
                       loggedInStudent.shortTermGoal.status === 'Needs Improvement' ? '⚠️ উন্নয়ন প্রয়োজন' : '🎯 চলমান'}
                    </span>
                  </p>
                </div>
              )}

              {/* Signal and psychological indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-200/80 p-4 rounded-xl text-xs">
                <div className="text-center space-y-1">
                  <p className="text-slate-400 font-bold">গত সপ্তাহের প্রগতি সিগন্যাল</p>
                  <p className="text-lg">{ProgressSignalLabels[studentTrajectory?.lastSig || 'Yellow'].emoji}</p>
                  <p className="font-bold text-slate-600">{ProgressSignalLabels[studentTrajectory?.lastSig || 'Yellow'].label.split(' / ')[0]}</p>
                </div>
                <div className="text-center space-y-1 border-y md:border-y-0 md:border-x border-slate-200 py-3 md:py-0">
                  <p className="text-slate-400 font-bold">বর্তমান প্রগতি সিগন্যাল</p>
                  <p className="text-lg">{ProgressSignalLabels[studentTrajectory?.currSig || 'Yellow'].emoji}</p>
                  <p className="font-black text-indigo-700">{ProgressSignalLabels[studentTrajectory?.currSig || 'Yellow'].label.split(' / ')[1]}</p>
                </div>
                <div className="text-center space-y-1 flex flex-col justify-center items-center">
                  <p className="text-slate-400 font-bold">আচরণগত অবগতি</p>
                  <p className="font-bold text-slate-800 text-xs mt-1">{loggedInStudent.behavior}</p>
                </div>
              </div>

              {/* Footer signatures */}
              <div className="pt-12 flex justify-between text-xs font-bold text-slate-700">
                <div className="border-t border-slate-800 pt-1 text-center w-40">
                  <p>শ্রেণী শিক্ষকের স্বাক্ষর</p>
                </div>
                <div className="border-t border-slate-800 pt-1 text-center w-40">
                  <p>প্রধান শিক্ষকের সিল</p>
                </div>
              </div>

              {/* Browser native print notice */}
              <div className="text-center pt-4 text-[10px] text-slate-400 font-light">
                * প্রগতি বিবরণীটি প্রিন্ট করতে ব্রাউজারের প্রিন্ট কমান্ড ব্যবহার করুন (Ctrl + P) অথবা রিপোর্টটির স্ক্রিনশট সংগ্রহ করে রাখুন।
              </div>
            </div>
          ) : (
            /* REGULAR DASHBOARD SECTIONS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Progress Graph & Signal Comparison - 8 Cols */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Interactive Child Progress Trajectory SVG Graph */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
                    <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">সাপ্তাহিক প্রগতি গ্রাফ (Weekly Trend Graph)</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Trajectory Graphic Box - 7 Cols */}
                    <div className="md:col-span-7 bg-slate-50/70 border border-slate-100/80 rounded-2xl p-4 flex flex-col justify-center min-h-[220px]">
                      
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-2 px-1">
                        <span>গত সপ্তাহ</span>
                        <span>বর্তমান সপ্তাহ</span>
                      </div>

                      {/* SVG Canvas for single child progress */}
                      <div className="w-full h-36 flex items-center justify-center">
                        <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                          {/* Grid Guide lines */}
                          <line x1="50" y1="20" x2="250" y2="20" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="50" y1="60" x2="250" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="50" y1="100" x2="250" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

                          {/* Left-Right boundary columns */}
                          <line x1="50" y1="10" x2="50" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
                          <line x1="250" y1="10" x2="250" y2="110" stroke="#94a3b8" strokeWidth="1.5" />

                          {/* Y Labels left */}
                          <text x="42" y="23" textAnchor="end" className="text-[8px] font-bold fill-green-600">🟢 সন্তোষজনক</text>
                          <text x="42" y="63" textAnchor="end" className="text-[8px] font-bold fill-amber-500">🟡 মাঝারি</text>
                          <text x="42" y="103" textAnchor="end" className="text-[8px] font-bold fill-rose-500">🔴 ধীর</text>

                          {/* Target Y values based on scores */}
                          {(() => {
                            const lastScore = studentTrajectory?.lastScore || 2;
                            const currScore = studentTrajectory?.currScore || 2;
                            
                            const yLast = lastScore === 3 ? 20 : lastScore === 2 ? 60 : 100;
                            const yCurr = currScore === 3 ? 20 : currScore === 2 ? 60 : 100;

                            let strokeColor = '#f59e0b'; // stagnant Yellow
                            if (studentTrajectory?.trend === 'Improving') strokeColor = '#10b981'; // Green
                            if (studentTrajectory?.trend === 'Regressed') strokeColor = '#f43f5e'; // Red

                            return (
                              <g>
                                {/* Glowing connection path */}
                                <path 
                                  d={`M 50 ${yLast} C 150 ${yLast}, 150 ${yCurr}, 250 ${yCurr}`} 
                                  fill="none" 
                                  stroke={strokeColor} 
                                  strokeWidth="3.5" 
                                  className="drop-shadow-[0_2px_8px_rgba(99,102,241,0.2)] animate-pulse"
                                />

                                {/* Left marker dot */}
                                <circle cx="50" cy={yLast} r="6" fill={strokeColor} stroke="#ffffff" strokeWidth="2" />
                                
                                {/* Right marker dot */}
                                <circle cx="250" cy={yCurr} r="6" fill={strokeColor} stroke="#ffffff" strokeWidth="2" />

                                {/* Little arrow in between */}
                                <g transform={`translate(150, ${(yLast + yCurr)/2 - 5})`}>
                                  <circle cx="0" cy="5" r="8" fill="#ffffff" stroke={strokeColor} strokeWidth="1" />
                                  <text x="0" y="8" textAnchor="middle" className="text-[8px] font-black" fill={strokeColor}>
                                    {studentTrajectory?.trend === 'Improving' ? '▲' : studentTrajectory?.trend === 'Regressed' ? '▼' : '●'}
                                  </text>
                                </g>
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                    </div>

                    {/* Trajectory Description - 5 Cols */}
                    <div className="md:col-span-5 space-y-3 text-left">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase ${studentTrajectory?.alertColor}`}>
                        <Activity className="w-3.5 h-3.5" />
                        <span>{studentTrajectory?.trendTitle}</span>
                      </span>
                      
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {studentTrajectory?.trendText}
                      </p>

                      <div className="text-[10px] text-slate-400 font-light border-t border-slate-100 pt-2">
                        * প্রগতি গ্রাফটি শিক্ষার্থীর দক্ষতা উন্নয়নের ধারার পরিমাপক। ৩ (সন্তোষজনক/সবুজ), ২ (মাঝারি/হলুদ), এবং ১ (ধীর/লাল) স্তরের স্কোরিংয়ের মাধ্যমে গ্রাফটি তৈরি হয়।
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Side-by-Side Status Comparison Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  
                  {/* Left Week State */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-3.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">১. প্রাথমিক অবস্থা ও দুর্বলতা</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-rose-50/50 border border-rose-100/60 rounded-xl">
                        <p className="text-[10px] font-bold text-rose-500 mb-0.5">প্রাথমিক অবস্থা (Baseline Status):</p>
                        <p className="text-xs font-semibold text-slate-700 leading-relaxed">{loggedInStudent.baselineStatus}</p>
                      </div>
                      
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <p className="text-[10px] font-bold text-slate-500">সনাক্তকৃত মূল দুর্বলতা:</p>
                        <p className="text-xs font-bold text-slate-800">
                          {WeaknessCategoryLabels[loggedInStudent.weaknessCategory]}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          তীব্রতার মাত্রা: <span className="font-bold text-rose-600">{WeaknessLevelLabels[loggedInStudent.weaknessLevel]}</span>
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed italic mt-1 bg-white/50 p-1.5 rounded border border-slate-100">
                          <strong>পেছনের কারণ:</strong> {loggedInStudent.rootCause}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Week State */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-3.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">২. বর্তমান অবস্থা ও প্রগতি</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50/50 border border-green-100/60 rounded-xl">
                        <p className="text-[10px] font-bold text-green-600 mb-0.5">বর্তমান অবস্থা (Current Status):</p>
                        <p className="text-xs font-semibold text-slate-700 leading-relaxed">{loggedInStudent.currentStatus}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
                          <p className="text-[9px] font-bold text-slate-400">গত সপ্তাহের সংকেত</p>
                          <p className="text-lg mt-1">{ProgressSignalLabels[studentTrajectory?.lastSig || 'Yellow'].emoji}</p>
                          <p className="text-[10px] font-bold text-slate-600 mt-0.5">
                            {studentTrajectory?.lastSig === 'Red' ? 'ধীর' : studentTrajectory?.lastSig === 'Yellow' ? 'মাঝারি' : 'সন্তোষজনক'}
                          </p>
                        </div>
                        <div className="p-3 bg-indigo-50/30 border border-indigo-100/50 rounded-xl text-center">
                          <p className="text-[9px] font-bold text-indigo-400">বর্তমান প্রগতি</p>
                          <p className="text-lg mt-1">{ProgressSignalLabels[studentTrajectory?.currSig || 'Yellow'].emoji}</p>
                          <p className="text-[10px] font-bold text-indigo-700 mt-0.5">
                            {studentTrajectory?.currSig === 'Red' ? 'ধীর' : studentTrajectory?.currSig === 'Yellow' ? 'মাঝারি' : 'সন্তোষজনক'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. Detailed Subject Diagnostics & AI Suggestions */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-6">
                  
                  {/* Subject Weakness Matrix */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>বিষয়ভিত্তিক পড়ার ও লেখার দুর্বলতা ম্যাট্রিক্স (Subject-specific Weakness Matrix)</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      প্রতিটি বিষয়ের ক্ষেত্রে শিক্ষার্থীর পড়ার ও লেখার দুর্বলতার মাত্রা নিচে বিশদভাবে প্রদর্শন করা হলো:
                    </p>
                    
                    <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                      <div className="grid grid-cols-3 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 border-b border-slate-200">
                        <span>বিষয়</span>
                        <span>পড়ার দুর্বলতা</span>
                        <span>লেখার দুর্বলতা</span>
                      </div>
                      {[
                        { name: 'বাংলা (Bangla)', read: loggedInStudent.readingWeaknesses?.bangla, write: loggedInStudent.writingWeaknesses?.bangla },
                        { name: 'ইংরেজি (English)', read: loggedInStudent.readingWeaknesses?.english, write: loggedInStudent.writingWeaknesses?.english },
                        { name: 'গণিত (Math)', read: loggedInStudent.readingWeaknesses?.math, write: loggedInStudent.writingWeaknesses?.math }
                      ].map((subj) => {
                        const getBadge = (lvl: string | undefined) => {
                          if (!lvl || lvl === 'None') return <span className="text-emerald-600 font-bold bg-emerald-100/60 px-2 py-0.5 rounded text-[10px]">সমস্যা নেই (None)</span>;
                          if (lvl === 'Mild') return <span className="text-blue-600 font-bold bg-blue-100/60 px-2 py-0.5 rounded text-[10px]">সাধারণ (Mild)</span>;
                          if (lvl === 'Moderate') return <span className="text-amber-600 font-bold bg-amber-100/60 px-2 py-0.5 rounded text-[10px]">মাঝারি (Moderate)</span>;
                          return <span className="text-rose-600 font-bold bg-rose-100/60 px-2 py-0.5 rounded text-[10px]">তীব্র (Severe)</span>;
                        };
                        return (
                          <div key={subj.name} className="grid grid-cols-3 px-3 py-2.5 border-b border-slate-150 last:border-b-0 items-center text-xs">
                            <span className="font-bold text-slate-700">{subj.name}</span>
                            <span>{getBadge(subj.read)}</span>
                            <span>{getBadge(subj.write)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4-Week Progress Evaluation Tracker */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>আগামী ১ মাসের সাপ্তাহিক মূল্যায়ন পর্যবেক্ষণ (Monthly Progress Tracking)</span>
                    </h4>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { weekNum: 1, label: '১ম সপ্তাহ (Week 1)', status: loggedInStudent.weeklyProgress?.week1 },
                        { weekNum: 2, label: '২য় সপ্তাহ (Week 2)', status: loggedInStudent.weeklyProgress?.week2 },
                        { weekNum: 3, label: '৩য় সপ্তাহ (Week 3)', status: loggedInStudent.weeklyProgress?.week3 },
                        { weekNum: 4, label: '৪র্থ সপ্তাহ (Week 4)', status: loggedInStudent.weeklyProgress?.week4 }
                      ].map((w) => {
                        const getProgressIcon = (stat: string | undefined) => {
                          if (!stat || stat === 'None') return <span className="text-slate-400 font-medium">রেকর্ড নেই</span>;
                          if (stat === 'Red') return <span className="text-rose-600 font-bold">🔴 ধীর (Red)</span>;
                          if (stat === 'Yellow') return <span className="text-amber-600 font-bold">🟡 মাঝারি (Yellow)</span>;
                          return <span className="text-emerald-600 font-bold">🟢 চমৎকার (Green)</span>;
                        };
                        return (
                          <div key={w.weekNum} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-1">
                            <p className="text-[10px] font-bold text-slate-400">{w.label}</p>
                            <p className="text-xs mt-1">{getProgressIcon(w.status)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Suggestions for Parents / Teachers */}
                  <div className="p-5 bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
                    <h5 className="font-bold text-indigo-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                      <span>এআই দ্বারা নির্দেশিত ব্যক্তিগত শিখন গাইড ও সাজেশন</span>
                    </h5>
                    
                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-medium bg-white/80 p-4 rounded-xl border border-indigo-100/50">
                      {loggedInStudent.aiSuggestion ? (
                        loggedInStudent.aiSuggestion
                      ) : (
                        <p className="text-slate-400 italic text-center py-2">
                          এই শিক্ষার্থীর জন্য শ্রেণী শিক্ষক কর্তৃক কোনো এআই সাজেশন তৈরি করা হয়নি।
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reporting Teacher Information */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>তথ্য প্রদানকারী শিক্ষক: <strong className="text-slate-700">{loggedInStudent.reportingTeacher || 'N/A'}</strong></span>
                    </div>
                    {loggedInStudent.parentPhone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>অভিভাবকের মোবাইল: <strong className="text-slate-700 font-mono">{loggedInStudent.parentPhone}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Teacher's Advice, Interventions & Behavior - 4 Cols */}
              <div className="lg:col-span-4 space-y-6 text-left">
                
                {/* 2-Week Goal Box */}
                {loggedInStudent.shortTermGoal && (
                  <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl border border-rose-100 p-6 shadow-md space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-rose-200">
                      <TrendingUp className="w-4 h-4 text-rose-500" />
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🎯 ২ সপ্তাহের লক্ষ্য ও প্রগতি</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white/80 p-3 rounded-xl border border-rose-100 space-y-1">
                        <p className="text-[10px] font-bold text-rose-500">চলমান লক্ষ্য (Active Goal):</p>
                        <p className="text-xs font-bold text-slate-800 leading-relaxed">{loggedInStudent.shortTermGoal.title}</p>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">পূরণের শেষ সময়:</span>
                        <span className="font-bold text-slate-700">
                          {new Date(loggedInStudent.shortTermGoal.targetDate).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>

                      {(() => {
                        const target = new Date(loggedInStudent.shortTermGoal!.targetDate);
                        const today = new Date();
                        target.setHours(0,0,0,0);
                        today.setHours(0,0,0,0);
                        const diffTime = target.getTime() - today.getTime();
                        const daysRem = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const isExp = daysRem < 0;
                        
                        const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
                        const toBnNum = (n: number) => Math.abs(n).toString().split('').map(d => bnNums[parseInt(d)] || d).join('');
                        
                        return (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 font-medium">বাকি সময়:</span>
                              {isExp ? (
                                <span className="text-rose-600 font-black bg-rose-100 px-2 py-0.5 rounded animate-pulse">⏰ সময় অতিক্রান্ত!</span>
                              ) : (
                                <span className="text-slate-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded">⏳ আর {toBnNum(daysRem)} দিন বাকি</span>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                              <span className="text-slate-500 font-medium">বর্তমান অবস্থা:</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                loggedInStudent.shortTermGoal?.status === 'Achieved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                loggedInStudent.shortTermGoal?.status === 'Needs Improvement' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                                'bg-blue-100 text-blue-800 border border-blue-200'
                              }`}>
                                {loggedInStudent.shortTermGoal?.status === 'Achieved' ? '🏆 অর্জিত (Achieved)' :
                                 loggedInStudent.shortTermGoal?.status === 'Needs Improvement' ? '⚠️ উন্নয়ন প্রয়োজন' : '🎯 চলমান (In Progress)'}
                              </span>
                            </div>

                            {/* Self status update options */}
                            <div className="pt-2.5 mt-2 border-t border-rose-200/60 bg-white/50 p-3 rounded-xl space-y-2">
                              <p className="text-[10px] text-slate-600 font-extrabold leading-normal">
                                {isExp 
                                  ? "⏰ লক্ষ্য পূরণের সময় পেরিয়ে গেছে! অভিভাবক বা শিক্ষার্থী হিসেবে লক্ষ্যটির বর্তমান অবস্থা আপডেট করুন:" 
                                  : "প্রগতি পরিবর্তনের সাথে সাথে লক্ষ্যটির বর্তমান অবস্থা আপডেট করুন:"}
                              </p>
                              <div className="flex gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateParentGoalStatus('Achieved')}
                                  className="flex-1 text-[9px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1.5 rounded-lg transition active:scale-95 cursor-pointer shadow-sm"
                                >
                                  🏆 অর্জিত
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateParentGoalStatus('Needs Improvement')}
                                  className="flex-1 text-[9px] font-bold bg-rose-600 hover:bg-rose-500 text-white px-2 py-1.5 rounded-lg transition active:scale-95 cursor-pointer shadow-sm"
                                >
                                  ⚠️ প্রয়োজন
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateParentGoalStatus('In Progress')}
                                  className="text-[9px] font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1.5 rounded-lg transition active:scale-95 cursor-pointer shadow-sm"
                                >
                                  🎯 চলমান
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* 3. Teacher's Advice & Remarks Box */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl border border-indigo-950 p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-indigo-800/60">
                    <BookOpen className="w-4 h-4 text-indigo-300" />
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">শিক্ষকের মূল্যবান মন্তব্য</h4>
                  </div>

                  <div className="relative pt-1">
                    <span className="absolute -top-3 -left-2 text-4xl text-indigo-400 font-serif opacity-30">“</span>
                    <p className="text-xs font-medium text-indigo-100 italic leading-relaxed pl-4 z-10 relative">
                      {loggedInStudent.teacherRemarks || 'শিক্ষার্থীর জন্য এখনও কোনো বিশেষ মন্তব্য যুক্ত করা হয়নি।'}
                    </p>
                    <span className="absolute -bottom-6 right-2 text-4xl text-indigo-400 font-serif opacity-30">”</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 pt-3 mt-4">
                    <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">শ্রেণীকক্ষে গৃহীত বিশেষ কৌশল:</p>
                    <p className="text-[11px] text-slate-200 leading-normal font-light">
                      {loggedInStudent.strategyUsed}
                    </p>
                  </div>
                </div>

                {/* 4. Psychological & Hidden Talent Box */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">মনস্তাত্ত্বিক পর্যবেক্ষণ ও গুণ</h4>
                  </div>

                  <div className="space-y-3">
                    {/* Behavior */}
                    <div className="text-xs space-y-1">
                      <p className="text-slate-400 font-bold">শ্রেণীকক্ষে সাধারণ আচরণ:</p>
                      <p className="font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg p-2 leading-relaxed">
                        {loggedInStudent.behavior}
                      </p>
                    </div>

                    {/* Learning style */}
                    <div className="text-xs space-y-0.5">
                      <p className="text-slate-400 font-bold">শিখন পছন্দ (Learning Preference):</p>
                      <p className="font-bold text-indigo-600">
                        {LearningStyleLabels[loggedInStudent.learningStyle]}
                      </p>
                    </div>

                    {/* Supto Protibha / Hidden Talent */}
                    {loggedInStudent.hiddenTalent && (
                      <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-xl p-3 space-y-1">
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                          <Smile className="w-3.5 h-3.5 text-emerald-600" />
                          <span>সুপ্ত প্রতিভা / বিশেষ গুণ:</span>
                        </p>
                        <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                          {loggedInStudent.hiddenTalent}
                        </p>
                        <p className="text-[9px] text-emerald-700/80 font-light">
                          * শিক্ষক এই সুপ্ত প্রতিভাকে কাজে লাগিয়ে আপনার সন্তানের শিখন অক্ষমতা কাটিয়ে তোলার বিশেষ প্রয়াস চালাচ্ছেন।
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Parent Home Activities Guide Box */}
                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-5 space-y-3">
                  <h5 className="font-bold text-indigo-800 text-xs flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    <span>বাড়িতে অভিভাবকের করণীয়:</span>
                  </h5>
                  
                  <ul className="space-y-2 text-[11px] text-slate-600 font-medium list-disc pl-4 leading-normal">
                    <li>শিক্ষার্থীর শিখন পছন্দ (<strong className="text-indigo-700">{LearningStyleLabels[loggedInStudent.learningStyle]}</strong>) অনুযায়ী বাড়িতে পড়ার পরিবেশ প্রস্তুত করুন।</li>
                    <li>নমনীয় এবং বন্ধুত্বপূর্ণ আচরণ করুন, পড়ার মাঝে মাঝে ছোট বিরতি দিন।</li>
                    <li>ছোটখাটো অগ্রগতিতেও প্রশংসা করুন এবং শ্রেণী শিক্ষকের ডায়েরি নিয়মতান্ত্রিক ফলো করুন।</li>
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
