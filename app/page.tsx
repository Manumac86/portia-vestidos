import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-bonanova-sc">Portia Vestidos</h1>
        <p className="text-lg font-bonanova-sc">
          Portia is a high-performance ecommerce store built with Next.js,
          Vercel, and Shopify.
        </p>
      </div>
      <Carousel />
      <Footer />
    </>
  );
}
