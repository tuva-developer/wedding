import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi'

type InviteContentProps = {
  phase: string
  gallery: string[]
}

const WEDDING_DATE = new Date('2025-10-25T17:30:00')

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function OctoberCalendar() {
  // Oct 1, 2025 = Wednesday → index 3 (0=Sun)
  const headers = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const cells: (number | null)[] = []
  for (let i = 0; i < 3; i++) cells.push(null)
  for (let d = 1; d <= 31; d++) cells.push(d)

  return (
    <div className="max-w-[310px] mx-auto rounded-2xl overflow-hidden border border-[#ddd6ca] shadow-sm">
      <div className="bg-[#52613e] py-3 text-center">
        <p className="font-playfair text-white text-[15px] tracking-wide">Tháng Mười · 2025</p>
      </div>
      <div className="bg-white p-4">
        <div className="grid grid-cols-7 mb-1">
          {headers.map((h) => (
            <div key={h} className="text-center text-[10px] font-semibold text-[#52613e]/50 py-1">
              {h}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((d, i) => (
            <div key={i} className="flex items-center justify-center h-8">
              {d === 25 ? (
                <div className="relative w-8 h-8 rounded-full bg-[#52613e] flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">{d}</span>
                  <span className="absolute -top-1.5 -right-1 text-[9px] text-red-400 leading-none">♥</span>
                </div>
              ) : d ? (
                <span className="text-[11px] text-[#3b3b30]/65 w-8 h-8 flex items-center justify-center rounded-full">
                  {d}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[#52613e]/60 mt-3 tracking-wider">
          THỨ BẢY · 25/10/2025 · 17:30
        </p>
      </div>
    </div>
  )
}

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    {([
      { left: '8%', delay: '0s', size: 11 },
      { left: '20%', delay: '0.7s', size: 8 },
      { left: '35%', delay: '1.4s', size: 13 },
      { left: '50%', delay: '0.3s', size: 9 },
      { left: '65%', delay: '1.1s', size: 11 },
      { left: '78%', delay: '0.6s', size: 8 },
      { left: '90%', delay: '1.8s', size: 12 },
    ]).map(({ left, delay, size }, i) => (
      <span
        key={i}
        className="absolute bottom-[12%] text-[#c5bcab] select-none"
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
)

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-1">
    <div className="h-px w-14 bg-[#c5bcab]" />
    <span className="text-[#c5bcab] text-sm">♥</span>
    <div className="h-px w-14 bg-[#c5bcab]" />
  </div>
)

const InviteContent = ({ phase, gallery }: InviteContentProps) => {
  const isOpening = phase === 'opening'
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = gallery.length
  const thumbsPerView = 6
  const lastStart = Math.max(0, totalSlides - thumbsPerView)
  const thumbStart = Math.min(
    Math.floor(currentSlide / thumbsPerView) * thumbsPerView,
    lastStart,
  )
  const visibleThumbs = gallery.slice(thumbStart, thumbStart + thumbsPerView)
  const goPrev = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides)
  const goNext = () => setCurrentSlide((p) => (p + 1) % totalSlides)
  const goThumbPrev = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides)
  const goThumbNext = () => setCurrentSlide((p) => (p + 1) % totalSlides)

  const [countdown, setCountdown] = useState(() => calcTimeLeft(WEDDING_DATE))
  useEffect(() => {
    const id = setInterval(() => setCountdown(calcTimeLeft(WEDDING_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className={`w-full relative ${
        isOpening ? 'animate-openFadeSlow' : 'animate-openFade'
      } overflow-hidden rounded-[28px] border border-[#e8e2d8] shadow-card bg-white`}
    >
      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-8 min-h-[420px] overflow-hidden bg-[#fdfcf9]">
        <FloatingHearts />
        <img
          className="absolute w-[min(160px,32vw)] top-0 left-0 opacity-40 pointer-events-none"
          src="/imgs/thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png"
          aria-hidden
        />
        <img
          className="absolute w-[min(160px,32vw)] bottom-0 right-0 opacity-40 pointer-events-none"
          src="/imgs/thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png"
          aria-hidden
        />
        <p className="relative z-[2] text-[10px] tracking-[5px] uppercase text-[#52613e]/55 mb-5">
          Fall In Love Wedding
        </p>
        <h1 className="relative z-[2] font-playfair text-[clamp(32px,6vw,50px)] leading-[1.2] text-[#2d2d22] mb-5">
          YOU ARE
          <br />
          THE LOVE
          <br />
          OF MY LIFE
        </h1>
        <Divider />
        <p className="relative z-[2] mt-4 text-[12px] italic text-[#52613e]/65 max-w-[260px] leading-relaxed">
          "Khi mây mù tan hết, anh yêu em và cả thế gian đều biết"
        </p>
      </section>

      {/* ── 2. INVITATION MESSAGE ───────────────────────── */}
      <section className="py-9 px-8 text-center bg-[#f5f1ea] border-y border-[#e5ddd0]">
        <p className="text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-3">
          Wedding Invitation
        </p>
        <p className="text-[#52613e] text-[13px] leading-[2]">
          Kính gửi đến bạn tấm thiệp cưới đầy yêu thương,
          <br />
          trân trọng mời bạn đến dự buổi tiệc chung vui
          <br />
          cùng gia đình chúng tôi.
        </p>
      </section>

      {/* ── 3. PARENTS + COUPLE NAMES ───────────────────── */}
      <section className="relative py-12 px-6 text-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          src="/imgs/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png"
          aria-hidden
        />
        <div className="relative z-[2] text-[#52613e] grid gap-6">
          <p className="text-[10px] tracking-[3px] uppercase text-[#52613e]/60">
            Kính mời tham dự tiệc chung vui của gia đình chúng tôi
          </p>

          <div className="grid grid-cols-2 gap-4 text-[12px]">
            <div className="grid gap-1.5">
              <p className="uppercase text-[10px] tracking-widest font-semibold text-[#52613e]/60 mb-0.5">
                Nhà trai
              </p>
              <p>Ông. Nguyễn Hùng Vương</p>
              <p>Bà. Trần Thị Bích Phương</p>
            </div>
            <div className="grid gap-1.5">
              <p className="uppercase text-[10px] tracking-widest font-semibold text-[#52613e]/60 mb-0.5">
                Nhà gái
              </p>
              <p>Ông. Lưu Chí Hiếu</p>
              <p>Bà. Nguyễn Ngọc Ánh</p>
            </div>
          </div>

          <div>
            <p className="font-vibes text-[clamp(38px,7.5vw,56px)] leading-[1.1]">Thành Đạt</p>
            <Divider />
            <p className="font-vibes text-[clamp(38px,7.5vw,56px)] leading-[1.1]">Minh Hạ</p>
          </div>
        </div>
      </section>

      {/* ── 4. COVER PHOTO ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          className="w-full block"
          src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141318-20260130071408-ftszz.png"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 py-10 bg-gradient-to-t from-black/55 to-transparent text-white text-center">
          <p className="text-[11px] tracking-[3px] uppercase opacity-85">All of me loves</p>
          <p className="mt-1 font-vibes text-[clamp(28px,6vw,40px)]">all of you</p>
        </div>
      </section>

      {/* ── 5. LOVE QUOTE ────────────────────────────────── */}
      <section className="py-10 px-8 text-center bg-[#f5f1ea] border-y border-[#e5ddd0]">
        <p className="font-playfair text-[clamp(16px,3.5vw,21px)] italic text-[#3b3b30] leading-[1.7]">
          "I love three things in this world.
          <br />
          Sun, moon and you."
        </p>
        <Divider />
        <p className="mt-4 text-[11px] text-[#52613e]/65 leading-[1.8]">
          Có lẽ thế gian này có vô vàn điều tươi đẹp,
          <br />
          nhưng trong lòng em, đẹp nhất vẫn chỉ có anh.
        </p>
      </section>

      {/* ── 6. COUNTDOWN ────────────────────────────────── */}
      <section className="py-12 px-6 text-center">
        <p className="text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-2">
          Đếm ngược đến ngày cưới
        </p>
        <p className="font-playfair text-[16px] text-[#52613e] mb-7">25 · 10 · 2025</p>
        <div className="grid grid-cols-4 gap-2.5">
          {(
            [
              { value: countdown.days, label: 'Ngày' },
              { value: countdown.hours, label: 'Giờ' },
              { value: countdown.minutes, label: 'Phút' },
              { value: countdown.seconds, label: 'Giây' },
            ] as const
          ).map(({ value, label }) => (
            <div
              key={label}
              className="border border-[#e5ddd0] rounded-2xl py-4 px-1 bg-[#faf8f4] grid gap-1"
            >
              <strong className="text-[clamp(20px,4.5vw,28px)] text-[#52613e] font-playfair leading-none block">
                {String(value).padStart(2, '0')}
              </strong>
              <span className="text-[10px] text-[#52613e]/55 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CALENDAR ─────────────────────────────────── */}
      <section className="py-10 px-6 bg-[#f5f1ea] border-y border-[#e5ddd0]">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-6">
          Ngày trọng đại
        </p>
        <OctoberCalendar />
      </section>

      {/* ── 8. WEDDING DETAILS ──────────────────────────── */}
      <section className="relative py-12 px-6 text-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          src="/imgs/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png"
          aria-hidden
        />
        <div className="relative z-[2] text-[#52613e] grid gap-4">
          <p className="text-[10px] tracking-[4px] uppercase text-[#52613e]/55">
            Trân trọng kính mời
          </p>
          <p className="text-[12px] leading-relaxed">
            Đến dự buổi tiệc chung vui cùng gia đình chúng tôi vào lúc
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className="font-playfair text-[clamp(52px,10vw,72px)] leading-none">25</span>
            <div className="text-left">
              <p className="font-playfair text-[16px] font-medium">Tháng 10</p>
              <p className="text-[13px] text-[#52613e]/80">Năm 2025</p>
            </div>
          </div>

          <p className="font-playfair text-[15px] font-medium">17:30 · Thứ Bảy</p>
          <p className="text-[11px] text-[#52613e]/60">(Tức ngày 05 tháng 09 năm Ất Tỵ)</p>

          <Divider />

          <div className="grid gap-2 text-[13px]">
            <p className="text-[10px] tracking-widest uppercase text-[#52613e]/55">Tổ chức tại</p>
            <strong className="text-[15px]">The Opera Wedding & Convention Center</strong>
            <span className="text-[12px] text-[#52613e]/70">
              Lô 18A Lê Hồng Phong, Kiêu Sơn, Hải An, Hải Phòng
            </span>
            <a
              href="https://maps.app.goo.gl/doSwnXX7kwrr3CW58"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-[#52613e] text-[#52613e] px-5 py-2 rounded-full text-[12px] mx-auto mt-1 transition-colors hover:bg-[#52613e] hover:text-white"
            >
              <FiMapPin size={12} />
              Chỉ đường
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. STORY PHOTO ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          className="w-full block brightness-[0.75]"
          src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141905-20260130071947-jqcxf.png"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
          <p className="text-[10px] tracking-[4px] uppercase opacity-75 mb-3">Câu chuyện</p>
          <p className="font-playfair text-[clamp(14px,3vw,18px)] italic leading-[1.8] max-w-[300px]">
            Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử thách để cùng nhau
            bước đến ngày trọng đại – đám cưới của chúng mình.
          </p>
        </div>
      </section>

      {/* ── 10. TIMELINE + DRESSCODE ─────────────────────── */}
      <section className="py-10 px-6 text-center text-[#52613e]">
        <p className="text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-7">Chương trình</p>
        <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
          <div className="grid gap-2.5 place-items-center">
            <img
              className="w-14"
              src="/imgs/thiep-thanh-dat-element_0006_28-20251010165559-ejurh.png"
            />
            <p className="font-playfair text-[20px] leading-none">17:30</p>
            <span className="text-[11px] text-[#52613e]/65">Đón khách</span>
          </div>
          <div className="grid gap-2.5 place-items-center">
            <img
              className="w-14"
              src="/imgs/thiep-thanh-dat-element_0005_29-20251010165559-b9jp9.png"
            />
            <p className="font-playfair text-[20px] leading-none">19:00</p>
            <span className="text-[11px] text-[#52613e]/65">Khai tiệc</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e5ddd0]">
          <p className="text-[10px] tracking-[3px] uppercase text-[#52613e]/55 mb-3">Dresscode</p>
          <div className="flex justify-center gap-5">
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-[#e6dbc8] border border-[#d4c9b5] block" />
              <span className="text-[10px] text-[#52613e]/60">Kem</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-[#ccb9a4] border border-[#b8a590] block" />
              <span className="text-[10px] text-[#52613e]/60">Caramel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. GALLERY ─────────────────────────────────── */}
      <section className="py-10 px-4 bg-[#f5f1ea] border-y border-[#e5ddd0]">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-6">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 text-[#52613e] flex items-center justify-center"
            aria-label="Ảnh trước"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 text-[#52613e] flex items-center justify-center"
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
                i === currentSlide ? 'w-5 bg-[#52613e]' : 'w-2 bg-[#c5bcab]'
              }`}
              aria-label={`Chuyển đến ảnh ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={goThumbPrev}
            className="w-8 h-8 rounded-full bg-white/90 border border-black/10 text-[#52613e] flex items-center justify-center"
            aria-label="Thumbnail trước"
          >
            <FiChevronLeft />
          </button>
          <div className="flex items-center gap-1.5">
            {visibleThumbs.map((src, index) => {
              const realIndex = thumbStart + index
              return (
                <button
                  key={`thumb-${src}-${realIndex}`}
                  type="button"
                  onClick={() => setCurrentSlide(realIndex)}
                  className={`rounded-[8px] border-2 transition-all ${
                    realIndex === currentSlide
                      ? 'border-[#52613e]'
                      : 'border-transparent'
                  }`}
                  aria-label={`Chọn ảnh ${realIndex + 1}`}
                >
                  <img
                    className="h-14 w-[68px] object-cover rounded-[6px]"
                    src={src}
                    alt=""
                  />
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={goThumbNext}
            className="w-8 h-8 rounded-full bg-white/90 border border-black/10 text-[#52613e] flex items-center justify-center"
            aria-label="Thumbnail sau"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* ── 12. RSVP ────────────────────────────────────── */}
      <section className="py-12 px-6 bg-white">
        <p className="text-center text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-2">
          RSVP
        </p>
        <p className="text-center font-playfair text-[clamp(18px,4vw,22px)] text-[#2d2d22] mb-2">
          Xác nhận tham dự
        </p>
        <p className="text-center text-[12px] text-[#52613e]/65 mb-7 leading-[1.8]">
          Hãy xác nhận sự có mặt của bạn để chúng mình
          <br />
          chuẩn bị đón tiếp chu đáo.
        </p>
        <form className="grid gap-3">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3 text-[13px] bg-[#faf8f4] text-[#3b3b30] outline-none focus:border-[#52613e] transition-colors placeholder:text-[#52613e]/40"
          />
          <select className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3 text-[13px] bg-[#faf8f4] text-[#3b3b30] outline-none focus:border-[#52613e] transition-colors appearance-none">
            <option value="">Bạn sẽ đến chứ?</option>
            <option value="yes">Có, tôi sẽ tham dự</option>
            <option value="no">Xin lỗi, tôi bận rồi</option>
          </select>
          <select className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3 text-[13px] bg-[#faf8f4] text-[#3b3b30] outline-none focus:border-[#52613e] transition-colors appearance-none">
            <option value="">Bạn là khách mời của ai?</option>
            <option value="bride">Khách mời Cô Dâu</option>
            <option value="groom">Khách mời Chú Rể</option>
          </select>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Số lượng tham dự cùng?"
            className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3 text-[13px] bg-[#faf8f4] text-[#3b3b30] outline-none focus:border-[#52613e] transition-colors placeholder:text-[#52613e]/40"
          />
          <textarea
            placeholder="Gửi lời nhắn đến cô dâu chú rể"
            rows={3}
            className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3 text-[13px] bg-[#faf8f4] text-[#3b3b30] outline-none focus:border-[#52613e] transition-colors resize-none placeholder:text-[#52613e]/40"
          />
          <button
            type="button"
            className="w-full bg-[#52613e] text-white rounded-xl py-3.5 text-[13px] tracking-wide font-medium hover:bg-[#3f4f30] transition-colors"
          >
            Gửi xác nhận
          </button>
        </form>
      </section>

      {/* ── 13. THANK YOU ───────────────────────────────── */}
      <section className="py-12 px-8 text-center bg-[#f5f1ea] border-t border-[#e5ddd0]">
        <p className="text-[10px] tracking-[4px] uppercase text-[#52613e]/55 mb-4">Cảm ơn bạn</p>
        <p className="font-vibes text-[clamp(32px,6vw,46px)] text-[#52613e] mb-4">Thank you!</p>
        <p className="text-[12px] text-[#52613e]/75 leading-[1.9] max-w-sm mx-auto">
          Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là món quà ý
          nghĩa nhất trong ngày trọng đại này.
        </p>
        <Divider />
        <p className="mt-4 font-vibes text-[clamp(22px,5vw,30px)] text-[#52613e]/60">
          Thành Đạt & Minh Hạ
        </p>
      </section>
    </div>
  )
}

export default InviteContent
