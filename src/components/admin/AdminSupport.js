import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import "../../styles/AdminSupport.css";

export default function AdminSupport() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [filter, setFilter] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ 문의 목록 불러오기 함수 (외부에서 사용 가능하게 설정)
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

  // ✅ 처음 마운트될 때 & 필터 변경될 때 실행
  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  // ✅ 답변 등록
  const handleRespond = async (inquiryId) => {
    try {
      await axios.post(
        `http://localhost:8080/customersupport/respond/${inquiryId}`,
        { response: responseText },
        { headers: { "Content-Type": "application/json" } }
      );

      setResponseText("");
      setIsOpen(false);
      setSelectedInquiry(null);
      fetchInquiries(); // ✅ 문의 목록 새로고침
    } catch (error) {
      console.error("응답 등록 실패:", error);
    }
  };

  return (
    <div className="admin-support">
      <h1 className="title">📞 고객 지원 관리</h1>

      {/* ✅ 필터 버튼 */}
      <div className="support-controls">
        {["전체", "미답변", "답변 완료"].map((label, idx) => (
          <button 
            key={idx} 
            onClick={() => setFilter(idx === 0 ? null : idx === 1 ? false : true)} 
            className={idx === 0 ? "all-btn" : idx === 1 ? "pending-btn" : "resolved-btn"}
          >
            {label}
          </button>
        ))}
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
                        setIsOpen(true);
                      }}
                      className="view-btn"
                    >
                      답변 등록
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
