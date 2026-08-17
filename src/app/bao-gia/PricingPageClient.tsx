"use client";

import { useState } from "react";
import { Phone, Mail, Send, Loader2, CheckCircle2, Sparkles, Check, MapPin, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

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
      staggerChildren: 0.1
    }
  }
};

const PRICING_PACKAGES = [
  {
    id: "don-dep-theo-gio",
    title: "Vệ Sinh Định Kỳ Theo Giờ / Tháng",
    category: "TIỆN LỢI & THƯỜNG NHẬT",
    priceText: "Từ 60.000đ",
    unit: "/ giờ",
    description: "Giải pháp giúp duy trì nhà cửa sạch sẽ hàng tuần cho gia đình bận rộn.",
    features: [
      "Dọn dẹp theo giờ (dưới 4h): 70.000đ/giờ",
      "Dọn dẹp theo giờ (trên 4h): 60.000đ/giờ",
      "Gói dọn định kỳ (3 buổi/tuần): 1.800.000đ/tháng",
      "Gói dọn định kỳ (5 buổi/tuần): 2.800.000đ/tháng",
      "Cố định nhân sự làm quen căn hộ",
      "Sử dụng nước lau sàn sinh học an toàn cho trẻ nhỏ"
    ],
    popular: true,
  },
  {
    id: "don-dep-chuyen-sau",
    title: "Tổng Vệ Sinh Chuyên Sâu (Deep Clean)",
    category: "TỈ MỈ & TRIỆT ĐỂ",
    priceText: "Từ 1.200.000đ",
    unit: "/ căn",
    description: "Làm sạch triệt để cặn canxi vách kính tắm, khe hở gầm tủ và vết bẩn lâu ngày.",
    features: [
      "Căn hộ chung cư dưới 60m²: 1.200.000đ - 1.500.000đ",
      "Căn hộ chung cư 60m² - 90m²: 1.500.000đ - 2.000.000đ",
      "Căn hộ chung cư trên 90m²: 2.000.000đ - 2.800.000đ",
      "Biệt thự, nhà phố: 25.000đ - 35.000đ/m²",
      "Phun hơi nước nóng diệt khuẩn nhiệt độ cao",
      "Khử mùi và lọc sạch bụi mịn bằng khí Ozone"
    ],
    popular: false,
  },
  {
    id: "ve-sinh-cong-nghiep",
    title: "Vệ Sinh Công Nghiệp & Sau Xây Dựng",
    category: "QUY MÔ LỚN & CÔNG TRÌNH",
    priceText: "Từ 15.000đ",
    unit: "/ m²",
    description: "Huy động máy chà sàn & máy hút công nghiệp giải quyết xi măng, sơn thừa.",
    features: [
      "Vệ sinh nhà mới sau xây dựng: 15.000đ - 25.000đ/m²",
      "Vệ sinh định kỳ văn phòng: 8.000đ - 12.000đ/m²",
      "Tẩy rửa sàn gạch, đánh bóng sàn đá: 80.000đ - 150.000đ/m²",
      "Tẩy mỡ bếp ăn công nghiệp/nhà hàng: 1.500.000đ - 3.000.000đ",
      "Đội ngũ nhân công lành nghề, thi công nhanh",
      "Cam kết nghiệm thu đạt 100% mới thanh toán"
    ],
    popular: false,
  },
  {
    id: "giat-sofa-diet-con-trung",
    title: "Giặt Sofa, Thảm & Diệt Côn Trùng",
    category: "CHĂM SÓC NỘI THẤT",
    priceText: "Từ 250.000đ",
    unit: "/ bộ",
    description: "Phun hút diệt khuẩn mạt bụi sofa, nệm và phun thuốc diệt muỗi sinh học.",
    features: [
      "Giặt ghế sofa nỉ/da trọn gói: 250.000đ - 450.000đ/bộ",
      "Giặt đệm lò xo/bông ép sấy khô: 250.000đ - 350.000đ/tấm",
      "Giặt thảm trang trí/văn phòng: 150.000đ - 250.000đ/tấm",
      "Phun diệt muỗi, gián Đức sinh học: 350.000đ - 500.000đ/căn",
      "Không mùi hôi độc hại, sấy khô nhanh sau 2h",
      "Bảo hành diệt côn trùng từ 3 - 6 tháng"
    ],
    popular: false,
  }
];

export default function PricingPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập Họ tên và Số điện thoại!");
      return;
    }
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", phone: "", address: "", note: "" });
    } catch {
      setStatus("error");
    }
  };

  const scrollToForm = () => {
    const section = document.getElementById("request-quote-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#f2f0eb] text-slate-900 min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. Light Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f2f0eb] via-[#f7f5f0] to-[#edebe9] py-16 md:py-20 border-b border-slate-200/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4e9e2] text-[#00754A] border border-[#00754A]/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bảng Giá Niêm Yết Minh Bạch 100%</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bảng Giá Dịch Vụ Vệ Sinh <br />
            <span className="text-[#00754A]">Ánh Ngọc Vinhomes</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
            Bảng giá niêm yết rõ ràng cho từng hạng mục dọn dẹp nhà ở, căn hộ và công trình công nghiệp.
            Cam kết khảo sát tận nơi miễn phí và không có bất kỳ chi phí phát sinh ẩn nào.
          </p>

          <div className="flex justify-center items-center gap-3 pt-2">
            <span className="inline-flex items-center space-x-1 px-3.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00754A]" />
              <span>Nghiệm Thu Mới Thanh Toán</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#00754A]" />
              <span>Khảo Sát Miễn Phí 24/7</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. Detailed Service Price Cards Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00754A]">
            Các Gói Dịch Vụ Tiêu Biểu
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Chi Phí Niêm Yết Theo Hạng Mục
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Đơn giá chi tiết từng dịch vụ giúp bạn dễ dàng lựa chọn gói giải pháp phù hợp với nhu cầu.
          </p>
        </div>

        {/* 4 Detailed Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between text-left shadow-sm hover:shadow-xl ${
                pkg.popular
                  ? "border-[#00754A] ring-2 ring-[#00754A]/20"
                  : "border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#00754A] uppercase tracking-widest bg-[#d4e9e2]/60 px-3 py-1 rounded-full border border-[#00754A]/20">
                    {pkg.category}
                  </span>
                  {pkg.popular && (
                    <span className="text-[10px] font-extrabold text-white uppercase bg-[#00754A] px-3 py-1 rounded-full shadow-xs">
                      Được chọn nhiều nhất
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {pkg.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-[#f2f0eb] border border-slate-200/60 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-500">Mức giá tham khảo:</span>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#00754A]">
                      {pkg.priceText}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 ml-1">{pkg.unit}</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-bold text-slate-900 block mb-3 uppercase tracking-wider">
                    Chi tiết bảng giá & Quyền lợi:
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#d4e9e2] text-[#00754A] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollToForm}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                  pkg.popular
                    ? "bg-[#00754A] hover:bg-[#006241] text-white shadow-md hover:scale-[1.02]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                <span>Yêu cầu báo giá chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Light Survey Request Form Section */}
      <section id="request-quote-section" className="py-16 bg-[#edebe9] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            
            {/* Left Column: Form Description & Direct Contact */}
            <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00754A] bg-[#d4e9e2] px-3.5 py-1.5 rounded-full border border-[#00754A]/20">
                  Khảo Sát Miễn Phí Tận Nơi
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Yêu Cầu Báo Giá & Khảo Sát Tận Nơi
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Đối với căn hộ rộng, biệt thự hoặc công trình tổng vệ sinh sau xây dựng, đội ngũ kỹ thuật của Ánh Ngọc sẽ đến tận nơi khảo sát và tư vấn phương án tối ưu nhất trong vòng 24h hoàn toàn miễn phí.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#d4e9e2] text-[#00754A] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hotline Tư Vấn 24/7</p>
                    <div className="flex items-center space-x-3 text-sm font-bold text-[#00754A]">
                      <a href="tel:0938129969" className="hover:underline">0938 129 969</a>
                      <span>•</span>
                      <a href="tel:0911976839" className="hover:underline">0911 976 839</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#d4e9e2] text-[#00754A] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Tiếp Nhận</p>
                    <p className="text-sm font-bold text-slate-900">anhngocvinhomes@vesinh247.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#d4e9e2] text-[#00754A] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trụ Sở Văn Phòng</p>
                    <p className="text-xs font-semibold text-slate-900">Toà P3, KĐT Vinhomes OCP Gia Lâm, Hà Nội</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean White Form Card */}
            <motion.div variants={scaleIn} className="lg:col-span-6 text-left">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg">
                {status === "success" ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#d4e9e2] text-[#00754A]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Gửi Yêu Cầu Thành Công!</h3>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
                      Kỹ thuật viên của Vệ Sinh 247 Ánh Ngọc sẽ liên hệ lại với bạn trong vòng 24h để thu xếp lịch khảo sát trực tiếp.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 px-6 py-2.5 bg-[#00754A] hover:bg-[#006241] text-white font-bold rounded-full text-xs transition"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00754A] focus:ring-1 focus:ring-[#00754A] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="09xx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00754A] focus:ring-1 focus:ring-[#00754A] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Địa chỉ công trình (Vinhomes / Hà Nội)
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Tòa S2.05 Vinhomes Ocean Park..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00754A] focus:ring-1 focus:ring-[#00754A] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Ghi chú yêu cầu vệ sinh
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả diện tích, tình trạng công trình hoặc dịch vụ cần thực hiện..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00754A] focus:ring-1 focus:ring-[#00754A] transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center bg-[#00754A] hover:bg-[#006241] text-white font-bold py-3.5 px-6 rounded-full text-xs transition duration-200 shadow-md disabled:opacity-80 hover:scale-[1.01] cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                          Đang gửi yêu cầu...
                        </>
                      ) : (
                        <>
                          Gửi yêu cầu khảo sát miễn phí
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-500 text-center font-semibold">
                      Cam kết bảo mật thông tin khách hàng tuyệt đối.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
