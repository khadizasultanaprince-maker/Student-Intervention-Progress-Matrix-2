import React, { useState, useMemo } from 'react';
import { 
  StudentRecord, 
  WeaknessCategoryLabels, 
  WeaknessLevelLabels, 
  LearningStyleLabels, 
  ProgressSignalLabels 
} from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  Send, 
  Share2, 
  Heart, 
  BookOpen,
  Bookmark,
  UserCheck
} from 'lucide-react';

interface ParentMessageDraftModalProps {
  record: StudentRecord;
  onClose: () => void;
}

type MessageTone = 'encouraging' | 'collaborative' | 'celebrating';

export default function ParentMessageDraftModal({ record, onClose }: ParentMessageDraftModalProps) {
  const [tone, setTone] = useState<MessageTone>('encouraging');
  const [copiedSMS, setCopiedSMS] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categoryLabel = WeaknessCategoryLabels[record.weaknessCategory] || record.weaknessCategory;
  const learningStyleLabel = LearningStyleLabels[record.learningStyle] || record.learningStyle;
  const progressLabel = ProgressSignalLabels[record.progressSignal]?.label || record.progressSignal;
  const progressEmoji = ProgressSignalLabels[record.progressSignal]?.emoji || '📈';

  // Format the SMS template dynamically based on selected tone
  const smsDraft = useMemo(() => {
    const greeting = `শ্রদ্ধেয় অভিভাবক, আসসালামু আলাইকুম। `;
    const baseInfo = `আপনার সন্তান ${record.studentName} (${record.studentClass}) আমাদের বিশেষ পর্যবেক্ষণ তালিকায় রয়েছে। `;
    
    let toneContent = '';
    if (tone === 'encouraging') {
      toneContent = `তার ${categoryLabel}-এর দক্ষতা বাড়াতে আমরা বিশেষ মনোযোগ দিচ্ছি। তার শিখন শৈলী (${learningStyleLabel}) অনুযায়ী আমরা নতুন কৌশল গ্রহণ করেছি। তার বর্তমান অবস্থা: "${record.currentStatus}"। সে নিয়মিত চেষ্টা করছে এবং আশা করি শীঘ্রই আরও ভালো করবে। `;
    } else if (tone === 'collaborative') {
      toneContent = `তার ${categoryLabel} দুর্বলতা কাটিয়ে উঠতে আমরা বিদ্যালয় থেকে বিশেষ সহায়তা ("${record.strategyUsed}") দিচ্ছি। বাড়িতেও যদি তার সাথে এ বিষয়ে একটু সময় দেন ও উৎসাহ দেন, তবে সে দ্রুত কাঙ্ক্ষিত লক্ষ্যে পৌঁছাতে পারবে। `;
    } else { // celebrating
      toneContent = `অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, ${record.studentName} তার ${categoryLabel} দক্ষতায় পূর্বের (${record.baselineStatus}) তুলনায় উল্লেখযোগ্য উন্নতি করে বর্তমানে "${record.currentStatus}" স্তরে উন্নীত হয়েছে! তার এই প্রগতি সত্যিই প্রশংসনীয়। `;
    }

    const ending = `তার সার্বিক উজ্জ্বল ভবিষ্যৎ কামনায় - শ্রেণী শিক্ষক।`;
    return `${greeting}${baseInfo}${toneContent}${ending}`;
  }, [record, tone, categoryLabel, learningStyleLabel]);

  // Format the Email template dynamically based on selected tone
  const emailDraft = useMemo(() => {
    const subject = `বিষয়: ${record.studentName}-এর অগ্রগতি ও একাডেমি পর্যবেক্ষণ সংক্রান্ত বিশেষ বার্তা`;
    
    let emailBody = `শ্রদ্ধেয় অভিভাবক,\nআসসালামু আলাইকুম। আশা করি ভালো আছেন।\n\n`;
    emailBody += `আমাদের বিদ্যালয়ের অত্যন্ত সম্ভাবনাময় শিক্ষার্থী ও আপনার স্নেহের সন্তান ${record.studentName} (শ্রেণী: ${record.studentClass}, আইডি: ${record.studentId})-এর সাম্প্রতিক অগ্রগতি নিয়ে আমরা আপনাকে অবগত করতে পেরে আনন্দিত।\n\n`;

    if (tone === 'encouraging') {
      emailBody += `আমরা তার ${categoryLabel} দক্ষতা বৃদ্ধির জন্য বিশেষ পর্যবেক্ষণ করছি। আমরা লক্ষ্য করেছি যে, তার শিখন ধরন অত্যন্ত অনন্য (${learningStyleLabel})। এই ধরনটির সর্বোচ্চ ব্যবহারে আমরা তাকে শ্রেণীকক্ষে বাড়তি যত্ন দিচ্ছি।\n\n`;
      emailBody += `তার প্রাথমিক সক্ষমতা স্তর (${record.baselineStatus}) থেকে বর্তমানে সে "${record.currentStatus}" স্তরে এসে পৌঁছেছে। `;
      if (record.teacherRemarks) {
        emailBody += `তার অগ্রগতি সম্পর্কে আমাদের পর্যবেক্ষণ হলো: "${record.teacherRemarks}"। `;
      }
      emailBody += `তার এই চেষ্টাকে আমরা সাধুবাদ জানাই এবং আমরা বিশ্বাস করি উপযুক্ত উৎসাহ ও ধারাবাহিক পরিচর্যায় সে সামনের দিনগুলোতে আরও চমৎকার ফল বয়ে আনবে।\n\n`;
    } else if (tone === 'collaborative') {
      emailBody += `বিদ্যালয়ে আমরা তার ${categoryLabel}-এর জড়তা ও দুর্বলতা কাটিয়ে উঠতে বিশেষ কিছু কৌশল বা পদক্ষেপ গ্রহণ করেছি। বর্তমানে আমরা তার জন্য "${record.strategyUsed}" পদ্ধতিটি অনুসরণ করছি।\n\n`;
      emailBody += `এই শিক্ষণ প্রক্রিয়াটিকে আরও ফলপ্রসূ করতে আপনার পারিবারিক সহযোগিতা আমাদের একান্ত কাম্য। বাড়িতেও যদি তার পড়ালেখার জন্য একটি নির্দিষ্ট ও শান্ত পরিবেশ নিশ্চিত করেন এবং যেকোনো ছোট অর্জনে তাকে অনুপ্রাণিত করেন, তবে সে দ্বিগুণ উৎসাহে পড়াশোনা করবে। শিক্ষক ও অভিভাবকের যৌথ মেলবন্ধনই তাকে সঠিক লক্ষ্যে নিয়ে যাবে।\n\n`;
    } else { // celebrating
      emailBody += `অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, ${record.studentName} তার পড়াশোনায় আশাব্যাঞ্জক নিষ্ঠা প্রদর্শন করছে! বিশেষ করে ${categoryLabel} বিষয়ের উপর তার মনোযোগ এবং কঠোর পরিশ্রমের মাধ্যমে প্রগতি সংকেত বর্তমানে ${progressEmoji} "${progressLabel}" হিসেবে চিহ্নিত হয়েছে।\n\n`;
      emailBody += `তার এই অগ্রযাত্রায় আমরা গর্বিত। পূর্বে তার সক্ষমতার যে স্তর ছিল (${record.baselineStatus}), তা থেকে বর্তমানে সে উন্নত হয়ে "${record.currentStatus}" স্তরে অবস্থান করছে। তার এই প্রগতি ধরে রাখতে শ্রেণীকক্ষে আমাদের পরিচর্যা অব্যাহত থাকবে। আমরা আশা করি আপনার পক্ষ থেকেও এই ইতিবাচক প্রগতির জন্য তাকে বিশেষভাবে পুরস্কৃত বা উৎসাহিত করা হবে।\n\n`;
    }

    if (record.hiddenTalent) {
      emailBody += `বিশেষ দ্রষ্টব্য: আমরা এটাও আনন্দ সহকারে লক্ষ্য করেছি যে, ${record.studentName}-এর মধ্যে একটি দারুণ সুপ্ত প্রতিভা রয়েছে, যা হলো: "✨ ${record.hiddenTalent}"। সহশিক্ষা কার্যক্রমে তার এই আগ্রহকে আমাদের সবসময় লালন করা উচিত।\n\n`;
    }

    emailBody += `আপনার সন্তানের যেকোনো প্রয়োজন বা অগ্রগতি সম্পর্কে বিস্তারিত আলোচনা করতে আপনি যেকোনো সময় আমাদের সাথে যোগাযোগ করতে পারেন।\n\nআন্তরিক শুভেচ্ছাসহ,\nশ্রেণী শিক্ষক,\nবিদ্যালয় প্রাঙ্গণ।`;
    
    return { subject, body: emailBody };
  }, [record, tone, categoryLabel, learningStyleLabel, progressEmoji, progressLabel]);

  const handleCopySMS = () => {
    navigator.clipboard.writeText(smsDraft);
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 2000);
  };

  const handleCopyEmail = () => {
    const fullEmailText = `${emailDraft.subject}\n\n${emailDraft.body}`;
    navigator.clipboard.writeText(fullEmailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendEmail = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailDraft.subject)}&body=${encodeURIComponent(emailDraft.body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/40 to-slate-900 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Share2 className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <span>অভিভাবক বার্তা জেনারেটর (Parent Message Draft)</span>
                <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {record.studentName}
                </span>
              </h3>
              <p className="text-xs text-slate-400">শিক্ষার্থীর পারফরম্যান্স ডাটা ব্যবহার করে মার্জিত এবং উৎসাহব্যঞ্জক বার্তা তৈরি করুন</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Tone Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> বার্তার ভাব বা সুর নির্বাচন করুন (Select Message Tone):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              <button
                onClick={() => setTone('encouraging')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 ${
                  tone === 'encouraging'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                    : 'bg-slate-950/30 border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xs font-bold flex items-center gap-1">
                  <Heart className={`w-3.5 h-3.5 ${tone === 'encouraging' ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                  উৎসাহব্যঞ্জক ও অনুপ্রেরণাদায়ক
                </span>
                <span className="text-[10px] text-slate-400 leading-normal">
                  শিক্ষার্থীর অনন্য শিখন শৈলী ও বর্তমান চেষ্টার প্রশংসা করে উদ্দীপনা যোগাতে।
                </span>
              </button>

              <button
                onClick={() => setTone('collaborative')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 ${
                  tone === 'collaborative'
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-white'
                    : 'bg-slate-950/30 border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xs font-bold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  সহযোগিতা ও যৌথ প্রচেষ্টা
                </span>
                <span className="text-[10px] text-slate-400 leading-normal">
                  গৃহীত কৌশল উল্লেখ করে বাড়িতেও অভিভাবককে সহযোগিতার আহ্বান জানাতে।
                </span>
              </button>

              <button
                onClick={() => setTone('celebrating')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 ${
                  tone === 'celebrating'
                    ? 'bg-amber-500/15 border-amber-500/40 text-white'
                    : 'bg-slate-950/30 border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xs font-bold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  অগ্রগতি উদযাপন (Celebration)
                </span>
                <span className="text-[10px] text-slate-400 leading-normal">
                  পূর্বের বেসলাইনের তুলনায় বর্তমান উন্নত স্তর এবং ভালো প্রগতি তুলে ধরতে।
                </span>
              </button>

            </div>
          </div>

          {/* Tab Content 1: Short SMS */}
          <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>SMS বা ক্ষুদে বার্তার ড্রাফট (Short SMS Form)</span>
              </h4>
              <button
                onClick={handleCopySMS}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg transition hover:bg-white/10 cursor-pointer"
              >
                {copiedSMS ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-slate-950/70 border border-white/5 rounded-xl p-3.5 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
              {smsDraft}
            </div>

            <div className="text-[10px] text-slate-500 italic">
              * নোট: এই ক্ষুদে বার্তাটি অত্যন্ত সংক্ষেপিত এবং সরাসরি অভিভাবকের মোবাইল ফোনে পাঠানোর উপযোগী।
            </div>
          </div>

          {/* Tab Content 2: Detailed Email */}
          <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h4 className="text-xs font-black text-indigo-400 flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>প্রাতিষ্ঠানিক ও মার্জিত ইমেইল ড্রাফট (Formal Email Draft)</span>
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendEmail}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg transition hover:bg-indigo-500/20 cursor-pointer"
                  title="আপনার ইমেইল ক্লায়েন্টে সরাসরি ড্রাফট করুন"
                >
                  <Send className="w-3 h-3" />
                  <span>সরাসরি পাঠান</span>
                </button>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg transition hover:bg-white/10 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>কпи করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap space-y-3">
              <div className="font-bold border-b border-white/5 pb-2 text-indigo-300">
                {emailDraft.subject}
              </div>
              <div className="select-all pt-1">
                {emailDraft.body}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 italic">
              * নোট: ইমেইলটি অত্যন্ত মার্জিত এবং প্রাতিষ্ঠানিক ভাষায় অভিভাবকের সাথে গভীর সংযোগ স্থাপনের জন্য প্রস্তুত করা হয়েছে।
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/50 border-t border-white/10 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition cursor-pointer"
          >
            বন্ধ করুন (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
