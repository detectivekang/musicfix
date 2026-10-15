"use client";

import { useState, useCallback } from "react";
import { RepairGallery, LightboxModal, GalleryImage } from "@/components/Gallery";

export default function OnSiteRepair() {
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
    <section id="onSiteRepair" className="section alt">
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <div className="wrap">
        <h2 className="section-title">출장 방문 수리</h2>

        <div className="stack">
          <div className="block">
            <RepairGallery
              title="출장 방문 수리"
              description={
                <>
                  학교 관악부 , 색소폰동호회 및 학원 , 군악대 등에 직접방문하여
                  수리하고 있습니다.
                  <br />
                  전문가가 직접찾아가고 목관악기 와 금관악기 모두 수리가
                  가능하며
                  <br />
                  오랜출장수리 경험을 바탕으로 신속하고 편리한 방문수리를
                  약속드립니다.
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
