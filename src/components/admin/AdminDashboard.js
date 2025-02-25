import React from "react";
import { FaUser, FaClock, FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../../styles/AdminDashboard.css"; 

Chart.register(...registerables);

const AdminDashboard = () => {
    const stats = [
        { id: 1, label: "유저 수", value: "120명", icon: <FaUser />, color: "#4CAF50" },
        { id: 2, label: "스트리밍 시간", value: "250시간", icon: <FaClock />, color: "#FF9800" },
        { id: 3, label: "방문 수", value: "5,000회", icon: <FaChartLine />, color: "#2196F3" }
    ];

    const logs = [
        "🔹 2024-02-25 10:30 | 신규 유저 가입: user123",
        "🔹 2024-02-25 11:15 | 스트리밍 완료: 3시간",
        "🔹 2024-02-25 12:00 | 신고 접수됨: 게시물 #4321"
    ];

    const serverStatus = {
        uptime: "99.9%",
        responseTime: "120ms",
        errors: "0건"
    };

    // 🔹 차트 데이터 (1주일)
    const chartData = {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [
            {
                label: "유저 수",
                data: [100, 105, 110, 115, 120, 125, 130], // 더미 데이터
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                tension: 0.3,
            },
            {
                label: "스트리밍 시간 (시간)",
                data: [200, 210, 220, 230, 250, 260, 280],
                borderColor: "#FF9800",
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                tension: 0.3,
            },
            {
                label: "방문 수",
                data: [4000, 4200, 4500, 4700, 5000, 5300, 5500],
                borderColor: "#2196F3",
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                tension: 0.3,
            }
        ]
    };

    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 주요 통계 카드 */}
            <div className="dashboard-stats">
                {stats.map((stat) => (
                    <div key={stat.id} className="dashboard-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                        <div className="dashboard-icon" style={{ color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <h3>{stat.label}</h3>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 1주일 차트 */}
            <div className="dashboard-chart">
                <h3>📈 1주일 통계</h3>
                <Line data={chartData} />
            </div>

            {/* 최근 활동 로그 */}
            <div className="dashboard-section">
                <h3>📝 최근 활동 로그</h3>
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>

            {/* 시스템 상태 모니터링 */}
            <div className="dashboard-section">
                <h3>🖥️ 시스템 상태 모니터링</h3>
                <p>✅ 서버 가동률: {serverStatus.uptime}</p>
                <p>⏱️ 응답 시간: {serverStatus.responseTime}</p>
                <p>🚨 오류 발생: {serverStatus.errors}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
