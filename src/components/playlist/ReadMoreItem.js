import React from 'react';
//import "../playlist/ReadMoreItem.css";

const ReadMoreItem = ({ playlist_id, playlist_title, playlist_comment, playlist_photo, playlist_date }) => {
    return (
        <div className="ReadMoreItem">
            <div className="playlistTitle">{playlist_title}</div>
            <div className="playlistComment">{playlist_comment}</div>
            <img src={playlist_photo} alt="Playlist" className="playlistPhoto" />
            <div className="playlistDate">{new Date(playlist_date).toLocaleDateString()}</div>
        </div>
    );
};

export default ReadMoreItem;