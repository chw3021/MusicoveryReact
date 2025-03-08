import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { transferPlayback } from "../components/music/spotifyPlayer";

const useMusicSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [audioPlayer, setAudioPlayer] = useState(new Audio());
    const [isPremium, setIsPremium] = useState(false);
    const [deviceId, setDeviceId] = useState(null);

    // Premium 상태 확인
    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
                const response = await axiosInstance.get('/api/spotify/userInfo');
                setIsPremium(response.data.product === 'premium');
            } catch (error) {
                //console.error("Failed to check premium status", error);
            }
        };
        checkPremiumStatus();
    }, []);

    // 디바이스 ID 설정
    useEffect(() => {
        const fetchDeviceId = async () => {
            try {
                const response = await axiosInstance.get('/music/devices', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('MUSICOVERY_ACCESS_TOKEN')}`
                    }
                });
                const devices = response.data.devices;
                if (devices.length > 0) {
                    setDeviceId(devices[0].id);
                    // 브라우저를 활성 디바이스로 설정
                    await transferPlayback(devices[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch devices", error);
            }
        };
        fetchDeviceId();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/api/spotify/search?keyword=${keyword}&type=track`);
            const filteredResults = response.data.tracks.items.filter(
                (track) => track.is_playable
            );
            setResults(filteredResults);
        } catch (error) {
            console.error("Failed to search music", error);
            setResults([]);
        }
    };

    return {
        keyword,
        setKeyword,
        results,
        handleSearch,
        isPremium,
        deviceId,
    };
};

export default useMusicSearch;