//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)
import "./Home.css";
// import Edit from "./Edit";
import Button from "./Button";
import Header from "./Header";
import ReadMoreList from "./ReadMoreList";
import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { getMonthRangeByDate} from "../util";
import { useNavigate } from "react-router-dom";

const Home = () =>{
    const data = useContext(ReadMoreStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    // const navigate = useNavigate();


    
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
    <div className="forBackground">
         <div className="text">
   
        <Header title={listArray} />
        <section className="section_midnight"></section>
        <Button text={"홈"} className="btnColor" />
        <Button text={"소셜"} className="btnColor" />
        <Button text={"게시판"} className="btnColor" />
            <ReadMoreList data={filteredData} />
        
        </div> 
    </div>
    
    );
}


export default Home;