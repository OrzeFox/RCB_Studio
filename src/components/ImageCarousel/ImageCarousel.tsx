import { useEffect, useRef, useState } from 'react';
import styles from './ImageCarousel.module.css';

export interface ImageItem {
  src: string;
  title: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  className?: string;
  speedPxPerSecond?: number; // velocidad de auto-scroll en px/seg
  onItemClick?: (index: number, item: ImageItem) => void;
}

const ImageCarousel = ({
  images,
  className = '',
  speedPxPerSecond = 60,
  onItemClick,
}: ImageCarouselProps) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll continuo
  useEffect(() => {
    if (images.length === 0) return;

    const step = (ts: number) => {
      if (lastTsRef.current == null) {
        lastTsRef.current = ts;
      }
      const dt = (ts - lastTsRef.current) / 1000; // segundos
      lastTsRef.current = ts;

      if (!isDragging) {
        const trackEl = trackRef.current;
        const cycleWidth = trackEl ? trackEl.scrollWidth / 2 : 0; // mitad porque duplicamos imágenes
        if (cycleWidth > 0) {
          setOffsetX((prev) => {
            let next = prev - speedPxPerSecond * dt;
            // Loop continuo
            if (next <= -cycleWidth) next += cycleWidth;
            return next;
          });
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [images.length, isDragging, speedPxPerSecond]);

  // Gestos de arrastre (mouse/touch)
  const onPointerDown = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startOffsetRef.current = offsetX;
  };

  const onPointerMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startXRef.current;
    setOffsetX(startOffsetRef.current + delta);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Normalizar offset dentro del ciclo para evitar drift
    const trackEl = trackRef.current;
    const cycleWidth = trackEl ? trackEl.scrollWidth / 2 : 0;
    if (cycleWidth > 0) {
      setOffsetX((prev) => {
        let next = prev;
        while (next <= -cycleWidth) next += cycleWidth;
        while (next >= 0) next -= cycleWidth;
        return next;
      });
    }
  };

  if (images.length === 0) {
    return <div className={`${styles.emptyState} ${className}`}></div>;
  }

  // Duplicamos las imágenes para permitir loop continuo
  const loopImages = [...images, ...images];

  return (
    <div
      className={`${styles.carouselContainer} ${className}`}
      onMouseDown={(e) => onPointerDown(e.clientX)}
      onMouseMove={(e) => onPointerMove(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
      onTouchEnd={endDrag}
    >
      <div
        ref={trackRef}
        className={styles.imagesTrack}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {loopImages.map((item, idx) => {
          const realIndex = idx % images.length;
          return (
            <div key={`${idx}-${item.src}`} className={styles.imageSlide}>
              <button
                type='button'
                className={styles.slideButton}
                onClick={() => onItemClick?.(realIndex, images[realIndex])}
              >
                <div className={styles.slideImageArea}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className={styles.carouselImage}
                    draggable={false}
                  />
                </div>
                <div className={styles.slideTitleBar}>
                  <span className={styles.slideTitleText}>{item.title}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
