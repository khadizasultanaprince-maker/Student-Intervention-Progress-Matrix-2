/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  StudentRecord, 
  WeaknessCategory, 
  WeaknessLevel, 
  LearningStyle, 
  ProgressSignal,
  WeaknessCategoryLabels,
  WeaknessLevelLabels,
  LearningStyleLabels,
  ProgressSignalLabels
} from '../types';
import { User, ShieldAlert, Brain, FileSpreadsheet, Send, RefreshCw, X, Target, Sparkles, Phone, UserCheck, BookOpen, PenTool, HelpCircle, Activity, Calendar, Image, Users, Upload } from 'lucide-react';
import { PRELOADED_STUDENTS, getPlaceholderAvatar } from '../studentDatabase';

interface StudentFormProps {
  onSubmit: (record: Omit<StudentRecord, 'id' | 'createdAt'> & { id?: string }) => void;
  editingRecord: StudentRecord | null;
  onCancelEdit: () => void;
}

const getTwoWeeksFromNow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split('T')[0];
};

const initialFormState = {
  studentName: '',
  studentId: '',
  studentClass: '',
  weaknessCategory: 'Reading' as WeaknessCategory,
  weaknessLevel: 'Moderate' as WeaknessLevel,
  rootCause: '',
  learningStyle: 'Visual' as LearningStyle,
  behavior: '',
  hiddenTalent: '',
  baselineStatus: '',
  currentStatus: '',
  progressSignal: 'Yellow' as ProgressSignal,
  lastWeekProgressSignal: 'Yellow' as ProgressSignal,
  strategyUsed: '',
  teacherRemarks: '',
  // Goal Fields
  goalTitle: '',
  goalTargetDate: getTwoWeeksFromNow(),
  goalStatus: 'In Progress' as 'In Progress' | 'Achieved' | 'Needs Improvement',
  
  // Meeting Format Fields
  readingBangla: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  readingEnglish: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  readingMath: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  writingBangla: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  writingEnglish: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  writingMath: 'None' as 'None' | 'Mild' | 'Moderate' | 'Severe',
  reportingTeacher: '',
  parentPhone: '',
  
  // 1-Month Progress Tracker
  week1: 'None' as 'None' | 'Red' | 'Yellow' | 'Green',
  week2: 'None' as 'None' | 'Red' | 'Yellow' | 'Green',
  week3: 'None' as 'None' | 'Red' | 'Yellow' | 'Green',
  week4: 'None' as 'None' | 'Red' | 'Yellow' | 'Green',
  aiSuggestion: '',

  // New Lookup & Photo fields
  studentRoll: '',
  studentPhoto: '',
  fatherName: '',
  motherName: '',
  fatherPhoto: '',
  motherPhoto: '',
};

export default function StudentForm({ onSubmit, editingRecord, onCancelEdit }: StudentFormProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [searchClass, setSearchClass] = useState('');
  const [searchRoll, setSearchRoll] = useState('');
  const [lookupMessage, setLookupMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

  const toBanglaNum = (str: string) => {
    const banglaMap: Record<string, string> = { '0':'০', '1':'১', '2':'২', '3':'৩', '4':'৪', '5':'৫', '6':'৬', '7':'৭', '8':'৮', '9':'৯' };
    return str.replace(/[0-9]/g, c => banglaMap[c] || c);
  };
  
  const toEnglishNum = (str: string) => {
    const engMap: Record<string, string> = { '০':'0', '১':'1', '২':'2', '৩':'3', '৪':'4', '৫':'5', '৬':'6', '৭':'7', '৮':'8', '৯':'9' };
    return str.replace(/[০-৯]/g, c => engMap[c] || c);
  };

  useEffect(() => {
    if (!searchClass || !searchRoll) {
      setLookupMessage({ type: null, text: '' });
      return;
    }
    const classStudents = PRELOADED_STUDENTS[searchClass];
    if (classStudents) {
      const bRoll = toBanglaNum(searchRoll.trim());
      const eRoll = toEnglishNum(searchRoll.trim());
      const match = classStudents.find(s => s.roll === bRoll || s.roll === eRoll || s.roll === searchRoll.trim());
      if (match) {
        setFormData(prev => ({
          ...prev,
          studentName: match.name,
          studentId: match.roll,
          studentClass: `${searchClass} শ্রেণী (শ্রেণী - ${searchClass})`,
          studentRoll: match.roll,
          studentPhoto: getPlaceholderAvatar(match.gender, match.roll),
        }));
        setLookupMessage({
          type: 'success',
          text: `✓ শিক্ষার্থী পাওয়া গেছে! নাম: ${match.name}, শ্রেণী: ${searchClass}, রোল: ${match.roll}`
        });
      } else {
        setLookupMessage({
          type: 'error',
          text: `✗ এই রোলের কোনো শিক্ষার্থী পাওয়া যায়নি।`
        });
      }
    } else {
      setLookupMessage({
        type: 'error',
        text: `✗ এই শ্রেণীর কোনো শিক্ষার্থী রেকর্ড পাওয়া যায়নি।`
      });
    }
  }, [searchClass, searchRoll]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'studentPhoto' | 'fatherPhoto' | 'motherPhoto') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAISuggestion = async () => {
    setIsGeneratingAI(true);
    try {
      const response = await fetch('/api/ai-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: formData.studentName,
          studentClass: formData.studentClass,
          learningStyle: formData.learningStyle,
          behavior: formData.behavior,
          baselineStatus: formData.baselineStatus,
          currentStatus: formData.currentStatus,
          readingWeaknesses: {
            bangla: formData.readingBangla,
            english: formData.readingEnglish,
            math: formData.readingMath,
          },
          writingWeaknesses: {
            bangla: formData.writingBangla,
            english: formData.writingEnglish,
            math: formData.writingMath,
          },
          weeklyProgress: {
            week1: formData.week1,
            week2: formData.week2,
            week3: formData.week3,
            week4: formData.week4,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        aiSuggestion: data.suggestion,
      }));
    } catch (err) {
      console.error(err);
      alert('এআই সাজেশন জেনারেট করতে সমস্যা হয়েছে। দয়া করে আপনার কানেকশন চেক করুন এবং পুনরায় চেষ্টা করুন।');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        studentName: editingRecord.studentName,
        studentId: editingRecord.studentId,
        studentClass: editingRecord.studentClass,
        weaknessCategory: editingRecord.weaknessCategory,
        weaknessLevel: editingRecord.weaknessLevel,
        rootCause: editingRecord.rootCause,
        learningStyle: editingRecord.learningStyle,
        behavior: editingRecord.behavior,
        hiddenTalent: editingRecord.hiddenTalent,
        baselineStatus: editingRecord.baselineStatus,
        currentStatus: editingRecord.currentStatus,
        progressSignal: editingRecord.progressSignal,
        lastWeekProgressSignal: editingRecord.lastWeekProgressSignal || editingRecord.progressSignal || 'Yellow',
        strategyUsed: editingRecord.strategyUsed,
        teacherRemarks: editingRecord.teacherRemarks,
        goalTitle: editingRecord.shortTermGoal?.title || '',
        goalTargetDate: editingRecord.shortTermGoal?.targetDate ? editingRecord.shortTermGoal.targetDate.split('T')[0] : getTwoWeeksFromNow(),
        goalStatus: editingRecord.shortTermGoal?.status || 'In Progress',
        
        // Meeting Format
        readingBangla: editingRecord.readingWeaknesses?.bangla || 'None',
        readingEnglish: editingRecord.readingWeaknesses?.english || 'None',
        readingMath: editingRecord.readingWeaknesses?.math || 'None',
        writingBangla: editingRecord.writingWeaknesses?.bangla || 'None',
        writingEnglish: editingRecord.writingWeaknesses?.english || 'None',
        writingMath: editingRecord.writingWeaknesses?.math || 'None',
        reportingTeacher: editingRecord.reportingTeacher || '',
        parentPhone: editingRecord.parentPhone || '',
        
        // 1-Month Progress Tracker
        week1: editingRecord.weeklyProgress?.week1 || 'None',
        week2: editingRecord.weeklyProgress?.week2 || 'None',
        week3: editingRecord.weeklyProgress?.week3 || 'None',
        week4: editingRecord.weeklyProgress?.week4 || 'None',
        aiSuggestion: editingRecord.aiSuggestion || '',

        // New fields
        studentRoll: editingRecord.studentRoll || '',
        studentPhoto: editingRecord.studentPhoto || '',
        fatherName: editingRecord.fatherName || '',
        motherName: editingRecord.motherName || '',
        fatherPhoto: editingRecord.fatherPhoto || '',
        motherPhoto: editingRecord.motherPhoto || '',
      });
      setErrors({});
    } else {
      setFormData({
        ...initialFormState,
        goalTargetDate: getTwoWeeksFromNow()
      });
    }
  }, [editingRecord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'শিক্ষার্থীর নাম আবশ্যক';
    if (!formData.studentId.trim()) newErrors.studentId = 'রোল/আইডি নম্বর আবশ্যক';
    if (!formData.studentClass.trim()) newErrors.studentClass = 'শ্রেণী ও শাখা আবশ্যক';
    if (!formData.rootCause.trim()) newErrors.rootCause = 'দুর্বলতার মূল কারণ আবশ্যক';
    if (!formData.behavior.trim()) newErrors.behavior = 'আচরণগত পর্যবেক্ষণ আবশ্যক';
    if (!formData.baselineStatus.trim()) newErrors.baselineStatus = 'প্রাথমিক অবস্থা আবশ্যক';
    if (!formData.currentStatus.trim()) newErrors.currentStatus = 'বর্তমান অবস্থা আবশ্যক';
    if (!formData.strategyUsed.trim()) newErrors.strategyUsed = 'গৃহীত বিশেষ কৌশল বা উদ্যোগ আবশ্যক';
    if (!formData.reportingTeacher.trim()) newErrors.reportingTeacher = 'তথ্য প্রদানকারী শিক্ষকের নাম আবশ্যক';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const recordData = {
      studentName: formData.studentName,
      studentId: formData.studentId,
      studentClass: formData.studentClass,
      weaknessCategory: formData.weaknessCategory,
      weaknessLevel: formData.weaknessLevel,
      rootCause: formData.rootCause,
      learningStyle: formData.learningStyle,
      behavior: formData.behavior,
      hiddenTalent: formData.hiddenTalent,
      baselineStatus: formData.baselineStatus,
      currentStatus: formData.currentStatus,
      progressSignal: formData.progressSignal,
      lastWeekProgressSignal: formData.lastWeekProgressSignal,
      strategyUsed: formData.strategyUsed,
      teacherRemarks: formData.teacherRemarks,
      shortTermGoal: formData.goalTitle.trim() ? {
        title: formData.goalTitle.trim(),
        targetDate: new Date(formData.goalTargetDate).toISOString(),
        status: formData.goalStatus,
      } : undefined,
      
      // Meeting Format
      readingWeaknesses: {
        bangla: formData.readingBangla as any,
        english: formData.readingEnglish as any,
        math: formData.readingMath as any,
      },
      writingWeaknesses: {
        bangla: formData.writingBangla as any,
        english: formData.writingEnglish as any,
        math: formData.writingMath as any,
      },
      reportingTeacher: formData.reportingTeacher.trim(),
      parentPhone: formData.parentPhone.trim(),
      
      // 1-Month Progress Tracker
      weeklyProgress: {
        week1: formData.week1 as any,
        week2: formData.week2 as any,
        week3: formData.week3 as any,
        week4: formData.week4 as any,
      },
      aiSuggestion: formData.aiSuggestion.trim() || undefined,

      // New fields
      studentRoll: formData.studentRoll,
      studentPhoto: formData.studentPhoto,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      fatherPhoto: formData.fatherPhoto,
      motherPhoto: formData.motherPhoto,
    };

    onSubmit(editingRecord ? { ...recordData, id: editingRecord.id } : recordData);
    if (!editingRecord) {
      setFormData({
        ...initialFormState,
        goalTargetDate: getTwoWeeksFromNow()
      });
    }
  };

  return (
    <form id="student-entry-form" onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden transition-all duration-300">
      {/* Form Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${editingRecord ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' : 'bg-white/5 border-white/10 text-white'}`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${editingRecord ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}>
            <RefreshCw className={`w-5 h-5 ${editingRecord ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {editingRecord ? 'তথ্য সংশোধন / আপডেট করুন' : 'নতুন শিক্ষার্থীর মূল্যায়ন ও প্রগতি সংযোজন'}
            </h2>
            <p className="text-xs text-slate-400">সংগ্রামরত শিক্ষার্থীদের মূল্যায়নের জন্য সকল ক্ষেত্র সতর্কতার সাথে পূরণ করুন</p>
          </div>
        </div>
        {editingRecord && (
          <button 
            type="button" 
            onClick={onCancelEdit}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
            title="বাতিল করুন"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        
        {/* SECTION 1: Student General Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <User className="w-4 h-4 text-blue-400" />
            <span>১. স্মার্ট শিক্ষার্থী অনুসন্ধান ও সাধারণ তথ্য (Smart Lookup & General Info)</span>
          </div>

          {/* Quick PDF Data Search Lookup Card */}
          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3">
            <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              পিডিএফ ডাটাবেজ থেকে দ্রুত শিক্ষার্থী লোড করুন (Quick Search from PDF)
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              শ্রেণি নির্বাচন করে শিক্ষার্থীর রোল নম্বর দিলেই তার নামসহ ডাটা ও ছবি স্বয়ংক্রিয়ভাবে নিচে বসে যাবে।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">শ্রেণি নির্বাচন করুন</label>
                <select
                  value={searchClass}
                  onChange={(e) => setSearchClass(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-950 text-white"
                >
                  <option value="">-- শ্রেণি নির্বাচন করুন --</option>
                  {Object.keys(PRELOADED_STUDENTS).map(cls => (
                    <option key={cls} value={cls}>{cls} শ্রেণি</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">রোল নম্বর দিন (ইংরেজী বা বাংলায়)</label>
                <input
                  type="text"
                  placeholder="যেমন: ১ অথবা 1"
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-950 text-white"
                />
              </div>
            </div>

            {lookupMessage.text && (
              <div className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                lookupMessage.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                {lookupMessage.text}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="studentName" className="block text-xs font-semibold text-slate-300 mb-1">
                শিক্ষার্থীর নাম <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="যেমন: তানভীর রহমান"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.studentName ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.studentName && <p className="text-red-400 text-xs mt-1">{errors.studentName}</p>}
            </div>

            <div>
              <label htmlFor="studentId" className="block text-xs font-semibold text-slate-300 mb-1">
                রোল / আইডি নম্বর <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="যেমন: S-202601"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.studentId ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.studentId && <p className="text-red-400 text-xs mt-1">{errors.studentId}</p>}
            </div>

            <div>
              <label htmlFor="studentClass" className="block text-xs font-semibold text-slate-300 mb-1">
                শ্রেণী ও শাখা <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="studentClass"
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                placeholder="যেমন: ষষ্ঠ শ্রেণী (শাখা-ক)"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.studentClass ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.studentClass && <p className="text-red-400 text-xs mt-1">{errors.studentClass}</p>}
            </div>
          </div>

          {/* Student & Parents Profiles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Box A: Student Profile Picture */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 flex flex-col items-center justify-between space-y-3">
              <span className="text-xs font-bold text-slate-300 self-start flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-blue-400" />
                শিক্ষার্থীর ছবি (Student Photo)
              </span>
              
              <div className="relative w-24 h-24 rounded-xl border border-white/10 overflow-hidden bg-slate-950 flex items-center justify-center">
                {formData.studentPhoto ? (
                  <img src={formData.studentPhoto} alt="Student" className="w-full h-full object-cover" referrerpolicy="no-referrer" />
                ) : (
                  <User className="w-10 h-10 text-slate-600" />
                )}
              </div>

              <label className="w-full text-center py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 border border-white/5 transition cursor-pointer flex items-center justify-center gap-1">
                <Upload className="w-3 h-3" />
                ছবি আপলোড করুন
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'studentPhoto')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Box B: Father's Profile */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 space-y-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                পিতার তথ্য ও ছবি (Father's Info)
              </span>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">পিতার নাম</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="যেমন: মোঃ আবদুর রহমান"
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-white/10 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-950 text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-slate-950 flex items-center justify-center shrink-0">
                  {formData.fatherPhoto ? (
                    <img src={formData.fatherPhoto} alt="Father" className="w-full h-full object-cover" referrerpolicy="no-referrer" />
                  ) : (
                    <User className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <label className="flex-1 text-center py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[9px] font-bold text-slate-300 border border-white/5 transition cursor-pointer flex items-center justify-center gap-1">
                  <Upload className="w-2.5 h-2.5" />
                  পিতার ছবি আপলোড
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'fatherPhoto')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Box C: Mother's Profile */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 space-y-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                মাতার তথ্য ও ছবি (Mother's Info)
              </span>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">মাতার নাম</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="যেমন: মোসাঃ ফাতেমা বেগম"
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-white/10 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-slate-950 text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-slate-950 flex items-center justify-center shrink-0">
                  {formData.motherPhoto ? (
                    <img src={formData.motherPhoto} alt="Mother" className="w-full h-full object-cover" referrerpolicy="no-referrer" />
                  ) : (
                    <User className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <label className="flex-1 text-center py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[9px] font-bold text-slate-300 border border-white/5 transition cursor-pointer flex items-center justify-center gap-1">
                  <Upload className="w-2.5 h-2.5" />
                  মাতার ছবি আপলোড
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'motherPhoto')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: General Diagnostic Entry */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>২. সাধারণ ডায়াগনস্টিক তথ্য (Diagnostic Framework)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="weaknessCategory" className="block text-xs font-semibold text-slate-300 mb-1">
                প্রধান দুর্বলতার ক্ষেত্র
              </label>
              <select
                id="weaknessCategory"
                name="weaknessCategory"
                value={formData.weaknessCategory}
                onChange={handleChange}
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900 text-white"
              >
                {Object.entries(WeaknessCategoryLabels).map(([key, value]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="weaknessLevel" className="block text-xs font-semibold text-slate-300 mb-1">
                দুর্বলতার তীব্রতার মাত্রা
              </label>
              <select
                id="weaknessLevel"
                name="weaknessLevel"
                value={formData.weaknessLevel}
                onChange={handleChange}
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900 text-white"
              >
                {Object.entries(WeaknessLevelLabels).map(([key, value]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="learningStyle" className="block text-xs font-semibold text-slate-300 mb-1">
                শিক্ষণ বা শিখন পদ্ধতি (Learning Style)
              </label>
              <select
                id="learningStyle"
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900 text-white"
              >
                {Object.entries(LearningStyleLabels).map(([key, value]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="rootCause" className="block text-xs font-semibold text-slate-300 mb-1">
              দুর্বলতার মূল কারণ <span className="text-red-400">*</span>
            </label>
            <textarea
              id="rootCause"
              name="rootCause"
              rows={2}
              value={formData.rootCause}
              onChange={handleChange}
              placeholder="শিক্ষার্থীর এই নির্দিষ্ট দুর্বলতার পেছনের কারণ বা পূর্বপরিচয় উল্লেখ করুন..."
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.rootCause ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
            ></textarea>
            {errors.rootCause && <p className="text-red-400 text-xs mt-1">{errors.rootCause}</p>}
          </div>
        </div>

        {/* SECTION 3: Psychometric Mind Mapping */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>৩. মনস্তাত্ত্বিক ও আচরণগত পর্যবেক্ষণ (Psychometric Mapping)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="behavior" className="block text-xs font-semibold text-slate-300 mb-1">
                আচরণগত বৈশিষ্ট্য ও মনোভাব <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="behavior"
                name="behavior"
                value={formData.behavior}
                onChange={handleChange}
                placeholder="যেমন: ক্লাসে অমনোযোগী, শান্ত, অতিচঞ্চল বা ভীতিগ্রস্ত"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.behavior ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.behavior && <p className="text-red-400 text-xs mt-1">{errors.behavior}</p>}
            </div>

            <div>
              <label htmlFor="hiddenTalent" className="block text-xs font-semibold text-slate-300 mb-1">
                লুকানো প্রতিভা বা বিশেষ গুণ (যদি থাকে)
              </label>
              <input
                type="text"
                id="hiddenTalent"
                name="hiddenTalent"
                value={formData.hiddenTalent}
                onChange={handleChange}
                placeholder="যেমন: চিত্রাঙ্কন, সুবক্তা, ক্রীড়া বা সৃজনশীল চিন্তা"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900/50 text-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Monitoring, Competency Tracker & Intervention */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>৪. প্রগতি পর্যবেক্ষণ, যোগ্যতা ও হস্তক্ষেপ (Competency & Intervention)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="baselineStatus" className="block text-xs font-semibold text-slate-300 mb-1">
                প্রাথমিক অবস্থা (Baseline Status) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="baselineStatus"
                name="baselineStatus"
                value={formData.baselineStatus}
                onChange={handleChange}
                placeholder="হস্তক্ষেপ শুরুর পূর্বে শিক্ষার্থীর সক্ষমতা বা স্তর"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.baselineStatus ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.baselineStatus && <p className="text-red-400 text-xs mt-1">{errors.baselineStatus}</p>}
            </div>

            <div>
              <label htmlFor="currentStatus" className="block text-xs font-semibold text-slate-300 mb-1">
                বর্তমান অবস্থা (Current Status) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="currentStatus"
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                placeholder="সাম্প্রতিক পর্যবেক্ষণ অনুযায়ী বর্তমান স্তর"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.currentStatus ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.currentStatus && <p className="text-red-400 text-xs mt-1">{errors.currentStatus}</p>}
            </div>

            <div>
              <label htmlFor="lastWeekProgressSignal" className="block text-xs font-semibold text-slate-300 mb-1">
                গত সপ্তাহের প্রগতি সংকেত
              </label>
              <div className="grid grid-cols-3 gap-1.5 h-[42px] items-center">
                {(['Red', 'Yellow', 'Green'] as ProgressSignal[]).map((sig) => {
                  const data = ProgressSignalLabels[sig];
                  const isSelected = formData.lastWeekProgressSignal === sig;
                  return (
                    <button
                      key={`last-${sig}`}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, lastWeekProgressSignal: sig }))}
                      className={`flex items-center justify-center gap-1 h-full rounded-lg text-[10px] border font-medium transition cursor-pointer ${
                        isSelected 
                          ? `${data.bgClass} border-white/20 ring-2 ring-amber-500/40 text-white` 
                          : 'bg-slate-900/40 border-white/10 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>{data.emoji}</span>
                      <span>
                        {sig === 'Red' ? 'ধীর' : sig === 'Yellow' ? 'মাঝারি' : 'সন্তোষ'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="progressSignal" className="block text-xs font-semibold text-slate-300 mb-1">
                বর্তমান সপ্তাহের প্রগতি সংকেত
              </label>
              <div className="grid grid-cols-3 gap-1.5 h-[42px] items-center">
                {(['Red', 'Yellow', 'Green'] as ProgressSignal[]).map((sig) => {
                  const data = ProgressSignalLabels[sig];
                  const isSelected = formData.progressSignal === sig;
                  return (
                    <button
                      key={`curr-${sig}`}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, progressSignal: sig }))}
                      className={`flex items-center justify-center gap-1 h-full rounded-lg text-[10px] border font-medium transition cursor-pointer ${
                        isSelected 
                          ? `${data.bgClass} border-white/20 ring-2 ring-blue-500/40 text-white` 
                          : 'bg-slate-900/40 border-white/10 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>{data.emoji}</span>
                      <span>
                        {sig === 'Red' ? 'ধীর' : sig === 'Yellow' ? 'মাঝারি' : 'সন্তোষ'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="strategyUsed" className="block text-xs font-semibold text-slate-300 mb-1">
                গৃহীত বিশেষ কৌশল বা উদ্যোগ (Intervention Strategy) <span className="text-red-400">*</span>
              </label>
              <textarea
                id="strategyUsed"
                name="strategyUsed"
                rows={2}
                value={formData.strategyUsed}
                onChange={handleChange}
                placeholder="শিক্ষার্থীর উন্নতির জন্য আপনি শ্রেণীকক্ষে বা বাইরে কী কৌশল অবলম্বন করছেন..."
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.strategyUsed ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              ></textarea>
              {errors.strategyUsed && <p className="text-red-400 text-xs mt-1">{errors.strategyUsed}</p>}
            </div>

            <div>
              <label htmlFor="teacherRemarks" className="block text-xs font-semibold text-slate-300 mb-1">
                শিক্ষকের মন্তব্য ও ভবিষ্যৎ পরিকল্পনা (Teacher Remarks)
              </label>
              <textarea
                id="teacherRemarks"
                name="teacherRemarks"
                rows={2}
                value={formData.teacherRemarks}
                onChange={handleChange}
                placeholder="শিক্ষার্থীর ভবিষ্যৎ প্রগতি সম্পর্কে আপনার মতামত বা পরবর্তী পদক্ষেপ..."
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900/50 text-white"
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 5: Two-Week Short Term Goal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <Target className="w-4 h-4 text-rose-400" />
            <span>৫. ২ সপ্তাহের লক্ষ্য ও প্রগতি ট্র্যাকার (Short-Term Target Goal)</span>
          </div>
          <p className="text-xs text-slate-400">
            শিক্ষার্থী বা শিক্ষকের যৌথ উদ্যোগে আগামী ২ সপ্তাহের জন্য একটি নির্দিষ্ট, পরিমাপযোগ্য লক্ষ্য (Goal) নির্ধারণ করুন।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="goalTitle" className="block text-xs font-semibold text-slate-300 mb-1">
                নির্দিষ্ট লক্ষ্য / Goal <span className="text-slate-500">(যেমন: "প্রতিদিন ২টি বাংলা অনুচ্ছেদ বানান ছাড়া রিডিং পড়া")</span>
              </label>
              <input
                type="text"
                id="goalTitle"
                name="goalTitle"
                value={formData.goalTitle}
                onChange={handleChange}
                placeholder="যেমন: প্রতিদিন ১ পৃষ্ঠা হাতের লেখা এবং ৪টি ইংরেজি শব্দের অর্থ মুখস্থ করা"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900/50 text-white"
              />
            </div>

            <div>
              <label htmlFor="goalTargetDate" className="block text-xs font-semibold text-slate-300 mb-1">
                লক্ষ্য পূরণের শেষ সময় (Target Date)
              </label>
              <input
                type="date"
                id="goalTargetDate"
                name="goalTargetDate"
                value={formData.goalTargetDate}
                onChange={handleChange}
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900/50 text-white"
              />
            </div>
          </div>

          {formData.goalTitle.trim() && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                লক্ষ্যের বর্তমান অবস্থা (Goal Status)
              </label>
              <div className="grid grid-cols-3 gap-1.5 h-[42px] items-center max-w-md">
                {[
                  { value: 'In Progress', label: 'চলমান (In Progress)', emoji: '🎯', color: 'blue' },
                  { value: 'Achieved', label: 'অর্জিত (Achieved)', emoji: '🏆', color: 'emerald' },
                  { value: 'Needs Improvement', label: 'উন্নতি প্রয়োজন', emoji: '⚠️', color: 'rose' }
                ].map((item) => {
                  const isSelected = formData.goalStatus === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, goalStatus: item.value as any }))}
                      className={`flex items-center justify-center gap-1 h-full rounded-lg text-[10px] border font-bold transition cursor-pointer ${
                        isSelected 
                          ? item.value === 'Achieved' ? 'bg-emerald-600 border-emerald-500 text-white ring-2 ring-emerald-500/40'
                            : item.value === 'Needs Improvement' ? 'bg-rose-600 border-rose-500 text-white ring-2 ring-rose-500/40'
                            : 'bg-blue-600 border-blue-500 text-white ring-2 ring-blue-500/40'
                          : 'bg-slate-900/40 border-white/10 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: Subject-specific Weakness Matrix & Responsible Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>৬. পড়া ও লেখার বিষয়ভিত্তিক দুর্বলতা ম্যাট্রিক্স (Meeting Diagnostic Format)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 p-5 rounded-xl border border-white/5">
            {/* Reading Weakness */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                পড়ার ক্ষেত্রে দুর্বলতা (Reading Weaknesses)
              </h4>
              
              <div className="space-y-2">
                <div>
                  <label htmlFor="readingBangla" className="block text-[11px] text-slate-300 mb-1">
                    বাংলা রিডিং (Bangla Reading)
                  </label>
                  <select
                    id="readingBangla"
                    name="readingBangla"
                    value={formData.readingBangla}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - একটু যত্নে কাটিয়ে ওঠা সম্ভব)</option>
                    <option value="Moderate">মাঝারি (Moderate - রেমিডিয়াল ক্লাস প্রয়োজন)</option>
                    <option value="Severe">তীব্র (Severe - ওয়ান-টু-ওয়ান গাইডেন্স প্রয়োজন)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="readingEnglish" className="block text-[11px] text-slate-300 mb-1">
                    ইংরেজি রিডিং (English Reading)
                  </label>
                  <select
                    id="readingEnglish"
                    name="readingEnglish"
                    value={formData.readingEnglish}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - একটু যত্নে কাটিয়ে ওঠা সম্ভব)</option>
                    <option value="Moderate">মাঝারি (Moderate - রেমিডিয়াল ক্লাস প্রয়োজন)</option>
                    <option value="Severe">তীব্র (Severe - ওয়ান-টু-ওয়ান গাইডেন্স প্রয়োজন)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="readingMath" className="block text-[11px] text-slate-300 mb-1">
                    গাণিতিক দুর্বলতা (Math Reading / Concepts)
                  </label>
                  <select
                    id="readingMath"
                    name="readingMath"
                    value={formData.readingMath}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - একটু যত্নে কাটিয়ে ওঠা সম্ভব)</option>
                    <option value="Moderate">মাঝারি (Moderate - রেমিডিয়াল ক্লাস প্রয়োজন)</option>
                    <option value="Severe">তীব্র (Severe - ওয়ান-টু-ওয়ান গাইডেন্স প্রয়োজন)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Writing Weakness */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
                <PenTool className="w-3.5 h-3.5" />
                লেখার ক্ষেত্রে দুর্বলতা (Writing Weaknesses)
              </h4>
              
              <div className="space-y-2">
                <div>
                  <label htmlFor="writingBangla" className="block text-[11px] text-slate-300 mb-1">
                    বাংলা লিখন (Bangla Writing)
                  </label>
                  <select
                    id="writingBangla"
                    name="writingBangla"
                    value={formData.writingBangla}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - হাতের লেখা বা বানানে সামান্য ভুল)</option>
                    <option value="Moderate">মাঝারি (Moderate - গুছিয়ে লিখতে না পারা)</option>
                    <option value="Severe">তীব্র (Severe - মৌলিক বানানেও অনেক ভুল)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="writingEnglish" className="block text-[11px] text-slate-300 mb-1">
                    ইংরেজি লিখন (English Writing)
                  </label>
                  <select
                    id="writingEnglish"
                    name="writingEnglish"
                    value={formData.writingEnglish}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - হাতের লেখা বা বানানে সামান্য ভুল)</option>
                    <option value="Moderate">মাঝারি (Moderate - গুছিয়ে লিখতে না পারা)</option>
                    <option value="Severe">তীব্র (Severe - মৌলিক বানানেও অনেক ভুল)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="writingMath" className="block text-[11px] text-slate-300 mb-1">
                    গণিত সমাধান ও গণনা লিখন (Math Writing)
                  </label>
                  <select
                    id="writingMath"
                    name="writingMath"
                    value={formData.writingMath}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-white/10 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="None">কোনো সমস্যা নেই (None)</option>
                    <option value="Mild">সাধারণ (Mild - গণিত সমাধানে সামান্য জড়তা)</option>
                    <option value="Moderate">মাঝারি (Moderate - যোগ-বিয়োগের মৌলিক সমস্যা)</option>
                    <option value="Severe">তীব্র (Severe - সংখ্যা চিনতে বা সাজাতে সম্পূর্ণ ব্যর্থ)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Responsible Team */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/20 p-4 rounded-xl border border-white/5">
            <div>
              <label htmlFor="reportingTeacher" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                তথ্য প্রদানকারী শিক্ষকের নাম <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="reportingTeacher"
                name="reportingTeacher"
                value={formData.reportingTeacher}
                onChange={handleChange}
                placeholder="যেমন: জনাব আশরাফুল হক"
                className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition ${errors.reportingTeacher ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-slate-900/60 text-white' : 'border-white/15 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-900/50 text-white'}`}
              />
              {errors.reportingTeacher && <p className="text-red-400 text-xs mt-1">{errors.reportingTeacher}</p>}
            </div>

            <div>
              <label htmlFor="parentPhone" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                অভিভাবকের মোবাইল নম্বর (ঐচ্ছিক)
              </label>
              <input
                type="text"
                id="parentPhone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                placeholder="যেমন: 01712345678"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-slate-900/50 text-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 7: Monthly Progress Evaluation & AI suggestions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/10 text-slate-200 font-semibold text-sm">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>৭. আগামী ১ মাসের সাপ্তাহিক মূল্যায়ন ও এআই প্রগতি পরিকল্পনা</span>
          </div>

          <p className="text-xs text-slate-400">
            আগামী ৪ সপ্তাহের জন্য শিক্ষার্থীর উন্নতি ও পরিস্থিতি ট্র্যাকিং করুন। সাপ্তাহিক ফলাফল সাপেক্ষে AI থেকে বিশেষ পেডাগজিক্যাল পরামর্শ নিন।
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'week1', label: '১ম সপ্তাহ (Week 1)' },
              { id: 'week2', label: '২য় সপ্তাহ (Week 2)' },
              { id: 'week3', label: '৩য় সপ্তাহ (Week 3)' },
              { id: 'week4', label: '৪র্থ সপ্তাহ (Week 4)' }
            ].map((week) => (
              <div key={week.id} className="bg-slate-950/30 p-3 rounded-lg border border-white/5 space-y-1">
                <label htmlFor={week.id} className="block text-[11px] font-semibold text-slate-300">
                  {week.label}
                </label>
                <select
                  id={week.id}
                  name={week.id}
                  value={(formData as any)[week.id]}
                  onChange={handleChange}
                  className="w-full text-xs px-2 py-1.5 rounded bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="None">কোনো প্রগতি রেকর্ড নেই</option>
                  <option value="Red">🔴 কোনো উন্নতি নেই (Red)</option>
                  <option value="Yellow">🟡 ধীরে ধীরে প্রগতি হচ্ছে (Yellow)</option>
                  <option value="Green">🟢 সন্তোষজনক / লক্ষ্য অর্জিত (Green)</option>
                </select>
              </div>
            ))}
          </div>

          {/* AI Pedagogical Suggestion Panel */}
          <div className="bg-slate-950/50 border border-white/10 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    এআই পেডাগজিক্যাল পরামর্শ ও কর্মপরিকল্পনা
                  </h4>
                  <p className="text-xs text-slate-400">শিক্ষার্থীর দুর্বলতা ও সাপ্তাহিক প্রগতি বিশ্লেষণ করে কাস্টমাইজড ১ মাসের একশন প্ল্যান</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleGenerateAISuggestion}
                disabled={isGeneratingAI || !formData.studentName.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                  isGeneratingAI 
                    ? 'bg-indigo-600/50 cursor-not-allowed text-slate-300' 
                    : !formData.studentName.trim()
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95'
                }`}
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>এআই বিশ্লেষণ করছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>এআই পরামর্শ জেনারেট করুন</span>
                  </>
                )}
              </button>
            </div>

            {formData.aiSuggestion ? (
              <div className="space-y-2">
                <label htmlFor="aiSuggestion" className="block text-xs font-semibold text-indigo-300">
                  নির্ধারিত শিক্ষণ পরামর্শ ও ১ মাসের অ্যাকশন প্ল্যান (সম্পাদনাযোগ্য):
                </label>
                <textarea
                  id="aiSuggestion"
                  name="aiSuggestion"
                  rows={8}
                  value={formData.aiSuggestion}
                  onChange={handleChange}
                  placeholder="এআই পরামর্শ এখানে জেনারেট হবে এবং আপনি প্রয়োজনে কাস্টমাইজ করতে পারবেন..."
                  className="w-full text-xs p-3.5 rounded-lg border border-indigo-500/20 bg-slate-900/90 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed shadow-inner"
                ></textarea>
                <p className="text-[10px] text-slate-500 text-right">💡 আপনি এআই পরামর্শ সংশোধন বা আপনার মন্তব্য ম্যানুয়ালি যুক্ত করতে পারেন।</p>
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-white/5 rounded-lg bg-slate-900/20">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  {formData.studentName.trim() 
                    ? "উপরে শিক্ষার্থীর পড়ার/লেখার দুর্বলতা পূরণ করে 'এআই পরামর্শ জেনারেট করুন' বোতামে চাপুন।" 
                    : "দয়া করে প্রথমে শিক্ষার্থীর নাম লিখুন।"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          {editingRecord && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg transition cursor-pointer"
            >
              সংশোধন বাতিল করুন
            </button>
          )}
          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
              editingRecord 
                ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/20' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/25'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{editingRecord ? 'আপডেট সংরক্ষণ করুন' : 'তালিকায় শিক্ষার্থী যুক্ত করুন'}</span>
          </button>
        </div>

      </div>
    </form>
  );
}
