import { getServices } from "@/services/dataService";
import PricingCalculator from "@/components/PricingCalculator";
import { Sparkles, ShieldCheck, Landmark, CheckSquare } from "lucide-react";

export const metadata = {
  title: "Bảng Giá Dịch Vụ Vệ Sinh | Vệ Sinh 247 - Ánh Ngọc Vinhomes",
  description: "Bảng giá vệ sinh công nghiệp chi tiết, cam kết không phụ phí phát sinh. Sử dụng máy tính dự toán chi phí để tính ngay giá dịch vụ.",
};

export default async function PricingPage() {
  const services = await getServices();

  const pricingPolicies = [
    {
      title: "Minh bạch, không phụ phí",
      desc: "Mọi khoản chi phí đều được thống nhất bằng văn bản trước khi thi công. Cam kết không phát sinh bất kỳ khoản phí ngoài nào sau khi hoàn thành.",
      icon: ShieldCheck,
    },
    {
      title: "Khảo sát và tư vấn 0đ",
      desc: "Nhân viên kỹ thuật sẽ đến tận nơi đo đạc diện tích, kiểm tra tình trạng vết bẩn và tư vấn phương án làm sạch tối ưu hoàn toàn miễn phí.",
      icon: Landmark,
    },
    {
      title: "Bảo hành chất lượng dịch vụ",
      desc: "Chúng tôi cam kết làm sạch lại hoàn toàn miễn phí nếu khách hàng chưa hài lòng với bất kỳ hạng mục nào sau khi nghiệm thu.",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. Header Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 bg-white border-b border-slate-100">
        <div className="inline-flex items-center space-x-1 bg-blue-100/60 border border-brand-blue-border px-3 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          BẢNG GIÁ MINH BẠCH
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-blue tracking-tight leading-tight">
          Báo Giá Dịch Vụ Vệ Sinh 247
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
          Chúng tôi cam kết mang lại mức chi phí cạnh tranh nhất đi kèm dịch vụ chất lượng chuẩn khách sạn 5 sao tại khu đô thị Vinhomes.
        </p>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCalculator />
        </div>
      </section>

      {/* 3. Detailed Pricing Table */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Bảng Giá Vệ Sinh Chi Tiết Mới Nhất
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Đơn giá thực tế có thể dao động nhẹ tùy thuộc vào quy mô và tình trạng thực tế của công trình.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200/60 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <th className="py-4.5 px-6">Tên Dịch Vụ</th>
                  <th className="py-4.5 px-6 text-center">Đơn Giá Tham Khảo</th>
                  <th className="py-4.5 px-6 text-center">Đơn Vị Tính</th>
                  <th className="py-4.5 px-6 hidden md:table-cell">Lưu Ý / Chi Tiết Thêm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-650 text-xs sm:text-sm">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-slate-850">
                      {svc.title}
                    </td>
                    <td className="py-4.5 px-6 text-center font-black text-brand-blue">
                      {svc.pricing.basePrice}
                    </td>
                    <td className="py-4.5 px-6 text-center font-semibold text-slate-500">
                      / {svc.pricing.unit}
                    </td>
                    <td className="py-4.5 px-6 hidden md:table-cell text-slate-450 leading-relaxed max-w-md">
                      {svc.pricing.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Pricing Policies Info */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPolicies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">{policy.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{policy.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
