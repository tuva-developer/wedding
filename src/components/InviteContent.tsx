import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type InviteContentProps = {
  phase: string
  gallery: string[]
}

const InviteContent = ({ phase, gallery }: InviteContentProps) => {
  const isOpening = phase === 'opening'
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = gallery.length
  const thumbsPerView = 6
  const lastStart = Math.max(0, totalSlides - thumbsPerView)
  const thumbStart = Math.min(
    Math.floor(currentSlide / thumbsPerView) * thumbsPerView,
    lastStart
  )
  const visibleThumbs = gallery.slice(thumbStart, thumbStart + thumbsPerView)
  const goThumbPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  const goThumbNext = () =>
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  const goPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  const goNext = () =>
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  return (
    <div
      className={`w-full relative ${
        isOpening ? 'animate-openFadeSlow' : 'animate-openFade'
      } max-[880px]:grid max-[880px]:gap-3`}
    >
      <section className="relative w-full mx-auto grid place-items-center px-6 pt-12 pb-20 max-[720px]:px-4 max-[720px]:pt-10 max-[720px]:pb-16 rounded-[28px] mb-7">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-[28px] shadow-card opacity-95"
          src="/imgs/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png"
        />

        <h2 className="relative font-vibes text-[clamp(34px,5.6vw,54px)] text-[#6f7f63] mt-2 mb-8 z-[2] drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
          Save our date
        </h2>

        <div className="relative w-[min(420px,78vw)] aspect-[4/5] z-[2] grid place-items-center overflow-visible">
          <img
            className="absolute w-full h-auto bottom-0 z-[1]"
            src="/imgs/thiep-thanh-dat-element_0025_9-20251010160529-oa95t.png"
          />

          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[90%] flex items-center justify-center gap-2 z-[4]">
            <figure className="bg-white p-[10px] pb-[20px] rounded-[10px] shadow-[0_12px_30px_rgba(0,0,0,0.12)] w-[60%] rotate-[-12deg] translate-x-[12%] -translate-y-[2%] z-[1] border border-black/5">
              <img
                className="w-full block rounded-[6px]"
                src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141213-20260130071226-l8d26.png"
              />
            </figure>
            <figure className="bg-white p-[10px] pb-[20px] rounded-[10px] shadow-[0_14px_34px_rgba(0,0,0,0.14)] w-[60%] rotate-[6deg] -translate-x-[20%] -translate-y-[10%] mt-[-12%] z-[2] border border-black/5">
              <img
                className="w-full block rounded-[6px]"
                src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141021-20260130071059-jewfu.png"
              />
              <figcaption className="font-playfair text-left mt-2 text-[#6b6b5f] tracking-[2px] text-[14px]">
                25.10.2025
              </figcaption>
            </figure>
          </div>

          <img
            className="absolute w-full bottom-0 object-contain z-[6] translate-1"
            src="/imgs/thiep-thanh-dat-element_0021_13-20251010160528-wcnlv.png"
          />

          <img
            className="absolute w-[min(64px,14vw)] bottom-[18%] left-1/2 -translate-x-1/2 z-[7] drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
            src="/imgs/thiep-thanh-dat-element_0020_14-20251010160528-z-man.png"
          />

          <img
            className="absolute w-[min(150px,30vw)] left-[-10%] bottom-[-8%] z-[6]"
            src="/imgs/thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png"
          />
          <img
            className="absolute w-[min(150px,30vw)] right-[-10%] bottom-[-4%] z-[6]"
            src="/imgs/thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png"
          />
                  <button
            type="button"
            onClick={goNext}
            className="w-8 h-8 rounded-full bg-white/90 border border-black/10 shadow-card text-[#52613e] flex items-center justify-center"
            aria-label="Thumbnail sau"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      <section className="relative rounded-[26px] overflow-hidden shadow-card w-full mx-auto mb-7">
        <img
          className="w-full block"
          src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141318-20260130071408-ftszz.png"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 py-10 bg-gradient-to-t from-black/55 to-transparent text-white text-center">
          <p>All of me loves</p>
          <h3 className="mt-[6px] font-vibes text-[clamp(28px,6vw,40px)]">
            all of you
          </h3>
        </div>
      </section>

      <section className="relative rounded-[26px] overflow-hidden w-full mx-auto mb-7">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="/imgs/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png"
        />
        <div className="relative px-6 py-9 text-center text-[#52613e] grid gap-5">
          <p className="uppercase text-[13px] tracking-[1px]">
            Kính mời tham dự tiệc chung vui của gia đình chúng tôi
          </p>

          <div className="grid grid-cols-2 gap-3.5 text-[13px] max-[720px]:grid-cols-1">
            <div>
              <h4 className="m-0 mb-1.5 uppercase text-[12px]">Nhà trai</h4>
              <p>Ông. Nguyễn Hùng Vương</p>
              <p>Bà. Trần Thị Bích Phương</p>
            </div>
            <div>
              <h4 className="m-0 mb-1.5 uppercase text-[12px]">Nhà gái</h4>
              <p>Ông. Lưu Chí Hiếu</p>
              <p>Bà. Nguyễn Ngọc Ánh</p>
            </div>
          </div>

          <div className="font-vibes text-[clamp(34px,7vw,52px)] flex gap-3 justify-center">
            <span>Thành Đạt</span>
            <span>&</span>
            <span>Minh Hạ</span>
          </div>

          <div className="grid gap-2 text-[13px]">
            <p>17:30, Thứ Bảy</p>
            <div className="flex justify-center gap-4 items-center font-playfair">
              <span className="text-[52px]">25</span>
              <div>
                <p>Tháng 10</p>
                <p>Năm 2025</p>
              </div>
            </div>
            <p>(Tức ngày 05 tháng 09 năm Ất Tỵ)</p>
          </div>

          <div className="grid gap-1.5">
            <p>Tổ chức tại</p>
            <strong>The Opera Wedding & Convention Center</strong>
            <span>Lô 18A Lê Hồng Phong, Kiêu Sơn, Hải An, Hải Phòng</span>
            <button
              type="button"
              className="border border-[#52613e] bg-transparent px-4 py-2 rounded-full text-[#52613e]"
            >
              Chỉ đường
            </button>
          </div>
        </div>
      </section>

      <section className="relative rounded-[26px] overflow-hidden shadow-card w-full mx-auto mb-7">
        <img
          className="w-full block brightness-[0.8]"
          src="/imgs/anh-chup-man-hinh-2026-01-30-luc-141905-20260130071947-jqcxf.png"
        />
        <div className="absolute inset-0 grid place-items-center text-center text-white px-6 py-10">
          <h3>Câu chuyện</h3>
          <p>
            Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử thách
            để cùng nhau bước đến ngày trọng đại – đám cưới của chúng mình.
          </p>
        </div>
      </section>

      <section className="text-center text-[#52613e] w-full mx-auto mb-7">
        <h3>Timeline</h3>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <img
              className="w-16"
              src="/imgs/thiep-thanh-dat-element_0006_28-20251010165559-ejurh.png"
            />
            <p>17:30</p>
            <span>Đón khách</span>
          </div>
          <div>
            <img
              className="w-16"
              src="/imgs/thiep-thanh-dat-element_0005_29-20251010165559-b9jp9.png"
            />
            <p>19:00</p>
            <span>Khai tiệc</span>
          </div>
        </div>
        <div className="mt-3">
          <h4>Dresscode</h4>
          <div className="flex justify-center gap-2.5 mt-2">
            <span className="w-6 h-6 rounded-full bg-[#e6dbc8]" />
            <span className="w-6 h-6 rounded-full bg-[#ccb9a4]" />
          </div>
        </div>
      </section>

      <section className="text-center text-[#52613e] w-full mx-auto mb-7">
        <h3>Countdown</h3>
        <div className="grid grid-cols-4 gap-2.5 mt-4 max-[720px]:grid-cols-2">
          <div>
            <strong className="text-[28px] block">110</strong>
            <span>Ngày</span>
          </div>
          <div>
            <strong className="text-[28px] block">12</strong>
            <span>Giờ</span>
          </div>
          <div>
            <strong className="text-[28px] block">05</strong>
            <span>Phút</span>
          </div>
          <div>
            <strong className="text-[28px] block">06</strong>
            <span>Giây</span>
          </div>
        </div>
      </section>

      <section className="text-center w-full mx-auto mb-7">
        <h3>Gallery</h3>
        <div className="relative mt-4 overflow-hidden rounded-[18px] border border-black/5 shadow-card">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {gallery.map((src, index) => (
              <div key={`${src}-${index}`} className="min-w-full">
                <img
                  className="w-full h-[620px] object-cover max-[720px]:h-[260px]"
                  src={src}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 shadow-card text-[#52613e] flex items-center justify-center"
            aria-label="?nh tr??c"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-black/10 shadow-card text-[#52613e] flex items-center justify-center"
            aria-label="?nh sau"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {gallery.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 rounded-full ${
                index === currentSlide ? 'bg-[#52613e]' : 'bg-[#c9b899]'
              }`}
              aria-label={`Chuy?n t?i ?nh ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 relative">
          <button
            type="button"
            onClick={goThumbPrev}
            className="w-8 h-8 rounded-full bg-white/90 border border-black/10 shadow-card text-[#52613e] flex items-center justify-center z-10"
            aria-label="Thumbnail tr??c"
          >
            <FiChevronLeft />
          </button>
          <div className="flex items-center gap-2">
            {visibleThumbs.map((src, index) => {
              const realIndex = thumbStart + index
              return (
                <button
                  key={`thumb-${src}-${realIndex}`}
                  type="button"
                  onClick={() => setCurrentSlide(realIndex)}
                  className={`inline-flex rounded-[10px] border ${
                    realIndex === currentSlide
                      ? 'border-[#52613e]'
                      : 'border-transparent'
                  }`}
                  aria-label={`Ch?n ?nh ${realIndex + 1}`}
                >
                  <img
                    className="h-16 w-20 object-cover rounded-lg max-[720px]:h-14 max-[720px]:w-16"
                    src={src}
                    alt="Thumbnail ?nh c??i"
                  />
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={goThumbNext}
            className="w-8 h-8 rounded-full bg-white/90 border border-black/10 shadow-card text-[#52613e] flex items-center justify-center z-10"
            aria-label="Thumbnail sau"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      <section className="text-center text-[#52613e] w-full mx-auto mb-7">
        <h3>RSVP</h3>
        <p>
          Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp chu đáo.
        </p>
        <form className="mt-4 grid gap-2.5">
          <input type="text" placeholder="Tên của bạn" />
          <select>
            <option>Bạn sẽ đến chứ?</option>
            <option>Tôi chắc chắn sẽ đến</option>
            <option>Xin lỗi, tôi bận rồi</option>
          </select>
          <select>
            <option>Bạn là khách mời của ai?</option>
            <option>Khách mời Cô Dâu</option>
            <option>Khách mời Chú Rể</option>
          </select>
          <input type="text" placeholder="Số lượng tham dự cùng?" />
          <textarea
            placeholder="Gửi lời nhắn đến cô dâu chú rể"
            rows={4}
          />
          <button type="button" className="bg-[#52613e] text-white border-0 px-4 py-3 rounded-full">
            Gửi lời nhắn & xác nhận
          </button>
        </form>
      </section>

      <section className="text-center text-[#52613e] w-full mx-auto mb-7">
        <h3>Thank you!</h3>
        <p>
          Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là
          món quà ý nghĩa nhất trong ngày trọng đại này.
        </p>
      </section>
    </div>
  )
}

export default InviteContent
