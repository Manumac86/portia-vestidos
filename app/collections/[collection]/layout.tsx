import { getCollection } from "@/lib/shopify";
import Footer from "components/layout/footer";
import Hero from "components/layout/hero/hero";
import Image from "next/image";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ collection: string }>;
  children: React.ReactNode;
}) {
  const collection = await params;
  const collectionData = await getCollection(collection.collection);
  const title = collectionData?.title || "Vestidos de Ensueño";
  const description =
    collectionData?.description ||
    "Para tu día más especial, elegí el vestido que te hace sentir única";
  return (
    <div id="top" className="h-screen">
      <Image
        src="/assets/novias.jpg"
        alt="Portia Vestidos"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />
      <div className="w-full relative">
        <Hero
          title={title}
          description={description}
          links={[
            {
              label: "Ver Colección",
              href: `/collections/${collection.collection}#collection`,
            },
          ]}
        />
        <div className="mx-8 max-w-7xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
