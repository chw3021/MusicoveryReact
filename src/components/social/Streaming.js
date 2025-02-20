import Header from "../common/Header";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/SocialPage.css";
import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/userUserInfo";

const Streaming = () => {
    const [playlists, setPlaylists] = useState([]);
    const userInfo = useUserInfo();

    // 사용자의 플레이리스트 가져오기
    useEffect(() => {
        if (userInfo && userInfo.userId) {
            axiosInstance.get("/playlist/user/" + userInfo.userId)
                .then(response => {
                    console.log("📡 내 플레이리스트 : ", response.data);
                    setPlaylists(response.data);
                })
                .catch(error => console.error("❌ 플레이리스트 가져오기 실패:", error));
        }
    }, [userInfo]);

    // ✅ 공개 여부 변경 및 DB 저장
    const togglePublicStatus = (playlistId) => {
        const playlist = playlists.find(pl => pl.playlistId === playlistId);
        if (!playlist) return;

        const newStatus = !playlist.isPublic;
        console.log("📡 내 플레이리스트 : ", playlist);

        console.log("전송 데이터: ", {
            id: playlist.userId,
            playlistName: playlist.playlistTitle,
            hostUserId: playlist.userId,
            isLive: true,
            isPremiumOnly: false,
            isPublic: newStatus
        });

        axiosInstance.post("/api/streaming/create", {
            id: playlist.playlistId,
            playlistName: playlist.playlistTitle,  // ✅ 필드명 변경!
            hostUserId: playlist.userId,           // ✅ 필드명 변경!
            isLive: true,                            // ✅ boolean 타입 변경
            isPremiumOnly: false,                    // ✅ boolean 타입 변경
            isPublic: newStatus
        })
        .then(response => {
            console.log("✅ 스트리밍 데이터 저장 완료:", response.data);
            setPlaylists(playlists.map(pl => 
                pl.playlistId === playlistId ? { ...pl, isPublic: newStatus } : pl
            ));
        })
        .catch(error => {
            console.error("❌ 스트리밍 데이터 저장 실패:", error);
            if (error.response) {
                console.error("📌 응답 데이터:", error.response.data);
                console.error("📌 상태 코드:", error.response.status);
            }
        });
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

                    {playlists.length > 0 ? (
                        playlists.map(playlist => (
                            <div key={playlist.playlistId} className="streaming-info">
                                <h2>플레이리스트: {playlist.playlistTitle}</h2>
                                <p>현재 상태: {playlist.isPublic ? "🔓 공개" : "🔒 비공개"}</p>
                                <button className="toggle-button" onClick={() => togglePublicStatus(playlist.playlistId)}>
                                    {playlist.isPublic ? "비공개로 변경" : "공개하기"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>플레이리스트 정보를 불러오는 중...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Streaming;