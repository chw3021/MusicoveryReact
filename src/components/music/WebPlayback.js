import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../../styles/WebPlayback.css'; // 스타일 파일 추가

const WebPlayback = ({ accessToken, trackUri, deviceId }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (trackUri) {
            setPlay(true);
        } else {
            setPlay(false);
        }
    }, [trackUri]);

    if (!accessToken) return null;

    return (
        <div className="web-playback">
            <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                play={play}
                uris={trackUri ? [trackUri] : []}
                deviceId={deviceId}
                
            />
        </div>
    );
};

export default WebPlayback;