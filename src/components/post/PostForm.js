import React, { useState, useEffect } from "react";
import "../../styles/PostForm.css";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 임포트
import axiosInstance from "../../api/axiosInstance";
import { getDefaultImage } from "../../utils/imageUtils";

const PostForm = ({ onSubmit, onCancel, isNoticeForm }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const userInfo = useUserInfo(); // 사용자 정보 가져오기
    const [playlists, setPlaylists] = useState([]); // 플레이리스트 목록 상태 추가
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); // 플레이리스트 목록 상태 추가

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isNoticeForm && !selectedPlaylist) {
            alert("플레이리스트를 선택해주세요.");
            return;
        }

        try {
            if (isNoticeForm) {
                const response = await axiosInstance.post(
                    `/post/createnotice?userId=${userInfo.userId}&title=${title}&description=${description}`,
                    {}, // 요청 body는 비워둡니다.
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("MUSICOVERY_TOKEN")}`
                        }
                    }
                );
            } else {
                const response = await axiosInstance.post(
                    `/post/create?userId=${userInfo.userId}&title=${title}&description=${description}&playlistId=${selectedPlaylist.playlistId}`,
                    {} // 요청 body는 비워둡니다.
                );
            }
            onSubmit(); // PostBody에서 fetchPosts를 다시 호출하도록 함
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/user/${userInfo.userId}`);
                console.log(response);
                setPlaylists(response.data);
            } catch (error) {
                console.error("Failed to fetch playlists", error);
            }
        };

        if (userInfo && !isNoticeForm) {
            fetchPlaylists();
        }
    }, [userInfo, isNoticeForm]);

    const onSelectPlaylist = (playlist) => {
        if (selectedPlaylist && selectedPlaylist.playlistId === playlist.playlistId) {
            setSelectedPlaylist(null); // 이미 선택된 아이템을 다시 클릭하면 선택 해제
        } else {
            setSelectedPlaylist(playlist); // 선택된 아이템으로 업데이트
        }
    };

    const defaultImage = getDefaultImage();

    return (
        <div className="post-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                {!isNoticeForm && (
                    <div className="form-group">
                        <label>플레이리스트 선택</label>
                        <div className="postform-playlist-list-container">
                            <div className="postform-playlist-list">
                                {playlists.map((it) => {
                                    // 플레이리스트 이미지가 없을 경우 기본 이미지 사용
                                    const imageUrl = it.playlistPhoto
                                        ? (it.playlistPhoto.startsWith("/images/")
                                            ? `${process.env.REACT_APP_API_URL}${it.playlistPhoto}`
                                            : it.playlistPhoto)
                                        : defaultImage;

                                    return (
                                        <div
                                            key={it.playlistId}
                                            onClick={() => onSelectPlaylist(it)}
                                            className={`postform-playlist-item ${selectedPlaylist && selectedPlaylist.playlistId === it.playlistId ? 'selected' : ''}`}
                                        >
                                            <img src={imageUrl} alt={it.playlistTitle} />
                                            <div className="postform-playlist-info">
                                                <div>{it.playlistTitle}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div className="form-actions">
                    <button type="button" className="postform-cancel-button" onClick={onCancel}>취소</button>
                    <button type="submit" className="postform-submit-button">작성</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;