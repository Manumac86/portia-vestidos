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
    <div id="top">
      <div className="w-full relative">
        <Image
          src={`/assets/${collection.collection}.png`}
          alt="Portia Vestidos"
          width={1280}
          height={720}
          className="absolute -top-[85px] left-0 w-full h-[calc(100vh+5px)] object-cover z-[-1]"
        />
        <Hero
          title={title}
          description={description}
          links={[
            {
              label: "Ver Colección",
              href: `/collections/${collection.collection}#collection`,
            },
          ]}
          alignment="center"
        />
        <div className="mx-8 max-w-7xl sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
