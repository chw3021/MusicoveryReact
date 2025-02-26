import React from 'react';
import Button from "../common/Button";
import "./ReadMoreItem.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { getImageUrl } from '../../utils/imageUtils';

const ReadMoreItem = ({ playlistId, playlistTitle, playlistComment, playlistPhoto, playlistDate }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/playlist/${playlistId}`); // 세부 정보 페이지로 이동
    };

    const handleDelete = async (e) => {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
        const confirmDelete = window.confirm("정말로 이 플레이리스트를 삭제하시겠습니까?");
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await axiosInstance.delete(`/playlist/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                    playlistId: playlistId,
                },
            });
            console.log(response.data);
            // 삭제 후 플레이리스트 페이지 새로고침
            window.location.reload();
            
            navigate("/PlaylistPage"); // 삭제 후 플레이리스트 페이지로 이동
        } catch (error) {
            console.error("플레이리스트 삭제 실패:", error);
        }
    };

    return (
        <div className="ReadMoreItem" onClick={handleClick}>
            <img src={getImageUrl(playlistPhoto)} alt="Playlist" className="playlistPhoto" />
            <div className="playlistInfo">
                <div className="playlistTitle">{playlistTitle}</div>
                <div className="playlistComment">{playlistComment}</div>
            </div>
            <div className="playlistActions">
                <div className="buttonGroup">
                     <Button text="삭제" onClick={(e) => handleDelete(e)} />
                </div>
                <div className="playlistDate">{new Date(playlistDate).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default ReadMoreItem;