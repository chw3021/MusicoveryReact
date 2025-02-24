import React, { useState, useEffect, useCallback } from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/PostBody.css";
import { useLocation, useNavigate } from 'react-router-dom';

const PostBody = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('title');

    const navigate = useNavigate();
    const location = useLocation();

    // URL 파라미터 초기화
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPage(parseInt(params.get('page') || '0', 10));
        setSortOption(params.get('sort') || 'latest');
        setSearchType(params.get('searchType') || 'title');
        setSearchKeyword(params.get('keyword') || '');
    }, [location.search]);

    const fetchPosts = useCallback(async (currentPage, sort, searchType, keyword) => {
        try {
            setIsLoading(true);
            let url = `/post/list?page=${currentPage}&size=15`;
            if (sort) url += `&sort=${sort}`;
            if (searchType && keyword) url += `&searchType=${searchType}&keyword=${keyword}`;

            const response = await axiosInstance.get(url);
            // playlistPostDTOList가 없을 경우 빈 배열로 처리
            setPosts(response.data._embedded?.playlistPostDTOList || []);
            setTotalPages(response.data.page.totalPages);
        } catch (error) {
            console.error("Failed to fetch posts", error);
            setPosts([]);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(page, sortOption, searchType, searchKeyword);
    }, [page, sortOption, fetchPosts]);

    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('sort', sortOption);
        params.set('searchType', searchType);
        params.set('keyword', searchKeyword);
        navigate(`?${params.toString()}`, { replace: true });
    }, [page, sortOption, searchType, searchKeyword, navigate]);

    useEffect(() => {
        updateURL();
    }, [page, sortOption, searchType, searchKeyword, updateURL]);

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
            fetchPosts(page, sortOption, searchType, searchKeyword); // 게시글 생성 후 현재 페이지 새로고침
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setPage(0); // 정렬 변경 시 페이지 초기화
    };

    const handleSearch = (newSearchType, newSearchKeyword) => {
        setSearchType(newSearchType);
        setSearchKeyword(newSearchKeyword);
        setPage(0);
        fetchPosts(0, sortOption, newSearchType, newSearchKeyword); // 검색 시 fetchPosts 실행
    };

    // 페이지 변경 시 스크롤 최상단으로 이동
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
                    <PostList
                        posts={posts}
                        onSelectPost={handleSelectPost}
                        onSortChange={handleSortChange}
                        onSearch={handleSearch}
                        sortOption={sortOption}
                        searchKeyword={searchKeyword}
                        searchType={searchType}
                    />
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