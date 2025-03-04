import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ReportManagement.css";

const ReportManagement = () => {
    const [userReports, setUserReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    // 신고된 사용자 목록 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/api/userreport/reports")
            .then(response => {
                console.log("🚀 신고 목록 데이터:", response.data);
                setUserReports(response.data);
            })
            .catch(error => {
                console.error("Error fetching user reports:", error);
            });
    }, []);

    // 특정 신고 클릭 시 상세 내용 업데이트
    const selectReport = (index) => {
        const report = userReports[index];
        console.log("✅ 선택된 신고 데이터:", report);
        setSelectedReport(report);
    };

    return (
        <div className="report-management">
            <h2>관리자 대시보드</h2>

            <div className="report-container">
                {/* ✅ 신고된 사용자 목록 (버튼으로 클릭 가능) */}
                <div className="report-list">
                    {userReports.map((report, index) => (
                        <button key={index} 
                            className="report-item" 
                            onClick={() => selectReport(index)}>
                            {report.reportedUser} (신고일: {new Date(report.reportedAt).toLocaleDateString()})
                        </button>
                    ))}
                </div>

                {/* 신고 상세 내용 표시 */}
                <div className="report-detail">
                    {selectedReport ? (
                        <>
                            <h3>신고 내용</h3>
                            <p><strong>사유:</strong> {selectedReport.reason}</p>
                            <p><strong>신고 날짜:</strong> {new Date(selectedReport.reportedAt).toLocaleString()}</p>
                            <p><strong>상태:</strong> {selectedReport.status}</p>

                            {/* 플레이리스트가 있는 경우 표시 */}
                            {selectedReport.playlist && (
                                <div className="playlist-info">
                                    <h3>🎵 플레이리스트 정보</h3>
                                    <p><strong>제목:</strong> {selectedReport.playlist.title}</p>
                                    <p><strong>설명:</strong> {selectedReport.playlist.description}</p>
                                    <div className="playlist-tracks">
                                        {selectedReport.playlist.tracks.map((track, index) => (
                                            <div key={index} className="track-item">
                                                <p><strong>{track.name}</strong> - {track.artist}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
