//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)

// import Edit from "./Edit";
// import Button from "../components/common/Button";
import Header from "../components/common/Header";
import ReadMoreList from "../components/playlist/ReadMoreList";
import { useEffect, useState } from "react";
import { getMonthRangeByDate} from "../utils/util";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/PlaylistPage.css";
import Button from "../components/common/Button";
import axiosInstance from '../api/axiosInstance';
import useUserInfo from "../hooks/useUserInfo"; // useUserInfo 임포트


const PlaylistPage = () =>{
    const [data, setData] = useState([]); // 초기값을 빈 배열로 설정
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [spotifyAnnounce, setSpotifyAnnounce] = useState(false); // Spotify 연동 필요 여부 상태 추가
    const navigate = useNavigate();
    const userInfo = useUserInfo();
    const location = useLocation();
    const friendInfo = location.state?.friendInfo;

    const userId = friendInfo ? friendInfo.id : userInfo?.id;
    const isFriendPlaylist = !!friendInfo;

    

    const getPlaylistsByUserId = async (userId) => {
        try {
            const response = await axiosInstance.get(`/playlist/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching playlists", error);
            throw error;
        }
    };

    useEffect (()=>{
        if(data.length >=1){
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.data && it.data <= endTimeStamp
                )
            );
        }else{
             setFilteredData([]);
         }
     }, [data,pivotDate]);
    

     useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const playlists = await getPlaylistsByUserId(userId);
                    setData(playlists); // 전체 플레이리스트 데이터를 설정
                    setFilteredData(playlists); // 필터링된 데이터도 초기에는 전체 데이터로 설정
                    setSpotifyAnnounce(false); // 성공적으로 데이터를 가져왔으므로 Spotify 연동 필요 없음
                } catch (error) {
                    //console.error("Error fetching playlists", error);
                    if (error.response && error.response.status === 500) {
                        // Spotify 연동이 필요한 경우
                        setSpotifyAnnounce(true);
                        setFilteredData([]); // 플레이리스트 데이터를 비움
                    }
                }
            }
        };

        fetchData();
    }, [userId]);

    const onClickCreate = () => {
        navigate("/createplaylist");
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`, { state: { friendInfo: friendInfo } });
    };

    return (
        <div className="container1">
            <Header />
            <div className="grayBackground">
                <div className="arraywithButton">
                    <div className="Textplace">
                        <div id="libText">{isFriendPlaylist ? `${friendInfo.nickname} 님의 플레이리스트` : "내 라이브러리"}</div>
                    </div>
                    {(!isFriendPlaylist && !spotifyAnnounce) && (
                        <div className="goCreateView">
                            <Button link={"/createplaylist"} text={"플레이리스트 생성"} onClick={onClickCreate} />
                        </div>
                    )}
                </div>
                {spotifyAnnounce ? (
                    <div className="spotify-announce">Spotify 계정 연동이 필요합니다.</div>
                ) : (
                    <ReadMoreList data={filteredData} isFriendPlaylist={isFriendPlaylist} onPlaylistClick={handlePlaylistClick} />
                )}
            </div>
        </div>
    );
}
export default PlaylistPage;