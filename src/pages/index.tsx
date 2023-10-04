import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Stripe from 'stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
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
      {products.map((product) => (
        <a
          key={product.id}
          className="keen-slider__slide group relative flex cursor-pointer items-center  justify-center overflow-hidden rounded-lg bg-gradient-to-b from-gradient-from to-gradient-to object-cover"
        >
          <Image src={product.imageUrl} width={520} height={480} alt="" />
          <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <strong className="text-xl text-white">{product.name}</strong>
            <span className="text-2xl font-bold text-green-300">
              {product.price}
            </span>
          </footer>
        </a>
      ))}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
    }
  })
  console.log(products)

  return {
    props: {
      products,
    },
  }
}
