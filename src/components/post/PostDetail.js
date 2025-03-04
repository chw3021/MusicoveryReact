import React, { useEffect, useState } from "react";
import "../../styles/PostDetail.css";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music";
import { useNavigate } from "react-router-dom";
import { parseTracks } from "../../utils/trackUtils";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 임포트
import { getImageUrl } from "../../utils/imageUtils";

const PostDetail = ({ post, onBack }) => {
    const [playlist, setPlaylist] = useState(null);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가
    const [isLiking, setIsLiking] = useState(false); // 좋아요 상태 추가
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 추가
    const [isUpdating, setIsUpdating] = useState(false); // 업데이트 상태 추가
    const [editedTitle, setEditedTitle] = useState(post.title); // 수정된 제목 상태
    const [editedDescription, setEditedDescription] = useState(post.description); // 수정된 내용 상태
    const [currentPost, setCurrentPost] = useState(post); // 현재 게시글 상태 추가
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
                    playlistPhoto: getImageUrl(response.data.playlist.playlistPhoto), // 기본 이미지 설정
                });
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };

        const fetchReplies = async () => {
            try {
                const response = await axiosInstance.get(`/post/replies/${post.id}`);
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
            setReplies([...replies, { user: userInfo, content: newReply, createdDate: new Date() }]);
            setNewReply("");
        } catch (error) {
            console.error("Error adding reply", error);
        } finally {
            setIsSubmitting(false); // 로딩 상태 종료
        }
    };
    const handleReplyDelete = async (replyId, currentPostId) => {
        try {
            await axiosInstance.delete(`/post/replydelete/${replyId}`, {
                params: { postId: currentPostId },
            });
            setReplies(replies.filter(reply => reply.id !== replyId));
        } catch (error) {
            console.error("Error deleting reply", error);
        }
    };
    const handleEditClick = () => {
        setIsEditing(true); // 수정 모드 활성화
        setEditedTitle(currentPost.title); // 수정 모드 시작 시 제목 초기화
        setEditedDescription(currentPost.description); // 수정 모드 시작 시 내용 초기화
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await axiosInstance.put(`/post/update/${post.id}`, null, {
                params: {
                    title: editedTitle,
                    description: editedDescription,
                },
            });

            setCurrentPost(prevState => ({
                ...prevState,
                title: editedTitle,
                description: editedDescription,
            }));
            
        } catch (error) {
            console.error("Error updating post", error);
        } finally {
            setIsUpdating(false); // 로딩 상태 종료
            setIsEditing(false); // 수정 모드 비활성화
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) {
            return;
        }
        try {
            await axiosInstance.delete(`/post/delete/${post.id}`);
            window.location.reload();
            
            navigate("/post"); // 삭제 후 페이지로 이동
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false); // 수정 모드 비활성화
        setEditedTitle(currentPost.title); // 수정 전 제목으로 복원
        setEditedDescription(currentPost.description); // 수정 전 내용으로 복원
    };

    return (
        <div className="post-detail">
            <div className="post-meta">
                <div className="post-meta-top">
                    <span>조회수: {currentPost.viewCount}</span>
                    <button className="back-button" onClick={onBack}>뒤로가기</button>
                    <button className="like-button" onClick={handleLike} disabled={isLiking}>
                        {isLiking ? "좋아요 반영 중..." : `👍 ${likeCount}`}
                    </button>
                </div>
                <div className="post-meta-bottom">
                    {/* 수정 및 삭제 버튼 추가 */}
                    {userInfo && currentPost.user.userId === userInfo.userId && (
                        <>
                            {isEditing ? (
                                <>
                                    <button className="post-meta-bottom-button" onClick={handleUpdate}>저장</button>
                                    <button className="post-meta-bottom-button" onClick={handleEditCancel}>취소</button>
                                </>
                            ) : (
                                <>
                                    <button className="post-meta-bottom-button" onClick={handleEditClick} disabled={isUpdating}>
                                        {isUpdating ? "수정 중..." : "수정"}
                                    </button>
                                    <button className="post-meta-bottom-button" onClick={handleDelete}>삭제</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h2>{currentPost.title}</h2>
                    <p>{currentPost.description}</p>
                </>
            )}
            <div className="post-meta-writer">
                <span>작성일: {new Date(currentPost.createdDate).toLocaleDateString()}</span>
                <span>작성자: {currentPost.user.nickname}</span>
            </div>

            {playlist ? (
                <div className="playlist-detail">
                    <h3>플레이리스트 정보</h3>
                    <div className="post-playlist-meta">
                        <img className="post-playlist-meta-image" src={ getImageUrl(playlist.playlistPhoto)} alt="Playlist" />
                        <div className="post-playlist-meta-text">
                            <p>제목: {playlist.playlistTitle}</p>
                            <p>설명: {playlist.playlistComment}</p>
                            <p>작성일: {new Date(playlist.playlistDate).toLocaleDateString()}</p>
                        </div>
                    </div>
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
                <div className="post-comments-list">
                    {replies.length > 0 ? (
                        replies.map((reply, index) => (
                            <div key={index} className="post-comment-item">
                                <div className="post-comment-text">
                                    <span className="comment-author">{reply.user.nickname}:</span>
                                    <span className="comment-content">{reply.content}</span>
                                </div>
                                <div className="post-comment-button">
                                    <div>
                                        {new Date(reply.createdDate).toLocaleDateString()}
                                    </div>
                                    {userInfo && reply.user.userId === userInfo.userId && (
                                        <button onClick={() => handleReplyDelete(reply.id, currentPost.id)}>삭제</button>       
                                    )}                          
                                </div>
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