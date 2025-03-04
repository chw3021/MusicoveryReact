import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useMusicSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [audioPlayer, setAudioPlayer] = useState(new Audio());
    const [isPremium, setIsPremium] = useState(false);
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);

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
                console.log(devices);
                if (devices.length > 0) {
                    setDeviceId(devices[0].id);
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
            setResults(response.data.tracks.items);
        } catch (error) {
            console.error("Failed to search music", error);
        }
    };

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            audioPlayer.pause();
            audioPlayer.src = '';
        };
    }, []);

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