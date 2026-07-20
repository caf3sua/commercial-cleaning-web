import mockData from "../data/mockData.json";

export interface AddressInfo {
  branch: string;
  address: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  hotline1: string;
  hotline2: string;
  email: string;
  addresses: AddressInfo[];
  workingHours: string;
}

export interface PricingInfo {
  basePrice: string;
  unit: string;
  details: string;
}

export interface FAQInfo {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface SidebarPriceItem {
  name: string;
  price: string;
}

export interface CleaningService {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  iconName: string;
  bannerImage: string;
  fullDescription: string;
  pricing: PricingInfo;
  pricingList: SidebarPriceItem[];
  benefits: string[];
  process: ProcessStep[];
  faqs: FAQInfo[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  publishDate: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
  views: number;
}

// Giả lập cuộc gọi API bất đồng bộ (Async) để sau này dễ thay bằng Call API thật
export const getCompanyInfo = async (): Promise<CompanyInfo> => {
  return mockData.companyInfo;
};

export const getServices = async (): Promise<CleaningService[]> => {
  return mockData.services;
};

export const getServiceBySlug = async (slug: string): Promise<CleaningService | undefined> => {
  return mockData.services.find(service => service.slug === slug);
};

export const getNews = async (): Promise<NewsItem[]> => {
  return mockData.news;
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | undefined> => {
  return mockData.news.find(item => item.slug === slug);
};

export const getFeaturedServices = async (limit: number = 3): Promise<CleaningService[]> => {
  // Trả về một số dịch vụ tiêu biểu (ví dụ 3 dịch vụ đầu)
  return mockData.services.slice(0, limit);
};

export const getLatestNews = async (limit: number = 3): Promise<NewsItem[]> => {
  // Sắp xếp theo ngày mới nhất và lấy giới hạn số lượng bài viết
  return [...mockData.news]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};
