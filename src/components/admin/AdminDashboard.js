import React from "react";
import { FaUser, FaClock, FaChartLine, FaMusic, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../../styles/AdminDashboard.css";

Chart.register(...registerables);

// 🔹 랜덤 데이터 생성 함수
const generateRandomData = (min, max) => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * (max - min + 1) + min));

const AdminDashboard = () => {
    const labels = ["월", "화", "수", "목", "금", "토", "일"];

    // 🔹 카드 + 차트 데이터 배열
    const stats = [
        {
            id: 1, label: "유저 수", value: "120명", icon: <FaUser />,
            chartData: generateRandomData(10, 50), color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)"
        },
        {
            id: 2, label: "스트리밍 시간", value: "250시간", icon: <FaClock />,
            chartData: generateRandomData(20, 100), color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)"
        },
        {
            id: 3, label: "방문 수", value: "5,000회", icon: <FaChartLine />,
            chartData: generateRandomData(500, 2000), color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.2)"
        }
    ];

    // 🔹 최근 가입한 유저 목록
    const recentUsers = [
        { id: 1, username: "user123", joined: "2024-02-25" },
        { id: 2, username: "musiclover", joined: "2024-02-24" },
        { id: 3, username: "djmax", joined: "2024-02-23" }
    ];

    // 🔹 인기 스트리밍 곡
    const topSongs = [
        { id: 1, title: "Song A", artist: "Artist 1", plays: 300 },
        { id: 2, title: "Song B", artist: "Artist 2", plays: 250 },
        { id: 3, title: "Song C", artist: "Artist 3", plays: 200 },
        { id: 4, title: "Song D", artist: "Artist 4", plays: 180 },
        { id: 5, title: "Song E", artist: "Artist 5", plays: 150 }
    ];

    // 🔹 관리자 알림 / 공지사항
    const adminNotices = [
        "🚨 신고된 게시물 3개 (확인 필요)",
        "🛠️ 2024-02-27 시스템 업데이트 예정",
        "⚠️ 서버 응답 지연 발생 (2024-02-25)"
    ];

    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 카드 + 개별 차트 묶기 */}
            <div className="dashboard-grid">
                {stats.map((stat) => (
                    <div key={stat.id} className="dashboard-box">
                        {/* 통계 카드 */}
                        <div className="dashboard-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                            <div className="dashboard-icon" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3>{stat.label}</h3>
                                <p>{stat.value}</p>
                            </div>
                        </div>

                        {/* 개별 차트 */}
                        <div className="dashboard-chart">
                            <Line 
                                data={{
                                    labels,
                                    datasets: [{
                                        label: stat.label,
                                        data: stat.chartData,
                                        borderColor: stat.color,
                                        backgroundColor: stat.bgColor,
                                        tension: 0.3,
                                        fill: true
                                    }]
                                }} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 추가 콘텐츠 섹션 */}
            <div className="dashboard-extra">
                {/* 최근 가입한 유저 */}
                <div className="dashboard-section">
                    <h3><FaUser /> 최근 가입한 유저</h3>
                    <ul>
                        {recentUsers.map(user => (
                            <li key={user.id}>🟢 {user.username} (가입일: {user.joined})</li>
                        ))}
                    </ul>
                </div>

                {/* 인기 스트리밍 곡 */}
                <div className="dashboard-section">
                    <h3><FaMusic /> 인기 스트리밍 곡</h3>
                    <ul>
                        {topSongs.map(song => (
                            <li key={song.id}>🎶 {song.title} - {song.artist} ({song.plays}회 재생)</li>
                        ))}
                    </ul>
                </div>

                {/* 관리자 알림 */}
                <div className="dashboard-section">
                    <h3><FaBell /> 관리자 알림</h3>
                    <ul>
                        {adminNotices.map((notice, index) => (
                            <li key={index}>{notice}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
