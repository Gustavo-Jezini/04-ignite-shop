import Image from 'next/image'
import { useRouter } from 'next/router'

import Maratona from '@/assets/maratona.svg'

export default function Product() {
  const { query } = useRouter()
  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16 text-white">
      <div className="h-imgHeight flex w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient-to-b from-gradient-from to-gradient-to object-cover p-1">
        <Image src={Maratona} alt="" />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl text-gray-300">Camiseta Maratona</h1>
        <span className="mt-4 block text-3xl text-green-300">99</span>

        <p className="mt-10 text-sm text-gray-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          consequuntur modi obcaecati, repellat doloribus voluptatem ullam! Illo
          cumque provident laudantium perspiciatis obcaecati molestias minima,
          distinctio fuga, nesciunt adipisci, quis aspernatur?
        </p>

        <button className="mt-auto cursor-pointer rounded-lg border-0 bg-green-500 p-5 font-bold text-white hover:bg-green-300">
          Comprar agora
        </button>
      </div>
    </div>
  )
}
