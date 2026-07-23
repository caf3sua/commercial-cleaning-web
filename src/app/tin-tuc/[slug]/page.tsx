import { getNewsBySlug, getNews } from "@/services/dataService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ChevronLeft, Phone, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Vệ Sinh 247",
    };
  }

  return {
    title: `${post.title} | Vệ Sinh 247 - Ánh Ngọc Vinhomes`,
    description: post.summary,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  const allNews = await getNews();
  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 5);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. Article Header Banner */}
      <section className="relative bg-slate-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full opacity-20 blur-sm object-center"
          />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center text-green-300 hover:text-white text-xs font-bold transition-colors mb-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Quay lại tin tức
          </Link>
          
          <span className="inline-block bg-brand-green text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
            {post.category}
          </span>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black leading-tight text-white font-sans tracking-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-white/10">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-brand-green-border" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-brand-green-border" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1.5 text-brand-green-border" />
              Tác giả: {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Article Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side: Body content (8 columns) */}
            <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Featured image */}
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-6 shadow-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Summary callout */}
              <p className="text-slate-700 text-sm sm:text-base font-bold italic border-l-4 border-brand-green pl-4 py-2 leading-relaxed bg-slate-50 rounded-r-xl p-4">
                {post.summary}
              </p>

              {/* Main content body */}
              <div className="text-slate-650 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
                {post.content}
              </div>

            </article>

            {/* Right side: Sidebar (4 columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Other articles */}
              {otherNews.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base pb-2 border-b border-slate-100">
                    Bài viết liên quan
                  </h3>
                  <div className="flex flex-col space-y-3">
                    {otherNews.map((newsItem) => (
                      <Link
                        key={newsItem.slug}
                        href={`/tin-tuc/${newsItem.slug}`}
                        className="text-xs text-slate-650 hover:text-brand-green font-bold flex items-start group py-1 border-b border-slate-50/50 pb-2 last:border-0"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{newsItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Hotline */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-850 space-y-4">
                <h3 className="font-bold text-base">Cần Vệ Sinh Nhà Cửa?</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Gọi điện trực tiếp cho Ánh Ngọc Vinhomes qua hotline để nhận tư vấn gói dịch vụ tốt nhất.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <a
                    href="tel:0911976839"
                    className="flex items-center text-brand-green hover:text-white font-black text-sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    0911.976.839
                  </a>
                  <a
                    href="tel:0938129969"
                    className="flex items-center text-brand-green hover:text-white font-black text-sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    0938.129.969
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
