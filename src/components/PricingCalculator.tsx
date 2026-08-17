"use client";

import { useState } from "react";
import { Calculator, Check } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  priceText: string;
  rate: number;
  icon: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "dinh-ky",
    name: "Vệ sinh định kỳ",
    priceText: "Từ 15.000đ/m²",
    rate: 15000,
    icon: "🏠"
  },
  {
    id: "chuyen-sau",
    name: "Vệ sinh chuyên sâu",
    priceText: "Từ 25.000đ/m²",
    rate: 25000,
    icon: "🧼"
  },
  {
    id: "sau-xay-dung",
    name: "Sau xây dựng",
    priceText: "Từ 35.000đ/m²",
    rate: 35000,
    icon: "🛠️"
  }
];

interface AddonService {
  id: string;
  name: string;
  price: number;
  priceText: string;
}

const ADDON_SERVICES: AddonService[] = [
  { id: "sofa", name: "Vệ sinh Sofa", price: 200000, priceText: "+200k" },
  { id: "rem", name: "Vệ sinh Rèm", price: 150000, priceText: "+150k" },
  { id: "con-trung", name: "Diệt côn trùng", price: 300000, priceText: "+300k" }
];

export default function PricingCalculator() {
  const [selectedService, setSelectedService] = useState<string>("dinh-ky");
  const [area, setArea] = useState<number>(50);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const activeService = SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];

  const handleAddonChange = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculations
  const serviceCost = area * activeService.rate;
  const addonCost = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDON_SERVICES.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalCost = serviceCost + addonCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN").format(val) + "đ";
  };

  const handleScrollToForm = () => {
    const contactSection = document.getElementById("request-quote-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0A261C] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Công Cụ Dự Toán Chi Phí Nhanh
          </h3>
          <p className="text-xs text-slate-400">Điều chỉnh thông tin để ước tính chi phí cho công trình của bạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Controls */}
        <div className="lg:col-span-8 space-y-6 text-left">
          
          {/* 1. CHỌN LOẠI DỊCH VỤ */}
          <div>
            <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-3">
              1. CHỌN LOẠI DỊCH VỤ VỆ SINH
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((svc) => {
                const isSelected = selectedService === svc.id;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setSelectedService(svc.id)}
                    className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/15 text-white shadow-[0_0_16px_rgba(203,162,88,0.25)]"
                        : "border-white/10 hover:border-white/20 bg-white/5 text-slate-300"
                    }`}
                  >
                    <span className="text-xl mb-2">{svc.icon}</span>
                    <span className="text-xs font-bold text-white mb-1">{svc.name}</span>
                    <span className="text-[11px] font-semibold text-amber-300">{svc.priceText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. DIỆN TÍCH */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                2. DIỆN TÍCH SỬ DỤNG (M²)
              </label>
              <span className="text-lg font-black text-amber-300">
                {area} m²
              </span>
            </div>
            
            <input
              type="range"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
              <span>30 m²</span>
              <span>250 m²</span>
              <span>500 m²</span>
            </div>
          </div>

          {/* 3. DỊCH VỤ BỔ SUNG */}
          <div>
            <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-3">
              3. DỊCH VỤ BỔ SUNG YÊU CẦU THÊM
            </label>
            <div className="flex flex-wrap gap-3">
              {ADDON_SERVICES.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => handleAddonChange(addon.id)}
                    className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                      isChecked
                        ? "border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(203,162,88,0.2)]"
                        : "border-white/10 hover:border-white/20 text-slate-300 bg-white/5"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition ${
                      isChecked ? "bg-amber-400 border-amber-400 text-slate-950 font-black" : "border-slate-500"
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span>{addon.name} ({addon.priceText})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Estimates Output Box */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#061811] to-[#04120D] border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl min-h-[300px]">
          <div className="space-y-4 text-left">
            <div>
              <h4 className="font-bold text-sm mb-1 text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Ước Tính Sơ Bộ</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Giá dự toán minh bạch (chưa bao gồm ưu đãi chiết khấu trực tiếp khi khảo sát).
              </p>
            </div>
            
            <div className="space-y-2.5 pt-2 text-xs font-medium text-slate-300">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span>Đơn giá loại hình:</span>
                <span className="font-bold text-amber-300">{formatCurrency(activeService.rate)}/m²</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span>Diện tích công trình:</span>
                <span className="font-bold text-white">{area} m²</span>
              </div>
              <div className="flex justify-between">
                <span>Dịch vụ cộng thêm:</span>
                <span className="font-bold text-white">{formatCurrency(addonCost)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest block">
                TỔNG CỘNG DỰ KIẾN
              </span>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                {formatCurrency(totalCost)}
              </div>
            </div>

            <button
              type="button"
              onClick={handleScrollToForm}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-full text-xs transition duration-200 text-center shadow-[0_4px_20px_rgba(203,162,88,0.4)] hover:scale-105 cursor-pointer"
            >
              Nhận báo giá khảo sát 24/7
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
