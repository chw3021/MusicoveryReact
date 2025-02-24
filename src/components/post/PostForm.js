import React, { useState, useEffect } from "react";
import "../../styles/PostForm.css";
import axiosInstance from "../../api/axiosInstance";
import ReadMoreList from "../playlist/ReadMoreList";

const PostForm = ({ onSubmit, onCancel, userId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axiosInstance.get(`/user/${userId}/playlists`);
                setPlaylists(response.data);
            } catch (error) {
                console.error("Failed to fetch playlists", error);
            }
        };

        fetchPlaylists();
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPlaylist) {
            alert("플레이리스트를 선택해주세요.");
            return;
        }
        onSubmit({ title, description, playlistId: selectedPlaylist });
    };

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
                <div className="form-group">
                    <label>플레이리스트 선택</label>
                    <ReadMoreList data={playlists} onSelect={setSelectedPlaylist} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">작성</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;