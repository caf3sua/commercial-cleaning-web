import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building2, MapPin, Home, Wrench, Sofa } from "lucide-react";
import { getServices, getLatestNews, getCompanyInfo } from "@/services/dataService";
import ContactForm from "@/components/ContactForm";

export default async function Page() {
  const companyInfo = await getCompanyInfo();
  
  // Lấy chính xác 3 dịch vụ được mô tả trong ảnh
  const services = await getServices();
  const homepageServices = services.slice(0, 3); // Lấy 3 dịch vụ đầu tiên (Vệ sinh căn hộ định kỳ, Tổng vệ sinh chuyên sâu, Vệ sinh Sofa & Nệm)

  // Lấy 3 bài viết tin tức
  const newsList = await getLatestNews(3);

  const serviceOptions = services.map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  return (
    <div className="w-full">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50/70 via-white to-blue-50/20 overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 z-10">
              {/* Premium Badge */}
              <div className="inline-flex items-center bg-brand-blue-light border border-brand-blue-border px-3 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
                VINHOMES PREMIUM SERVICE
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Dịch Vụ Vệ Sinh <br />
                <span className="text-brand-blue">Chuẩn Mực Cao Cấp</span>
              </h1>

              {/* Slogan */}
              <p className="text-slate-500 italic text-base sm:text-lg">
                &quot;{companyInfo.slogan}&quot;
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#booking-section"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-7 py-3 rounded-lg text-sm shadow-md shadow-brand-blue/20 transition-all duration-200"
                >
                  Khảo sát giá ngay
                </a>
                <Link
                  href="/dich-vu"
                  className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 font-bold px-7 py-3 rounded-lg text-sm transition-all duration-200"
                >
                  Tìm hiểu thêm
                </Link>
              </div>

              {/* Avatar Stack & Project Stat */}
              <div className="flex items-center space-x-3.5 pt-6 border-t border-slate-100">
                <div className="flex -space-x-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Customer" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Customer" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    +50
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500">
                  <span className="text-brand-blue font-bold">500+</span> Dự án Vinhomes đã thi công
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 relative flex justify-center z-10">
              {/* Main image with drop shadow and slight tilt */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-350/50 border border-slate-100 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                  alt="Professional Cleaners at Vinhomes"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Floating overlap card */}
              <div className="absolute -bottom-6 left-4 sm:left-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl max-w-xs flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-700 uppercase tracking-wider">100%</span>
                  <span className="text-xs text-slate-500 font-bold leading-none">Cam kết sạch bong mới thanh toán</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. GIỚI THIỆU CÔNG TY (ABOUT SECTION) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Styled Circular Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-[10px] border-blue-50 shadow-lg z-10">
                <img
                  src="https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80"
                  alt="Cozy Sofa and Sanitizer"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Outer decorative blue circles */}
              <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full bg-blue-150/40 z-0 blur-sm" />
              <div className="absolute -bottom-6 -right-4 w-36 h-36 rounded-full bg-brand-blue-light/60 z-0" />
            </div>

            {/* Right Column: Copy & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Về Ánh Ngọc Vinhomes
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Kiến Tạo Không Gian Sống <br />
                Tinh Khiết
              </h2>
              
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Khởi nguồn từ mong muốn mang lại sự thảnh thơi cho những gia đình bận rộn tại các khu đô thị cao cấp, Vệ sinh 24/7 - Ánh Ngọc Vinhomes tự hào là đơn vị tiên phong trong giải pháp vệ sinh nhà ở chuyên sâu.
              </p>
              
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Sứ mệnh của chúng tôi không chỉ là dọn dẹp, mà là thổi khí lành vào không gian sống, loại bỏ mọi tác nhân gây hại để gia đình bạn tận hưởng trọn vẹn sự trong lành và sảng khoái ngay trong chính tổ ấm của mình. Mỗi nhân viên là một chuyên gia tận tâm, mang cam kết phục vụ chuẩn mực 5 sao.
              </p>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-brand-blue">05+</span>
                  <span className="text-xs font-bold text-slate-400">Năm kinh nghiệm</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-brand-blue">2,000+</span>
                  <span className="text-xs font-bold text-slate-400">Căn hộ hoàn thành</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DỊCH VỤ CỦA CHÚNG TÔI SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block">
              Dịch vụ của chúng tôi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Giải Pháp Vệ Sinh Toàn Diện
            </h2>
          </div>

          {/* 3-Column Services List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homepageServices.map((service, index) => {
              // Map dynamic icons
              const Icon = index === 0 ? Home : index === 1 ? Wrench : Sofa;
              return (
                <div
                  key={service.slug}
                  className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    {/* Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-6 mt-6 border-t border-slate-100/60">
                    <Link
                      href={`/dich-vu/${service.slug}`}
                      className="text-xs font-bold text-brand-blue hover:text-brand-blue-hover flex items-center group-hover:translate-x-0.5 transition-transform"
                    >
                      Tìm hiểu thêm
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. TIN TỨC & MẸO VẶT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block">
                Cẩm nang vệ sinh
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Tin tức & Mẹo vặt
              </h2>
            </div>
            
            <Link
              href="/tin-tuc"
              className="text-xs sm:text-sm font-bold text-brand-blue hover:underline pb-1"
            >
              Xem tất cả bài viết
            </Link>
          </div>

          {/* Vertical Blog Rows */}
          <div className="space-y-8 max-w-4xl">
            {newsList.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col sm:flex-row gap-6 items-start group"
              >
                {/* Image (1/3 Width on Desktop) */}
                <div className="relative aspect-video w-full sm:w-56 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                {/* Content (2/3 Width on Desktop) */}
                <div className="space-y-2 flex-grow">
                  <span className="block text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                    {post.category}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-snug">
                    <Link href={`/tin-tuc/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  
                  <span className="block text-[11px] text-slate-400 font-semibold pt-1">
                    {post.publishDate.split("-").reverse().join("/")} {/* Format to DD/MM/YYYY */}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LIÊN HỆ & VĂN PHÒNG SECTION */}
      <section id="booking-section" className="py-20 bg-slate-50 border-t border-slate-150 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Interactive form (7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
                Liên hệ với chúng tôi
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Bạn cần hỗ trợ? <br />
                Gửi tin nhắn ngay!
              </h3>
              
              <form className="space-y-5 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="Chọn số..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Lời nhắn
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Vui lòng cho chúng tôi biết nhu cầu của bạn..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3.5 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-brand-blue/10"
                >
                  Gửi yêu cầu báo giá
                </button>
              </form>
            </div>

            {/* Right side: Map and Info (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Map embed screenshot card */}
              <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1099684351336!2d105.93774847602058!3d20.988225089166922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a9db7120df0f%3A0x7d67cfb42e61a6b0!2sVinhomes%20Ocean%20Park!5e0!3m2!1svi!2s!4v1721400000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Bản đồ văn phòng Vệ Sinh 247 Ánh Ngọc"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Details card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 text-xs sm:text-sm text-slate-650">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Văn phòng</span>
                    <span className="text-slate-500">The Landmark, Vinhomes Central Park, Bình Thạnh, TP.HCM</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-slate-100">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Hotline</span>
                    <a href="tel:0911976839" className="text-brand-blue font-bold hover:underline">
                      0911976839
                    </a>
                    <span className="text-slate-400 block text-xs">Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
