"use client";
import styles from "./Hero.module.css";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// ===============================
// 타입 정의
// ===============================
interface GalleryImage {
  index: number;
  count: number;
  baseUrl: string;
  itemTitle: string;
}

interface RepairGalleryProps {
  title: string;
  description: string;
  imageCount: number;
  imageBaseUrl: string;
  onImageClick: (imageInfo: GalleryImage) => void;
}

interface LightboxModalProps {
  isOpen: boolean;
  currentImage: GalleryImage | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

// ===============================
// 재사용 가능한 갤러리 컴포넌트
// ===============================
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
    <p className="small text-muted text-start border-bottom pb-2 mb-3">{description}</p>

    <div className="row g-2">
      {Array.from({ length: imageCount }).map((_, index) => (
        <div key={index} className="col-6 col-sm-4 col-md-3">
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
              cursor: "pointer",
            }}
            onClick={() =>
              onImageClick({ index, count: imageCount, baseUrl: imageBaseUrl, itemTitle: title })
            }
          >
            <Image
              src={`/images/${imageBaseUrl}_${index + 1}.png`}
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
// Lightbox 모달
// ===============================
const LightboxModal = ({ isOpen, currentImage, onClose, onNavigate }: LightboxModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
        <div className="modal-content bg-transparent border-0 shadow-lg">
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={onClose}
            style={{ zIndex: 1051 }}
          />

          <div className="modal-body p-0 text-center position-relative">
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

            <div style={{ position: "relative", width: "100%", height: "80vh", margin: "0 auto" }}>
              <Image
                src={`/images/${baseUrl}_${index + 1}.png`}
                alt={`${itemTitle} 사진 ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

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
// Fixing 페이지
// ===============================
export default function Fixing() {
  const [activeTab, setActiveTab] = useState<"woodwind" | "brass">("woodwind");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback((imageInfo: GalleryImage) => setLightbox(imageInfo), []);
  const handleCloseLightbox = useCallback(() => setLightbox(null), []);
  const handleNavigate = useCallback((direction: number) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const newIndex = prev.index + direction;
      if (newIndex >= 0 && newIndex < prev.count) return { ...prev, index: newIndex };
      return prev;
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
        <h2 className="fw-bold text-center mb-5">악기 수리 전문가 서비스</h2>

        {/* 탭 네비게이션 */}
        <ul className="nav nav-pills justify-content-center mb-5" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link fs-5 me-2 ${
                activeTab === "woodwind" ? "active bg-info text-dark" : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("woodwind")}
              type="button"
            >
              🎷 목관악기 수리
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link fs-5 ${
                activeTab === "brass" ? "active bg-warning text-dark" : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("brass")}
              type="button"
            >
              🎺 금관악기 수리
            </button>
          </li>
        </ul>

        {/* 탭 내용 */}
        <div className="tab-content border p-4 rounded bg-light shadow-lg">
          {/* 목관악기 탭 */}
          <div className={`tab-pane fade ${activeTab === "woodwind" ? "show active" : ""}`}>
            <h4 className="fw-bold text-info mb-4 border-bottom pb-2">
              ✅ 목관악기 (색소폰, 클라리넷) 상세 수리 내역
            </h4>

            <div className="row g-4">
              <div className="col-12">
                <RepairGallery
                  title="섹소폰의 오버홀"
                  description="전체 분해 세척, 연주 테스트까지 완료"
                  imageCount={8}
                  imageBaseUrl="woodwind/overhaul"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="키컵 수평 작업"
                  description="틀어진 키컵 평평하게 작업"
                  imageCount={2}
                  imageBaseUrl="woodwind/key_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="패드클리닝"
                  description="전체분해 세척 작업 시 패드도 클리닝"
                  imageCount={2}
                  imageBaseUrl="woodwind/cleaning_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="불량 패드교체"
                  description="불량인 패드를 교체합니다."
                  imageCount={3}
                  imageBaseUrl="woodwind/changing_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="덴트 작업"
                  description="낙상사고 등 덴트 최소화 작업"
                  imageCount={2}
                  imageBaseUrl="woodwind/cleaning_dent"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="클라리넷 오버홀 및 크랙 수리"
                  description="전체 분해 세척 및 크랙 수리 진행"
                  imageCount={6}
                  imageBaseUrl="woodwind/clarinet"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="땜 작업 (용접)"
                  description="납, 은, 동땜으로 부품 복원"
                  imageCount={4}
                  imageBaseUrl="woodwind/soldering"
                  onImageClick={handleImageClick}
                />
              </div>
            </div>
          </div>

          {/* 금관악기 탭 */}
          <div className={`tab-pane fade ${activeTab === "brass" ? "show active" : ""}`}>
            <h4 className="fw-bold text-warning mb-4 border-bottom pb-2">
              ✅ 금관악기 (트럼펫, 튜바 등) 상세 수리 내역
            </h4>

            <div className="row g-4">
              <div className="col-12">
                <RepairGallery
                  title="트럼펫 분해세척 광택작업"
                  description="전체 분해 세척, 녹 제거, 광택"
                  imageCount={3}
                  imageBaseUrl="brass/trumpet_cleaning"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="로터리 분해 세척 및 녹 제거"
                  description="완전 분해 후 녹 제거"
                  imageCount={2}
                  imageBaseUrl="brass/rotary_cleaning"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="튜바 슬라이드 세척 및 녹 제거"
                  description="부드러운 움직임 위해 세척 및 녹 제거"
                  imageCount={2}
                  imageBaseUrl="brass/tuba_slide"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="col-12">
                <RepairGallery
                  title="용접 작업 및 땜 복원"
                  description="부품 맞게 납, 은, 동 사용"
                  imageCount={6}
                  imageBaseUrl="brass/soldering"
                  onImageClick={handleImageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
