import Header from "../common/Header";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/SocialPage.css";
import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import Nav from "../common/Nav";
import SidebarLayout from "../common/SidebarLayout";




const Streaming = ({ onStatusCange }) => { // onStatusChange prop 추가
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

    const togglePublicStatus = (playlistId) => {
        const playlist = playlists.find(pl => pl.playlistId === playlistId);
        if (!playlist) return;
    
        console.log("📡 플레이리스트 : ", playlist);
        const newStatus = !playlist.isPublic;

        

        if(newStatus){
            axiosInstance.post("/api/streaming/create", {
                playlistId: playlist.playlistId,
                hostUser: playlist.user,
                isLive: true,
                isPremiumOnly: false,
                isPublic: true
            })
            .then(response => {
                console.log("✅ 스트리밍 데이터 저장 완료:", response.data);
                setPlaylists(playlists.map(pl => 
                    pl.playlistId === playlistId ? { ...pl, isPublic: newStatus } : pl
                ));
            })
            .catch(error => console.error("❌ 스트리밍 데이터 저장 실패:", error));
        }
        else{
            // 비공개 (스트리밍 삭제)
            axiosInstance.post(`/api/streaming/stop/${playlist.playlistId}`)
            .then(response => {
                console.log("🗑️ 스트리밍 삭제 완료:", response.data);
                setPlaylists(playlists.map(pl => 
                    pl.playlistId === playlistId ? { ...pl, isPublic: newStatus } : pl
                ));
            })
            .catch(error => console.error("❌ 스트리밍 삭제 실패:", error));
        }
    };
    return (
        <div className="social-container">
            <Header />
            <SidebarLayout>
            <div className="social-layout-container">
                
                <div className="Tool">
                    <h1>※ 스트리밍 관리 ※</h1>

                    {playlists.length > 0 ? (
                        playlists.map(playlist => (
                            <div key={playlist.playlistId} className="streaming-info">
                                <h2 id="titleColor">플레이리스트명 : {playlist.playlistTitle}</h2>
                                <p id="statePlace">현재 상태 : {playlist.isPublic ? "🔓 공개" : "🔒 비공개"}</p>
                                <button className="toggle-button" onClick={() => togglePublicStatus(playlist.playlistId)}>
                                    {playlist.isPublic ? "비공개로 변경" : "공개로 변경"}
                                </button>
                                
                            </div>
                        ))
                    ) : (
                        <p>플레이리스트 정보를 불러오는 중...</p>
                    )}
                </div>
                <Nav />
                
            </div>
            </SidebarLayout>
        </div>
    );
};

export default Streaming;