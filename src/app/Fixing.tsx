// components/Fixing.tsx
"use client";
import styles from "./Hero.module.css";
import { useState, useCallback, useEffect } from 'react';

// === 재사용 가능한 갤러리/항목 컴포넌트 (변경 없음) ===
const RepairGallery = ({ title, description, imageCount, imageBaseUrl, onImageClick }) => (
    <div className="card shadow-sm h-100 border-0 mb-4 p-3 bg-white">
        <h5 className="fw-bold mb-3 text-start text-primary">{title} ({imageCount}컷)</h5>
        <p className="small text-muted text-start border-bottom pb-2 mb-3">{description}</p>
        
        {/* 사진 레이아웃: 데스크톱 4개, 태블릿 3개, 모바일 2개 (반응형) */}
        <div className="row g-2">
            {Array.from({ length: imageCount }).map((_, index) => (
                <div key={index} className="col-6 col-sm-4 col-md-3"> 
                    <img 
                        src={`/images/${imageBaseUrl}_${index + 1}.png`} 
                        alt={`${title} 사진 ${index + 1}`} 
                        className="img-fluid rounded border shadow-sm cursor-pointer"
                        style={{ aspectRatio: '1/1', objectFit: 'cover', width: '100%', cursor: 'pointer' }}
                        onClick={() => onImageClick({ 
                            index: index, 
                            count: imageCount, 
                            baseUrl: imageBaseUrl, 
                            itemTitle: title 
                        })}
                    />
                </div>
            ))}
        </div>
    </div>
);
// ===========================================


// === Lightbox 모달 컴포넌트 (수정됨) ===
const LightboxModal = ({ isOpen, currentImage, onClose, onNavigate }) => {
    
    if (!isOpen || !currentImage) return null;

    const { index, count, baseUrl, itemTitle } = currentImage;
    const currentSrc = `/images/${baseUrl}_${index + 1}.png`;

    // ESC 키로 모달 닫기 (변경 없음)
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);


    return (
        // 모달 배경: 검은색 투명 (rgba(0, 0, 0, 0.9))으로 직접 설정
        <div 
            className="modal d-block" 
            tabIndex="-1" 
            role="dialog" 
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                zIndex: 1050, 
                overflowY: 'auto' 
            }}
        >
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                
                {/* modal-content 배경을 투명(bg-transparent)하게 유지하여 파란색 오버레이 제거 */}
                <div className="modal-content bg-transparent border-0 shadow-lg">
                    
                    {/* 닫기 버튼 */}
                    <button 
                        type="button" 
                        // 버튼 색상을 흰색(Light)으로 유지하여 어두운 배경에서 잘 보이도록 함
                        className="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
                        aria-label="Close"
                        onClick={onClose}
                        style={{ zIndex: 1051 }}
                    ></button>

                    <div className="modal-body p-0 text-center position-relative">
                        {/* 캡션 글자색을 흰색으로 유지 */}
                        <h4 className="text-white mb-2">{itemTitle} ({index + 1} / {count})</h4>

                        {/* 이전 버튼 */}
                        {index > 0 && (
                            <button 
                                className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y ms-3 fs-3" 
                                onClick={() => onNavigate(-1)}
                                style={{ zIndex: 1051, width: '40px', height: '60px' }}
                            >
                                &lt;
                            </button>
                        )}
                        
                        {/* 이미지: 이미지가 흐려지는 현상을 막기 위해 추가적인 스타일 조정은 하지 않음. */}
                        <img 
                            src={currentSrc} 
                            className="img-fluid rounded" 
                            alt={`${itemTitle} ${index + 1}`} 
                            style={{ maxHeight: '90vh', width: 'auto' }}
                        />

                        {/* 다음 버튼 */}
                        {index < count - 1 && (
                            <button 
                                className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y me-3 fs-3" 
                                onClick={() => onNavigate(1)}
                                style={{ zIndex: 1051, width: '40px', height: '60px' }}
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* 모달 배경을 재차 정의하지 않고, 최상위 div의 배경색만 사용하도록 `modal-backdrop`을 제거했습니다. */}
        </div>
    );
};
// ===========================================


export default function Fixing() {
    const [activeTab, setActiveTab] = useState('woodwind'); 
    const [lightbox, setLightbox] = useState(null); 

    const handleImageClick = useCallback((imageInfo) => {
        setLightbox(imageInfo);
    }, []);

    const handleCloseLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const handleNavigate = useCallback((direction) => {
        setLightbox(prev => {
            if (!prev) return null;
            const newIndex = prev.index + direction;
            if (newIndex >= 0 && newIndex < prev.count) {
                return { ...prev, index: newIndex };
            }
            return prev;
        });
    }, []);

    const handleContact = (instrumentType) => {
        console.log(`${instrumentType} 수리 문의 요청`);
    };

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
                            className={`nav-link fs-5 me-2 ${activeTab === 'woodwind' ? 'active bg-info text-dark' : 'btn-outline-secondary'}`} 
                            onClick={() => setActiveTab('woodwind')} 
                            type="button"
                        >
                            🎷 목관악기 수리
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link fs-5 ${activeTab === 'brass' ? 'active bg-warning text-dark' : 'btn-outline-secondary'}`} 
                            onClick={() => setActiveTab('brass')} 
                            type="button"
                        >
                            🎺 금관악기 수리
                        </button>
                    </li>
                </ul>

                {/* 탭 내용 */}
                <div className="tab-content border p-4 rounded bg-light shadow-lg">
                    
                    {/* === 1. 목관악기 탭 내용 === */}
                    <div className={`tab-pane fade ${activeTab === 'woodwind' ? 'show active' : ''}`}>
                        <h4 className="fw-bold text-info mb-4 border-bottom pb-2">✅ 목관악기 (색소폰, 클라리넷) 상세 수리 내역</h4>

                        <div className="row g-4">
                            
                            {/* 섹소폰의 오버홀 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="섹소폰의 오버홀"
                                    description="전체 분해 세척을 포함하며, 연주자 출신의 노하우로 실제 연주 테스트까지 마친 악기를 고객님께 전달합니다."
                                    imageCount={8} 
                                    imageBaseUrl="woodwind/overhaul"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            
                            {/* 키컵 수평 작업 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="키컵 수평 작업"
                                    description="틀어진 키컵은 최대한 평평하게 작업을 해줍니다."
                                    imageCount={2} 
                                    imageBaseUrl="woodwind/key_pad"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            {/* 패드클리닝 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="패드클리닝"
                                    description="전체분해 세척작업의 경우 패드도 같이 클리닝하여 수명을 늘려줍니다."
                                    imageCount={2} 
                                    imageBaseUrl="woodwind/cleaning_pad"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            {/* 불량 패드교체 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="불량 패드교체"
                                    description="불량인 패드를 교체합니다."
                                    imageCount={3} 
                                    imageBaseUrl="woodwind/changing_pad"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            {/* 덴트 작업 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="덴트 작업"
                                    description="낙상사고등으로 인한 덴트를 최대한 티안나게 작업하고 있습니다."
                                    imageCount={2} 
                                    imageBaseUrl="woodwind/cleaning_dent"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            {/* 클라리넷의 오버홀 및 크랙 수리 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="클라리넷의 오버홀 및 크랙 수리"
                                    description="클라리넷의 오버홀 및 전체 분해 세척, 크랙(갈라짐) 수리를 진행합니다."
                                    imageCount={6} 
                                    imageBaseUrl="woodwind/clarinet"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            
                            {/* 땜 작업 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="땜 작업 (용접)"
                                    description="용접이 떨어진 부품은 부위에 맞게 납, 은, 동땜을 합니다."
                                    imageCount={4} 
                                    imageBaseUrl="woodwind/soldering"
                                    onImageClick={handleImageClick}
                                />
                            </div>

                            {/* <div className="col-12 text-center mt-4">
                                <button 
                                    onClick={() => handleContact('목관악기')}
                                    className="btn btn-info btn-lg fw-bold w-50 shadow-sm"
                                >
                                    목관악기 수리 견적 문의하기 🎷
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* === 2. 금관악기 탭 내용 === */}
                    <div className={`tab-pane fade ${activeTab === 'brass' ? 'show active' : ''}`}>
                        <h4 className="fw-bold text-warning mb-4 border-bottom pb-2">✅ 금관악기 (트럼펫, 튜바 등) 상세 수리 내역</h4>

                        <div className="row g-4">
                            
                            {/* 트럼펫 분해세척 광택작업 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="트럼펫 분해세척 광택작업"
                                    description="트럼펫, 트럼본, 호른, 튜바 등의 금관악기는 전체 분해 세척, 녹 제거, 광택작업을 주로 합니다."
                                    imageCount={3} 
                                    imageBaseUrl="brass/trumpet_cleaning"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            
                            {/* 로터리 분해 세척 및 녹 제거 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="로터리 분해 세척 및 녹 제거"
                                    description="트럼펫, 트럼본, 호른, 튜바 등의 금관악기 로터리를 완전 분해하여 세척하고 녹을 제거합니다."
                                    imageCount={2} 
                                    imageBaseUrl="brass/rotary_cleaning"
                                    onImageClick={handleImageClick}
                                />
                            </div>

                            {/* 튜바 슬라이드 세척 및 녹 제거 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="튜바 슬라이드 세척 및 녹 제거"
                                    description="튜바 슬라이드의 마찰을 줄이고 부드러운 움직임을 위해 세척 및 녹 제거를 합니다."
                                    imageCount={2} 
                                    imageBaseUrl="brass/tuba_slide"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            
                            {/* 용접 작업 및 땜 복원 */}
                            <div className="col-12">
                                <RepairGallery 
                                    title="용접 작업 및 땜 복원"
                                    description="땜이 떨어진 부품은 용접 부위에 맞게 납, 은, 동을 사용하여 견고하게 땜을 합니다."
                                    imageCount={6} 
                                    imageBaseUrl="brass/soldering"
                                    onImageClick={handleImageClick}
                                />
                            </div>
                            
                            {/* <div className="col-12 text-center mt-4">
                                <button 
                                    onClick={() => handleContact('금관악기')}
                                    className="btn btn-warning btn-lg fw-bold w-50 shadow-sm"
                                >
                                    금관악기 수리 견적 문의하기 🎺
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}