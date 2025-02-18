import React from "react";
import "../../styles/PostItem.css";

const PostItem = ({ post }) => {
    return (
        <div className="post-item">
            <div className="post-number">{post.number}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-author">{post.author}</div>
            <div className="post-date">{post.date}</div>
            <div className="post-views">{post.views}</div>
            <div className="post-report">
                <button className="report-button">신고</button>
            </div>
        </div>
    );
};

export default PostItem;