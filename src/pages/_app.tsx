import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../components/CartContext";
import { NavbarProvider } from "../components/NavbarContext";
import { AppRouter } from "../server/route/app.router";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson"

import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NavbarProvider>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </NavbarProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      links,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': 1
          };
        }
        return{}
      },
      transformer: superjson
    };
  },
  ssr: false,
})(MyApp);
