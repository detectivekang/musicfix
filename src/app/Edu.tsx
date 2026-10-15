"use client";

import { useState, useCallback } from "react";
import { RepairGallery, LightboxModal, GalleryImage } from "@/components/Gallery";

export default function Edu() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback((imageInfo: GalleryImage) => {
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
    <section id="edu" className="section alt">
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <div className="wrap">
        <h2 className="section-title">색소폰 리페어 교육</h2>

        <div className="stack">
          <div className="block">
            <RepairGallery
              title="경복대학교(남양주캠퍼스) 색소폰 리페어 과정"
              description={
                <>
                  <strong>2026년 9월 30일 개강!!!</strong>
                  <br />
                  일본 유명 리페어학교의 커리큘럼 과 현장경험을 바탕으로
                  <br />
                  경복대학교(남양주)에서 색소폰 리페어를 체계적으로 지도하고
                  있습니다.
                  <br />
                  1학기- 분해 조립, 악기구조이해 ,밸런스조정 ,패드 콜크
                  펠트교체방법,스프링교체,키오프닝조절 등
                  <br />
                  2학기- 납땜작업 ,덴트 ,색소폰의 오버홀
                  ,그외관악기리페어(희망자에 한함)
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
