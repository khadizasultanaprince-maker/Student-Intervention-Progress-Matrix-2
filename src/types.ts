/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WeaknessCategory = 'Reading' | 'Writing' | 'Math' | 'Comm' | 'Attention' | 'Memory';
export type WeaknessLevel = 'Mild' | 'Moderate' | 'Severe';
export type LearningStyle = 'Visual' | 'Auditory' | 'Kinesthetic';
export type ProgressSignal = 'Red' | 'Yellow' | 'Green';

export interface StudentRecord {
  id: string; // Unique record ID for React keys & deletion
  studentName: string;
  studentId: string;
  studentClass: string;
  weaknessCategory: WeaknessCategory;
  weaknessLevel: WeaknessLevel;
  rootCause: string;
  learningStyle: LearningStyle;
  behavior: string;
  hiddenTalent: string;
  baselineStatus: string;
  currentStatus: string;
  progressSignal: ProgressSignal;
  strategyUsed: string;
  teacherRemarks: string;
  createdAt: string; // Timestamp
}

export const WeaknessCategoryLabels: Record<WeaknessCategory, string> = {
  Reading: 'পঠন (Reading)',
  Writing: 'লিখন (Writing)',
  Math: 'গণিত (Math)',
  Comm: 'যোগাযোগ (Communication)',
  Attention: 'মনোযোগ (Attention)',
  Memory: 'স্মৃতিশক্তি (Memory)',
};

export const WeaknessLevelLabels: Record<WeaknessLevel, string> = {
  Mild: 'মৃদু (Mild)',
  Moderate: 'মাঝারি (Moderate)',
  Severe: 'তীব্র (Severe)',
};

export const LearningStyleLabels: Record<LearningStyle, string> = {
  Visual: 'চাক্ষুষ (Visual)',
  Auditory: 'শ্রুতিগত (Auditory)',
  Kinesthetic: 'শারীরিক-সঞ্চালনমূলক (Kinesthetic)',
};

export const ProgressSignalLabels: Record<ProgressSignal, { label: string; emoji: string; colorClass: string; textClass: string; bgClass: string }> = {
  Red: {
    label: 'উদ্বেগজনক / ধীর প্রগতি',
    emoji: '🔴',
    colorClass: 'bg-red-500',
    textClass: 'text-red-700',
    bgClass: 'bg-red-50 border-red-200'
  },
  Yellow: {
    label: 'উন্নতিশীল / মাঝারি প্রগতি',
    emoji: '🟡',
    colorClass: 'bg-amber-500',
    textClass: 'text-amber-700',
    bgClass: 'bg-amber-50 border-amber-200'
  },
  Green: {
    label: 'সন্তোষজনক / দ্রুত প্রগতি',
    emoji: '🟢',
    colorClass: 'bg-green-500',
    textClass: 'text-green-700',
    bgClass: 'bg-green-50 border-green-200'
  },
};
