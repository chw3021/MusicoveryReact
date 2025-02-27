import React, { useState, useEffect } from "react";
import { FaUser, FaChartLine, FaMusic, FaBell } from "react-icons/fa";
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

const AdminDashboard = ({ setActiveSection }) => {
    const labels = getLast7Days(); // X축 날짜

    // 🔹 백엔드 데이터를 저장할 상태
    const [weeklyNewUsers, setWeeklyNewUsers] = useState(new Array(7).fill(0)); 
    const [totalUsers, setTotalUsers] = useState(0); 
    const [recentUsers, setRecentUsers] = useState([]);
    const [weeklyPlaylists, setWeeklyPlaylists] = useState(new Array(7).fill(0));
    const [totalPlaylists, setTotalPlaylists] = useState(0);
    const [weeklyVisits, setWeeklyVisits] = useState(new Array(7).fill(0));
    const [recentPlaylists, setRecentPlaylists] = useState([]);

    // 🔹 백엔드에서 유저 및 플레이리스트 데이터 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/auth/weekly-users")
            .then(response => {
                if (response.data.length === 7) setWeeklyNewUsers(response.data);
            })
            .catch(error => console.error("주간 유저 수 가져오기 실패:", error));

        axios.get("http://localhost:8080/auth/count")
            .then(response => setTotalUsers(response.data))
            .catch(error => console.error("총 유저 수 가져오기 실패:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/playlist/weekly-playlists")
            .then(response => {
                if (response.data.length === 7) setWeeklyPlaylists(response.data);
            })
            .catch(error => console.error("주간 플레이리스트 수 가져오기 실패:", error));

        axios.get("http://localhost:8080/playlist/count")
            .then(response => setTotalPlaylists(response.data))
            .catch(error => console.error("총 플레이리스트 수 가져오기 실패:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/auth/recent-users")
            .then(response => setRecentUsers(response.data))
            .catch(error => console.error("최근 가입한 유저 가져오기 실패:", error));
    }, []);

    // 🔹 최근 생성된 플레이리스트 3개 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/playlist/recent-playlists")
            .then(response => setRecentPlaylists(response.data))
            .catch(error => console.error("최근 생성된 플레이리스트 가져오기 실패:", error));
    }, []);
    // 🔹 오늘 날짜의 데이터를 반영
    const todayStats = {
        users: totalUsers,
        playlists: totalPlaylists,
        visits: weeklyVisits[6] || 0
    };

    // 🔹 오늘 생성된 플레이리스트 수
    const todayNewPlaylists = weeklyPlaylists[6] || 0;

    // 🔹 카드 + 차트 데이터 배열
    const stats = [
        {
            id: 1, label: "총 유저 수", value: `${todayStats.users}명`, icon: <FaUser />,
            chartData: weeklyNewUsers, total: todayStats.users, color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)"
        },
        {
            id: 2, label: "총 플레이리스트 수", value: `${todayStats.playlists}개`, icon: <FaMusic />,
            chartData: weeklyPlaylists, total: todayNewPlaylists, color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)"
        },
        {
            id: 3, label: "방문 수", value: `${todayStats.visits}회`, icon: <FaChartLine />,
            chartData: weeklyVisits, total: todayStats.visits, color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.2)"
        }
    ];


    useEffect(() => {
        axios.get("http://localhost:8080/auth/recent-users")
            .then(response => setRecentUsers(response.data))
            .catch(error => console.error("최근 가입한 유저 가져오기 실패:", error));
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 카드 + 개별 차트 묶기 */}
            <div className="dashboard-grid">
                {stats.map((stat, index) => (
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
                                        label: index === 0 ? `📊 오늘의 가입자 수: ${stat.total}명` : `📊 ${stat.label}: ${stat.total}`,
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
                {/* 최근 가입한 유저 */}
                <div className="dashboard-section">
                    <h3><FaUser /> 최근 가입한 유저</h3>
                    <ul>
                        {recentUsers.length > 0
                            ? recentUsers.map(user => (
                                <li key={user.id}>🟢 {user.nickname} (가입일: {new Date(user.regdate).toISOString().split("T")[0]})</li>
                            ))
                            : <li>최근 가입한 유저가 없습니다.</li>}
                    </ul>
                </div>

                {/* 최근 생성된 플레이리스트 */}
                <div className="dashboard-section">
                    <h3><FaMusic /> 최근 생성된 플레이리스트</h3>
                    <ul>
                        {recentPlaylists.length > 0
                            ? recentPlaylists.map(playlist => (
                                <li key={playlist.playlistId}>🎵 {playlist.playlistTitle} (생성일: {new Date(playlist.playlistDate).toISOString().split("T")[0]})</li>
                            ))
                            : <li>최근 생성된 플레이리스트가 없습니다.</li>}
                    </ul>
                </div>

                <div className="dashboard-section">
                    <h3><FaBell /> 관리자 알림</h3>
                    <ul>
                        <li>
                        <button onClick={() => setActiveSection("report")} className="link-button">🚨 신고된 게시물 3개</button>
                        </li>
                        <li>🛠️ 2024-02-27 시스템 업데이트 예정</li>
                        <li>⚠️ 서버 응답 지연 발생 (2024-02-25)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
