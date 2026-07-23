import Link from "next/link";
import type { CSSProperties } from "react";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { getServices, getLatestNews, getCompanyInfo } from "@/services/dataService";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import HeroSlider from "@/components/HeroSlider";
import styles from "./page.module.css";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal"],
  variable: "--font-fraunces",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-be-vietnam-pro",
});

// Custom line art vector SVG icons to match the screenshot
const VacuumIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2" />
    <circle cx="8" cy="18" r="2" />
    <circle cx="16" cy="18" r="2" />
    <path d="M12 12V6a2 2 0 0 1 2-2h4" />
    <path d="M18 2v4" />
  </svg>
);

const IndustrialIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="6" height="14" rx="1" />
    <rect x="11" y="3" width="10" height="19" rx="1" />
    <line x1="6" y1="12" x2="6" y2="12.01" />
    <line x1="6" y1="16" x2="6" y2="16.01" />
    <line x1="15" y1="7" x2="15" y2="7.01" />
    <line x1="15" y1="11" x2="15" y2="11.01" />
    <line x1="15" y1="15" x2="15" y2="15.01" />
    <line x1="18" y1="7" x2="18" y2="7.01" />
    <line x1="18" y1="11" x2="18" y2="11.01" />
    <line x1="18" y1="15" x2="18" y2="15.01" />
  </svg>
);

const FloorPolishingIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12" />
    <path d="M7 15h10a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="7" r="3" />
    <path d="M4 21h16" />
  </svg>
);

const HospitalIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 22V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
    <path d="M12 10v6" />
    <path d="M10 13h4" />
    <path d="M2 22h20" />
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M9 11V6a3 3 0 0 1 6 0v5" />
    <line x1="6" y1="15" x2="18" y2="15" />
    <line x1="12" y1="11" x2="12" y2="22" />
  </svg>
);

const HourlyIcon = () => (
  <svg className="w-12 h-12 text-brand-green transition-transform group-hover:scale-105 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="8" width="12" height="9" rx="1" />
    <circle cx="6" cy="17" r="1.5" />
    <circle cx="10" cy="17" r="1.5" />
    <path d="M14 11h2l3 3v3h-5" />
    <circle cx="17" cy="7" r="4" />
    <path d="M17 5v2.5l1.5 1" />
  </svg>
);

export default async function Page() {
  const companyInfo = await getCompanyInfo();
  const services = await getServices();
  const newsList = await getLatestNews(3);

  return (
    <div className={`${styles.page} ${fraunces.variable} ${beVietnamPro.variable} w-full`}>
      <noscript>
        <style>{`.${styles.reveal}{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. SERVICES GRID & ABOUT US SECTION */}
      <section id="about-section" className={styles.aboutGridSection}>
        <div className={styles.container}>
          <div className={styles.aboutGridContainer}>
            
            {/* Left Column: 6-Card Services Grid */}
            <div className={styles.servicesCardGrid}>
              <Link href="/dich-vu/don-dep-theo-gio-thang" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <VacuumIcon />
                </div>
                <span className={styles.serviceLineTitle}>Vệ sinh nhà ở</span>
              </Link>
              <Link href="/dich-vu/ve-sinh-cong-nghiep" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <IndustrialIcon />
                </div>
                <span className={styles.serviceLineTitle}>Vệ sinh công nghiệp</span>
              </Link>
              <Link href="/dich-vu/phu-bong-san" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <FloorPolishingIcon />
                </div>
                <span className={styles.serviceLineTitle}>Đánh bóng sàn</span>
              </Link>
              <Link href="/dich-vu/ve-sinh-cong-nghiep" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <HospitalIcon />
                </div>
                <span className={styles.serviceLineTitle}>Vệ sinh bệnh viện</span>
              </Link>
              <Link href="/dich-vu/ve-sinh-cong-nghiep" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <OfficeIcon />
                </div>
                <span className={styles.serviceLineTitle}>Vệ sinh văn phòng</span>
              </Link>
              <Link href="/dich-vu/don-dep-theo-gio-thang" className={`${styles.serviceLineCard} group`}>
                <div className={styles.serviceLineIcon}>
                  <HourlyIcon />
                </div>
                <span className={styles.serviceLineTitle}>Vệ sinh theo giờ</span>
              </Link>
            </div>

            {/* Right Column: About Us Copy */}
            <div className={styles.aboutTextContent}>
              <h2 className={styles.aboutHeading}>Về chúng tôi</h2>
              <p className={styles.aboutParagraph}>
                Là đơn vị có thâm niên trong ngành vệ sinh công nghiệp, chúng tôi tích lũy
                được nhiều kinh nghiệm khi thi công dịch vụ, với những kinh nghiệm đó giúp
                chúng tôi rút ngắn được thời gian thi công cũng như công đoạn vì vậy giá thành
                luôn được đảm bảo tốt nhất.
              </p>
              <p className={styles.aboutParagraph}>
                Với đội ngũ nhân viên kỹ thuật dày dạn kinh nghiệm, trải dài khắp vùng miền
                và có thể huy động số lượng lớn nhân công cùng một lúc, chúng tôi thực hiện
                công việc trong thời gian rất ngắn. Bên cạnh đó, chúng tôi sử dụng các công cụ
                thiết bị vệ sinh hiện đại cùng với các sản phẩm hoạt chất tẩy rửa an toàn sẽ
                giúp bề mặt của công trình trở nên sạch như mới.
              </p>
              <Link href="/dich-vu" className={styles.aboutBtnSolid}>
                Xem giới thiệu chi tiết
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. QUICK CONTACT CTA BAR */}
      <section className={styles.ctaBarSection}>
        <div className={styles.container}>
          <div className={styles.ctaBarContainer}>
            <div className={styles.ctaBarText}>
              <h3 className={styles.ctaBarHeading}>Bạn cần tư vấn dịch vụ dọn dẹp vệ sinh của chúng tôi?</h3>
              <p className={styles.ctaBarSub}>Cách nhanh nhất, vui lòng liên hệ trực tiếp với tư vấn viên qua một trong các kênh sau:</p>
            </div>
            <div className={styles.ctaBarChannels}>
              <a href="https://zalo.me/0969999295" target="_blank" rel="noopener noreferrer" className={styles.ctaBarLink}>
                <div className={styles.ctaBarIconCircle}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.2 2C6.7 2 2.2 6.5 2.2 12c0 1.9.5 3.7 1.5 5.2l-1.3 4.8 5-.1c1.4.7 3.1 1.1 4.8 1.1 5.5 0 10-4.5 10-10S17.7 2 12.2 2zm3.3 12.9c-.2.5-.9.9-1.2.9-.3 0-.6-.1-.8-.2-.3-.1-1.3-.5-2.5-1.5-1-1-1.6-2.1-1.8-2.5-.2-.4.1-.7.4-1 .2-.2.5-.5.7-.7.2-.2.3-.4.4-.6.1-.2 0-.4-.1-.6l-.7-1.7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3z"/>
                  </svg>
                </div>
                <span>Chat Zalo</span>
              </a>
              <a href="https://m.me/0969999295" target="_blank" rel="noopener noreferrer" className={styles.ctaBarLink}>
                <div className={styles.ctaBarIconCircle}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.1V22c0 .2.3.4.5.3l3.5-2.3c.7.2 1.5.3 2.3.3 5.5 0 10-4.1 10-9.2S17.5 2 12 2zm1.2 11.8l-2.1-2.2-4.1 2.2 4.5-4.8 2.1 2.2 4.1-2.2-4.5 4.8z"/>
                  </svg>
                </div>
                <span>Chat Messenger</span>
              </a>
              <a href="tel:0969999295" className={styles.ctaBarLink}>
                <div className={styles.ctaBarIconCircle}>
                  <Phone className="w-5 h-5" />
                </div>
                <span>0969999295</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OPERATING CRITERIA SECTION */}
      <section className={styles.criteriaSection}>
        <div className={styles.container}>
          <div className="text-center space-y-2.5 mb-14">
            <h2 className={styles.criteriaHeading}>TIÊU CHÍ HOẠT ĐỘNG</h2>
            <p className={styles.criteriaSub}>Chúng tôi hoạt động với những tiêu chí rất cụ thể để giữ chữ tín với khách hàng.</p>
          </div>

          <div className={styles.criteriaGrid}>
            
            {/* Card 1: Chuyên nghiệp – Tận tâm */}
            <div className={styles.criteriaCard}>
              <div className={styles.criteriaImageWrapper}>
                <img src="/criteria_professional.png" alt="Chuyên nghiệp – Tận tâm" />
                <div className={styles.criteriaIconOverlap}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.3-6.3l-.7.7M6.7 17.3l-.7.7m12.6 0l-.7-.7M6.7 6.7l-.7-.7" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
              </div>
              <div className={styles.criteriaCardBody}>
                <h3 className={styles.criteriaCardTitle}>Chuyên nghiệp – Tận tâm</h3>
                <p className={styles.criteriaCardText}>
                  Đội ngũ tư vấn viên & chăm sóc khách hàng kinh nghiệm, chuyên nghiệp, tận tâm, cam kết bảo hành dịch vụ khi Khách hàng chưa hài lòng
                </p>
              </div>
            </div>

            {/* Card 2: Người giúp việc nhà tiêu chuẩn */}
            <div className={styles.criteriaCard}>
              <div className={styles.criteriaImageWrapper}>
                <img src="/criteria_standard_maid.png" alt="Người giúp việc nhà tiêu chuẩn" />
                <div className={styles.criteriaIconOverlap}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
              <div className={styles.criteriaCardBody}>
                <h3 className={styles.criteriaCardTitle}>Người giúp việc nhà tiêu chuẩn</h3>
                <p className={styles.criteriaCardText}>
                  Người giúp việc nhà tiêu chuẩn, đáng tin cậy, có đầy đủ hồ sơ. Công ty Tapvu247 chịu trách nhiệm tuyển chọn, đào tạo và quản lý.
                </p>
              </div>
            </div>

            {/* Card 3: Chi phí hợp lý */}
            <div className={styles.criteriaCard}>
              <div className={styles.criteriaImageWrapper}>
                <img src="/criteria_reasonable_cost.png" alt="Chi phí hợp lý" />
                <div className={styles.criteriaIconOverlap}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
              <div className={styles.criteriaCardBody}>
                <h3 className={styles.criteriaCardTitle}>Chi phí hợp lý</h3>
                <p className={styles.criteriaCardText}>
                  Giá dịch vụ được nhân viên của đơn vị tư vấn cho khách hàng ngay từ khi tiếp nhận thông tin. Cam kết giá cạnh tranh nhất.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CORE BENEFITS / FEATURES SECTION */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.benefitsFlexContainer}>
            
            {/* Left Column: 2 features */}
            <div className={styles.benefitsSideCol}>
              {/* Feature 1: Sạch sẽ */}
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <svg className="w-10 h-10 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 13L2 9z" />
                    <path d="M11 3 8 9l4 13 4-13-3-6" />
                    <path d="M2 9h20" />
                  </svg>
                </div>
                <h3 className={styles.benefitItemTitle}>SẠCH SẼ</h3>
                <p className={styles.benefitItemText}>
                  Chúng tôi giữ cho ngôi nhà của quý khách lấp lánh sạch sẽ và không có mầm bệnh. Chế độ khử trùng của chúng tôi giết chết 99% vi khuẩn thông thường.
                </p>
              </div>

              {/* Feature 2: Bảo hiểm */}
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <svg className="w-10 h-10 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12a10 10 0 0 1 20 0Z" />
                    <path d="M12 18.5a1.5 1.5 0 0 1 3 0v.5" />
                  </svg>
                </div>
                <h3 className={styles.benefitItemTitle}>BẢO HIỂM</h3>
                <p className={styles.benefitItemText}>
                  Chất tẩy rửa của chúng tôi được bảo hiểm và liên kết vì vậy không cần phải lo lắng về căn hộ, văn phòng hoặc khu vườn của Quý khách.
                </p>
              </div>
            </div>

            {/* Middle Column: Central Maid Image */}
            <div className={styles.benefitsCenterImageCol}>
              <img src="/maid_posing.png" alt="Nhân viên dọn dẹp vệ sinh Ánh Ngọc" className={styles.benefitsMaidImage} />
            </div>

            {/* Right Column: 2 features */}
            <div className={styles.benefitsSideCol}>
              {/* Feature 3: Công nghệ hàng đầu */}
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <svg className="w-10 h-10 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                    <path d="M12 5a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
                  </svg>
                </div>
                <h3 className={styles.benefitItemTitle}>CÔNG NGHỆ HÀNG ĐẦU</h3>
                <p className={styles.benefitItemText}>
                  Chúng tôi sử dụng chất khử trùng an toàn ở bệnh viện, dịch lọc HEPA và khăn lau bằng sợi nhỏ để giảm ô nhiễm chéo.
                </p>
              </div>

              {/* Feature 4: Chuyên nghiệp, uy tín */}
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <svg className="w-10 h-10 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    <path d="M8 11h8" />
                  </svg>
                </div>
                <h3 className={styles.benefitItemTitle}>CHUYÊN NGHIỆP, UY TÍN</h3>
                <p className={styles.benefitItemText}>
                  Đội ngũ đáng tin cậy và ổn định của chúng tôi hiểu nhu cầu dịch vụ dọn nhà và văn phòng cụ thể của Quý khách.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. STATS / IMPRESSIVE NUMBERS SECTION */}
      <section className={styles.statsSection}>
        <div className={styles.statsOverlay} />
        
        <div className={`${styles.container} ${styles.statsContainer}`}>
          
          {/* Vertical divider line on the far left */}
          <div className={styles.statsVerticalLine} style={{ left: '0%' }}>
            <span className={styles.statsLineCircle} style={{ top: '65%' }} />
          </div>

          <div className={styles.statsGrid}>
            
            {/* Stat 1 */}
            <div className={styles.statsItem}>
              <span className={styles.statsNumber}>295</span>
              <span className={styles.statsLabel}>CHỦ NHÀ ĐÃ NGHIỆM THU</span>
              {/* Divider line on the right */}
              <div className={styles.statsVerticalLine} style={{ right: '0%' }}>
                <span className={styles.statsLineCircle} style={{ top: '40%' }} />
              </div>
            </div>

            {/* Stat 2 */}
            <div className={styles.statsItem}>
              <span className={styles.statsNumber}>400</span>
              <span className={styles.statsLabel}>KHÁCH HÀNG HÀI LÒNG</span>
              {/* Divider line on the right */}
              <div className={styles.statsVerticalLine} style={{ right: '0%' }}>
                <span className={styles.statsLineCircle} style={{ top: '75%' }} />
              </div>
            </div>

            {/* Stat 3 */}
            <div className={styles.statsItem}>
              <span className={styles.statsNumber}>527</span>
              <span className={styles.statsLabel}>DỰ ÁN ĐÃ HOÀN THÀNH</span>
              {/* Divider line on the right */}
              <div className={styles.statsVerticalLine} style={{ right: '0%' }}>
                <span className={styles.statsLineCircle} style={{ top: '30%' }} />
              </div>
            </div>

            {/* Stat 4 */}
            <div className={styles.statsItem}>
              <span className={styles.statsNumber}>105</span>
              <span className={styles.statsLabel}>ĐỊA ĐIỂM ĐÃ LÀM SẠCH</span>
              {/* Divider line on the right (far right edge) */}
              <div className={styles.statsVerticalLine} style={{ right: '0%' }}>
                <span className={styles.statsLineCircle} style={{ top: '55%' }} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. NEWS */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.newsHead}>
            <div>
              <span className={styles.kicker}>Cẩm nang vệ sinh</span>
              <h2 className={`${styles.heading} ${styles.headingLg}`}>Tin tức &amp; Mẹo vặt</h2>
            </div>
            <Link href="/tin-tuc" className={styles.btnLink}>
              Xem tất cả bài viết
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.newsList}>
            {newsList.map((post, index) => (
              <Reveal
                key={post.slug}
                style={{ "--i": index % 3 } as CSSProperties}
                className={`${styles.newsItem} ${styles.reveal}`}
              >
                <div className={`${styles.frame} ${styles.frame4x3}`}>
                  <img src={post.image} alt={post.title} />
                </div>
                <div>
                  <span className={styles.newsCategory}>{post.category}</span>
                  <h3 className={styles.newsTitle}>
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className={styles.body} style={{ marginTop: "var(--home-space-2xs)" }}>
                    {post.summary}
                  </p>
                  <span className={styles.newsDate}>
                    {post.publishDate.split("-").reverse().join("/")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT — diptych: form / map + details */}
      <section id="booking-section" className={styles.section} style={{ scrollMarginTop: "4rem" }}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <Reveal style={{ "--i": 0 } as CSSProperties} className={styles.reveal}>
              <ContactForm />
            </Reveal>

            <Reveal
              style={{ "--i": 1 } as CSSProperties}
              className={`${styles.infoPanel} ${styles.reveal}`}
            >
              <div className={styles.mapFrame}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1099684351336!2d105.93774847602058!3d20.988225089166922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a9db7120df0f%3A0x7d67cfb42e61a6b0!2sVinhomes%20Ocean%20Park!5e0!3m2!1svi!2s!4v1721400000000!5m2!1svi!2s"
                  loading="lazy"
                  allowFullScreen
                  title="Bản đồ văn phòng Vệ Sinh 247 Ánh Ngọc"
                />
              </div>

              <div className={styles.detailCard}>
                <div className={styles.detailRow}>
                  <MapPin size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Văn phòng</span>
                    <span className={styles.detailValue}>
                      The Landmark, Vinhomes Central Park, Bình Thạnh, TP.HCM
                    </span>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <Phone size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Hotline</span>
                    <a href="tel:0911976839" className={styles.hotline}>
                      0911976839
                    </a>
                    <span className={styles.detailValue} style={{ display: "block" }}>
                      Hỗ trợ 24/7
                    </span>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <ShieldCheck size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Cam kết</span>
                    <span className={styles.detailValue}>100% sạch bong mới thanh toán</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
