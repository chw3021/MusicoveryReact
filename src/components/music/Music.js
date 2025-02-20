import React from "react";
import "../../styles/Music.css";

const Music = ({ track, handlePlay, isPremium }) => {
    return (
        <div key={track.id} className="track-item">
            <img src={track.album.images[0].url} alt={track.name} />
            <div className="track-info">
                <h4>{track.name}</h4>
                <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                <div className="tooltip">
                    <h4>{track.name}</h4>
                    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
            </div>
            <button 
                onClick={() => handlePlay(track)}
                className={isPremium ? 'premium-play' : 'spotify-link'}
            >
                {isPremium ? '재생' : 'LINK'}
            </button>
        </div>
    );
};

export default Music;