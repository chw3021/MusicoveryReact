import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ReportManagement.css";
import axiosInstance from "../../api/axiosInstance";

const ReportManagement = () => {
    const [userReports, setUserReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedBanDays, setSelectedBanDays] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5; // ✅ 한 페이지당 신고 개수

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

    // ✅ 페이지네이션 관련 로직
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = userReports.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(userReports.length / reportsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="report-management">
            <h2>🚨 신고 관리</h2>

            <div className="report-container">
                {/* ✅ 신고된 사용자 목록 */}
                <div className="report-list">
                    <h3>📋 신고된 사용자 목록</h3>
                    <ul>
                        {currentReports.map((report, index) => (
                            <li key={index}
                                className={`report-item 
                                    ${report.status === "신고 접수" ? "pending-report" : ""} 
                                    ${report.status.includes("정지") ? "banned-report" : ""}
                                    ${report.status === "사유 불충분" ? "resolved-report" : ""} 
                                    ${selectedReport === report ? "selected" : ""}`}
                                onClick={() => selectReport(indexOfFirstReport + index)}
                            >
                                <span className="report-user">
                                    {report.reportedUserNickname || "알 수 없음"} (신고자: {report.reporterNickname || "알 수 없음"})
                                </span> 
                                <span className="report-date">(신고일: {new Date(report.reportedAt).toLocaleDateString()})</span>
                            </li>
                        ))}
                    </ul>

                    {/* ✅ 페이지네이션 추가 (항상 표시) */}
                    <div className="pagination-container">
                        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
                            이전
                        </button>
                        <span className="pagination-text">{currentPage} / {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button">
                            다음
                        </button>
                    </div>
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
