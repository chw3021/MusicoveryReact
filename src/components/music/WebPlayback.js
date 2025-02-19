import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const WebPlayback = () => {
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
            const player = new window.Spotify.Player({
                name: "Musicovery Web Player",
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                setIsReady(true);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                setIsReady(false);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) return;

                setCurrentTrack(state.track_window.current_track);
                setIsPaused(state.paused);
                setPosition(state.position);
            });

            player.connect();
        };

        return () => {
            // Cleanup
            if (player) {
                player.disconnect();
            }
        };
    }, []);

    return (
        <div className="web-playback">
            {isReady ? (
                <div>
                    {currentTrack && (
                        <div className="now-playing">
                            <img 
                                src={currentTrack.album.images[0].url} 
                                alt={currentTrack.name}
                            />
                            <div className="track-info">
                                <h4>{currentTrack.name}</h4>
                                <p>{currentTrack.artists[0].name}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>플레이어 로딩 중...</div>
            )}
        </div>
    );
};

export default WebPlayback;