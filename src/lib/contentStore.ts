// Front-page content management store (localStorage-based)

export interface HeroStat {
  title: string;
  description: string;
  value: string;
  icon: string; // lucide icon name in kebab-case e.g. "calendar", "users", "trending-up"
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface FrontPageContent {
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  heroStats: HeroStat[];
  testimonials: TestimonialItem[];
  ctaHeadline: string;
  ctaHeadlineHighlight: string;
  ctaSubheadline: string;
  ctaNote: string;
}

const STORAGE_KEY = "trimly_frontpage_content";

export const defaultContent: FrontPageContent = {
  heroBadge: "Trusted by 500+ barbershops worldwide",
  heroHeadline: "The Ultimate",
  heroHeadlineHighlight: "Barbershop Software",
  heroSubheadline: "Streamline bookings, manage your team, and grow your business with the all-in-one platform designed exclusively for modern barbershops.",
  heroStats: [
    { title: "Smart Booking", description: "Automated scheduling", value: "50K+", icon: "calendar" },
    { title: "Team Management", description: "Staff & commissions", value: "500+", icon: "users" },
    { title: "Business Growth", description: "Analytics & reports", value: "99.9%", icon: "trending-up" },
  ],
  testimonials: [
    {
      name: "Rudi Hartono",
      role: "Owner, Barbershop Elang Jaya",
      content: "Trimly mengubah cara kami mengelola barbershop. Booking naik 40% dan no-show berkurang drastis. Luar biasa.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Bayu Setiawan",
      role: "Head Barber, Urban Fades",
      content: "Sistem jadwalnya sangat intuitif. Pelanggan saya suka bisa booking 24/7 langsung dari HP mereka.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Arief Hidayat",
      role: "Founder, Hidayat Barbershop",
      content: "Kami sudah pakai Trimly selama 2 tahun. Fitur analitiknya membantu kami memahami bisnis lebih baik dari sebelumnya.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ],
  ctaHeadline: "Ready to Transform Your",
  ctaHeadlineHighlight: "Barbershop?",
  ctaSubheadline: "Join hundreds of barbershops already using Trimly to streamline their operations and grow their business.",
  ctaNote: "No credit card required • 14-day free trial",
};

export function getFrontPageContent(): FrontPageContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultContent, ...JSON.parse(stored) };
    }
  } catch {}
  return defaultContent;
}

export function saveFrontPageContent(content: FrontPageContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
