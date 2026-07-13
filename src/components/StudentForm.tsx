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
import { User, ShieldAlert, Brain, FileSpreadsheet, Send, RefreshCw, X } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (record: Omit<StudentRecord, 'id' | 'createdAt'> & { id?: string }) => void;
  editingRecord: StudentRecord | null;
  onCancelEdit: () => void;
}

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
  strategyUsed: '',
  teacherRemarks: '',
};

export default function StudentForm({ onSubmit, editingRecord, onCancelEdit }: StudentFormProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        strategyUsed: editingRecord.strategyUsed,
        teacherRemarks: editingRecord.teacherRemarks,
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(editingRecord ? { ...formData, id: editingRecord.id } : formData);
    if (!editingRecord) {
      setFormData(initialFormState);
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
            <span>১. শিক্ষার্থীর সাধারণ তথ্য (Student Identification)</span>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label htmlFor="progressSignal" className="block text-xs font-semibold text-slate-300 mb-1">
                প্রগতি সংকেত (Progress Signal)
              </label>
              <div className="grid grid-cols-3 gap-1.5 h-[42px] items-center">
                {(['Red', 'Yellow', 'Green'] as ProgressSignal[]).map((sig) => {
                  const data = ProgressSignalLabels[sig];
                  const isSelected = formData.progressSignal === sig;
                  return (
                    <button
                      key={sig}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, progressSignal: sig }))}
                      className={`flex items-center justify-center gap-1.5 h-full rounded-lg text-xs border font-medium transition cursor-pointer ${
                        isSelected 
                          ? `${data.bgClass} border-white/20 ring-2 ring-blue-500/40 text-white` 
                          : 'bg-slate-900/40 border-white/10 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span>{data.emoji}</span>
                      <span>
                        {sig === 'Red' ? 'ধীর' : sig === 'Yellow' ? 'মাঝারি' : 'সন্তোষজনক'}
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
