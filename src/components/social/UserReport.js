import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/UserReport.css";
import Header from "../common/Header";

const UserReport = () => {
    const [reports, setReports] = useState([]);
    const [reportedUserId, setReportedUserId] = useState("");
    const [reportReason, setReportReason] = useState("");
    const [customReason, setCustomReason] = useState(""); // 자유 입력을 위한 상태

    // 신고 내역 가져오기
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get("/api/userreport/reports/1"); // 임시 userId (테스트용)
            setReports(response.data);
        } catch (error) {
            console.error("신고 내역을 불러오는 중 오류 발생:", error);
        }
    };

    // 신고 제출하기
    const handleReportSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/userreport/report", {
                reporterId: 1, // 임시 reporterId (테스트용)
                reportedUserId,
                reason: reportReason === "직접입력" ? customReason : reportReason // 직접입력일 때만 customReason 사용
            });
            alert("신고가 접수되었습니다.");
            setReportedUserId("");
            setReportReason("");
            setCustomReason(""); // 제출 후 자유 입력 필드 초기화
            fetchReports(); // 신고 후 리스트 업데이트
        } catch (error) {
            console.error("신고 중 오류 발생:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="user-report-container">
                <h2>신고하기</h2>
                <form onSubmit={handleReportSubmit}>
                    <input
                        type="text"
                        placeholder="신고할 사용자 ID"
                        value={reportedUserId}
                        onChange={(e) => setReportedUserId(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        list="reportReasonsList"
                        placeholder="신고 사유를 입력하세요"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        required
                    />
                    <datalist id="reportReasonsList">
                        <option value="스팸" />
                        <option value="욕설 및 부적절한 내용" />
                        <option value="괴롭힘" />
                        <option value="사기" />
                        <option value="직접입력" /> {/* '직접입력' 옵션 추가 */}
                    </datalist>

                    {/* 자유 입력 필드 */}
                    {reportReason === "직접입력" && (
                        <>
                            <label htmlFor="customReason">기타 사유 (자유 입력)</label>
                            <textarea
                                id="customReason"
                                placeholder="자유롭게 신고 사유를 입력하세요."
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                rows="4" // 텍스트 영역의 높이
                            />
                        </>
                    )}

                    <button type="submit">신고 제출</button>
                </form>

                <h2>신고 내역</h2>
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <strong>신고된 사용자:</strong> {report.reportedUserId} | 
                            <strong> 사유:</strong> {report.reason}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserReport;
