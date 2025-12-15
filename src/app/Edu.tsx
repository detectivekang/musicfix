// src/app/Edu.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface RepairGalleryProps {
  title: string;
  description: React.ReactNode;
  imageCount: number;
  imageBaseUrl: string;
  onImageClick: (info: {
    index: number;
    count: number;
    baseUrl: string;
    itemTitle: string;
  }) => void;
}

const RepairGallery: React.FC<RepairGalleryProps> = ({
  title,
  description,
  imageCount,
  imageBaseUrl,
  onImageClick,
}) => (
  <div className="card shadow-sm h-100 border-0 mb-4 p-3 bg-white">
    <h5 className="fw-bold mb-3 text-start text-primary">
      {title} ({imageCount}컷)
    </h5>

    <div className="small text-muted text-start border-bottom pb-2 mb-3">
      {description}
    </div>

    <div className="row g-2">
      {Array.from({ length: imageCount }).map((_, index) => (
        <div key={index} className="col-6 col-sm-4 col-md-3">
          <Image
            src={`/images/${imageBaseUrl}_${index + 1}.png`}
            alt={`${title} 사진 ${index + 1}`}
            width={500}
            height={500}
            style={{ objectFit: "cover", width: "100%", cursor: "pointer" }}
            onClick={() =>
              onImageClick({
                index,
                count: imageCount,
                baseUrl: imageBaseUrl,
                itemTitle: title,
              })
            }
          />
        </div>
      ))}
    </div>
  </div>
);

interface LightboxModalProps {
  isOpen: boolean;
  currentImage: {
    index: number;
    count: number;
    baseUrl: string;
    itemTitle: string;
  } | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  currentImage,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !currentImage) return null;

  const { index, count, baseUrl, itemTitle } = currentImage;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-transparent border-0">
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={onClose}
            style={{ zIndex: 1051 }}
          />

          <div
            className="modal-body text-center position-relative p-0"
            style={{ maxHeight: "100vh" }}
          >
            <h4 className="text-white mb-2">
              {itemTitle} ({index + 1} / {count})
            </h4>

            {index > 0 && (
              <button
                className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y ms-3 fs-3"
                onClick={() => onNavigate(-1)}
                style={{ width: "40px", height: "60px", zIndex: 1051 }}
              >
                &lt;
              </button>
            )}

            <Image
              src={`/images/${baseUrl}_${index + 1}.png`}
              alt={`${itemTitle} 사진 ${index + 1}`}
              width={800}
              height={800}
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />

            {index < count - 1 && (
              <button
                className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y me-3 fs-3"
                onClick={() => onNavigate(1)}
                style={{ width: "40px", height: "60px", zIndex: 1051 }}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Edu() {
  const [lightbox, setLightbox] = useState<LightboxModalProps["currentImage"]>(
    null
  );

  const handleImageClick = useCallback((imageInfo: any) => {
    setLightbox(imageInfo);
  }, []);

  const handleClose = useCallback(() => {
    setLightbox(null);
  }, []);

  const handleNavigate = useCallback((direction: number) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const nextIndex = prev.index + direction;
      if (nextIndex < 0 || nextIndex >= prev.count) return prev;
      return { ...prev, index: nextIndex };
    });
  }, []);

  return (
    <section id="edu" className="bg-light py-5">
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <div className="container">
        <h2 className="fw-bold text-center mb-5">색소폰 리페어 교육</h2>

        <div className="row">
          <div className="col-12">
            <RepairGallery
              title="경복대학교(남양주캠퍼스) 색소폰 리페어 과정"
              description={
                <>
                  일본에서 전문적으로 배운 커리큘럼과 현장경험을 바탕으로
                  <br />
                  경복대학교(남양주)에서 색소폰 리페어를 체계적으로 지도하고
                  있습니다.
                  <br />
                  <br />
                  2학기부터는 색소폰 이외의 관악기 리페어도 배울 수 있습니다.
                  <br />
                  <br />
                  <strong>입학문의 : 010-2650-4483</strong>
                  <br />
                  자세한 수업풍경은 유튜브에서 보실 수 있습니다.
                  <br />
                  (관악기전동헌 검색)
                </>
              }
              imageCount={6}
              imageBaseUrl="edu/repair"
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
