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
    const listArray = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.data && it.data <= endTimeStamp)
            );
        }
    }, [data, pivotDate]);
    

    const goHome = () =>{

    }
    return ( 
        <div className="container">
            <Header title={"Musicovery"} leftChild={<Button text={"홈"} />} />
            <div className="hero">
                <div className="hero-content">
                    <h1>Find Your Next Favorite Song</h1>
                    <p>Explore curated playlists, discover new artists, and expand your musical horizons.</p>
                    <a href="#" className="hero-button">Start Exploring</a>
                </div>
            </div>
            <ReadMoreList data={filteredData} />
        </div>
    // , <Button text={"소셜"} />, <Button text={"게시판"} 
    );
}
export default Home;