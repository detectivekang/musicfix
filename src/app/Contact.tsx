"use client";

import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSearchParams } from 'next/navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    gubun: '',
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const searchParams = useSearchParams();

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam && ['베이직', '프리미엄', '커스텀'].includes(packageParam)) {
      setFormData(prev => ({ ...prev, gubun: packageParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'unread',
      });

      setSubmitStatus('success');
      setFormData({ gubun: '', name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
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
                src="https://www.google.com/maps/embed?pb=!1m18..."
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-4 shadow">
              <h3 className="mb-3">문의하기</h3>

              <form onSubmit={handleSubmit}>
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
                  {isSubmitting ? '전송중...' : '문의 보내기'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-success mt-3">✅ 문의 접수 완료!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-danger mt-3">❌ 전송 실패. 다시 시도해주세요.</p>
                )}
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
