import React, { useState, useEffect } from "react";
import { FaUser, FaMusic, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../../styles/AdminDashboard.css";
import axios from "axios";

Chart.register(...registerables, ChartDataLabels);

// 최근 7일간 날짜 생성 함수
const getLast7Days = () =>
    Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });

const AdminDashboard = ({ setActiveSection }) => {
    const labels = getLast7Days(); // X축 날짜

    // 상태 값
    const [weeklyNewUsers, setWeeklyNewUsers] = useState(new Array(7).fill(0));
    const [totalUsers, setTotalUsers] = useState(0);
    const [recentUsers, setRecentUsers] = useState([]);

    const [weeklyPlaylists, setWeeklyPlaylists] = useState(new Array(7).fill(0));
    const [totalPlaylists, setTotalPlaylists] = useState(0);
    const [recentPlaylists, setRecentPlaylists] = useState([]);

    const [reportCount, setReportCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);

    // 백엔드 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    usersRes,
                    totalUsersRes,
                    recentUsersRes,
                    playlistsRes,
                    totalPlaylistsRes,
                    recentPlaylistsRes,
                    reportCountRes,
                    inquiriesRes
                ] = await Promise.all([
                    axios.get("http://localhost:8080/auth/weekly-users"),
                    axios.get("http://localhost:8080/auth/count"),
                    axios.get("http://localhost:8080/auth/recent-users"),
                    axios.get("http://localhost:8080/playlist/weekly-playlists"),
                    axios.get("http://localhost:8080/playlist/count"),
                    axios.get("http://localhost:8080/playlist/recent-playlists"),
                    axios.get("http://localhost:8080/api/userreport/count"),
                    axios.get("http://localhost:8080/customersupport/count"),
                ]);

                setWeeklyNewUsers(usersRes.data.length === 7 ? usersRes.data : new Array(7).fill(0));
                setTotalUsers(totalUsersRes.data || 0);
                setRecentUsers(recentUsersRes.data || []);

                setWeeklyPlaylists(playlistsRes.data.length === 7 ? playlistsRes.data : new Array(7).fill(0));
                setTotalPlaylists(totalPlaylistsRes.data || 0);
                setRecentPlaylists(recentPlaylistsRes.data || []);

                setReportCount(reportCountRes.data || 0);
                setInquiryCount(inquiriesRes.data || 0);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, []);

    // 오늘 날짜의 데이터 반영
    const todayNewUsers = weeklyNewUsers[6] || 0;
    const todayNewPlaylists = weeklyPlaylists[6] || 0;

    // 통계 카드 데이터
    const stats = [
        {
            id: 1,
            label: "총 유저 수",
            value: `${totalUsers}명`,
            icon: <FaUser />,
            chartData: weeklyNewUsers,
            todayCount: todayNewUsers,
            color: "#4CAF50",
        },
        {
            id: 2,
            label: "총 플레이리스트 수",
            value: `${totalPlaylists}개`,
            icon: <FaMusic />,
            chartData: weeklyPlaylists,
            todayCount: todayNewPlaylists,
            color: "#FF9800",
        },
    ];

    return (
        <div className="admin-dashboard">
            <h2>📊 대시보드</h2>

            {/* 통계 카드 + 개별 차트 */}
            <div className="dashboard-grid">
                {stats.map(({ id, label, value, icon, chartData, todayCount, color }, index) => (
                    <div key={id} className="dashboard-box">
                        {/* 카드 */}
                        <div className="dashboard-card" style={{ borderLeft: `5px solid ${color}` }}>
                            <div className="dashboard-icon" style={{ color }}>
                                {icon}
                            </div>
                            <div>
                                <h3>{label}</h3>
                                <p>{value}</p>
                            </div>
                        </div>

                        {/* 차트 */}
                        <div className="dashboard-chart">
                            <Line
                                data={{
                                    labels,
                                    datasets: [{
                                        label: index === 0
                                            ? `📊 오늘의 가입자 수: ${todayCount}명`
                                            : `📊 오늘 생성된 플레이리스트 수: ${todayCount}개`,
                                        data: chartData,
                                        borderColor: color,
                                        backgroundColor: `${color}33`,
                                        tension: 0.3,
                                        fill: true
                                    }]
                                }}
                                options={{
                                    layout: { padding: { top: 20 } },
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: index === 0
                                                ? `📊 오늘의 가입자 수: ${todayCount}명`
                                                : `📊 오늘 생성된 플레이리스트 수: ${todayCount}개`,
                                            color: "#ffffff",
                                            font: { size: 16 },
                                            padding: { bottom: 50 }
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
                <DashboardSection title="최근 가입한 유저" icon={<FaUser />} items={recentUsers} type="user" />
                <DashboardSection title="최근 생성된 플레이리스트" icon={<FaMusic />} items={recentPlaylists} type="playlist" />
                <DashboardAlerts setActiveSection={setActiveSection} reportCount={reportCount} inquiryCount={inquiryCount} />
            </div>
        </div>
    );
};

// 대시보드 섹션 컴포넌트
const DashboardSection = ({ title, icon, items, type }) => (
    <div className="dashboard-section">
        <h3>{icon} {title}</h3>
        <ul>
            {items.length > 0 ? (
                items.map(({ id, playlistId, nickname, regdate, playlistTitle, playlistDate }) => (
                    <li key={id || playlistId}>
                        {type === "user"
                            ? `🟢 ${nickname} (가입일: ${formatDate(regdate)})`
                            : `🎵 ${playlistTitle} (생성일: ${formatDate(playlistDate)})`}
                    </li>
                ))
            ) : (
                <li>데이터 없음</li>
            )}
        </ul>
    </div>
);

// 관리자 알림 섹션
const DashboardAlerts = ({ setActiveSection, reportCount, inquiryCount }) => (
    <div className="dashboard-section">
        <h3><FaBell /> 관리자 알림</h3>
        <ul>
            <li>
                <button onClick={() => setActiveSection("report")} className="link-button">
                    🚨 신고된 게시물 {reportCount}개
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection("support")} className="link-button">
                    📞 문의사항 {inquiryCount}개
                </button>
            </li>
        </ul>
    </div>
);

// 날짜 포맷 변환
const formatDate = date => new Date(date).toISOString().split("T")[0];

export default AdminDashboard;
