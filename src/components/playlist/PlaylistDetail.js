import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music"; // Music 컴포넌트 임포트
import MusicSearch from "../music/MusicSearch";
import useMusicSearch from "../../hooks/useMusicSearch"; // useMusicSearch 훅 임포트
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 임포트
import Button from "../common/Button"; // Button 컴포넌트 임포트
import { parseTracks } from "../../utils/trackUtils"; // parseTracks 유틸 함수 임포트
import { getImageUrl } from "../../utils/imageUtils"; 
import { TrackContext } from '../../context/TrackContext';
import "./PlaylistDetail.css"; // 스타일 파일 임포트
import Header from "../common/Header";

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const userInfo = useUserInfo(); // 사용자 정보 가져오기
    const { handlePlay, isPremium } = useMusicSearch(); // useMusicSearch 훅 사용
    const location = useLocation();
    const friendInfo = location.state?.friendInfo;
    const isFriendPlaylist = !!friendInfo;

    const { addTracksToList, setIsPlaying, deviceReady } = useContext(TrackContext);

    const [state, setState] = useState({
        playlistTitle: '',
        playlistComment: '',
        playlistPhoto: null,
        playlistDate: '',
        tracksData: [],
        isEditing: false,
        user: userInfo,
    });

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/detail/${playlistId}`);
    
                // tracks 데이터를 파싱하고 변환
                const trackList = parseTracks(response.data.tracks);
                
                setState(prevState => ({
                    ...prevState,
                    playlistTitle: response.data.playlist.playlistTitle,
                    playlistComment: response.data.playlist.playlistComment,
                    playlistPhoto: getImageUrl(response.data.playlist.playlistPhoto), // 이미지 URL 설정
                    playlistDate: response.data.playlist.playlistDate.substring(0, 10),
                    isPublic: response.data.playlist.isPublic,
                    tracksData: trackList,
                }));
                
    
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };
    
        fetchPlaylist();
    }, [playlistId]);

    useEffect(() => {
        if (userInfo) {
            setState(prevState => ({
                ...prevState,
                user: userInfo,
            }));
        }
    }, [userInfo]);

    const handleEdit = () => {
        setState(prevState => ({
            ...prevState,
            isEditing: true,
        }));
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("playlistId", playlistId);
        formData.append("playlistTitle", state.playlistTitle);
        formData.append("playlistComment", state.playlistComment);
        formData.append("playlistDate", state.playlistDate);
        formData.append("isPublic", state.isPublic);
        formData.append("userId", state.user.userId); // 예시로 userId 값 사용
    
        if (state.playlistPhoto && typeof state.playlistPhoto !== "string") {
            formData.append("playlistPhoto", state.playlistPhoto);
        } else {
            formData.append("existingPlaylistPhoto", state.playlistPhoto || ""); // 기존 이미지를 그대로 사용
        }
    
        formData.append("tracks", state.tracksData.map(track => track.uri));
    
        try {
            await axiosInstance.post("/playlist/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setState(prevState => ({
                ...prevState,
                isEditing: false,
            }));
            navigate("/PlaylistPage");
        } catch (error) {
            console.error("Error updating playlist", error);
        }
    };

    const handleFileChange = (e) => {
        setState(prevState => ({
            ...prevState,
            playlistPhoto: e.target.files[0],
        }));
    };

    const handleRemoveTrack = (trackId) => {
        setState(prevState => ({
            ...prevState,
            tracksData: prevState.tracksData.filter(track => track.id !== trackId),
        }));
    };

    const handleTrackSelect = (track) => {
        setState((prev) => ({
            ...prev,
            tracksData: [...prev.tracksData, track],
        }));
    };
    
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };
    // 전체 트랙 재생 함수 추가
    const handlePlayAll = () => {
        if (state.tracksData.length === 0) {
            alert('재생할 트랙이 없습니다.');
            return;
        }

        // 모든 트랙을 재생 목록에 추가
        addTracksToList(state.tracksData);
        
        // 디바이스가 준비되면 재생 시작
        if (deviceReady) {
            setIsPlaying(true);
        } else {
            setTimeout(() => {
                setIsPlaying(true);
            }, 1000);
        }
    };

    return (
        <div className="container1">
            <Header />
                
            <div className="playlist-detail-container">
                <div className="playlist-detail-header">
                    
                {state.isEditing ? (
                            <>
                                <input value={state.playlistTitle}
                                    onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        playlistTitle: e.target.value,
                                    }))} 
                                />
                            </>
                        ) : (
                            <>
                                 <h2>{state.playlistTitle}</h2>
                            </>
                        )}
                </div>
                <div className="playlist-detail-body">
                    <div className="playlist-detail-left">
                        <img src={state.playlistPhoto} alt="Playlist" className="playlist-detail-photo" />
                        {state.isEditing && (
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                        )}
                                
                        <div className="playlist-tracks-container">
                            {state.isEditing && (
                                <div className="music-search-container">
                                    <MusicSearch onSelectTrack={handleTrackSelect} />
                                </div>
                            )}
                            <div className={`playlist-tracks ${state.isEditing ? 'playlist-tracks-editing' : ''}`}>
                                {state.tracksData.length > 0 ? (
                                    state.tracksData.map((track, index) => {
                                        const key = `${playlistId}-${index}`;
                                        return (
                                            <div key={key} className="list-track-item">
                                                <Music track={track} handlePlay={handlePlay} isPremium={isPremium} />
                                                {state.isEditing && (
                                                    <button onClick={() => handleRemoveTrack(track.id)}>삭제</button>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>노래가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="playlist-detail-right">
                        {isPremium && (
                            <div className="playlist-play-controls">
                                <button 
                                    className="playlist-play-all-button"
                                    onClick={handlePlayAll}
                                    disabled={state.tracksData.length === 0}
                                >
                                    ▶
                                </button>
                            </div>
                        )}
                        {state.isEditing ? (
                            <>
                                <textarea 
                                    value={state.playlistComment} 
                                    onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        playlistComment: e.target.value,
                                    }))} 
                                />
                            </>
                        ) : (
                            <>
                                <p>{state.playlistComment}</p>
                            </>
                        )}
                        <p>{state.playlistDate}</p>
                        <div className="editing-button-area">
                            {!isFriendPlaylist ? (
                                <>
                                    {state.isEditing ? (
                                        <Button text="저장" onClick={handleSave} />
                                    ) : (
                                        <Button text="수정" onClick={handleEdit} />
                                    )}
                                </>
                            ) : null}
                            <Button text="뒤로가기" onClick={goBack} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetail;