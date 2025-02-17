// / 
import React, { useState,useEffect } from 'react';
 import PlaylistCreate from './PlaylistCreate';
import { useNavigate, useParams } from 'react-router-dom';
import usePlaylistList from "../hooks/usePlaylistList";
import Button from './Button';

//playlist.js
const PlaylistList = () => {
  const [playlistList, setPlaylistList] = useState([]);
  const {id} = useParams();
  const data = usePlaylistList(id);
  const navigate = useNavigate();

  const goCreate = () =>{
    navigate(`/Create/${id}`);
  }

  // 비동기적으로 플레이리스트 데이터를 가져오는 함수
  useEffect(() => {
    // 예시: API에서 플레이리스트 데이터를 가져오는 부분
    // fetch('/api/playlist')와 같은 호출을 통해 데이터를 받아올 수 있습니다.
    // 현재는 더미 데이터를 사용하고 있습니다.
    
    const fetchPlaylistList = async () => {
      // 여기에 실제 API 호출 코드를 추가해야 합니다.
      const data = await fetch('/api/playlist')
        .then(response => response.json())
        .catch(error => console.error("Error fetching playlist:", error));

      setPlaylistList(data || []);
    };

    fetchPlaylistList();
  }, []);


  if(!data){
    return <div>생성화면 불러오는 중..</div>
  }else{

    const {playlistTitle, playlistComment, playlistPhoto} =data;
    

  return (
    <div>
      <div className="text-center">
        <h3>플리의 리스트 - 내 라이브러리</h3>
      </div>

      <div className="board-table-height">
        <table>
          <thead>
            <tr className="text-center">
              <th className="col-md-2">플레이리스트 ID</th>
              <th className="col-md-4">플레이리스트 제목</th>
              <th className="col-md-2">플레이리스트 설명</th>
              <th className="col-md-3">플레이리스트 대표사진</th>
              <th className="col-md-1">이메일</th>
            </tr>
          </thead>
          <tbody className="list">
            {playlistList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">등록된 플레이리스트가 없습니다.</td>
              </tr>
            ) : (
              playlistList.map((playlist) => (
                <tr className="text-center" key={playlist.playlistId}>
                  <td>{playlist.playlistId}</td>
                  <td className="playlistTitle">{playlist.playlistTitle}</td>
                  <td className="playlistComment">{playlist.playlistComment}</td>
                  <td className="playlistPhoto">{playlist.playlistPhoto}</td>
                  <td className="userId">{playlist.userId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
        <PlaylistCreate text={"생성하기"} child={<Button text="생성하기" onClick={goCreate} />} />
   
    </div>
  );
}
};

export default PlaylistList;