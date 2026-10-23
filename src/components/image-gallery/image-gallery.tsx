"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

type ImageGalleryProps = {
  images: string[];
  initialIndex?: number;
  showThumbnails?: boolean;
  showCounter?: boolean;
  className?: string;
};

export function ImageGallery({
  images,
  initialIndex = 0,
  showThumbnails = true,
  showCounter = true,
  className,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const [mainRef, mainApi] = useEmblaCarousel({
    loop: false,
    startIndex: initialIndex,
  });

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!mainApi) return;

    const index = mainApi.selectedScrollSnap();

    setSelectedIndex(index);
    thumbsApi?.scrollTo(index);
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return;

    onSelect();

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = () => {
    mainApi?.scrollPrev();
  };

  const scrollNext = () => {
    mainApi?.scrollNext();
  };

  const scrollTo = (index: number) => {
    mainApi?.scrollTo(index);
  };

  if (!images.length) {
    return (
      <div
        className={cn(
          "relative h-70 w-full overflow-hidden rounded-xl",
          className,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">
            No images available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Main image */}
      <div className="relative">
        <div ref={mainRef} className="overflow-hidden rounded-xl">
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="min-w-0 flex-[0_0_100%]"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-xl border bg-muted">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        {showCounter && (
          <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous */}
        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 size-9 -translate-y-1/2 rounded-full shadow"
              onClick={scrollPrev}
              disabled={selectedIndex === 0}
            >
              <ChevronLeft className="size-5" />
            </Button>

            {/* Next */}
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 size-9 -translate-y-1/2 rounded-full shadow"
              onClick={scrollNext}
              disabled={selectedIndex === images.length - 1}
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div ref={thumbsRef} className="overflow-hidden">
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                  selectedIndex === index
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
