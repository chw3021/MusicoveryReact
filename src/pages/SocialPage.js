import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/common/Header";
import JoinChat from "../components/social/JoinChat"; // ✅ JoinChat 컴포넌트 추가
import Nav from "../components/common/Nav";
import defaultImage from "../assets/defaultImage.png"; 
import SidebarLayout from "../components/common/SidebarLayout";
import "../styles/SocialPage.css";


const SocialPage = () => {
    const [liveStreams, setLiveStreams] = useState([]);

    // 🔄 스트리밍 목록 불러오기 함수
    const fetchLiveStreams = () => {
        axiosInstance.get("/api/streaming/live")
            .then(response => {
                console.log("📡 API 응답 데이터:", response.data);
                // 임시로 모든 스트리밍 항목의 public 필드를 true로 설정
                const modifiedData = response.data.map(stream => ({ ...stream, public: true }));
                setLiveStreams(modifiedData);
            })
            .catch(error => console.error("❌ 스트리밍 목록 불러오기 실패:", error));
    };

    // ✅ 5초마다 스트리밍 목록 갱신 (자동 새로고침)
    useEffect(() => {
        fetchLiveStreams(); // 최초 실행
        const interval = setInterval(fetchLiveStreams, 5000); // 5초마다 갱신
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    return (
        <div className="social-container">
            <Header />

            <SidebarLayout>

            <div className="social-layout-container">
                <div className="social-content">
                    <p className="textplace">현재 진행 중인 스트리밍 채팅방 목록입니다.</p>
                    <div className="streaming-list">
                        {liveStreams.length === 0 ? (
                            <p className="textplace">현재 진행 중인 스트리밍이 없습니다.</p>
                        ) : (
                            liveStreams.map(stream => (
                                stream.public && ( // public이 true일 때만 표시
                                <div className="ViewStyle">  
                                    <div key={stream.id} className="stream-card">
                                        <div className="grapplace">
                                            <div className="sectionleft">   
                                                <img src={defaultImage} alt="defaultImage" id="defaultImageStyle" />
                                            </div> 
                                            <div className="sectionright">   
                                                <p id="TitlePlace">{stream.playlist.playlistTitle}</p>
                                                <h5 id="placebottom">스트리밍 호스트 ID: {stream.hostUser.nickname}</h5>
                                             </div> 
                                        </div>

                                        <div className="chat-box">
                                            <p><strong>마지막 채팅:</strong> {stream.lastMessage ? stream.lastMessage : "메시지가 없습니다."}</p>
                                            
                                            <JoinChat streamId={stream.id} /> {/* ✅ JoinChat 버튼 사용 */}
                                        </div>
                                    </div>
                                </div>      
                                )
                            ))
                        )}
                    </div>
                    
                </div>
                <Nav />
            </div>
            </SidebarLayout>
        </div>
    );
};

export default SocialPage;