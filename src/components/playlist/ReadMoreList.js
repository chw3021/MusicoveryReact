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
            if (sortType === "latest") {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        };

        const copyList = Array.isArray(data) ? [...data] : [];
        copyList.sort(compare);
        setSortedData(copyList);
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