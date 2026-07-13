/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { StudentRecord, ProgressSignal, WeaknessCategory, WeaknessCategoryLabels } from '../types';
import { LineChart, Users, TrendingUp, HelpCircle, UserCheck, AlertTriangle, ArrowUpRight, Search, Filter, Sparkles, CheckSquare, Square } from 'lucide-react';

interface WeeklyProgressChartProps {
  records: StudentRecord[];
}

type TrendType = 'Improving' | 'Stagnant' | 'Regressed';

export default function WeeklyProgressChart({ records }: WeeklyProgressChartProps) {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchStudentTerm, setSearchStudentTerm] = useState<string>('');
  const [hoveredStudentId, setHoveredStudentId] = useState<string | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Record<string, boolean>>({});
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

  // Score mapping for Progress Signals
  const signalToScore = (sig: ProgressSignal): number => {
    switch (sig) {
      case 'Green': return 3;
      case 'Yellow': return 2;
      case 'Red': return 1;
      default: return 2;
    }
  };

  // Get unique classes & categories for filtering
  const uniqueClasses = useMemo(() => {
    const classes = records.map(r => r.studentClass);
    return ['All', ...Array.from(new Set(classes))];
  }, [records]);

  const uniqueCategories = useMemo(() => {
    const categories = records.map(r => r.weaknessCategory);
    return ['All', ...Array.from(new Set(categories))];
  }, [records]);

  // Map and analyze student trajectories
  const analyzedStudents = useMemo(() => {
    return records.map((student, index) => {
      const currentSig = student.progressSignal || 'Yellow';
      const lastWeekSig = student.lastWeekProgressSignal || currentSig;

      const currentScore = signalToScore(currentSig);
      const lastWeekScore = signalToScore(lastWeekSig);

      let trend: TrendType = 'Stagnant';
      let trendText = 'প্রগতি স্থবির';
      let trendColor = 'text-amber-500';
      let trendBg = 'bg-amber-500/10 border-amber-500/20';

      if (currentScore > lastWeekScore) {
        trend = 'Improving';
        trendText = 'উন্নতি ঘটছে';
        trendColor = 'text-green-500';
        trendBg = 'bg-green-500/10 border-green-500/20';
      } else if (currentScore < lastWeekScore) {
        trend = 'Regressed';
        trendText = 'অবনতি ঘটেছে';
        trendColor = 'text-rose-500';
        trendBg = 'bg-rose-500/10 border-rose-500/20';
      }

      return {
        ...student,
        currentSig,
        lastWeekSig,
        currentScore,
        lastWeekScore,
        trend,
        trendText,
        trendColor,
        trendBg,
        index
      };
    });
  }, [records]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return analyzedStudents.filter(student => {
      const matchClass = selectedClassFilter === 'All' || student.studentClass === selectedClassFilter;
      const matchCategory = selectedCategoryFilter === 'All' || student.weaknessCategory === selectedCategoryFilter;
      const matchSearch = searchStudentTerm === '' || 
        student.studentName.toLowerCase().includes(searchStudentTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchStudentTerm.toLowerCase());
      return matchClass && matchCategory && matchSearch;
    });
  }, [analyzedStudents, selectedClassFilter, selectedCategoryFilter, searchStudentTerm]);

  // Initialize selected student IDs checklist whenever filtered list changes or is reset
  const activeSelectedIds = useMemo(() => {
    const ids: Record<string, boolean> = {};
    filteredStudents.forEach(st => {
      // If student was already manually toggled, keep their preference, otherwise default to true (if isAllSelected is true)
      if (selectedStudentIds[st.id] !== undefined) {
        ids[st.id] = selectedStudentIds[st.id];
      } else {
        ids[st.id] = isAllSelected;
      }
    });
    return ids;
  }, [filteredStudents, selectedStudentIds, isAllSelected]);

  // KPI calculations
  const kpis = useMemo(() => {
    const total = filteredStudents.length;
    if (total === 0) return { total: 0, improving: 0, stagnant: 0, regressed: 0, impPct: 0, stagPct: 0, regPct: 0 };

    const improving = filteredStudents.filter(s => s.trend === 'Improving').length;
    const stagnant = filteredStudents.filter(s => s.trend === 'Stagnant').length;
    const regressed = filteredStudents.filter(s => s.trend === 'Regressed').length;

    return {
      total,
      improving,
      stagnant,
      regressed,
      impPct: Math.round((improving / total) * 100),
      stagPct: Math.round((stagnant / total) * 100),
      regPct: Math.round((regressed / total) * 100)
    };
  }, [filteredStudents]);

  const toggleStudent = (id: string) => {
    setSelectedStudentIds(prev => ({
      ...prev,
      [id]: !activeSelectedIds[id]
    }));
  };

  const handleSelectAllToggle = () => {
    const nextVal = !isAllSelected;
    setIsAllSelected(nextVal);
    const updated: Record<string, boolean> = {};
    filteredStudents.forEach(st => {
      updated[st.id] = nextVal;
    });
    setSelectedStudentIds(updated);
  };

  // SVG Chart Metrics
  const chartWidth = 500;
  const chartHeight = 300;
  const paddingLeft = 140;
  const paddingRight = 140;
  const paddingTop = 50;
  const paddingBottom = 50;

  const xLastWeek = paddingLeft;
  const xCurrentWeek = chartWidth - paddingRight;

  const yGreen = paddingTop;
  const yYellow = (chartHeight - paddingTop - paddingBottom) / 2 + paddingTop;
  const yRed = chartHeight - paddingBottom;

  const getTargetY = (score: number) => {
    if (score === 3) return yGreen;
    if (score === 2) return yYellow;
    return yRed;
  };

  // Get only checked students to render lines for
  const studentsToRender = useMemo(() => {
    return filteredStudents.filter(s => activeSelectedIds[s.id] !== false);
  }, [filteredStudents, activeSelectedIds]);

  return (
    <div id="weekly-progress-comparison-section" className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-6 transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/20">
            <LineChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">সাপ্তাহিক প্রগতি তুলনা (গত সপ্তাহ বনাম বর্তমান সপ্তাহ)</h3>
            <p className="text-xs text-slate-400">লাইন গ্রাফের মাধ্যমে শিক্ষার্থীদের ব্যক্তিগত উন্নতি বা স্থবিরতা পর্যবেক্ষণ করুন</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="text-xs font-bold text-slate-600 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">সকল শ্রেণী</option>
              {uniqueClasses.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="text-xs font-bold text-slate-600 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">সকল সমস্যা</option>
              {uniqueCategories.filter(cat => cat !== 'All').map(cat => (
                <option key={cat} value={cat}>{WeaknessCategoryLabels[cat as keyof typeof WeaknessCategoryLabels] || cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">মোট বিশ্লেষিত</p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black text-slate-800">{kpis.total}</span>
            <span className="text-xs text-slate-500">জন শিক্ষার্থী</span>
          </div>
        </div>

        <div className="bg-green-50/40 rounded-xl p-4 border border-green-100/50 flex flex-col justify-between">
          <p className="text-xs font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            উন্নতি ঘটছে
          </p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black text-green-600">{kpis.improving}</span>
            <span className="text-xs font-bold text-green-700/80">জন ({kpis.impPct}%)</span>
          </div>
        </div>

        <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-100/50 flex flex-col justify-between">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            প্রগতি স্থবির
          </p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black text-amber-600">{kpis.stagnant}</span>
            <span className="text-xs font-bold text-amber-700/80">জন ({kpis.stagPct}%)</span>
          </div>
        </div>

        <div className="bg-rose-50/40 rounded-xl p-4 border border-rose-100/50 flex flex-col justify-between">
          <p className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            অবনতি ঘটেছে
          </p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black text-rose-600">{kpis.regressed}</span>
            <span className="text-xs font-bold text-rose-700/80">জন ({kpis.regPct}%)</span>
          </div>
        </div>
      </div>

      {/* Main Chart Content */}
      {filteredStudents.length === 0 ? (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-12 text-center">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-500">নির্বাচিত ফিল্টারে কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।</p>
          <p className="text-xs text-slate-400 mt-1">দয়া করে অন্য শ্রেণী বা সমস্যা সিলেক্ট করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart Graphic Area - 8 Cols */}
          <div className="lg:col-span-8 bg-slate-50/50 border border-slate-100 rounded-xl p-4 relative flex flex-col justify-between min-h-[380px]">
            
            {/* Guide Info */}
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2 px-1">
              <span>বামপক্ষ: <strong>গত সপ্তাহ (Last Week)</strong></span>
              <span className="flex items-center gap-1 text-indigo-600 font-medium">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                লাইনের ওপর মাউস রাখলে বিস্তারিত তথ্য দেখা যাবে
              </span>
              <span>ডানপক্ষ: <strong>বর্তমান সপ্তাহ (This Week)</strong></span>
            </div>

            {/* SVG Plot */}
            <div className="flex-1 relative flex justify-center items-center">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-full select-none overflow-visible max-h-[340px]"
              >
                {/* Horizontal grid lines */}
                <line x1={xLastWeek} y1={yGreen} x2={xCurrentWeek} y2={yGreen} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={xLastWeek} y1={yYellow} x2={xCurrentWeek} y2={yYellow} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={xLastWeek} y1={yRed} x2={xCurrentWeek} y2={yRed} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

                {/* Vertical Week Line markers */}
                <line x1={xLastWeek} y1={yGreen - 15} x2={xLastWeek} y2={yRed + 15} stroke="#94a3b8" strokeWidth="2" />
                <line x1={xCurrentWeek} y1={yGreen - 15} x2={xCurrentWeek} y2={yRed + 15} stroke="#94a3b8" strokeWidth="2" />

                {/* Left/Right Label headers */}
                <text x={xLastWeek} y={yGreen - 22} textAnchor="middle" className="text-[10px] font-black fill-slate-500">গত সপ্তাহ</text>
                <text x={xCurrentWeek} y={yGreen - 22} textAnchor="middle" className="text-[10px] font-black fill-slate-500">বর্তমান সপ্তাহ</text>

                {/* Y Axis Grid Labels (Left) */}
                <text x={xLastWeek - 12} y={yGreen + 4} textAnchor="end" className="text-[10px] font-black fill-green-600">সন্তোষজনক (সবুজ)</text>
                <text x={xLastWeek - 12} y={yYellow + 4} textAnchor="end" className="text-[10px] font-black fill-amber-500">মাঝারি (হলুদ)</text>
                <text x={xLastWeek - 12} y={yRed + 4} textAnchor="end" className="text-[10px] font-black fill-rose-500">ধীর প্রগতি (লাল)</text>

                {/* Y Axis Grid Labels (Right) */}
                <text x={xCurrentWeek + 12} y={yGreen + 4} textAnchor="start" className="text-[10px] font-black fill-green-600">🟢 সন্তোষজনক</text>
                <text x={xCurrentWeek + 12} y={yYellow + 4} textAnchor="start" className="text-[10px] font-black fill-amber-500">🟡 মাঝারি</text>
                <text x={xCurrentWeek + 12} y={yRed + 4} textAnchor="start" className="text-[10px] font-black fill-rose-500">🔴 ধীর প্রগতি</text>

                {/* Trajectory Lines for Checked Students */}
                {studentsToRender.map((student, idx) => {
                  const startY = getTargetY(student.lastWeekScore);
                  const endY = getTargetY(student.currentScore);
                  
                  // Apply a small "vertical jitter" offset if there are multiple students, so lines do not lie directly on top of each other.
                  const totalCount = studentsToRender.length;
                  const jitter = totalCount > 1 ? (idx - (totalCount - 1) / 2) * 8 : 0;
                  
                  const adjustedStartY = startY + jitter;
                  const adjustedEndY = endY + jitter;

                  const isHovered = hoveredStudentId === student.id;
                  
                  // Trend-specific line formatting
                  let strokeColor = '#f59e0b'; // stagnant default
                  if (student.trend === 'Improving') strokeColor = '#10b981'; // Green
                  if (student.trend === 'Regressed') strokeColor = '#f43f5e'; // Red

                  return (
                    <g 
                      key={student.id} 
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredStudentId(student.id)}
                      onMouseLeave={() => setHoveredStudentId(null)}
                    >
                      {/* Thicker invisible hover capture line */}
                      <line 
                        x1={xLastWeek} 
                        y1={adjustedStartY} 
                        x2={xCurrentWeek} 
                        y2={adjustedEndY} 
                        stroke="transparent" 
                        strokeWidth="15" 
                      />

                      {/* Actual visible trajectory line */}
                      <line 
                        x1={xLastWeek} 
                        y1={adjustedStartY} 
                        x2={xCurrentWeek} 
                        y2={adjustedEndY} 
                        stroke={strokeColor} 
                        strokeWidth={isHovered ? "4" : "2"} 
                        opacity={hoveredStudentId ? (isHovered ? "1" : "0.15") : "0.75"}
                        className="transition-all duration-200"
                      />

                      {/* Start Point Dot */}
                      <circle 
                        cx={xLastWeek} 
                        cy={adjustedStartY} 
                        r={isHovered ? "6" : "4"} 
                        fill={strokeColor} 
                        opacity={hoveredStudentId ? (isHovered ? "1" : "0.15") : "1"}
                        className="transition-all duration-200"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* End Point Dot */}
                      <circle 
                        cx={xCurrentWeek} 
                        cy={adjustedEndY} 
                        r={isHovered ? "6" : "4"} 
                        fill={strokeColor} 
                        opacity={hoveredStudentId ? (isHovered ? "1" : "0.15") : "1"}
                        className="transition-all duration-200"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* Floating Text Label on line hover */}
                      {isHovered && (
                        <g>
                          {/* Label background */}
                          <rect 
                            x={(xLastWeek + xCurrentWeek) / 2 - 60}
                            y={(adjustedStartY + adjustedEndY) / 2 - 18}
                            width="120"
                            height="24"
                            rx="6"
                            fill="#1e293b"
                            className="shadow-md"
                          />
                          <text 
                            x={(xLastWeek + xCurrentWeek) / 2}
                            y={(adjustedStartY + adjustedEndY) / 2 - 2}
                            textAnchor="middle" 
                            fill="#ffffff" 
                            className="text-[10px] font-bold"
                          >
                            {student.studentName} ({student.trendText})
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hover Tooltip display at the bottom of the graph panel */}
            <div className="h-16 border-t border-slate-100 pt-3 flex items-center justify-center">
              {hoveredStudentId ? (() => {
                const hoveredStudent = filteredStudents.find(s => s.id === hoveredStudentId);
                if (!hoveredStudent) return null;
                return (
                  <div className="flex items-center gap-3 text-xs text-left animate-fade-in w-full justify-around px-4">
                    <div>
                      <p className="font-bold text-slate-800">{hoveredStudent.studentName}</p>
                      <p className="text-[10px] text-slate-400">রোল: {hoveredStudent.studentId} | {hoveredStudent.studentClass}</p>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <div>
                      <p className="text-[10px] text-slate-400">পূর্বের অবস্থা</p>
                      <p className="font-bold text-slate-600 truncate max-w-[150px]" title={hoveredStudent.baselineStatus}>{hoveredStudent.baselineStatus}</p>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <div>
                      <p className="text-[10px] text-slate-400">বর্তমান প্রগতি</p>
                      <p className="font-bold text-indigo-600 truncate max-w-[150px]" title={hoveredStudent.currentStatus}>{hoveredStudent.currentStatus}</p>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${hoveredStudent.trendBg} ${hoveredStudent.trendColor}`}>
                        {hoveredStudent.trendText}
                      </span>
                    </div>
                  </div>
                );
              })() : (
                <p className="text-xs text-slate-400 italic">কোনো লাইনের ওপর মাউস রেখে শিক্ষার্থীর পূর্ণ গতিপথ ও বর্তমান অবস্থা বিশ্লেষণ করুন।</p>
              )}
            </div>
          </div>

          {/* Checklist Sidebar - 4 Cols */}
          <div className="lg:col-span-4 border border-slate-100 rounded-xl p-4 bg-slate-50/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-700">শিক্ষার্থী তালিকা ({filteredStudents.length} জন)</h4>
                <button 
                  onClick={handleSelectAllToggle}
                  className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  {isAllSelected ? 'সব বাদ দিন' : 'সব সিলেক্ট করুন'}
                </button>
              </div>

              {/* Student Quick Search Box */}
              <div className="relative mb-3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="খুঁজুন (যেমন: তানভীর)..."
                  value={searchStudentTerm}
                  onChange={(e) => setSearchStudentTerm(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-lg text-slate-700"
                />
              </div>

              {/* Checklist Scroll Box */}
              <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
                {filteredStudents.map(student => {
                  const isChecked = activeSelectedIds[student.id] !== false;
                  return (
                    <div 
                      key={student.id}
                      onMouseEnter={() => setHoveredStudentId(student.id)}
                      onMouseLeave={() => setHoveredStudentId(null)}
                      onClick={() => toggleStudent(student.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-all ${
                        hoveredStudentId === student.id ? 'bg-indigo-50' : 'hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 flex-shrink-0" />
                        )}
                        <div className="text-left">
                          <p className={`font-bold ${isChecked ? 'text-slate-800' : 'text-slate-400 line-through'}`}>{student.studentName}</p>
                          <p className="text-[9px] text-slate-400">{student.studentClass}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${student.trendBg} ${student.trendColor}`}>
                          {student.trendText === 'উন্নতি ঘটছে' ? '📈' : student.trendText === 'অবনতি ঘটেছে' ? '📉' : '➖'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Footer */}
            <div className="text-[11px] text-slate-400 text-center border-t border-slate-100 pt-3 mt-3">
              <span className="flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>যে শিক্ষার্থীদের প্রগতি স্থবির (➖), তাদের মেন্টরশিপ ও মডিউল কৌশল পুনর্মূল্যায়ন করুন।</span>
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
