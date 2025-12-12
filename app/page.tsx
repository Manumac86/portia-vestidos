import { Carousel } from "components/carousel";
import Footer from "components/layout/footer";
import Hero from "components/layout/hero/hero";

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
      <video
        src="/assets/portia-bg-video.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-screen h-screen object-cover z-[-1]"
      />
      <Hero
        title="Vestidos de Ensueño"
        description="En el corazón de la Patagonia, donde las montañas abrazan tus sueños"
        links={[
          {
            label: "Ver Colección",
            href: "/collections/novias",
          },
          {
            label: "Agendar Cita",
            href: "/contact",
          },
        ]}
      />
      <Carousel />
      <Footer />
    </>
  );
}
