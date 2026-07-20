"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, Phone } from "lucide-react";
import { NewsItem } from "@/services/dataService";
import { motion } from "framer-motion";

interface NewsPageClientProps {
  initialNews: NewsItem[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function NewsPageClient({ initialNews }: NewsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Categories mapping to match the design screenshot exactly
  const categoriesList = [
    { name: "Mẹo dọn dẹp nhà cửa", count: 12 },
    { name: "Kiến thức vệ sinh công nghiệp", count: 8 },
    { name: "Công trình đã hoàn thành", count: 15 },
    { name: "Ưu đãi tháng", count: 3 }
  ];

  // Map database category names to display names if needed (e.g. normalize)
  const normalizeCategory = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("mẹo") || c.includes("meo")) return "Mẹo dọn dẹp nhà cửa";
    if (c.includes("kiến thức") || c.includes("kien thuc")) return "Kiến thức vệ sinh công nghiệp";
    if (c.includes("công trình") || c.includes("cong trinh")) return "Công trình đã hoàn thành";
    if (c.includes("ưu đãi") || c.includes("uu dai")) return "Ưu đãi tháng";
    return cat;
  };

  // Filtered news items
  const filteredNews = useMemo(() => {
    return initialNews.filter((post) => {
      const normalizedPostCat = normalizeCategory(post.category);
      const matchesCategory = selectedCategory
        ? normalizedPostCat === selectedCategory
        : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [initialNews, selectedCategory, searchQuery]);

  // Pagination config
  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / postsPerPage));

  // If current page is out of bounds, reset it
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Paginated items
  const paginatedNews = useMemo(() => {
    const start = (safeCurrentPage - 1) * postsPerPage;
    return filteredNews.slice(start, start + postsPerPage);
  }, [filteredNews, safeCurrentPage, postsPerPage]);

  // Featured post is the first item on Page 1 (if available)
  const featuredPost = safeCurrentPage === 1 ? paginatedNews[0] : null;
  const gridPosts = featuredPost ? paginatedNews.slice(1) : paginatedNews;

  // Format date helper: "15 Tháng 5, 2024"
  const formatDateToVietnamese = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day} Tháng ${month}, ${year}`;
    } catch {
      return dateStr;
    }
  };

  // 3 Popular posts matching screenshot
  const popularPosts = useMemo(() => {
    return [...initialNews]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  }, [initialNews]);

  // Category badge colors map
  const getCategoryStyles = (cat: string) => {
    const normalized = normalizeCategory(cat);
    switch (normalized) {
      case "Mẹo dọn dẹp nhà cửa":
        return "bg-[#f3f0ff] text-[#6b21a8]";
      case "Kiến thức vệ sinh công nghiệp":
        return "bg-[#eff6ff] text-[#1d4ed8]";
      case "Công trình đã hoàn thành":
        return "bg-[#ecfdf5] text-[#047857]";
      case "Ưu đãi tháng":
        return "bg-[#fff1f2] text-[#be123c]";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden">
      
      {/* Header Info Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8"
      >
        <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight leading-none mb-3">
          Cẩm nang & Tin tức
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
          Cập nhật những mẹo dọn dẹp hữu ích, kiến thức vệ sinh chuyên sâu và các ưu đãi mới nhất từ Ánh Ngọc Vinhomes.
        </p>
      </motion.section>

      {/* Main Content Grid */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left side: News articles (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {filteredNews.length === 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm"
              >
                <p className="text-slate-400 font-medium">Không tìm thấy bài viết nào phù hợp.</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {/* Highlighted Featured Post (Only on Page 1) */}
                {featuredPost && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={scaleIn}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative aspect-[4/3] md:aspect-auto w-full h-full overflow-hidden bg-slate-100 min-h-[260px]">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="bg-[#0038a8] text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                              {normalizeCategory(featuredPost.category).toUpperCase()}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {formatDateToVietnamese(featuredPost.publishDate)}
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug group-hover:text-[#0038a8] transition-colors">
                            <Link href={`/tin-tuc/${featuredPost.slug}`}>
                              {featuredPost.title}
                            </Link>
                          </h2>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                            {featuredPost.summary}
                          </p>
                        </div>
                        <div className="pt-2">
                          <Link
                            href={`/tin-tuc/${featuredPost.slug}`}
                            className="inline-flex items-center text-[#0038a8] hover:text-[#002d96] text-xs font-bold transition-colors"
                          >
                            Xem chi tiết
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Regular Posts Grid */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {gridPosts.map((post) => {
                    const isProject = normalizeCategory(post.category) === "Công trình đã hoàn thành";
                    return (
                      <motion.article
                        key={post.slug}
                        variants={fadeInUp}
                        className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-102"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="inline-block">
                              <span className={`text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${getCategoryStyles(post.category)}`}>
                                {normalizeCategory(post.category).toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#0038a8] transition-colors">
                              <Link href={`/tin-tuc/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 font-medium">
                              {post.summary}
                            </p>
                          </div>
                          <div className="pt-2">
                            <Link
                              href={`/tin-tuc/${post.slug}`}
                              className="inline-flex items-center text-[#0038a8] hover:text-[#002d96] text-xs font-bold transition-colors"
                            >
                              {isProject ? "Xem dự án" : "Đọc thêm"}
                              <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>

                {/* Pagination component */}
                {totalPages > 1 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex justify-center items-center space-x-2 pt-6"
                  >
                    <button
                      onClick={() => handlePageChange(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition ${
                          safeCurrentPage === pageNum
                            ? "bg-[#0038a8] text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
                    >
                      &gt;
                    </button>
                  </motion.div>
                )}
              </div>
            )}

          </div>

          {/* Right side: Sidebar (4 columns) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-4 space-y-6"
          >
            
            {/* Search Widget */}
            <motion.div variants={scaleIn} className="bg-[#eff6ff]/60 border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-extrabold text-[#0f172a] text-sm">
                Tìm kiếm bài viết
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập từ khóa..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0038a8] focus:ring-1 focus:ring-[#0038a8] transition shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </motion.div>

            {/* Categories Widget */}
            <motion.div variants={fadeInUp} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-[#0f172a] text-sm pb-1 border-b border-slate-50">
                Chuyên mục
              </h3>
              <div className="space-y-2">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(isActive ? null : cat.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? "bg-[#eff6ff] text-[#0038a8]"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        isActive ? "bg-[#0038a8] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {cat.count.toString().padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Popular Posts Widget */}
            <motion.div variants={fadeInUp} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-[#0f172a] text-sm pb-1 border-b border-slate-50">
                Bài viết phổ biến
              </h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <div key={post.slug} className="flex space-x-3 group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 bg-slate-100 group-hover:opacity-90 transition"
                    />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-[#0038a8] transition-colors line-clamp-2">
                        <Link href={`/tin-tuc/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {post.views.toLocaleString()} lượt xem
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action Banner */}
            <motion.div variants={scaleIn} className="relative bg-[#0038a8] text-white p-7 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between min-h-[220px]">
              {/* Vacuum SVG background overlay */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20h18M6 20V8a6 6 0 0 1 12 0v12M9 20V12h6v8" />
                </svg>
              </div>
              <div className="space-y-3 relative z-10">
                <h3 className="font-black text-lg leading-tight">
                  Cần dọn dẹp ngay?
                </h3>
                <p className="text-blue-100 text-[11px] leading-relaxed font-medium">
                  Đội ngũ chuyên nghiệp của Ánh Ngọc luôn sẵn sàng phục vụ 24/7 tại các phân khu Vinhomes.
                </p>
              </div>
              <div className="pt-4 relative z-10">
                <a
                  href="tel:0911976839"
                  className="block w-full text-center bg-white text-[#0038a8] hover:bg-slate-50 font-bold py-3 rounded-xl text-xs transition duration-200"
                >
                  GỌI NGAY: 0911976839
                </a>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* Floating Green Hotline Button */}
      <motion.a
        href="tel:0911976839"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed right-6 bottom-24 z-50 w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
        title="Gọi hotline tư vấn"
      >
        <Phone className="w-5 h-5 fill-white animate-pulse" />
      </motion.a>

    </div>
  );
}
