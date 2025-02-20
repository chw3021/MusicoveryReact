import Header from "../common/Header";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/SocialPage.css";
import React, { useState, useEffect } from "react";

const Streaming = () => {

    const [playlist, setPlaylist] = useState(null);
    const [isPublic, setIsPublic] = useState(false);

    // 사용자의 플레이리스트 가져오기
    useEffect(() => {
        axiosInstance.get("/api/streaming/my-playlist")
            .then(response => {
                console.log("📡 내 플레이리스트:", response.data);
                setPlaylist(response.data);
                setIsPublic(response.data.isPublic);
            })
            .catch(error => console.error("❌ 플레이리스트 가져오기 실패:", error));
    }, []);

    const togglePublicStatus = () => {
        if (!playlist) return;

        const newStatus = !isPublic;
        
        axiosInstance.patch(`/api/streaming/${playlist.id}/public`, { isPublic: newStatus })
            .then(response => {
                console.log("✅ 공개 상태 변경 완료:", response.data);
                setIsPublic(newStatus);
            })
            .catch(error => console.error("❌ 공개 상태 변경 실패:", error));
    };

    return (
        <div className="social-container">
            <Header />

            <div className="social-layout">
                <aside className="social-sidebar">
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="/friendslist">친구 목록</a></li>
                            <li><a href="/quiz">퀴즈</a></li>
                            <li><a href="/streaming">스트리밍</a></li>
                            <li><a href="/challenge">첼린지</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="social-content">
                    <h1>스트리밍 관리</h1>

                    {playlist ? (
                        <div className="streaming-info">
                            <h2>플레이리스트: {playlist.playlistName}</h2>
                            <p>현재 상태: {isPublic ? "🔓 공개" : "🔒 비공개"}</p>
                            <button className="toggle-button" onClick={togglePublicStatus}>
                                {isPublic ? "비공개로 변경" : "공개하기"}
                            </button>
                        </div>
                    ) : (
                        <p>플레이리스트 정보를 불러오는 중...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Streaming;
