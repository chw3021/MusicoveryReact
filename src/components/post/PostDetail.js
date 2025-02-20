import React from "react";
import "../../styles/PostDetail.css";

const PostDetail = ({ post, onBack }) => {
    return (
        <div className="post-detail">
            <button className="back-button" onClick={onBack}>뒤로가기</button>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="post-meta">
                <span>제목: {post.title}</span>
                <span>작성자: {post.user}</span>
                <span>작성일: {new Date(post.createdDate).toLocaleDateString()}</span>
                <span>조회수: {post.replyCount}</span>
                <span>좋아요: {post.likeCount}</span>
            </div>
        </div>
    );
};

export default PostDetail;