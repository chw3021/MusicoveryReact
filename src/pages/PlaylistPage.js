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
import PlaylistDetail from "../components/playlist/PlaylistDetail";
import axiosInstance from '../api/axiosInstance';


const PlaylistPage = () =>{
    const data = useContext(ReadMoreStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const navigate = useNavigate();
    const userId = "user1@example.com"; // 실제 사용자 ID로 변경 필요

    
    
    const listArray = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth()+1}월`;


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
            try {
                const data = await getPlaylistsByUserId(userId);
                console.log("data", data);
                
                setFilteredData(data);
            } catch (error) {
                console.error("Error fetching playlists", error);
            }
        };

        fetchData();
    }, [userId]);


    return ( 
        <div className="container1">
            <Header />
            <div className="grayBackground">
                <div className="Textplace">
                    <div id="libText">내 라이브러리</div>
                </div>
                <div className="list">
                    <ReadMoreList data={filteredData} />
                </div>
                <div className="ofPlaylistDetail">
                    <Button link={"/PlaylistDetail"} text={"플리제목클릭"} />
                </div>
            </div>
        </div>
  
    );
}
export default PlaylistPage;