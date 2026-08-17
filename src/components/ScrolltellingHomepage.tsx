"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  Award,
  Heart,
  ChevronDown,
  Star,
  Zap,
  Users,
  Check,
  CheckCircle,
  Clock,
  Building2,
  Calendar,
  MessageSquare,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ContactForm from "@/components/ContactForm";
import { CleaningService, NewsItem, CompanyInfo } from "@/services/dataService";

interface Props {
  companyInfo?: CompanyInfo;
  services?: CleaningService[];
  newsList: NewsItem[];
}

// Line art SVG Icons
const VacuumIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2" />
    <circle cx="8" cy="18" r="2" />
    <circle cx="16" cy="18" r="2" />
    <path d="M12 12V6a2 2 0 0 1 2-2h4" />
    <path d="M18 2v4" />
  </svg>
);

const IndustrialIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="6" height="14" rx="1" />
    <rect x="11" y="3" width="10" height="19" rx="1" />
    <line x1="6" y1="12" x2="6" y2="12.01" />
    <line x1="6" y1="16" x2="6" y2="16.01" />
    <line x1="15" y1="7" x2="15" y2="7.01" />
    <line x1="15" y1="11" x2="15" y2="11.01" />
    <line x1="15" y1="15" x2="15" y2="15.01" />
    <line x1="18" y1="7" x2="18" y2="7.01" />
    <line x1="18" y1="11" x2="18" y2="11.01" />
    <line x1="18" y1="15" x2="18" y2="15.01" />
  </svg>
);

const FloorPolishingIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12" />
    <path d="M7 15h10a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="7" r="3" />
    <path d="M4 21h16" />
  </svg>
);

const HospitalIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 22V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
    <path d="M12 10v6" />
    <path d="M10 13h4" />
    <path d="M2 22h20" />
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M9 11V6a3 3 0 0 1 6 0v5" />
    <line x1="6" y1="15" x2="18" y2="15" />
    <line x1="12" y1="11" x2="12" y2="22" />
  </svg>
);

const HourlyIcon = () => (
  <svg className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="8" width="12" height="9" rx="1" />
    <circle cx="6" cy="17" r="1.5" />
    <circle cx="10" cy="17" r="1.5" />
    <path d="M14 11h2l3 3v3h-5" />
    <circle cx="17" cy="7" r="4" />
    <path d="M17 5v2.5l1.5 1" />
  </svg>
);

const CHAPTERS = [
  { id: 0, num: "01", title: "Khởi đầu", subtitle: "Lời chào thương hiệu" },
  { id: 1, num: "02", title: "Hành trình", subtitle: "10+ Năm tận tâm" },
  { id: 2, num: "03", title: "Giải pháp 5★", subtitle: "6 Dịch vụ chuyên sâu" },
  { id: 3, num: "04", title: "Tiêu chuẩn", subtitle: "Công nghệ & Cam kết" },
  { id: 4, num: "05", title: "Niềm tin", subtitle: "Thành tựu & Đánh giá" },
  { id: 5, num: "06", title: "Liên hệ", subtitle: "Báo giá 24/7" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Chị Thanh Hằng",
    role: "Cư dân Vinhomes OCP Gia Lâm",
    rating: 5,
    comment:
      "Căn hộ penthouse của gia đình tôi sau khi được Ánh Ngọc làm sạch thực sự sáng bóng như mới bàn giao. Nhân viên rất cẩn thận, từng khe cửa lau sạch bách!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Anh Minh Tuấn",
    role: "Quản lý Văn phòng Tech Hub",
    rating: 5,
    comment:
      "Đội ngũ Ánh Ngọc hỗ trợ vệ sinh công nghiệp trọn gói cho văn phòng 600m² đúng tiến độ khắt khe trước ngày khai trương. Rất chuyên nghiệp và uy tín!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Cô Ngọc Lan",
    role: "Chủ biệt thự Vinhomes Riverside",
    rating: 5,
    comment:
      "Tôi đã dùng dịch vụ giặt sofa & đánh bóng sàn đá marble ở đây 3 năm nay. Rất an tâm về độ trung thực và tính tỉ mỉ của đội ngũ nhân viên.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
];

export default function ScrolltellingHomepage({ newsList }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  // 6 chapters = 600vw total width. Translate from 0% to -83.333%
  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-83.333%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(5, Math.floor(latest * 6));
      setActiveChapter(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;
    const targetY = (index / 5) * scrollableDistance + containerRef.current.offsetTop;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (activeChapter < 5) scrollToChapter(activeChapter + 1);
  };

  const handlePrev = () => {
    if (activeChapter > 0) scrollToChapter(activeChapter - 1);
  };

  return (
    <div className="relative bg-[#061811] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Scrolltelling Container (600vh height) */}
      <div ref={containerRef} className="relative h-[600vh] w-full">
        
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#061811]">
          
          {/* Top Gold Glowing Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 h-1.5 bg-black/40">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 shadow-[0_0_16px_rgba(203,162,88,0.8)]"
              style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
            />
          </div>

          {/* Floating Liquid Glass Header Navigation */}
          <header className="absolute top-4 left-4 right-4 md:left-8 md:right-8 z-40 flex items-center justify-between pointer-events-none">
            
            {/* Active Chapter Badge */}
            <div className="flex items-center space-x-3 pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#cba258]" />
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                  CHƯƠNG {CHAPTERS[activeChapter].num}
                </span>
                <span className="text-slate-400 text-xs">|</span>
                <span className="text-xs font-semibold text-white">
                  {CHAPTERS[activeChapter].title}
                </span>
              </div>
            </div>

            {/* Desktop Chapter Pills */}
            <div className="hidden lg:flex items-center space-x-1.5 pointer-events-auto bg-slate-950/70 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-2xl">
              {CHAPTERS.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => scrollToChapter(chap.id)}
                  className={`relative px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeChapter === chap.id
                      ? "text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {activeChapter === chap.id && (
                    <motion.div
                      layoutId="activeChapterPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-[0_0_12px_rgba(203,162,88,0.5)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{chap.num}. {chap.title}</span>
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2 pointer-events-auto">
              <button
                onClick={handlePrev}
                disabled={activeChapter === 0}
                className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-center text-slate-200 hover:bg-amber-500 hover:text-slate-950 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-200 transition-all cursor-pointer"
                aria-label="Chương trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapter === 5}
                className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-center text-slate-200 hover:bg-amber-500 hover:text-slate-950 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-200 transition-all cursor-pointer"
                aria-label="Chương tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* MAIN HORIZONTAL TRACK WRAPPER */}
          <motion.div
            style={{ x: xTransform }}
            className="flex h-full w-[600vw] ease-out"
          >
            {/* ============================================================ */}
            {/* SLIDE 1: CHAPTER 01 - PROLOGUE (HERO LUXURY)                  */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#04120D] text-white p-6 md:p-16">
              
              {/* Radial Ambient Glows */}
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[160px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[160px] pointer-events-none" />

              <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-10">
                
                {/* Hero Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold backdrop-blur-md"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Dọn Dẹp Vệ Sinh 247 Ánh Ngọc – Chuẩn Vệ Sinh 5 Sao</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
                  >
                    Nâng Tầm Không Gian Sống <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-amber-400">
                      Sạch Tinh Tươm & An Lành
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl"
                  >
                    Giải pháp vệ sinh chuyên sâu cho căn hộ, biệt thự và văn phòng tại Hà Nội.
                    Hơn 10 năm đồng hành cùng hàng trăm gia đình để gìn giữ sự trong lành và hạnh phúc trọn vẹn.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 pt-2"
                  >
                    <button
                      onClick={() => scrollToChapter(2)}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm sm:text-base hover:from-emerald-500 hover:to-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_8px_30px_rgba(0,117,74,0.5)] flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Khám phá bộ dịch vụ</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => scrollToChapter(5)}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-md cursor-pointer"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Báo giá 24/7: 0938 129 969</span>
                    </button>
                  </motion.div>
                </div>

                {/* Hero Feature Glass Card / Image Showcase */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
                    <img
                      src="/hero_banner.png"
                      alt="Ánh Ngọc Cleaning Luxury Showcase"
                      className="w-full h-[320px] sm:h-[380px] object-cover rounded-2xl shadow-md transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
                      <div className="text-left space-y-1">
                        <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
                          Ánh Ngọc Vinhomes
                        </span>
                        <h3 className="text-lg font-bold text-white">Chuyên Nghiệp – Đúng Hẹn – Tận Tâm</h3>
                        <p className="text-xs text-slate-300">Cam kết 100% sạch bong mới thanh toán</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Mouse Scroll Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 opacity-75 animate-bounce">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Cuộn chuột để trải nghiệm câu chuyện ➔
                </span>
                <ChevronDown className="w-4 h-4 text-amber-400" />
              </div>
            </section>

            {/* ============================================================ */}
            {/* SLIDE 2: CHAPTER 02 - STORY & TRANSFORMATION                  */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative flex items-center justify-center bg-[#0A1F18] text-white p-6 md:p-16">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
                
                {/* Interactive Before / After Visual Showcase */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-left space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Hiệu ứng làm sạch thực tế</span>
                    <h3 className="text-xl font-bold text-white">Kéo thanh trượt để xem sự khác biệt</h3>
                  </div>

                  <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 select-none">
                    {/* Before Image (Dirty/Uncleaned) */}
                    <img
                      src="/images/IMG_3535.JPG"
                      alt="Khung cảnh thi công dọn dẹp"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-black/70 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      Trước dọn dẹp
                    </span>

                    {/* After Image (Cleaned & Polished) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${beforeAfterSlider}%` }}
                    >
                      <img
                        src="/images/IMG_3541.JPG"
                        alt="Không gian sau khi hoàn thiện"
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: containerRef.current ? "100%" : "100%" }}
                      />
                      <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Sau khi vệ sinh 5★
                      </span>
                    </div>

                    {/* Divider & Slider Control Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize flex items-center justify-center shadow-[0_0_12px_#cba258]"
                      style={{ left: `${beforeAfterSlider}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl text-xs font-black">
                        ↔
                      </div>
                    </div>

                    {/* Interactive Input Overlay */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={beforeAfterSlider}
                      onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                    />
                  </div>
                </div>

                {/* Story Text Narrative */}
                <div className="lg:col-span-6 space-y-5 lg:pl-6 text-left">
                  <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
                    <Award className="w-4 h-4" />
                    <span>Chương 02 · Câu Chuyện 10+ Năm</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
                    &quot;Làm Bằng Cái Tâm – <br />
                    <span className="text-amber-400">Giữ Trọn Niềm Tin&quot;</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Hơn 10 năm đồng hành cùng cư dân tại các khu đô thị lớn như Vinhomes Ocean Park, Vinhomes Riverside, Times City... chúng tôi hiểu rằng không gian sống sạch sẽ là nguồn năng lượng mang lại sự bình yên và hạnh phúc.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <h4 className="text-xs font-bold text-white">Máy Móc Công Nghệ Cao</h4>
                      </div>
                      <p className="text-[11px] text-slate-400">Máy hút bụi công suất lớn & công nghệ phun hút giặt thảm.</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <h4 className="text-xs font-bold text-white">Đội Ngũ Thật Thà</h4>
                      </div>
                      <p className="text-[11px] text-slate-400">Có căn cước, lý lịch rõ ràng, được đào tạo bài bản.</p>
                    </div>
                  </div>

                  <p className="text-xs text-amber-200/90 italic border-l-2 border-amber-400 pl-4 py-1">
                    &ldquo;Khách hàng chọn Ánh Ngọc vì dịch vụ sạch sâu, đúng hẹn và sự an tâm tuyệt đối khi bàn giao chìa khóa căn hộ.&rdquo;
                  </p>
                </div>

              </div>
            </section>

            {/* ============================================================ */}
            {/* SLIDE 3: CHAPTER 03 - SERVICE BENTO GRID (BỘ GIẢI PHÁP)      */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative flex items-center justify-center bg-[#051610] text-white p-6 md:p-16">
              <div className="max-w-7xl mx-auto w-full space-y-6 pt-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                    Chương 03 · Bộ Giải Pháp Dịch Vụ 5★
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white">
                    Giải Pháp Vệ Sinh Chuyên Sâu Cho Mọi Không Gian
                  </h2>
                </div>

                {/* 6 Bento Grid Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  
                  {/* Service 1 */}
                  <Link href="/dich-vu/don-dep-theo-gio-thang" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <VacuumIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Vệ Sinh Nhà Ở
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Phổ biến
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Làm sạch toàn bộ phòng khách, bếp, phòng ngủ, nhà vệ sinh. Khử khuẩn an toàn cho bé & người già.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Service 2 */}
                  <Link href="/dich-vu/ve-sinh-cong-nghiep" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <IndustrialIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Vệ Sinh Công Nghiệp
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Chuyên sâu
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tổng vệ sinh nhà mới xây, cửa hàng, nhà xưởng. Máy chà sàn & tẩy sơn xi măng chuyên dụng.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Service 3 */}
                  <Link href="/dich-vu/phu-bong-san" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <FloorPolishingIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Đánh Bóng Sàn Đá/Gỗ
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Phục hồi độ sáng bóng như mới cho sàn đá Marble, Granite, sàn gỗ tự nhiên & công nghiệp.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Service 4 */}
                  <Link href="/dich-vu/ve-sinh-cong-nghiep" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <HospitalIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Vệ Sinh Bệnh Viện
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Quy trình vô trùng y tế khắt khe, hóa chất sinh học khử khuẩn an toàn cao nhất.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Service 5 */}
                  <Link href="/dich-vu/ve-sinh-cong-nghiep" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <OfficeIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Vệ Sinh Văn Phòng
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Giặt thảm văn phòng, vệ sinh máy tính & bàn ghế làm việc, mang lại môi trường năng động.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Service 6 */}
                  <Link href="/dich-vu/don-dep-theo-gio-thang" className="group bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <HourlyIcon />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          Dọn Dẹp Theo Giờ
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Linh hoạt
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Đặt người giúp việc theo giờ linh động, đáp ứng nhanh chóng yêu cầu dọn dẹp thường nhật.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Khám phá chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SLIDE 4: CHAPTER 04 - STANDARDS & TECH                       */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative flex items-center justify-center bg-[#071D15] text-white p-6 md:p-16">
              <div className="max-w-6xl mx-auto w-full space-y-6 pt-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                    Chương 04 · Tiêu Chí Hoạt Động
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white">
                    3 Cam Kết Vàng Uy Tín Hàng Đầu
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Criterion 1 */}
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 text-left">
                    <div className="relative rounded-2xl overflow-hidden h-36">
                      <img src="/criteria_professional.png" alt="Chuyên nghiệp tận tâm" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                        <span className="text-xs font-bold text-amber-400 bg-black/60 px-2.5 py-1 rounded-md">
                          Tiêu chí 01
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">Chuyên Nghiệp – Tận Tâm</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tư vấn viên kinh nghiệm, cam kết bảo hành dịch vụ và làm lại miễn phí nếu quý khách chưa hài lòng.
                      </p>
                    </div>
                  </div>

                  {/* Criterion 2 */}
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 text-left">
                    <div className="relative rounded-2xl overflow-hidden h-36">
                      <img src="/criteria_standard_maid.png" alt="Giúp việc tiêu chuẩn" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                        <span className="text-xs font-bold text-amber-400 bg-black/60 px-2.5 py-1 rounded-md">
                          Tiêu chí 02
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">Nhân Sự Tiêu Chuẩn</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Hồ sơ pháp lý minh bạch, được đào tạo trực tiếp bởi Ánh Ngọc, cẩn thận và thạo nghề.
                      </p>
                    </div>
                  </div>

                  {/* Criterion 3 */}
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 text-left">
                    <div className="relative rounded-2xl overflow-hidden h-36">
                      <img src="/criteria_reasonable_cost.png" alt="Chi phí hợp lý" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                        <span className="text-xs font-bold text-amber-400 bg-black/60 px-2.5 py-1 rounded-md">
                          Tiêu chí 03
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">Chi Phí Hợp Lý & Rõ Ràng</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Báo giá trọn gói minh bạch ngay từ khi tư vấn, không có bất kỳ phụ phí phát sinh thêm nào.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Banner */}
                <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">Công Nghệ Khử Trùng & Lọc HEPA Bệnh Viện</h4>
                      <p className="text-xs text-slate-300">Tiêu diệt 99.9% mầm bệnh, sử dụng khăn lau microfiber chống ô nhiễm chéo.</p>
                    </div>
                  </div>
                  <button onClick={() => scrollToChapter(5)} className="px-6 py-2.5 bg-amber-400 text-slate-950 rounded-full font-bold text-xs hover:bg-amber-300 transition-colors flex-shrink-0 cursor-pointer">
                    Đặt lịch tư vấn
                  </button>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SLIDE 5: CHAPTER 05 - STATS & CUSTOMER REVIEWS                */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative flex items-center justify-center bg-[#04140E] text-white p-6 md:p-16">
              <div className="max-w-6xl mx-auto w-full space-y-8 pt-8">
                
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                    Chương 05 · Thành Tựu & Đánh Giá
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white">
                    Minh Chứng Cho Niềm Tin Của Khách Hàng
                  </h2>
                </div>

                {/* 4 Animated Counter Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 block">
                      <AnimatedCounter value={295} />
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase block">
                      Chủ nhà nghiệm thu
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 block">
                      <AnimatedCounter value={400} />+
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase block">
                      Khách hàng hài lòng
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 block">
                      <AnimatedCounter value={527} />
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase block">
                      Dự án hoàn thành
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 block">
                      <AnimatedCounter value={105} />
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase block">
                      Địa điểm làm sạch
                    </span>
                  </div>
                </div>

                {/* 3 Real Customer Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {REVIEWS.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-3xl border border-white/15 backdrop-blur-xl flex flex-col justify-between text-left space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-9 h-9 rounded-full object-cover border border-amber-400/40"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                          <p className="text-[10px] text-amber-300">{rev.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* ============================================================ */}
            {/* SLIDE 6: CHAPTER 06 - ACTION & INSTANT BOOKING               */}
            {/* ============================================================ */}
            <section className="w-[100vw] h-full flex-shrink-0 relative flex items-center justify-center bg-[#061811] text-white p-4 sm:p-6 md:p-12">
              <div className="max-w-7xl mx-auto w-full h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-y-auto lg:overflow-visible">
                
                {/* Left Side: News & Guides */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Cẩm nang vệ sinh</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Tin Tức & Mẹo Vặt Mới Nhất</h3>
                    </div>
                    <Link href="/tin-tuc" className="text-xs font-bold text-amber-400 hover:underline flex items-center space-x-1">
                      <span>Tất cả</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {newsList.slice(0, 3).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/tin-tuc/${item.slug}`}
                        className="group bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all flex space-x-3 items-center backdrop-blur-md"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] font-bold text-amber-300 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors mt-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.summary}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Hotline CTAs */}
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Hotline hỗ trợ 24/7</p>
                      <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold text-amber-400 mt-0.5">
                        <a href="tel:0938129969" className="hover:underline">0938 129 969</a>
                        <span>•</span>
                        <a href="tel:0911976839" className="hover:underline">0911 976 839</a>
                      </div>
                    </div>
                    <a
                      href="https://zalo.me/0938129969"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full text-xs font-black hover:scale-105 transition-transform"
                    >
                      Chat Zalo
                    </a>
                  </div>
                </div>

                {/* Right Side: Glass Contact Form & Location Diptych */}
                <div className="lg:col-span-7 bg-white text-slate-900 p-5 sm:p-6 rounded-3xl shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-left">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Khảo sát & Báo giá nhanh</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Gửi Yêu Cầu Dịch Vụ Vệ Sinh 24/7
                    </h3>
                  </div>

                  <ContactForm />

                  <div className="pt-2 text-xs text-slate-600 flex items-center justify-between border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Toà P3, KĐT Vinhomes OCP Gia Lâm, Hà Nội</span>
                    </span>
                    <span className="font-bold text-emerald-700">Nghiệm thu mới thanh toán</span>
                  </div>
                </div>

              </div>
            </section>

          </motion.div>

          {/* Footer Chapter Status Bar */}
          <footer className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 z-40 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-xl text-xs font-semibold text-slate-300 flex items-center space-x-2">
              <span>Cuộn chuột để di chuyển</span>
              <span className="text-amber-400 font-bold">{Math.round(smoothProgress.get() * 100)}%</span>
            </div>

            <div className="pointer-events-auto flex items-center space-x-2">
              <a
                href="tel:0938129969"
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full text-xs font-black shadow-lg transition-all flex items-center space-x-1.5 hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>0938 129 969</span>
              </a>
            </div>
          </footer>

        </div>
      </div>

    </div>
  );
}
