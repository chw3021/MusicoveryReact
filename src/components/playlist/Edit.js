//플레이리스트 수정하기

import { useEffect, useState } from "react";
import { getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


const Edit = ({initData, onSubmit}) => {
   const navigate = useNavigate();

    const handleSubmit = () => {
        onSubmit(state);
      };

     const handleCancel = () =>{
        navigate(-1);
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
  
      <div className="Edit">
        <h5>플레이리스트 수정화면</h5>
           <div className="edit_section">
            <div className="main_text">
            <h5>플레이리스트 선택</h5>
            </div>

            <div className="edit_section">
            <h5>생성일자</h5>
             <input type="date" value={state.playlistDate}
             onChange={handleChangeDate} />
             </div>


             <div className="edit_section">
              <input
                  type="checkbox"
                  name="musicCheckbox"
                  id="musicCheckbox"
                  checked={state.musicCheckbox}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="selectedMusic"
                  value={state.selectedMusic}
                  placeholder="원하는 곡을 입력하세요..."
                  onChange={handleChange}
                />
                </div>
            <div className="edit_section">
              <input
                  type="checkbox"
                  name="conceptCheckbox"
                  id="conceptCheckbox"
                  checked={state.conceptCheckbox}
                  onChange={handleChange}
                />

              <select>
              <option value="장르">장르</option>
                <option value="발라드">발라드</option>
                <option value="힙합">힙합</option>
                <option value="록">록</option>
              </select>
              </div>

              <div className="edit_section">
              <input
                  type="checkbox"
                  name="bpmCheckbox"
                  id="bpmCheckbox"
                  checked={state.bpmCheckbox}
                  onChange={handleChange}
                />

                <select>
                  {options.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                </div>

                <div className="edit_section">
                <label className="text_title">플레이리스트 제목</label>
                <input
                  type="text"
                  className="form-control"
                  name="playlistTitle"
                  value={state.playlistTitle}
                  placeholder="제목을 입력하세요..."
                  onChange={handleChange}
                />
                </div>

                <div className="edit_section">
                <label className="text_explain">플레이리스트 설명</label>
                <textarea
                  className="form-control board-textarea"
                  rows="8"
                  name="playlistComment"
                  value={state.playlistComment} //playlistComment
                  placeholder="설명을 입력하세요..."
                  onChange={handleChangeContent}
                ></textarea>
                </div>


                <div className="edit_section">
                <label className="text_photo">플레이리스트 대표사진</label>
                <input
                  type="file"
                  className="form-control"
                  name="playlistPhoto"
                  onChange={handleFileChange}
                />
                </div>


                <div className="edit_section"> 
                    <div className="Edit_Btn">
                       
              <Button text="취소" onClick={handleCancel}/>
              <Button text="수정하기" type={"updateType"} onClick={handleSubmit} />
                    </div>
                </div>
              
            </div>
      </div>
          
      );
  }
export default Edit;