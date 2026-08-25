import { db } from "./index";
import { programs, scheduleSlots, siteConfig } from "./schema";
import { YOUTUBE_LIVE_VIDEO_ID } from "../constants";

const PROGRAMS = [
  {
    id: "dharma-deshana",
    titleSi: "ධර්ම දේශනා",
    titleEn: "Dharma Sermons",
    descriptionSi:
      "බුදු රජාණන් වහන්සේගේ උතුම් සද්ධර්මය විවිධ ස්වාමීන් වහන්සේලා විසින් දේශනා කරනු ලබන ප්‍රධාන ධර්ම දේශනා වැඩසටහන",
    descriptionEn:
      "Our flagship program featuring Dharma sermons delivered by venerable monks, exploring the noble teachings of the Buddha",
    category: "dhamma",
    sortOrder: 1,
  },
  {
    id: "bauddha-sakachcha",
    titleSi: "බෞද්ධ සාකච්ඡා",
    titleEn: "Buddhist Discussions",
    descriptionSi:
      "බුද්ධ දර්ශනය, ත්‍රිපිටකය සහ දෛනික ජීවිතයට ධර්මය යොදා ගන්නා ආකාරය පිළිබඳ විද්වත් සාකච්ඡා",
    descriptionEn:
      "Scholarly discussions on Buddhist philosophy, the Tipitaka, and applying Dhamma to daily life",
    category: "dhamma",
    sortOrder: 2,
  },
  {
    id: "bhavana-margaya",
    titleSi: "භාවනා මාර්ගය",
    titleEn: "The Path of Meditation",
    descriptionSi:
      "විපස්සනා, සමථ සහ මෛත්‍රී භාවනා ක්‍රම ඇතුළු මාර්ගෝපදේශනාත්මක භාවනා වැඩසටහන්",
    descriptionEn:
      "Guided meditation programs including Vipassana, Samatha and Metta meditation techniques",
    category: "dhamma",
    sortOrder: 3,
  },
  {
    id: "ayurveda-saukhya",
    titleSi: "ආයුර්වේද සෞඛ්‍ය",
    titleEn: "Ayurveda Health",
    descriptionSi:
      "ශ්‍රී ලාංකික ආයුර්වේද වෛද්‍ය ක්‍රම, ඔෟෂධීය ශාක, ආහාර විද්‍යාව සහ ස්වාභාවික ප්‍රතිකාර ක්‍රම පිළිබඳ විශේෂඥ උපදේශ",
    descriptionEn:
      "Expert guidance on Sri Lankan Ayurvedic medicine, herbal remedies, nutrition and natural healing methods",
    category: "ayurveda",
    sortOrder: 4,
  },
  {
    id: "yoga-saha-suwaya",
    titleSi: "යෝග සහ සුවය",
    titleEn: "Yoga & Wellness",
    descriptionSi:
      "ශරීර-මනස් සුවතාවය සඳහා යෝග ආසන, ප්‍රාණායාම සහ සුවතාව වැඩිදියුණු කිරීමේ ක්‍රමෝපායන්",
    descriptionEn:
      "Yoga asanas, pranayama and wellness techniques for body-mind harmony",
    category: "yoga",
    sortOrder: 5,
  },
  {
    id: "fengshui-rahasa",
    titleSi: "ෆෙන්ෂුයි රහස",
    titleEn: "Feng Shui Secrets",
    descriptionSi:
      "ඔබේ නිවස සහ වැඩ කරන ස්ථානය සඳහා ෆෙන්ෂුයි සහ වාස්තු විද්‍යා මූලධර්ම",
    descriptionEn:
      "Feng Shui and Vastu Shastra principles for your home and workspace",
    category: "fengshui",
    sortOrder: 6,
  },
  {
    id: "yantra-lokaya",
    titleSi: "යන්ත්‍ර ලෝකය",
    titleEn: "World of Yantra",
    descriptionSi:
      "යන්ත්‍ර, මන්ත්‍ර සහ ජ්‍යෝතිෂ්‍ය විද්‍යාව පිළිබඳ අධ්‍යයනාත්මක වැඩසටහන්",
    descriptionEn:
      "Educational programs on Yantra, Mantra and astrological sciences",
    category: "yantra",
    sortOrder: 7,
  },
  {
    id: "saukhya-sanwada",
    titleSi: "සෞඛ්‍ය සංවාද",
    titleEn: "Health Talks",
    descriptionSi:
      "විවිධ සෞඛ්‍ය විශේෂඥයන් සමඟ සෞඛ්‍ය උපදේශන සහ සාකච්ඡා",
    descriptionEn:
      "Health counselling and discussions with various health experts",
    category: "wellness",
    sortOrder: 8,
  },
  {
    id: "karma-sakachcha",
    titleSi: "කර්ම සාකච්ඡා",
    titleEn: "Karma Talks",
    descriptionSi:
      "ආගම, සංස්කෘතිය, සමාජය සහ ජීවිතය පිළිබඳ විවෘත සාකච්ඡා සහ සම්මුඛ සාකච්ඡා",
    descriptionEn:
      "Open discussions and interviews on religion, culture, society and life",
    category: "talkshow",
    sortOrder: 9,
  },
  {
    id: "vishesha-wadasatahan",
    titleSi: "විශේෂ වැඩසටහන්",
    titleEn: "Special Programs",
    descriptionSi:
      "පෝය දින විශේෂ වැඩසටහන්, ධර්ම සැකසුම්, වාර්තාමය වැඩසටහන් සහ සජීවී ආවරණ",
    descriptionEn:
      "Poya day specials, Dhamma documentaries, and live event coverage",
    category: "special",
    sortOrder: 10,
  },
];

// dayOfWeek: 0=Sunday .. 6=Saturday. Daily blocks apply to every day (0-6).
const DAILY = [
  { start: "05:00", end: "06:00", program: "bhavana-margaya" },
  { start: "06:00", end: "08:00", program: "dharma-deshana" },
  { start: "19:00", end: "21:00", program: "dharma-deshana", repeat: true },
];
const WEEKDAYS = [1, 2, 3, 4, 5];
const WEEKDAY_SLOTS = [
  { start: "10:00", end: "11:30", program: "bauddha-sakachcha" },
  { start: "12:00", end: "13:00", program: "saukhya-sanwada" },
  { start: "15:00", end: "16:30", program: "karma-sakachcha" },
];

const SCHEDULE: {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  programId: string;
  isRepeat: boolean;
}[] = [];

for (let day = 0; day <= 6; day++) {
  for (const slot of DAILY) {
    SCHEDULE.push({
      dayOfWeek: day,
      startTime: slot.start,
      endTime: slot.end,
      programId: slot.program,
      isRepeat: Boolean(slot.repeat),
    });
  }
  if (WEEKDAYS.includes(day)) {
    for (const slot of WEEKDAY_SLOTS) {
      SCHEDULE.push({
        dayOfWeek: day,
        startTime: slot.start,
        endTime: slot.end,
        programId: slot.program,
        isRepeat: false,
      });
    }
  }
}

// Mon/Wed/Fri Ayurveda
for (const day of [1, 3, 5]) {
  SCHEDULE.push({
    dayOfWeek: day,
    startTime: "08:00",
    endTime: "09:30",
    programId: "ayurveda-saukhya",
    isRepeat: false,
  });
}
// Tue/Thu/Sat Yoga
for (const day of [2, 4, 6]) {
  SCHEDULE.push({
    dayOfWeek: day,
    startTime: "08:00",
    endTime: "09:00",
    programId: "yoga-saha-suwaya",
    isRepeat: false,
  });
}
// Saturday specials
SCHEDULE.push(
  {
    dayOfWeek: 6,
    startTime: "10:00",
    endTime: "12:00",
    programId: "vishesha-wadasatahan",
    isRepeat: false,
  },
  {
    dayOfWeek: 6,
    startTime: "14:00",
    endTime: "15:30",
    programId: "fengshui-rahasa",
    isRepeat: false,
  },
);
// Sunday specials
SCHEDULE.push(
  {
    dayOfWeek: 0,
    startTime: "14:00",
    endTime: "16:00",
    programId: "vishesha-wadasatahan",
    isRepeat: false,
  },
  {
    dayOfWeek: 0,
    startTime: "16:00",
    endTime: "17:30",
    programId: "yantra-lokaya",
    isRepeat: false,
  },
);

async function seed() {
  console.log(`Seeding ${PROGRAMS.length} programs...`);
  for (const program of PROGRAMS) {
    await db.insert(programs).values(program).onConflictDoUpdate({
      target: programs.id,
      set: program,
    });
  }

  console.log(`Seeding ${SCHEDULE.length} schedule slots...`);
  await db.delete(scheduleSlots);
  for (const slot of SCHEDULE) {
    await db.insert(scheduleSlots).values(slot);
  }

  console.log("Seeding site config...");
  const config = [
    { key: "youtube_live_video_id", value: YOUTUBE_LIVE_VIDEO_ID },
  ];
  for (const entry of config) {
    await db
      .insert(siteConfig)
      .values({ ...entry, updatedAt: new Date().toISOString() })
      .onConflictDoUpdate({
        target: siteConfig.key,
        set: { value: entry.value, updatedAt: new Date().toISOString() },
      });
  }

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
