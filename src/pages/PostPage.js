import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import SocialHeader from "../components/common/SocialHeader";
import PostBody from "../components/post/PostBody";
import axiosInstance from "../api/axiosInstance";
import "../styles/PostPage.css";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (page) => {
        try {
            const response = await axiosInstance.get(`/post/list?page=${page}&size=15`);
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handleCreatePost = (post) => {
        // 게시글 생성 로직 추가
    };

    return (
        <div className="post-page">
            <Header />
            <SocialHeader />
            <div className="post-list-container">
                <PostBody posts={posts} onCreate={handleCreatePost} />
            </div>
            <div className="pagination">
                <button className="page-button" onClick={handlePreviousPage} disabled={page === 0}>
                    이전
                </button>
                <span className="page-number">{page + 1}</span>
                <button className="page-button" onClick={handleNextPage} disabled={page === totalPages - 1}>
                    다음
                </button>
            </div>
            <button className="write-button" onClick={() => setIsCreating(true)}>작성</button>
        </div>
    );
};

export default PostPage;