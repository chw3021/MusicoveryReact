import React, { useState, useEffect, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../../styles/SpotifySDKPlayer.css';
import { TrackContext } from '../../context/TrackContext';

const SpotifySDKPlayer = ({ accessToken, track, onDeviceReady, onPlaybackState }) => {
  const { isPlaying, setIsPlaying } = useContext(TrackContext); // 재생 상태 및 설정 함수 가져오기
  const [play, setPlay] = useState(isPlaying); // 로컬 재생 상태를 Context 상태와 동기화
  const [error, setError] = useState(null);

  useEffect(() => {
    setPlay(isPlaying); // Context의 재생 상태가 변경되면 로컬 상태 업데이트
    setError(null);
  }, [track, isPlaying]);

  useEffect(() => {
    // onPlaybackState 콜백을 통해 재생 상태가 변경될 때 Context 상태 업데이트
    onPlaybackState && onPlaybackState({ isPlaying });
  }, [isPlaying, onPlaybackState]);

  if (!accessToken) return null;

  return (
    <div className="spotify-player-controls">
      {error && <div className="error-message">{error}</div>}
      {track && (
        <SpotifyPlayer
          token={accessToken}
          uris={[track.uri]}
          play={play}
          autoPlay={false}
          callback={(state) => {
            setIsPlaying(state.isPlaying); // 재생 상태 변경 시 Context 상태 업데이트
            setPlay(state.isPlaying); // 로컬 상태도 업데이트
            onPlaybackState(state); // 재생 상태 업데이트
          }}
          onError={(err) => {
            console.error("Spotify Player 오류:", err);
            if (err.message.includes("403")) {
              window.open(track.external_urls.spotify, '_blank');
              setError("해당 트랙은 현재 재생할 수 없습니다. Spotify에서 확인하세요.");
            } else {
              setError("음악 재생 중 오류가 발생했습니다.");
            }
          }}
          styles={{
            activeColor: '#fff',
            bgColor: '#282828',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
          preloadData={true}
          persistDeviceSelection={true}
          magnifySliderOnHover={true}
        />
      )}
    </div>
  );
};

export default SpotifySDKPlayer;