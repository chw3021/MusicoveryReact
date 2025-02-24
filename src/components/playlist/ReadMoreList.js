import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import ReadMoreItem from "./ReadMoreItem";
import "./ReadMoreList.css";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const ReadMoreList = ({ data }) => {
    const [sortType, setSortType] = useState("latest");
    const navigate = useNavigate();
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a, b) => {
            const dateA = new Date(a.playlistDate);
            const dateB = new Date(b.playlistDate);

            if (sortType === "latest") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        };

        // 데이터가 유효하고 playlistDate 속성이 있는지 확인
        if (Array.isArray(data) && data.every(item => item.playlistDate)) {
            const copyList = [...data];
            copyList.sort(compare);
            setSortedData(copyList);
        } else {
            // 데이터가 없거나 유효하지 않은 경우 빈 배열로 설정
            setSortedData([]);
        }
    }, [data, sortType]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    return (
        <div className="ReadMoreList">
            <div className="searchText">
                <input
                    type="text"
                    className="form-control"
                    name="searchList"
                    placeholder="플레이리스트 검색"
                />
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
                    <ReadMoreItem 
                        key={it.playlistId} 
                        playlistId={it.playlistId}
                        playlistTitle={it.playlistTitle}
                        playlistComment={it.playlistComment}
                        playlistPhoto={it.playlistPhoto}
                        playlistDate={it.playlistDate}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReadMoreList;