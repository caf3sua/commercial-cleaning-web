import { getServices } from "@/services/dataService";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Dịch Vụ Vệ Sinh Chuyên Nghiệp | Vệ Sinh 247 - Ánh Ngọc Vinhomes",
  description: "Giải pháp vệ sinh căn hộ định kỳ, tổng vệ sinh chuyên sâu, giặt sofa thảm, diệt côn trùng, phủ bóng sàn tại Vinhomes.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Header & Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="inline-flex items-center space-x-1 bg-brand-green-light/60 border border-brand-green-border px-3 py-1.5 rounded-full text-brand-green text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          GIẢI PHÁP LÀM SẠCH TOÀN DIỆN
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Dịch Vụ Vệ Sinh Chuyên Nghiệp <br />
          Cho Không Gian Đẳng Cấp
        </h1>
        
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          Chúng tôi cung cấp các gói giải pháp làm sạch tỉ mỉ, từ căn hộ cao cấp Vinhomes đến các công trình công nghiệp quy mô lớn, cam kết mang lại sự hài lòng tuyệt đối.
        </p>
      </section>

      {/* 2. 8-Services Grid Section */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc) => (
            <div
              key={svc.slug}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-50">
                  <img
                    src={svc.bannerImage}
                    alt={svc.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2.5">
                  <span className="block text-[10px] font-bold text-brand-green uppercase tracking-widest">
                    {svc.category}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                    <Link href={`/dich-vu/${svc.slug}`}>
                      {svc.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {svc.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-50">
                <Link
                  href={`/dich-vu/${svc.slug}`}
                  className="text-xs font-bold text-brand-green hover:text-brand-green-hover flex items-center group/btn"
                >
                  Xem chi tiết
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Solid Royal Blue CTA Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-brand-green rounded-3xl text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3.5 max-w-xl text-center md:text-left">
            <h2 className="text-xl sm:text-3xl font-black">
              Bạn chưa tìm thấy dịch vụ <br className="hidden sm:inline" /> phù hợp?
            </h2>
            <p className="text-green-100 text-xs sm:text-sm leading-relaxed">
              Hãy liên hệ trực tiếp với chúng tôi để được tư vấn giải pháp vệ sinh tùy chỉnh theo yêu cầu riêng của bạn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/bao-gia"
              className="bg-white hover:bg-green-50 text-brand-green font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-md text-center transition-colors"
            >
              Yêu cầu báo giá
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm text-center transition-all"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
