import { useEffect, useRef, useState } from 'react'
import { FiMusic, FiVolumeX } from 'react-icons/fi'
import StartCard from './components/StartCard'
import InviteContent from './components/InviteContent'

const paperTexture =
  '/imgs/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png'
const envelopeImg =
  '/imgs/thiep-thanh-dat-element_0031_3-20251010171938-1el86.png'
const flowerTopLeft =
  '/imgs/thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png'
const flowerBottomRight =
  '/imgs/thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png'
const waxSeal =
  '/imgs/thiep-thanh-dat-element_0020_14-20251010160528-z-man.png'
const baseGallery = [
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141503-20260130071514-cjwvh.png',
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141905-20260130071947-jqcxf.png',
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141318-20260130071408-ftszz.png',
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141724-20260130071739-yjtom.png',
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141213-20260130071226-l8d26.png',
  '/imgs/anh-chup-man-hinh-2026-01-30-luc-141021-20260130071059-jewfu.png'
]
const gallery = [...baseGallery, ...baseGallery, ...baseGallery]

export default function App() {
  const [phase, setPhase] = useState('closed')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (phase !== 'opening') return
    const timer = setTimeout(() => setPhase('opened'), 520)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    const audio = new Audio('/audio/bai103.mp3')
    audio.loop = true
    audioRef.current = audio

    return () => {
      audio.pause()
    }
  }, [])

  const handleSealClick = (event) => {
    event.stopPropagation()
    if (hasStartedRef.current) return
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => {
        hasStartedRef.current = true
        setIsPlaying(true)
      })
      .catch(() => {})
  }

  return (
    <main
      className={`min-h-screen grid px-4 ${
        phase === 'opened'
          ? 'pt-4 pb-8 place-items-start justify-items-center'
          : 'py-4 place-items-center'
      }`}
    >
      <section
        className="relative grid place-items-center w-[min(720px,94vw)]"
        aria-label="Thiệp cưới"
      >
        {phase !== 'opened' && (
          <StartCard
            phase={phase}
            onOpen={() => setPhase('opening')}
            onSealClick={handleSealClick}
            paperTexture={paperTexture}
            envelopeImg={envelopeImg}
            flowerTopLeft={flowerTopLeft}
            flowerBottomRight={flowerBottomRight}
            waxSeal={waxSeal}
          />
        )}

        {phase !== 'closed' && <InviteContent phase={phase} gallery={gallery} />}
      </section>

      <button
        className={`fixed right-4 bottom-4 inline-flex items-center justify-center rounded-full border border-[#e9e6df] px-4 py-2 text-xl text-[#52613e] shadow-card ${
          isPlaying ? 'bg-[#f6f0e5]' : 'bg-white/90'
        }`}
        type="button"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'T?t nh?c' : 'B?t nh?c'}
        title={isPlaying ? 'T?t nh?c' : 'B?t nh?c'}
        onClick={() => {
          const audio = audioRef.current
          if (!audio) return
          if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
          } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => {})
          }
        }}
      >
        {isPlaying ? <FiVolumeX /> : <FiMusic />}
      </button>
    </main>
  )
}
