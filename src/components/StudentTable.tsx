/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  StudentRecord, 
  WeaknessCategoryLabels, 
  WeaknessLevelLabels, 
  LearningStyleLabels, 
  ProgressSignalLabels 
} from '../types';
import { Trash2, Edit, Search, Filter, RefreshCw, Layers } from 'lucide-react';

interface StudentTableProps {
  records: StudentRecord[];
  onDelete: (id: string) => void;
  onEdit: (record: StudentRecord) => void;
}

export default function StudentTable({ records, onDelete, onEdit }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');

  // Extract unique classes for filtering
  const classes = Array.from(new Set(records.map(r => r.studentClass)));

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentClass.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || record.weaknessCategory === categoryFilter;
    const matchesClass = classFilter === 'All' || record.studentClass === classFilter;

    return matchesSearch && matchesCategory && matchesClass;
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

  return (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden space-y-4">
      {/* Search and Filters Header */}
      <div className="p-5 border-b border-white/10 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>নিবন্ধিত শিক্ষার্থীদের পর্যবেক্ষণ তালিকা ({filteredRecords.length} জন)</span>
            </h3>
            <p className="text-xs text-slate-400">শিক্ষার্থীদের তথ্য অনুসন্ধান, ফিল্টার ও পরিচালনা করুন</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="নাম বা আইডি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 text-xs rounded-lg border border-white/15 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-44 transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs py-1.5 pl-2 pr-6 rounded-lg border border-white/15 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="All" className="bg-slate-950 text-white">সকল দুর্বলতা</option>
                {Object.entries(WeaknessCategoryLabels).map(([key, label]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">{label}</option>
                ))}
              </select>
            </div>

            {/* Class Filter */}
            {classes.length > 0 && (
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="text-xs py-1.5 pl-2 pr-6 rounded-lg border border-white/15 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="All" className="bg-slate-950 text-white">সকল শ্রেণী</option>
                {classes.map(cls => (
                  <option key={cls} value={cls} className="bg-slate-950 text-white">{cls}</option>
                ))}
              </select>
            )}

            {(searchTerm || categoryFilter !== 'All' || classFilter !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All');
                  setClassFilter('All');
                }}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>রিসেট</span>
              </button>
            )}
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
              {filteredRecords.map((record) => {
                const signal = ProgressSignalLabels[record.progressSignal];
                return (
                  <tr key={record.id} className="hover:bg-white/5 transition duration-150">
                    {/* Column 1: Info */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">{record.studentName}</div>
                        <div className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded inline-block">
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
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-semibold text-slate-400 block text-[11px] mb-0.5">দুর্বলতার কারণ:</span>
                          {record.rootCause}
                        </p>
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
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 border rounded-full bg-white/5 border-white/10 text-white`}>
                            <span>{signal.emoji}</span>
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
                      </div>
                    </td>

                    {/* Column 6: Actions */}
                    <td className="py-3.5 px-4 align-middle text-center no-print">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onEdit(record)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition cursor-pointer"
                          title="তথ্য সংশোধন করুন"
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
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
