// components/Fixing.tsx
"use client";

import styles from "./Hero.module.css";
import { useState, useCallback, useEffect } from "react";

// ===============================
// 재사용 가능한 갤러리 컴포넌트
// ===============================
const RepairGallery = ({
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

    <p className="small text-muted text-start border-bottom pb-2 mb-3">
      {description}
    </p>

    <div className="row g-2">
      {Array.from({ length: imageCount }).map((_, index) => (
        <div key={index} className="col-6 col-sm-4 col-md-3">
          <img
            src={`/images/${imageBaseUrl}_${index + 1}.png`}
            alt={`${title} 사진 ${index + 1}`}
            className="img-fluid rounded border shadow-sm"
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
              width: "100%",
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
          />
        </div>
      ))}
    </div>
  </div>
);

// ===============================
// 라이트박스 모달 (Hook 규칙 준수)
// ===============================
const LightboxModal = ({ isOpen, currentImage, onClose, onNavigate }) => {
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
  const currentSrc = `/images/${baseUrl}_${index + 1}.png`;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-transparent border-0 shadow-lg">
          {/* 닫기 */}
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={onClose}
            style={{ zIndex: 1051 }}
          />

          <div
            className="modal-body p-0 text-center position-relative"
            style={{ overflow: "auto", maxHeight: "100vh" }}
          >
            <h4 className="text-white mb-2">
              {itemTitle} ({index + 1} / {count})
            </h4>

            {/* 이전 */}
            {index > 0 && (
              <button
                className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y ms-3 fs-3"
                onClick={() => onNavigate(-1)}
                style={{ width: "40px", height: "60px" }}
              >
                &lt;
              </button>
            )}

            <img
              src={currentSrc}
              alt={`${itemTitle} ${index + 1}`}
              style={{
                transform: "scale(2)",
                transformOrigin: "center",
                margin: "60px auto",
                display: "block",
              }}
            />

            {/* 다음 */}
            {index < count - 1 && (
              <button
                className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y me-3 fs-3"
                onClick={() => onNavigate(1)}
                style={{ width: "40px", height: "60px" }}
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
// Fixing 페이지
// ===============================
export default function Fixing() {
  const [activeTab, setActiveTab] = useState<"woodwind" | "brass">("woodwind");
  const [lightbox, setLightbox] = useState(null);

  const handleImageClick = useCallback((imageInfo) => {
    setLightbox(imageInfo);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const handleNavigate = useCallback((direction) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const newIndex = prev.index + direction;
      if (newIndex < 0 || newIndex >= prev.count) return prev;
      return { ...prev, index: newIndex };
    });
  }, []);

  return (
    <section id="fixing-service" className={`py-5 ${styles.fixingSection}`}>
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
      />

      <div className="container">
        <h2 className="fw-bold text-center mb-5">
          악기 수리 전문가 서비스
        </h2>

        {/* 탭 */}
        <ul className="nav nav-pills justify-content-center mb-5">
          <li className="nav-item">
            <button
              className={`nav-link fs-5 me-2 ${
                activeTab === "woodwind"
                  ? "active bg-info text-dark"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("woodwind")}
            >
              🎷 목관악기 수리
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fs-5 ${
                activeTab === "brass"
                  ? "active bg-warning text-dark"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("brass")}
            >
              🎺 금관악기 수리
            </button>
          </li>
        </ul>

        {/* 탭 내용 (기존 그대로) */}
        {/* 👉 이하 RepairGallery 부분은 수정 안 해도 빌드 통과 */}
      </div>
    </section>
  );
}
