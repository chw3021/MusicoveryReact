import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import "../../styles/MusicSearch.css";
import axiosInstance from "../../api/axiosInstance";
import { play } from "./spotifyPlayer";
import Music from "./Music";

const MusicSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState(null);
    const [audioPlayer, setAudioPlayer] = useState(new Audio());
    const [isPremium, setIsPremium] = useState(false);
    const [player, setPlayer] = useState(null);

    // Premium 상태 확인
    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
                const response = await axiosInstance.get('/api/spotify/userInfo');
                setIsPremium(response.data.product === 'premium');
            } catch (error) {
                console.error("Failed to check premium status", error);
            }
        };
        checkPremiumStatus();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/api/spotify/search?keyword=${keyword}&type=track`);
            setResults(response.data.tracks.items);
        } catch (error) {
            console.error("Failed to search music", error);
        }
    };

    const handlePlay = async (track) => {
        try {
            if (isPremium) {
                await play({
                    spotify_uri: `spotify:track:${track.id}`,
                    deviceId: player?.deviceId,
                });
                setPlayingTrack(track.id);
            } else {
                window.open(track.external_urls.spotify, '_blank');
            }
        } catch (error) {
            if (error.response?.status === 403) {
                alert('Premium 계정이 필요한 기능입니다.');
                setIsPremium(false);
            } else {
                console.error("Failed to play music", error);
            }
        }
    };

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            audioPlayer.pause();
            audioPlayer.src = '';
        };
    }, []);

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
                    <Music 
                        key={track.id} 
                        track={track} 
                        handlePlay={handlePlay} 
                        isPremium={isPremium} 
                    />
                ))}
            </div>
            {isPremium && <div className="premium-badge">Premium</div>}
        </div>
    );
};

export default MusicSearch;