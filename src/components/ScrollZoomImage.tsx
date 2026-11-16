import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  zoomRange?: [number, number];
}

export default function ScrollZoomImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[16/10]',
  priority = false,
  zoomRange = [1.0, 1.16],
}: ScrollZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this specific image container relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smoothly zoom the image inside its bounds as user scrolls past it
  const scale = useTransform(scrollYProgress, [0, 1], zoomRange);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-900 ${aspectClassName} ${className}`}
    >
      <motion.img
        style={{ scale }}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover will-change-transform select-none"
      />
    </div>
  );
}

