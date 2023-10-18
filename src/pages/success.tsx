import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  costumerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ costumerName, product }: SuccessProps) {
  return (
    <div className="mx-auto flex h-[656px] flex-col items-center justify-center">
      <h1 className="text-3xl text-gray-100">Compra efetuada!</h1>
      <div className="mt-16 flex h-[145px] w-full max-w-[130px] items-center justify-center rounded-lg bg-gradient-to-b from-gradient-from to-gradient-to p-1">
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </div>

      <p className="mt-8 max-w-[560px] text-center text-xl text-gray-300">
        Uhuul <strong>{costumerName}</strong>, sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link
        className="mt-20 block cursor-pointer text-2xl font-bold text-green-500 hover:text-green-300"
        href="/"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
