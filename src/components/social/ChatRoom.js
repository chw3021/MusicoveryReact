import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../common/Header";
import Nav from "../common/Nav";
import axiosInstance from "../../api/axiosInstance";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "../../styles/ChatRoom.css";
import { parseTracks } from "../../utils/trackUtils";
import Music from "../music/Music";
import { getDefaultImage } from "../../utils/imageUtils";

const ChatRoom = () => {
    const { streamId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);
    const [stream, setStream] = useState(null);
    const [client, setClient] = useState(null);
    const messagesEndRef = useRef(null); // 메시지 끝 참조
    const [playlist, setPlaylist] = useState(null); // 플레이리스트 상태 추가
    const [isOpen, setIsOpen] = useState(false); // 상태 추가

    const toggleStreamingTracks = () => {
        setIsOpen(!isOpen); // 상태 토글
    };

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const response = await axiosInstance.get(`/api/streaming/${streamId}`);
                setStream(response.data);
            } catch (error) {
                console.error("스트리밍 정보를 가져오는 데 실패:", error);
            }
        };

        // 로그인한 유저 정보 가져오기
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/api/spotify/userInfo");
                setUser(response.data);
            } catch (error) {
                console.error("유저 정보를 가져오는 데 실패:", error);
            }
        };

        fetchStream();
        fetchUser();
        
        // SockJS를 사용하여 WebSocket 설정
        const socket = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
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

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (stream && stream.playlist) {
                try {
                    const response = await axiosInstance.get(`/playlist/detail/${stream.playlist.playlistId}`);
                    const trackList = parseTracks(response.data.tracks);
                    setPlaylist({
                        ...response.data.playlist,
                        tracksData: trackList,
                        playlistPhoto: response.data.playlist.playlistPhoto || getDefaultImage(), // 기본 이미지 설정
                    });
                } catch (error) {
                    console.error("Error fetching playlist detail", error);
                }
            }
        };

        fetchPlaylist();
    }, [stream]); // stream이 변경될 때마다 호출

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
                            <h2 className="chat-title">
                                {stream ? `${stream.hostUser?.nickname}의 스트리밍` : "로딩 중..."}
                                <Link to="/social"><button>나가기</button></Link>
                            </h2>
                        </div>

                        {playlist ? ( // playlist 상태 사용
                            <div className="playlist-info">
                                <div className="playlist-info-place">
                                    <p id="explain"><strong>설명:</strong> {playlist.playlistComment || "설명이 없습니다."}</p>
                                    <p><strong>트랙 수:</strong> {playlist.tracksData ? playlist.tracksData.length : 0}곡</p>
                                    <button onClick={toggleStreamingTracks}>
                                        {isOpen ? '접기' : '펼쳐보기'} {/* 버튼 텍스트 변경 */}
                                    </button>
                                    </div> 
                                        {isOpen && ( // 조건부 렌더링
                                        <div className="content-nav2">
                                            <div className="streaming-tracks">
                                                {playlist.tracksData.map((track, index) => (
                                                    <Music key={index} track={track} />
                                                ))}
                                            </div>
                                            
                                        </div>
                                       
                                    )}
                                </div>
                        ) : (
                            <p className="playlist-info-place">플레이리스트 정보가 없습니다.</p>
                        )}
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
