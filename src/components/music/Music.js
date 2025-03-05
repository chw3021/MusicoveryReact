import React, { useState, useRef, useCallback, useContext } from "react";
import ReactDOM from "react-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/Music.css";
import useUserInfo from "../../hooks/useUserInfo";
import { getImageUrl } from "../../utils/imageUtils";
import { TrackContext } from '../../context/TrackContext';

// PlaylistItem 컴포넌트 분리 및 메모이제이션
const PlaylistItem = React.memo(({ playlist, isChecked, onCheck }) => (
    <div className="playlist-modal-item">
        <input
            type="checkbox"
            id={`playlist-${playlist.playlistId}`}
            checked={isChecked}
            onChange={() => onCheck(playlist.playlistId)}
        />
        <label htmlFor={`playlist-${playlist.playlistId}`} className="playlist-modal-label">
            <div className="playlist-modal-image-container">
                <img 
                    src={getImageUrl(playlist.playlistPhoto)} 
                    alt={playlist.playlistTitle} 
                    className="playlist-modal-image" 
                />
            </div>
            <span className="playlist-modal-name">{playlist.playlistTitle}</span>
        </label>
    </div>
));

// PlaylistModal 컴포넌트 분리 및 메모이제이션
const PlaylistModal = React.memo(({ playlists, selectedPlaylists, loading, onCheck, onClose, onAdd }) => (
    <div className="playlist-modal-overlay" onClick={onClose}>
        <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="playlist-modal-header">
                <h3>플레이리스트에 추가</h3>
                <button className="playlist-modal-close" onClick={onClose}>&times;</button>
            </div>
            <div className="playlist-modal-body">
                {loading ? (
                    <p>플레이리스트를 불러오는 중...</p>
                ) : playlists.length === 0 ? (
                    <p>사용 가능한 플레이리스트가 없습니다.</p>
                ) : (
                    <div className="playlist-modal-list">
                        {playlists.map(playlist => (
                            <PlaylistItem
                                key={playlist.playlistId}
                                playlist={playlist}
                                isChecked={selectedPlaylists.includes(playlist.playlistId)}
                                onCheck={onCheck}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="playlist-modal-footer">
                <button 
                    className="add-to-playlist-button" 
                    onClick={onAdd}
                    disabled={selectedPlaylists.length === 0 || loading}
                >
                    플레이리스트에 추가
                </button>
            </div>
        </div>
    </div>
));

const Music = ({ track, isPremium, deviceId }) => {
    const [tooltipStyle, setTooltipStyle] = useState({});
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setCurrentTrack } = useContext(TrackContext);
    
    const playlistsLoadedRef = useRef(false);
    const userInfo = useUserInfo();
    
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

    const fetchPlaylists = async (userId) => {
        if (!userId || playlistsLoadedRef.current) return;
        
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/playlist/user/${userId}`);
            setPlaylists(response.data || []);
            playlistsLoadedRef.current = true;
        } catch (error) {
            console.error("플레이리스트를 불러오는 데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToPlaylist = () => {
        setShowPlaylistModal(true);
        if (userInfo && !playlistsLoadedRef.current) {
            fetchPlaylists(userInfo.userId);
        }
    };

    const handleCloseModal = () => {
        setShowPlaylistModal(false);
        setSelectedPlaylists([]);
    };

    const handlePlaylistCheck = useCallback((playlistId) => {
        setSelectedPlaylists(prevSelected => {
            if (prevSelected.includes(playlistId)) {
                return prevSelected.filter(id => id !== playlistId);
            } else {
                return [...prevSelected, playlistId];
            }
        });
    }, []);

    const handleAddTracksToPlaylists = async () => {
        if (selectedPlaylists.length === 0) {
            alert("플레이리스트를 선택해주세요.");
            return;
        }

        try {
            const promises = selectedPlaylists.map(playlistId => 
                axiosInstance.post(`/api/spotify/playlist/${playlistId}/track`, null, {
                    params: { trackId: track.id }
                })
            );
            
            await Promise.all(promises);
            alert("선택한 플레이리스트에 트랙이 추가되었습니다.");
            handleCloseModal();
        } catch (error) {
            console.error("플레이리스트에 트랙 추가 실패:", error);
            alert("플레이리스트에 트랙 추가 중 오류가 발생했습니다.");
        }
    };

    const handlePlayClick = async (track) => {
        if (isPremium) {
            try {
                // localStorage에서 디바이스 ID를 가져오거나 props로 전달받은 것을 사용
                const activeDeviceId = deviceId || localStorage.getItem('spotify_device_id');
                
                if (!activeDeviceId) {
                    alert('Spotify 플레이어를 초기화 중입니다. 잠시 후에 다시 시도해주세요.');
                    return;
                }
                
                
                setCurrentTrack(track); // 선택한 트랙을 Context를 통해 전달
                
            } catch (error) {
                console.error("트랙 재생 중 오류:", error);
                if (error.response?.status === 403) {
                    // 403 오류 발생 시 링크로 이동
                    window.open(track.external_urls.spotify, '_blank');
                    return;
                } else if (error.response?.status === 404) {
                    alert('Spotify 플레이어를 초기화 중입니다. 잠시 후에 다시 시도해주세요.');
                } else {
                    alert('트랙을 재생할 수 없습니다. 다시 시도해주세요.');
                }
            }
        } else {
            window.open(track.external_urls.spotify, '_blank');
        }
    };

    return (
        track && track.album && track.album.images && track.album.images[0] ? (
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
                <div className="track-play-button-container">
                    <button
                        onClick={() => handlePlayClick(track)}
                        className={isPremium ? "premium-play" : "spotify-link"}
                    >
                        {isPremium ? "▶" : "LINK"}
                    </button>
                    <button className="add-track-to-playlist-button" onClick={handleAddToPlaylist}>
                        ➕
                    </button>
                </div>

                {showPlaylistModal && ReactDOM.createPortal(
                    <PlaylistModal 
                        playlists={playlists}
                        selectedPlaylists={selectedPlaylists}
                        loading={loading}
                        onCheck={handlePlaylistCheck}
                        onClose={handleCloseModal}
                        onAdd={handleAddTracksToPlaylists}
                    />,
                    document.body
                )}
            </div>
        ) : null
    );
};

export default Music;