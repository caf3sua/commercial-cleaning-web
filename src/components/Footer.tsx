import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-650 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 shrink-0 mb-2">
              <img src="/logo.png" alt="Vệ Sinh 247 Ánh Ngọc Logo" className="h-16 w-auto object-contain" />
              <span className="text-xs sm:text-sm font-black tracking-wide text-brand-blue uppercase">
                Vệ sinh nhà Ánh Ngọc 24/7
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
              Đơn vị vệ sinh chuyên nghiệp hàng đầu tại các khu đô thị Vinhomes. Uy tín - Tận tâm - Sạch bong.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center hover:bg-brand-blue-hover transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Messenger"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.45 5.48 3.7 7.09v3.29c0 .24.26.39.46.26l3.52-2.31c.74.2 1.52.32 2.32.32 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.25 11.83-2.1-2.23-4.1 2.23 4.5-4.78 2.1 2.23 4.1-2.23-4.5 4.78z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Dịch vụ chính
                </Link>
              </li>
              <li>
                <Link href="/bao-gia" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Bảng giá mới nhất
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/bao-gia" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Liên hệ báo giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Đăng ký nhận tin
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Nhận thông tin và ưu đãi mới nhất.
            </p>
            {/* Input fields */}
            <div className="flex max-w-sm rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white p-1">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full px-3 py-1.5 text-xs sm:text-sm focus:outline-none bg-transparent"
              />
              <button
                type="button"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
                aria-label="Đăng ký email"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-200/80 pt-6 mt-12 text-center text-xs text-slate-400">
          <p>
            &copy; 2026 VỆ SINH 247 - ÁNH NGỌC VINHOMES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
