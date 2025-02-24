import React, { useState } from "react";
import PostItem from "./PostItem";
import "../../styles/PostList.css";

const PostList = ({ posts, onSelectPost, onSortChange, onSearch, sortOption, searchKeyword, searchType }) => {
    const [localSearchKeyword, setLocalSearchKeyword] = useState(searchKeyword);
    const [localSearchType, setLocalSearchType] = useState(searchType);

    const handleSortChange = (e) => {
        const newSortOption = e.target.value;
        onSortChange(newSortOption); // PostBody로 정렬 옵션 전달
    };

    const handleSearchKeywordChange = (e) => {
        setLocalSearchKeyword(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setLocalSearchType(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(localSearchType, localSearchKeyword); // PostBody로 검색 조건 전달
    };

    return (
        <div className="post-list">
            <div className="list-options">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <select value={localSearchType} onChange={handleSearchTypeChange}>
                        <option value="title">제목</option>
                        <option value="description">내용</option>
                        <option value="author">작성자</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={localSearchKeyword}
                        onChange={handleSearchKeywordChange}
                    />
                    <button type="submit">검색</button>
                </form>
                <div className="sort-options">
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="latest">최신순</option>
                        <option value="oldest">오래된순</option>
                        <option value="popular">조회수순</option>
                    </select>
                </div>
            </div>
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