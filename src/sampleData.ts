/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentRecord } from './types';

export const initialStudentRecords: StudentRecord[] = [
  {
    id: 'rec-1',
    studentName: 'তানভীর রহমান',
    studentId: 'S-202601',
    studentClass: 'ষষ্ঠ শ্রেণী (শ্রেণী - ৬)',
    weaknessCategory: 'Reading',
    weaknessLevel: 'Moderate',
    rootCause: 'যুক্তবর্ণ সনাক্তকরণে সমস্যা এবং দ্রুত রিডিং পড়তে না পারা।',
    learningStyle: 'Visual',
    behavior: 'ক্লাসে শান্ত থাকে তবে নতুনদের সামনে প্রশ্ন করতে দ্বিধাবোধ করে।',
    hiddenTalent: 'চমৎকার প্রাকৃতিক দৃশ্য আঁকতে পারে।',
    baselineStatus: 'প্রতি মিনিটে মাত্র ২০টি বাংলা শব্দ পড়তে পারত।',
    currentStatus: 'এখন প্রতি মিনিটে প্রায় ৩৫টি শব্দ এবং সহজ বাক্য পড়তে পারে।',
    progressSignal: 'Yellow',
    lastWeekProgressSignal: 'Red',
    strategyUsed: 'ফ্ল্যাশ কার্ড, বড় অক্ষরের ছবিযুক্ত বইয়ের ব্যবহার এবং দৈনিক ১০ মিনিট জোরে রিডিং পড়া।',
    teacherRemarks: 'পঠন গতি ও আত্মবিশ্বাস বাড়াতে ভিজ্যুয়াল ম্যাটেরিয়াল ব্যবহার চলমান রাখা প্রয়োজন।',
    createdAt: new Date('2026-06-15T10:30:00Z').toISOString(),
  },
  {
    id: 'rec-2',
    studentName: 'নুসরাত জাহান রিমি',
    studentId: 'S-202602',
    studentClass: 'সপ্তম শ্রেণী (শ্রেণী - ৭)',
    weaknessCategory: 'Math',
    weaknessLevel: 'Severe',
    rootCause: 'প্রাথমিক গাণিতিক সূত্র ও ভগ্নাংশের মূল ধারণা বুঝতে জটিলতা।',
    learningStyle: 'Kinesthetic',
    behavior: 'গণিত ক্লাস শুরু হলে ভীতি ও অতিরিক্ত উদ্বিগ্নতা প্রকাশ করে।',
    hiddenTalent: 'সহপাঠীদের সাথে দলগত কার্যক্রমে দারুণ নেতৃত্ব দেয়।',
    baselineStatus: 'সহজ ভগ্নাংশের সাধারণ যোগ-বিয়োগ করতে সম্পূর্ণ অক্ষম ছিল।',
    currentStatus: 'বাস্তব ব্লকের সাহায্যে এখন সহজ ভগ্নাংশ ও লসাগুর হিসাব মেলাতে পারে।',
    progressSignal: 'Yellow',
    lastWeekProgressSignal: 'Yellow',
    strategyUsed: 'হাতে-কলমে ব্যবহারের জন্য গণিত ব্লক, কাঠি এবং খেলার ছলে গণিত শিক্ষার ব্যবহার।',
    teacherRemarks: 'ভীতি অনেকটাই কেটেছে। বিশেষ যত্ন অব্যাহত রাখা প্রয়োজন, ধীরে ধীরে আত্মবিশ্বাস বাড়ছে।',
    createdAt: new Date('2026-06-18T11:45:00Z').toISOString(),
  },
  {
    id: 'rec-3',
    studentName: 'সাইদ আল হাসান',
    studentId: 'S-202603',
    studentClass: 'অষ্টম শ্রেণী (শ্রেণী - ৮)',
    weaknessCategory: 'Attention',
    weaknessLevel: 'Moderate',
    rootCause: 'দীর্ঘ সময় মনোযোগ ধরে রাখতে না পারা ও হাইপার-অ্যাক্টিভিটি (চঞ্চলতা)।',
    learningStyle: 'Auditory',
    behavior: 'অস্থিরতা প্রদর্শন করে এবং সহপাঠীদের ক্লাসের কাজে বিঘ্ন ঘটায়।',
    hiddenTalent: 'অসাধারণ বাংলা কবিতা আবৃত্তি ও তাৎক্ষণিক গল্প বলার প্রতিভা আছে।',
    baselineStatus: 'শ্রেণীকক্ষে ১০ মিনিটের বেশি সময় এক জায়গায় স্থির হয়ে বসতে পারত না।',
    currentStatus: 'পছন্দের আবৃত্তিভিত্তিক কার্যক্রমে একটানা ১৫-২০ মিনিট মনোযোগ রাখছে।',
    progressSignal: 'Green',
    lastWeekProgressSignal: 'Yellow',
    strategyUsed: 'বড় কাজকে ছোট ছোট ধাপে ভাগ করে দেওয়া এবং পাঠ্য বিষয়কে সুর ও আবৃত্তির মাধ্যমে উপস্থাপন।',
    teacherRemarks: 'পড়ার মাঝে মাঝে সংক্ষিপ্ত বিরতি ও প্রশংসামূলক টোকেন দেওয়ায় ইতিবাচক পরিবর্তন লক্ষ্য করা যাচ্ছে।',
    createdAt: new Date('2026-06-20T09:15:00Z').toISOString(),
  }
];
