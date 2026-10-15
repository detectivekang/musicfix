"use client";

import { useState, useCallback } from "react";
import { RepairGallery, LightboxModal, GalleryImage } from "@/components/Gallery";

export default function Fixing() {
  const [activeTab, setActiveTab] = useState<"woodwind" | "brass">("woodwind");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback(
    (imageInfo: GalleryImage) => setLightbox(imageInfo),
    [],
  );
  const handleCloseLightbox = useCallback(() => setLightbox(null), []);
  const handleNavigate = useCallback((direction: number) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const newIndex = prev.index + direction;
      if (newIndex >= 0 && newIndex < prev.count)
        return { ...prev, index: newIndex };
      return prev;
    });
  }, []);

  return (
    <section id="fixing-service" className="section">
      <LightboxModal
        isOpen={!!lightbox}
        currentImage={lightbox}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
      />

      <div className="wrap">
        <h2 className="section-title">악기 수리 전문가 서비스</h2>

        {/* 탭 네비게이션 */}
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={activeTab === "woodwind"} className={activeTab === "woodwind" ? "tab on" : "tab"} onClick={() => setActiveTab("woodwind")} type="button">목관악기 수리</button>
          <button role="tab" aria-selected={activeTab === "brass"} className={activeTab === "brass" ? "tab on" : "tab"} onClick={() => setActiveTab("brass")} type="button">금관악기 수리</button>
        </div>

        {/* 탭 내용 */}
        <div className="panel">
          {/* 목관악기 탭 */}
          <div
            hidden={activeTab !== "woodwind"}
          >
            <h4 className="panel-title">
              목관악기 (색소폰, 클라리넷) 상세 수리 내역
            </h4>

            <div className="stack">
              <div className="block">
                <RepairGallery
                  title="색소폰의 오버홀"
                  description={
                    <>
                      세척 ,바디수평, 키수평 , 키유격제거 ,패드 콜크 펠트 교체,
                      넥테넌조정 정밀세팅등
                      <br />
                      색소폰전공자가 연주 테스트까지 완료
                    </>
                  }
                  imageCount={9}
                  imageBaseUrl="woodwind/overhaul"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="키컵 수평 작업"
                  description="틀어진 키컵 평평하게 작업"
                  imageCount={2}
                  imageBaseUrl="woodwind/key_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="패드 클리닝"
                  description="전체분해 세척 작업시 패드클리닝을 통해 패드의 수명을 연장"
                  imageCount={2}
                  imageBaseUrl="woodwind/cleaning_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="불량 패드교체"
                  description="부분적으로 수리할경우 불량인 패드는 교체합니다."
                  imageCount={6}
                  imageBaseUrl="woodwind/changing_pad"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="덴트 작업"
                  description="낙상사고 등으로 인한 덴트작업"
                  imageCount={2}
                  imageBaseUrl="woodwind/cleaning_dent"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="클라리넷 오버홀 및 크랙 수리"
                  description="전체분해세척 , 키광택작업, 톤홀수정 , 패드 콜크전체교체 , 크랙수리등"
                  imageCount={5}
                  imageBaseUrl="woodwind/clarinet"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="땜 작업 (용접)"
                  description="용접부위에 맞게 납,은,동땜으로 작업"
                  imageCount={5}
                  imageBaseUrl="woodwind/soldering"
                  onImageClick={handleImageClick}
                />
              </div>
            </div>
          </div>

          {/* 금관악기 탭 */}
          <div
            hidden={activeTab !== "brass"}
          >
            <h4 className="panel-title">
              금관악기 (트럼펫, 튜바 등) 상세 수리 내역
            </h4>

            <div className="stack">
              <div className="block">
                <RepairGallery
                  title="트럼펫 분해세척 광택작업"
                  description="전체 분해 세척, 녹 제거, 광택"
                  imageCount={5}
                  imageBaseUrl="brass/trumpet_cleaning"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="로터리 분해 세척 및 녹 제거"
                  description="완전 분해 후 녹 제거"
                  imageCount={2}
                  imageBaseUrl="brass/rotary_cleaning"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="튜바 슬라이드 세척 및 녹 제거"
                  description="부드러운 움직임 위해 세척 및 녹 제거"
                  imageCount={8}
                  imageBaseUrl="brass/tuba_slide"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="용접 작업 및 땜 복원"
                  description="부품 맞게 납, 은, 동 사용"
                  imageCount={6}
                  imageBaseUrl="brass/soldering"
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="block">
                <RepairGallery
                  title="트럼본 세척 슬라이드조정"
                  description="트럼본의 전체분해 세척 및 슬라이드 수평작업"
                  imageCount={2}
                  imageBaseUrl="brass/trombone"
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
