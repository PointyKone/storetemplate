import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '../components/CartContext'
import { NavbarProvider } from '../components/NavbarContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavbarProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </NavbarProvider>
  )
}

export default MyApp
