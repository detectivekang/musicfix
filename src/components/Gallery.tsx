"use client";

import { ReactNode, useEffect } from "react";
import Image from "next/image";

export interface GalleryImage {
  index: number;
  count: number;
  baseUrl: string;
  itemTitle: string;
}

interface RepairGalleryProps {
  title: string;
  description: ReactNode;
  imageCount: number;
  imageBaseUrl: string;
  onImageClick: (imageInfo: GalleryImage) => void;
}

export const RepairGallery = ({ title, description, imageCount, imageBaseUrl, onImageClick }: RepairGalleryProps) => (
  <article className="gallery">
    <header className="gallery-head">
      <h3>{title}</h3>
      <span className="count">사진 {imageCount}장</span>
    </header>
    <div className="gallery-desc">{description}</div>
    <div className="thumbs">
      {Array.from({ length: imageCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          className="thumb"
          aria-label={`${title} 사진 ${index + 1} 크게 보기`}
          onClick={() => onImageClick({ index, count: imageCount, baseUrl: imageBaseUrl, itemTitle: title })}
        >
          <Image src={`/images/${imageBaseUrl}_${index + 1}.jpg`} alt={`${title} 사진 ${index + 1}`} fill sizes="(max-width:600px) 50vw, 200px" style={{ objectFit: "cover" }} />
        </button>
      ))}
    </div>
  </article>
);

interface LightboxModalProps {
  isOpen: boolean;
  currentImage: GalleryImage | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

export const LightboxModal = ({ isOpen, currentImage, onClose, onNavigate }: LightboxModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;
  const { index, count, baseUrl, itemTitle } = currentImage;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={itemTitle} onClick={onClose}>
      <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
        <span>{itemTitle} · {index + 1} / {count}</span>
        <button type="button" onClick={onClose} aria-label="닫기">닫기</button>
      </div>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        {index > 0 && <button type="button" className="lb-nav prev" onClick={() => onNavigate(-1)} aria-label="이전 사진">‹</button>}
        <Image src={`/images/${baseUrl}_${index + 1}.jpg`} alt={`${itemTitle} 사진 ${index + 1}`} fill sizes="100vw" style={{ objectFit: "contain" }} />
        {index < count - 1 && <button type="button" className="lb-nav next" onClick={() => onNavigate(1)} aria-label="다음 사진">›</button>}
      </div>
    </div>
  );
};
