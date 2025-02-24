import React from "react";
import "../../styles/PostItem.css";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post, onSelectPost }) => {
    const navigate = useNavigate();

    const handleReportClick = (e) => {
        e.stopPropagation(); // PostItem 클릭 이벤트 막기
        navigate('/userreport');
    };

    return (
        <div className={`post-item ${post.isNotice ? 'notice' : ''}`} onClick={() => onSelectPost(post)}>
            <div className="post-number">{post.id}</div>
            <div className="post-title">
                {post.isNotice && <span className="notice-label">[공지]</span>}
                {post.title}
            </div>
            <div className="post-author">{post.user.nickname}</div>
            <div className="post-date">{new Date(post.createdDate).toLocaleDateString()}</div>
            <div className="post-views">{post.viewCount}</div>
            <div className="post-report">
                <button className="report-button" onClick={handleReportClick}>신고</button>
            </div>
        </div>
    );
};

export default PostItem;