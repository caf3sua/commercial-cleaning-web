"use client";

import { useState } from "react";
import { Calculator, HelpCircle, Phone, ArrowRight, ShieldCheck } from "lucide-react";

interface ServiceRate {
  id: string;
  name: string;
  rate: number;
  unit: string;
  minAmount: number;
}

const SERVICES_RATES: ServiceRate[] = [
  { id: "ve-sinh-cong-nghiep", name: "Vệ sinh công nghiệp", rate: 15000, unit: "m²", minAmount: 20 },
  { id: "diet-con-trung", name: "Dịch vụ diệt côn trùng (gián/muỗi)", rate: 5000, unit: "m²", minAmount: 50 },
  { id: "giat-sofa-tham", name: "Giặt thảm, ghế sofa", rate: 250000, unit: "tấm hoặc bộ", minAmount: 1 },
  { id: "ve-sinh-nha-hang", name: "Vệ sinh nhà hàng / Quán ăn", rate: 15000, unit: "m²", minAmount: 50 },
  { id: "don-dep-theo-gio", name: "Dọn dẹp theo giờ", rate: 60000, unit: "giờ", minAmount: 3 },
  { id: "phu-bong-san", name: "Phủ bóng sàn", rate: 40000, unit: "m²", minAmount: 20 },
  { id: "don-dep-chuyen-sau", name: "Dọn dẹp chuyên sâu", rate: 18000, unit: "m²", minAmount: 30 },
  { id: "xay-dung-thiet-thi-cong", name: "Sơn bả vách, trần panel", rate: 65000, unit: "m²", minAmount: 15 },
];

export default function PricingCalculator() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES_RATES[0].id);
  const [amount, setAmount] = useState<number>(SERVICES_RATES[0].minAmount);

  const activeService = SERVICES_RATES.find((s) => s.id === selectedService) || SERVICES_RATES[0];

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    const service = SERVICES_RATES.find((s) => s.id === serviceId) || SERVICES_RATES[0];
    setAmount(service.minAmount);
  };

  // Tính giá thô
  const rawCost = amount * activeService.rate;

  // Tính chiết khấu (Giảm 5% cho đơn hàng trên 2 triệu, 10% trên 5 triệu)
  let discountPercent = 0;
  if (rawCost >= 5000000) {
    discountPercent = 10;
  } else if (rawCost >= 2000000) {
    discountPercent = 5;
  }

  const discountAmount = (rawCost * discountPercent) / 100;
  const totalCost = rawCost - discountAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-brand-blue-light text-brand-blue rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Công Cụ Ước Tính Chi Phí</h3>
          <p className="text-slate-500 text-xs sm:text-sm">Tính toán chi phí dọn dẹp sơ bộ nhanh chóng.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Inputs */}
        <div className="space-y-5">
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Chọn Loại Dịch Vụ
            </label>
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-white"
            >
              {SERVICES_RATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({formatCurrency(s.rate)} / {s.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Số Lượng ({activeService.unit})
              </label>
              <span className="text-xs text-slate-400">Tối thiểu: {activeService.minAmount} {activeService.unit}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setAmount(Math.max(activeService.minAmount, amount - 1))}
                className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-black flex items-center justify-center transition-colors focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                value={amount}
                min={activeService.minAmount}
                onChange={(e) => setAmount(Math.max(activeService.minAmount, parseInt(e.target.value) || activeService.minAmount))}
                className="flex-1 text-center py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue text-sm font-semibold"
              />
              <button
                type="button"
                onClick={() => setAmount(amount + 1)}
                className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-black flex items-center justify-center transition-colors focus:outline-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Note Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start space-x-2 text-xs text-slate-500 leading-relaxed">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              Báo giá trên là ước tính dựa vào đơn giá tiêu chuẩn. Chi phí thực tế có thể thay đổi nhẹ sau khi nhân viên đến khảo sát cấu trúc thực tế của công trình hoặc mức độ bẩn sạch.
            </p>
          </div>
        </div>

        {/* Right Side: Estimates Output */}
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm pb-2.5 border-b border-slate-200">
              Chi Tiết Dự Toán
            </h4>
            
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Đơn giá dịch vụ:</span>
                <span className="font-medium text-slate-800">{formatCurrency(activeService.rate)} / {activeService.unit}</span>
              </div>
              <div className="flex justify-between">
                <span>Số lượng đặt tính:</span>
                <span className="font-medium text-slate-800">{amount} {activeService.unit}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 pt-2 text-xs">
                <span>Tạm tính (thô):</span>
                <span>{formatCurrency(rawCost)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold text-xs">
                  <span>Ưu đãi giảm giá ({discountPercent}%):</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-t-2 border-dashed border-slate-250 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-700">Tổng phí dự kiến:</span>
              <span className="text-2xl font-black text-brand-blue">
                {formatCurrency(totalCost)}
              </span>
            </div>

            {discountPercent > 0 && (
              <span className="block text-[10px] text-center font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-2.5 py-1">
                Bạn đã tiết kiệm được {formatCurrency(discountAmount)} nhờ gói chiết khấu!
              </span>
            )}

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:0911976839`}
                className="flex items-center justify-center bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Đặt Lịch Ngay
              </a>
              <a
                href="#contact-section"
                className="flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-colors"
              >
                Nhận Khảo Sát
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
