import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  HelpCircle, 
  Award, 
  Compass, 
  Lightbulb, 
  CheckSquare, 
  BookOpenCheck,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Users,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';
import { WeaknessCategory, WeaknessCategoryLabels } from '../types';

interface GuideArticle {
  id: string;
  category: WeaknessCategory | 'General';
  title: string;
  subtitle: string;
  readTime: string;
  problemStatement: string;
  symptoms: string[];
  strategies: {
    title: string;
    description: string;
    style: string;
  }[];
  actionPlan: string[];
}

const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: 'art-reading',
    category: 'Reading',
    title: 'পঠন ও উচ্চারণ জড়তা দূরীকরণের আধুনিক কৌশল',
    subtitle: 'ধ্বনিভিত্তিক শিখন ও রিডিং সাবলীলতা বৃদ্ধি',
    readTime: '৫ মিনিট রিড',
    problemStatement: 'শিক্ষার্থীরা যখন যুক্তবর্ণ পড়তে ভয় পায়, লাইনের পর লাইন গুলিয়ে ফেলে বা কোনো নির্দিষ্ট অক্ষরের শব্দ উচ্চারণে দীর্ঘ বিরতি নেয়।',
    symptoms: [
      'শব্দের ধ্বনি বা সিলেবল আলাদা করতে না পারা',
      'একই লাইন বারবার পড়া বা লাইন এড়িয়ে যাওয়া',
      'যুক্তবর্ণ দেখে ভয় পাওয়া বা ভুল পড়া'
    ],
    strategies: [
      {
        title: 'ধ্বনিভিত্তিক ভাঙন (Phonemic Blending)',
        description: 'যুক্তবর্ণ বা বড় শব্দগুলোকে ভেঙ্গে ভেঙ্গে উচ্চারণ করান (যেমন: "অগ্রগতি" = অ-গ্র-গ-তি)। বর্ণগুলোকে রঙিন চক বা মার্কার দিয়ে চিহ্নিত করুন।',
        style: 'Visual (চাক্ষুষ)'
      },
      {
        title: 'সহপাঠী পঠন (Shared Partner Reading)',
        description: 'একজন ভালো রিডার সহপাঠীর সাথে জোড়া তৈরি করুন। প্রথম জন পড়ার পর দ্বিতীয় জন পুনরায় রিডিং পড়বে। এতে দ্বিধা দূর হয়।',
        style: 'Auditory & Social'
      },
      {
        title: 'আঙুল ট্র্যাকিং (Finger Tracking & Speed-dating)',
        description: 'পড়ার সময় আঙুল বা রুলার ব্যবহার করতে বলুন। এতে চোখের মনোযোগ লাইন থেকে বিচ্যুত হয় না।',
        style: 'Kinesthetic'
      }
    ],
    actionPlan: [
      'প্রতিদিন ক্লাসের শুরুতে প্রথম ৫ মিনিট যেকোনো একটি অনুচ্ছেদ জোরে পড়তে দেওয়া।',
      'ভুল উচ্চারণের জন্য অতিরিক্ত শাসন না করে সহপাঠীদের সামনেই তা শুদ্ধভাবে কয়েকবার আবৃত্তি করানো।',
      'শিক্ষার্থীর প্রিয় কোনো সচিত্র গল্পের বই বাড়িতে জোরে পড়তে উৎসাহিত করা।'
    ]
  },
  {
    id: 'art-writing',
    category: 'Writing',
    title: 'অক্ষরের গঠন ও লিখন গতি বাড়ানোর সমাধান',
    subtitle: 'হস্তাক্ষর সৌন্দর্য ও সৃজনশীল বাক্য লিখন',
    readTime: '৪ মিনিট রিড',
    problemStatement: 'শিক্ষার্থীদের লেখার গতি অত্যন্ত ধীর হওয়া, বাক্য সাজাতে না পারা, অতিরিক্ত বানান ভুল করা এবং খাতায় কাটাকাটি করা।',
    symptoms: [
      'অক্ষরের আকৃতি উল্টাপাল্টা হওয়া বা লাইনের বাইরে চলে যাওয়া',
      'বানানের সঠিক রূপ মনে রাখতে সমস্যা',
      'চিন্তার সাথে লেখার গতির সামঞ্জস্য না থাকা'
    ],
    strategies: [
      {
        title: 'স্যান্ডপেপার বা বালিতে লেখা অনুশীলন',
        description: 'অক্ষরের আকৃতি মনে রাখতে আঙুল দিয়ে হাওয়ায় অথবা বালির উপর অক্ষর লেখার প্র্যাকটিস করান। এটি ব্রেইনের মোটর মেমোরি বাড়ায়।',
        style: 'Kinesthetic'
      },
      {
        title: 'দৃষ্টিগ্রাহ্য বানান কার্ড (Spelling Flashcards)',
        description: 'যেসব শব্দে প্রায়ই ভুল হয় (যেমন: বৃষ্টি, পরীক্ষা, বুদ্ধি) সেগুলো বড় রঙিন হরফে লিখে ক্লাসরুমের দেয়ালে টাঙিয়ে রাখুন।',
        style: 'Visual'
      },
      {
        title: 'সেন্টেন্স স্টার্টার (Sentence Starters)',
        description: 'সরাসরি বড় অনুচ্ছেদ লিখতে না দিয়ে "আজকের দিনে আমার ভালো লেগেছে..." জাতীয় অসম্পূর্ণ বাক্য দিয়ে তা সম্পূর্ণ করতে বলুন।',
        style: 'Cognitive'
      }
    ],
    actionPlan: [
      'লাইন টানা খাতায় পেন্সিল দিয়ে লেখার অভ্যাস করা, যাতে গ্রিপ ঠিক থাকে।',
      'প্রতিদিন ক্লাসে একটি নির্দিষ্ট শব্দ নিয়ে ছোট এক লাইনের বাক্য লিখতে দেওয়া।',
      'বানান ভুলের লাল দাগ না দিয়ে পাশে সঠিক বানানটি সুন্দর করে লিখে দেওয়া।'
    ]
  },
  {
    id: 'art-math',
    category: 'Math',
    title: 'গণিত ভীতি দূরীকরণ ও বাস্তবসম্মত হিসাব নিকাশ',
    subtitle: 'পাটিগণিত, জ্যামিতি ও সংখ্যার খেলা',
    readTime: '৬ মিনিট রিড',
    problemStatement: 'শিক্ষার্থীদের মনে গণিত নিয়ে চরম ভীতি থাকা, বড় গুণ-ভাগ দেখলেই গুলিয়ে ফেলা এবং সমস্যা সমাধানের সূত্র মনে রাখতে না পারা।',
    symptoms: [
      'সহজ যোগ-বিয়োগের সময়ও আঙুল গুনতে হিমশিম খাওয়া',
      'কথার অংক বা সমীকরণ সাজাতে ব্যর্থ হওয়া',
      'সূত্র গুলিয়ে ফেলা বা গণিত বিষয় এড়িয়ে চলা'
    ],
    strategies: [
      {
        title: 'বাস্তব উপকরণ দিয়ে অংক (Manipulatives)',
        description: 'কাঠি, মার্বেল বা কাগজের টুকরো ব্যবহার করে সরাসরি যোগ-বিয়োগ ও ভাগের ধারণা দিন। বাস্তব বস্তু গণনা শেখার ভিত মজবুত করে।',
        style: 'Kinesthetic'
      },
      {
        title: 'ভিজ্যুয়াল চার্ট ও ফ্লো ডায়েরি',
        description: 'যোগ-বিয়োগ-গুণ-ভাগের ধাপগুলো সুন্দর কার্টুন চিত্রের মাধ্যমে স্টেপ-বাই-স্টেপ এঁকে বোর্ডে ঝুলিয়ে রাখুন।',
        style: 'Visual'
      },
      {
        title: 'সংখ্যা ধাঁধা ও গণিত গেম',
        description: 'ক্লাসে মাঝে মাঝে সুডোকু, কার্ড মেলানো বা সংখ্যার কুইজ খেলুন। গণিতকে নীরস বইয়ের বদলে আনন্দের মাধ্যম করুন।',
        style: 'Gamification'
      }
    ],
    actionPlan: [
      'দৈনিক ৫টি করে একদম সহজ ও প্র্যাক্টিক্যাল অংক সমাধান দিয়ে আত্মবিশ্বাস বাড়ানো।',
      'কথার অংকগুলোকে বাস্তব জীবনের উদাহরণ দিয়ে উপস্থাপন করা (যেমন: আম কেনা বা খেলনা বিতরণ)।',
      'ভুল উত্তরের জন্য নম্বর না কেটে অংক করার পদ্ধতির সঠিক ধাপগুলোর জন্য আংশিক নম্বর দেওয়া।'
    ]
  },
  {
    id: 'art-attention',
    category: 'Attention',
    title: 'শ্রেণীকক্ষে মনোযোগের ঘাটতি ও অস্থিরতা নিয়ন্ত্রণ',
    subtitle: 'অ্যাটেনশন স্প্যান বৃদ্ধি ও ফোকাস ধরে রাখার মন্ত্র',
    readTime: '৫ মিনিট রিড',
    problemStatement: 'কোনো দীর্ঘ ক্লাসে শিক্ষার্থী অস্থির হয়ে পড়া, জানালা দিয়ে বাইরে তাকিয়ে থাকা বা সহপাঠীদের সাথে অনবরত দুষ্টুমি করা।',
    symptoms: [
      'শিক্ষকের কথা ৫ মিনিটের বেশি মনোযোগ দিয়ে না শুনতে পারা',
      'পড়া শুরু করার কিছুক্ষণ পরেই অন্যমনস্ক হয়ে যাওয়া',
      'অস্থিরভাবে ডেক্স নাড়ানো বা ক্লাসরুমে অলস বসে থাকা'
    ],
    strategies: [
      {
        title: 'পোমোদোরো ও ছোট সেশন (Chunking)',
        description: 'টানা ৪০ মিনিট না পড়িয়ে ক্লাসকে ১৫ মিনিটের ছোট ব্লকে ভাগ করুন। মাঝে ১ মিনিটের জন্য সবাই উঠে দাঁড়িয়ে হাত নাড়ানোর স্ট্রেচিং গেম করবে।',
        style: 'Kinesthetic & Mindful'
      },
      {
        title: 'আই-কন্টাক্ট ও বিশেষ সিট বিন্যাস',
        description: 'সহজেই মনোযোগ হারানো শিক্ষার্থীদের শিক্ষকের ঠিক সামনের বেঞ্চে বসার ব্যবস্থা করুন। কথা বলার সময় চোখের দিকে তাকিয়ে কুশল বিনিময় করুন।',
        style: 'Environmental'
      },
      {
        title: 'বিশেষ দায়িত্ব প্রদান (Empowerment)',
        description: 'খাতা বিতরণ, বোর্ড মোছা বা ক্লাসের রোল কল করার মতো ছোট দায়িত্ব তাকে দিন। এতে শিক্ষার্থীর মন ক্লাসরুমের কাজে নিবিষ্ট থাকবে।',
        style: 'Social & Emotional'
      }
    ],
    actionPlan: [
      'ক্লাসের মাঝে কোনো শিক্ষার্থী বেশি অস্থির হয়ে উঠলে তাকে একটু পানি পানের বিরতি দিন বা বাইরে থেকে হেটে আসতে বলুন।',
      'ক্লাসরুমে খুব উজ্জ্বল বা অপ্রয়োজনীয় পোস্টার সরিয়ে রাখুন যা মনোযোগ বিঘ্নিত করতে পারে।',
      'যেকোনো ফোকাসড কাজের সমাপ্তিতে তাকে মৌখিক সাধুবাদ বা ডায়েরিতে স্টার মার্ক দিন।'
    ]
  },
  {
    id: 'art-memory',
    category: 'Memory',
    title: 'স্মৃতিশক্তি ও ধারণক্ষমতা বৃদ্ধির বৈজ্ঞানিক উপায়',
    subtitle: 'স্পেসড রিপিটেশন ও ভিজ্যুয়াল মেমোরি হ্যাকস',
    readTime: '৪ মিনিট রিড',
    problemStatement: 'শিক্ষার্থী আজ ক্লাসে পড়া শিখে বাড়ি গেল, কিন্তু পরের দিনই ক্লাসে এসে সব পড়া ভুলে যাওয়ার সাধারণ কিন্তু গুরুতর সমস্যা।',
    symptoms: [
      'পড়াশোনা করার সাথে সাথেই ভুলে যাওয়া',
      'পরীক্ষার খাতায় প্রশ্নের উত্তর আংশিক মনে করতে পারা',
      'একই পড়া মুখস্থ করতে অস্বাভাবিক বেশি সময় নেওয়া'
    ],
    strategies: [
      {
        title: 'মাইন্ড ম্যাপিং (Mind Mapping)',
        description: 'যেকোনো বড় অধ্যায় বা ঘটনার সারাংশ রঙিন ড্রয়িং বা ছকের মাধ্যমে খাতায় এঁকে দেখান। ভিজ্যুয়াল ম্যাপ সহজে মস্তিষ্কে স্থায়ী হয়।',
        style: 'Visual'
      },
      {
        title: 'সহজ ছড়া ও মেমোনিক (Mnemonics)',
        description: 'কঠিন বিষয়গুলোকে ছন্দবদ্ধ ছড়া বা সংক্ষেপণে রূপ দিন (যেমন: রংধনুর সাত রঙ মনে রাখতে "বেনীআসহকলা")।',
        style: 'Auditory'
      },
      {
        title: '৩-ধাপের পুনরাবৃত্তি (Spaced Repetition)',
        description: 'একই পড়া প্রথম দিন শেখানোর পর ৩ দিন পর এবং ৭ দিন পর সংক্ষেপে পুনর্বিবেচনা বা রিভিশন টেস্ট নিন।',
        style: 'Cognitive'
      }
    ],
    actionPlan: [
      'পড়াশোনার পাশাপাশি পর্যাপ্ত ঘুম ও পুষ্টিকর খাবার গ্রহণের গুরুত্ব অভিভাবকদের বুঝিয়ে বলা।',
      'বাচ্চাকে কোনো পড়া মুখস্থ করার বদলে অন্য কাউকে সেই পড়াটি "শিক্ষক সেজে" বোঝাতে বলা।',
      'পড়া মনে রাখার জন্য অতিরিক্ত চাপ প্রয়োগ না করে আত্মবিশ্বাস তৈরি করা।'
    ]
  },
  {
    id: 'art-comm',
    category: 'Comm',
    title: 'লাজুক ও অন্তর্মুখী শিক্ষার্থীর মাঝে সাবলীলতা বৃদ্ধি',
    subtitle: 'যোগাযোগ দক্ষতা ও জড়তাহীন দলগত আলোচনা',
    readTime: '৫ মিনিট রিড',
    problemStatement: 'কোনো শিক্ষার্থী প্রশ্ন করতে অত্যন্ত ভয় পায়, সহপাঠীদের সাথে মেশে না এবং শ্রেণীকক্ষে সবসময় কোণঠাসা হয়ে গুটিয়ে থাকে।',
    symptoms: [
      'বোর্ডের সামনে এসে কথা বলতে বা দাঁড়িয়ে উত্তর দিতে শরীর কাঁপানো',
      'গ্রুপ ওয়ার্কে অংশগ্রহণ করতে অস্বীকৃতি জানানো',
      'অত্যন্ত মৃদু স্বরে কথা বলা যা শুনতে কষ্টকর হয়'
    ],
    strategies: [
      {
        title: 'একান্ত আলোচনা (One-on-One Warmup)',
        description: 'পুরো ক্লাসের সামনে কথা বলতে না বলে টিফিন বিরতিতে বা ক্লাসের শেষে একান্তে তার মনের কথা শুনুন ও তার পছন্দের বিষয়ে আলাপ জমান।',
        style: 'Emotional Connection'
      },
      {
        title: 'ছোট গ্রুপ থেরাপি (Collaborative Circles)',
        description: '৩-৪ জনের ছোট একটি দলে তাকে অন্তর্ভুক্ত করুন যেখানে সবাই সহজ ও হাসিখুশি চরিত্রের। ধীরে ধীরে দলে তার মতামত গুরুত্ব দিন।',
        style: 'Social Practice'
      },
      {
        title: 'ভূমিকা অভিনয় (Role Play & Drama)',
        description: 'গল্পের কোনো অতি সাধারণ চরিত্রের সংলাপ তাকে ক্লাসে পড়তে বা অভিনয় করতে বলুন। অন্য চরিত্রের আড়ালে লাজুকতা দূর হয়।',
        style: 'Interactive'
      }
    ],
    actionPlan: [
      'শিক্ষার্থীর ছোট একটি ইতিবাচক উত্তরের জন্যও ক্লাসের সবাইকে তালি দিতে বলা।',
      'কখনো তাকে প্রশ্ন করে সরাসরি না পারলে তিরস্কার বা ব্যঙ্গ না করা।',
      'লাজুক স্বভাবকে দুর্বলতা না বলে তার সুন্দর ব্যবহারের প্রশংসা করে তাকে সাহসী করা।'
    ]
  }
];

export default function TeacherGuidebook() {
  const [activeCategory, setActiveCategory] = useState<WeaknessCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return GUIDE_ARTICLES.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            article.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.problemStatement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.strategies.some(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleCopyPlan = (id: string, plan: string[]) => {
    const textToCopy = `শিক্ষক গাইডবুক অ্যাকশন প্ল্যান:\n\n${plan.map((p, idx) => `${idx + 1}. ${p}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="teacher-guidebook" className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-12 transition-all duration-300">
      
      {/* Guidebook Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-indigo-950/80 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-400/20">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">
              শিক্ষাবিজ্ঞান ও রিসোর্স (Pedagogy & Mentorship)
            </span>
          </div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>শ্রেণী শিক্ষক গাইডবুক ও শিক্ষণ কৌশল লাইব্রেরি</span>
          </h3>
          <p className="text-xs text-slate-400">
            শিক্ষার্থীদের মনস্তাত্ত্বিক উন্নয়ন, মনোযোগ ও দুর্বলতা কাটিয়ে তুলতে বৈজ্ঞানিক সমাধান ও শিক্ষণ পদ্ধতি।
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="পদ্ধতি বা কৌশল খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 text-xs border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 p-4 border-b border-white/5 bg-slate-950/20">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
            activeCategory === 'All' 
              ? 'bg-indigo-600 text-white' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          সব গাইড (All)
        </button>
        {Object.entries(WeaknessCategoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeCategory === key 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Articles Content Container */}
      <div className="p-5 md:p-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <Compass className="w-10 h-10 text-slate-700 mx-auto animate-spin" />
            <p className="text-xs italic">অনুসন্ধানকৃত বিষয়ের ওপর কোনো গাইড আর্টিকেল পাওয়া যায়নি।</p>
            <p className="text-[11px] text-slate-600">দয়া করে কীওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন বা অন্য ক্যাটাগরি নির্বাচন করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                className="bg-slate-950/30 border border-white/5 rounded-2xl p-5.5 space-y-4 hover:border-indigo-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  
                  {/* Article Meta row */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                        {WeaknessCategoryLabels[article.category as WeaknessCategory] || 'সাধারণ'}
                      </span>
                      <h4 className="text-sm font-black text-white pt-1">{article.title}</h4>
                      <p className="text-xs text-slate-400">{article.subtitle}</p>
                    </div>

                    <span className="text-[10px] font-bold text-slate-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full shrink-0">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Problem statement */}
                  <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-[11px] text-rose-300 leading-relaxed">
                    <strong>সমস্যার ধরন:</strong> {article.problemStatement}
                  </div>

                  {/* Symptoms bullet point matrix */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">লক্ষণসমূহ (Symptoms):</span>
                    <ul className="grid grid-cols-1 gap-1 pl-4 list-disc text-[11px] text-slate-300">
                      {article.symptoms.map((sym, idx) => (
                        <li key={idx} className="leading-relaxed">{sym}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Strategies Grid */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> শিক্ষণ কৌশল (Instructional Strategies):
                    </span>
                    <div className="space-y-2">
                      {article.strategies.map((strategy, idx) => (
                        <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-white/5 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-indigo-300">{strategy.title}</span>
                            <span className="text-[9px] text-slate-500 font-bold bg-white/5 px-1.5 py-0.5 rounded">
                              {strategy.style}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Practical Action Plan Box */}
                <div className="pt-4 border-t border-white/5 mt-4 space-y-2 bg-slate-950/20 p-3.5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                      <BookOpenCheck className="w-3.5 h-3.5 text-indigo-400" /> ক্লাসরুম অ্যাকশন প্ল্যান (Action Plan):
                    </span>
                    <button
                      onClick={() => handleCopyPlan(article.id, article.actionPlan)}
                      className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                      title="অ্যাকশন প্ল্যানটি কপি করুন"
                    >
                      {copiedId === article.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>কপি প্ল্যান</span>
                        </>
                      )}
                    </button>
                  </div>

                  <ol className="list-decimal pl-4 text-[11px] text-slate-300 space-y-1 leading-relaxed">
                    {article.actionPlan.map((step, idx) => (
                      <li key={idx} className="pl-0.5">{step}</li>
                    ))}
                  </ol>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
