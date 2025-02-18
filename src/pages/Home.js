//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)

// import Edit from "./Edit";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import ReadMoreList from "../components/playlist/ReadMoreList";
import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { getMonthRangeByDate} from "../utils/util";
import "../styles/Home.css";


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
        <div className="container">
            <Header title={listArray} />  
            {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}

            <section className="section_midnight"></section>
            <div className="hero">
                <div className="hero-content">
                    <h1> 환영합니다 </h1>
                    <p>Explore curated playlists, discover new artists, and expand your musical horizons.</p>
                    <a href="#" className="hero-button">Login</a>
                    <a href="#" className="hero-button">Login</a>
                    
                </div>
            </div>
            {/* <ReadMoreList data={filteredData} />  이게 새로 만들기*/}

        </div>
  
    );
}
export default Home;