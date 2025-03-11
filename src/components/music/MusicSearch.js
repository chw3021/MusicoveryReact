import React, { useState } from "react";
import "../../styles/MusicSearch.css";
import Music from "./Music";
import useMusicSearch from "../../hooks/useMusicSearch";

const MusicSearch = ({ onSelectTrack }) => {
    const {
        keyword,
        setKeyword,
        results,
        handleSearch,
        isPremium,
    } = useMusicSearch();

    const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부 상태 추가

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
        setHasSearched(true); // 검색 실행 후 상태 업데이트
    };

    return (
        <div className="music-search">
            {isPremium}
            <form onSubmit={handleSubmit}> {/* 폼 제출 핸들러 변경 */}
                <input
                    className="music-search-input"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="음악 검색"
                />
                <button type="submit">🔎</button>
            </form>
            <div className="music-search-results">
                {!hasSearched && results.length === 0 ? ( // 검색 실행 여부와 결과 유무에 따라 조건부 렌더링
                    <div className="music-search-placeholder">검색어 입력...</div>
                ) : (
                    results.map((track, index) => (
                        <div key={track.id} onClick={() => onSelectTrack(track)}>
                            <Music 
                                track={track}
                                isPremium={isPremium} 
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MusicSearch;