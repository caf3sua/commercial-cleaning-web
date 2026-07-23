"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="text-brand-green">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          Công cụ ước tính chi phí
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. CHỌN LOẠI DỊCH VỤ */}
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">
              1. CHỌN LOẠI DỊCH VỤ
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SERVICE_OPTIONS.map((svc) => {
                const isSelected = selectedService === svc.id;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setSelectedService(svc.id)}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-brand-green bg-brand-green-light/30 ring-1 ring-brand-green/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <span className="text-lg mb-2">{svc.icon}</span>
                    <span className="text-xs font-black text-slate-800 mb-1">{svc.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{svc.priceText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. DIỆN TÍCH */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                2. DIỆN TÍCH (M²)
              </label>
              <span className="text-lg font-black text-brand-green">
                {area} m²
              </span>
            </div>
            
            <input
              type="range"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1.5 bg-brand-green-light rounded-lg appearance-none cursor-pointer accent-brand-green"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
              <span>30 m²</span>
              <span>500 m²</span>
            </div>
          </div>

          {/* 3. DỊCH VỤ BỔ SUNG */}
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">
              3. DỊCH VỤ BỔ SUNG
            </label>
            <div className="flex flex-wrap gap-4">
              {ADDON_SERVICES.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => handleAddonChange(addon.id)}
                    className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all ${
                      isChecked
                        ? "border-brand-green bg-brand-green-light/30 text-brand-green"
                        : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] transition ${
                      isChecked ? "bg-brand-green border-brand-green text-white" : "border-slate-300"
                    }`}>
                      {isChecked && "✓"}
                    </span>
                    <span>{addon.name} ({addon.priceText})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Estimates Output */}
        <div className="lg:col-span-4 bg-brand-green text-white rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm min-h-[300px]">
          <div className="space-y-4">
            <div>
              <h4 className="font-extrabold text-sm mb-1 text-white">
                Ước tính sơ bộ
              </h4>
              <p className="text-[10px] text-emerald-100 leading-relaxed font-medium">
                Giá này mang tính chất tham khảo dựa trên thông tin bạn cung cấp.
              </p>
            </div>
            
            <div className="space-y-3 pt-2 text-xs font-medium text-emerald-50">
              <div className="flex justify-between pb-2.5 border-b border-emerald-800/20">
                <span>Đơn giá:</span>
                <span className="font-bold text-white">{formatCurrency(activeService.rate)}/m²</span>
              </div>
              <div className="flex justify-between pb-2.5 border-b border-emerald-800/20">
                <span>Diện tích:</span>
                <span className="font-bold text-white">{area} m²</span>
              </div>
              <div className="flex justify-between">
                <span>Phụ phí:</span>
                <span className="font-bold text-white">{formatCurrency(addonCost)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-emerald-800/30">
            <div className="text-center space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
                TỔNG CỘNG DỰ KIẾN
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(totalCost)}
              </div>
            </div>

            <button
              type="button"
              onClick={handleScrollToForm}
              className="w-full bg-white text-brand-green hover:bg-slate-50 font-black py-3 rounded-xl text-xs transition duration-200 text-center shadow-sm"
            >
              Nhận báo giá chi tiết
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
