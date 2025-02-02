import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>ThriveTeach - Learn and Grow</title>
        <meta
          name="description"
          content="ThriveTeach is your platform for high-quality online courses. Learn from expert instructors and join a supportive community of learners."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://thriveteach.com" />
        <meta property="og:site_name" content="ThriveTeach" />
        <meta property="og:title" content="ThriveTeach - Learn and Grow" />
        <meta
          property="og:description"
          content="Your platform for high-quality online courses"
        />
      </Head>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
} 