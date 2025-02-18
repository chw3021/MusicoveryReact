//플레이리스트 상세보기(Diary)

import { useParams } from "react-router-dom";

const ReadMore = () =>{

    const {id} = useParams();
    return <div>{id}아 </div>
}
export default ReadMore;