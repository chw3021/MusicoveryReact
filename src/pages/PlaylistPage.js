//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)

// import Edit from "./Edit";
// import Button from "../components/common/Button";
import Header from "../components/common/Header";
import ReadMoreList from "../components/playlist/ReadMoreList";
import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { getMonthRangeByDate} from "../utils/util";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/PlaylistPage.css";


const PlaylistPage = () =>{
    const data = useContext(ReadMoreStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const navigate = useNavigate();

    
    
    const listArray = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth()+1}월`;
  

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
    


    return ( 
        <div className="container1">
            <Header />  
            {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}
        
            <section className="section_midnight"></section>
            <div className="background">
              

                        <div className="grayBackground">
                            
                            <div className="Textplace">
                        <div id="libText">내 라이브러리</div>
                        </div>

                        <div className="list">
                        <ReadMoreList data={filteredData} />
                        </div>
                        
                        </div>
                        <div>
                    
                </div>
            </div>
            

        </div>
  
    );
}
export default PlaylistPage;