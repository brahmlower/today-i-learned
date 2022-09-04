import '../styles/globals.css'
import 'highlight.js/styles/a11y-dark.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
