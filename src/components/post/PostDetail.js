import React, { useEffect, useState } from "react";
import "../../styles/PostDetail.css";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music"; // Music 컴포넌트 임포트
import { useNavigate } from "react-router-dom";
import { parseTracks } from "../../utils/trackUtils"; // parseTracks 유틸 함수 임포트

const PostDetail = ({ post, onBack }) => {
    const [playlist, setPlaylist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/detail/${post.playlist.playlistId}`);
                
                // tracks 데이터를 파싱하고 변환
                const trackList = parseTracks(response.data.tracks);
                
                setPlaylist({
                    ...response.data.playlist,
                    tracksData: trackList,
                });
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };

        if (post.playlist) {
            fetchPlaylist();
        }
    }, [post.playlist]);

    return (
        <div className="post-detail">
            <div className="post-meta">
                <span>조회수: {post.viewCount}</span>
                <button className="back-button" onClick={onBack}>뒤로가기</button>
                <span>좋아요: {post.likeCount}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div>
                <span>작성일: {new Date(post.createdDate).toLocaleDateString()}</span>
                <span>작성자: {post.user.nickname}</span>
            </div>
            
            {playlist && (
                <div className="playlist-detail">
                    <h3>플레이리스트 정보</h3>
                    <p>제목: {playlist.playlistTitle}</p>
                    <p>설명: {playlist.playlistComment}</p>
                    <p>작성일: {new Date(playlist.playlistDate).toLocaleDateString()}</p>
                    <img src={playlist.playlistPhoto} alt="Playlist" />
                    <div className="playlist-tracks">
                        {playlist.tracksData.map((track, index) => (
                            <Music key={index} track={track} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;