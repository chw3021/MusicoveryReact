import React, { useState, useContext, useEffect } from 'react';
import SpotifySDKPlayer from '../music/SpotifySDKPlayer';
import '../../styles/SpotifyPlayerWrapper.css';
import { TrackContext } from '../../context/TrackContext';
import axiosInstance from '../../api/axiosInstance';

const SpotifyPlayerWrapper = () => {
  const [deviceId, setDeviceId] = useState('');
  const accessToken = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
  const { currentTrack } = useContext(TrackContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가

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

  const handleDeviceReady = (deviceId) => {
    setDeviceId(deviceId);
  };

  // 재생 상태 업데이트
  const handlePlaybackState = (state) => {
    setIsPlaying(state.isPlaying);
  };

  return (
    <div
      className="spotify-player-wrapper"
      style={{
        height: isHovered ? 'auto' : '8px', // 높이 조절
        backgroundColor: isPlaying && !isHovered ? '#1DB954' : '#282828', // 재생 중일 때 배경색 변경
        transition: 'background-color 0.3s ease, height 0.3s ease', // 부드러운 전환 효과
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPremium && accessToken && (
        <SpotifySDKPlayer
          accessToken={accessToken}
          onDeviceReady={handleDeviceReady}
          track={currentTrack}
          onPlaybackState={handlePlaybackState} // 재생 상태 업데이트
        />
      )}
    </div>
  );
};

export default SpotifyPlayerWrapper;