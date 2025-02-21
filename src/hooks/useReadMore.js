import { useContext, useEffect, useState } from "react";
import { ReadMoreStateContext } from "../App";
import { useNavigate } from "react-router-dom";


const useReadMore = (id) =>{
    const data = useContext(ReadMoreStateContext);
    const [ReadMore, setReadMore] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const matchReadMore = data.find((it) => String(it.id) ===String(id));
        if(matchReadMore){
            setReadMore(matchReadMore);
        }else{
            alert("플레이리스트가 존재하지 않습니다.");
            navigate("/", {replace:true});
        }

    },[id,data]);

    return ReadMore;
};

export default useReadMore;