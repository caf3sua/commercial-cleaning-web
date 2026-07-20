"use client";

import { useState } from "react";
import PricingCalculator from "@/components/PricingCalculator";
import { Phone, Mail, Check, Shield, Leaf, Send, Loader2, CheckCircle2 } from "lucide-react";

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
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", phone: "", address: "", note: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans">
      
      {/* 1. Header Intro Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] to-[#f8fafc] py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <h1 className="text-4xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
            Bảng Giá Dịch Vụ Minh Bạch
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Chúng tôi cung cấp giải pháp vệ sinh chuyên nghiệp chuẩn Vinhomes với chi phí tối ưu. Sử dụng công cụ dưới đây để nhận ước tính ngay lập tức.
          </p>
          <div className="flex justify-center items-center gap-3 pt-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#eff6ff] text-[#0038a8] border border-[#dbeafe] text-[10px] font-extrabold uppercase tracking-wider">
              <Shield className="w-3 h-3 mr-1 text-[#0038a8]" />
              Vinhomes Exclusive
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#d1fae5] text-[10px] font-extrabold uppercase tracking-wider">
              <Leaf className="w-3 h-3 mr-1 text-[#047857]" />
              Non-Toxic
            </span>
          </div>
        </div>
      </section>

      {/* 2. Pricing Calculator Section */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCalculator />
      </section>

      {/* 3. Detailed Pricing Table */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">
            Bảng giá niêm yết chi tiết
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/60 shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff6ff]/70 border-b border-slate-200 text-[#0038a8] text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Dịch vụ</th>
                <th className="py-4 px-6 text-center">Đơn vị</th>
                <th className="py-4 px-6 text-center">Đơn giá (VNĐ)</th>
                <th className="py-4 px-6">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm font-medium">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Vệ sinh Căn hộ 1PN (Vinhomes)</td>
                <td className="py-4 px-6 text-center text-slate-500">Gói</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">600.000</td>
                <td className="py-4 px-6 text-slate-500">Vệ sinh cơ bản 4h</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Vệ sinh Căn hộ 2PN (Vinhomes)</td>
                <td className="py-4 px-6 text-center text-slate-500">Gói</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">900.000</td>
                <td className="py-4 px-6 text-slate-500">Vệ sinh cơ bản 6h</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Vệ sinh Căn hộ 3PN (Vinhomes)</td>
                <td className="py-4 px-6 text-center text-slate-500">Gói</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">1.200.000</td>
                <td className="py-4 px-6 text-slate-500">Nhóm 2 nhân viên</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Giặt ghế Sofa / Nệm</td>
                <td className="py-4 px-6 text-center text-slate-500">Chiếc</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">250.000 - 450.000</td>
                <td className="py-4 px-6 text-slate-500">Công nghệ phun hút hơi nước nóng</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Vệ sinh Máy lạnh (Treo tường)</td>
                <td className="py-4 px-6 text-center text-slate-500">Bộ</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">200.000</td>
                <td className="py-4 px-6 text-slate-500">Bao gồm nạp gas bổ sung</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">Vệ sinh công nghiệp sau xây dựng</td>
                <td className="py-4 px-6 text-center text-slate-500">m²</td>
                <td className="py-4 px-6 text-center font-extrabold text-[#0038a8]">15.000 - 25.000</td>
                <td className="py-4 px-6 text-slate-500">Tùy theo hiện trạng thực tế</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-4 leading-relaxed italic">
          * Giá trên chưa bao gồm thuế GTGT (VAT 10%). Đối với diện tích lớn trên 500m², quý khách vui lòng liên hệ trực tiếp để có giá ưu đãi.
        </p>
      </section>

      {/* 4. Survey Request Form Section */}
      <section id="request-quote-section" className="py-16 bg-[#eff6ff]/35 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Form Description & Contact Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                  Yêu cầu khảo sát & Báo giá chi tiết
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Để có báo giá chính xác nhất cho các công trình lớn hoặc yêu cầu đặc biệt, đội ngũ kỹ thuật của chúng tôi sẽ đến khảo sát thực tế trong vòng 24h hoàn toàn miễn phí.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0038a8] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hotline tư vấn 24/7</p>
                    <p className="text-sm font-black text-[#0038a8]">0911 976 839</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0038a8] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email hỗ trợ</p>
                    <p className="text-sm font-black text-[#0038a8]">anhngocvinhomes@vesinh247.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                {status === "success" ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-800">Gửi Yêu Cầu Thành Công!</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold max-w-xs mx-auto">
                      Chúng tôi đã tiếp nhận yêu cầu. Kỹ thuật viên của Ánh Ngọc sẽ liên hệ với bạn trong vòng 24h để sắp xếp lịch khảo sát.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 px-5 py-2 bg-[#0038a8] hover:bg-[#002d96] text-white font-bold rounded-lg text-xs transition"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0038a8] focus:ring-1 focus:ring-[#0038a8] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="09xx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0038a8] focus:ring-1 focus:ring-[#0038a8] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                        Địa chỉ (Vinhomes/Khác)
                      </label>
                      <input
                        type="text"
                        placeholder="Tòa Landmark 81, P.2005..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0038a8] focus:ring-1 focus:ring-[#0038a8] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                        Ghi chú yêu cầu
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả sơ qua về nhu cầu của bạn..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0038a8] focus:ring-1 focus:ring-[#0038a8] transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center bg-[#0038a8] hover:bg-[#002d96] text-white font-bold py-3 px-6 rounded-xl text-xs transition duration-200 disabled:opacity-80"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          Gửi yêu cầu khảo sát
                          <Send className="w-3.5 h-3.5 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-slate-400 text-center font-bold">
                      Cam kết bảo mật thông tin khách hàng tuyệt đối.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
