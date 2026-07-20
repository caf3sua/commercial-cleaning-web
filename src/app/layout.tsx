import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vệ Sinh 247 - Ánh Ngọc Vinhomes | Dịch Vụ Vệ Sinh Công Nghiệp Uy Tín",
  description: "Có Ánh Ngọc - Nhà sạch bong. Chuyên cung cấp dịch vụ vệ sinh công nghiệp, diệt muỗi gián, giặt ghế sofa thảm, dọn dẹp theo giờ tại Vinhomes Ocean Park, Smart City, Times City. Hotline: 0911.976.839",
  keywords: ["vệ sinh công nghiệp", "giúp việc theo giờ", "diệt côn trùng", "giặt sofa", "vệ sinh vinhomes", "ánh ngọc vinhomes", "vệ sinh 247"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
