"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [activeMap, setActiveMap] = useState<"central" | "grand">("central");

  const branches = [
    {
      name: "Cơ sở Vinhomes Central Park",
      address: "720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP.HCM",
    },
    {
      name: "Cơ sở Vinhomes Grand Park",
      address: "Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP. Thủ Đức",
    },
    {
      name: "Cơ sở Vinhomes Golden River",
      address: "02 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP.HCM",
    },
  ];

  const mapUrls = {
    central:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1265882315757!2d106.71960257570414!3d10.791834258721617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30975%3A0x261ad44deab0c732!2zVmluaG9tZXMgQ2VudHJhbCBQYXJr!5e0!3m2!1svi!2s!4v1721400000000!5m2!1svi!2s",
    grand:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4908027209703!2d106.83737527570487!3d10.850220657424694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271a073f15eb%3A0x6ec0c5b3ab371727!2zVmluaG9tZXMgR3JhbmQgUGFyaw!5e0!3m2!1svi!2s!4v1721400000000!5m2!1svi!2s",
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. Header Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 bg-white border-b border-slate-100">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-green tracking-tight">
          Liên Hệ Với Chúng Tôi
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
          Đội ngũ Vệ sinh 247 luôn sẵn sàng lắng nghe và hỗ trợ quý khách duy trì không gian sống đẳng cấp tại Vinhomes.
        </p>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Branches (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                Thông tin liên hệ
              </h3>

              {/* Hotline support */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    HOTLINE HỖ TRỢ 24/7
                  </span>
                  <a href="tel:0911976839" className="block text-sm sm:text-base font-black text-slate-800 hover:text-brand-green transition-colors">
                    0911 976 839
                  </a>
                  <a href="tel:0938129969" className="block text-sm sm:text-base font-black text-slate-800 hover:text-brand-green transition-colors">
                    0938 129 969
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    EMAIL VĂN PHÒNG
                  </span>
                  <a href="mailto:info@anhngocvinhomes.vn" className="block text-sm sm:text-base font-bold text-slate-800 hover:text-brand-green transition-colors">
                    info@anhngocvinhomes.vn
                  </a>
                </div>
              </div>
            </div>

            {/* Branches list */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 text-base tracking-tight">
                Các cơ sở tại Vinhomes
              </h3>
              <div className="space-y-3.5">
                {branches.map((branch, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-green-light/50 p-4.5 rounded-xl border border-slate-100 flex items-start space-x-3.5 hover:border-brand-green/30 transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="block font-bold text-brand-green text-xs sm:text-sm">
                        {branch.name}
                      </span>
                      <span className="block text-xs text-slate-500 leading-relaxed font-medium">
                        {branch.address}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form (7 columns) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* 3. Google Maps Section */}
      <section className="w-full bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold text-brand-green uppercase tracking-widest">
                BẢN ĐỒ
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Tìm chúng tôi trên bản đồ
              </h3>
            </div>
            
            {/* Map Tabs Switcher */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setActiveMap("central")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeMap === "central"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-650"
                }`}
              >
                Central Park
              </button>
              <button
                onClick={() => setActiveMap("grand")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeMap === "grand"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-650"
                }`}
              >
                Grand Park
              </button>
            </div>
          </div>

          {/* Map Frame Container */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-100 relative">
            <iframe
              src={mapUrls[activeMap]}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ văn phòng Vệ Sinh 247 Ánh Ngọc Vinhomes"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. Bottom Hotline Banner */}
      <section className="bg-brand-green py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-black">
              Bạn cần tư vấn trực tiếp ngay bây giờ?
            </h4>
            <p className="text-green-100 text-xs sm:text-sm font-medium">
              Gọi ngay Hotline để được hỗ trợ và khảo sát miễn phí trong 15 phút.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <a
              href="tel:0911976839"
              className="flex items-center justify-center bg-white hover:bg-green-50 text-brand-green font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              0911 976 839
            </a>
            <a
              href="https://zalo.me/0911976839"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Zalo
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
