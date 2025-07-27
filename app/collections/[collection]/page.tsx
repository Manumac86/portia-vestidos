import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  getCollection,
  getCollectionProducts,
  getProduct,
} from "@/lib/shopify";
import Link from "next/link";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = await params;
  const collectionData = await getCollection(collection.collection);
  const title = collectionData?.title || "Vestidos de Ensueño";
  const description =
    collectionData?.description ||
    "Para tu día más especial, elegí el vestido que te hace sentir única";

  const products = await getCollectionProducts({
    collection: collection.collection,
  });

  const product = await getProduct(products[0]?.handle || "");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title || "",
    description: product?.description || "",
    image: product?.featuredImage.url || "",
    offers: {
      "@type": "AggregateOffer",
      availability: product?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product?.priceRange.minVariantPrice.currencyCode || "",
      highPrice: product?.priceRange.maxVariantPrice.amount || "",
      lowPrice: product?.priceRange.minVariantPrice.amount || "",
    },
  };

  const [firstProduct, secondProduct, thirdProduct] = products.slice(0, 3);

  return (
    <div
      id="collection"
      className="flex flex-col gap-4 py-20 font-oswald sm:max-w-7xl sm:mx-auto"
    >
      <h1 className="text-4xl font-normal">{title}</h1>
      <p className="text-lg font-light">{description}</p>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link href={`/product/${product.handle}`} key={product.id}>
            <Card
              key={product.id}
              className="w-full h-full p-0 relative hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-0 h-full">
                <img
                  src={product.featuredImage.url || ""}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
                <CardFooter className="p-4 absolute bottom-0 left-0 right-0 flex justify-end">
                  <CardTitle className="text-lg font-light text-secondary-foreground bg-primary/85 px-4 py-2 rounded-full">
                    {product.title}
                  </CardTitle>
                </CardFooter>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
