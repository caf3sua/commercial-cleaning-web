import Link from "next/link";
import * as Icons from "lucide-react";
import { CleaningService } from "../services/dataService";

interface ServiceCardProps {
  service: CleaningService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Tìm kiếm Icon trong lucide-react, mặc định là Sparkles nếu không tìm thấy
  const LucideIcon = (Icons as any)[service.iconName] || Icons.Sparkles;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Accent glassmorphic background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-green/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center mb-5 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-sm">
          <LucideIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-2.5 group-hover:text-brand-green transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-100/80">
        <span className="text-xs font-semibold text-slate-400">
          Chỉ từ: <span className="text-brand-green font-bold text-sm">{service.pricing.basePrice}</span>/{service.pricing.unit}
        </span>
        
        <Link
          href={`/dich-vu/${service.slug}`}
          className="text-xs font-bold text-brand-green hover:text-brand-green-hover flex items-center group-hover:translate-x-1 transition-transform"
        >
          Chi tiết
          <Icons.ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
