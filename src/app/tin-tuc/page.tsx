import { getNews } from "@/services/dataService";
import BlogCard from "@/components/BlogCard";
import { Sparkles, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Tin Tức & Mẹo Dọn Dẹp | Vệ Sinh 247 - Ánh Ngọc Vinhomes",
  description: "Cập nhật các mẹo hay dọn dẹp nhà cửa, bí quyết giặt sofa, thảm sạch bong và hướng dẫn phòng chống côn trùng gây hại vào mùa ẩm ướt.",
};

export default async function NewsPage() {
  const allNews = await getNews();
  
  // Lọc lấy các tin nổi bật làm tiêu điểm
  const featuredPost = allNews.find(post => post.featured) || allNews[0];
  const regularPosts = allNews.filter(post => post.id !== featuredPost.id);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. Header Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 bg-white border-b border-slate-100">
        <div className="inline-flex items-center space-x-1 bg-blue-100/60 border border-brand-blue-border px-3 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          CẨM NANG DỌN NHÀ
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-blue tracking-tight leading-tight">
          Tin Tức & Kinh Nghiệm Vệ Sinh
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
          Chia sẻ các bí quyết khoa học để giữ gìn không gian sống luôn tươi mới, trong sạch và bảo vệ sức khỏe cho cả gia đình.
        </p>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left side: News articles (8 columns) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Highlighted Featured Post */}
            {featuredPost && (
              <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto w-full h-full overflow-hidden bg-slate-100 min-h-[250px]">
                    <span className="absolute top-4 left-4 z-10 bg-brand-blue text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
                      Tiêu Điểm: {featuredPost.category}
                    </span>
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold text-slate-400">
                        {formatDate(featuredPost.publishDate)} &bull; {featuredPost.readTime} &bull; Bởi {featuredPost.author}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-850 group-hover:text-brand-blue transition-colors leading-tight">
                        <Link href={`/tin-tuc/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-4 font-medium">
                        {featuredPost.summary}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-50">
                      <Link
                        href={`/tin-tuc/${featuredPost.slug}`}
                        className="inline-flex items-center text-brand-blue hover:text-brand-blue-hover text-xs font-bold"
                      >
                        Đọc toàn bộ bài viết
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-850 pb-2.5 border-b border-slate-200">
                Bài viết mới cập nhật
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

          </div>

          {/* Right side: Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Contact Widget */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base pb-2 border-b border-slate-100">
                Liên Hệ Đặt Lịch
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Bạn có nhu cầu dọn dẹp nhà cửa sau khi xem các cẩm nang của chúng tôi? Gọi hotline để được tư vấn miễn phí!
              </p>
              <div className="space-y-3 pt-2">
                <a
                  href="tel:0911976839"
                  className="flex items-center bg-brand-blue-light text-brand-blue font-bold p-3.5 rounded-xl text-xs hover:bg-brand-blue/15 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2.5 shrink-0" />
                  Hotline 1: 0911.976.839
                </a>
                <a
                  href="tel:0938129969"
                  className="flex items-center bg-brand-blue-light text-brand-blue font-bold p-3.5 rounded-xl text-xs hover:bg-brand-blue/15 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2.5 shrink-0" />
                  Hotline 2: 0938.129.969
                </a>
              </div>
            </div>

            {/* Trust Badge Widget */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-850 space-y-4">
              <div className="flex items-center space-x-2 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Cam Kết 5 Sao</span>
              </div>
              <h4 className="font-bold text-sm">VỆ SINH 247 ÁNH NGỌC</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">
                Chúng tôi cam kết sử dụng nhân sự trung thực, máy móc hiện đại và bồi hoàn nếu xảy ra bất kỳ sự cố ngoài ý muốn nào đối với tài sản của gia đình.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
