import React from "react";
import WebPlayback from "./WebPlayback";
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
        deviceId,
    } = useMusicSearch();

    return (
        <div className="music-search">
            {isPremium && <WebPlayback />}
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
                {results.map((track) => (
                    <div key={track.id} onClick={() => onSelectTrack(track)}>
                        <Music 
                            track={track} 
                            deviceId={deviceId} 
                            isPremium={isPremium} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicSearch;