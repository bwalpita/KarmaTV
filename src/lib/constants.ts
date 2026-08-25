export const YOUTUBE_CHANNEL_ID = "UCLxhZvxzUOzbtXE72HVJIdw";
export const YOUTUBE_CHANNEL_HANDLE = "@KarmaTV-Official";
export const YOUTUBE_LIVE_VIDEO_ID = "8xfN8FLGRRU";

export const WHATSAPP_NUMBER = "94704113113";

export const SOCIAL_LINKS = {
  youtube: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
  youtubeLive: `https://www.youtube.com/watch?v=${YOUTUBE_LIVE_VIDEO_ID}`,
  youtubeLiveEmbed: `https://www.youtube.com/embed/${YOUTUBE_LIVE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`,
  youtubeRss: `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
  facebook: "https://www.facebook.com/p/Karma-TV-61554372245259/",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const;

export const CONTACT = {
  email: "info@karmatv.lk",
  phone1: "070 411 3113",
  phone2: "011 275 5575",
  address: "No. 68/214, Kamathgodella Road, Habarakada, Homagama, Sri Lanka",
  mapLat: 6.844,
  mapLng: 80.0028,
} as const;

export type ProgramCategory =
  | "dhamma"
  | "wellness"
  | "ayurveda"
  | "yoga"
  | "fengshui"
  | "yantra"
  | "talkshow"
  | "special";

export const PROGRAM_CATEGORIES: Record<
  ProgramCategory,
  { icon: string; color: string }
> = {
  dhamma: { icon: "BookOpen", color: "#C9A84C" },
  wellness: { icon: "Heart", color: "#2A9D5C" },
  ayurveda: { icon: "Leaf", color: "#4A8C5C" },
  yoga: { icon: "Flower2", color: "#D4728C" },
  fengshui: { icon: "Home", color: "#7C6B5E" },
  yantra: { icon: "Star", color: "#8B6FC0" },
  talkshow: { icon: "Mic", color: "#5B7EC9" },
  special: { icon: "Sparkles", color: "#C9A84C" },
};
