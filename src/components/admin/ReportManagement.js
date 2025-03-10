import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ReportManagement.css";
import axiosInstance from "../../api/axiosInstance";

const ReportManagement = () => {
    const [userReports, setUserReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedBanDays, setSelectedBanDays] = useState(null);

    // ✅ 신고된 사용자 목록 가져오기
    useEffect(() => {
        axiosInstance.get("http://localhost:8080/api/userreport/reportsAll")
            .then(response => {
                console.log("🚀 신고 목록 데이터:", response.data);
                setUserReports(response.data);
            })
            .catch(error => {
                console.error("Error fetching user reports:", error);
            });
    }, []);

    // ✅ 특정 신고 선택 시 데이터 업데이트
    const selectReport = (index) => {
        const report = userReports[index];
        console.log("✅ 선택된 신고 데이터:", report);
        if (!report) {
            console.error("🚨 오류: 선택된 신고 데이터가 없습니다!");
            return;
        }
        setSelectedReport(report);
    };

    // ✅ 유저 정지 API 호출
    const handleBanUser = async () => {
        if (!selectedReport || selectedBanDays === null) {
            alert("🚨 정지 기간을 선택해주세요.");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/admin/reports/${selectedReport.id}/ban?days=${selectedBanDays}`);
            alert(`유저가 ${selectedBanDays === 0 ? "영구 정지" : `${selectedBanDays}일 정지`}되었습니다.`);
            window.location.reload();
        } catch (error) {
            console.error("유저 정지 실패:", error);
        }
    };

    // ✅ 신고 기각 (사유 불충분) API 호출
    const handleRejectReport = async () => {
        if (!selectedReport) {
            alert("🚨 먼저 신고 항목을 선택하세요.");
            return;
        }
    
        try {
            await axiosInstance.put(
                `http://localhost:8080/api/userreport/status/${selectedReport.id}`,  // ✅ URL 수정 (쿼리 스트링 제거)
                { status: "사유 불충분" },  // ✅ JSON 객체로 데이터 전달
                { headers: { "Content-Type": "application/json" } }  // ✅ 헤더 추가 (JSON 요청 명시)
            );
    
            alert("🚨 신고가 '사유 불충분' 상태로 변경되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("신고 상태 업데이트 오류:", error);
            console.log("🔍 신고 상태 변경 요청 데이터:", {
                reportId: selectedReport.id,
                status: "사유 불충분"
            });
        }
    };
    

    return (
        <div className="report-management">
            <h2>관리자 대시보드</h2>

            <div className="report-container">
                {/* ✅ 신고된 사용자 목록 */}
                <div className="report-list">
                    <h3>📋 신고된 사용자 목록</h3>
                    <ul>
                        {userReports.map((report, index) => (
                            <li key={index}
                                className={`report-item 
                                    ${report.status === "신고 접수" ? "pending-report" : ""} 
                                    ${report.status === "사유 불충분" || report.status.includes("정지") ? "resolved-report" : ""} 
                                    ${selectedReport === report ? "selected" : ""}`}
                                onClick={() => selectReport(index)}
                            >
                                {/* 🚀 피신고자 닉네임 + 신고자 닉네임 추가 */}
                                <span className="report-user">
                                    {report.reportedUserNickname  || "알 수 없음"} (신고자: {report.reporterNickname || "알 수 없음"})
                                </span> 
                                <span className="report-date">(신고일: {new Date(report.reportedAt).toLocaleDateString()})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ✅ 신고 상세 내용 */}
                <div className="report-detail">
                    {selectedReport ? (
                        <>
                            <h3>신고 내용</h3>
                            <p><strong>신고자:</strong> {selectedReport.reporterNickname || "알 수 없음"}</p>
                            <p><strong>사유:</strong> {selectedReport.reason}</p>
                            <p><strong>신고 날짜:</strong> {new Date(selectedReport.reportedAt).toLocaleString()}</p>
                            <p><strong>상태:</strong> {selectedReport.status}</p>

                            {/* ✅ 신고된 게시글 표시 */}
                            {selectedReport.postTitle ? (
                                <div className="report-post-info">
                                    <h3>📌 신고된 게시글</h3>
                                    <p><strong>제목:</strong> {selectedReport.postTitle || "제목 없음"}</p>
                                    <p><strong>내용:</strong> {selectedReport.postDescription || "내용 없음"}</p>
                                </div>
                            ) : (
                                <p>🚨 신고된 게시글 정보가 없습니다.</p>
                            )}

                            {/* ✅ 유저 정지 & 신고 기각 기능 */}
                            <div className="report-actions">
                                <h3>🚫 유저 정지</h3>
                                <select 
                                    onChange={(e) => setSelectedBanDays(e.target.value !== "" ? parseInt(e.target.value, 10) : null)}
                                >
                                    <option value="">정지 기간 선택</option>
                                    <option value="1">1일 정지</option>
                                    <option value="3">3일 정지</option>
                                    <option value="7">7일 정지</option>
                                    <option value="30">30일 정지</option>
                                    <option value="0">영구 정지</option>
                                </select>
                                <button 
                                    onClick={handleBanUser}
                                    disabled={selectedBanDays === null}
                                >
                                    정지 적용
                                </button>
                                <button className="reject-button" onClick={handleRejectReport}>🚨 사유 불충분</button>
                            </div>

                        </>
                    ) : (
                        <p>신고된 사용자를 선택해주세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportManagement;
