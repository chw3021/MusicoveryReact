import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import Nav from "../common/Nav";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/ChatRoom.css";

const ChatRoom = () => {
    const { streamId } = useParams(); // URL에서 streamId 가져오기
    const [messages, setMessages] = useState([]); // 채팅 메시지 목록
    const [newMessage, setNewMessage] = useState(""); // 입력한 메시지
    const [user, setUser] = useState(null); // 현재 로그인한 유저 정보
    const [stream, setStream] = useState(null); // 현재 스트리밍 정보

    // 현재 스트리밍 정보 가져오기
    useEffect(() => {
        axiosInstance.get(`/api/streaming/${streamId}`)
            .then(response => {
                console.log("📡 스트리밍 API 응답 데이터:", response.data);
                setStream(response.data);
                console.log("📡 스트리밍 데이터:", response.data); // stream 데이터 콘솔 로그
            })
            .catch(error => console.error("❌ 스트리밍 정보를 가져오는 데 실패:", error));
    }, [streamId]);

    // ✅ 로그인한 유저 정보 가져오기
    useEffect(() => {
        axiosInstance.get("/api/spotify/userInfo") // 사용자 정보 API 호출
            .then(response => {
                console.log("👤 유저 데이터:", response.data);
                setUser(response.data);
            })
            .catch(error => console.error("❌ 유저 정보를 가져오는 데 실패:", error));
    }, []);

    // ✅ 채팅 메시지 가져오기
    useEffect(() => {
        axiosInstance.get(`/api/chat/${streamId}`)
           .then(response => {
              console.log("💬 기존 채팅 데이터:", response.data);
              setMessages(response.data);
        })
        .catch(error => console.error("❌ 채팅 데이터를 가져오는 데 실패:", error));
    }, [streamId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
    
        const messageData = {
            streamId,
            sender: user ? user.display_name : "Unknown User", // 현재 사용자 닉네임을 display_name으로 설정
            content: newMessage,
            receiver: "receiver_nickname", // 수신자 닉네임 또는 ID를 여기 설정
            roomId: streamId // room_id를 streamId로 설정 (적절한 값으로 수정 가능)
        };
    
        console.log("✉️ 전송할 메시지 데이터:", messageData);
        console.log("현재 사용자:", user); // 현재 사용자 확인
    
        axiosInstance.post("/api/chat/send", messageData)
            .then(() => {
                setMessages(prevMessages => [...prevMessages, messageData]); // 기존 메시지 유지하며 추가
                setNewMessage(""); // 입력 필드 초기화
            })
            .catch(error => console.error("❌ 메시지 전송 실패:", error));
    };

    const messageData = {
        streamId,
        sender: user ? user.nickname : "Unknown User", // 현재 사용자 닉네임
        content: newMessage,
        receiver: "receiver_nickname", // 수신자 닉네임 또는 ID를 여기 설정
        roomId: streamId // room_id를 streamId로 설정 (적절한 값으로 수정 가능)
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage(); // Enter 키를 눌렀을 때 메시지 전송
        }
    };

    return (
        <div className="chat-container">
            <Header />
            <Nav />

            <div className="chat-content">
                <h2>채팅방: {stream ? `${stream.hostUser?.nickname}의 스트리밍` : "로딩 중..."}</h2>
                <p>플레이리스트: {stream ? stream.playlist?.playlistTitle : "로딩 중..."}</p>

                <div className="chat-box">
                    {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender === user?.display_name ? "mine" : "other"}`}
                            >
                            <strong>{msg.sender}:</strong> {msg.content}
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown} // Enter 키 처리
                        placeholder="메시지를 입력하세요..."
                    />
                    <button onClick={sendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;