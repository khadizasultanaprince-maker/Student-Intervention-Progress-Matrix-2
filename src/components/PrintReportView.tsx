/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  StudentRecord, 
  WeaknessCategoryLabels, 
  WeaknessLevelLabels, 
  LearningStyleLabels, 
  ProgressSignalLabels 
} from '../types';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';

interface PrintReportViewProps {
  records: StudentRecord[];
  onClose: () => void;
  schoolName: string;
  setSchoolName: (name: string) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
}

export default function PrintReportView({ 
  records, 
  onClose, 
  schoolName, 
  setSchoolName,
  academicYear,
  setAcademicYear
}: PrintReportViewProps) {
  
  const handlePrint = () => {
    window.print();
  };

  const getBengaliDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('bn-BD', options);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col justify-start overflow-y-auto p-4 md:p-8 no-print animate-fade-in">
      
      {/* Control Panel overlay (Does not print due to Tailwind or .no-print helper) */}
      <div className="max-w-6xl w-full mx-auto bg-slate-900/60 backdrop-blur-md rounded-t-xl border border-white/10 shadow-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 no-print">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>প্রাতিষ্ঠানিক প্রিন্ট ও পিডিএফ প্রিভিউ</span>
          </h3>
          <p className="text-xs text-slate-400">
            এটি ল্যান্ডস্কেপ প্রিন্টিং ও অফলাইন পিডিএফ সংরক্ষণের জন্য বিশেষভাবে প্রস্তুতকৃত।
          </p>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 w-fit">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span>ডাউনলোড টিপ: পিডিএফ ডাউনলোড করতে 'Save PDF' বাটনে ক্লিক করে প্রিন্টার ডেস্টিনেশন হিসেবে "Save as PDF" সিলেক্ট করুন।</span>
          </p>
        </div>

        {/* Configuration inputs within preview control panel */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">বিদ্যালয়/প্রতিষ্ঠানের নাম</span>
            <input 
              type="text" 
              value={schoolName} 
              onChange={(e) => setSchoolName(e.target.value)}
              className="px-2.5 py-1 text-xs border border-white/15 bg-slate-950/40 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              placeholder="বিদ্যালয়ের নাম লিখুন..."
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">শিক্ষাবর্ষ</span>
            <input 
              type="text" 
              value={academicYear} 
              onChange={(e) => setAcademicYear(e.target.value)}
              className="px-2.5 py-1 text-xs border border-white/15 bg-slate-950/40 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-24"
              placeholder="যেমন: ২০২৬"
            />
          </div>
          
          <div className="flex items-center gap-2 pt-4 sm:pt-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-600/25 cursor-pointer transition active:scale-95 animate-pulse hover:animate-none"
              title="পিডিএফ হিসেবে ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>পিডিএফ ডাউনলোড (Save PDF)</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-600/25 cursor-pointer transition active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>মুদ্রণ করুন (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-bold cursor-pointer transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>বন্ধ করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="max-w-6xl w-full mx-auto bg-white border border-t-0 border-slate-200 p-8 md:p-12 shadow-lg mb-8 rounded-b-xl overflow-x-auto">
        <div className="min-w-[1000px] bg-white print:p-0" id="print-area">
          
          {/* Institutional Header */}
          <div className="text-center space-y-2 border-b-2 border-double border-slate-800 pb-5 mb-6">
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-slate-800 text-sm mb-1 tracking-wider bg-slate-50">
              গণপ্রজাতন্ত্রী বাংলাদেশ
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {schoolName || 'সরকারি প্রাথমিক/মাধ্যমিক বিদ্যালয় প্রগতি বিবরণী'}
            </h1>
            <p className="text-xs font-bold text-slate-600 tracking-wider">
              বিশেষ উন্নয়ন কার্যক্রম ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স ({academicYear || '২০২৬'} শিক্ষাবর্ষ)
            </p>
            <div className="flex justify-between items-center text-[11px] text-slate-600 pt-2 font-medium px-1">
              <span>প্রতিবেদন প্রকাশের তারিখ: {getBengaliDate()}</span>
              <span className="border border-slate-800 px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-800">
                শ্রেণীকক্ষ বিশেষ হস্তক্ষেপ নথি
              </span>
            </div>
          </div>

          {/* Main Printable Table */}
          <table className="w-full text-left border-collapse border border-slate-800 text-[11px] leading-relaxed">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-800 text-slate-900 font-bold">
                <th className="border border-slate-800 p-2 text-center w-[12%]">শিক্ষার্থীর বিবরণ</th>
                <th className="border border-slate-800 p-2 text-center w-[18%]">সাধারণ ডায়াগনস্টিক</th>
                <th className="border border-slate-800 p-2 text-center w-[18%]">মনস্তাত্ত্বিক ও আচরণগত ম্যাপিং</th>
                <th className="border border-slate-800 p-2 text-center w-[22%]">প্রগতি ও পর্যবেক্ষণ (Competency)</th>
                <th className="border border-slate-800 p-2 text-center w-[22%]">গৃহীত বিশেষ হস্তক্ষেপ কৌশল</th>
                <th className="border border-slate-800 p-2 text-center w-[8%]">অগ্রগতি সংকেত</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const signal = ProgressSignalLabels[record.progressSignal];
                return (
                  <tr key={record.id} className="border-b border-slate-800">
                    {/* Student details */}
                    <td className="border border-slate-800 p-2 text-slate-950 align-top">
                      <div className="font-bold text-[12px]">{record.studentName}</div>
                      <div className="font-mono text-[10px] text-slate-700">ID: {record.studentId}</div>
                      <div className="text-[10px] text-slate-800 font-medium">{record.studentClass}</div>
                    </td>

                    {/* Diagnostics */}
                    <td className="border border-slate-800 p-2 align-top text-slate-800 space-y-1">
                      <div>
                        <strong className="text-slate-950">ক্ষেত্র:</strong> {WeaknessCategoryLabels[record.weaknessCategory]}
                      </div>
                      <div>
                        <strong className="text-slate-950">মাত্রা:</strong> {WeaknessLevelLabels[record.weaknessLevel]}
                      </div>
                      <div className="text-[10px] text-slate-700 italic">
                        <strong>মূল কারণ:</strong> {record.rootCause}
                      </div>
                    </td>

                    {/* Psychometric mapping */}
                    <td className="border border-slate-800 p-2 align-top text-slate-800 space-y-1">
                      <div>
                        <strong className="text-slate-950">শিখন শৈলী:</strong> {LearningStyleLabels[record.learningStyle]}
                      </div>
                      <div>
                        <strong className="text-slate-950">আচরণ:</strong> {record.behavior}
                      </div>
                      {record.hiddenTalent && (
                        <div className="text-[10px] text-teal-800 font-medium">
                          <strong>লুকানো প্রতিভা:</strong> {record.hiddenTalent}
                        </div>
                      )}
                    </td>

                    {/* Competency Monitoring */}
                    <td className="border border-slate-800 p-2 align-top text-slate-800 space-y-1.5">
                      <div>
                        <strong className="text-rose-800 block">১. প্রাথমিক সক্ষমতা (Baseline Status):</strong>
                        <span className="text-slate-700 block pl-1">{record.baselineStatus}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-800 block">২. বর্তমান সক্ষমতা (Current Status):</strong>
                        <span className="text-slate-700 block pl-1">{record.currentStatus}</span>
                      </div>
                    </td>

                    {/* Intervention strategy & comments */}
                    <td className="border border-slate-800 p-2 align-top text-slate-800 space-y-1.5">
                      <div>
                        <strong className="text-slate-950 block">কৌশলসমূহ:</strong>
                        <span className="text-slate-700 pl-1 block">{record.strategyUsed}</span>
                      </div>
                      {record.teacherRemarks && (
                        <div>
                          <strong className="text-slate-900 block">মন্তব্য ও পরিকল্পনা:</strong>
                          <span className="text-slate-500 pl-1 block italic">“{record.teacherRemarks}”</span>
                        </div>
                      )}
                    </td>

                    {/* Signal dot */}
                    <td className="border border-slate-800 p-2 text-center align-middle bg-slate-50">
                      <div className="space-y-1">
                        <span className="text-xl block">{signal.emoji}</span>
                        <span className="text-[9px] font-bold block text-slate-800">
                          {record.progressSignal === 'Red' ? 'ধীর' : record.progressSignal === 'Yellow' ? 'মাঝারি' : 'সন্তোষজনক'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Institutional Signatures Footer */}
          <div className="mt-16 grid grid-cols-2 gap-12 pt-8 text-xs font-semibold text-slate-800">
            <div className="space-y-1 border-t border-slate-800 pt-2 text-center w-52 justify-self-start">
              <p>শ্রেণী শিক্ষকের স্বাক্ষর</p>
              <p className="text-[10px] font-normal text-slate-500">তারিখ: ............................</p>
            </div>
            <div className="space-y-1 border-t border-slate-800 pt-2 text-center w-52 justify-self-end">
              <p>প্রধান শিক্ষকের প্রতিস্বাক্ষর ও সিল</p>
              <p className="text-[10px] font-normal text-slate-500">তারিখ: ............................</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
