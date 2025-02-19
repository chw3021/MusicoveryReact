import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/PostBody.css";

const PostBody = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`/post/list?page=${currentPage}&size=15`);
            
            // 새로운 페이지 데이터로 교체
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 변경 시 스크롤 최상단으로 이동
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
            scrollToTop();
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
            scrollToTop();
        }
    };

    const handleSelectPost = (post) => {
        setSelectedPost(post);
    };

    const handleBack = () => {
        setSelectedPost(null);
        setIsCreating(false);
    };

    const handleCreate = async (post) => {
        try {
            await axiosInstance.post('/post', post);
            setIsCreating(false);
            fetchPosts(page); // 게시글 생성 후 현재 페이지 새로고침
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    if (isCreating) {
        return <PostForm onSubmit={handleCreate} onCancel={handleBack} />;
    }

    if (selectedPost) {
        return <PostDetail post={selectedPost} onBack={handleBack} />;
    }

    return (
        <div className="post-body">
            {isLoading ? (
                <div className="loading-spinner">로딩 중...</div>
            ) : (
                <>
                    <PostList posts={posts} onSelectPost={handleSelectPost} />
                    <div className="pagination">
                        <button 
                            className="page-button" 
                            onClick={handlePreviousPage} 
                            disabled={page === 0}
                        >
                            이전
                        </button>
                        <span className="page-number">{page + 1}</span>
                        <button 
                            className="page-button" 
                            onClick={handleNextPage} 
                            disabled={page === totalPages - 1}
                        >
                            다음
                        </button>
                        <button 
                            className="write-button" 
                            onClick={() => setIsCreating(true)}
                        >
                            작성
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostBody;