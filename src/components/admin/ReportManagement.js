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

    // ✅ 유저 정지 API 호출 (`is_active` 변경)
    const handleBanUser = async () => {
        if (!selectedReport || selectedBanDays === null) {
            alert("🚨 정지 기간을 선택해주세요.");
            return;
        }
    
        if (!window.confirm("🚨 해당 유저를 정지하시겠습니까?")) return;
    
        try {
            // ✅ 백엔드에 정지 요청 (DB 업데이트)
            await axios.put(`http://localhost:8080/admin/users/${selectedReport.reportedUserId}/status`);
    
            // ✅ 신고 상태도 '정지됨'으로 업데이트
            await axiosInstance.put(
                `http://localhost:8080/api/userreport/status/${selectedReport.id}`,  
                { status: "정지됨" },  
                { headers: { "Content-Type": "application/json" } }  
            );
    
            // ✅ 프론트엔드에서도 즉시 반영
            setUserReports(prevReports =>
                prevReports.map(report =>
                    report.id === selectedReport.id ? { ...report, status: "정지됨" } : report
                )
            );
    
            setSelectedReport(prev => ({
                ...prev,
                status: "정지됨"
            }));
    
            alert("🚨 유저가 정지되었습니다.");
        } catch (error) {
            console.error("🚨 유저 정지 실패:", error);
            alert("🚨 유저 상태 변경에 실패했습니다.");
        }
    };
    
    
    
    

    // ✅ 신고 기각 (사유 불충분) API 호출
    const handleRejectReport = async () => {
        if (!selectedReport) {
            alert("🚨 먼저 신고 항목을 선택하세요.");
            return;
        }
    
        // ✅ 상태 변경: 사유 불충분이면 정지됨, 정지됨이면 사유 불충분
        let newStatus = selectedReport.status === "사유 불충분" ? "정지됨" : "사유 불충분";
    
        try {
            // ✅ 백엔드에 상태 변경 요청 (DB 업데이트)
            await axiosInstance.put(
                `http://localhost:8080/api/userreport/status/${selectedReport.id}`,  
                { status: newStatus },  
                { headers: { "Content-Type": "application/json" } }  
            );
    
            // ✅ 프론트엔드에서도 즉시 반영
            setUserReports(prevReports =>
                prevReports.map(report =>
                    report.id === selectedReport.id ? { ...report, status: newStatus } : report
                )
            );
    
            setSelectedReport(prev => ({
                ...prev,
                status: newStatus
            }));
    
            alert(`🚨 신고 상태가 '${newStatus}'으로 변경되었습니다.`);
        } catch (error) {
            console.error("🚨 신고 상태 업데이트 오류:", error);
            alert("🚨 상태 변경에 실패했습니다.");
        }
    };
    
    
    

    return (
        <div className="report-management">
            <h2>🚨 신고 관리</h2>

            <div className="report-container">
                {/* ✅ 신고된 사용자 목록 */}
                <div className="report-list">
                    <h3>📋 신고된 사용자 목록</h3>
                    <ul>
                        {userReports.map((report, index) => (
                            <li key={index}
                                className={`report-item 
                                    ${report.status === "신고 접수" ? "pending-report" : ""} 
                                    ${report.status === "사유 불충분" ? "resolved-report" : ""} 
                                    ${report.status.includes("정지") ? "banned-report" : ""} 
                                    ${selectedReport === report ? "selected" : ""}`}
                                onClick={() => selectReport(index)}
                            >
                                <span className="report-user">
                                    {report.reportedUserNickname || "알 수 없음"} 
                                    (신고자: {report.reporterNickname || "알 수 없음"})
                                </span> 
                                <span className="report-date">
                                    (신고일: {new Date(report.reportedAt).toLocaleDateString()})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ✅ 신고 상세 내용 */}
                <div className="report-detail">
                    {selectedReport ? (
                        <>
                            <div className="report-details">
                                <h2>🚨 신고 내용</h2>
                                <p><strong>신고자:</strong> {selectedReport.reporterNickname}</p>
                                <p><strong>사유:</strong> {selectedReport.reason}</p>
                                <p><strong>신고 날짜:</strong> {selectedReport.reportedAt}</p>
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
                            </div>

                            {/* ✅ 유저 정지 & 신고 기각 기능 */}
                            <div className="report-actions">
                                <h3>🚫 유저 정지</h3>
                                
                                {/* ✅ 정지 기간 선택 */}
                                <select 
                                    className="ban-select"
                                    onChange={(e) => setSelectedBanDays(e.target.value !== "" ? parseInt(e.target.value, 10) : null)}
                                >
                                    <option value="">정지 기간 선택</option>
                                    <option value="1">1일 정지</option>
                                    <option value="3">3일 정지</option>
                                    <option value="7">7일 정지</option>
                                    <option value="30">30일 정지</option>
                                    <option value="0">영구 정지</option>
                                </select>

                                {/* ✅ 정지 적용 버튼 */}
                                <button 
                                    className="ban-button"
                                    onClick={handleBanUser}
                                    disabled={selectedBanDays === null}
                                >
                                    정지 적용
                                </button>

                                {/* ✅ 사유 불충분 버튼 */}
                                <button className="reject-button" onClick={handleRejectReport}>
                                    🚨 사유 불충분
                                </button>
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
