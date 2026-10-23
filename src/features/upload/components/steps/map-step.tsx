"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type YandexMap = {
  destroy: () => void;
};

declare const ymaps: {
  ready: (callback: () => void) => void;

  Map: new (
    element: HTMLElement,
    options: {
      center: [number, number];
      zoom: number;
      controls?: string[];
    },
  ) => YandexMap;
};

export default function MapStep() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMap | null>(null);

  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    if (!apiLoaded || !mapRef.current) return;

    ymaps.ready(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new ymaps.Map(mapRef.current, {
        center: [41.2995, 69.2401],
        zoom: 12,
        controls: ["zoomControl"],
      });

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current?.destroy();
      mapInstanceRef.current = null;
      setApiLoaded(false);
    };
  }, [apiLoaded]);

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=en_US`}
        strategy="afterInteractive"
        onLoad={() => setApiLoaded(true)}
      />

      <div ref={mapRef} className="h-120 w-full overflow-hidden rounded-xl" />
    </>
  );
}
