import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/ReportManagement.css";

const ReportManagement = () => {
    const [userReports, setUserReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

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

    const selectReport = (index) => {
        const report = userReports[index];
        console.log("✅ 선택된 신고 데이터:", report);
        if (!report) {
            console.error("🚨 오류: 선택된 신고 데이터가 없습니다!");
            return;
        }
        setSelectedReport(report);
    };

    const handleUpdateStatus = async (newStatus) => {
        if (!selectedReport) {
            alert("🚨 신고된 사용자를 선택해주세요.");
            return;
        }

        if (!window.confirm(`🚨 해당 유저의 상태를 '${newStatus}'로 변경하시겠습니까?`)) return;

        try {
            await axiosInstance.put(
                `http://localhost:8080/api/userreport/status/${selectedReport.id}`,  
                { status: newStatus },  
                { headers: { "Content-Type": "application/json" } }  
            );

            setUserReports(prevReports =>
                prevReports.map(report =>
                    report.id === selectedReport.id ? { ...report, status: newStatus } : report
                )
            );

            setSelectedReport(prev => ({
                ...prev,
                status: newStatus
            }));

            alert(`🚨 유저 상태가 '${newStatus}'로 변경되었습니다.`);
        } catch (error) {
            console.error("🚨 유저 상태 변경 실패:", error);
            alert("🚨 유저 상태 변경에 실패했습니다.");
        }
    };

    return (
        <div className="report-management">
            <h2>🚨 신고 관리</h2>

            <div className="report-container">
                <div className="report-list">
                    <h3>📋 신고된 사용자 목록</h3>
                    <ul>
                        {userReports.map((report, index) => (
                            <li key={index}
                                className={`report-item 
                                    ${report.status === "신고 접수" ? "pending-report" : ""} 
                                    ${report.status === "사유 불충분" ? "resolved-report" : ""} 
                                    ${report.status.includes("정지") ? "banned-report" : ""} 
                                    ${selectedReport?.id === report.id ? "selected" : ""}`}
                                onClick={() => selectReport(index)}
                            >
                                <span className="report-user">
                                    {report.reportedUserNickname || "알 수 없음"} 
                                    (신고자: {report.reporterNickname || "알 수 없음"})
                                </span> 
                                <span className="report-date">
                                    (신고일: {new Date(report.reportedAt).toLocaleDateString()} )
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="report-detail">
                    {selectedReport ? (
                        <>
                            <div className="report-details">
                                <h2>🚨 신고 내용</h2>
                                <p><strong>신고자:</strong> {selectedReport.reporterNickname}</p>
                                <p><strong>신고 대상:</strong> {selectedReport.reportedUserNickname}</p>
                                <p><strong>사유:</strong> {selectedReport.reason}</p>
                                <p><strong>신고 날짜:</strong> {new Date(selectedReport.reportedAt).toLocaleString()}</p>
                                <p><strong>상태:</strong> {selectedReport.status}</p>
                            </div>

                            {/* ✅ 신고된 게시글 표시 */}
                            {selectedReport.postTitle ? (
                                <div className="post-info">
                                    <h3>📌 신고된 게시글</h3>
                                    <p><strong>제목:</strong> {selectedReport.postTitle || "제목 없음"}</p>
                                    <p><strong>내용:</strong> {selectedReport.postDescription || "내용 없음"}</p>
                                </div>
                            ) : (
                                <p>🚨 신고된 게시글 정보가 없습니다.</p>
                            )}

                            <div className="report-actions">
                                <button className="ban-button" onClick={() => handleUpdateStatus("정지됨")}>🚫 유저 정지</button>
                                <button className="unban-button" onClick={() => handleUpdateStatus("정지 해제")}>✅ 정지 해제</button>
                                <button className="insufficient-reason-button" onClick={() => handleUpdateStatus("사유 불충분")}>❌ 사유 불충분</button>
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
