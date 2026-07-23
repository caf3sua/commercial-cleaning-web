import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { NewsItem } from "../services/dataService";

interface BlogCardProps {
  post: NewsItem;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Định dạng ngày hiển thị (DD/MM/YYYY)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Blog Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {/* Category Badge */}
        <span className="absolute top-3 left-3 z-10 bg-brand-green text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
          {post.category}
        </span>
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center text-[11px] font-semibold text-slate-400 space-x-4">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-brand-green transition-colors">
            <Link href={`/tin-tuc/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-4 mt-4 border-t border-slate-50 flex items-center">
          <Link
            href={`/tin-tuc/${post.slug}`}
            className="text-xs font-bold text-brand-green hover:text-brand-green-hover flex items-center group/btn"
          >
            Đọc tiếp
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
