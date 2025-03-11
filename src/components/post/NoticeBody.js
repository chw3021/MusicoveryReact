import React, { useState, useEffect, useCallback } from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";
import "../../styles/PostBody.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosInstance";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 임포트

const NoticeBody = () => {
    const [noticePosts, setNoticePosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('title');
    const userInfo = useUserInfo(); // 사용자 정보 가져오기

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPage(parseInt(params.get('page') || '0', 10));
        setSortOption(params.get('sort') || 'latest');
        setSearchType(params.get('searchType') || 'title');
        setSearchKeyword(params.get('keyword') || '');
    }, [location.search]);

    const fetchNoticePosts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/post/notices?page=0&size=15');
            setNoticePosts(response.data._embedded?.playlistPostDTOList || []);
            setTotalPages(response.data.page.totalPages);
        } catch (error) {
            console.error("Failed to fetch notice posts", error);
            setNoticePosts([]);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
        console.log(userInfo);
    }, [userInfo]);

    useEffect(() => {
        fetchNoticePosts();
    }, [page, sortOption, fetchNoticePosts]);

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

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setPage(0);
    };

    const handleSearch = (newSearchType, newSearchKeyword) => {
        setSearchType(newSearchType);
        setSearchKeyword(newSearchKeyword);
        setPage(0);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (isCreating) {
        return (
            <PostForm
                onSubmit={() => {
                    setIsCreating(false);
                    fetchNoticePosts();
                }}
                onCancel={handleBack}
                isNoticeForm={true} // 공지 작성 폼임을 나타내는 prop 추가
            />
        );
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
                        posts={noticePosts}
                        onSelectPost={handleSelectPost}
                        onSortChange={handleSortChange}
                        onSearch={handleSearch}
                        sortOption={sortOption}
                        searchKeyword={searchKeyword}
                        searchType={searchType}
                        isNoticeList={true}
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
                        {userInfo && userInfo.admin && (
                            <button
                                className="write-button"
                                onClick={() => setIsCreating(true)}
                            >
                                작성
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default NoticeBody;