import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/JoinChat.css"; // 스타일 파일 추가 (필요시)

const JoinChat = ({ streamId }) => {
    const navigate = useNavigate();

    const handleJoinChat = () => {
        if (streamId) {
            navigate(`/chat/${streamId}`); // 채팅방 페이지로 이동
        } else {
            alert("채팅방 정보를 불러오지 못했습니다.");
        }
    };

    return (
        <button className="join-button" onClick={handleJoinChat}>
            입장
        </button>
    );
};

export default JoinChat;
