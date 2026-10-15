"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

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
    <section id="contact" className="section alt">
      <div className="wrap">
        <h2 className="section-title">오시는 길 · 연락처</h2>
        <div className="contact-grid">
          <div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.929273432377!2d126.455350415465!3d36.77040090000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357a5d22784bec1f%3A0xcde5b2e72dca1142!2z6rWt64-E7Jqw7Iqk7J20IO2ctOyynOycoCDslYTrnoDroZwg7YyM7ISk!5e0!3m2!1sko!2skr!4v1720164801234!5m2!1sko!2skr"
                title="제이디라보 위치 지도"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <dl className="info">
              <div><dt>주소</dt><dd>충청남도 서산시 덕지천로 68, 1층 (석남동 54‑3)</dd></div>
              <div><dt>전화</dt><dd><a href="tel:010-2650-4483">010-2650-4483</a></dd></div>
              <div><dt>kakao</dt><dd>jdhjdh83</dd></div>
              <div><dt>이메일</dt><dd><a href="mailto:jdhjdh83@gmail.com">jdhjdh83@gmail.com</a></dd></div>
            </dl>
            <div className="sns">
              <a href="https://www.facebook.com/profile.php?id=100080633495147" target="_blank" rel="noreferrer"><img src="/images/icon/facebook_icon.png" alt="FaceBook" /></a>
              <a href="https://www.youtube.com/@repair4483" target="_blank" rel="noreferrer"><img src="/images/icon/youtube_icon.png" alt="YouTube 채널 바로가기" /></a>
              <a href="https://www.instagram.com/jd_labo_repair/" target="_blank" rel="noreferrer"><img src="/images/icon/instagram_icon.png" alt="인스타그램 바로가기" /></a>
              <a href="https://blog.naver.com/jdhjdh83" target="_blank" rel="noreferrer"><img src="/images/icon/blog_icon.PNG" alt="네이버 블로그 바로가기" /></a>
            </div>
          </div>
          <aside className="notice">
            <h3>서비스 안내</h3>
            <p>목관 금관 장르를 뛰어넘어 수리하고 있습니다.</p>
            <p>출장 및 강의 등으로 부재중일 경우가 많습니다.</p>
            <p><strong>방문전에는 꼭 연락부탁드립니다.</strong><br />주차 : 충남 서산시 덕지천로 68 , 1층 매장앞공터</p>
          </aside>
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
