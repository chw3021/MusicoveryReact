import React, { useState, useEffect, useContext, useRef } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../../styles/SpotifySDKPlayer.css';
import { TrackContext } from '../../context/TrackContext';

const SpotifySDKPlayer = ({ accessToken, onPlaybackState, onDeviceReady }) => {
  const { trackList, currentTrack, currentIndex, nextTrack, previousTrack, isPlaying, setIsPlaying, setDeviceReady, goToTrack } = useContext(TrackContext);
  const [error, setError] = useState(null);
  const [isQueueExpanded, setIsQueueExpanded] = useState(false); // 재생 목록 확장 상태
  const playerRef = useRef(null);
  const previousIsPlayingRef = useRef(isPlaying);

  // 트랙 URI 배열 생성
  const trackUris = trackList.map(track => track.uri);

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
  }, [isPlaying, accessToken, currentTrack]);

  useEffect(() => {
    // onPlaybackState 콜백을 통해 재생 상태가 변경될 때 Context 상태 업데이트
    onPlaybackState && onPlaybackState({ isPlaying });
  }, [isPlaying, onPlaybackState]);

  // 재생 목록 확장/축소 토글
  const toggleQueueExpand = () => {
    setIsQueueExpanded(!isQueueExpanded);
  };

  if (!accessToken) return null;

  return (
    <div className="spotify-player-controls">
      {error && <div className="error-message">{error}</div>}
      {trackList.length > 0 && (
        <SpotifyPlayer
          ref={playerRef}
          token={accessToken}
          uris={trackUris}
          offset={currentIndex}
          play={isPlaying}
          syncExternalDevice={true}
          syncExternalDeviceInterval={1}
          callback={(state) => {
            //console.log('Spotify Player 상태 변경:', state);
            setIsPlaying(state.isPlaying); // 재생 상태 변경 시 Context 상태 업데이트
            
            // 트랙이 변경되면 currentIndex 업데이트
            if (state.track.id && currentTrack && state.track.id !== currentTrack.id) {
              // 현재 재생 중인 트랙의 인덱스 찾기
              const newIndex = trackList.findIndex(t => t.id === state.track.id);
              if (newIndex >= 0 && newIndex !== currentIndex) {
                goToTrack(newIndex); // 현재 인덱스 업데이트
              }
            }
            
            onPlaybackState(state); // 재생 상태 업데이트
            if(state.deviceId){
              setDeviceReady(true); // 디바이스 초기화 완료 상태 설정
              onDeviceReady && onDeviceReady(state.deviceId); 
            }
          }}
          onError={(err) => {
            console.error("Spotify Player 오류:", err);
            if (err.message.includes("403")) {
              if (currentTrack) {
                window.open(currentTrack.external_urls.spotify, '_blank');
              }
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
      
      {/* 현재 재생 목록 표시 (접고 펼칠 수 있음) */}
      {trackList.length > 0 && (
        <div className="track-queue">
          <div className="track-queue-header" onClick={toggleQueueExpand}>
            <h3>재생 목록</h3>
            <button className={`queue-toggle-btn ${isQueueExpanded ? 'expanded' : ''}`}>
              ▲
            </button>
          </div>
          
          <div className={`track-queue-list ${isQueueExpanded ? 'expanded' : 'collapsed'}`}>
            {/* 접혀있을 때는 현재 트랙만 표시 */}
            {!isQueueExpanded ? (
              <ul className="queue-items">
                <li 
                  key={currentTrack?.id} 
                  className="current-track queue-item"
                >
                  <span className="now-playing-indicator">▶</span>
                  <span className="track-info">
                    {currentTrack?.name} - {currentTrack?.artists.map(a => a.name).join(", ")}
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="queue-items">
                {trackList.map((t, idx) => (
                  <li 
                    key={t.id} 
                    className={`queue-item ${idx === currentIndex ? 'current-track' : ''}`}
                    onClick={() => goToTrack(idx)}
                  >
                    {idx === currentIndex && <span className="now-playing-indicator">▶</span>}
                    <span className="track-info">
                      {t.name} - {t.artists.map(a => a.name).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifySDKPlayer;