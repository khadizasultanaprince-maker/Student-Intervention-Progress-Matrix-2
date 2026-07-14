/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PreloadedStudent {
  roll: string;
  name: string;
  gender: 'boy' | 'girl';
}

export const PRELOADED_STUDENTS: Record<string, PreloadedStudent[]> = {
  'প্লে': [
    { roll: '১', name: 'মোঃ মাজিদ', gender: 'boy' },
    { roll: '২', name: 'সালমান', gender: 'boy' },
    { roll: '৩', name: 'মোসাঃ মাহিরা', gender: 'girl' },
    { roll: '৪', name: 'মোঃ আব্দুল্লাহ প্রধান', gender: 'boy' },
    { roll: '৫', name: 'লামিম', gender: 'boy' },
    { roll: '৬', name: 'লামিয়া আঃ ফাতেমা', gender: 'girl' },
    { roll: '৭', name: 'হুমাইরা ইসলাম', gender: 'girl' },
    { roll: '৮', name: 'রাইসা মনি', gender: 'girl' },
    { roll: '৯', name: 'নুসরাত জাহান মাহিদা', gender: 'girl' },
    { roll: '১০', name: 'আব্দুল্লাহ আল মুয়াজ', gender: 'boy' },
    { roll: '১১', name: 'আরিয়ান', gender: 'boy' },
    { roll: '১২', name: 'সোহান ইস সাঈদ', gender: 'boy' },
    { roll: '১৩', name: 'আদিবা আফ্রা', gender: 'girl' },
    { roll: '১৪', name: 'আব্দুল্লাহ আহনাফ সাইফ', gender: 'boy' },
    { roll: '১৫', name: 'রিয়াদ', gender: 'boy' },
    { roll: '১৬', name: 'আমেনা আক্তার', gender: 'girl' },
    { roll: '১৭', name: 'সিনহা আক্তার', gender: 'girl' },
    { roll: '১৮', name: 'তাওসিফ', gender: 'boy' },
    { roll: '১৯', name: 'সাবিহা', gender: 'girl' },
    { roll: '২০', name: 'রোজামনি', gender: 'girl' },
    { roll: '২১', name: 'মাহিদা', gender: 'girl' },
    { roll: '২২', name: 'আদনান হোসেন মাহিন', gender: 'boy' },
    { roll: '২৩', name: 'মুবাসির', gender: 'boy' },
    { roll: '২৪', name: 'সুমাইয়া', gender: 'girl' },
    { roll: '২৫', name: 'নাফিসা আঃ ত্বোহা', gender: 'girl' },
    { roll: '২৬', name: 'সামির', gender: 'boy' },
    { roll: '২৭', name: 'নুসরাত মনি', gender: 'girl' },
    { roll: '২৮', name: 'তৈয়বা আক্তার আফসানা', gender: 'girl' }
  ],
  'নার্সারি': [
    { roll: '১', name: 'আফরিন সারা', gender: 'girl' },
    { roll: '২', name: 'মোসাঃ আদিবা', gender: 'girl' },
    { roll: '৩', name: 'মরিয়ম খানম রাইসা', gender: 'girl' },
    { roll: '৪', name: 'মাবিয়া জুন্নুবি', gender: 'girl' },
    { roll: '৫', name: 'আদিবা জান্নাত', gender: 'girl' },
    { roll: '৬', name: 'ইকফা', gender: 'girl' },
    { roll: '৭', name: 'হাছিবুল রহমান', gender: 'boy' },
    { roll: '৮', name: 'সামির ইসলাম', gender: 'boy' },
    { roll: '৯', name: 'জান্নাতুল ফেরদৌস', gender: 'girl' },
    { roll: '১০', name: 'মোঃ আজিম', gender: 'boy' },
    { roll: '১১', name: 'তাবিয়া ইসলাম', gender: 'girl' },
    { roll: '১২', name: 'আল রাব্বি', gender: 'boy' },
    { roll: '১৩', name: 'আব্দুল রোহান', gender: 'boy' },
    { roll: '১৪', name: 'নাঈমা', gender: 'girl' },
    { roll: '১৫', name: 'ইসরাত হুমাইরা', gender: 'girl' },
    { roll: '১৬', name: 'তানীম', gender: 'boy' },
    { roll: '১৭', name: 'সাব্বির', gender: 'boy' },
    { roll: '১৮', name: 'আদিবা আক্তার', gender: 'girl' },
    { roll: '১৯', name: 'মারিয়া', gender: 'girl' },
    { roll: '২০', name: 'মাছুমা আঃ মীম', gender: 'girl' },
    { roll: '২১', name: 'সারোয়ার মোহাম্মদ', gender: 'boy' },
    { roll: '২২', name: 'তৈয়বা', gender: 'girl' },
    { roll: '২৩', name: 'মেহেদী', gender: 'boy' },
    { roll: '২৪', name: 'মাবিয়া আক্তার', gender: 'girl' },
    { roll: '২৫', name: 'মমিতো ইসলাম রাফা', gender: 'girl' }
  ],
  'প্রথম': [
    { roll: '১', name: 'শিল্পী', gender: 'girl' },
    { roll: '২', name: 'নাহিন শেখ', gender: 'boy' },
    { roll: '৩', name: 'আশরা আক্তার মুক্তা', gender: 'girl' },
    { roll: '৪', name: 'মৌসুমী ইসলাম ইন্না', gender: 'girl' },
    { roll: '৫', name: 'তাসনুভা যারা', gender: 'girl' },
    { roll: '৬', name: 'হাফিজা জান্নাত', gender: 'girl' },
    { roll: '৭', name: 'ফারহান মাহিন', gender: 'boy' },
    { roll: '৮', name: 'দীপ্ত চন্দ্র শীল', gender: 'boy' },
    { roll: '৯', name: 'মারিয়া', gender: 'girl' },
    { roll: '১০', name: 'রাইয়ান', gender: 'boy' },
    { roll: '১১', name: 'আদিত্য চন্দ্র শীল', gender: 'boy' },
    { roll: '১২', name: 'ইলমা', gender: 'girl' },
    { roll: '১৩', name: 'আয়ান', gender: 'boy' },
    { roll: '১৪', name: 'তাহিরা ইশা', gender: 'girl' },
    { roll: '১৫', name: 'নুসরাত', gender: 'girl' },
    { roll: '১৬', name: 'তানহা', gender: 'girl' },
    { roll: '১৭', name: 'আরাফাত', gender: 'boy' },
    { roll: '১৮', name: 'আসফিয়া', gender: 'girl' },
    { roll: '১৯', name: 'আয়াত', gender: 'boy' },
    { roll: '২০', name: 'শিমুল দাস', gender: 'boy' },
    { roll: '২১', name: 'তোহফা', gender: 'girl' },
    { roll: '২২', name: 'ফাহাদ', gender: 'boy' },
    { roll: '২৩', name: 'নাদিম', gender: 'boy' },
    { roll: '২৪', name: 'মাহিরা মনি', gender: 'girl' },
    { roll: '২৫', name: 'আরিয়ান', gender: 'boy' }
  ],
  'দ্বিতীয়': [
    { roll: '১', name: 'শেখ মাহির', gender: 'boy' },
    { roll: '২', name: 'সাবিহা আক্তার', gender: 'girl' },
    { roll: '৩', name: 'ইনসিয়া পারভিজ ইমা', gender: 'girl' },
    { roll: '৪', name: 'আদিবা রায়হান সিনহা', gender: 'girl' },
    { roll: '৫', name: 'হামিম', gender: 'boy' },
    { roll: '৬', name: 'সাফিন শেখ', gender: 'boy' },
    { roll: '৭', name: 'জান্নাত আক্তার', gender: 'girl' },
    { roll: '৮', name: 'ইসরাফুল ইসলাম সিয়াম', gender: 'boy' },
    { roll: '৯', name: 'তাছীখয় তুল', gender: 'boy' },
    { roll: '১০', name: 'রেদুয়ান', gender: 'boy' },
    { roll: '১১', name: 'অরিনা জাহান নাজিফা', gender: 'girl' },
    { roll: '১২', name: 'ফাতেমা আক্তার', gender: 'girl' },
    { roll: '১৩', name: 'ইয়াছিন ঐশয়ত', gender: 'boy' },
    { roll: '১৪', name: 'রাইসা মনি', gender: 'girl' },
    { roll: '১৫', name: 'ফাতেমা আক্তার', gender: 'girl' },
    { roll: '১৬', name: 'মোঃ আরাফাত', gender: 'boy' },
    { roll: '১৭', name: 'কুলসুম', gender: 'girl' },
    { roll: '১৮', name: 'ছাকিব', gender: 'boy' },
    { roll: '১৯', name: 'তৌসিফ ইসলাম সায়েম', gender: 'boy' },
    { roll: '২০', name: 'আনাছ আকন্দ', gender: 'boy' },
    { roll: '২১', name: 'রাহাত', gender: 'boy' },
    { roll: '২২', name: 'আঃ রহমান', gender: 'boy' },
    { roll: '২৩', name: 'আয়ান', gender: 'boy' }
  ],
  'তৃতীয়': [
    { roll: '১', name: 'শিফা আক্তার', gender: 'girl' },
    { roll: '২', name: 'মোঃ মাহির', gender: 'boy' },
    { roll: '৩', name: 'عبدالله আব্দুল্লাহ আহনাফ সা\'দ', gender: 'boy' },
    { roll: '৪', name: 'তানজিম হাসান সোহান', gender: 'boy' },
    { roll: '৫', name: 'সুমাইয়া', gender: 'girl' },
    { roll: '৬', name: 'ফারহানা ইসলাম', gender: 'girl' },
    { roll: '৭', name: 'আবিদ হাসান', gender: 'boy' },
    { roll: '৮', name: 'আনিশা ইসমত আব্রি', gender: 'girl' },
    { roll: '৯', name: 'রাফিউল ইসলাম রাফিন', gender: 'boy' },
    { roll: '১০', name: 'মাইমুনা খানম রাইসা', gender: 'girl' },
    { roll: '১১', name: 'নাইমা নূর', gender: 'girl' },
    { roll: '১২', name: 'মোঃ রোহান', gender: 'boy' },
    { roll: '১৩', name: 'আয়েশা আইরিন', gender: 'girl' },
    { roll: '১৪', name: 'সায়মন খান', gender: 'boy' },
    { roll: '১৫', name: 'আশরাফুল ইসলাম', gender: 'boy' },
    { roll: '১৬', name: 'সাজিদ', gender: 'boy' },
    { roll: '১৭', name: 'আয়েশা', gender: 'girl' },
    { roll: '১৮', name: 'জুনায়েদ', gender: 'boy' },
    { roll: '১৯', name: 'ইয়ামিন', gender: 'boy' },
    { roll: '২০', name: 'মুকারমা জান্নাত', gender: 'girl' }
  ],
  'চতুর্থ': [
    { roll: '১', name: 'জিসান আহমেদ(নিরব)', gender: 'boy' },
    { roll: '২', name: 'সুরাইয়া আক্তার (শিফা)', gender: 'girl' },
    { roll: '৩', name: 'জোনাইদ ইসলাম', gender: 'boy' },
    { roll: '৪', name: 'রায়হান', gender: 'boy' },
    { roll: '৫', name: 'নাহিদুল', gender: 'boy' },
    { roll: '৬', name: 'রোহান আইয়ুব', gender: 'boy' },
    { roll: '৭', name: 'সানজিদা', gender: 'girl' },
    { roll: '৮', name: 'সুমাইয়া আক্তার', gender: 'girl' },
    { roll: '৯', name: 'হিমেল', gender: 'boy' },
    { roll: '১০', name: 'সাদিয়া আফরিন', gender: 'girl' },
    { roll: '১১', name: 'রাব্বি হোসেন', gender: 'boy' },
    { roll: '১২', name: 'মোঃ ইয়াদ আহমেদ(মাহিন)', gender: 'boy' },
    { roll: '১৩', name: 'সামিউল', gender: 'boy' },
    { roll: '১৪', name: 'ইমরান', gender: 'boy' }
  ],
  'পঞ্চম': [
    { roll: '১', name: 'পুনম দাস', gender: 'girl' },
    { roll: '২', name: 'মুন্নি', gender: 'girl' },
    { roll: '৩', name: 'তাসনিম', gender: 'girl' },
    { roll: '৪', name: 'সামিয়া', gender: 'girl' },
    { roll: '৫', name: 'হাবিবা রানী', gender: 'girl' },
    { roll: '৬', name: 'ইলা মনি', gender: 'girl' },
    { roll: '৭', name: 'আনিসা', gender: 'girl' },
    { roll: '৮', name: 'হাবিবা সরকার', gender: 'girl' },
    { roll: '৯', name: 'আছিয়া', gender: 'girl' },
    { roll: '১০', name: 'আরাফাত', gender: 'boy' },
    { roll: '১১', name: 'ইসমা চেলী', gender: 'girl' },
    { roll: '১২', name: 'আশরাফুল', gender: 'boy' },
    { roll: '১৩', name: 'তাবাচ্ছুম', gender: 'girl' },
    { roll: '১৪', name: 'ছায়েমা', gender: 'girl' },
    { roll: '১৫', name: 'সোহান', gender: 'boy' },
    { roll: '১৬', name: 'আরফান', gender: 'boy' },
    { roll: '১৭', name: 'রাবিয়া', gender: 'girl' },
    { roll: '১৮', name: 'জিহাদ', gender: 'boy' },
    { roll: '১৯', name: 'মাহিয়া', gender: 'girl' },
    { roll: '২০', name: 'জান্নাত', gender: 'girl' },
    { roll: '২১', name: 'ছাদিকুল', gender: 'boy' },
    { roll: '২২', name: 'সুমাইয়া', gender: 'girl' }
  ],
  'ষষ্ঠ': [
    { roll: '১', name: 'মাহিনুর', gender: 'girl' },
    { roll: '২', name: 'ছোয়া', gender: 'girl' },
    { roll: '৩', name: 'সালমান আকন্দ', gender: 'boy' },
    { roll: '৪', name: 'মোকাদ্দাস আল জিহাদ', gender: 'boy' },
    { roll: '৫', name: 'মোসাঃ আনহা', gender: 'girl' },
    { roll: '৬', name: 'অয়ন', gender: 'boy' },
    { roll: '৭', name: 'দেবরাজ বণিক', gender: 'boy' },
    { roll: '৮', name: 'মোঃ জিহান', gender: 'boy' },
    { roll: '৯', name: 'সীমা আক্তার', gender: 'girl' },
    { roll: '১০', name: 'রিফাত মিয়া', gender: 'boy' },
    { roll: '১১', name: 'বাহাদুর দুর্জয়', gender: 'boy' }
  ],
  'সপ্তম': [
    { roll: '১', name: 'তানহা আক্তার নাভা', gender: 'girl' },
    { roll: '২', name: 'আরোবী', gender: 'girl' },
    { roll: '৩', name: 'আনিকা বিথী', gender: 'girl' },
    { roll: '৪', name: 'ছোয়া', gender: 'girl' },
    { roll: '৫', name: 'নাছিম', gender: 'boy' },
    { roll: '৬', name: 'রাফিন', gender: 'boy' },
    { roll: '৭', name: 'সাব্বির', gender: 'boy' },
    { roll: '৮', name: 'মোসাঃ লামিয়া', gender: 'girl' }
  ],
  'অষ্টম': [
    { roll: '১', name: 'মোসাঃ নাইমা', gender: 'girl' },
    { roll: '২', name: 'মোসাঃ বিথী আক্তার', gender: 'girl' },
    { roll: '৩', name: 'মোসাঃ মিতু আক্তার', gender: 'girl' },
    { roll: '৪', name: 'মোসাঃ জান্নাতুল', gender: 'girl' },
    { roll: '৫', name: 'মোঃ তামিম', gender: 'boy' },
    { roll: '৬', name: 'আঃ রহিম', gender: 'boy' }
  ]
};

// Generates high quality placeholder photos for boy/girl
export interface PreloadedTeacher {
  serial: string;
  name: string;
  designation: string;
}

export const PRELOADED_TEACHERS: PreloadedTeacher[] = [
  { serial: '১', name: 'মিতু আক্তার', designation: 'প্রিন্সিপাল' },
  { serial: '২', name: 'মোখলেস', designation: 'আরবী শিক্ষক' },
  { serial: '৩', name: 'মাহবুব এলাহী প্রিন্স', designation: 'আইসিটি শিক্ষক' },
  { serial: '৪', name: 'সজীব', designation: 'সহকারী' },
  { serial: '৫', name: 'মাজহারুল', designation: 'সহকারী' },
  { serial: '৬', name: 'সালমা', designation: 'সহকারী' },
  { serial: '৭', name: 'মিতা', designation: 'সহকারী' },
  { serial: '৮', name: 'নাসরিন', designation: 'সহকারী' },
  { serial: '৯', name: 'মনির', designation: 'সহকারী' },
  { serial: '১০', name: 'শাহনাজ', designation: 'সহকারী' },
  { serial: '১১', name: 'শান্তা', designation: 'সহকারী' },
];

export function getPlaceholderAvatar(gender: 'boy' | 'girl', roll: string): string {
  const seed = parseInt(roll) || 1;
  if (gender === 'boy') {
    const boyAvatars = [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150'
    ];
    return boyAvatars[seed % boyAvatars.length];
  } else {
    const girlAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    ];
    return girlAvatars[seed % girlAvatars.length];
  }
}
