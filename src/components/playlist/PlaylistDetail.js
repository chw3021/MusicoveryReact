import Header from "../common/Header";
import "../playlist/PlaylistDetail.css";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";


//플레이리스트 상세화면
const PlaylistDetail = ({onSubmit}) =>{
    const navigate = useNavigate();


     const handleCancel = () =>{
        navigate(-1);
     };
    

return(
<div className="container1">
    <Header />  
    {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}
    <div className="background">
        <div className="grayBackground">
            <div className="create_section2"> 
                <div className="Edit_Btn">
          
            <Button text="수정" link={"/Edit"} />
            <Button text="뒤로가기" link={"/PlaylistPage"} onClick={handleCancel}/>
                </div>
            </div>

        </div>
    <div>
                
</div>
        </div>
        

    </div>
  
    );
}

export default PlaylistDetail;