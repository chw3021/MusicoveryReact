import React, { useState, useEffect } from "react";
import { FaUser, FaClock, FaChartLine, FaMusic, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../../styles/AdminDashboard.css";
import axios from "axios";

Chart.register(...registerables, ChartDataLabels);

// 🔹 최근 7일간 날짜 생성 함수
const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
};

const AdminDashboard = () => {
    const labels = getLast7Days(); // X축 날짜

    // 🔹 백엔드 데이터를 저장할 상태
    const [weeklyUsers, setWeeklyUsers] = useState(new Array(7).fill(0));
    const [weeklyPlaylists, setWeeklyPlaylists] = useState(new Array(7).fill(0));  // ❌ 유지
    const [weeklyVisits, setWeeklyVisits] = useState(new Array(7).fill(0));  // ❌ 유지

    // 🔹 백엔드에서 최근 7일간 유저 수 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/auth/weekly-users")
            .then(response => {
                if (response.data && response.data.length === 7) {
                    setWeeklyUsers(response.data);
                }
            })
            .catch(error => console.error("주간 유저 수 가져오기 실패:", error));
    }, []);

    // 🔹 오늘 날짜(2/26)의 데이터를 첫 번째 줄에 반영
    const todayStats = {
        users: weeklyUsers[6] || 0,  // ✅ 날짜별 유저 수 적용
        playlists: weeklyPlaylists[6] || 0,  // ❌ 유지
        visits: weeklyVisits[6] || 0  // ❌ 유지
    };

    // 🔹 데이터의 누적 합계 계산
    const totalStats = {
        users: weeklyUsers.reduce((acc, value) => acc + value, 0),
        playlists: weeklyPlaylists.reduce((acc, value) => acc + value, 0),  // ❌ 유지
        visits: weeklyVisits.reduce((acc, value) => acc + value, 0)  // ❌ 유지
    };

    // 🔹 카드 + 차트 데이터 배열 (구조 유지)
    const stats = [
        {
            id: 1, label: "유저 수", value: `${todayStats.users}명`, icon: <FaUser />,
            chartData: weeklyUsers, total: totalStats.users, color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)"
        },
        {
            id: 2, label: "생성된 플레이리스트 수", value: `${todayStats.playlists}개`, icon: <FaClock />,
            chartData: weeklyPlaylists, total: totalStats.playlists, color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)"
        },
        {
            id: 3, label: "방문 수", value: `${todayStats.visits}회`, icon: <FaChartLine />,
            chartData: weeklyVisits, total: totalStats.visits, color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.2)"
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
                                    layout: { padding: { top: 20 } },
                                    plugins: {
                                        title: {
                                            padding: { bottom: 50},
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
                                            font: { size: 12, weight: "bold" },
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
        </div>
    );
};

export default AdminDashboard;
