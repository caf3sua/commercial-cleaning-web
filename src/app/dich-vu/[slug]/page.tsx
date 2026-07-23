import { getServiceBySlug, getServices } from "@/services/dataService";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import BookingForm from "@/components/BookingForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Hàm sinh metadata động cho SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Không tìm thấy dịch vụ | Vệ Sinh 247",
    };
  }

  return {
    title: `${service.title} | Vệ Sinh 247 - Ánh Ngọc Vinhomes`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();

  // Lấy các tùy chọn dịch vụ cho Form ở cuối trang
  const serviceOptions = allServices.map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. Hero Banner Section */}
      <section className="relative bg-slate-900 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.bannerImage}
            alt={service.title}
            className="object-cover w-full h-full opacity-40 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/dich-vu"
              className="inline-flex items-center text-green-300 hover:text-white text-xs font-bold transition-colors mb-2"
            >
              <Icons.ChevronLeft className="w-4 h-4 mr-1" />
              Quay lại dịch vụ
            </Link>

            <div className="inline-flex items-center bg-brand-green border border-brand-green-border px-3 py-1 rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              DỊCH VỤ CHUYÊN NGHIỆP
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white font-sans tracking-tight">
              {service.title} <br className="hidden sm:inline" />
              <span className="text-green-400">Meticulous & Efficient</span>
            </h1>

            <p className="text-slate-350 text-sm sm:text-base leading-relaxed max-w-2xl">
              Giải pháp làm sạch toàn diện cho tòa nhà, văn phòng và khu đô thị cao cấp Vinhomes. Mang lại không gian chuẩn 5 sao.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content: 5-Step Process & Sidebar Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: 5-Step Process (8 columns) */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-green tracking-tight">
                Quy trình thực hiện chuyên nghiệp 5 Bước
              </h2>
              
              <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-10 py-2">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Step Number */}
                    <span className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black shadow-md shadow-brand-green/20">
                      {idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing Sidebar (5 columns) */}
            <div className="lg:col-span-5 bg-brand-green-light/50 border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 pb-3 border-b border-slate-200/60">
                Bảng giá tham khảo
              </h3>
              
              <div className="space-y-4">
                {service.pricingList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3 border-b border-slate-200/40 last:border-0 text-xs sm:text-sm"
                  >
                    <span className="text-slate-600 font-semibold">{item.name}</span>
                    <span className="font-extrabold text-brand-green text-right whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed italic mt-5">
                * Giá thực tế có thể thay đổi tùy theo tình trạng khảo sát.
              </p>

              <a
                href="#booking-section"
                className="block w-full text-center bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors duration-200 mt-6 shadow-md shadow-brand-green/10"
              >
                Nhận báo giá chi tiết
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="bg-slate-100/60 border-y border-slate-200/40 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Các câu hỏi thường gặp
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Giải đáp những thắc mắc phổ biến về dịch vụ {service.title.toLowerCase()} tại Ánh Ngọc Vinhomes.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200/60 bg-white rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm transition-all duration-300"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-slate-900 focus:outline-none">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center pr-4">
                    <span className="text-brand-green font-black mr-2 text-sm sm:text-base">Q.</span>
                    {faq.question}
                  </h4>
                  <span className="shrink-0 rounded-full bg-slate-50 p-1 text-slate-400 group-open:-rotate-180 transition-transform duration-350">
                    <Icons.ChevronDown className="h-4.5 w-4.5" />
                  </span>
                </summary>
                <div className="px-5 pb-5 border-t border-slate-50 pt-4 bg-slate-50/30">
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pl-5 whitespace-pre-line font-medium">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Booking Banner Container */}
      <section id="booking-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-brand-green rounded-3xl text-white p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Booking Info Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Đăng ký tư vấn & <br className="hidden sm:inline" /> Nhận ưu đãi 20%
            </h2>
            <p className="text-green-100 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
              Dành riêng cho khách hàng đăng ký lần đầu qua website. Đội ngũ chuyên gia sẽ gọi lại cho bạn sau 15 phút.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 max-w-sm mx-auto lg:mx-0">
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-black">1000+</span>
                <span className="block text-[10px] sm:text-xs text-green-200 font-bold uppercase tracking-wider">
                  Dự án hoàn thành
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-black">150+</span>
                <span className="block text-[10px] sm:text-xs text-green-200 font-bold uppercase tracking-wider">
                  Nhân sự chuyên nghiệp
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-5 w-full">
            <BookingForm services={serviceOptions} preselectedService={slug} />
          </div>

        </div>
      </section>

    </div>
  );
}
