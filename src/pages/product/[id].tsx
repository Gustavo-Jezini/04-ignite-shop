import Image from 'next/image'
import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import axios from 'axios'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}
export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <h1 className="text-white"> Loading... </h1>
  }

  async function handleBuyProduct() {
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      // Melhor para direcionar para aplicações externas
      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16 text-white">
      <div className="h-imgHeight flex w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient-to-b from-gradient-from to-gradient-to object-cover p-1">
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl text-gray-300">{product.name}</h1>
        <span className="mt-4 block text-3xl text-green-300">
          {product.price}
        </span>

        <p className="mt-10 text-sm text-gray-300">{product.description}</p>

        <button
          onClick={handleBuyProduct}
          className="mt-auto cursor-pointer rounded-lg border-0 bg-green-500 p-5 font-bold text-white hover:bg-green-300"
        >
          Comprar agora
        </button>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Ol2gE0BuSet0G4' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-Br', {
          currency: 'BRL',
          style: 'currency',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
