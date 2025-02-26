import React from "react";
import { FaUser, FaClock, FaChartLine, FaMusic, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../../styles/AdminDashboard.css";

Chart.register(...registerables, ChartDataLabels);

// 🔹 최근 7일간 날짜 생성 함수
const getLast7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }
    return dates;
};

// 🔹 랜덤 데이터 생성 함수
const generateRandomData = (min, max) => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * (max - min + 1) + min));

// 🔹 데이터의 총 합 계산 함수
const calculateTotal = (data) => data.reduce((acc, value) => acc + value, 0);

const AdminDashboard = () => {
    const labels = getLast7Days(); // X축 날짜

    // 🔹 오늘 카운트된 숫자
    const todayStats = {
        users: 12,
        playlists: 80,
        visits: 500
    };

    // 🔹 일주일 누적 데이터
    const weeklyStats = {
        users: generateRandomData(10, 50),
        playlists: generateRandomData(20, 100),
        visits: generateRandomData(500, 2000)
    };

    // 🔹 데이터의 누적 합계 계산
    const totalStats = {
        users: calculateTotal(weeklyStats.users),
        playlists: calculateTotal(weeklyStats.playlists),
        visits: calculateTotal(weeklyStats.visits)
    };

    // 🔹 카드 + 차트 데이터 배열
    const stats = [
        {
            id: 1, label: "유저 수", value: `${todayStats.users}명`, icon: <FaUser />,
            chartData: weeklyStats.users, total: totalStats.users, color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)"
        },
        {
            id: 2, label: "생성된 플레이리스트 수", value: `${todayStats.playlists}개`, icon: <FaClock />,
            chartData: weeklyStats.playlists, total: totalStats.playlists, color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)"
        },
        {
            id: 3, label: "방문 수", value: `${todayStats.visits}회`, icon: <FaChartLine />,
            chartData: weeklyStats.visits, total: totalStats.visits, color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.2)"
        }
    ];

    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 카드 + 개별 차트 묶기 */}
            <div className="dashboard-grid">
                {stats.map((stat) => (
                    <div key={stat.id} className="dashboard-box">
                        {/* 통계 카드 (오늘 카운트) */}
                        <div className="dashboard-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                            <div className="dashboard-icon" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3>{stat.label}</h3>
                                <p>{stat.value}</p>
                            </div>
                        </div>

                        {/* 개별 차트 (누적 데이터) */}
                        <div className="dashboard-chart">
                            <Line 
                                data={{
                                    labels,
                                    datasets: [{
                                        label: `누적 ${stat.label} (${stat.total})`,
                                        data: stat.chartData,
                                        borderColor: stat.color,
                                        backgroundColor: stat.bgColor,
                                        tension: 0.3,
                                        fill: true
                                    }]
                                }}
                                options={{
                                    layout: { padding: { top: 40 } },
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: `📊 총 ${stat.label}: ${stat.total}`,
                                            color: "#ffffff",
                                            font: { size: 16 }
                                        },
                                        legend: { display: false },
                                        tooltip: { enabled: true },
                                        datalabels: { 
                                            display: true,
                                            color: "white",
                                            font: { size: 13, weight: "bold" },
                                            anchor: "end", 
                                            align: "top",
                                            offset: 12
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 추가 콘텐츠 */}
            <div className="dashboard-extra">
                <div className="dashboard-section">
                    <h3><FaUser /> 최근 가입한 유저</h3>
                    <ul>
                        <li>🟢 user123 (가입일: 2024-02-25)</li>
                        <li>🟢 musiclover (가입일: 2024-02-24)</li>
                        <li>🟢 djmax (가입일: 2024-02-23)</li>
                    </ul>
                </div>

                <div className="dashboard-section">
                    <h3><FaMusic /> 인기 스트리밍 곡</h3>
                    <ul>
                        <li>🎶 Song A - Artist 1 (300회 재생)</li>
                        <li>🎶 Song B - Artist 2 (250회 재생)</li>
                        <li>🎶 Song C - Artist 3 (200회 재생)</li>
                    </ul>
                </div>

                <div className="dashboard-section">
                    <h3><FaBell /> 관리자 알림</h3>
                    <ul>
                        <li>🚨 신고된 게시물 3개 (확인 필요)</li>
                        <li>🛠️ 2024-02-27 시스템 업데이트 예정</li>
                        <li>⚠️ 서버 응답 지연 발생 (2024-02-25)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
