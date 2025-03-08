import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import "../../styles/AdminSupport.css"; // ✅ CSS 적용

export default function AdminSupport() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [filter, setFilter] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/customersupport/inquiriesAll", {
        params: { page: 0, size: 10, responded: filter },
      });
      setInquiries(res.data.content);
    } catch (error) {
      console.error("문의 목록 불러오기 실패:", error);
    }
  };

  const handleRespond = async (inquiryId) => {
    try {
      await axios.post(
        `http://localhost:8080/customersupport/respond/${inquiryId}`,
        { response: responseText },  // JSON 형식으로 변경
        { headers: { "Content-Type": "application/json" } } // 헤더 추가
      );
  
      setResponseText("");
      fetchInquiries();
      setSelectedInquiry(null);
      setIsOpen(false);
    } catch (error) {
      console.error("응답 등록 실패:", error);
    }
  };  

  return (
    <div className="admin-support">
      <h1 className="title">📞 고객 지원 관리</h1>

      {/* ✅ 필터 버튼 */}
      <div className="support-controls">
        <button onClick={() => setFilter(null)} className="all-btn">전체</button>
        <button onClick={() => setFilter(false)} className="pending-btn">미답변</button>
        <button onClick={() => setFilter(true)} className="resolved-btn">답변 완료</button>
      </div>

      {/* ✅ 문의 리스트 테이블 */}
      <div className="support-table-wrapper">
        <table className="support-table">
          <thead>
            <tr>
              <th>문의 내용</th>
              <th>상태</th>
              <th>응답</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="question-cell">{inquiry.question}</td>
                  <td className={inquiry.respondedAt ? "status-answered" : "status-pending"}>
                    {inquiry.respondedAt ? "✅ 답변 완료" : "❌ 미답변"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        setTimeout(() => setIsOpen(true), 50);
                      }}
                      className="view-btn"
                    >
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="loading-text">문의 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ 모달 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="modal" onClose={() => setIsOpen(false)}>
          <div className="modal-content">
            <Dialog.Title className="modal-title">문의 상세</Dialog.Title>
            <p className="modal-text">{selectedInquiry?.question || "데이터 로딩 중..."}</p>
            {selectedInquiry?.respondedAt ? (
              <p className="text-green-500">✅ 이미 답변 완료</p>
            ) : (
              <>
                <textarea
                  name="responseText"
                  className="response-textarea"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="답변을 입력하세요"
                />
                <button onClick={() => handleRespond(selectedInquiry.id)} className="submit-btn">
                  답변 등록
                </button>
              </>
            )}
            <button onClick={() => setIsOpen(false)} className="close-btn">닫기</button>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
