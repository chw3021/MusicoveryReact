import React from "react";
import "../../styles/MusicPlayer.css";

const MusicPlayer = ({ trackId }) => {
    return (
        <div className="music-player">
            <iframe
                title={`Spotify track ${trackId}`}
                src={`https://open.spotify.com/embed/track/${trackId}`}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </div>
    );
};

export default MusicPlayer;