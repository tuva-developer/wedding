import type { MouseEvent } from 'react'

type StartCardProps = {
  phase: string
  onOpen?: () => void
  onSealClick?: (event: MouseEvent<HTMLImageElement>) => void
  paperTexture: string
  envelopeImg: string
  flowerTopLeft: string
  flowerBottomRight: string
  waxSeal: string
}

const StartCard = ({
  phase,
  onOpen,
  onSealClick,
  paperTexture,
  envelopeImg,
  flowerTopLeft,
  flowerBottomRight,
  waxSeal,
}: StartCardProps) => {
  const isOpening = phase === 'opening'
  return (
    <button
      className={`relative w-full max-h-[calc(100vh-32px)] border-0 bg-transparent p-0 cursor-pointer transition duration-[550ms] ease ${isOpening ? 'opacity-0 scale-[0.96] -translate-y-[6px] pointer-events-none' : ''}`}
      type="button"
    >
      <img
        className="w-full h-full max-h-[calc(100vh-32px)] block rounded-[26px] shadow-card object-contain"
        src={paperTexture}
        alt=""
      />

      <div className="absolute inset-0 grid place-items-center gap-[18px] px-[24px] pt-[42px] pb-[32px] text-center max-[720px]:px-[18px] max-[720px]:pt-[34px] max-[720px]:pb-[26px]">

        {/* Lời mời + tên đôi uyên ương */}
        <div className="grid gap-3">
          <p className="m-0 uppercase tracking-[3px] text-[11px] text-black/50">
            Trân trọng kính mời
          </p>
          <div>
            <p className="font-vibes text-[clamp(30px,5vw,42px)] leading-[1.1] text-[#111]">
              Kiều Anh
            </p>
            <div className="flex items-center justify-center gap-2 my-1">
              <div className="h-px w-10 bg-[#c0392b]/30" />
              <span className="text-[#c0392b] text-xs">♥</span>
              <div className="h-px w-10 bg-[#c0392b]/30" />
            </div>
            <p className="font-vibes text-[clamp(30px,5vw,42px)] leading-[1.1] text-[#111]">
              Văn Mẫn
            </p>
          </div>
        </div>

        {/* Phong bì */}
        <div className="relative w-[min(360px,70vw)] aspect-[4/3] grid place-items-center">
          <img
            className="w-full h-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
            src={envelopeImg}
            alt="Phong bì"
          />
          <img
            onClick={(event) => {
              event.stopPropagation()
              onSealClick?.(event)
              onOpen?.()
            }}
            className={`absolute w-[min(64px,14vw)] bottom-[16%] left-1/2 -translate-x-1/2 drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 ${isOpening ? 'animate-sealPop' : 'animate-[sealPulse_1.4s_ease-in-out_infinite]'}`}
            src={waxSeal}
            alt="Con dấu"
          />
          <img
            className="absolute w-[min(140px,26vw)] top-[-10%] left-[-8%] opacity-60"
            src={flowerTopLeft}
            alt=""
          />
          <img
            className="absolute w-[min(140px,26vw)] bottom-[-44%] right-[-16%] opacity-60"
            src={flowerBottomRight}
            alt=""
          />
        </div>

        {/* Ngày cưới */}
        <div>
          <p className="font-playfair text-[clamp(20px,3.2vw,28px)] tracking-[2px] text-[#c0392b]">
            27.03.2026
          </p>
          <p className="text-[11px] tracking-[2px] text-black/45 mt-1">
            10:30 · Thứ Sáu · Ấp 6B
          </p>
        </div>

      </div>
    </button>
  )
}

export default StartCard
