"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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
    if (!formData.email.trim()) {
      tempErrors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email không đúng định dạng";
    }
    if (!formData.message.trim()) tempErrors.message = "Vui lòng nhập nội dung yêu cầu";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm h-full">
      <div className="space-y-1.5 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">
          Gửi yêu cầu báo giá
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm">
          Vui lòng để lại thông tin, chúng tôi sẽ phản hồi trong vòng 30 phút.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Gửi Yêu Cầu Thành Công!</h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            Yêu cầu báo giá của bạn đã được tiếp nhận. Tư vấn viên của Ánh Ngọc sẽ liên hệ lại với bạn trong vòng 30 phút.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded-full text-xs transition-colors shadow-md shadow-brand-blue/10"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>Đã có lỗi xảy ra. Vui lòng kiểm tra lại kết nối và thử lại.</span>
            </div>
          )}

          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Họ và tên
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                  errors.name ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:border-brand-blue"
                }`}
              />
              {errors.name && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Số điện thoại
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="09xx xxx xxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                  errors.phone ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:border-brand-blue"
                }`}
              />
              {errors.phone && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 2: Email */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Địa chỉ Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                errors.email ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:border-brand-blue"
              }`}
            />
            {errors.email && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.email}</p>}
          </div>

          {/* Row 3: Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Nội dung yêu cầu
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Mô tả dịch vụ quý khách đang quan tâm (Vệ sinh sau xây dựng, vệ sinh định kỳ...)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                errors.message ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:border-brand-blue"
              }`}
            />
            {errors.message && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-wider transition-colors duration-200 shadow-md shadow-brand-blue/15 disabled:opacity-75 disabled:cursor-not-allowed mt-2 group"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                Gửi yêu cầu ngay
                <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
