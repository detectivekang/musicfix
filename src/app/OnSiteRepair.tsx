// src/app/OnSiteRepair.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  index: number;
  count: number;
  baseUrl: string;
  itemTitle: string;
}

interface RepairGalleryProps {
  title: string;
  description: React.ReactNode;
  imageCount: number;
  imageBaseUrl: string;
  onImageClick: (imageInfo: GalleryImage) => void;
}

// ===============================
// 재사용 가능한 갤러리 컴포넌트
// ===============================
// === OnSiteRepair 쪽 RepairGallery 수정 ===
const RepairGallery = ({
  title,
  description,
  imageCount,
  imageBaseUrl,
  onImageClick,
}: RepairGalleryProps) => (
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
          {/* 정사각형 비율 + 반응형 */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%", /* 1:1 비율 유지 */
              cursor: "pointer",
            }}
            onClick={() =>
              onImageClick({
                index,
                count: imageCount,
                baseUrl: imageBaseUrl,
                itemTitle: title,
              })
            }
          >
            <Image
              src={`/musicfix/images/${imageBaseUrl}_${index + 1}.png`}
              alt={`${title} 사진 ${index + 1}`}
              fill
              style={{ objectFit: "cover", borderRadius: "0.25rem" }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ===============================
// 라이트박스 모달
// ===============================
interface LightboxModalProps {
  isOpen: boolean;
  currentImage: GalleryImage | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

const LightboxModal = ({
  isOpen,
  currentImage,
  onClose,
  onNavigate,
}: LightboxModalProps) => {
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
      style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-transparent border-0">
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={onClose}
            style={{ zIndex: 1051 }}
          />

          <div className="modal-body text-center position-relative p-0">
            <h4 className="text-white mb-2">
              {itemTitle} ({index + 1} / {count})
            </h4>

            {/* 이전 버튼 */}
            {index > 0 && (
              <button
                className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y ms-3 fs-3"
                onClick={() => onNavigate(-1)}
                style={{ width: "40px", height: "60px", zIndex: 1051 }}
              >
                &lt;
              </button>
            )}

            {/* 이미지 컨테이너 */}
            <div style={{ position: "relative", width: "100%", height: "80vh", margin: "0 auto" }}>
              <Image
                src={`/musicfix/images/${baseUrl}_${index + 1}.png`}
                alt={`${itemTitle} 사진 ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* 다음 버튼 */}
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

// ===============================
// OnSiteRepair 페이지
// ===============================
export default function OnSiteRepair() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback(
    (imageInfo: GalleryImage) => {
      setLightbox(imageInfo);
    },
    []
  );

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
    <section id="onSiteRepair" className="bg-light py-5">
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <div className="container">
        <h2 className="fw-bold text-center mb-5">출장 방문 수리</h2>

        <div className="row">
          <div className="col-12">
            <RepairGallery
              title="출장 방문 수리"
              description={
                <>
                  학교 관악부 , 색소폰동호회 및 학원 , 군악대 등에 직접방문하여 수리하고 있습니다. 
                  <br />
                  전문가가 직접찾아가고 목관악기 와 금관악기 모두 수리가 가능하며 
                  <br />
                  오랜출장수리 경험을 바탕으로 신속하고 편리한 방문수리를 약속드립니다.
                  <br />
                  <br />
                  <strong>출장수리 문의 010-2650-4483</strong>
                </>
              }
              imageCount={7}
              imageBaseUrl="onSiteRepair/on_site_repair"
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
