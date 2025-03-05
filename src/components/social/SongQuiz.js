import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/SongQuiz.css';
import Header from '../common/Header';
import SidebarLayout from '../common/SidebarLayout';
import Nav from '../common/Nav';

const SongQuiz = () => {
    const [artist, setArtist] = useState('');
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [play, setPlay] = useState(false);
    const [hintVisible, setHintVisible] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const accessToken = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
    
    const [deviceId, setDeviceId] = useState(null);
    const [isTrackPlaying, setIsTrackPlaying] = useState(false);

    const [matchedSongs, setMatchedSongs] = useState([]);


    // ✅ Web Playback SDK 초기화
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "SongQuiz Web Player",
                getOAuthToken: (cb) => { cb(accessToken); },
                volume: 0.5
            });
            
            player.addListener("ready", ({ device_id }) => {
                console.log("✅ Web Playback SDK 활성화됨, Device ID:", device_id);
                setDeviceId(device_id);
                transferPlayback(device_id); // 디바이스 전환
            });
        
            player.addListener("not_ready", ({ device_id }) => {
                console.log("❌ 디바이스 준비 안됨:", device_id);
            });
        
            player.addListener("initialization_error", ({ message }) => {
                console.error("초기화 오류:", message);
            });
        
            player.addListener("authentication_error", ({ message }) => {
                console.error("인증 오류:", message);
            });
        
            player.connect();
        };
    }, [accessToken]);

    // ✅ 디바이스 활성화 함수
    const transferPlayback = async (device_id) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    device_ids: [device_id],
                    play: false,
                }),
            });
            console.log(`🎧 디바이스 활성화 성공: ${device_id}`);
        } catch (error) {
            console.error("🔴 디바이스 활성화 실패:", error);
        }
    };

    // ✅ 사용 가능한 Spotify 디바이스 가져오기
    const getAvailableDevices = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("사용 가능한 디바이스:", data);

            const localDevice = data.devices.find(device => device.name.includes("Web Player") || device.is_active);

            if (localDevice) {
                setDeviceId(localDevice.id);
                console.log(`🎵 사용 중인 디바이스: ${localDevice.name}`);
                transferPlayback(localDevice.id); // ✅ 자동 디바이스 전환 추가
            } else {
                console.error("❌ Spotify 디바이스가 없습니다. 웹 플레이어나 데스크톱 앱을 실행하세요.");
            }
        } catch (error) {
            console.error("디바이스 가져오기 실패:", error);
        }
    };

    useEffect(() => {
        getAvailableDevices();
    }, []);

    // ✅ 트랙 재생 기능
    const playTrackAtPosition = async (position, duration) => {
        if (!currentTrack || !deviceId) {
            console.error("❌ 트랙 또는 디바이스 ID 없음");
            return;
        }

        try {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: [currentTrack.uri],
                    position_ms: position,
                }),
            });

            console.log(`🎵 ${position / 1000}초부터 재생 시작!`);

            // duration(1초 or 3초) 후 자동 정지
            setTimeout(async () => {
                await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(`⏸️ ${duration / 1000}초 후 자동 정지됨!`);
            }, duration);
        } catch (error) {
            console.error("🔴 재생 중 오류 발생:", error);
        }
    };

    // ✅ 1초 동안 재생
    const playTrack = () => {
        if (isTrackPlaying) return;
        setIsTrackPlaying(true);
        playTrackAtPosition(60000, 1000);  // 1초 동안 재생
        setTimeout(() => setIsTrackPlaying(false), 1000);

        // 20초 후 힌트 버튼 활성화
        setTimeout(() => setHintVisible(true), 20000);
    };

    // ✅ 힌트 (3초)
    const playHint = () => {
        playTrackAtPosition(60000, 3000); // 3초 동안 재생
    };

    const handleArtistSearch = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/api/spotify/searchArtist?query=${encodeURIComponent(artist)}`);
            console.log("검색 결과:", response.data);
    
            if (response.data?.tracks?.length > 0) {
                setTracks(response.data.tracks);
                setCurrentTrack(response.data.tracks[0]);
            } else {
                console.log("트랙이 없습니다.");
            }
        } catch (error) {
            console.error("아티스트 검색 실패:", error);
        }
    };

    const handleAnswerSubmit = async () => {
        const normalizedInput = userAnswer.trim().toLowerCase();
        const normalizedTitle = currentTrack.name.toLowerCase();
    
        try {
            // 대체 제목을 가져오는 API 호출
            console.log(`/api/sometitle 요청: title=${currentTrack.name}`);
            const response = await axiosInstance.get('/api/sometitle', {
                params: { title: currentTrack.name },
            });
            console.log(`/api/sometitle 응답:`, response.data);
    
            const alternativeTitles = response.data || [];
            const normalizedAlternatives = alternativeTitles.map(title => title.trim().toLowerCase());
    
            // 정답 확인
            if (normalizedInput === normalizedTitle || normalizedAlternatives.includes(normalizedInput)) {
                alert("정답입니다! 같은 아티스트의 다른 곡을 맞춰보세요.");
                setUserAnswer(""); // 입력 초기화
    
                // 맞춘 노래를 matchedSongs에 추가
                setMatchedSongs(prev => [...prev, currentTrack.name]);
    
                // 다음 곡으로 이동
                const nextTrackIndex = tracks.findIndex(track => track.id === currentTrack.id) + 1;
                if (nextTrackIndex < tracks.length) {
                    setCurrentTrack(tracks[nextTrackIndex]);
                    setHintVisible(false);
                } else {
                    console.log("🎉 퀴즈 종료");
                }
            } else {
                alert("틀렸습니다. 다시 시도해 보세요.");
                setUserAnswer(""); // 입력 초기화
            }
        } catch (error) {
            console.error("대체 제목을 가져오는 중 오류 발생:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    return (
    <div className="song-quiz-container">
        <Header />
        <SidebarLayout>
        <div className="song-quiz-social-layout">
            <div className="song-quiz">
                <h2 className="song-quiz-title">1초 듣고 노래 맞추기 Quiz !</h2>
                <h4>1초 동안 나오는 노래를 잘 듣고 <br />
                        노래 제목을 맞춰보세요 !
                </h4>
                <div className="artistSelect">   
                <input
                    type="text"
                    placeholder="아티스트 이름 입력"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <button className="song-quiz-button" onClick={handleArtistSearch}>검색</button>
                </div>
                {currentTrack && (
                    <div className="SendBtn">
                        <input
                            type="text"
                            placeholder="곡 제목을 입력하세요"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                        <button className="song-quiz-button" onClick={handleAnswerSubmit}>정답 제출</button>
                        <button className="song-quiz-button" onClick={playTrack}>재생</button>
                        {hintVisible && <button className="song-quiz-button" onClick={playHint}>힌트</button>}
                    </div>
                )}
            </div>
        <Nav />
        </div>
        </SidebarLayout>
    </div>
    );
};

export default SongQuiz;
