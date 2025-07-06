import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Bona_Nova_SC } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { launchedSiteFlag } from "./flags/flags";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

const bonanovaSC = Bona_Nova_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bonanova-sc",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();
  const shouldInjectToolbar = process.env.NODE_ENV === "development";
  const isLaunched = await launchedSiteFlag();

  return (
    <html lang="en" className={`${bonanovaSC.variable} ${GeistSans.variable}`}>
      <body className="bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
        {isLaunched ? (
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main>
              {/* <div
                className={`absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 transition-opacity duration-1000 -z-10`}
              /> */}
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
          </CartProvider>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen text-white">
            <h1 className="text-4xl font-bold font-bonanova-sc drop-shadow-lg">
              PORTIA VESTIDOS
            </h1>
            <h3 className="text-2xl font-bold font-bonanova-sc drop-shadow-md">
              Se viene algo muy bonito!
            </h3>
            <p className="text-lg font-bonanova-sc drop-shadow-md">
              Estamos desarrollando el sitio, pronto estará disponible
            </p>
          </div>
        )}
        {shouldInjectToolbar && <VercelToolbar />}
        <SpeedInsights />
      </body>
    </html>
  );
}
