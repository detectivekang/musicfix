"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useSearchParams } from "next/navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    gubun: "",
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const searchParams = useSearchParams();

  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (
      packageParam &&
      ["베이직", "프리미엄", "커스텀"].includes(packageParam)
    ) {
      setFormData((prev) => ({ ...prev, gubun: packageParam }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "unread",
      });

      setSubmitStatus("success");
      setFormData({ gubun: "", name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-light py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">오시는 길 · 연락처</h2>

        <div className="row g-5">
          {/* 왼쪽 지도 */}
          <div className="col-lg-6">
            <div className="ratio ratio-16x9 rounded-4 shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.929273432377!2d126.455350415465!3d36.77040090000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357a5d22784bec1f%3A0xcde5b2e72dca1142!2z6rWt64-E7Jqw7Iqk7J20IO2ctOyynOycoCDslYTrnoDroZwg7YyM7ISk!5e0!3m2!1sko!2skr!4v1720164801234!5m2!1sko!2skr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <ul className="list-unstyled mt-4 lh-lg">
              <li>
                <strong>주소</strong>: 충청남도 서산시 덕지천로 68, 1층 (석남동
                54‑3)
              </li>
              <li>
                <strong>전화</strong>: 010-2650-4483
              </li>
              <li>
                <strong>kakao</strong>: jdhjdh83
              </li>
              <li>
                <strong>이메일</strong>: jdhjdh83@gmail.com
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100080633495147"
                  target="_blank"
                >
                  <img
                    src="/images/icon/facebook_icon.png"
                    width="45"
                    style={{ margin: "5px" }}
                    alt="FaceBook"
                  />
                </a>
                <a href="https://www.youtube.com/@repair4483" target="_blank">
                  <img
                    src="/images/icon/youtube_icon.png"
                    width="45"
                    style={{ margin: "5px" }}
                    alt="YouTube 채널 바로가기"
                  />
                </a>
                <a
                  href="https://www.instagram.com/jd_labo_repair/"
                  target="_blank"
                >
                  <img
                    src="/images/icon/instagram_icon.png"
                    width="50"
                    style={{ margin: "5px" }}
                    alt="YouTube 채널 바로가기"
                  />
                </a>
                <a href="https://blog.naver.com/jdhjdh83" target="_blank">
                  <img
                    src="/images/icon/blog_icon.PNG"
                    width="40"
                    style={{ margin: "5px" }}
                    alt="네이버 블로그 바로가기"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* 오른쪽 폼 */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-4 shadow">
              <div className="mb-3">
                <h3>서비스 안내</h3>
              </div>
              <div className="mb-3">
                목관 금관 장르를 뛰어넘어 수리하고 있습니다.
              </div>
              <div className="mb-3">
                출장 및 강의 등으로 부재중일 경우가 많습니다.
              </div>
              <div className="mb-3">
                <strong>방문전에는 꼭 연락부탁드립니다.</strong>
                <br />
                주차 : 충남 서산시 덕지천로 68 , 1층 매장앞공터
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "none" }}>
            <input
              name="gubun"
              value={formData.gubun}
              onChange={handleChange}
              placeholder="문의 구분"
              className="form-control mb-2"
            />

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              required
              className="form-control mb-2"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
              required
              className="form-control mb-2"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="문의 내용"
              required
              className="form-control mb-3"
            />

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "전송중..." : "문의 보내기"}
            </button>

            {submitStatus === "success" && (
              <p className="text-success mt-3">✅ 문의 접수 완료!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-danger mt-3">
                ❌ 전송 실패. 다시 시도해주세요.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
