import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music"; // Music 컴포넌트 임포트

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/detail/${playlistId}`);
                setPlaylist(response.data);
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{playlist.playlistTitle}</h2>
            <p>{playlist.playlistComment}</p>
            <img src={playlist.playlistPhoto} alt={playlist.playlistTitle} />
            <p>{playlist.playlistDate}</p>
            {/* 플레이리스트 트랙 목록 표시 */}
            {playlist.trackIds && playlist.trackIds.map((trackId) => (
                <Music key={trackId} trackId={trackId} />
            ))}
        </div>
    );
};

export default PlaylistDetail;