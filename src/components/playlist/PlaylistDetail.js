import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Music from "../music/Music"; // Music 컴포넌트 임포트
import useMusicSearch from "../../hooks/useMusicSearch"; // useMusicSearch 훅 임포트

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    const [data, setData] = useState(null);
    const { handlePlay, isPremium } = useMusicSearch(); // useMusicSearch 훅 사용

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axiosInstance.get(`/playlist/detail/${playlistId}`);
    
                // tracks가 문자열이면 JSON으로 파싱
                let parsedTracks = typeof response.data.tracks === "string"
                    ? JSON.parse(response.data.tracks)
                    : response.data.tracks;

                // tracks.items에서 track 정보만 추출
                const trackList = parsedTracks.items.map(item => ({
                    id: item.track.id, // track.id 추가
                    ...item.track, // track 객체 전체 추가
                }));
                console.log("📌 서버 응답 trackList:", trackList); // 서버 응답 확인
                
                setData({
                    ...response.data,
                    tracksData: trackList
                });
    
            } catch (error) {
                console.error("Error fetching playlist detail", error);
            }
        };
    
        fetchPlaylist();
    }, [playlistId]);
    

    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data);

    return (
        <div>
            <h2>{data.playlist.playlistTitle}</h2>
            <p>{data.playlist.playlistComment}</p>
            <img src={data.playlist.playlistPhoto} alt={data.playlist.playlistTitle} />
            <p>{data.playlist.playlistDate}</p>
            {/* 플레이리스트 트랙 목록 표시 */}
            {data.tracksData && data.tracksData.map((track) => (
                <Music key={track.id} track={track} handlePlay={handlePlay} isPremium={isPremium}  /> // trackId 대신 track 객체 전달
            ))}
        </div>
    );
};

export default PlaylistDetail;