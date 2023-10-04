import '../styles/global.css'

import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import LogoImage from '@/assets/logo.svg'
import Image from 'next/image'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${roboto.className} flex min-h-screen flex-col items-start justify-center`}
    >
      <header className="mx-auto w-full max-w-[1180px] px-8">
        <Image src={LogoImage} alt="" />
      </header>
      <Component {...pageProps} />
    </div>
  )
}
