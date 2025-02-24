import {Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import SocialPage from "./pages/SocialPage"; // SocialPage 임포트
import Edit from "./components/playlist/Edit";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import React ,{ useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import PlaylistPage from "./pages/PlaylistPage";
import PlaylistCreatePage from "./pages/PlaylistCreatePage";
import PlusMusic from "./components/playlist/PlusMusic";
import UserReport from "./components/social/UserReport"; // UserReport 임포트
import OAuthCallback from "./components/auth/OAuthCallback";

import Streaming from "./components/social/Streaming"; // Streaming 임포트
import Challenge from "./components/social/Challenge"; // Challenge 임포트
import FriendsList from "./components/social/FriendsList"; // FriendsList 임포트
import Quiz from "./components/social/Quiz"; // Quiz 임포트
import CustomerSupport from "./components/social/CustomerSupport"; // CustomerSupport 임포트
import QuizSOLOPlay from "./components/social/QuizSOLOPlay";
import QuizMULTIPlay from "./components/social/QuizMULTIPlay";
import ChallengeSOLOPlay from "./components/social/ChallengeSOLOPlay";
import ChallengeMULTIPlay from "./components/social/ChallengeMULTIPlay";
import ChatRoom from "./components/social/ChatRoom"; // ChatRoom 임포트

import AdminMain from "./pages/AdminMain"; // admin 메인페이지




const day = new Date();
day.setDate(day.getDate()-1);

const testData = [
  {
    id:"test1",
    playlistDate:day.getTime(),
    playlistTitle:"제목1",
    playlistComment:"내용있음",
    playlistPhoto:"null",
    musicCheckbox:"false",
    selectedMusic:"아모르파티",
    selectedConcept:"힙합",
  },
  {
    id:"test2",
    playlistDate:day.getTime(),
    playlistTitle:"제목2",
    playlistComment:"내용있음",
    playlistPhoto:"",
    musicCheckbox:"",
    selectedMusic:"아모르파티2",
    selectedConcept:"힙합",
  },
];

function reducer(state,action){
  switch(action.type){
    case "INIT":{
      return action.data;
    }
    case "CREATE":{
      return[action.data,...state];
    }
    case "UPDATE":{
      return state.map((it)=>
      String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE":{
      return state.filter((it)=>
      String(it.id) !== String(action.targetId)
      );
    }
    default:{
      return state;
    }
  }
}

export const ReadMoreStateContext = React.createContext();
export const ReadMoreDispatchContext = React.createContext();

function App() {
  const[isDataLoaded,setIsDataLoaded] = useState(false);
  const [data,dispatch] = useReducer(reducer,testData);
  const idRef = useRef(0);


  useEffect(()=>{
    dispatch({
      type:"INIT",
      data:testData,
    });
    setIsDataLoaded(true);
  },[]);


  const onCreate = (playlistTitle,playlistComment,playlistPhoto,musicCheckbox,
    selectedMusic,selectedConcept,playlistDate )=>{
      dispatch({
        type:"CREATE",
        data:{
          id:idRef.current,
          playlistDate:new Date(playlistDate).getTime(),
          playlistTitle,
          playlistComment,
          playlistPhoto,
          musicCheckbox,
          selectedMusic,
          selectedConcept,
        },
      });
      idRef.current +=1;
    };


    
  const onUpdate = (targetId, playlistTitle,playlistComment,playlistPhoto,musicCheckbox,
    selectedMusic,selectedConcept,playlistDate )=>{
      dispatch({
        type:"UPDATE",
        data:{
          id:targetId,
          playlistDate:new Date(playlistDate).getTime(),
          playlistTitle,
          playlistComment,
          playlistPhoto,
          musicCheckbox,
          selectedMusic,
          selectedConcept,
        },
      });
    };

    const onDelete = (targetId) =>{
      dispatch({
        type:"DELETE",
        targetId,
      });
    };


    


if(!isDataLoaded){
  return <div>데이터를 불러오는 중입니다.</div>
}else{


  return (  
    <ReadMoreStateContext.Provider value={data}>
       <ReadMoreDispatchContext.Provider 
       value={{onCreate, onUpdate, onDelete,}}>
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/social" element={<SocialPage />} />

       {/* 소셜 페이지 추가 */}
      <Route path="/streaming" element={<Streaming />} />
      <Route path="/challenge" element={<Challenge />} />
      <Route path="/friendslist" element={<FriendsList />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/userreport" element={<UserReport />} />
      <Route path="/customersupport" element={<CustomerSupport />} />

      <Route path="/chat/:streamId" element={<ChatRoom />} /> {/* ✅ 추가 */}
      {/* 소셜 페이지 추가 끝 */}

      <Route path="/userreport" element={<UserReport />} /> {/* 신고 페이지 */}
      <Route path="/createplaylist" element={<PlaylistCreatePage />} />
  
      <Route path="/PlusMusic" element={<PlusMusic />} /> 
      <Route path="/playlist/:playlistId" element={<PlaylistDetail key={window.location.pathname} />} />
      <Route path="/PlaylistPage" element={<PlaylistPage />} />
      <Route path="/QuizSOLOPlay" element={<QuizSOLOPlay />} />
      <Route path="/QuizMULTIPlay" element={<QuizMULTIPlay />} />
      <Route path="/ChallengeSOLOPlay" element={<ChallengeSOLOPlay />} />
      <Route path="/ChallengeMULTIPlay" element={<ChallengeMULTIPlay />} />

      <Route path="/oauth-callback" element={<OAuthCallback />} />
      
      {/* 관리자 페이지 */}
      <Route path="/admin" element={<AdminMain />} />
    </Routes>

  </div>
  </ReadMoreDispatchContext.Provider>
  </ReadMoreStateContext.Provider>
  );
}
}

export default App;
