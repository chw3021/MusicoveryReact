//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)

// import Edit from "./Edit";
// import Button from "../components/common/Button";
import Header from "../components/common/Header";
import ReadMoreList from "../components/playlist/ReadMoreList";
import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { getMonthRangeByDate} from "../utils/util";
import { useNavigate } from "react-router-dom";
import "../styles/PlaylistPage.css";
import Button from "../components/common/Button";
import axiosInstance from '../api/axiosInstance';
import useUserInfo from "../hooks/useUserInfo"; // useUserInfo 임포트


const PlaylistPage = () =>{
    const data = useContext(ReadMoreStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const navigate = useNavigate();
    const userInfo = useUserInfo(); // 사용자 정보 가져오기

    

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
            if(userInfo){
                try {
                    const data = await getPlaylistsByUserId(userInfo.userId);
                    
                    setFilteredData(data);
                } catch (error) {
                    console.error("Error fetching playlists", error);
                }
            }
        };

        fetchData();
    }, [userInfo]);

    const onClickCreate = () => {
        navigate("/createplaylist");
    };

    return ( 
        <div className="container1">
            <Header />
            <div className="grayBackground">
                <div className="arraywithButton">
                    <div className="Textplace">
                        <div id="libText">내 라이브러리</div>
                    </div>
                    <div className="goCreateView">
                        <Button link={"/createplaylist"} text={"플레이리스트 생성"} onClick={onClickCreate} />
                    </div>
                </div>
                <ReadMoreList data={filteredData} />
            </div>
        </div>
  
    );
}
export default PlaylistPage;