import Link from "next/link";
import type { CSSProperties } from "react";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { getServices, getLatestNews, getCompanyInfo } from "@/services/dataService";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
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

export default async function Page() {
  const companyInfo = await getCompanyInfo();
  const services = await getServices();
  const homepageServices = services.slice(0, 3);
  const newsList = await getLatestNews(3);

  return (
    <div className={`${styles.page} ${fraunces.variable} ${beVietnamPro.variable} w-full`}>
      <noscript>
        <style>{`.${styles.reveal}{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* 1. HERO — Split Studio diptych */}
      <section className={`${styles.hero} ${styles.container}`}>
        <div className={styles.diptych}>
          <Reveal style={{ "--i": 0 } as CSSProperties} className={styles.reveal}>
            <span className={styles.kicker}>Vinhomes Premium Service</span>

            <h1 className={`${styles.heading} ${styles.headingXl}`}>
              Dịch Vụ Vệ Sinh{" "}
              <span style={{ color: "var(--home-accent)" }}>Chuẩn Mực Cao Cấp</span>
            </h1>

            <p className={styles.lede} style={{ marginTop: "var(--home-space-md)" }}>
              &ldquo;{companyInfo.slogan}&rdquo;
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--home-space-md)",
                marginTop: "var(--home-space-lg)",
              }}
            >
              <a href="#booking-section" className={styles.btnOutline}>
                Khảo sát giá ngay
              </a>
              <Link href="/dich-vu" className={styles.btnLink}>
                Tìm hiểu thêm
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.heroTrust}>
              <div className={styles.avatarStack}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  aria-hidden="true"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  aria-hidden="true"
                />
                <span className={styles.avatarMore} aria-hidden="true">
                  +50
                </span>
              </div>
              <span className={styles.trustLabel}>
                <strong>500+</strong> dự án Vinhomes đã thi công
              </span>
            </div>
          </Reveal>

          <Reveal
            style={{ "--i": 1, position: "relative" } as CSSProperties}
            className={`${styles.diptychMedia} ${styles.reveal}`}
          >
            <div className={`${styles.frame} ${styles.frame4x3}`}>
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                alt="Nhân viên Ánh Ngọc vệ sinh căn hộ tại Vinhomes"
              />
            </div>
            <div className={styles.trustCard}>
              <span className={styles.trustIcon}>
                <CheckCircle2 size={18} />
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--home-success)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  100%
                </span>
                <span style={{ fontSize: "var(--home-text-xs)", fontWeight: 700, color: "var(--home-ink-2)" }}>
                  Cam kết sạch bong mới thanh toán
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. ABOUT — reversed diptych */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={`${styles.diptych} ${styles.diptychReverse}`}>
            <Reveal
              style={{ "--i": 0 } as CSSProperties}
              className={`${styles.diptychMedia} ${styles.frame} ${styles.frame1x1} ${styles.reveal}`}
            >
              <img
                src="https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80"
                alt="Không gian sofa được vệ sinh sạch sẽ"
              />
            </Reveal>

            <Reveal style={{ "--i": 1 } as CSSProperties} className={styles.reveal}>
              <span className={styles.kicker}>Về Ánh Ngọc Vinhomes</span>
              <h2 className={`${styles.heading} ${styles.headingLg}`}>
                Kiến Tạo Không Gian Sống Tinh Khiết
              </h2>

              <p className={styles.body} style={{ marginTop: "var(--home-space-md)" }}>
                Khởi nguồn từ mong muốn mang lại sự thảnh thơi cho những gia đình bận rộn tại các
                khu đô thị cao cấp, Vệ sinh 24/7 - Ánh Ngọc Vinhomes tự hào là đơn vị tiên phong
                trong giải pháp vệ sinh nhà ở chuyên sâu.
              </p>
              <p className={styles.body} style={{ marginTop: "var(--home-space-sm)" }}>
                Sứ mệnh của chúng tôi không chỉ là dọn dẹp, mà là thổi khí lành vào không gian
                sống, loại bỏ mọi tác nhân gây hại để gia đình bạn tận hưởng trọn vẹn sự trong lành
                và sảng khoái ngay trong chính tổ ấm của mình. Mỗi nhân viên là một chuyên gia tận
                tâm, mang cam kết phục vụ chuẩn mực 5 sao.
              </p>

              <div className={styles.statRow}>
                <div>
                  <span className={styles.statValue}>05+</span>
                  <span className={styles.statLabel}>Năm kinh nghiệm</span>
                </div>
                <div>
                  <span className={styles.statValue}>2.000+</span>
                  <span className={styles.statLabel}>Căn hộ hoàn thành</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SERVICES — three stacked alternating rows, not an icon-tile grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal
            style={{ marginBottom: "var(--home-space-2xl)" } as CSSProperties}
            className={styles.reveal}
          >
            <div style={{ maxWidth: "40rem" }}>
              <span className={styles.kicker}>Dịch vụ của chúng tôi</span>
              <h2 className={`${styles.heading} ${styles.headingLg}`}>
                Giải Pháp Vệ Sinh Toàn Diện
              </h2>
            </div>
          </Reveal>

          {homepageServices.map((service, index) => (
            <Reveal
              key={service.slug}
              className={`${styles.serviceRow} ${index % 2 === 1 ? styles.reverse : ""} ${styles.reveal}`}
            >
              <div className={`${styles.frame} ${styles.frame4x3}`}>
                <img src={service.bannerImage} alt={service.title} />
              </div>
              <div>
                <span className={styles.serviceIndex}>0{index + 1}</span>
                <h3 className={styles.serviceHeading}>{service.title}</h3>
                <p className={styles.body}>{service.shortDescription}</p>
                <Link
                  href={`/dich-vu/${service.slug}`}
                  className={styles.btnLink}
                  style={{ marginTop: "var(--home-space-md)" }}
                >
                  Tìm hiểu thêm
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. NEWS */}
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
