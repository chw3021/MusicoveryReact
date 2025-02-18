import React from "react";
import "../../styles/PostItem.css";

const PostItem = ({ post, onSelectPost }) => {
    return (
        <div className="post-item" onClick={() => onSelectPost(post)}>
            <div className="post-number">{post.id}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-author">{post.user.username}</div>
            <div className="post-date">{new Date(post.createdDate).toLocaleDateString()}</div>
            <div className="post-views">{post.replyCount}</div>
            <div className="post-report">
                <button className="report-button">신고</button>
            </div>
        </div>
    );
};

export default PostItem;