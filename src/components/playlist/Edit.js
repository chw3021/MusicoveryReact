//플레이리스트 수정화면

import { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/util";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "../playlist/Edit.css";
import Header from "../common/Header";


const Edit = ({initData, onSubmit}) => {
   const navigate = useNavigate();

    const handleSubmit = () => {
        onSubmit(state);
      };

    
  const [state, setState] = useState({
          playlistTitle: '',
          playlistComment: '',
          playlistPhoto: null,
          musicCheckbox: false,
          selectedMusic: '',
          selectedConcept: '',
          playlistDate:getFormattedDate(new Date()),
      });


      useEffect(() =>{
        if(initData){
            setState({
                ...initData,
                playlistDate:getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
      },[initData]);
  
  // 폼 필드의 값을 상태로 업데이트하는 함수
  const handleChangeDate = (e) => {
      // const { name, value, type, checked } = e.target;
      // setState((prev) => ({
      //   ...prev,
      //   [name]: type === 'checkbox' ? checked : value,
      // }));
      setState({
          ...state,
          playlistDate:getFormattedDate(new Date(e.target.value)),
      });
    };

    const handleChangeContent = (e) =>{
        setState({
            ...state,
            playlistComment:e.target.value,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };


      //30부터 999까지의 숫자 배열 생성
    //Array.from() = 정적 메서드, 순회 가능 또는 유사 배열 객체서 새로운 Array 인스턴스를 생성함 
    //=>특정 패턴을 따르는 배열을 만드는 코드
                                          //_: 첫 매변, index: 현재 항목의 인덱스
  const options = Array.from({ length: 194 }, (_, index) => 30 + index*5 );


  // 파일 업로드 처리 함수
  const handleFileChange = (e) => {
    setState((prev) => ({
      ...prev,
      playlistPhoto: e.target.files[0],
    }));
  };
 

  return (
  
<div className="container">
  <Header />  
    {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}
  <div className="background">
    <div className="grayBackground">
           
          <div className="Edit_Btn">
              <Button text="곡추가" link={"/PlusMusic"} />
              <Button text="수정완료" link={"/Edit"} />
              <Button text="취소" link={"/PlaylistPage"} />
          </div>

        </div>
    <div>
                
</div>
        </div>
        

    </div>
          
      );
  }
export default Edit;