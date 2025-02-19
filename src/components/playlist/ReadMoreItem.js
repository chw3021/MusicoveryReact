import React from 'react';
import Button from "../common/Button";
import "./ReadMoreItem.css";


const ReadMoreItem = ({ playlistId, playlistTitle, playlistComment, playlistPhoto, playlistDate }) => {
    return (
        <div className="ReadMoreItem">
            <img src={playlistPhoto} alt="Playlist" className="playlistPhoto" />
            <div className="playlistInfo">
                <div className="playlistTitle">{playlistTitle}</div>
                <div className="playlistComment">{playlistComment}</div>
            </div>
            <div className="playlistActions">
                <div className="buttonGroup">
                    <Button text="수정" link={`/edit/${playlistId}`} />
                    <Button text="삭제" link={`/delete/${playlistId}`} />
                </div>
                <div className="playlistDate">{new Date(playlistDate).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default ReadMoreItem;