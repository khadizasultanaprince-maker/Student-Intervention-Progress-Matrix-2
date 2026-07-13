/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  StudentRecord, 
  WeaknessCategoryLabels, 
  WeaknessLevelLabels, 
  LearningStyleLabels, 
  ProgressSignalLabels 
} from '../types';
import { Trash2, Edit, Search, Filter, RefreshCw, Layers, Mail, Sparkles } from 'lucide-react';
import ParentMessageDraftModal from './ParentMessageDraftModal';

interface StudentTableRowProps {
  key?: string;
  record: StudentRecord;
  onEdit: (record: StudentRecord) => void;
  onDelete: (id: string) => void;
  onSelectMessage: (record: any) => void;
  getLevelBadgeClass: (level: string) => string;
  getStyleBadgeClass: (style: string) => string;
  onUpdateGoalStatus?: (id: string, status: 'In Progress' | 'Achieved' | 'Needs Improvement') => void;
}

function StudentTableRow({
  record,
  onEdit,
  onDelete,
  onSelectMessage,
  getLevelBadgeClass,
  getStyleBadgeClass,
  onUpdateGoalStatus
}: StudentTableRowProps) {
  const [pulseColor, setPulseColor] = useState<'Green' | 'Yellow' | 'Red' | null>(null);
  const prevSignalRef = useRef(record.progressSignal);

  useEffect(() => {
    if (prevSignalRef.current !== record.progressSignal) {
      setPulseColor(record.progressSignal);
      prevSignalRef.current = record.progressSignal;
      
      // Keep pulsing for 6 seconds (enough time for the user to see the transition)
      const timer = setTimeout(() => {
        setPulseColor(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [record.progressSignal]);

  const signal = ProgressSignalLabels[record.progressSignal];
  
  // Choose the row background styling based on whether it is pulsing or not
  let rowClass = "hover:bg-white/5 transition duration-150 relative ";
  if (pulseColor === 'Green') {
    rowClass += "animate-row-pulse-Green border-l-4 border-l-emerald-500";
  } else if (pulseColor === 'Yellow') {
    rowClass += "animate-row-pulse-Yellow border-l-4 border-l-amber-500";
  } else if (pulseColor === 'Red') {
    rowClass += "animate-row-pulse-Red border-l-4 border-l-rose-500";
  }

  return (
    <tr key={record.id} className={rowClass}>
      {/* Column 1: Info */}
      <td className="py-3.5 px-4 align-top">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="font-bold text-white text-sm">{record.studentName}</div>
            {pulseColor && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1 py-0.2 rounded bg-indigo-500 text-white animate-bounce">
                <Sparkles className="w-2.5 h-2.5" />
                <span>আপডেট</span>
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded inline-block font-mono">
            ID: {record.studentId}
          </div>
          <div className="text-xs text-slate-400 block pt-0.5">
            {record.studentClass}
          </div>
        </div>
      </td>

      {/* Column 2: Diagnostic */}
      <td className="py-3.5 px-4 align-top">
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] font-semibold border px-1.5 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border-teal-500/20">
              {WeaknessCategoryLabels[record.weaknessCategory]}
            </span>
            <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded-md ${getLevelBadgeClass(record.weaknessLevel)}`}>
              {WeaknessLevelLabels[record.weaknessLevel]}
            </span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">দুর্বলতার কারণ:</span>
            {record.rootCause}
          </div>
        </div>
      </td>

      {/* Column 3: Mind Mapping */}
      <td className="py-3.5 px-4 align-top">
        <div className="space-y-2">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">শিখন শৈলী:</span>
            <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded ${getStyleBadgeClass(record.learningStyle)}`}>
              {LearningStyleLabels[record.learningStyle]}
            </span>
          </div>
          <div className="text-xs text-slate-300">
            <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">আচরণগত বৈশিষ্ট্য:</span>
            {record.behavior}
          </div>
          {record.hiddenTalent && (
            <div className="text-xs text-teal-300">
              <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">বিশেষ প্রতিভা:</span>
              ✨ {record.hiddenTalent}
            </div>
          )}
        </div>
      </td>

      {/* Column 4: Monitoring */}
      <td className="py-3.5 px-4 align-top">
        <div className="space-y-2">
          <div className="text-xs">
            <span className="font-semibold text-rose-300 block text-[11px] mb-0.5">প্রাথমিক সক্ষমতা (Baseline):</span>
            <span className="text-slate-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded block">
              {record.baselineStatus}
            </span>
          </div>
          <div className="text-xs">
            <span className="font-semibold text-emerald-300 block text-[11px] mb-0.5">বর্তমান সক্ষমতা (Current):</span>
            <span className="text-slate-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded block">
              {record.currentStatus}
            </span>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block text-[11px] mb-1">প্রগতি ও প্রবৃদ্ধি সংকেত:</span>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 border rounded-full text-white transition-all duration-300 ${
              pulseColor ? 'scale-110 ring-4 ring-indigo-500/20' : ''
            } ${
              record.progressSignal === 'Green' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300 shadow-md shadow-emerald-950/50' :
              record.progressSignal === 'Yellow' ? 'bg-amber-950/80 border-amber-500/30 text-amber-300 shadow-md shadow-amber-950/50' :
              'bg-rose-950/80 border-rose-500/30 text-rose-300 shadow-md shadow-rose-950/50'
            }`}>
              <span className={pulseColor ? 'animate-ping' : ''}>{signal.emoji}</span>
              <span>{signal.label}</span>
            </span>
          </div>
        </div>
      </td>

      {/* Column 5: Intervention & Remarks */}
      <td className="py-3.5 px-4 align-top">
        <div className="space-y-2 text-xs leading-relaxed">
          <div>
            <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">গৃহীত বিশেষ কৌশল:</span>
            <p className="text-slate-300 bg-slate-950/40 px-2 py-1 rounded border border-white/5">{record.strategyUsed}</p>
          </div>
          {record.teacherRemarks && (
            <div>
              <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">শিক্ষকের মন্তব্য:</span>
              <p className="text-slate-400 italic">“{record.teacherRemarks}”</p>
            </div>
          )}

          {record.shortTermGoal && (() => {
            const goal = record.shortTermGoal;
            const target = new Date(goal.targetDate);
            const today = new Date();
            target.setHours(0,0,0,0);
            today.setHours(0,0,0,0);
            const diffTime = target.getTime() - today.getTime();
            const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const isExpired = daysRemaining < 0;

            const toBengaliNumber = (num: number) => {
              const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
              return Math.abs(num).toString().split('').map(digit => {
                const parsed = parseInt(digit);
                return isNaN(parsed) ? digit : bnNums[parsed];
              }).join('');
            };

            return (
              <div className="pt-2 border-t border-white/10 mt-2 space-y-1.5">
                <span className="font-semibold text-rose-400 block text-[11px]">🎯 ২ সপ্তাহের লক্ষ্য (Short-term Goal):</span>
                <div className="bg-slate-950/60 p-2 rounded border border-white/5 space-y-1 text-[11px]">
                  <p className="text-white font-medium">{goal.title}</p>
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400">
                    <span>শেষ তারিখ: {new Date(goal.targetDate).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span>
                      {isExpired ? (
                        <span className="text-rose-400 font-bold bg-rose-500/10 px-1 py-0.2 rounded animate-pulse">⏰ সময় অতিক্রান্ত!</span>
                      ) : (
                        <span className="text-slate-300">⏳ আর {toBengaliNumber(daysRemaining)} দিন বাকি</span>
                      )}
                    </span>
                  </div>
                  
                  {/* Status indicator and Quick Update Selector */}
                  <div className="pt-1.5 border-t border-white/5 mt-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] text-slate-400">অবস্থা:</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        goal.status === 'Achieved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        goal.status === 'Needs Improvement' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {goal.status === 'Achieved' ? '🏆 অর্জিত' :
                         goal.status === 'Needs Improvement' ? '⚠️ উন্নয়ন প্রয়োজন' : '🎯 চলমান'}
                      </span>
                    </div>

                    {/* Show explicit status update option automatically if expired */}
                    {isExpired && (
                      <div className="space-y-1 mt-1 bg-amber-500/5 p-1.5 rounded border border-amber-500/20">
                        <p className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                          <span>⚡</span>
                          <span>লক্ষ্য অর্জিত হয়েছে কি? প্রগতি আপডেট করুন:</span>
                        </p>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => onUpdateGoalStatus?.(record.id, 'Achieved')}
                            className="flex-1 text-[9px] font-bold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white px-1.5 py-1 rounded transition cursor-pointer"
                          >
                            🏆 অর্জিত
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateGoalStatus?.(record.id, 'Needs Improvement')}
                            className="flex-1 text-[9px] font-bold bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white px-1.5 py-1 rounded transition cursor-pointer"
                          >
                            ⚠️ উন্নয়ন প্রয়োজন
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateGoalStatus?.(record.id, 'In Progress')}
                            className="text-[9px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-1.5 py-1 rounded transition cursor-pointer"
                          >
                            🎯 চলমান
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Manual always-available select dropdown for status update */}
                    {!isExpired && (
                      <div className="flex items-center justify-between gap-1.5 pt-0.5">
                        <span className="text-[9px] text-slate-500">আপডেট করুন:</span>
                        <select
                          value={goal.status}
                          onChange={(e) => onUpdateGoalStatus?.(record.id, e.target.value as any)}
                          className="text-[9px] px-1 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="In Progress">🎯 চলমান</option>
                          <option value="Achieved">🏆 অর্জিত</option>
                          <option value="Needs Improvement">⚠️ উন্নয়ন প্রয়োজন</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </td>

      {/* Column 6: Actions */}
      <td className="py-3.5 px-4 align-middle text-center no-print">
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => onSelectMessage(record)}
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition cursor-pointer"
            title="অভিভাবক বার্তা (SMS/Email) তৈরি করুন"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(record)}
            className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition cursor-pointer"
            title="정보 সংশোধন করুন"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`আপনি কি নিশ্চিতভাবে ${record.studentName}-এর তথ্য ডিলিট করতে চান?`)) {
                onDelete(record.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
            title="ডিলিট করুন"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface StudentTableProps {
  records: StudentRecord[];
  onDelete: (id: string) => void;
  onEdit: (record: StudentRecord) => void;
  onUpdateGoalStatus?: (id: string, status: 'In Progress' | 'Achieved' | 'Needs Improvement') => void;
}

export default function StudentTable({ records, onDelete, onEdit, onUpdateGoalStatus }: StudentTableProps) {
  const [selectedMessageRecord, setSelectedMessageRecord] = useState<StudentRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [signalFilter, setSignalFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [styleFilter, setStyleFilter] = useState<string>('All');


  // Extract unique classes for filtering
  const classes = Array.from(new Set(records.map(r => r.studentClass)));

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentClass.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || record.weaknessCategory === categoryFilter;
    const matchesClass = classFilter === 'All' || record.studentClass === classFilter;
    const matchesSignal = signalFilter === 'All' || record.progressSignal === signalFilter;
    const matchesLevel = levelFilter === 'All' || record.weaknessLevel === levelFilter;
    const matchesStyle = styleFilter === 'All' || record.learningStyle === styleFilter;

    return matchesSearch && matchesCategory && matchesClass && matchesSignal && matchesLevel && matchesStyle;
  });

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Mild':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
      case 'Moderate':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'Severe':
        return 'bg-red-500/10 text-red-300 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
    }
  };

  const getStyleBadgeClass = (style: string) => {
    switch (style) {
      case 'Visual':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/20';
      case 'Auditory':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
      case 'Kinesthetic':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
    }
  };

  const hasActiveFilters = searchTerm || categoryFilter !== 'All' || classFilter !== 'All' || signalFilter !== 'All' || levelFilter !== 'All' || styleFilter !== 'All';

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setClassFilter('All');
    setSignalFilter('All');
    setLevelFilter('All');
    setStyleFilter('All');
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden space-y-4">
      <style>{`
        @keyframes pulseGreenRow {
          0%, 100% { background-color: rgba(16, 185, 129, 0.02); }
          50% { background-color: rgba(16, 185, 129, 0.12); }
        }
        @keyframes pulseYellowRow {
          0%, 100% { background-color: rgba(245, 158, 11, 0.02); }
          50% { background-color: rgba(245, 158, 11, 0.12); }
        }
        @keyframes pulseRedRow {
          0%, 100% { background-color: rgba(239, 68, 68, 0.02); }
          50% { background-color: rgba(239, 68, 68, 0.12); }
        }
        .animate-row-pulse-Green {
          animation: pulseGreenRow 1.4s ease-in-out infinite;
        }
        .animate-row-pulse-Yellow {
          animation: pulseYellowRow 1.4s ease-in-out infinite;
        }
        .animate-row-pulse-Red {
          animation: pulseRedRow 1.4s ease-in-out infinite;
        }
      `}</style>
      {/* Search and Filters Header */}
      <div className="p-6 border-b border-white/10 no-print space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>নিবন্ধিত শিক্ষার্থীদের পর্যবেক্ষণ তালিকা ({filteredRecords.length} জন)</span>
            </h3>
            <p className="text-xs text-slate-400">শিক্ষার্থীদের তথ্য অনুসন্ধান, প্রগতি ও ধরন অনুযায়ী ফিল্টার করুন</p>
          </div>
          
          {hasActiveFilters && (
            <button 
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition cursor-pointer self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>সব ফিল্টার রিসেট</span>
            </button>
          )}
        </div>

        {/* Filters Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 pt-2">
          {/* 1. Search Box */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Search className="w-3 h-3 text-blue-400" /> শিক্ষার্থী খুঁজুন
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="নাম বা আইডি লিখুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8.5 pr-3 py-2 text-xs rounded-xl border border-white/15 bg-slate-950/40 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80 transition"
              />
            </div>
          </div>

          {/* 2. Class Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> শ্রেণী ফিল্টার
            </label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full text-xs py-2 pl-2 pr-6 rounded-xl border border-white/15 bg-slate-950/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80"
            >
              <option value="All" className="bg-slate-950 text-white">সকল শ্রেণী (All)</option>
              {classes.map(cls => (
                <option key={cls} value={cls} className="bg-slate-950 text-white">{cls}</option>
              ))}
            </select>
          </div>

          {/* 3. Category Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> দুর্বলতার ধরন
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full text-xs py-2 pl-2 pr-6 rounded-xl border border-white/15 bg-slate-950/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80"
            >
              <option value="All" className="bg-slate-950 text-white">সকল দুর্বলতা (All)</option>
              {Object.entries(WeaknessCategoryLabels).map(([key, label]) => (
                <option key={key} value={key} className="bg-slate-950 text-white">{label}</option>
              ))}
            </select>
          </div>

          {/* 4. Severity Level Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> তীব্রতার স্তর
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full text-xs py-2 pl-2 pr-6 rounded-xl border border-white/15 bg-slate-950/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80"
            >
              <option value="All" className="bg-slate-950 text-white">সকল স্তর (All)</option>
              {Object.entries(WeaknessLevelLabels).map(([key, label]) => (
                <option key={key} value={key} className="bg-slate-950 text-white">{label}</option>
              ))}
            </select>
          </div>

          {/* 5. Progress Signal Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> প্রগতি সংকেত
            </label>
            <select
              value={signalFilter}
              onChange={(e) => setSignalFilter(e.target.value)}
              className="w-full text-xs py-2 pl-2 pr-6 rounded-xl border border-white/15 bg-slate-950/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80"
            >
              <option value="All" className="bg-slate-950 text-white">সকল সংকেত (All)</option>
              <option value="Green" className="bg-slate-950 text-green-400">🟢 সন্তোষজনক / দ্রুত প্রগতি</option>
              <option value="Yellow" className="bg-slate-950 text-amber-400">🟡 উন্নতিশীল / মাঝারি প্রগতি</option>
              <option value="Red" className="bg-slate-950 text-red-400">🔴 উদ্বেগজনক / ধীর প্রগতি</option>
            </select>
          </div>

          {/* 6. Learning Style Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" /> শিখন শৈলী (Style)
            </label>
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="w-full text-xs py-2 pl-2 pr-6 rounded-xl border border-white/15 bg-slate-950/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/80"
            >
              <option value="All" className="bg-slate-950 text-white">সকল শৈলী (All)</option>
              {Object.entries(LearningStyleLabels).map(([key, label]) => (
                <option key={key} value={key} className="bg-slate-950 text-white">{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Table Responsive Container */}
      <div className="overflow-x-auto">
        {filteredRecords.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">কোনো তথ্য পাওয়া যায়নি</p>
            <p className="text-xs">অনুগ্রহ করে নতুন তথ্য যোগ করুন বা ফিল্টার পরিবর্তন করুন।</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-white/5 border-y border-white/10 text-slate-200">
                {/* ID/Name/Class */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 w-[14%]">শিক্ষার্থীর তথ্য</th>
                
                {/* Diagnostics */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 w-[18%]">সাধারণ ডায়াগনস্টিক</th>
                
                {/* Psychometric mapping */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 w-[18%]">মনস্তাত্ত্বিক ও আচরণ</th>
                
                {/* Monitoring & Competency Tracker */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 w-[20%]">প্রগতি ও পর্যবেক্ষণ ম্যাট্রিক্স</th>
                
                {/* Intervention & Remarks */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 w-[20%]">विशेष হস্তক্ষেপ কৌশল ও মন্তব্য</th>
                
                {/* Action column - hidden during printing */}
                <th className="py-3 px-4 font-bold text-xs text-slate-200 text-center w-[10%] no-print">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRecords.map((record) => (
                <StudentTableRow 
                  key={record.id}
                  record={record}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onSelectMessage={setSelectedMessageRecord}
                  getLevelBadgeClass={getLevelBadgeClass}
                  getStyleBadgeClass={getStyleBadgeClass}
                  onUpdateGoalStatus={onUpdateGoalStatus}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedMessageRecord && (
        <ParentMessageDraftModal
          record={selectedMessageRecord}
          onClose={() => setSelectedMessageRecord(null)}
        />
      )}
    </div>
  );
}
