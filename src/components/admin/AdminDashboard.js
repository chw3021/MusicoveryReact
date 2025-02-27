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
    const [weeklyNewUsers, setWeeklyNewUsers] = useState(new Array(7).fill(0)); // 오늘의 가입자 수
    const [totalUsers, setTotalUsers] = useState(0); // 총 유저 수 (DB 연동)
    const [weeklyPlaylists, setWeeklyPlaylists] = useState(new Array(7).fill(0));  // ❌ 유지
    const [weeklyVisits, setWeeklyVisits] = useState(new Array(7).fill(0));  // ❌ 유지

    // 🔹 백엔드에서 최근 7일간 가입자 수 및 총 유저 수 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/auth/weekly-users")
            .then(response => {
                if (response.data && response.data.length === 7) {
                    setWeeklyNewUsers(response.data);
                }
            })
            .catch(error => console.error("주간 유저 수 가져오기 실패:", error));

        axios.get("http://localhost:8080/auth/count")  // ✅ 총 유저 수 API 호출
            .then(response => {
                if (response.data) {
                    setTotalUsers(response.data);  // ✅ DB에서 총 유저 수 연동
                }
            })
            .catch(error => console.error("총 유저 수 가져오기 실패:", error));
    }, []);

    // 🔹 오늘 날짜(2/27)의 데이터를 반영
    const todayStats = {
        users: totalUsers,  // ✅ DB에서 가져온 총 유저 수 반영
        playlists: weeklyPlaylists[6] || 0,  // ❌ 유지
        visits: weeklyVisits[6] || 0  // ❌ 유지
    };

    // 🔹 오늘 가입자 수 (차트에 반영)
    const todayNewUsers = weeklyNewUsers[6] || 0;

    // 🔹 카드 + 차트 데이터 배열 (구조 유지)
    const stats = [
        {
            id: 1, label: "총 유저 수", value: `${todayStats.users}명`, icon: <FaUser />,
            chartData: weeklyNewUsers, total: todayNewUsers, color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)"
        },
        {
            id: 2, label: "플레이리스트 수", value: `${todayStats.playlists}개`, icon: <FaClock />,
            chartData: weeklyPlaylists, total: todayStats.playlists, color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)"
        },
        {
            id: 3, label: "방문 수", value: `${todayStats.visits}회`, icon: <FaChartLine />,
            chartData: weeklyVisits, total: todayStats.visits, color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.2)"
        }
    ];

        // 🔹 최근 가입한 유저 목록 상태 추가
        const [recentUsers, setRecentUsers] = useState([]);
    
        // 🔹 백엔드에서 최근 가입한 유저 3명 가져오기
       useEffect(() => {
    axios.get("http://localhost:8080/auth/recent-users")
        .then(response => {
            console.log("최근 가입한 유저 데이터:", response.data);  // ✅ 응답 데이터 로그 확인
            if (response.data) {
                setRecentUsers(response.data);
            }
        })
        .catch(error => console.error("최근 가입한 유저 가져오기 실패:", error));
}, []);


    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 카드 + 개별 차트 묶기 */}
            <div className="dashboard-grid">
                {stats.map((stat, index) => (
                    <div key={stat.id} className="dashboard-box">
                        {/* 통계 카드 (총 유저 수 표시) */}
                        <div className="dashboard-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                            <div className="dashboard-icon" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3>{stat.label}</h3>
                                <p>{stat.value}</p>
                            </div>
                        </div>

                        {/* 개별 차트 (오늘의 가입자 수 기준) */}
                        <div className="dashboard-chart">
                            <Line 
                                data={{
                                    labels,
                                    datasets: [{
                                        label: index === 0 ? `📊 오늘의 가입자 수: ${stat.total}명` : `누적 ${stat.label}: ${stat.total}`,
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
                                            padding: { bottom: 50 },
                                            display: true,
                                            text: index === 0 ? `📊 오늘의 가입자 수: ${stat.total}명` : `📊 총 ${stat.label}: ${stat.total}`,
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
            
            {/* 추가 콘텐츠 */}
            <div className="dashboard-extra">
                <div className="dashboard-section">
                    <h3><FaUser /> 최근 가입한 유저</h3>
                    <ul>
                        {recentUsers.length > 0 ? (
                        recentUsers.map(user => (
                            <li key={user.id}>
                                🟢 {user.nickname} (가입일: {new Date(user.regdate).toISOString().split("T")[0]})
                            </li>
                        ))
                    ) : (
                        <li>최근 가입한 유저가 없습니다.</li>
                    )}
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
