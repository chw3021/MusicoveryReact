import React from "react";
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

    return (
        <div className="music-search">
            {isPremium}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="음악 검색"
                />
                <button type="submit">검색</button>
            </form>
            <div className="search-results">
                {results.map((track, index) => (
                    <div key={track.id} onClick={() => onSelectTrack(track)}>
                        <Music 
                            track={track}
                            isPremium={isPremium} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicSearch;