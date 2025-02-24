import React, { useEffect, useState } from "react";
import "../../styles/PostDetail.css";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music";
import { useNavigate } from "react-router-dom";
import { parseTracks } from "../../utils/trackUtils";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 임포트

const PostDetail = ({ post, onBack }) => {
    const [playlist, setPlaylist] = useState(null);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가
    const [isLiking, setIsLiking] = useState(false); // 좋아요 상태 추가
    const navigate = useNavigate();
    const userInfo = useUserInfo(); 

    useEffect(() => {
        console.log("User info:", userInfo); // userInfo 로깅 추가
    }, [userInfo]);
    
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/detail/${post.playlist.playlistId}`);
                const trackList = parseTracks(response.data.tracks);
                setPlaylist({
                    ...response.data.playlist,
                    tracksData: trackList,
                    playlistPhoto: response.data.playlist.playlistPhoto || "/images/default.png", // 기본 이미지 설정
                });
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };

        const fetchReplies = async () => {
            try {
                const response = await axiosInstance.get(`/post/reply/${post.id}`);
                setReplies(response.data);
                console.log("Fetched replies:", response.data); // 로깅 추가
            } catch (error) {
                console.error("Error fetching replies", error);
            }
        };

        const fetchLikeCount = async () => {
            try {
                const response = await axiosInstance.get(`/post/like/${post.id}`);
                setLikeCount(response.data);
            } catch (error) {
                console.error("Error fetching like count", error);
            }
        };

        if (post.playlist) {
            fetchPlaylist();
        }
        fetchReplies();
        fetchLikeCount();
    }, [post.playlist, post.id]);

    const handleLike = async () => {
        setIsLiking(true); // 좋아요 상태 시작
        try {
            // 프론트엔드에서 먼저 값을 변경
            const newLikeCount = likeCount + (isLiking ? -1 : 1);
            setLikeCount(newLikeCount);

            await axiosInstance.post(`/post/like/${post.id}`, {}, {
                params: { userId: userInfo.userId },
            });

            // 백엔드에서 실제 값을 가져와서 업데이트
            const response = await axiosInstance.get(`/post/like/${post.id}`);
            setLikeCount(response.data);
        } catch (error) {
            console.error("Error liking post", error);
        } finally {
            setIsLiking(false); // 좋아요 상태 종료
        }
    };

    const handleReplySubmit = async () => {
        if (!newReply.trim()) return;
        setIsSubmitting(true); // 로딩 상태 시작
        try {
            await axiosInstance.post(`/post/reply/${post.id}`, null, {
                params: { userId: userInfo.userId, content: newReply },
            });
            setReplies([...replies, { user: userInfo, content: newReply }]);
            setNewReply("");
        } catch (error) {
            console.error("Error adding reply", error);
        } finally {
            setIsSubmitting(false); // 로딩 상태 종료
        }
    };

    return (
        <div className="post-detail">
            <div className="post-meta">
                <span>조회수: {post.viewCount}</span>
                <button className="back-button" onClick={onBack}>뒤로가기</button>
                <button className="like-button" onClick={handleLike} disabled={isLiking}>
                    {isLiking ? "좋아요 반영 중..." : `👍 ${likeCount}`}
                </button>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="post-meta">
                <span>작성일: {new Date(post.createdDate).toLocaleDateString()}</span>
                <span>작성자: {post.user.nickname}</span>
            </div>

            {playlist ? (
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
            ) : (
                <p>로딩중...</p>
            )}

            {/* 댓글 창 */}
            <div className="comments-section">
                <h3>댓글</h3>
                <div className="comment-input">
                    <textarea 
                        value={newReply} 
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                    />
                    <button onClick={handleReplySubmit} disabled={isSubmitting}>
                        {isSubmitting ? "댓글 작성 중..." : "댓글 작성"}
                    </button>
                </div>
                <div className="comments-list">
                    {replies.length > 0 ? (
                        replies.map((reply, index) => (
                            <div key={index} className="comment">
                                <span className="comment-author">{reply.user.nickname}:</span>
                                <span className="comment-content">{reply.content}</span>
                            </div>
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;