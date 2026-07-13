import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  BookOpen, 
  Users, 
  UserCheck, 
  Smile, 
  Clock, 
  Smartphone, 
  Sparkles, 
  CheckSquare, 
  FileText, 
  Lightbulb, 
  Award, 
  Presentation,
  CheckCircle2
} from 'lucide-react';

// Interfaces for our slides
interface Slide {
  number: number;
  title: string;
  subtitle: string;
  points: string[];
  visualMetaphor: string;
  icon: React.ReactNode;
  implementationTip: string;
}

interface PresentationData {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  colorClass: string;
  accentColor: string;
  aiPrompt: string;
  slides: Slide[];
}

export default function PresentationGuide() {
  const [activeTab, setActiveTab] = useState<string>('student-3-4');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [promptCopied, setPromptCopied] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    'prep-1': true,
    'prep-2': false,
    'prep-3': false,
    'teach-1': false,
    'teach-2': false,
    'parent-1': false,
    'parent-2': false,
  });

  const handleToggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const presentations: PresentationData[] = [
    {
      id: 'student-3-4',
      title: '৩য়-৪র্থ শ্রেণির শিক্ষার্থীদের প্রেজেন্টেশন',
      targetAudience: '৩য় ও ৪র্থ শ্রেণির কোমলমতি শিক্ষার্থী',
      description: 'সহজ শব্দ, গ্যামিফাইড মেথড এবং পজিটিভ রিইনফোর্সমেন্ট ব্যবহার করে বাচ্চাদেরকে প্রগতি খাতা পূরণ, মোবাইল কমানো এবং আদব-কায়দা শেখানোর আকর্ষক গাইড।',
      colorClass: 'from-cyan-600 to-blue-700 shadow-cyan-500/20',
      accentColor: 'text-cyan-400',
      aiPrompt: `You are an expert educational presentation designer. Write a highly engaging, visual, and gamified PowerPoint presentation outline of 10 slides for Class 3-4 (3rd & 4th grade) students of D-Likon Model School.
The objective of the presentation is to inspire young kids to love and use their "Student Progress & Intervention Sheet" (প্রগতি খাতা) every day, track their home activities (Home-Time Monitoring), practice good behaviors/manners, reduce phone screen time, and get their teachers' and parents' daily signatures.
Use friendly, kid-appropriate, motivational Bengali. Keep slide content concise, with clear slide title, colorful bullet points, a visual description/illustration prompt for AI generation, and a call-to-action on each slide. Format with professional layout instructions.`,
      slides: [
        {
          number: 1,
          title: "স্বাগতম! আমাদের নতুন প্রগতি খাতার মজার সফর 🌟",
          subtitle: "আমাদের জীবনের সুন্দর অভ্যাস গড়ার অ্যাডভেঞ্চার ম্যাপ!",
          points: [
            "আজ থেকে আমরা শুরু করতে যাচ্ছি একটি দুর্দান্ত মজার খেলা!",
            "এই খেলার নাম 'আমার প্রগতি খাতা সফর'!",
            "আমাদের প্রত্যেকের হাতে একটি করে সুন্দর এ৪ সাইজের রঙের ছক দেয়া হয়েছে।"
          ],
          visualMetaphor: "An animated children character wearing a superhero cape holding a shiny gold progress scroll, surrounded by small cartoon stars and smiley faces.",
          icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
          implementationTip: "শিক্ষার্থীদের বলুন এটি কোনো পরীক্ষার খাতা নয়, এটি তাদের সুপারপাওয়ার উন্নত করার একটি ম্যাজিক ম্যাপ!"
        },
        {
          number: 2,
          title: "এই জাদুকরী ছকটি আসলে কী? 🤔",
          subtitle: "আমাদের সাহায্যকারী পরম বন্ধু!",
          points: [
            "এটি একটি জাদুকরী প্রগতি ছক বা ম্যাট্রিক্স!",
            "এখানে প্রতিদিন আমাদের ভালো কাজের বিবরণ লেখা থাকবে।",
            "আমাদের কোন বিষয়ে কষ্ট হয় আর কোন বিষয়ে আমরা সেরা, তা এটি সহজে মনে রাখে।"
          ],
          visualMetaphor: "A friendly, smiling cartoon magnifying glass looking at a beautifully colored progress table with green stars and happy emoji icons.",
          icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
          implementationTip: "বাচ্চাদেরকে ছকের কলামগুলো আঙুল দিয়ে দেখিয়ে দিন এবং বলুন প্রতিটি কলাম তাদের এক একটি ভালো গুণের বন্ধু।"
        },
        {
          number: 3,
          title: "আমার নিজের নাম, রোল ও সুন্দর পরিচয় 🏷️",
          subtitle: "আমি আমার খাতার গর্বিত মালিক!",
          points: [
            "ছকের ঠিক ওপরে বড় করে লেখা আছে আমাদের নিজের নাম, শ্রেণী ও রোল!",
            "এটি দেখে আমরা বুঝতে পারি যে এই প্রগতি যাত্রাটি শুধুমাত্র আমার নিজের উন্নতির জন্য।",
            "আমরা আমাদের খাতাটিকে খুব যত্ন করে ফাইলে সাজিয়ে রাখবো।"
          ],
          visualMetaphor: "Close-up of the elegant top section of the Bengali progress card where the student's name is hand-written beautifully in shining golden ink.",
          icon: <Award className="w-6 h-6 text-cyan-400" />,
          implementationTip: "শিক্ষার্থীদের নিজেদের নাম সুন্দরভাবে উচ্চারণ করতে বলুন এবং তাদের খাতার ওপরে হাত বুলিয়ে একটি দায়িত্ববোধ জাগ্রত করুন।"
        },
        {
          number: 4,
          title: "হোম-টাইম মনিটরিং: সময়ের আসল রাজা ⏰",
          subtitle: "স্কুলের বাইরের সময়টাও যখন হবো আমরা সেরা!",
          points: [
            "স্কুল শেষ হওয়ার পর বাড়িতে আমরা কখন পড়ি, কখন খেলি আর কখন ঘুমাই?",
            "বাড়ির সুন্দর সময়টিকে সুশৃঙ্খলভাবে সাজানোই হলো 'হোম-টাইম মনিটরিং'।",
            "বাড়িতে পড়াশোনার সময় ও খেলার সময় ভাগ করে নিয়ে আমরা হবো সময়ের সেরা রাজা!"
          ],
          visualMetaphor: "A cute round alarm clock with tiny cartoon hands and legs, smiling and wearing a small king's crown, next to a structured daily plan board.",
          icon: <Clock className="w-6 h-6 text-cyan-400" />,
          implementationTip: "বাড়িতে ঘড়ি দেখে কাজ করাকে একটি খেলা হিসেবে উপস্থাপন করুন। যেমন: নির্দিষ্ট সময়ে পড়া শুরু করলে একটি মনে মনে বড় হাততালি!"
        },
        {
          number: 5,
          title: "মিষ্টি আচরণ ও চমৎকার ম্যানার চর্চা 🌸",
          subtitle: "আমাদের মুখের কথায় ও কাজে ছড়িয়ে পড়ুক মিষ্টি আলো!",
          points: [
            "সবাইকে সালাম দেয়া, হাসিমুখে কথা বলা এবং বড়দের সম্মান করা আমাদের লক্ষ্য।",
            "কেউ সাহায্য করলে 'ধন্যবাদ' বলা আর কোনো ভুল হলে 'দুঃখিত' বলা শিখবো।",
            "আমাদের সুন্দর ব্যবহারের জন্য শিক্ষকেরা এই ছকে দারুণ প্রশংসার কথা লিখবেন!"
          ],
          visualMetaphor: "Two young school students in clean uniforms, bowing slightly with respectful smiles, sharing a book, with small colorful flowers blooming around them.",
          icon: <Smile className="w-6 h-6 text-cyan-400" />,
          implementationTip: "শ্রেণীকক্ষে কয়েকটি ভালো ম্যানারের অভিনয় করে দেখান, যেমন সাহায্য চাইলে কীভাবে ধন্যবাদ বলতে হয়।"
        },
        {
          number: 6,
          title: "কাজের ছক ও প্রতিদিনের সই ✍️",
          subtitle: "শিক্ষক ও মা-বাবার প্রিয় সই পাওয়ার আনন্দ!",
          points: [
            "প্রতিদিন ক্লাস শেষ করার পর আমাদের প্রিয় শিক্ষক আমাদের কাজ দেখে খাতায় সই করবেন।",
            "বাড়িতে গিয়ে মা-বাবা আমাদের সাহায্য করবেন এবং তারাও আদর করে সই দিয়ে দেবেন।",
            "এই সইগুলো আমাদের প্রতিদিনের দায়িত্বশীলতার একেকটি সোনার মেডেল!"
          ],
          visualMetaphor: "A large wooden pencil with a smiling face, hand-in-hand with a golden fountain pen, stepping onto a signature line decorated with tiny stars.",
          icon: <UserCheck className="w-6 h-6 text-cyan-400" />,
          implementationTip: "জানান যে প্রতিদিন ক্লাসের হাজিরা ডাকার পরপরই শিক্ষকেরা এসে মিষ্টি হেসে খাতায় সই করে দেবেন।"
        },
        {
          number: 7,
          title: "মোবাইল ফোন বনাম বইয়ের বন্ধু 📱📚",
          subtitle: "ডিজিটাল ডিভাইস কমিয়ে পড়াশোনায় মনোযোগ বাড়ানোর কৌশল!",
          points: [
            "মোবাইল স্ক্রিনের চেয়ে কাগজের রঙিন বই আমাদের চোখের অনেক বড় বন্ধু!",
            "আমরা খাওয়ার সময় বা ঘুমানোর আগে মোবাইল একদম স্পর্শ করবো না।",
            "মোবাইল না দেখে ছবি আঁকলে বা গল্প পড়লে আমাদের মস্তিষ্ক আরও বুদ্ধিমান হবে।"
          ],
          visualMetaphor: "A funny cartoon hand closing a dark phone screen, and on the other side opening a giant pop-up book full of castles, rockets, and smart animals.",
          icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
          implementationTip: "মোবাইলে স্ক্রিন টাইমের জন্য অভিভাবকের নির্দেশনা মেনে চলা শিক্ষার্থীদের কাছে অত্যন্ত জরুরি বলে বুঝিয়ে দিন।"
        },
        {
          number: 8,
          title: "আমার সেরা উপহার: সুন্দর স্বভাব ও চমৎকার অভ্যাস 🎁",
          subtitle: "যা আমাদের সবাইকে ভালোবাসতে শেখায়!",
          points: [
            "ভালো অভ্যাসের চেয়ে দামি কোনো উপহার পৃথিবীতে নেই!",
            "নিয়মিত হাত ধোয়া, নখ কাটা, জুতো গুছিয়ে রাখা এবং নিজের পড়ার টেবিল গোছানো।",
            "ছোট ছোট এই জাদুকরী কাজগুলোই আমাদের চমৎকার মানুষ হিসেবে গড়ে তুলবে।"
          ],
          visualMetaphor: "A beautiful open gift box with colorful light beams, small hearts, and glowing words like 'Manners', 'Discipline', 'Cleanliness' coming out.",
          icon: <Award className="w-6 h-6 text-cyan-400" />,
          implementationTip: "বাচ্চাদের বলুন নিজের পড়ার টেবিল নিজে গোছালে মা-বাবার চোখে তারা কতোটা বড় সুপারহিরো হয়ে ওঠে!"
        },
        {
          number: 9,
          title: "ভুল হলে ভয় নেই, আমরা প্রতিনিয়ত শিখছি! 🤝",
          subtitle: "ভুল থেকেই হয় নতুন সব সুন্দর পথ চলা!",
          points: [
            "যদি কোনোদিন আমরা কম ভালো করি বা প্রগতি সংকেত লাল বা হলুদ হয়, ভয় পাবো না!",
            "আমাদের শিক্ষকেরা এবং মা-বাবা আমাদের পরম বন্ধু, তাঁরা আমাদের পাশে আছেন।",
            "আমরা প্রতিদিন আরেকটু ভালো করার চেষ্টা করবো এবং জয়ী হবো।"
          ],
          visualMetaphor: "A compassionate teacher character smiling warmly, sitting beside a student, placing a gentle encouraging hand on the student's shoulder.",
          icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
          implementationTip: "লাল বা হলুদ সিগন্যালকে শাস্তির সংকেত না বলে 'মনোযোগ বাড়ানোর সুযোগ' হিসেবে অভিহিত করে আশ্বস্ত করুন।"
        },
        {
          number: 10,
          title: "চলো শুরু করি প্রগতির সফর! 🚀🎉",
          subtitle: "ডি-লিকন মডেল স্কুলের গর্বিত ও সেরা শিক্ষার্থী হব!",
          points: [
            "আজ থেকেই আমরা আমাদের প্রগতি ছকটি ব্যবহার করা শুরু করবো।",
            "আমরা প্রতিদিন সুন্দর আচরণ চর্চা করবো ও হোম-টাইম ডায়েরি মেনে চলবো।",
            "আমাদের প্রগতির গল্প শুনে সবাই অনেক খুশি হবেন। তোমরা কি সবাই প্রস্তুত?"
          ],
          visualMetaphor: "A joyful group of diverse school children throwing colorful paper airplanes into the sky in front of the D-Likon Model School building under a blue sky.",
          icon: <Presentation className="w-6 h-6 text-cyan-400" />,
          implementationTip: "সকল শিক্ষার্থীকে একসাথে 'আমি প্রস্তুত!' বলে হাততালি দিতে বলুন যাতে তাদের ভেতর অনুপ্রেরণা সৃষ্টি হয়।"
        }
      ]
    },
    {
      id: 'student-5-6',
      title: '৫ম-৬ষ্ঠ শ্রেণির শিক্ষার্থীদের প্রেজেন্টেশন',
      targetAudience: '৫ম ও ৬ষ্ঠ শ্রেণির উদীয়মান শিক্ষার্থী',
      description: 'আত্মনিয়ন্ত্রণ, সুশৃঙ্খল সময় ব্যবস্থাপনা, পড়াশোনায় শৃঙ্খলা এবং পজিটিভ ক্যারেক্টার বিল্ডিংয়ের ১০টি আকর্ষণীয় ও অনুপ্রেরণাদায়ক স্লাইড রূপরেখা।',
      colorClass: 'from-blue-600 to-indigo-700 shadow-blue-500/20',
      accentColor: 'text-blue-400',
      aiPrompt: `You are an expert curriculum and educational slide creator. Create a highly professional, interactive, and target-oriented 10-slide PowerPoint presentation outline for Class 5-6 (5th & 6th grade) students of D-Likon Model School.
The presentation must convince these pre-teens of the immense benefit of using the "Student Progress & Intervention Matrix" (প্রগতি পর্যবেক্ষণ ছক). It must emphasize how it fosters self-discipline, tracks current learning against their baseline, guides home study schedules, restricts excessive phone addiction, rewards elite manners/manners cultivation, and bridges feedback with school teachers.
Write in clear, structured, and intellectual yet encouraging Bengali. For each slide, define the Title, Subtitle, clear high-impact bullet points, AI image generation visual prompt, and an active teacher execution strategy tip.`,
      slides: [
        {
          number: 1,
          title: "সাফল্যের চাবিকাঠি: আমার সুশৃঙ্খল প্রগতি যাত্রা 🗝️✨",
          subtitle: "স্বপ্ন পূরণের প্রথম ধাপ নিজের কাজ নিজে সাজানো!",
          points: [
            "আমরা এখন বড় হচ্ছি, তাই আমাদের দায়িত্বও অনেক বৃদ্ধি পাচ্ছে।",
            "সফল মানুষের প্রধান বৈশিষ্ট্য হলো তারা নিজেদের কাজ নিজে পরিচালনা করে।",
            "ডি-লিকন মডেল স্কুলের এই প্রগতি ম্যাট্রিক্স আমাদের দিনটিকে সফলভাবে পরিচালনা করতে শেখাবে।"
          ],
          visualMetaphor: "A sleek modern key styled with binary code and educational icons, opening a heavy door with brilliant sunrise light shining through.",
          icon: <Sparkles className="w-6 h-6 text-blue-400" />,
          implementationTip: "শিক্ষার্থীদের কাছে শৃঙ্খলা শব্দটিকে কঠিন কোনো নিয়মের বদলে একটি সাফল্যের চাবিকাঠি হিসেবে ব্যাখ্যা করুন।"
        },
        {
          number: 2,
          title: "প্রগতি ছক: আমার নিজের যোগ্যতার সুন্দর আয়না 🪞📖",
          subtitle: "আমি আজ কতোটা উন্নত হলাম, তা নিজেই দেখবো!",
          points: [
            "এই প্রগতি ছকটি কোনো পরীক্ষা বা কঠিন নম্বরের বোঝা নয়।",
            "এটি হলো একটি নিখুঁত আয়না, যা আমাদের পড়ালেখার অগ্রগতি ও আচরণের আসল রূপ দেখায়।",
            "এর মাধ্যমে আমরা প্রতিদিন আমাদের শক্তি ও উন্নতির ক্ষেত্রগুলো সহজেই ট্র্যাক করতে পারবো।"
          ],
          visualMetaphor: "A clean minimalist open notebook where page lines reflect a gentle gradient of colors, forming a smooth mirror reflection of a smiling student.",
          icon: <BookOpen className="w-6 h-6 text-blue-400" />,
          implementationTip: "শিক্ষার্থীদের বুঝিয়ে বলুন যে এই খাতার মাধ্যমে তারা নিজের কাজের বস নিজেই হতে পারবে।"
        },
        {
          number: 3,
          title: "হোম-টাইম মনিটরিং: বাড়ির সময়ের শ্রেষ্ঠ ব্যবহার 🏡⏱️",
          subtitle: "পড়ালেখা ও বিনোদনের সেরা সমন্বয়!",
          points: [
            "স্কুলের বাইরের ২৪ ঘণ্টার মধ্যে গড়ে ১৪ ঘণ্টাই আমরা বাড়িতে অতিবাহিত করি।",
            "এই হোম-টাইমকে সুবিন্যস্ত করতে পারলে আমাদের শিখন ক্ষমতা দ্বিগুণ বেড়ে যাবে।",
            "নির্দিষ্ট সময়ে পড়াশোনা, সময়মতো পর্যাপ্ত ঘুম এবং পরিমিত অবসর আমাদের দিনটিকে সুন্দর করবে।"
          ],
          visualMetaphor: "A divided circular layout chart displaying a balance of books (study), a playground (recreation), and a bed with a moon icon (sleep), under a golden sun.",
          icon: <Clock className="w-6 h-6 text-blue-400" />,
          implementationTip: "হোম-টাইমে যেন পড়াশোনা ও খেলাধুলা দুটির জন্যই সুস্থ ব্যালেন্স থাকে তা শিক্ষার্থীদের সাথে শেয়ার করুন।"
        },
        {
          number: 4,
          title: "আদব-কায়দা ও ম্যানার চর্চা: একজন আদর্শ মানুষ 🤝🌟",
          subtitle: "আমাদের আচরণের মাধুর্যই আমাদের আসল ব্যক্তিত্ব!",
          points: [
            "জ্ঞান অর্জনের পাশাপাশি সুন্দর ব্যবহার আমাদের সবচেয়ে সেরা অলঙ্কার।",
            "সহপাঠীদের সাহায্য করা, ক্লাসরুম পরিষ্কার রাখা এবং শিক্ষকদের শ্রদ্ধাভরে সম্ভাষণ জানানো।",
            "সুন্দর ম্যানার চর্চার মাধ্যমে আমরা সমাজ ও স্কুলের সবার মন অনায়াসে জয় করতে পারি।"
          ],
          visualMetaphor: "A hand-drawn tree of values where leaves represent core polite manners written in beautiful Bengali typography like 'সালাম', 'কৃতজ্ঞতা', 'শ্রদ্ধা'.",
          icon: <Smile className="w-6 h-6 text-blue-400" />,
          implementationTip: "প্রতিদিন যেকোনো একটি ছোট শিষ্টাচার (যেমন: কথা বলার সময় আই-কন্টাক্ট বজায় রাখা) ক্লাসে চর্চা করার অভ্যাস তৈরি করুন।"
        },
        {
          number: 5,
          title: "শিক্ষকের সই: ক্লাসে আমাদের প্রথম ৩ মিনিট ✒️🏫",
          subtitle: "হাজিরা ডাকার পরপরই আমাদের কাজের স্বীকৃতি!",
          points: [
            "প্রতিদিন ক্লাসে হাজিরা ডাকার পরপরই আমাদের সম্মানিত শিক্ষক আমাদের ছকটি পরীক্ষা করবেন।",
            "আমাদের পড়ালেখার প্রগতি দেখে তিনি সেখানে সই ও স্নেহময় উপদেশ লিখে দেবেন।",
            "এই সই আমাদের আত্মবিশ্বাস ও কাজের প্রতি একাগ্রতা বহুলাংশে বাড়িয়ে তুলবে।"
          ],
          visualMetaphor: "An overhead clean workspace view showing a hand using an elegant blue ink pen to sign a stylized checkmark onto a student matrix.",
          icon: <UserCheck className="w-6 h-6 text-blue-400" />,
          implementationTip: "শিক্ষকদের অনুরোধ করুন হাজিরা ডাকার পরপরই প্রতিটি শিক্ষার্থীর কাছে গিয়ে ১-২টি ভালো কাজের প্রশংসা করে সীট সাইন করার।"
        },
        {
          number: 6,
          title: "ডিজিটাল ডিটক্স: মোবাইল ফোনের সঠিক নিয়ন্ত্রণ 📱🚫",
          subtitle: "মোবাইল আমাদের নিয়ন্ত্রণ করবে না, আমরা মোবাইল নিয়ন্ত্রণ করবো!",
          points: [
            "মোবাইলে ঘন্টার পর ঘন্টা গেম খেলা বা ভিডিও দেখা আমাদের মনোযোগ নষ্ট করে।",
            "আমরা খাওয়ার সময়, পড়ার সময় এবং ঘুমের অন্তত ১ ঘণ্টা পূর্বে মোবাইল ফোন ব্যবহার করবো না।",
            "ডিভাইসের আসক্তি কমিয়ে আমরা সৃজনশীল বই পড়বো, নতুন কিছু আঁকবো বা খেলবো।"
          ],
          visualMetaphor: "A dynamic flat design graphic illustrating an hourglass where physical sand grains transform into flying birds and green trees as they pass through.",
          icon: <Smartphone className="w-6 h-6 text-blue-400" />,
          implementationTip: "মোবাইলের অতিরিক্ত আসক্তির কুফলগুলোকে খুব সহজ উদাহরণ দিয়ে বুঝিয়ে দিন যাতে তারা নিজেরাই অনুতপ্ত হয়।"
        },
        {
          number: 7,
          title: "সুপ্ত প্রতিভার বিকাশ ও বিশেষ গুণের স্বীকৃতি 🎨🎭",
          subtitle: "আমার মাঝে লুকিয়ে আছে এক অসাধারণ আমি!",
          points: [
            "আমাদের সবারই পড়াশোনার বাইরে কোনো না কোনো বিষয়ে সুপ্ত প্রতিভা রয়েছে।",
            "কেউ ছবি আঁকতে ভালোবাসি, কেউ ভালো বিতর্ক করতে পারি, কেউবা চমৎকার ছড়া লিখতে পারি।",
            "এই প্রগতি ছকে আমাদের সেই সুপ্ত প্রতিভার কথা সযত্নে লিপিবদ্ধ করা হবে এবং পুরস্কৃত করা হবে।"
          ],
          visualMetaphor: "A bright creative lightbulb with gear symbols inside, surrounded by colorful splashing paint, musical notes, and science orbit rings.",
          icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
          implementationTip: "প্রতিটি শিক্ষার্থীর লুকানো প্রতিভাকে উৎসাহিত করুন এবং প্রগতি খাতায় তার বিশেষ গুণের জন্য প্রশংসা উল্লেখ করুন।"
        },
        {
          number: 8,
          title: "বেসলাইন বনাম বর্তমান অবস্থা: আমার আসল লড়াই 📈💪",
          subtitle: "অন্য কারো সাথে নয়, আজ আমার লড়াই কেবল আমার অতীতের সাথে!",
          points: [
            "বেসলাইন হলো আমাদের প্রথম দিকের অবস্থা, যেখান থেকে আমরা শুরু করেছিলাম।",
            "আমাদের বর্তমান প্রগতি দেখাবে আমরা কতটা উন্নতি করেছি এবং নতুন কী শিখেছি।",
            "প্রতিদিন একটু একটু করে এগিয়ে যাওয়াই হলো আমাদের মূল লক্ষ্য ও সাফল্য।"
          ],
          visualMetaphor: "A multi-layered 3D bar chart with path arrows climbing higher and higher from a lower base level towards a bright green flag at the peak.",
          icon: <Award className="w-6 h-6 text-blue-400" />,
          implementationTip: "সহপাঠীদের সাথে তুলনা না করে শিক্ষার্থীর নিজস্ব বেসলাইন থেকে বর্তমান উন্নতির প্রশংসা করুন।"
        },
        {
          number: 9,
          title: "প্রগতি সংকেত: লক্ষ্য অর্জনের দিকনির্দেশক 🚥🎯",
          subtitle: "সংকেত যাই হোক, আমাদের লক্ষ্য অবিরাম প্রবৃদ্ধি!",
          points: [
            "সবুজ সংকেত (🔴/🟡/🟢): সবুজ আমাদের চমৎকার অগ্রগতির চিহ্ন।",
            "হলুদ বা লাল সংকেত দেখে ভয় পাওয়ার কিছু নেই, এটি আমাদের সর্তক করে যে আরও একটু চেষ্টা করতে হবে।",
            "সংকেত পরিবর্তনের জন্য আমরা শিক্ষকদের বিশেষ মেন্টরিং ও পরামর্শ গ্রহণ করবো।"
          ],
          visualMetaphor: "Three futuristic vertical glowing orb rings (Red, Amber, Green) floating neatly above a clean reflective technological background matrix.",
          icon: <CheckSquare className="w-6 h-6 text-blue-400" />,
          implementationTip: "লাল বা হলুদ সিগন্যাল পেলে শিক্ষক হিসেবে তাদের স্নেহ করে বিশেষ মনোযোগ প্রদান করুন।"
        },
        {
          number: 10,
          title: "ডি-লিকন মডেল স্কুলের গর্ব: আমরাই আগামীর আলো 🚀🎓",
          subtitle: "আমাদের সুশৃঙ্খল অভ্যাসের শক্তি আমাদের বহুদূর নিয়ে যাবে!",
          points: [
            "এই প্রগতি ম্যাট্রিক্সের সফল ব্যবহার আমাদের ক্লাসের সেরা শিক্ষার্থী হতে সাহায্য করবে।",
            "আমরা প্রতিদিন সুন্দর ব্যবহার করবো, মা-বাবা ও শিক্ষকদের সই নিয়ে নিজেকে এগিয়ে রাখবো।",
            "চলো আমরা সবাই আমাদের সেরাটা দেওয়ার অঙ্গীকার করি এবং নিজেদের নতুন উচ্চতায় নিয়ে যাই!"
          ],
          visualMetaphor: "A dramatic final slide showing a bright group of school kids standing confidently on top of a peak looking towards a bright starry cosmos.",
          icon: <Presentation className="w-6 h-6 text-blue-400" />,
          implementationTip: "উপস্থিত শিক্ষার্থীদের বলুন এই প্রগতি খাতাটি তাদের ভবিষ্যতের সাফল্যের এক উজ্জ্বল দলিল।"
        }
      ]
    },
    {
      id: 'student-7-8',
      title: '৭ম-৮ম শ্রেণির শিক্ষার্থীদের প্রেজেন্টেশন',
      targetAudience: '৭ম ও ৮ম শ্রেণির কিশোর শিক্ষার্থী',
      description: 'নেতৃত্বের গুণাবলী, ভবিষ্যৎ লক্ষ্য নির্ধারণ, আত্ম-নিয়ন্ত্রণ, ডিজিটাল আসক্তি কমানো এবং ম্যাট্রিক্সের জটিল ডাটা বোঝার মাধ্যমে আত্মউন্নয়নের ১০ স্লাইডের পাওয়ার পয়েন্ট রূপরেখা।',
      colorClass: 'from-indigo-600 to-purple-700 shadow-indigo-500/20',
      accentColor: 'text-indigo-400',
      aiPrompt: `You are an expert high-school pedagogy specialist and presentation scriptwriter. Outline a 10-slide PowerPoint presentation in Bengali targeted at Class 7-8 (7th & 8th grade) students of D-Likon Model School.
The theme is "Leadership, Focus, and the Science of Personal Progress: My Progress Matrix". The goal is to make these mature students fully realize the extreme personal benefits of using this framework: establishing self-leadership, mastering home-time management, self-monitoring digital media usage/screen addiction, building professional and respectful manners, understanding baseline vs current competency analytics, and developing high-impact life habits.
Write with highly engaging, modern, and mature Bengali. Each slide must include: Slide Title, Subtitle, persuasive bullet points, visual concept instruction for AI slides, and a call-to-action/mentoring tip.`,
      slides: [
        {
          number: 1,
          title: "নেতৃত্ব ও লক্ষ্য অর্জন: আমার প্রগতি ম্যাট্রিক্স 🚀🧭",
          subtitle: "নিজের জীবনের ক্যাপ্টেন হওয়ার প্রথম গুরুত্বপূর্ণ পদক্ষেপ!",
          points: [
            "৭ম ও ৮ম শ্রেণীতে আমরা জীবনের একটি অত্যন্ত গুরুত্বপূর্ণ সন্ধিক্ষণে পদার্পণ করেছি।",
            "এই সময়ে সবচেয়ে জরুরি হলো আত্ম-নেতৃত্ব বা সেলফ-লিডারশিপ গড়ে তোলা।",
            "ডি-লিকন মডেল স্কুলের প্রগতি ম্যাট্রিক্স আমাদের এই নেতৃত্বের যোগ্যতা তৈরিতে সাহায্য করবে।"
          ],
          visualMetaphor: "A high-tech compass glowing with soft blue neon lights, resting on top of a schematic engineering diagram with stars in the deep background.",
          icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
          implementationTip: "কৈশোরে পা রাখা শিক্ষার্থীদের নিয়ন্ত্রণ করার চেয়ে স্বপ্রণোদিতভাবে কাজ করার প্রতি বেশি জোর দিন।"
        },
        {
          number: 2,
          title: "৩-স্তরীয় শিখন ও মনস্তাত্ত্বিক রূপরেখা কী? 🧠📊",
          subtitle: "আমাদের মেধা ও আচরণ বিকাশের বিজ্ঞানসম্মত চালিকাশক্তি!",
          points: [
            "১. সাধারণ ডায়াগনস্টিক: আমাদের দুর্বলতার ক্ষেত্র চিহ্নিত করে তা কাটিয়ে ওঠা।",
            "২. মনস্তাত্ত্বিক ম্যাপিং: আমাদের নিজস্ব শিখন শৈলী ও সুপ্ত গুণাবলি জাগ্রত করা।",
            "৩. প্রগতি পর্যবেক্ষণ: আমাদের ধারাবাহিক অগ্রগতির স্তর ট্র্যাক করা।"
          ],
          visualMetaphor: "A 3D translucent brain icon linked to three elegant floating data cards displaying academic icons, behavior charts, and progress graphs.",
          icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
          implementationTip: "শিক্ষার্থীদের কাছে ৩টি স্তরের কার্যকারিতা খুব সংক্ষেপে বৈজ্ঞানিকভাবে ব্যাখ্যা করুন যাতে তারা এর গুরুত্ব বুঝতে পারে।"
        },
        {
          number: 3,
          title: "বেসলাইন বনাম বর্তমান সক্ষমতা: আত্ম-মূল্যায়ন 📈🎯",
          subtitle: "নিজের প্রবৃদ্ধিকে পরিমাপ করার নির্ভরযোগ্য সূচক!",
          points: [
            "আমরা কোথা থেকে শুরু করেছি (বেসলাইন) আর আজ আমরা কোন সক্ষমতায় আছি (বর্তমান)।",
            "এই ডাটা আমাদের দেখায় আমরা অলস বসে নেই, আমরা প্রতিনিয়ত উন্নত হচ্ছি।",
            "প্রতিটি ছোট ছোট উন্নয়নই আমাদের বড় সাফল্যের পথে ধাবিত করে।"
          ],
          visualMetaphor: "A sleek modern split-screen display showing a seedling plant on the left (Baseline) and a fully grown healthy tree on the right (Current Status).",
          icon: <Award className="w-6 h-6 text-indigo-400" />,
          implementationTip: "শিক্ষার্থীদের বলুন যে নিজের উন্নতির গ্রাফ নিজেকেই পর্যবেক্ষণ করতে হবে।"
        },
        {
          number: 4,
          title: "হোম-টাইম ডিসিপ্লিন: আত্মনিয়ন্ত্রণের শক্তি 🏡⏳",
          subtitle: "যেখানে গড়ে ওঠে আগামী দিনের সফল ব্যক্তিত্ব!",
          points: [
            "বাড়ির সময়ে আমাদের কোনো শিক্ষক পাহারায় থাকেন না, এখানেই আমাদের সেলফ-ডিসিপ্লিনের পরীক্ষা।",
            "পড়ার সময় মন দিয়ে পড়া এবং খেলার সময় খেলাধুলা বা সৃজনশীল কাজে সক্রিয় থাকা।",
            "প্রগতি ছক আমাদের এই হোম-টাইমের সঠিক ও সুবিন্যস্ত রুটিন তৈরিতে বড় গাইড।"
          ],
          visualMetaphor: "A split design layout with a modern desk clock next to an open window overlooking a beautiful sunset, alongside an organized calendar and books.",
          icon: <Clock className="w-6 h-6 text-indigo-400" />,
          implementationTip: "হোম-টাইমের সঠিক ব্যবহার কীভাবে তাদের পড়াশোনার চাপ ও মানসিক উদ্বেগ কমাতে পারে তা আলোচনা করুন।"
        },
        {
          number: 5,
          title: "ব্যক্তিত্ব ও ইতিবাচক ম্যানার চর্চা 🌸👔",
          subtitle: "আভিজাত্য ও শিষ্টাচারই আমাদের মূল চাবিকাঠি!",
          points: [
            "ভদ্রতা, নম্রতা এবং চমৎকার আচরণ একজন শিক্ষার্থীর সবচেয়ে শক্তিশালী পরিচয়।",
            "ছোটদের স্নেহ করা, বড়দের শ্রদ্ধা জানানো ও ক্লাসরুমের পরিবেশ সর্বদা পজিটিভ রাখা।",
            "উন্নত ম্যানার ও শিষ্টাচার চর্চা আমাদের সহপাঠী ও শিক্ষকদের চোখে অতুলনীয় করে তুলবে।"
          ],
          visualMetaphor: "A stylized conceptual silhouette of a confident young student with small shining sparks around, displaying values like 'Integrity', 'Empathy', 'Respect'.",
          icon: <Smile className="w-6 h-6 text-indigo-400" />,
          implementationTip: "শিক্ষার্থীদের বলুন যে আচরণ ভালো হলে তারা কেবল ভালো ছাত্রই নয়, প্রকৃত নেতা হতে পারবে।"
        },
        {
          number: 6,
          title: "শিক্ষকের প্রতিদিনের সই: একটি মূল্যবান সংযোগ ✍️🏫",
          subtitle: "প্রতিটি ক্লাসের হাজিরা শেষেই আমাদের মেন্টরিং সেশন!",
          points: [
            "রোজ ক্লাস হাজিরা শেষে আমাদের মেন্টর (শিক্ষক) আমাদের কাছে আসবেন এবং প্রগতি ছকে সই করবেন।",
            "এই সময়ে শিক্ষকের দেওয়া ১ মিনিটের সরাসরি পরামর্শ আমাদের পথ চলার আলো।",
            "আমরা আমাদের মনের দ্বিধা ও পড়ালেখার দুর্বলতাগুলো তাঁর সাথে নির্দ্বিধায় শেয়ার করবো।"
          ],
          visualMetaphor: "Close-up of a teacher smiling with encouraging eyes, handing back a neatly signed evaluation sheet to an eager and attentive student.",
          icon: <UserCheck className="w-6 h-6 text-indigo-400" />,
          implementationTip: "হাজিরার ঠিক পরেই যেন শিক্ষকরা তাদের এই ১ মিনিটের বিশেষ মেন্টরিং সেশন ও সই সম্পন্ন করেন।"
        },
        {
          number: 7,
          title: "সোশ্যাল মিডিয়া ও ডিভাইস আসক্তি মুক্তি 📱🚫",
          subtitle: "স্ক্রিন টাইম কমিয়ে মেধা সুরক্ষার কৌশল!",
          points: [
            "সোশ্যাল মিডিয়া এবং ক্ষতিকর গেমস আমাদের মেধা ও মনোযোগকে প্রতিনিয়ত ধীর করে দেয়।",
            "পড়াশোনা, খাওয়া এবং রাতে ঘুমের ১ ঘণ্টা আগে ডিভাইসকে সম্পূর্ণ 'না' বলা শিখুন।",
            "স্ক্রিন আসক্তি কমিয়ে মাঠে খেলাধুলা, ছবি আঁকা বা প্রোগ্রামিংয়ের মতো গঠনমূলক কাজ করুন।"
          ],
          visualMetaphor: "A powerful graphic of a smartphone slowly turning into dust and transforming into vibrant shining geometric shapes and real physical soccer balls/books.",
          icon: <Smartphone className="w-6 h-6 text-indigo-400" />,
          implementationTip: "ডিজিটাল ডিটক্সের প্রয়োজনীয়তা বৈজ্ঞানিকভাবে ব্যাখ্যা করুন, বিশেষ করে গভীর ঘুমের উপর এর প্রভাব।"
        },
        {
          number: 8,
          title: "সুপ্ত প্রতিভা থেকে ভবিষ্যৎ ক্যারিয়ারের স্বপ্ন 🎨🔬",
          subtitle: "নিজের বিশেষ গুণকে বাস্তব রূপ দেওয়া!",
          points: [
            "আমাদের অনেকেরই কোডিং, চিত্রাঙ্কন, লেখালেখি, গণিত সমাধান বা বিজ্ঞানে বিশেষ ঝোঁক রয়েছে।",
            "এই বিশেষ গুণাবলিকে আমরা আমাদের প্রগতি ছকে তুলে ধরবো।",
            "শিক্ষকরা আমাদের এই গুণগুলোকে অনুপ্রাণিত করবেন যেন তা আমাদের ভবিষ্যৎ ক্যারিয়ারের রূপরেখা হয়।"
          ],
          visualMetaphor: "A fantasy vector illustration showing a student walking on a path that splits into various career dreams like a rocket, a telescope, easel, and laptop.",
          icon: <Lightbulb className="w-6 h-6 text-indigo-400" />,
          implementationTip: "প্রতিটি শিক্ষার্থীর বিশেষ গুণের ভূয়সী প্রশংসা করুন এবং তাদেরকে সে বিষয়ে লক্ষ্য নির্ধারণে সহায়তা করুন।"
        },
        {
          number: 9,
          title: "স্বপ্রণোদিত প্রগতি পর্যবেক্ষণ: সেলফ-ফিডব্যাক 🚥📝",
          subtitle: "নিজের কাজের বিচারক নিজেই হতে শেখা!",
          points: [
            "লাল, হলুদ বা সবুজ সংকেত দেখে কখনো হতাশ বা অতি-উৎফুল্ল হওয়া যাবে না।",
            "আমাদের মূল্যায়ন আমাদের আত্মসংশোধনের বড় সুযোগ।",
            "নিজে নিজের সাপ্তাহিক প্রগতি মূল্যায়ন করে পরবর্তী সপ্তাহের কর্মপরিকল্পনা তৈরি করুন।"
          ],
          visualMetaphor: "An interactive dashboard concept with physical sliders being adjusted by a confident student, stabilizing a glowing green progress light.",
          icon: <CheckSquare className="w-6 h-6 text-indigo-400" />,
          implementationTip: "শিক্ষার্থীদের স্ব-মূল্যায়ন করার অভ্যাস গড়ে তুলতে উৎসাহিত করুন।"
        },
        {
          number: 10,
          title: "আমার প্রগতি, আমার স্বাক্ষর, আমার দায়িত্ব 🌟🎓",
          subtitle: "ডি-লিকন মডেল স্কুলের গর্বিত ও সফল শিক্ষার্থী হব!",
          points: [
            "আমরাই আমাদের জীবনের ভবিষ্যৎ রূপকার, তাই আমাদের প্রগতির দায়িত্বও আমাদের নিজের।",
            "প্রতিদিন প্রগতি খাতা যত্নসহকারে পূরণ করা এবং শিক্ষক ও মা-বাবার সই নিয়মিত নেওয়া।",
            "আসুন আমরা সবাই আমাদের মেধা, শৃঙ্খলা ও চমৎকার আচরণের মাধ্যমে এক অনন্য নজির স্থাপন করি!"
          ],
          visualMetaphor: "A group of older school leaders in tidy uniforms standing on a global stage holding graduation scrolls, smiling towards a bright future horizon.",
          icon: <Presentation className="w-6 h-6 text-indigo-400" />,
          implementationTip: "শিক্ষার্থীদের ধন্যবাদ জানিয়ে সেশন শেষ করুন এবং ছকটি সফলভাবে শুরু করার জন্য শুভকামনা জানান।"
        }
      ]
    },
    {
      id: 'teacher-guide',
      title: 'শিক্ষকদের জন্য সহায়িকা ও প্রেজেন্টেশন',
      targetAudience: 'ডি-লিকন মডেল স্কুলের শিক্ষক সমাজ',
      description: 'হাজিরা ডাকার পরপরই সীট সাইন করা, ৩-স্তরীয় মূল্যায়নের ডাটা সঠিকভাবে বোঝা এবং শ্রেণীকক্ষে ইতিবাচক মনস্তাত্ত্বিক রূপরেখা বাস্তবায়নের ১০ স্লাইডের সম্পূর্ণ গাইড।',
      colorClass: 'from-emerald-600 to-teal-800 shadow-emerald-500/20',
      accentColor: 'text-emerald-400',
      aiPrompt: `You are an expert teacher training consultant and presentation scriptwriter. Outline a comprehensive 10-slide PowerPoint presentation in Bengali targeted at the teachers of D-Likon Model School.
The theme of the presentation is "Empowering Every Student: The Teacher's Implementation Guide for the Progress Matrix".
The primary focus of this deck is to guide teachers on how to effectively integrate this matrix into their daily classroom routines. Crucially, emphasize Slide 3 on signing the student sheets immediately after daily attendance, and use that 30-second window to encourage the student face-to-face. Explain the 3 levels of tracking (academic diagnostic, psychometric behavioral mapping, and progress monitoring signals), how to recognize manners, and how to involve parents.
Provide a clean Slide Title, Subtitle, detailed actionable bullet points, an AI visual prompt, and teacher action items.`,
      slides: [
        {
          number: 1,
          title: "ডি-লিকন মডেল স্কুলের প্রগতি বিপ্লব: শিক্ষক সহায়িকা 🏫🌟",
          subtitle: "প্রতিটি শিক্ষার্থীর প্রতিভা বিকাশে আমাদের অঙ্গীকার!",
          points: [
            "আমরা শিক্ষকেরা কেবল তথ্য প্রদানকারী নই, আমরা প্রতিটি শিক্ষার্থীর ভবিষ্যৎ নির্মাতা।",
            "ডি-লিকন মডেল স্কুলের 'শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স' একটি বৈপ্লবিক পদক্ষেপ।",
            "এই গাইডটি আমাদের ক্লাসরুমে এই চমৎকার ফ্রেমওয়ার্ক বাস্তবায়নে সাহায্য করবে।"
          ],
          visualMetaphor: "A welcoming, bright classroom interior with a teacher interacting with students, background displays showing clean glowing educational icons and stars.",
          icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
          implementationTip: "শিক্ষকদের ধন্যবাদ জানান তাদের এই মহৎ দায়িত্ব পালনের জন্য এবং প্রগতি বিপ্লবের অংশীদার হওয়ার জন্য।"
        },
        {
          number: 2,
          title: "আমাদের ভূমিকা: মেন্টর ও পথপ্রদর্শক 🧭🤝",
          subtitle: "স্নেহ ও ইতিবাচক মনস্তাত্ত্বিক দৃষ্টিভঙ্গি!",
          points: [
            "সংগ্রামরত বা পিছিয়ে পড়া শিক্ষার্থীদের জন্য আমাদের স্নেহ ও সঠিক রোগনির্ণয় অত্যন্ত জরুরি।",
            "ভয় বা শাস্তির বদলে ভালোবাসা ও সঠিক দিকনির্দেশনা দিয়ে তাদের আত্মবিশ্বাস ফিরিয়ে আনতে হবে।",
            "এই প্রগতি ম্যাট্রিক্স হলো আমাদের স্নেহপূর্ণ হস্তক্ষেপের বৈজ্ঞানিক হাতিয়ার।"
          ],
          visualMetaphor: "A nurturing teacher holding an open books glowing with golden particles, guiding a small seed growing into a vibrant green leaf.",
          icon: <Users className="w-6 h-6 text-emerald-400" />,
          implementationTip: "শিক্ষকদের অনুরোধ করুন ক্লাসে পিছিয়ে থাকা শিক্ষার্থীদের প্রতি অতিরিক্ত সহানুভূতিশীল আচরণ বজায় রাখতে।"
        },
        {
          number: 3,
          title: "হাজিরা ডাকার পরপরই সীট সাইন করার গুরুত্ব ✒️⏰",
          subtitle: "আমাদের সামান্য অবহেলা যেন শিক্ষার্থীর আগ্রহ নষ্ট না করে!",
          points: [
            "প্রতিদিন ক্লাস রোল কল বা হাজিরা ডাকার পরপরই প্রতিটি শিক্ষার্থীর ছকটি সই করতে হবে।",
            "রোল নম্বর ডাকার সাথে সাথেই শিক্ষার্থীর ডেস্কে গিয়ে ছকটি দেখা এবং সই দেওয়া নিশ্চিত করুন।",
            "এই গুরুত্বপূর্ণ ৩ সেকেন্ডের সংযোগ শিক্ষার্থীর সারাদিনের পড়াশোনার আগ্রহকে শতগুণ বাড়িয়ে দেয়।"
          ],
          visualMetaphor: "An active classroom shot showing a clock at 9:05 AM, with the teacher carrying a red pen, signing a student's matrix document at their desk with a smile.",
          icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
          implementationTip: "হাজিরা ডাকার পরপরই সাইন করা বাধ্যতামূলক রুটিন হিসেবে বিদ্যালয়ের প্রধান শিক্ষক মহোদয়ের সাথে সমন্বয় করুন।"
        },
        {
          number: 4,
          title: "মুখোমুখি উৎসাহ ও ৩০ সেকেন্ডের জাদুকরী ফিডব্যাক ✨🗣️",
          subtitle: "আপনার স্নেহের বাণীই তার সারাদিনের বড় অনুপ্রেরণা!",
          points: [
            "ছকে সই করার সময় শিক্ষার্থীর চোখের দিকে তাকিয়ে সরাসরি স্নেহের কথা বলুন।",
            "যেমন: 'তানভীর, তুমি গতকাল মোবাইল দেখনি জেনে আমার খুব ভালো লেগেছে, তুমি একজন সত্যিকারের হিরো!'",
            "এই সামান্য ৩০ সেকেন্ডের প্রত্যক্ষ মূল্যায়ন শিক্ষার্থীর আচরণগত আমূল পরিবর্তন ঘটাতে পারে।"
          ],
          visualMetaphor: "An close-up exchange showing a teacher looking directly into the smiling eyes of a young boy student, with golden rays of encouragement between them.",
          icon: <Smile className="w-6 h-6 text-emerald-400" />,
          implementationTip: "নেতিবাচক মন্তব্য এড়িয়ে ইতিবাচক আচরণকে প্রশংসা করুন, ভুলগুলোর সংশোধন করুন অত্যন্ত গোপনে ও সংবেদনশীলতার সাথে।"
        },
        {
          number: 5,
          title: "৩-স্তরীয় মূল্যায়নের রহস্য উন্মোচন 📊🔍",
          subtitle: "শিক্ষার্থীকে সামগ্রিকভাবে বোঝার উপায়!",
          points: [
            "১. সাধারণ ডায়াগনস্টিক: বিষয়ভিত্তিক দুর্বলতা ও নেপথ্য কারণ নির্ণয় করা।",
            "২. মনস্তাত্ত্বিক ম্যাপিং: শিক্ষার্থীর শিখন শৈলী (Visual, Auditory, Kinesthetic) জানা।",
            "৩. প্রগতি পর্যবেক্ষণ: বেসলাইন থেকে বর্তমান সক্ষমতা ট্র্যাক করা।"
          ],
          visualMetaphor: "Three clear scientific drawers being opened, each filled with folders titled in Bengali: 'রোগনির্ণয়', 'মনস্তত্ত্ব', 'প্রগতি'.",
          icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
          implementationTip: "শিক্ষকদের এই ডাটা এন্ট্রি এবং অ্যাপের মাধ্যমে শিক্ষার্থীদের আইডি দিয়ে সার্চ করে তথ্য আপডেট করা শিখিয়ে দিন।"
        },
        {
          number: 6,
          title: "শিখন শৈলী সনাক্তকরণ: সঠিক উপায়ে পড়ানো 🎨🧠",
          subtitle: "সব শিশু একইভাবে শেখে না, তাই আমাদের পড়ানোর ধরনও হোক বৈচিত্র্যময়!",
          points: [
            "ভিজুয়াল (Visual) শিক্ষার্থী: এরা ছবি বা ডায়াগ্রাম দেখে ভালো বোঝে।",
            "অডিটরি (Auditory) শিক্ষার্থী: এরা কথা শুনে বা আলোচনা শুনে দ্রুত আয়ত্ত করে।",
            "কাইনেস্থেটিক (Kinesthetic) শিক্ষার্থী: এরা কাজ করে বা স্পর্শ করে শিখতে ভালোবাসে।"
          ],
          visualMetaphor: "Three children icons highlighted: one looking at a monitor screen, one wearing headphones listening attentively, and one building blocks.",
          icon: <Lightbulb className="w-6 h-6 text-emerald-400" />,
          implementationTip: "শ্রেণীকক্ষে সব ধরনের শিখন শৈলীর শিক্ষার্থীদের জন্য সমান সুযোগ রয়েছে এমন মাল্টি-সেন্সরি লেকচার দিন।"
        },
        {
          number: 7,
          title: "সুন্দর ব্যবহারের স্বীকৃতি ও আদব-কায়দার চর্চা 🌸🎖️",
          subtitle: "শ্রেণীকক্ষে ম্যানার বা আদব-কায়দার জয়জয়কার!",
          points: [
            "ক্লাসে ভালো আচরণের জন্য আমরা শিক্ষার্থীদের নিয়মিত স্বীকৃতি দেবো।",
            "একে অপরকে সাহায্য করা, সত্য বলা, বিনম্রভাবে প্রশ্ন করার মতো গুণগুলোর ভূয়সী প্রশংসা করুন।",
            "শ্রেণীকক্ষেই সুন্দর আচরণের রোল-মডেল তৈরি করে সবাইকে অনুপ্রাণিত করুন।"
          ],
          visualMetaphor: "A wooden podium in a bright school hall where a smiling student receives a shining ribbon with written Bengali words 'সেরা আদব-কায়দা'.",
          icon: <Award className="w-6 h-6 text-emerald-400" />,
          implementationTip: "সাপ্তাহিক বা মাসিক ভিত্তিতে ক্লাসের সবচেয়ে বিনয়ী ও শৃঙ্খলিত শিক্ষার্থীকে বিশেষ 'ম্যানার চ্যাম্পিয়ন' অ্যাওয়ার্ড দিন।"
        },
        {
          number: 8,
          title: "হোম-টাইম মনিটরিং: বাড়ির পৃষ্ঠা ও অভিভাবকের সমন্বয় 🏡📝",
          subtitle: "স্কুল ও বাড়ির মধ্যে সফল প্রগতির সেতু!",
          points: [
            "শিক্ষার্থীদের খাতার পেছনের পৃষ্ঠায় অভিভাবকদের জন্য বিস্তারিত নির্দেশিকা রয়েছে।",
            "শিক্ষার্থীরা বাড়িতে পড়াশোনার সময়, খেলার সময় এবং মোবাইল ফোন ব্যবহার ঠিকভাবে নিয়ন্ত্রণ করছে কিনা তা যাচাই করুন।",
            "অভিভাবকদের সাথে নিয়মিত যোগাযোগ বজায় রাখুন এবং তাদের সই করার গুরুত্ব স্মরণ করিয়ে দিন।"
          ],
          visualMetaphor: "A beautiful artistic drawing of a wooden bridge spanning between a school building and a warm, inviting home under a bright sky.",
          icon: <Clock className="w-6 h-6 text-emerald-400" />,
          implementationTip: "নিশ্চিত করুন যে অভিভাবক যেন নিয়মিত পেছনের পৃষ্ঠার গাইড পড়ে সন্তানের বাড়িতে সময় দেওয়া পর্যবেক্ষণ করেন।"
        },
        {
          number: 9,
          title: "প্রগতি সংকেত (Progress Signals) আপডেট করা 🚥📈",
          subtitle: "সঠিক সময়ে ডাটা এন্ট্রি নিশ্চিত করা!",
          points: [
            "আমাদের ডিজিটাল ডাটাবেজে প্রতিটি শিক্ষার্থীর প্রগতি সংকেত নিয়মিত আপডেট করতে হবে।",
            "লাল (তীব্র মনোযোগ প্রয়োজন), হলুদ (মধ্যম অগ্রগতি) এবং সবুজ (উৎকৃষ্ট অগ্রগতি)।",
            "সংকেত দেখে দুর্বল শিক্ষার্থীদের জন্য শ্রেণীকক্ষে বিশেষ রিমিডিয়াল ক্লাসের ব্যবস্থা করুন।"
          ],
          visualMetaphor: "An iPad screen showing a clean user list where each student has a toggle containing glowing Red, Amber, Green circular status lights.",
          icon: <CheckSquare className="w-6 h-6 text-emerald-400" />,
          implementationTip: "সাপ্তাহিক প্রগতি রিপোর্ট কার্ডে যেন ডাটা এন্ট্রি নিখুঁত ও বাস্তবমুখী হয় সেদিকে কড়া নজর রাখুন।"
        },
        {
          number: 10,
          title: "আমরা গড়বো এক সুবর্ণ ভবিষ্যৎ: টিম ডি-লিকন 🤝🎓",
          subtitle: "শিক্ষার্থীদের প্রতিটি ছোট জয়ই আমাদের আসল সাফল্য!",
          points: [
            "আসুন আমরা শিক্ষকেরা সম্মিলিতভাবে এই প্রগতি ম্যাট্রিক্স বাস্তবায়ন করি।",
            "আমাদের সচেতনতা, ধৈর্য এবং স্নেহের মাধ্যমে ডি-লিকন স্কুলের প্রতিটি শিশু অনন্য হয়ে উঠবে।",
            "আজকের এই প্রচেষ্টাই কাল তৈরি করবে দেশের শ্রেষ্ঠ ডাক্তার, ইঞ্জিনিয়ার ও মানবিক ব্যক্তিত্ব!"
          ],
          visualMetaphor: "A diverse group of proud school teachers and administrators standing together with bright smiles under an banner 'ডি-লিকন প্রগতি হাব'.",
          icon: <Presentation className="w-6 h-6 text-emerald-400" />,
          implementationTip: "শিক্ষকদের ধন্যবাদ জানিয়ে প্রশিক্ষণ কর্মশালা বা সভার ইতি টানুন এবং তাদের মতামত সাদরে গ্রহণ করুন।"
        }
      ]
    },
    {
      id: 'parent-guide',
      title: 'অভিভাবকদের জন্য সহায়িকা ও প্রেজেন্টেশন',
      targetAudience: 'ডি-লিকন মডেল স্কুলের অভিভাবকবৃন্দ',
      description: 'প্রগতি খাতার ওল্টোপৃষ্ঠার বিস্তারিত নির্দেশিকা, মোবাইল ফোন কমানো, বাড়িতে পড়াশোনার সুস্থ পরিবেশ তৈরি এবং প্রতিদিন সই করার গুরুত্বের ১০ স্লাইডের সহজ গাইড।',
      colorClass: 'from-purple-600 to-pink-700 shadow-purple-500/20',
      accentColor: 'text-purple-400',
      aiPrompt: `You are an expert child psychologist and parent counselor. Outline a 10-slide PowerPoint presentation in Bengali targeted at the parents (parents community) of D-Likon Model School.
The theme is "Bridging Home and School: The Parent's Guide to the Progress Matrix".
The core objective is to clearly explain the critical instructions written in detail on the BACK PAGE (অপর পৃষ্ঠা) of the student sheet. Detail how parents can successfully perform Home-Time Monitoring, manage study hours, limit screen-time/mobile phone addiction, foster respectful manners, and sign the daily home checklist. Write in an empathetic, warm, easy-to-understand Bengali with simple analogies.
Include Slide Title, Subtitle, clear points, AI visual prompt, and parent action items.`,
      slides: [
        {
          number: 1,
          title: "স্বাগতম অভিভাবকবৃন্দ: আপনার সন্তানের প্রগতি সফর 🏡✨",
          subtitle: "সন্তানের সুন্দর ভবিষ্যৎ বিনির্মাণে আমরা অংশীদার!",
          points: [
            "ডি-লিকন মডেল স্কুল পরিবারের পক্ষ থেকে আপনাদের জানাই আন্তরিক সালাম ও শুভেচ্ছা।",
            "আপনার আদরের সন্তানের সর্বোচ্চ মানসিক ও একাডেমিক বিকাশের জন্য আমরা এক নতুন উদ্যোগ নিয়েছি।",
            "এই উদ্যোগটির নাম 'শিক্ষার্থী উন্নয়ন ও প্রগতি পর্যবেক্ষণ ম্যাট্রিক্স'। "
          ],
          visualMetaphor: "A warm vector graphic showing a parent holding a young child's hand, walking towards a welcoming school gate where teachers stand smiling.",
          icon: <Sparkles className="w-6 h-6 text-purple-400" />,
          implementationTip: "অভিভাবকদের শুভেচ্ছা জানিয়ে বলুন যে সন্তানকে মানুষ করার মহৎ দায়িত্বে আমরা সবসময় আপনাদের পাশে আছি।"
        },
        {
          number: 2,
          title: "প্রগতি খাতার পেছনের পৃষ্ঠা: আপনার পরম সহায়িকা 📄🔍",
          subtitle: "চলুন জেনে নিই পিছনের পৃষ্ঠার মূল্যবান নির্দেশাবলী!",
          points: [
            "শিক্ষার্থীদের প্রগতি খাতার পেছনের পৃষ্ঠায় আপনাদের জন্য বিস্তারিত নির্দেশিকা দেওয়া হয়েছে।",
            "সন্তান বাড়িতে কত সময় পড়ালেখা করছে, কত সময় ঘুমোচ্ছে তা ট্র্যাক করা আমাদের মূল লক্ষ্য।",
            "আসুন আমরা এই নির্দেশিকাগুলো গভীরভাবে বুঝি এবং বাড়িতে তা কার্যকরভাবে প্রয়োগ করি।"
          ],
          visualMetaphor: "An animated hand flipping a beautifully designed progress card to show a detailed, clean layout of text and colorful checklist items on the back page.",
          icon: <FileText className="w-6 h-6 text-purple-400" />,
          implementationTip: "অভিভাবক সমাবেশে বা সভায় এই এ৪ ছকটি উল্টে দেখিয়ে দিন এবং বলুন এই পেছনের পৃষ্ঠাই হলো তাদের জন্য সোনার চাবিকাঠি।"
        },
        {
          number: 3,
          title: "হোম-টাইম মনিটরিং কী ও কেন? 🏡⏳",
          subtitle: "বাড়ির পরিবেশ হোক সন্তানের মেধা বিকাশের সেরা কেন্দ্র!",
          points: [
            "স্কুল শেষ হওয়ার পর বাড়িতে সন্তান যে সময় কাটায়, তাকেই আমরা বলছি 'হোম-টাইম'।",
            "এই সময়ে সন্তান ঠিক সময়ে খাবার খাচ্ছে কিনা, পর্যাপ্ত পড়াশোনা ও খেলাধুলা করছে কিনা তা পর্যবেক্ষণ করা।",
            "সুশৃঙ্খল হোম-টাইম মনিটরিং সন্তানের পড়ালেখার একাগ্রতা বহুগুণ বাড়িয়ে দেয়।"
          ],
          visualMetaphor: "A cute wooden cottage icon with small glowing gears inside, alongside books, writing tables, and clock icons floating peacefully around it.",
          icon: <Clock className="w-6 h-6 text-purple-400" />,
          implementationTip: "বাড়িতে সন্তানকে সবসময় পড়তে বাধ্য না করে পড়ার জন্য একটি শান্ত ও আনন্দময় পরিবেশ তৈরিতে সাহায্য করুন।"
        },
        {
          number: 4,
          title: "মোবাইল ফোন ও স্ক্রিন টাইম নিয়ন্ত্রণ: বড় বিপর্যয় রোধ 📱🚫",
          subtitle: "মোবাইল আসক্তি কমিয়ে সন্তানের মেধা ও মনোযোগ রক্ষা করুন!",
          points: [
            "মোবাইল ফোন অতিরিক্ত ব্যবহারের ফলে শিশুর মানসিক বিকাশ বাধাগ্রস্ত হচ্ছে।",
            "খাবার খাওয়ার সময় এবং রাতে ঘুমানোর অন্তত ১ ঘণ্টা আগে সন্তানকে মোবাইল দেওয়া সম্পূর্ণ বন্ধ করুন।",
            "মোবাইলের বদলে সন্তানকে গল্প বলা, কাগজ কাটা, ছবি আঁকা বা সশরীরে খেলতে উৎসাহিত করুন।"
          ],
          visualMetaphor: "A stylized conceptual graphic showing a physical smartphone enclosed in a protective bubble with a slash icon over it, surrounded by flying storybook characters.",
          icon: <Smartphone className="w-6 h-6 text-purple-400" />,
          implementationTip: "অভিভাবকদের মনে করিয়ে দিন যে সন্তানকে শান্ত রাখার জন্য মোবাইল দেওয়া আসলে তাদের দীর্ঘমেয়াদী ক্ষতি করছে।"
        },
        {
          number: 5,
          title: "বাড়িতে পড়াশোনার সুন্দর ও শান্ত পরিবেশ তৈরি 📚🛋️",
          subtitle: "পড়ার সময়ে পড়ার প্রতি গভীর একাগ্রতা!",
          points: [
            "সন্তান যখন পড়তে বসবে, তখন বাড়ির টেলিভিশন বন্ধ রাখা অত্যন্ত জরুরি।",
            "পড়ার টেবিলটি যেন কোলাহলমুক্ত, আলো-বাতাস সমৃদ্ধ এবং গোছানো থাকে সেদিকে খেয়াল রাখুন।",
            "পড়াশোনা করার সময় শিশুর মনোযোগে বিঘ্ন ঘটায় এমন কোনো কাজ বাড়ির কেউ করবেন না।"
          ],
          visualMetaphor: "A tidy and beautiful children's study table next to a window with green plants, cozy soft light, books properly arranged on a small wooden shelf.",
          icon: <BookOpen className="w-6 h-6 text-purple-400" />,
          implementationTip: "অভিভাবকদের বলুন পড়ার টেবিলকে ভয়ের জায়গা না বানিয়ে শিশুদের ভালোবাসার জায়গা হিসেবে গড়ে তুলতে।"
        },
        {
          number: 6,
          title: "সুন্দর ব্যবহার ও শিষ্টাচার চর্চায় হাত মেলানো 🤝🌸",
          subtitle: "বাড়িতেই হোক শিষ্টাচারের প্রথম পাঠশালা!",
          points: [
            "শিক্ষার্থীরা সুন্দর ব্যবহারের যে স্বীকৃতি স্কুলে পাচ্ছে, তা বাড়িতেও চর্চা করা উচিত।",
            "সালাম বিনিময়, বড়দের সম্মান করা এবং বিনম্রভাবে কথা বলার গুণগুলো বাড়িতে চর্চা করুন।",
            "সন্তানের সাথে নিজেরাও নম্র ব্যবহার করুন, কারণ শিশুরা সবসময় বড়দের দেখেই শেখে।"
          ],
          visualMetaphor: "A father, mother, and child sitting around a wooden dining table laughing warmly together, holding hands with respect and love.",
          icon: <Smile className="w-6 h-6 text-purple-400" />,
          implementationTip: "মনে করিয়ে দিন যে পরিবারের সদস্যদের মিষ্টি আচরণই শিশুর সবচেয়ে বড় আদব-কায়দার স্কুল।"
        },
        {
          number: 7,
          title: "প্রতিদিন প্রগতি খাতায় সই ও আদরের মন্তব্য ✍️❤️",
          subtitle: "আপনার একটি সুন্দর সই সন্তানের জন্য বড় একটি উপহার!",
          points: [
            "সন্তান সারাদিন কেমন করলো তা মূল্যায়ন করে খাতার নির্দিষ্ট ঘরে রোজ রাতে সই করুন।",
            "আপনার স্বাক্ষর সন্তানকে উৎসাহিত করে যে মা-বাবা তার এই সুন্দর কাজের পাশে আছেন।",
            "মাঝে মাঝে সইয়ের পাশে লিখতে পারেন: 'খুব ভালো করেছ বাবা!' বা 'আমি গর্বিত!'।"
          ],
          visualMetaphor: "An overhead soft-lit close up of a mother signing a child's checklist page while the young girl watches eagerly with a beaming smile.",
          icon: <UserCheck className="w-6 h-6 text-purple-400" />,
          implementationTip: "রোজ ঘুমানোর আগে ৫ মিনিট সময় নিয়ে সন্তানের এই প্রগতি খাতাটি সই করার জন্য একটি বিশেষ পারিবারিক রুটিন তৈরি করুন।"
        },
        {
          number: 8,
          title: "শিক্ষকের সাথে নিয়মিত যোগাযোগ ও পার্টনারশিপ 🏫📞",
          subtitle: "চলুন গড়ে তুলি সুন্দর ও নিয়মিত যোগাযোগের সম্পর্ক!",
          points: [
            "অন্তত সপ্তাহে একবার বা ১৫ দিনে একবার সন্তানের শ্রেণী শিক্ষকের সাথে ফোনে বা স্কুলে গিয়ে কথা বলুন।",
            "জানতে চান স্কুলে আপনার সন্তান কেমন করছে আর বাড়িতে সে কেমন আচরণ করছে তাও শিক্ষককে বলুন।",
            "স্কুল এবং মা-বাবার সম্মিলিত প্রচেষ্টাই শিশুর পড়ালেখার উন্নতি দ্বিগুণ করে তুলতে পারে।"
          ],
          visualMetaphor: "An split screen artwork where a class teacher on the left and a mother on the right are talking warmly with a modern smartphone interface.",
          icon: <Users className="w-6 h-6 text-purple-400" />,
          implementationTip: "বিদ্যালয়ে অভিভাবক দিবসে বা পিটিএ মিটিংয়ে নিয়মিত অংশগ্রহণ নিশ্চিত করার অনুরোধ জানান।"
        },
        {
          number: 9,
          title: "দুর্বলতায় বকাঝকা না করে স্নেহে পাশে থাকুন 🤝💖",
          subtitle: "শাস্তি বা রাগ নয়, ভালোবাসাই পরিবর্তনের মূল চাবিকাঠি!",
          points: [
            "যদি আপনার সন্তানের প্রগতি সংকেত হলুদ বা লাল হয়, তাকে বকাবকি বা মারধর করবেন না।",
            "তাকে জিজ্ঞেস করুন তার কোথায় বুঝতে সমস্যা হচ্ছে, শিক্ষকের সাথে আলোচনা করে সমাধান খুঁজুন।",
            "সন্তানকে আশ্বস্ত করুন যে চেষ্টা করলে সেও একদিন অনেক ভালো করতে পারবে।"
          ],
          visualMetaphor: "A mother hugging her son warmly while he holds a homework sheet, small glowing hearts floating near them symbolizing love and absolute support.",
          icon: <Lightbulb className="w-6 h-6 text-purple-400" />,
          implementationTip: "শিশুদের ভীতিমুক্ত ও হাসিখুশি রাখলে তাদের রোগ প্রতিরোধ ক্ষমতা ও স্মৃতিশক্তি বৃদ্ধি পায়।"
        },
        {
          number: 10,
          title: "আপনার একটু সচেতনতা, সন্তানের উজ্জ্বল সফলতা 🌟🎓",
          subtitle: "ডি-লিকন মডেল স্কুলের প্রতিটি অভিভাবককে আন্তরিক ধন্যবাদ!",
          points: [
            "আমাদের সন্তানরাই আমাদের জীবনের সবচেয়ে বড় সম্পদ ও ভবিষ্যৎ স্বপ্ন।",
            "আসুন আমরা নিয়মিত এই প্রগতি খাতাটি পর্যবেক্ষণ ও সই করার কাজটি শুরু করি।",
            "আপনাদের সহযোগিতা ও সচেতনতাই একদিন আমাদের সন্তানদের নিয়ে যাবে অনন্য উচ্চতায়!"
          ],
          visualMetaphor: "A dramatic final screen showing a shining group of happy parents and smart students in green robes celebrating high-school graduation.",
          icon: <Presentation className="w-6 h-6 text-purple-400" />,
          implementationTip: "উপস্থিত সকল অভিভাবককে আন্তরিক ধন্যবাদ জানিয়ে সেশনটির ইতি টানুন।"
        }
      ]
    }
  ];

  const activePresentation = presentations.find(p => p.id === activeTab) || presentations[0];

  const handleNextSlide = () => {
    if (currentSlideIndex < activePresentation.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(activePresentation.aiPrompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div id="presentation-guide-hub" className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300">
      
      {/* Header section with badge */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900/50 to-indigo-900/50 px-6 py-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-semibold text-blue-200">
            <Presentation className="w-3.5 h-3.5" />
            <span>ডি-লিকন স্কুল প্রেজেন্টেশন ও বাস্তবায়ন মডিউল</span>
          </div>
          <h2 className="text-lg font-black text-white">
            পাওয়ারপয়েন্ট প্রেজেন্টেশন ও বাস্তবায়ন নির্দেশিকা হাব
          </h2>
          <p className="text-xs text-slate-300">
            শিক্ষার্থী, শিক্ষক ও অভিভাবকদের জন্য ১০ স্লাইডের বিস্তারিত প্রেজেন্টেশন কন্টেন্ট ও জেনারেটর প্রম্পট
          </p>
        </div>
        
        {/* Quick implementation progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] block font-bold text-slate-400 uppercase">বাস্তবায়ন অগ্রগতি</span>
            <span className="text-base font-black text-emerald-400">
              {Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length} ধাপ সম্পন্ন
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-400 flex items-center justify-center text-[11px] font-bold text-white">
            {Math.round((Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Sidebar Tabs - 5 presentations selection */}
        <div className="lg:col-span-4 border-r border-white/10 bg-slate-950/20 p-4 space-y-3">
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block px-2">
            প্রেজেন্টেশনের ধরন নির্বাচন করুন
          </span>
          <div className="space-y-1.5">
            {presentations.map((p) => {
              const isActive = p.id === activeTab;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveTab(p.id);
                    setCurrentSlideIndex(0);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition duration-150 flex items-center gap-2.5 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600/15 border-blue-500/30 text-white shadow-lg shadow-blue-500/5' 
                      : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'}`}></span>
                  <div className="truncate">
                    <div className="font-bold truncate text-slate-200 text-xs">{p.title}</div>
                    <div className="text-[10px] font-medium text-slate-400 truncate mt-0.5">{p.targetAudience}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick implementation checklist list */}
          <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block px-2">
              ডি-লিকন স্কুল বাস্তবায়ন চেকলিস্ট
            </span>
            <div className="space-y-2 px-1 text-[11px]">
              
              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['prep-1']}
                  onChange={() => handleToggleCheck('prep-1')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-p1"
                />
                <label htmlFor="chk-p1" className="cursor-pointer">এ৪ সাইজ ল্যান্ডস্কেপ প্রগতি ছক প্রিন্ট করা হয়েছে</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['prep-2']}
                  onChange={() => handleToggleCheck('prep-2')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-p2"
                />
                <label htmlFor="chk-p2" className="cursor-pointer">পিছনের পৃষ্ঠায় অভিভাবক গাইড প্রিন্ট করা হয়েছে</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['prep-3']}
                  onChange={() => handleToggleCheck('prep-3')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-p3"
                />
                <label htmlFor="chk-p3" className="cursor-pointer">শ্রেণীভিত্তিক শিক্ষার্থীদের হাতে নাম-রোলসহ ছক প্রদান</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['teach-1']}
                  onChange={() => handleToggleCheck('teach-1')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-t1"
                />
                <label htmlFor="chk-t1" className="cursor-pointer">শিক্ষকদের সই সেশন সম্পন্ন করার প্রশিক্ষণ দেওয়া হয়েছে</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['teach-2']}
                  onChange={() => handleToggleCheck('teach-2')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-t2"
                />
                <label htmlFor="chk-t2" className="cursor-pointer">রোলকল বা হাজিরা খাতা ডাকার পর সই করা বাধ্যতামূলক করা হয়েছে</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['parent-1']}
                  onChange={() => handleToggleCheck('parent-1')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-pr1"
                />
                <label htmlFor="chk-pr1" className="cursor-pointer">অভিভাবক সমাবেশে প্রগতি খাতার ওল্টোপৃষ্ঠা বুঝানো হয়েছে</label>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <input 
                  type="checkbox" 
                  checked={checklist['parent-2']}
                  onChange={() => handleToggleCheck('parent-2')}
                  className="mt-0.5 rounded bg-slate-950 border-white/20 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  id="chk-pr2"
                />
                <label htmlFor="chk-pr2" className="cursor-pointer">হোম-টাইম মনিটরিংয়ে মা-বাবার প্রতিদিনের স্বাক্ষর শুরু হয়েছে</label>
              </div>

            </div>
          </div>
        </div>

        {/* Slide Preview & Prompt Section */}
        <div className="lg:col-span-8 p-6 space-y-6">
          
          {/* Quick Intro Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">উদ্দেশ্য ও সারসংক্ষেপ</span>
            <p className="text-xs text-slate-200 leading-relaxed font-light">
              {activePresentation.description}
            </p>
          </div>

          {/* Copier Panel */}
          <div className="bg-slate-950/40 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">এআই স্লাইড জেনারেটর প্রম্পট (Gamma / ChatGPT / Gemini)</span>
              <p className="text-[11px] text-slate-300">
                নিচের প্রম্পটটি কপি করে Gamma.app, ChatGPT বা Gemini-তে পেস্ট করলে নিমেষেই চমৎকার স্লাইড তৈরি হবে।
              </p>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              {promptCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span>{promptCopied ? 'কপি হয়েছে!' : 'এআই প্রম্পট কপি'}</span>
            </button>
          </div>

          {/* Interactive Slide Render Frame */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">১০টি স্লাইডের ইন্টারেক্টিভ ওয়ান-বাই-ওয়ান ভিউয়ার</span>
              <span className="text-xs font-bold text-slate-300">
                স্লাইড নম্বর: <span className="text-blue-400">{currentSlideIndex + 1}</span> / 10
              </span>
            </div>

            {/* Virtual Slide Screen */}
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/15 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-2xl">
              
              {/* Slide Background Pattern Overlay */}
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-12 -translate-y-12">
                <Presentation className="w-80 h-80 text-white" />
              </div>

              {/* Slide Top Branding */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ডি-লিকন মডেল স্কুল প্রগতি হাব</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300">
                  {activePresentation.targetAudience}
                </div>
              </div>

              {/* Slide Content (Middle section) */}
              <div className="my-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10">
                
                {/* Visual Description Metaphor (Left Side) */}
                <div className="md:col-span-5 hidden md:flex flex-col gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    {activePresentation.slides[currentSlideIndex].icon}
                    <span className="text-[10px] font-bold text-slate-300 uppercase">এআই ইমেজ বা মেটাফোর</span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-relaxed font-light">
                    “{activePresentation.slides[currentSlideIndex].visualMetaphor}”
                  </p>
                </div>

                {/* Actual Slide Text points (Right Side) */}
                <div className="md:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {activePresentation.slides[currentSlideIndex].title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300">
                      {activePresentation.slides[currentSlideIndex].subtitle}
                    </p>
                  </div>
                  
                  <ul className="space-y-2 pl-1">
                    {activePresentation.slides[currentSlideIndex].points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-light leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Slide Footer Action Area */}
              <div className="border-t border-white/10 pt-2.5 flex items-center justify-between z-10 text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    <strong className="text-slate-300">বাস্তবায়ন কৌশল:</strong> {activePresentation.slides[currentSlideIndex].implementationTip}
                  </span>
                </div>
                <div className="font-mono text-slate-500 font-bold">
                  SLIDE {String(currentSlideIndex + 1).padStart(2, '0')}
                </div>
              </div>

            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent disabled:text-slate-500 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী স্লাইড</span>
              </button>

              {/* Visual pagination dots */}
              <div className="flex items-center gap-1.5">
                {activePresentation.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex 
                        ? 'bg-blue-400 w-4' 
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                disabled={currentSlideIndex === activePresentation.slides.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent disabled:text-slate-500 disabled:cursor-not-allowed transition"
              >
                <span>পরবর্তী স্লাইড</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
