import React from 'react';
import Button from "../common/Button";
import "./ReadMoreItem.css";
import { useNavigate } from "react-router-dom";

const ReadMoreItem = ({ playlistId, playlistTitle, playlistComment, playlistPhoto, playlistDate }) => {
    const navigate = useNavigate();

    // 기본 이미지 설정
    const defaultImage = "/images/default.jpg";  // 기본 이미지 파일 추가 필요

    // playlistPhoto가 null이면 기본 이미지 사용
    const imageUrl = playlistPhoto 
        ? (playlistPhoto.startsWith("/images/") ? `http://localhost:8080${playlistPhoto}` : playlistPhoto)
        : defaultImage;

        
    const handleClick = () => {
        navigate(`/playlist/${playlistId}`); // 세부 정보 페이지로 이동
    };
    return (
        <div className="ReadMoreItem" onClick={handleClick}>
            <img src={imageUrl} alt="Playlist" className="playlistPhoto" />
            <div className="playlistInfo">
                <div className="playlistTitle">{playlistTitle}</div>
                <div className="playlistComment">{playlistComment}</div>
            </div>
            <div className="playlistActions">
                <div className="buttonGroup">
                    <Button text="삭제" link={`/delete/${playlistId}`} />
                </div>
                <div className="playlistDate">{new Date(playlistDate).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default ReadMoreItem;