import React from "react";
import PostItem from "./PostItem";
import "../../styles/PostList.css";

const PostList = ({ posts, onSelectPost }) => {
    return (
        <div className="post-list">
            <div className="post-list-header">
                <div className="post-number">번호</div>
                <div className="post-title">제목</div>
                <div className="post-author">작성자</div>
                <div className="post-date">등록일</div>
                <div className="post-views">조회수</div>
                <div className="post-report">신고</div>
            </div>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onSelectPost={onSelectPost} />
            ))}
        </div>
    );
};

export default PostList;