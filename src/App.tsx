/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentRecord, ProgressSignalLabels, WeaknessCategoryLabels, WeaknessLevelLabels, LearningStyleLabels } from './types';
import { initialStudentRecords } from './sampleData';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import PrintReportView from './components/PrintReportView';
import PresentationGuide from './components/PresentationGuide';
import StudentAnalytics from './components/StudentAnalytics';
import TeacherQuickPanel from './components/TeacherQuickPanel';
import DailyMannerDiary from './components/DailyMannerDiary';
import AlertNotificationCenter from './components/AlertNotificationCenter';
import TeacherGuidebook from './components/TeacherGuidebook';
import WeeklyProgressChart from './components/WeeklyProgressChart';
import ParentView from './components/ParentView';
import { 
  Printer, 
  RotateCcw, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  FileSpreadsheet, 
  GraduationCap, 
  Sparkles,
  Copy,
  Check,
  Upload,
  X,
  Download,
  Users
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'teacher' | 'parent'>('teacher');
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<StudentRecord | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  
  // Backup & Restore state
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreText, setRestoreText] = useState('');
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyBackup = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(records, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy records to clipboard:', err);
    }
  };
  
  // States for custom print header settings (propagates to PrintReportView)
  const [schoolName, setSchoolName] = useState('ডি-লিকন মডেল একাডেমী');
  const [academicYear, setAcademicYear] = useState('২০২৬');

  // Load initial data from localStorage or fallback to sampleData
  useEffect(() => {
    document.title = "শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ";
    const saved = localStorage.getItem('student_intervention_records');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved records, using initial samples', e);
        setRecords(initialStudentRecords);
      }
    } else {
      setRecords(initialStudentRecords);
    }
  }, []);

  // Save to localStorage whenever records change
  const saveRecords = (newRecords: StudentRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('student_intervention_records', JSON.stringify(newRecords));
  };

  // Create or Update Record
  const handleFormSubmit = (data: Omit<StudentRecord, 'id' | 'createdAt'> & { id?: string }) => {
    if (data.id) {
      // Editing Mode
      const updated = records.map(rec => {
        if (rec.id === data.id) {
          return {
            ...rec,
            ...data,
            id: rec.id, // preserve id
            createdAt: rec.createdAt // preserve timestamp
          } as StudentRecord;
        }
        return rec;
      });
      saveRecords(updated);
      setEditingRecord(null);
      // Auto-collapse form upon editing completion to focus on the updated table
      setIsFormExpanded(false);
    } else {
      // Creation Mode
      const newRecord: StudentRecord = {
        ...data,
        id: `rec-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      saveRecords([newRecord, ...records]);
    }
  };

  // Delete Record
  const handleDeleteRecord = (id: string) => {
    const filtered = records.filter(rec => rec.id !== id);
    saveRecords(filtered);
    // If we're deleting the record currently being edited, cancel edit mode
    if (editingRecord?.id === id) {
      setEditingRecord(null);
    }
  };

  // Update Goal Status
  const handleUpdateGoalStatus = (id: string, status: 'In Progress' | 'Achieved' | 'Needs Improvement') => {
    const updated = records.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          shortTermGoal: rec.shortTermGoal ? {
            ...rec.shortTermGoal,
            status,
            updatedAt: new Date().toISOString()
          } : undefined
        } as StudentRecord;
      }
      return rec;
    });
    saveRecords(updated);
  };

  // Trigger Edit Mode
  const handleEditTrigger = (record: StudentRecord) => {
    setEditingRecord(record);
    setIsFormExpanded(true); // Make sure form is visible to edit
    // Scroll to form smoothly
    const formEl = document.getElementById('student-entry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset to original sample records
  const handleResetData = () => {
    if (confirm('আপনি কি ডাটা রিসেট করে ডিফল্ট ৩টি স্যাম্পল রেকর্ড পুনরায় দেখতে চান? আপনার তৈরি সকল নতুন রেকর্ড মুছে যাবে।')) {
      saveRecords(initialStudentRecords);
      setEditingRecord(null);
      setIsFormExpanded(true);
    }
  };

  // Print Date generator for default page background printing
  const getBengaliDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('bn-BD', options);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* 1. Main UI Page Content (Hidden when printing via .no-print) */}
      <div className="no-print space-y-6 pb-12">
        
        {/* Top Navbar with Frosted Glass look */}
        <header className="bg-white/5 border-b border-white/10 sticky top-0 z-40 shadow-lg backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                  শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স
                </h1>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400">
                  ৩-স্তরীয় শিখন ও মনস্তাত্ত্বিক রূপরেখা পর্যবেক্ষণ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyBackup}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition active:scale-95"
                title="সকল শিক্ষার্থী তথ্য কপি করুন (JSON ব্যাকআপ)"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span className="hidden md:inline">{copied ? 'কপি হয়েছে!' : 'ব্যাকআপ কপি'}</span>
              </button>

              <button
                onClick={() => setShowRestoreModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition active:scale-95"
                title="ব্যাকআপ রিস্টোর করুন"
              >
                <Upload className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden md:inline">রিস্টোর</span>
              </button>

              <button
                onClick={handleResetData}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition active:scale-95"
                title="স্যাম্পল ডাটা রিসেট করুন"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">স্যাম্পল রিসেট</span>
              </button>

              <button
                onClick={() => setShowPrintModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-600/25 cursor-pointer transition active:scale-95"
                title="পিডিএফ ফরম্যাটে অফলাইনে ডাউনলোড বা সংরক্ষণ করুন"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">পিডিএফ ডাউনলোড</span>
                <span className="sm:hidden">PDF</span>
              </button>

              <button
                onClick={() => setShowPrintModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-600/25 cursor-pointer transition active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট ভিউ (A4 Landscape)</span>
              </button>
            </div>
          </div>
        </header>

        {/* Workspace Hub */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/60 border border-white/10 rounded-2xl p-4 gap-4 backdrop-blur-md">
            <div className="text-left">
              <h3 className="text-xs font-bold text-slate-200">ড্যাশবোর্ড ভিউ মোড পরিবর্তন করুন (Switch Workspace View)</h3>
              <p className="text-[10px] text-slate-400 font-light">আপনার প্রয়োজন অনুযায়ী শিক্ষক অথবা অভিভাবক প্যানেল নির্বাচন করুন</p>
            </div>
            <div className="flex bg-slate-950/80 p-1 rounded-xl w-full sm:w-auto border border-white/5">
              <button
                onClick={() => setViewMode('teacher')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                  viewMode === 'teacher'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>শিক্ষক প্যানেল</span>
              </button>
              <button
                onClick={() => setViewMode('parent')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                  viewMode === 'parent'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>অভিভাবক কর্নার</span>
              </button>
            </div>
          </div>

          {viewMode === 'teacher' ? (
            <>
              {/* Live Alerts & Notification Center for Red Signals */}
              <AlertNotificationCenter records={records} />
              
              {/* Institutional Banner Details & Framework Intro */}
              <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
                  <GraduationCap className="w-96 h-96" />
                </div>
                
                <div className="max-w-3xl space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200">
                    <Sparkles className="w-3 h-3" />
                    <span>প্রাতিষ্ঠানিক বিশেষ শিক্ষা সহকারী কাঠামো</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স (Student Intervention & Progress Matrix)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light font-medium text-left">
                    সংগ্রামরত শিক্ষার্থীদের পাঠোন্নতি ও মনস্তাত্ত্বিক বিকাশ পর্যবেক্ষণের জন্য এই অ্যাপ্লিকেশনটি ৩টি প্রধান পদ্ধতিকে একত্রিত করে:
                  </p>

                  {/* Three Combined Frameworks Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-left">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-300 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-200">১. সাধারণ ডায়াগনস্টিক</h4>
                        <p className="text-[10px] text-slate-400 font-light">দুর্বলতার বিষয়, তীব্রতা ও নেপথ্য কারণ নির্ধারণ</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-left">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-300 mt-0.5">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-200">২. মনস্তাত্ত্বিক ম্যাপিং</h4>
                        <p className="text-[10px] text-slate-400 font-light">শিখন শৈলী, ক্লাসে আচরণ ও সুপ্ত প্রতিভা উন্মোচন</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-left">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-300 mt-0.5">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-200">৩. প্রগতি পর্যবেক্ষণ</h4>
                        <p className="text-[10px] text-slate-400 font-light">বেসলাইন বনাম বর্তমান সক্ষমতা ও অগ্রগতি সিগন্যাল</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher's Work Hub & Quick Panel */}
              <TeacherQuickPanel records={records} />

              {/* Form Area with Collapsible Accordion Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-xl shadow-md">
                  <button 
                    onClick={() => setIsFormExpanded(!isFormExpanded)}
                    className="flex items-center gap-2 text-slate-200 font-bold text-sm hover:text-white transition cursor-pointer w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 text-blue-400" />
                    <span>
                      {editingRecord ? 'তথ্য আপডেট ফর্ম (চলমান)' : 'নতুন শিক্ষার্থী ও মূল্যায়ন ফর্ম যুক্ত করুন'}
                    </span>
                    {isFormExpanded ? <ChevronUp className="w-4 h-4 ml-auto text-slate-400" /> : <ChevronDown className="w-4 h-4 ml-auto text-slate-400" />}
                  </button>
                </div>

                {isFormExpanded && (
                  <div className="animate-fade-in-down">
                    <StudentForm 
                      onSubmit={handleFormSubmit}
                      editingRecord={editingRecord}
                      onCancelEdit={() => {
                        setEditingRecord(null);
                        setIsFormExpanded(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Data Table */}
              <StudentTable 
                records={records}
                onDelete={handleDeleteRecord}
                onEdit={handleEditTrigger}
                onUpdateGoalStatus={handleUpdateGoalStatus}
              />

              {/* Student Progress Visualization Dashboard */}
              <StudentAnalytics records={records} />

              {/* Weekly Progress Comparison Line Chart */}
              <WeeklyProgressChart records={records} />

              {/* Daily Manner Diary */}
              <DailyMannerDiary records={records} />

              {/* Teacher Pedagogy Guidebook */}
              <TeacherGuidebook />

              {/* Presentation and Implementation Guidelines Mappings */}
              <PresentationGuide />
            </>
          ) : (
            <div className="animate-fade-in">
              <ParentView 
                records={records} 
                onBackToTeacher={() => setViewMode('teacher')} 
                onUpdateGoalStatus={handleUpdateGoalStatus}
              />
            </div>
          )}

        </main>
      </div>

      {/* 2. Institutional Footer for Main Page screen mode (Hidden when printing) */}
      <footer className="no-print bg-white/5 border-t border-white/10 py-6 mt-12 text-center text-xs text-slate-400 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-200">শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স © ২০২৬</p>
          <p className="font-light text-slate-400">বিশেষ শিক্ষা ও মনস্তাত্ত্বিক হস্তক্ষেপ প্রগতি বিবরণী সংরক্ষণের একটি প্রাতিষ্ঠানিক ডিজিটাল ব্যবস্থা</p>
        </div>
      </footer>

      {/* 3. Landscape Print Preview Overlay Modal (No-print, only active when user requests) */}
      {showPrintModal && (
        <PrintReportView 
          records={records}
          onClose={() => setShowPrintModal(false)}
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          academicYear={academicYear}
          setAcademicYear={setAcademicYear}
        />
      )}

      {/* Backup Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-400" />
                <span>ম্যানুয়াল ব্যাকআপ রিস্টোর (JSON)</span>
              </h3>
              <button 
                onClick={() => {
                  setShowRestoreModal(false);
                  setRestoreText('');
                  setRestoreError(null);
                }}
                className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              পূর্বে কপি করা ব্যাকআপ JSON টেক্সটটি নিচের বাক্সে পেস্ট করুন এবং 'ডাটা রিস্টোর করুন' বাটনে ক্লিক করুন। এটি আপনার বর্তমান তালিকা প্রতিস্থাপন করবে।
            </p>

            <div className="space-y-1">
              <textarea
                value={restoreText}
                onChange={(e) => {
                  setRestoreText(e.target.value);
                  setRestoreError(null);
                }}
                placeholder='[{"studentName": "...", "studentId": "...", ...}]'
                className="w-full h-40 text-xs font-mono p-3 rounded-lg border border-white/15 bg-slate-950 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {restoreError && (
                <p className="text-red-400 text-xs font-semibold">{restoreError}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setShowRestoreModal(false);
                  setRestoreText('');
                  setRestoreError(null);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  if (!restoreText.trim()) {
                    setRestoreError('অনুগ্রহ করে ব্যাকআপ JSON পেস্ট করুন।');
                    return;
                  }
                  try {
                    const parsed = JSON.parse(restoreText);
                    if (Array.isArray(parsed)) {
                      const isValid = parsed.every(item => item && typeof item === 'object' && 'studentName' in item && 'studentId' in item);
                      if (isValid) {
                        saveRecords(parsed);
                        setShowRestoreModal(false);
                        setRestoreText('');
                        setRestoreError(null);
                        setIsFormExpanded(false);
                      } else {
                        setRestoreError('ভুল ফরম্যাট: প্রদত্ত JSON-এ শিক্ষার্থীর প্রয়োজনীয় তথ্য অনুপস্থিত।');
                      }
                    } else {
                      setRestoreError('ভুল ফরম্যাট: ব্যাকআপ ডাটা অবশ্যই একটি অ্যারে (Array) হতে হবে।');
                    }
                  } catch (err) {
                    setRestoreError('ভুল ফরম্যাট: ডাটাটি সঠিক JSON ফরম্যাটে নেই। ব্র্যাকেট বা কমা চেক করুন।');
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-600/25 transition active:scale-95 cursor-pointer"
              >
                ডাটা রিস্টোর করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ALWAYS POPULATED HIDDEN PRINT CONTAINER (This renders on normal Ctrl+P and fits landscape flawlessly) */}
      <div className="print-only" id="direct-print-layout">
        {/* Institutional Header */}
        <div className="text-center space-y-1.5 border-b-2 border-double border-slate-800 pb-4 mb-5">
          {/* D-Likon Model Academy Logo SVG */}
          <svg className="mx-auto w-24 h-24 mb-2" viewBox="0 0 200 200">
            <defs>
              <path id="direct-top-curve" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
              <path id="direct-bottom-curve" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
            </defs>

            {/* Outer Laurel / Decorative circles */}
            <circle cx="100" cy="100" r="92" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="#10b981" strokeWidth="2" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

            {/* Inner solid background */}
            <circle cx="100" cy="100" r="76" fill="#f8fafc" stroke="#334155" strokeWidth="1" />

            {/* Sun Rays & Sun in the center */}
            <g transform="translate(100, 75)">
              <path d="M -15,0 A 15,15 0 0,1 15,0 Z" fill="#f97316" />
              <line x1="0" y1="-1" x2="0" y2="-12" stroke="#f97316" strokeWidth="2" />
              <line x1="-8" y1="-4" x2="-16" y2="-10" stroke="#f97316" strokeWidth="1.5" />
              <line x1="8" y1="-4" x2="16" y2="-10" stroke="#f97316" strokeWidth="1.5" />
              <line x1="-12" y1="2" x2="-22" y2="-2" stroke="#f97316" strokeWidth="1.5" />
              <line x1="12" y1="2" x2="22" y2="-2" stroke="#f97316" strokeWidth="1.5" />
            </g>

            {/* Open Book in the center */}
            <g transform="translate(100, 92)">
              <path d="M 0,10 C -12,4 -22,4 -28,8 L -28,-12 C -22,-16 -12,-16 0,-10 Z" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
              <path d="M 0,10 C 12,4 22,4 28,8 L 28,-12 C 22,-16 12,-16 0,-10 Z" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
              <line x1="0" y1="-10" x2="0" y2="12" stroke="#1e3a8a" strokeWidth="2.5" />
              
              <text x="-14" y="-2" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">D</text>
              <text x="-14" y="6" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">M</text>
              <text x="14" y="-2" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">L</text>
              <text x="14" y="6" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">A</text>
            </g>

            {/* Top curved text: ডি-লিকন মডেল একাডেমী */}
            <text fontStyle="normal" fontWeight="bold" fontSize="10" fill="#dc2626">
              <textPath href="#direct-top-curve" startOffset="50%" textAnchor="middle">
                ডি-লিকন মডেল একাডেমী
              </textPath>
            </text>

            {/* Established text */}
            <text x="100" y="124" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#4c1d95" textAnchor="middle">
              স্থাপিত: ২০১৮ ইং
            </text>

            {/* Bottom curved text: গেঁড়ী মার্কেট, সনমানিয়া, কাপাসিয়া */}
            <text fontStyle="normal" fontWeight="bold" fontSize="7" fill="#047857">
              <textPath href="#direct-bottom-curve" startOffset="50%" textAnchor="middle">
                গেঁড়ী মার্কেট, সনমানিয়া, কাপাসিয়া, গাজীপুর
              </textPath>
            </text>

            {/* Bottom Banner Ribbon */}
            <g transform="translate(100, 160)">
              <path d="M -65,-8 L 65,-8 L 60,8 L -60,8 Z" fill="#7c3aed" />
              <path d="M -65,-8 L -60,8 L -75,12 L -70,-2 Z" fill="#5b21b6" />
              <path d="M 65,-8 L 60,8 L 75,12 L 70,-2 Z" fill="#5b21b6" />
              <text x="0" y="3" fontFamily="Georgia, serif" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                D-Likon Model Academy
              </text>
            </g>
          </svg>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">
            {schoolName || 'সরকারি প্রাথমিক/মাধ্যমিক বিদ্যালয় প্রগতি বিবরণী'}
          </h1>
          <p className="text-[10px] font-bold text-slate-600">
            বিশেষ উন্নয়ন কার্যক্রম ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স ({academicYear || '২০২৬'} শিক্ষাবর্ষ)
          </p>
          <div className="flex justify-between items-center text-[9px] text-slate-600 pt-1 px-1">
            <span>প্রতিবেদন প্রকাশের তারিখ: {getBengaliDate()}</span>
            <span className="font-bold">শ্রেণীকক্ষ বিশেষ হস্তক্ষেপ নথি</span>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse border border-slate-800 text-[10px]">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-800 font-bold text-slate-900">
              <th className="border border-slate-800 p-1.5 text-center w-[12%]">শিক্ষার্থীর বিবরণ</th>
              <th className="border border-slate-800 p-1.5 text-center w-[18%]">সাধারণ ডায়াগনস্টিক</th>
              <th className="border border-slate-800 p-1.5 text-center w-[18%]">মনস্তাত্ত্বিক ও আচরণ</th>
              <th className="border border-slate-800 p-1.5 text-center w-[22%]">প্রগতি ও পর্যবেক্ষণ (Competency)</th>
              <th className="border border-slate-800 p-1.5 text-center w-[22%]">গৃহীত বিশেষ হস্তক্ষেপ কৌশল</th>
              <th className="border border-slate-800 p-1.5 text-center w-[8%]">অগ্রগতি সংকেত</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const signal = ProgressSignalLabels[record.progressSignal];
              return (
                <tr key={record.id} className="border-b border-slate-800">
                  <td className="border border-slate-800 p-1.5 align-top">
                    <div className="font-bold text-[11px]">{record.studentName}</div>
                    <div className="text-[9px] text-slate-700">ID: {record.studentId}</div>
                    <div className="text-[9px] text-slate-800 font-medium">{record.studentClass}</div>
                  </td>
                  <td className="border border-slate-800 p-1.5 align-top space-y-0.5">
                    <div><strong>ক্ষেত্র:</strong> {WeaknessCategoryLabels[record.weaknessCategory]}</div>
                    <div><strong>মাত্রা:</strong> {WeaknessLevelLabels[record.weaknessLevel]}</div>
                    <div className="text-[9px] text-slate-700 italic"><strong>কারণ:</strong> {record.rootCause}</div>
                  </td>
                  <td className="border border-slate-800 p-1.5 align-top space-y-0.5">
                    <div><strong>শিখন শৈলী:</strong> {LearningStyleLabels[record.learningStyle]}</div>
                    <div><strong>আচরণ:</strong> {record.behavior}</div>
                    {record.hiddenTalent && <div className="text-teal-900 font-medium"><strong>প্রতিভা:</strong> {record.hiddenTalent}</div>}
                  </td>
                  <td className="border border-slate-800 p-1.5 align-top space-y-1 text-[9px]">
                    <div>
                      <strong className="text-rose-800 block">১. প্রাথমিক অবস্থা:</strong>
                      <span className="text-slate-700 block">{record.baselineStatus}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-800 block">২. বর্তমান অবস্থা:</strong>
                      <span className="text-slate-700 block">{record.currentStatus}</span>
                    </div>
                  </td>
                  <td className="border border-slate-800 p-1.5 align-top space-y-1 text-[9px]">
                    <div><strong>কৌশল:</strong> {record.strategyUsed}</div>
                    {record.teacherRemarks && <div className="text-slate-500 italic">“{record.teacherRemarks}”</div>}
                  </td>
                  <td className="border border-slate-800 p-1.5 text-center align-middle bg-slate-50">
                    <div className="space-y-0.5">
                      <span className="text-lg block">{signal.emoji}</span>
                      <span className="text-[8px] font-bold block">
                        {record.progressSignal === 'Red' ? 'ধীর' : record.progressSignal === 'Yellow' ? 'মাঝারি' : 'সন্তোষজনক'}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-14 flex justify-between pt-6 text-[10px] font-semibold text-slate-800">
          <div className="border-t border-slate-800 pt-1 text-center w-44">
            <p>শ্রেণী শিক্ষকের স্বাক্ষর</p>
            <p className="text-[8px] font-normal text-slate-500">তারিখ: ............................</p>
          </div>
          <div className="border-t border-slate-800 pt-1 text-center w-44">
            <p>প্রধান শিক্ষকের প্রতিস্বাক্ষর ও সিল</p>
            <p className="text-[8px] font-normal text-slate-500">তারিখ: ............................</p>
          </div>
        </div>
      </div>

    </div>
  );
}
