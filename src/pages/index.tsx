import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import allabord from '@/assets/allabord.svg'
import beyond from '@/assets/beyond.svg'
import explorer from '@/assets/explorer.svg'
import ignite from '@/assets/ignite.svg'
import maratona from '@/assets/maratona.svg'

const cards = [
  {
    id: 1,
    src: beyond,
  },
  {
    id: 2,
    src: allabord,
  },
  {
    id: 3,
    src: explorer,
  },
  {
    id: 4,
    src: ignite,
  },
  {
    id: 5,
    src: maratona,
  },
]

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <main
      ref={sliderRef}
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-calc "
    >
      {cards.map((card) => (
        <a
          key={card.id}
          className="keen-slider__slide group relative flex cursor-pointer items-center  justify-center overflow-hidden rounded-lg bg-gradient-to-b from-gradient-from to-gradient-to object-cover"
        >
          <Image src={card.src} alt="Camiseta Beyond" />
          <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <strong className="text-xl text-white">Camiseta X</strong>
            <span className="text-2xl font-bold text-green-300">$ 79,90</span>
          </footer>
        </a>
      ))}
    </main>
  )
}
