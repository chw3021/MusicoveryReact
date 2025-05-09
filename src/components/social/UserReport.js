import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/UserReport.css";
import Header from "../common/Header";
import useUserInfo from "../../hooks/useUserInfo";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가

const UserReport = () => {
    const [reports, setReports] = useState([]);
    const [reportedUserId, setReportedUserId] = useState("");
    const [reportReason, setReportReason] = useState("");
    const [customReason, setCustomReason] = useState(""); // 자유 입력을 위한 상태
    const userInfo = useUserInfo();
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 추가
    const [reportedPost, setReportedPost] = useState(null);

    // 신고 대상 유저 정보 가져오기
    useEffect(() => {
        if (location.state && location.state.reportedPost) {
            setReportedUserId(location.state.reportedPost.user.id);
            setReportedPost(location.state.reportedPost);
        }
    }, [location.state]);

    // 신고 내역 가져오기
    useEffect(() => {
        if (userInfo) {
            fetchReports(userInfo.id);
        }
    }, [userInfo]);

    const fetchReports = async (userId) => {
        try {
            const response = await axiosInstance.get("/api/userreport/reporter/" + userId);
            console.log("신고 내역:", response.data);
            
            setReports(response.data || []); // 응답 데이터가 배열이 아닌 경우 빈 배열로 초기화
        } catch (error) {
            console.error("신고 내역을 불러오는 중 오류 발생:", error);
            setReports([]); // 오류 발생 시 빈 배열로 초기화
        }
    };

    // 신고 제출하기
    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportedUserId) {
            alert("신고할 사용자 ID를 입력하세요.");
            return;
        }
        try {
            const response = await axiosInstance.post("/api/userreport/report", {
                reporterId: userInfo.id,
                reportedUserId: reportedUserId,
                reason: reportReason === "직접입력" ? customReason : reportReason, // 직접입력일 때만 customReason 사용
                postId: reportedPost.id // 신고된 게시글 ID 추가
            });
            alert("신고가 접수되었습니다.");
            // 신고 접수 후 PostPage로 이동
            navigate("/post"); // 게시판 페이지로 이동
        } catch (error) {
            console.error("신고 중 오류 발생:", error);
            alert("신고 접수 중 오류가 발생했습니다.");
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
                        value={location.state.reportedPost.user.nickname}
                        onChange={(e) => setReportedUserId(e.target.value)}
                        required
                        disabled
                    />
                    
                    {reportedPost && (
                        <div className="reported-post-info">
                            <p><strong>제목:</strong> {reportedPost.title}</p>
                            <p><strong>내용:</strong> {reportedPost.description}</p>
                        </div>
                    )}
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

                    <button className="reportbutton" type="submit">신고 제출</button>
                </form>

                <h2>신고 내역</h2>
                <ul className="report-list-ulist">
                    {Array.isArray(reports) && reports.map((report) => (
                        <li className="report-list-list" key={report.id}>
                            <div className="report-list-item">
                                <strong>사용자: {report.reportedUserNickname}</strong>
                                {report.postTitle && (
                                    <p><strong>게시글 제목:</strong> {report.postTitle}</p>
                                )}
                                <strong> 사유: {report.reason}</strong>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserReport;