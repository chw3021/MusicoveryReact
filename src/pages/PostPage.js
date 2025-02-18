import React, { useState } from "react";
import Header from "../components/common/Header";
import SocialHeader from "../components/common/SocialHeader";
import PostList from "../components/post/PostList";
import "../styles/PostPage.css";

const PostPage = () => {
    const [posts, setPosts] = useState([
        // 예시 데이터
        { number: 1, title: "첫 번째 게시글", author: "작성자1", date: "2023-01-01", views: 100 },
        { number: 2, title: "두 번째 게시글", author: "작성자2", date: "2023-01-02", views: 200 },
        // 더 많은 게시글 데이터 추가 가능
    ]);

    return (
        <div className="post-page">
            <Header />
            <SocialHeader />
            <div className="post-list-container">
                <PostList posts={posts} />
            </div>
            <div className="pagination">
                <button className="page-button">이전</button>
                <span className="page-number">1</span>
                <button className="page-button">다음</button>
            </div>
            <button className="write-button">작성</button>
        </div>
    );
};

export default PostPage;