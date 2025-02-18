import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import ReadMoreItem from "./ReadMoreItem";
import "../playlist/ReadMoreList.css";
//홈 상단화면

const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"},
];



const ReadMoreList = ({data}) =>{
    const [sortType, setSortType] = useState("latest");
    const navigate = useNavigate();
    const [sortedData, setSortedData] = useState([]);


    useEffect(()=>{
        const compare = (a,b)=>{
            if(sortType ==="latest"){
                return Number(b.date)-Number(a.date);
            }else{
                return Number(a.date)-Number(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    },[data,sortType]);


    const onClickCreate = () =>{
        navigate("/Create");
    }
    const onChangeSortType = (e) =>{
        setSortType(e.target.value);
    };

    


    return (
    <div className="ReadMoreList">
        <div className="ListArray">

        <div className="goCreateView">
                <Button link={"/Create"} 
                text={"새로 만들기"} onClick={onClickCreate} />
            </div>

            <div className="searchText">
        <input
                  type="text"
                  className="form-control"
                  name="searchList"
                  placeholder="플레이리스트 검색"
                />
            </div>
            </div>
        <div className="ListArray_section">
                {/* 정렬 선택(가나다순 아직 안함) */}
            <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
            <option key={idx} value={it.value}>
            {it.name}
            </option>
            ))}
            </select>     
            </div>
            <div className="list_lower">
                {sortedData.map((it) => (
                    <ReadMoreItem key={it.id} {...it} />
                ))}
            
        </div>
        
    </div>
    );
}

export default ReadMoreList;