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
    const data = '';
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
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
                    const data = await getPlaylistsByUserId(userId);
                    setFilteredData(data);
                } catch (error) {
                    console.error("Error fetching playlists", error);
                }
            }
        };

        fetchData();
    }, [userId]);

    const onClickCreate = () => {
        navigate("/createplaylist");
    };

    return ( 
        <div className="container1">
            <Header />
            <div className="grayBackground">
                <div className="arraywithButton">
                    <div className="Textplace">
                        <div id="libText">{isFriendPlaylist ? `${friendInfo.nickname} 님의 플레이리스트` : "내 라이브러리"}</div>
                    </div>
                    {!isFriendPlaylist && (
                        <div className="goCreateView">
                            <Button link={"/createplaylist"} text={"플레이리스트 생성"} onClick={onClickCreate} />
                        </div>
                    )}
                </div>
                <ReadMoreList data={filteredData} isFriendPlaylist={isFriendPlaylist} />
            </div>
        </div>
    );
}
export default PlaylistPage;