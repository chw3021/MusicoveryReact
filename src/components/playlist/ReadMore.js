//플레이리스트 상세보기(Diary)

import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { getFormattedDate } from "../util";
import Header from "./Header";
import Viewer from "./Viewer";
import useReadMore from "../hooks/useReadMore.js";


const ReadMore = () =>{

    const {id} = useParams();
    const data = useReadMore(id);
    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };

    const goEdit = () =>{
        navigate(`/Edit/${id}`);
    };

    if(!data){
        return <div>해당 플레이리스트 불러오는 중...</div>;

    }else{

        const { playlistTitle,playlistComment, 
        playlistPhoto, selectedMusic, selectedConcept, playlistDate} = data;
        
        const title = `${getFormattedDate(new Date(Number(playlistComment)))}`;

        return (
        <div>
            <Header title={title}
            leftChild={<Button text={"뒤로가기"} onClick={goBack} />}
            rightChild={<Button text={"수정하기"} onClick={goEdit} />}
            />
            <Viewer playlistTitle={playlistTitle} playlistComment={playlistComment} 
            playlistPhoto={playlistPhoto} selectedMusic={selectedMusic}
            selectedConcept={selectedConcept} playlistDate={playlistDate} />
        </div>
        );
        }

   
}
export default ReadMore;