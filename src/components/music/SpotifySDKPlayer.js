import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../../styles/SpotifySDKPlayer.css';

const SpotifySDKPlayer = ({ accessToken, track, onDeviceReady, onPlaybackState }) => {
  const [play, setPlay] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPlay(true);
    setError(null);
  }, [track]);

  if (!accessToken) return null;

  return (
    <div className="spotify-player-controls">
      {error && <div className="error-message">{error}</div>}
      {track && (
        <SpotifyPlayer
          token={accessToken}
          uris={[track.uri]}
          autoPlay={true}
          play={play}
          callback={(state) => {
            if (!state.isPlaying) {
              setPlay(false);
            }
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