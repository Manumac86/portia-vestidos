"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { Media } from "lib/shopify/types";
import Image from "next/image";

type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  altText: string;
  videoUrl?: string;
  previewImage?: string;
};

export function Gallery({
  images,
  media,
}: {
  images: { src: string; altText: string }[];
  media: Media[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();

  // Combine images and media into a single gallery items array
  const galleryItems: GalleryItem[] = [
    // Add images first
    ...images.map((image, index) => ({
      id: `image-${index}`,
      type: "image" as const,
      src: image.src,
      altText: image.altText,
    })),
    // Add media items (videos, etc.)
    ...(media
      .filter((item) => {
        // Only include videos for now, you can expand this for other media types
        if (
          item.mediaContentType === "VIDEO" &&
          item.sources &&
          item.sources.length > 0
        ) {
          return true;
        }
        // Include media images that aren't already in the images array
        if (item.mediaContentType === "IMAGE" && item.image) {
          return !images.some((img) => img.src === item.image?.url);
        }
        return false;
      })
      .map((item, index) => {
        if (item.mediaContentType === "VIDEO" && item.sources) {
          const videoSource =
            item.sources.find(
              (source) =>
                source.format === "mp4" || source.mimeType === "video/mp4"
            ) || item.sources[0];

          return {
            id: item.id,
            type: "video" as const,
            src: item.previewImage?.url || "",
            altText: item.alt || "Product video",
            videoUrl: videoSource?.url,
            previewImage: item.previewImage?.url,
          };
        }

        if (item.mediaContentType === "IMAGE" && item.image) {
          return {
            id: item.id,
            type: "image" as const,
            src: item.image.url,
            altText: item.image.altText || item.alt || "Product image",
          };
        }

        return null;
      })
      .filter(Boolean) as GalleryItem[]),
  ];

  const imageIndex = state.image ? parseInt(state.image) : 0;
  const currentItem = galleryItems[imageIndex];

  const nextImageIndex =
    imageIndex + 1 < galleryItems.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? galleryItems.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {currentItem && (
          <>
            {currentItem.type === "video" && currentItem.videoUrl ? (
              <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                muted
                loop
                poster={currentItem.previewImage}
              >
                <source src={currentItem.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={currentItem.altText}
                src={currentItem.src}
                priority={true}
              />
            )}
          </>
        )}

        {galleryItems.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product media"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product media"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {galleryItems.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {galleryItems.map((item, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={item.id} className="h-20 w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label={`Select product ${item.type}`}
                  className="h-full w-full relative"
                >
                  <GridTileImage
                    alt={item.altText}
                    src={
                      item.type === "video"
                        ? item.previewImage || item.src
                        : item.src
                    }
                    width={80}
                    height={80}
                    active={isActive}
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                      <div className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-4 border-l-black border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
                      </div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
