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
const gallery = [
  '/images/z7561870183143_b9eab5aec3257f07fa33ca3183443b84.jpg',
  '/images/z7561870185620_0fca0b9e720bdfea9502a91f273e7e31.jpg',
  '/images/z7561870190071_5e6e98404ee3fad9b2cb59f714806a16.jpg',
  '/images/z7561870208113_8bca0d149b2f25a52d515bbf1052796f.jpg',
  '/images/z7561870224812_141706f60582a61d83f792d6ad8b91b0.jpg',
  '/images/z7561885287882_b977f479c3d8145c3729fc060f945426.jpg',
  '/images/z7561885297161_d70cf8646744884ddeab49ac3a1dc342.jpg',
  '/images/z7561885299236_fbebefbc75bff0517fc549ededb8b47d.jpg',
  '/images/z7561885308412_57f6cb806ad140cdd70af5390138ad39.jpg',
  '/images/z7561885316340_48da5993cfa978ab0259a13c8ec8e4a4.jpg',
  '/images/z7561885333059_28defe6f502a375961cd4b3a253e9e1f.jpg',
  '/images/z7561885334313_e94d2df5bd429bb694abe7bbe314d815.jpg',
  '/images/z7561885340175_895ef89a95189dc68e672c4d578676ed.jpg',
  '/images/z7561885349748_0c6d99c4cef74af922b676304a3666bd.jpg',
  '/images/z7561885362838_29025423b9d36bb2ab735490353bf22d.jpg',
  '/images/z7561885365294_0af9a5af5c4421131199639dbb904763.jpg',
  '/images/z7561885373851_f62ee96853f0fbe213040ee544448f22.jpg',
  '/images/z7561885376753_6c3951304d4cbade3e587bae3c08c2ee.jpg',
]

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
        className={`fixed right-4 bottom-4 inline-flex items-center justify-center rounded-full border border-[#e0e0e0] px-4 py-2 text-xl text-[#c0392b] shadow-card ${
          isPlaying ? 'bg-[#fdf0ef]' : 'bg-white/90'
        }`}
        type="button"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
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
