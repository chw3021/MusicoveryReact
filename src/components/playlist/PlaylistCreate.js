 import React, { useState } from 'react';
//  import { useNavigate, useParams } from "react-router-dom"; 
 import PlaylistList from './PlaylistList';
import { useParams } from 'react-router-dom';
import usePlaylistList from "../hooks/usePlaylistList";
//  import {playlistDispatchContext} from "../App";




//insertForm
const PlaylistCreate = () => {
  const {id} = useParams();
  const data = usePlaylistList(id);



  const [playlist, setPlaylist] = useState({
    playlistTitle: '',
    playlistComment: '',
    playlistPhoto: null,
    musicCheckbox: false,
    selectedMusic: '',
    selectedConcept: '',
  });

  // 폼 필드의 값을 상태로 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlaylist((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 파일 업로드 처리 함수
  const handleFileChange = (e) => {
    setPlaylist((prev) => ({
      ...prev,
      playlistPhoto: e.target.files[0],
    }));
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 제출할 데이터를 서버로 보내거나 처리합니다.
    console.log('플레이리스트 생성:', playlist);
  };

 
  

  //생성하기 누르면 리스트로
  // const backList = () => {
  //   const { onCreate } =useContext(Play)
  //   const navigate = useNavigate();
    
  //   const  onClickList = () =>{
  //     navigate(-1);
  //   }
   
  // }



  // const New = () =>{
  //   const { onCreate } = useContext(PlaylistDispatchContext);
  //   const navigate = useNavigate();
    
  // }




  // const onSubmit = (data) =>{
  //   const {playlistTitle,playlistComment,playlistPhoto} =data;
  //   onCreate(playlistTitle,playlistComment,playlistPhoto);
  //   navigate("/list", {replace:true});
  // }



    //30부터 999까지의 숫자 배열 생성
    //Array.from() = 정적 메서드, 순회 가능 또는 유사 배열 객체서 새로운 Array 인스턴스를 생성함 
    //=>특정 패턴을 따르는 배열을 만드는 코드
                                          //_: 첫 매변, index: 현재 항목의 인덱스
  const options = Array.from({ length: 194 }, (_, index) => 30 + index*5 );
  
  if(!data){
    return <div>생성화면으로 이동중..</div>
  }else{
  return (
    <div>
      <div className="text-center">
        <h3>플레이리스트 생성화면</h3>
      </div>

      <div className="container">
        <div className="board-table-height">
          <form id="insertForm" onSubmit={handleSubmit}>
            {/* 원하는 곡 입력란 */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <input
                  type="checkbox"
                  name="musicCheckbox"
                  id="musicCheckbox"
                  checked={playlist.musicCheckbox}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="selectedMusic"
                  value={playlist.selectedMusic}
                  placeholder="원하는 곡을 입력하세요..."
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 음악 장르 선택란 */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <input
                  type="checkbox"
                  name="conceptCheckbox"
                  id="conceptCheckbox"
                  checked={playlist.conceptCheckbox}
                  onChange={handleChange}
                />

              <select>
              <option value="장르">장르</option>
                <option value="발라드">발라드</option>
                <option value="힙합">힙합</option>
                <option value="록">록</option>
              </select>
              </div>
              </div>



              {/* BPM 선택란 */}
              <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <input
                  type="checkbox"
                  name="bpmCheckbox"
                  id="bpmCheckbox"
                  checked={playlist.bpmCheckbox}
                  onChange={handleChange}
                />

                <select>
                  {options.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              {/* <select>
              <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
              </select>
                 */}
              </div>
            </div>

            {/* 플레이리스트 제목 입력란 */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">플레이리스트 제목</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="playlistTitle"
                  value={playlist.playlistTitle}
                  placeholder="제목을 입력하세요..."
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 플레이리스트 설명 입력란 */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">플레이리스트 설명</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control board-textarea"
                  rows="8"
                  name="playlistComment"
                  value={playlist.playlistComment}
                  placeholder="설명을 입력하세요..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* 플레이리스트 대표사진 업로드 */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">플레이리스트 대표사진</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  name="playlistPhoto"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="text-end">
                       {/* "submit" */}
              {/* <button type="submit" className="btn btn-primary btn-sm mb-2" onClick={onSubmit}> */}
                {/* 생성하기!
              </button> */}
              <PlaylistList onSubmit={handleChange} />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
};


export default PlaylistCreate;