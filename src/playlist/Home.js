//사용자 화면 - 내 라이브러리(플레이리스트 조회,수정,삭제,생성)

// import Edit from "./Edit";
import Button from "./Button";
import Header from "./Header";
import ReadMoreList from "./ReadMoreList";
import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { getMonthRangeByDate} from "../util";

const Home = () =>{
    const data = useContext(ReadMoreStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const listArray = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth()+1}월`;

    useEffect (()=>{
        if(data.length >=1){
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.data && it.data <= endTimeStamp
                )
            )
        }
    })
    

    const goHome = () =>{

    }
    return ( 
    <div>
        홈
    <Header title={"Musicovery"}
    leftChild={<Button text={"홈"} />}
        />
        <ReadMoreList data={filteredData} />
    </div> 
    // , <Button text={"소셜"} />, <Button text={"게시판"} 
    );
}
export default Home;