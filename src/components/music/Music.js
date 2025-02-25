import React, { useState } from "react";
import "../../styles/Music.css";

const Music = ({ track, handlePlay, isPremium }) => {
    const [tooltipStyle, setTooltipStyle] = useState({});

    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipStyle({
            top: `${rect.top - 10}px`,
            left: `${rect.left + rect.width / 2}px`,
        });
    };

    const handleMouseLeave = () => {
        setTooltipStyle({});
    };

    return (
        <div key={track.id} className="track-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img className="track-album-image-music" src={track.album.images[0].url} alt={track.name} />
            <div className="track-info">
                <h4>{track.name}</h4>
                <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                <div className="tooltip" style={tooltipStyle}>
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