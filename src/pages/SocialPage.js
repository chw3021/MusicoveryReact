import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // axios 사용
import Header from "../components/common/Header";
import "../styles/SocialPage.css";
import { Link } from "react-router-dom";

const SocialPage = () => {
    const [liveStreams, setLiveStreams] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/streaming/live")
            .then(response => {
                console.log("📡 API 응답 데이터:", response.data);
                setLiveStreams(response.data);
            })
            .catch(error => console.error("Error fetching live streams:", error));
    }, []);

    return (
        <div className="social-container">
            <Header />

            <div className="social-layout">
                <aside className="social-sidebar">
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="/friendslist">친구 목록</a></li>
                            <li><a href="/quiz">퀴즈</a></li>
                            <li><Link to="/streaming">스트리밍</Link></li>
                            <li><a href="/challenge">첼린지</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="social-content">
                    <p>현재 진행 중인 스트리밍 목록입니다.</p>
                    <div className="streaming-list">
                        {liveStreams.length === 0 ? (
                        <p>현재 진행 중인 스트리밍이 없습니다.</p>
                        ) : (
                            
                            liveStreams.map(stream => (
                                stream.public && ( // public이 true일 때만 표시
                                    <div key={stream.id} className="stream-card">
                                        <h3>스트리밍 호스트 ID: {stream.hostUserId}</h3>
                                        <p>플레이리스트: {stream.playlistName}</p>
                            
                                        <div className="chat-box">
                                            <p><strong>마지막 채팅:</strong> (최근 채팅 내용 표시)</p>
                                            <button className="join-button">입장</button>
                                        </div>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SocialPage;
