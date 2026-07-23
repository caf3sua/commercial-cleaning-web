"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ServiceOption {
  slug: string;
  title: string;
}

interface BookingFormProps {
  services: ServiceOption[];
  preselectedService?: string;
}

export default function BookingForm({ services, preselectedService = "" }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: preselectedService,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone.trim())) {
      tempErrors.phone = "Số điện thoại không hợp lệ (ví dụ: 0911976839)";
    }
    if (!formData.service) tempErrors.service = "Vui lòng chọn dịch vụ quan tâm";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Giả lập gửi form lên server sau 1.5s
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", phone: "", service: preselectedService });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md w-full shadow-2xl">
      {status === "success" ? (
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/25 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Gửi Yêu Cầu Thành Công!</h3>
          <p className="text-green-100 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            Cảm ơn bạn đã đăng ký tư vấn. Đội ngũ chuyên gia của Ánh Ngọc sẽ liên hệ lại với bạn trong vòng 15 phút.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2 bg-white text-brand-green font-bold rounded-full text-xs hover:bg-green-50 transition-colors"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-3 bg-rose-500/25 border border-rose-500/20 rounded-xl text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Có lỗi xảy ra. Vui lòng kiểm tra lại kết nối và thử lại.</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="booking-name" className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Họ và tên
            </label>
            <input
              id="booking-name"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-white/5 border text-white placeholder-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all ${
                errors.name ? "border-rose-400" : "border-white/10"
              }`}
            />
            {errors.name && <p className="text-[10px] text-rose-300 font-bold mt-1">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="booking-phone" className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Số điện thoại
            </label>
            <input
              id="booking-phone"
              type="tel"
              placeholder="09xx xxx xxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-white/5 border text-white placeholder-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all ${
                errors.phone ? "border-rose-400" : "border-white/10"
              }`}
            />
            {errors.phone && <p className="text-[10px] text-rose-300 font-bold mt-1">{errors.phone}</p>}
          </div>

          {/* Service Field */}
          <div>
            <label htmlFor="booking-service" className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Dịch vụ quan tâm
            </label>
            <select
              id="booking-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full bg-white/5 border text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer ${
                errors.service ? "border-rose-400" : "border-white/10"
              }`}
              style={{ colorScheme: "dark" }}
            >
              <option value="" className="bg-slate-900 text-white/50">-- Chọn dịch vụ --</option>
              {services.map((svc) => (
                <option key={svc.slug} value={svc.slug} className="bg-slate-900 text-white">
                  {svc.title}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-[10px] text-rose-300 font-bold mt-1">{errors.service}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center bg-white hover:bg-green-50 text-brand-green font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200 shadow-md shadow-brand-green/10 disabled:opacity-75 disabled:cursor-not-allowed mt-6"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang gửi yêu cầu...
              </>
            ) : (
              "GỬI YÊU CẦU TƯ VẤN"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
