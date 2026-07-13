import React, { useState, useMemo } from 'react';
import { StudentRecord, ProgressSignal, WeaknessCategory, WeaknessLevel } from '../types';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  GraduationCap, 
  Search, 
  Filter, 
  BarChart3, 
  PieChart, 
  Activity,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { ProgressSignalLabels, WeaknessCategoryLabels, WeaknessLevelLabels } from '../types';

interface StudentAnalyticsProps {
  records: StudentRecord[];
}

export default function StudentAnalytics({ records }: StudentAnalyticsProps) {
  // Filters
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedWeaknessLevel, setSelectedWeaknessLevel] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Interactive Drilldown state
  const [selectedSignalFilter, setSelectedSignalFilter] = useState<ProgressSignal | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<WeaknessCategory | null>(null);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedClass('All');
    setSelectedWeaknessLevel('All');
    setSearchTerm('');
    setSelectedSignalFilter(null);
    setSelectedCategoryFilter(null);
  };

  // Get unique classes for filter dropdown
  const uniqueClasses = useMemo(() => {
    const classes = records.map(r => r.studentClass);
    return ['All', ...Array.from(new Set(classes))];
  }, [records]);

  // Filter records based on selected criteria
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchClass = selectedClass === 'All' || r.studentClass === selectedClass;
      const matchWeaknessLevel = selectedWeaknessLevel === 'All' || r.weaknessLevel === selectedWeaknessLevel;
      const matchSearch = searchTerm === '' || 
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchClass && matchWeaknessLevel && matchSearch;
    });
  }, [records, selectedClass, selectedWeaknessLevel, searchTerm]);

  // Compute counts for KPIs
  const kpis = useMemo(() => {
    const total = filteredRecords.length;
    if (total === 0) return { total: 0, greenCount: 0, yellowCount: 0, redCount: 0, greenPct: 0, yellowPct: 0, redPct: 0 };
    
    const green = filteredRecords.filter(r => r.progressSignal === 'Green').length;
    const yellow = filteredRecords.filter(r => r.progressSignal === 'Yellow').length;
    const red = filteredRecords.filter(r => r.progressSignal === 'Red').length;
    
    return {
      total,
      greenCount: green,
      yellowCount: yellow,
      redCount: red,
      greenPct: Math.round((green / total) * 100),
      yellowPct: Math.round((yellow / total) * 100),
      redPct: Math.round((red / total) * 100)
    };
  }, [filteredRecords]);

  // Data for Category breakdown (Reading, Writing, etc.)
  const categoryData = useMemo(() => {
    const categories: WeaknessCategory[] = ['Reading', 'Writing', 'Math', 'Comm', 'Attention', 'Memory'];
    return categories.map(cat => {
      const catRecords = filteredRecords.filter(r => r.weaknessCategory === cat);
      const total = catRecords.length;
      
      const green = catRecords.filter(r => r.progressSignal === 'Green').length;
      const yellow = catRecords.filter(r => r.progressSignal === 'Yellow').length;
      const red = catRecords.filter(r => r.progressSignal === 'Red').length;

      return {
        key: cat,
        label: WeaknessCategoryLabels[cat],
        total,
        green,
        yellow,
        red,
        greenPct: total > 0 ? Math.round((green / total) * 100) : 0,
        yellowPct: total > 0 ? Math.round((yellow / total) * 100) : 0,
        redPct: total > 0 ? Math.round((red / total) * 100) : 0,
      };
    }).sort((a, b) => b.total - a.total); // Sort by highest number of students
  }, [filteredRecords]);

  // Class wise progress distribution
  const classData = useMemo(() => {
    const classes = Array.from(new Set(filteredRecords.map(r => r.studentClass)));
    return classes.map(cls => {
      const clsRecords = filteredRecords.filter(r => r.studentClass === cls);
      const total = clsRecords.length;
      const green = clsRecords.filter(r => r.progressSignal === 'Green').length;
      const yellow = clsRecords.filter(r => r.progressSignal === 'Yellow').length;
      const red = clsRecords.filter(r => r.progressSignal === 'Red').length;

      return {
        className: cls,
        total,
        green,
        yellow,
        red,
        greenPct: total > 0 ? Math.round((green / total) * 100) : 0,
        yellowPct: total > 0 ? Math.round((yellow / total) * 100) : 0,
        redPct: total > 0 ? Math.round((red / total) * 100) : 0,
      };
    }).sort((a, b) => b.total - a.total);
  }, [filteredRecords]);

  // Handle drill down on click
  const drilldownRecords = useMemo(() => {
    let result = filteredRecords;
    if (selectedSignalFilter) {
      result = result.filter(r => r.progressSignal === selectedSignalFilter);
    }
    if (selectedCategoryFilter) {
      result = result.filter(r => r.weaknessCategory === selectedCategoryFilter);
    }
    return result;
  }, [filteredRecords, selectedSignalFilter, selectedCategoryFilter]);

  // Donut chart path drawing logic
  // Radius: 60, strokeWidth: 16, Center: 80,80
  const donutChartSegments = useMemo(() => {
    const { greenCount, yellowCount, redCount, total } = kpis;
    if (total === 0) return [];

    const radius = 50;
    const circumference = 2 * Math.PI * radius; // 314.16
    
    // Start drawing from top (-90 degrees)
    let currentOffset = 0;

    const segments = [
      { key: 'Green' as ProgressSignal, count: greenCount, color: '#22c55e', label: 'সবুজ', bgClass: 'bg-green-500' },
      { key: 'Yellow' as ProgressSignal, count: yellowCount, color: '#eab308', label: 'হলুদ', bgClass: 'bg-amber-500' },
      { key: 'Red' as ProgressSignal, count: redCount, color: '#ef4444', label: 'লাল', bgClass: 'bg-red-500' }
    ];

    return segments.map(seg => {
      const percentage = (seg.count / total) * 100;
      const strokeLength = (percentage / 100) * circumference;
      const strokeOffset = circumference - strokeLength + currentOffset;
      
      // Update offset for next segment
      currentOffset -= strokeLength;

      return {
        ...seg,
        percentage: Math.round(percentage),
        strokeDasharray: `${strokeLength} ${circumference}`,
        strokeDashoffset: strokeOffset,
        radius
      };
    }).filter(seg => seg.count > 0);
  }, [kpis]);

  return (
    <div id="student-progress-analytics" className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 mt-12 transition-all duration-300">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Activity className="w-6 h-6 animate-pulse" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase px-2 py-1 bg-indigo-50/70 rounded-md">
              শিক্ষার্থী উন্নয়ন ড্যাশবোর্ড
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            শিক্ষার্থীদের সামগ্রিক অগ্রগতি ও প্রগতি পর্যবেক্ষণ চার্ট
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            লাল, হলুদ ও সবুজ সংকেতের রিয়েল-টাইম অনুপাত এবং দুর্বলতার শ্রেণীভিত্তিক পারফরম্যান্স ডাটা।
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(selectedClass !== 'All' || selectedWeaknessLevel !== 'All' || searchTerm !== '' || selectedSignalFilter !== null || selectedCategoryFilter !== null) && (
            <button 
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              ফিল্টার রিসেট করুন
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className="bg-slate-50 rounded-2xl p-4 md:p-5 mb-8 border border-slate-100/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text"
              placeholder="শিক্ষার্থীর নাম বা আইডি দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-slate-800 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs font-semibold whitespace-nowrap flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-slate-400" /> শ্রেণী:
            </span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-white text-slate-700 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="All">সকল শ্রেণী ও শাখা</option>
              {uniqueClasses.filter(c => c !== 'All').map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Weakness Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs font-semibold whitespace-nowrap flex items-center gap-1">
              <Filter className="w-4 h-4 text-slate-400" /> তীব্রতা:
            </span>
            <select
              value={selectedWeaknessLevel}
              onChange={(e) => setSelectedWeaknessLevel(e.target.value)}
              className="w-full bg-white text-slate-700 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="All">সকল তীব্রতা স্তর</option>
              {Object.entries(WeaknessLevelLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Students Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">মোট শিক্ষার্থী সংখ্যা</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{kpis.total} জন</h3>
            <p className="text-xs text-slate-400 mt-0.5">ফিল্টার অনুযায়ী মোট</p>
          </div>
        </div>

        {/* Green Signal Card */}
        <div 
          onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Green' ? null : 'Green')}
          className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex items-center gap-4 hover:shadow-md ${
            selectedSignalFilter === 'Green' 
              ? 'bg-green-50 border-green-300 ring-2 ring-green-100' 
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">সন্তোষজনক প্রগতি</p>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpis.greenCount} জন <span className="text-sm font-bold text-green-600">({kpis.greenPct}%)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">সবুজ সংকেত প্রাপ্ত শিক্ষার্থী</p>
          </div>
        </div>

        {/* Yellow Signal Card */}
        <div 
          onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Yellow' ? null : 'Yellow')}
          className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex items-center gap-4 hover:shadow-md ${
            selectedSignalFilter === 'Yellow' 
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-100' 
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">মাঝারি / উন্নতিশীল</p>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpis.yellowCount} জন <span className="text-sm font-bold text-amber-600">({kpis.yellowPct}%)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">হলুদ সংকেত প্রাপ্ত শিক্ষার্থী</p>
          </div>
        </div>

        {/* Red Signal Card */}
        <div 
          onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Red' ? null : 'Red')}
          className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex items-center gap-4 hover:shadow-md ${
            selectedSignalFilter === 'Red' 
              ? 'bg-red-50 border-red-300 ring-2 ring-red-100' 
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">ধীর প্রগতি / বিশেষ যত্ন</p>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpis.redCount} জন <span className="text-sm font-bold text-red-600">({kpis.redPct}%)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">লাল সংকেত প্রাপ্ত শিক্ষার্থী</p>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      {filteredRecords.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-12 text-center border border-dashed border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">নির্বাচিত ফিল্টার বা সার্চ কিওয়ার্ড অনুযায়ী কোনো শিক্ষার্থী পাওয়া যায়নি।</p>
          <p className="text-xs text-slate-400 mt-1">দয়া করে ফিল্টার পরিবর্তন করুন বা নতুন রেকর্ড যোগ করুন।</p>
          <button 
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition-all cursor-pointer shadow-sm"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Donut Chart Visualizing Progress Signals - 5 Cols */}
          <div className="lg:col-span-5 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-indigo-500" /> প্রগতি সংকেতের শতকরা অনুপাত
              </h4>
              <p className="text-xs text-slate-400">রঙিন বৃত্তাকার পাই চার্টে লাল, হলুদ ও সবুজ সংকেতের বিস্তার।</p>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative my-6 flex justify-center items-center">
              <svg width="200" height="200" viewBox="0 0 160 160" className="transform -rotate-90">
                {/* Background grey circle */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="50" 
                  fill="transparent" 
                  stroke="#f1f5f9" 
                  strokeWidth="16" 
                />
                {/* Colored Segments */}
                {donutChartSegments.map((seg, idx) => (
                  <circle
                    key={seg.key}
                    cx="80"
                    cy="80"
                    r={seg.radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={selectedSignalFilter === seg.key ? "20" : "16"}
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 cursor-pointer hover:opacity-90"
                    onClick={() => setSelectedSignalFilter(selectedSignalFilter === seg.key ? null : seg.key)}
                  />
                ))}
              </svg>

              {/* Absolute Center Content */}
              <div className="absolute text-center select-none pointer-events-none">
                <p className="text-3xl font-black text-slate-800">{kpis.total}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">মোট শিক্ষার্থী</p>
              </div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div 
                onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Green' ? null : 'Green')}
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  selectedSignalFilter === 'Green' ? 'bg-green-100/70 border border-green-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mx-auto mb-1"></div>
                <p className="text-[10px] font-bold text-slate-500">সবুজ</p>
                <p className="text-xs font-black text-green-600 mt-0.5">{kpis.greenCount} জন ({kpis.greenPct}%)</p>
              </div>
              <div 
                onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Yellow' ? null : 'Yellow')}
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  selectedSignalFilter === 'Yellow' ? 'bg-amber-100/70 border border-amber-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mx-auto mb-1"></div>
                <p className="text-[10px] font-bold text-slate-500">হলুদ</p>
                <p className="text-xs font-black text-amber-600 mt-0.5">{kpis.yellowCount} জন ({kpis.yellowPct}%)</p>
              </div>
              <div 
                onClick={() => setSelectedSignalFilter(selectedSignalFilter === 'Red' ? null : 'Red')}
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  selectedSignalFilter === 'Red' ? 'bg-red-100/70 border border-red-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mx-auto mb-1"></div>
                <p className="text-[10px] font-bold text-slate-500">লাল</p>
                <p className="text-xs font-black text-red-600 mt-0.5">{kpis.redCount} জন ({kpis.redPct}%)</p>
              </div>
            </div>
          </div>

          {/* Weakness Category Breakdown Stacked Bar Chart - 7 Cols */}
          <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-500" /> দুর্বলতা ভিত্তিক প্রগতি বিশ্লেষণ চার্ট
              </h4>
              <p className="text-xs text-slate-400">প্রতিটি প্রধান দুর্বলতার বিপরীতে শিক্ষার্থীদের লাল, হলুদ ও সবুজ সংকেতের সংখ্যা।</p>
            </div>

            {/* Custom Bar Graphs */}
            <div className="space-y-4 my-6">
              {categoryData.map(cat => {
                const isSelected = selectedCategoryFilter === cat.key;
                
                return (
                  <div 
                    key={cat.key} 
                    onClick={() => setSelectedCategoryFilter(isSelected ? null : cat.key)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isSelected ? 'bg-indigo-50/80 border border-indigo-100' : 'hover:bg-slate-100/50'
                    }`}
                  >
                    {/* Label & Total */}
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-600 animate-ping' : 'bg-slate-400'}`}></span>
                        {cat.label}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {cat.total} জন শিক্ষার্থী
                      </span>
                    </div>

                    {/* Progress Segment Bar */}
                    {cat.total === 0 ? (
                      <div className="h-4 bg-slate-100 rounded-full w-full flex items-center justify-center">
                        <span className="text-[9px] font-medium text-slate-400">কোনো ডাটা নেই</span>
                      </div>
                    ) : (
                      <div className="h-4 bg-slate-100/70 rounded-full w-full overflow-hidden flex shadow-inner">
                        {cat.green > 0 && (
                          <div 
                            style={{ width: `${(cat.green / cat.total) * 100}%` }}
                            className="bg-green-500 hover:bg-green-600 transition-all flex items-center justify-center text-[9px] font-black text-white"
                            title={`সবুজ: ${cat.green} জন (${Math.round((cat.green / cat.total) * 100)}%)`}
                          >
                            {cat.green}
                          </div>
                        )}
                        {cat.yellow > 0 && (
                          <div 
                            style={{ width: `${(cat.yellow / cat.total) * 100}%` }}
                            className="bg-amber-400 hover:bg-amber-500 transition-all flex items-center justify-center text-[9px] font-black text-slate-800"
                            title={`হলুদ: ${cat.yellow} জন (${Math.round((cat.yellow / cat.total) * 100)}%)`}
                          >
                            {cat.yellow}
                          </div>
                        )}
                        {cat.red > 0 && (
                          <div 
                            style={{ width: `${(cat.red / cat.total) * 100}%` }}
                            className="bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center text-[9px] font-black text-white"
                            title={`লাল: ${cat.red} জন (${Math.round((cat.red / cat.total) * 100)}%)`}
                          >
                            {cat.red}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interactive Tooltip Helper */}
            <div className="text-[11px] text-slate-400/90 text-center border-t border-slate-100 pt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
              <span>দুর্বলতার বারে ক্লিক করে নির্দিষ্ট শ্রেণীর বা বৈশিষ্ট্যের শিক্ষার্থীদের ফিল্টার করুন।</span>
            </div>
          </div>

        </div>
      )}

      {/* Class Level Progress Distribution Grid */}
      {filteredRecords.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> শ্রেণীভিত্তিক প্রগতি সংকেতের তুলনামূলক বিস্তার
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classData.map(cls => (
              <div key={cls.className} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[70%]">{cls.className}</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{cls.total} জন</span>
                </div>
                
                {/* 3 point signal status indicators inside class */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> সন্তোষজনক (সবুজ)
                    </span>
                    <span className="font-bold text-slate-700">{cls.green} জন ({cls.greenPct}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> উন্নতিশীল (হলুদ)
                    </span>
                    <span className="font-bold text-slate-700">{cls.yellow} জন ({cls.yellowPct}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> ধীর প্রগতি (লাল)
                    </span>
                    <span className="font-bold text-slate-700">{cls.red} জন ({cls.redPct}%)</span>
                  </div>
                </div>

                {/* Micro stacked bar */}
                <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden flex mt-3">
                  <div style={{ width: `${cls.greenPct}%` }} className="bg-green-500"></div>
                  <div style={{ width: `${cls.yellowPct}%` }} className="bg-amber-400"></div>
                  <div style={{ width: `${cls.redPct}%` }} className="bg-red-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drill-down Results Table */}
      {(selectedSignalFilter || selectedCategoryFilter) && (
        <div className="bg-indigo-50/30 rounded-2xl p-5 border border-indigo-100 mt-6 animate-fade-in">
          <div className="flex justify-between items-center border-b border-indigo-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                বিশ্লেষণ ফিল্টার ড্রিল-ডাউন
              </span>
              <p className="text-xs text-indigo-600/90">
                {selectedSignalFilter && `সংকেত: ${selectedSignalFilter === 'Green' ? 'সবুজ' : selectedSignalFilter === 'Yellow' ? 'হলুদ' : 'লাল'}`}
                {selectedSignalFilter && selectedCategoryFilter && ' + '}
                {selectedCategoryFilter && `দুর্বলতা: ${WeaknessCategoryLabels[selectedCategoryFilter]}`} 
                {` (${drilldownRecords.length} জন শিক্ষার্থী)`}
              </p>
            </div>
            <button 
              onClick={() => {
                setSelectedSignalFilter(null);
                setSelectedCategoryFilter(null);
              }}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              বন্ধ করুন <XCircle className="w-4 h-4" />
            </button>
          </div>

          {drilldownRecords.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">নির্বাচিত ফিল্টার কম্বিনেশনে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {drilldownRecords.map(student => (
                <div 
                  key={student.id}
                  className="bg-white rounded-xl p-3 border border-slate-100/80 shadow-sm hover:border-indigo-300 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{student.studentName}</h5>
                      <p className="text-[10px] text-slate-400">ID: {student.studentId} | {student.studentClass}</p>
                    </div>
                    <span className={`w-3 h-3 rounded-full ${
                      student.progressSignal === 'Green' ? 'bg-green-500' : student.progressSignal === 'Yellow' ? 'bg-amber-400' : 'bg-red-500'
                    }`}></span>
                  </div>
                  
                  <div className="space-y-1 text-[10px] border-t border-slate-50 pt-2 mt-2">
                    <p className="text-slate-600">
                      <strong className="text-slate-700">প্রধান দুর্বলতা:</strong> {WeaknessCategoryLabels[student.weaknessCategory]} ({WeaknessLevelLabels[student.weaknessLevel]})
                    </p>
                    <p className="text-slate-600 truncate">
                      <strong className="text-slate-700">বর্তমান প্রগতি:</strong> {student.currentStatus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
