import React, { useState } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";
import "../../styles/MusicSearch.css";
import axiosInstance from "../../api/axiosInstance";

const MusicSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/api/spotify/search?keyword=${keyword}&type=track`);
            setResults(response.data.tracks.items);
        } catch (error) {
            console.error("Failed to search music", error);
        }
    };

    const handlePlay = async (trackId) => {
        try {
            await axiosInstance.get(`/music/play?musicId=${trackId}`);
            setPlayingTrack(trackId);
        } catch (error) {
            console.error("Failed to play music", error);
        }
    };

    return (
        <div className="music-search">
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
                    <div key={track.id} className="track-item">
                        <img src={track.album.images[0].url} alt={track.name} />
                        <div className="track-info">
                            <h4>{track.name}</h4>
                            <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                        </div>
                        <button onClick={() => handlePlay(track.id)}>재생</button>
                    </div>
                ))}
            </div>
            {playingTrack && <MusicPlayer trackId={playingTrack} />}
        </div>
    );
};

export default MusicSearch;