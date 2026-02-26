import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type InviteContentProps = {
  phase: string;
  gallery: string[];
};

const WEDDING_DATE = new Date("2026-03-27T10:30:00");

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function MarchCalendar() {
  // March 1, 2026 = Sunday → index 0 (0=Sun)
  const headers = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const cells: (number | null)[] = [];
  for (let d = 1; d <= 31; d++) cells.push(d);

  return (
    <div className="max-w-[310px] mx-auto rounded-2xl overflow-hidden border border-[#e0e0e0] shadow-sm">
      <div className="bg-[#c0392b] py-3 text-center">
        <p className="font-playfair text-white text-[15px] tracking-wide">
          Tháng Ba · 2026
        </p>
      </div>
      <div className="bg-white p-4">
        <div className="grid grid-cols-7 mb-1">
          {headers.map((h) => (
            <div
              key={h}
              className="text-center text-[10px] font-semibold text-black/40 py-1"
            >
              {h}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((d, i) => (
            <div key={i} className="flex items-center justify-center h-8">
              {d === 27 ? (
                <div className="relative w-8 h-8 rounded-full bg-[#c0392b] flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">{d}</span>
                  <span className="absolute -top-1.5 -right-1 text-[9px] text-[#c0392b] leading-none drop-shadow-sm">
                    ♥
                  </span>
                </div>
              ) : d ? (
                <span className="text-[11px] text-black/60 w-8 h-8 flex items-center justify-center rounded-full">
                  {d}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-black/50 mt-3 tracking-wider">
          THỨ SÁU · 27/03/2026 · 10:30
        </p>
      </div>
    </div>
  );
}

const FloatingHearts = () => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden
  >
    {[
      { left: "8%", delay: "0s", size: 11 },
      { left: "20%", delay: "0.7s", size: 8 },
      { left: "35%", delay: "1.4s", size: 13 },
      { left: "50%", delay: "0.3s", size: 9 },
      { left: "65%", delay: "1.1s", size: 11 },
      { left: "78%", delay: "0.6s", size: 8 },
      { left: "90%", delay: "1.8s", size: 12 },
    ].map(({ left, delay, size }, i) => (
      <span
        key={i}
        className="absolute bottom-[12%] text-[#c0392b] select-none"
        style={{
          left,
          fontSize: size,
          animation: `floatHeart ${3.5 + (i % 3) * 0.8}s ease-in-out ${delay} infinite`,
          opacity: 0,
        }}
      >
        ♥
      </span>
    ))}
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-1">
    <div className="h-px w-14 bg-[#c0392b]/30" />
    <span className="text-[#c0392b] text-sm">♥</span>
    <div className="h-px w-14 bg-[#c0392b]/30" />
  </div>
);

const InviteContent = ({ phase, gallery }: InviteContentProps) => {
  const isOpening = phase === "opening";
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = gallery.length;
  const thumbsPerView = 6;
  const lastStart = Math.max(0, totalSlides - thumbsPerView);
  const thumbStart = Math.min(
    Math.floor(currentSlide / thumbsPerView) * thumbsPerView,
    lastStart,
  );
  const visibleThumbs = gallery.slice(thumbStart, thumbStart + thumbsPerView);
  const goPrev = () =>
    setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);
  const goNext = () => setCurrentSlide((p) => (p + 1) % totalSlides);
  const goThumbPrev = () =>
    setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);
  const goThumbNext = () => setCurrentSlide((p) => (p + 1) % totalSlides);

  const [countdown, setCountdown] = useState(() => calcTimeLeft(WEDDING_DATE));
  useEffect(() => {
    const id = setInterval(
      () => setCountdown(calcTimeLeft(WEDDING_DATE)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`w-full relative ${
        isOpening ? "animate-openFadeSlow" : "animate-openFade"
      } overflow-hidden rounded-[28px] border border-[#e0e0e0] shadow-card bg-white`}
    >
      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-8 min-h-[420px] overflow-hidden bg-white">
        <FloatingHearts />
        <img
          className="absolute w-[min(160px,32vw)] top-0 left-0 opacity-[0.12] pointer-events-none"
          src="/imgs/thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png"
          aria-hidden
        />
        <img
          className="absolute w-[min(160px,32vw)] bottom-0 right-0 opacity-[0.12] pointer-events-none"
          src="/imgs/thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png"
          aria-hidden
        />
        <p className="relative z-[2] text-[10px] tracking-[5px] uppercase text-black/40 mb-5">
          Fall In Love Wedding
        </p>
        <h1 className="relative z-[2] font-playfair text-[clamp(32px,6vw,50px)] leading-[1.2] text-[#111] mb-5">
          YOU ARE
          <br />
          THE LOVE
          <br />
          OF MY LIFE
        </h1>
        <Divider />
        <p className="relative z-[2] mt-4 text-[12px] italic text-black/50 max-w-[260px] leading-relaxed font-playfair">
          &ldquo;Khi mây mù tan hết, anh yêu em và cả thế gian đều biết&rdquo;
        </p>
      </section>

      {/* ── 3. COUPLE NAMES ─────────────────────────────── */}
      <section className="py-12 px-6 text-center bg-white">
        <p className="text-[10px] tracking-[3px] uppercase text-black/40 mb-6">
          Kính mời tham dự tiệc chung vui của gia đình chúng tôi
        </p>
        <div>
          <p className="font-vibes text-[clamp(42px,8vw,62px)] leading-[1.1] text-[#111]">
            Kiều Anh
          </p>
          <Divider />
          <p className="font-vibes text-[clamp(42px,8vw,62px)] leading-[1.1] text-[#111]">
            Văn Mẫn
          </p>
        </div>
      </section>

      {/* ── 4. COVER PHOTO ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          className="w-full block"
          src="/images/z7561870183143_b9eab5aec3257f07fa33ca3183443b84.jpg"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 py-10 bg-gradient-to-t from-black/65 to-transparent text-white text-center">
          <p className="text-[11px] tracking-[3px] uppercase opacity-85">
            All of me loves
          </p>
          <p className="mt-1 font-vibes text-[clamp(28px,6vw,40px)]">
            all of you
          </p>
        </div>
      </section>

      {/* ── 5. LOVE QUOTE ────────────────────────────────── */}
      <section className="py-10 px-8 text-center bg-[#f7f7f7] border-y border-[#e0e0e0]">
        <p className="font-playfair text-[clamp(16px,3.5vw,21px)] italic text-[#111] leading-[1.7]">
          &ldquo;I love three things in this world.
          <br />
          Sun, moon and you.&rdquo;
        </p>
        <Divider />
        <p className="mt-4 text-[11px] text-black/55 leading-[1.8]">
          Có lẽ thế gian này có vô vàn điều tươi đẹp,
          <br />
          nhưng trong lòng em, đẹp nhất vẫn chỉ có anh.
        </p>
      </section>

      {/* ── 6. COUNTDOWN ────────────────────────────────── */}
      <section className="py-12 px-6 text-center bg-white">
        <p className="text-[10px] tracking-[4px] uppercase text-black/40 mb-2">
          Đếm ngược đến ngày cưới
        </p>
        <p className="font-playfair text-[16px] text-[#c0392b] mb-7">
          27 · 03 · 2026
        </p>
        <div className="grid grid-cols-4 gap-2.5">
          {(
            [
              { value: countdown.days, label: "Ngày" },
              { value: countdown.hours, label: "Giờ" },
              { value: countdown.minutes, label: "Phút" },
              { value: countdown.seconds, label: "Giây" },
            ] as const
          ).map(({ value, label }) => (
            <div
              key={label}
              className="border border-[#e0e0e0] rounded-2xl py-4 px-1 bg-white grid gap-1"
            >
              <strong className="text-[clamp(20px,4.5vw,28px)] text-[#c0392b] font-playfair leading-none block">
                {String(value).padStart(2, "0")}
              </strong>
              <span className="text-[10px] text-black/40 uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CALENDAR ─────────────────────────────────── */}
      <section className="py-10 px-6 bg-[#f7f7f7] border-y border-[#e0e0e0]">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-black/40 mb-6">
          Ngày trọng đại
        </p>
        <MarchCalendar />
      </section>

      {/* ── 8. WEDDING DETAILS ──────────────────────────── */}
      <section className="py-12 px-6 text-center bg-white">
        <p className="text-[10px] tracking-[4px] uppercase text-black/40 mb-3">
          Trân trọng kính mời
        </p>
        <p className="text-[12px] text-black/60 leading-relaxed mb-5">
          Đến dự buổi tiệc chung vui cùng gia đình chúng tôi vào lúc
        </p>

        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="font-playfair text-[clamp(52px,10vw,72px)] leading-none text-[#c0392b]">
            27
          </span>
          <div className="text-left">
            <p className="font-playfair text-[16px] font-medium text-[#111]">
              Tháng 3
            </p>
            <p className="text-[13px] text-black/60">Năm 2026</p>
          </div>
        </div>

        <p className="font-playfair text-[15px] font-medium text-[#111]">
          10:30 · Thứ Sáu
        </p>
        <p className="text-[11px] text-black/45 mt-1">
          (Nhằm ngày 08 tháng 03 năm Bính Ngọ)
        </p>

        <Divider />

        <div className="grid gap-2 text-[13px] mt-2">
          <p className="text-[10px] tracking-widest uppercase text-black/40">
            Tổ chức tại
          </p>
          <strong className="text-[16px] text-[#111] font-playfair">
            Ấp 6B
          </strong>
        </div>
      </section>

      {/* ── 9. STORY PHOTO ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          className="w-full block brightness-[0.7]"
          src="/images/z7561885376753_6c3951304d4cbade3e587bae3c08c2ee.jpg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
          <p className="text-[10px] tracking-[4px] uppercase opacity-75 mb-3">
            Câu chuyện
          </p>
          <p className="font-playfair text-[clamp(14px,3vw,18px)] italic leading-[1.8] max-w-[300px]">
            Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử
            thách để cùng nhau bước đến ngày trọng đại – đám cưới của chúng
            mình.
          </p>
        </div>
      </section>

      {/* ── 10. TIMELINE + DRESSCODE ─────────────────────── */}
      <section className="py-10 px-6 text-center bg-[#f7f7f7] border-y border-[#e0e0e0]">
        <p className="text-[10px] tracking-[4px] uppercase text-black/40 mb-7">
          Chương trình
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
          <div className="grid gap-2.5 place-items-center">
            <img
              className="w-14 opacity-80"
              src="/imgs/thiep-thanh-dat-element_0006_28-20251010165559-ejurh.png"
            />
            <p className="font-playfair text-[20px] leading-none text-[#c0392b]">
              10:30
            </p>
            <span className="text-[11px] text-black/55">Đón khách</span>
          </div>
          <div className="grid gap-2.5 place-items-center">
            <img
              className="w-14 opacity-80"
              src="/imgs/thiep-thanh-dat-element_0005_29-20251010165559-b9jp9.png"
            />
            <p className="font-playfair text-[20px] leading-none text-[#c0392b]">
              11:00
            </p>
            <span className="text-[11px] text-black/55">Đãi khách</span>
          </div>
        </div>
      </section>

      {/* ── 11. GALLERY ─────────────────────────────────── */}
      <section className="py-10 px-4 bg-white">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-black/40 mb-6">
          Khoảnh Khắc
        </p>

        <div className="relative overflow-hidden rounded-[18px] shadow-card">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {gallery.map((src, index) => (
              <div key={`${src}-${index}`} className="min-w-full">
                <img
                  className="w-full h-[560px] object-cover max-[720px]:h-[280px]"
                  src={src}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 text-[#c0392b] flex items-center justify-center"
            aria-label="Ảnh trước"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 text-[#c0392b] flex items-center justify-center"
            aria-label="Ảnh sau"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {gallery.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-5 bg-[#c0392b]" : "w-2 bg-black/20"
              }`}
              aria-label={`Chuyển đến ảnh ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={goThumbPrev}
            className="w-8 h-8 rounded-full bg-white border border-[#e0e0e0] text-[#c0392b] flex items-center justify-center"
            aria-label="Thumbnail trước"
          >
            <FiChevronLeft />
          </button>
          <div className="flex items-center gap-1.5">
            {visibleThumbs.map((src, index) => {
              const realIndex = thumbStart + index;
              return (
                <button
                  key={`thumb-${src}-${realIndex}`}
                  type="button"
                  onClick={() => setCurrentSlide(realIndex)}
                  className={`rounded-[8px] border-2 transition-all ${
                    realIndex === currentSlide
                      ? "border-[#c0392b]"
                      : "border-transparent"
                  }`}
                  aria-label={`Chọn ảnh ${realIndex + 1}`}
                >
                  <img
                    className="h-14 w-[68px] object-cover rounded-[6px]"
                    src={src}
                    alt=""
                  />
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={goThumbNext}
            className="w-8 h-8 rounded-full bg-white border border-[#e0e0e0] text-[#c0392b] flex items-center justify-center"
            aria-label="Thumbnail sau"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* ── 12. RSVP ────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#f7f7f7] border-y border-[#e0e0e0]">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-black/40 mb-2">
          RSVP
        </p>
        <p className="text-center font-playfair text-[clamp(18px,4vw,22px)] text-[#111] mb-2">
          Xác nhận tham dự
        </p>
        <p className="text-center text-[12px] text-black/50 mb-7 leading-[1.8]">
          Hãy xác nhận sự có mặt của bạn để chúng mình
          <br />
          chuẩn bị đón tiếp chu đáo.
        </p>
        <form className="grid gap-3">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border border-[#e0e0e0] rounded-xl px-4 py-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#c0392b] transition-colors placeholder:text-black/30"
          />
          <select className="w-full border border-[#e0e0e0] rounded-xl px-4 py-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#c0392b] transition-colors appearance-none">
            <option value="">Bạn sẽ đến chứ?</option>
            <option value="yes">Có, tôi sẽ tham dự</option>
            <option value="no">Xin lỗi, tôi bận rồi</option>
          </select>
          <select className="w-full border border-[#e0e0e0] rounded-xl px-4 py-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#c0392b] transition-colors appearance-none">
            <option value="">Bạn là khách mời của ai?</option>
            <option value="bride">Khách mời Cô Dâu</option>
            <option value="groom">Khách mời Chú Rể</option>
          </select>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Số lượng tham dự cùng?"
            className="w-full border border-[#e0e0e0] rounded-xl px-4 py-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#c0392b] transition-colors placeholder:text-black/30"
          />
          <textarea
            placeholder="Gửi lời nhắn đến cô dâu chú rể"
            rows={3}
            className="w-full border border-[#e0e0e0] rounded-xl px-4 py-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#c0392b] transition-colors resize-none placeholder:text-black/30"
          />
          <button
            type="button"
            className="w-full bg-[#c0392b] text-white rounded-xl py-3.5 text-[13px] tracking-wide font-medium hover:bg-[#a93226] transition-colors"
          >
            Gửi xác nhận
          </button>
        </form>
      </section>

      {/* ── 13. THANK YOU ───────────────────────────────── */}
      <section className="py-12 px-8 text-center bg-white border-t border-[#e0e0e0]">
        <p className="text-[10px] tracking-[4px] uppercase text-black/40 mb-4">
          Cảm ơn bạn
        </p>
        <p className="font-vibes text-[clamp(32px,6vw,46px)] text-[#c0392b] mb-4">
          Thank you!
        </p>
        <p className="text-[12px] text-black/55 leading-[1.9] max-w-sm mx-auto">
          Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn
          chính là món quà ý nghĩa nhất trong ngày trọng đại này.
        </p>
        <Divider />
        <p className="mt-4 font-vibes text-[clamp(22px,5vw,30px)] text-[#111]/60">
          Kiều Anh ♥ Văn Mẫn
        </p>
      </section>
    </div>
  );
};

export default InviteContent;
