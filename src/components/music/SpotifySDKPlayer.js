import React, { useState, useEffect, useContext, useRef } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../../styles/SpotifySDKPlayer.css';
import { TrackContext } from '../../context/TrackContext';

const SpotifySDKPlayer = ({ accessToken, track, onPlaybackState, onDeviceReady }) => {
  const { isPlaying, setIsPlaying, setDeviceReady } = useContext(TrackContext); // 재생 상태 및 설정 함수 가져오기
  const [error, setError] = useState(null);
  const playerRef = useRef(null);
  const previousIsPlayingRef = useRef(isPlaying);


  useEffect(() => {
    console.log('isPlaying 상태 변경:', isPlaying);
    
    setError(null);
    // isPlaying이 false로 변경될 때, 노래를 강제로 중지
    if (previousIsPlayingRef.current && !isPlaying && playerRef.current) {
      try {
        // 일시 정지를 위한 직접적인 API 호출
        fetch('https://api.spotify.com/v1/me/player/pause', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }).catch(err => console.error("API 호출 오류:", err));
      } catch (err) {
        console.error("재생 중지 시도 중 오류:", err);
      }
    }
    
    previousIsPlayingRef.current = isPlaying;
  }, [isPlaying, accessToken, track]);

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
          ref={playerRef}
          token={accessToken}
          uris={[track.uri]}
          play={isPlaying}
          syncExternalDevice={true}
          syncExternalDeviceInterval={1}
          callback={(state) => {
            console.log('Spotify Player 상태 변경:', state);
            setIsPlaying(state.isPlaying); // 재생 상태 변경 시 Context 상태 업데이트
            onPlaybackState(state); // 재생 상태 업데이트
            if(state.deviceId){
              setDeviceReady(true); // 디바이스 초기화 완료 상태 설정
              onDeviceReady && onDeviceReady(state.deviceId); 
            }
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
          magnifySliderOnHover={true}
        />
      )}
    </div>
  );
};

export default SpotifySDKPlayer;