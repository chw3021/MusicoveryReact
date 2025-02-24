import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../common/Header";
import Nav from "../common/Nav";
import axiosInstance from "../../api/axiosInstance";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "../../styles/ChatRoom.css";

const ChatRoom = () => {
    const { streamId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);
    const [stream, setStream] = useState(null);
    const [client, setClient] = useState(null);
    const messagesEndRef = useRef(null); // 메시지 끝 참조


  
    useEffect(() => {
        // 스트리밍 정보 가져오기
        axiosInstance.get(`/api/streaming/${streamId}`)
            .then(response => setStream(response.data))
            .catch(error => console.error("스트리밍 정보를 가져오는 데 실패:", error));

        // 로그인한 유저 정보 가져오기
        axiosInstance.get("/api/spotify/userInfo")
            .then(response => setUser(response.data))
            .catch(error => console.error("유저 정보를 가져오는 데 실패:", error));

        // SockJS를 사용하여 WebSocket 설정
        const socket = new SockJS("http://localhost:8080/chat");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                login: "user",
                passcode: "password",
            },
            onConnect: () => {
                console.log("STOMP 연결 성공");
                stompClient.subscribe(`/topic/chat/${streamId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error("STOMP 오류:", frame.headers["message"]);
            },
            onWebSocketError: (error) => {
                console.error("WebSocket 오류:", error);
            },
            debug: (str) => {
                console.log(str);
            },
        });

        setClient(stompClient);
        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [streamId]);

    // 메시지가 업데이트될 때마다 스크롤을 아래로 내리는 효과
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // messages 배열이 변경될 때마다 실행

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            streamId,
            sender: user ? user.display_name : "Unknown User",
            content: newMessage,
            receiver: "receiver_nickname",
        };

        if (client && client.connected) {
            client.publish({
                destination: `/app/chat/${streamId}`,
                body: JSON.stringify(messageData),
            });
            setNewMessage("");

            // 마지막 메시지를 스트리밍의 마지막 채팅으로 업데이트하는 API 호출 (추가)
            axiosInstance.post(`/api/streaming/${streamId}/lastMessage`, {
                lastMessage: messageData.content,
            })
            .catch(error => console.error("마지막 메시지를 저장하는 데 실패:", error));
        } else {
            console.error("STOMP 클라이언트가 연결되어 있지 않습니다.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <Header />
            <div className="social-layout">
                <Nav />
                <div>
                    <div className="chat-wrapper">
                    <div className="exit">
                        <Link to="/social"><button>나가기</button></Link>
                    </div>
                        <h2>채팅방: {stream ? `${stream.hostUser?.nickname}의 스트리밍` : "로딩 중..."}</h2>
                        <p>플레이리스트: {stream ? stream.playlist?.playlistTitle : "로딩 중..."}</p>

                        <div className="chat-messages-input-wrapper">
                            <div className="chat-messages">
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`chat-message ${msg.sender === (user ? user.display_name : "Unknown User") ? 'my-message' : 'other-message'}`}
                                        >
                                            <strong>{msg.sender}:</strong> <span>{msg.content}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-messages">메시지가 없습니다.</div>
                                )}
                                <div ref={messagesEndRef} /> {/* 메시지 끝 참조 */}
                            </div>
                            <div className="chat-input">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="메시지를 입력하세요..."
                                />
                                <button onClick={sendMessage}>전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;