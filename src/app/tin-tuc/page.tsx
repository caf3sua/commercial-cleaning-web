import { getNews } from "@/services/dataService";
import NewsPageClient from "./NewsPageClient";

export const metadata = {
  title: "Tin Tức & Mẹo Dọn Dẹp | Vệ Sinh 247 - Ánh Ngọc Vinhomes",
  description: "Cập nhật các mẹo hay dọn dẹp nhà cửa, bí quyết giặt sofa, thảm sạch bong và hướng dẫn phòng chống côn trùng gây hại vào mùa ẩm ướt.",
};

export default async function NewsPage() {
  const allNews = await getNews();
  
  return <NewsPageClient initialNews={allNews} />;
}
