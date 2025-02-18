import {Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import SocialPage from "./pages/SocialPage"; // SocialPage 임포트
import Edit from "./components/playlist/Edit";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import React ,{ useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import PlaylistPage from "./pages/PlaylistPage";
import Create from "./components/playlist/Create";
import PlusMusic from "./components/playlist/PlusMusic";
import UserReport from "./components/social/UserReport"; // UserReport 임포트
import OAuthCallback from "./components/auth/OAuthCallback";




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

      <Route path="/Create" element={<Create />} />
       {/*<Route path="/ReadMore/:id" element={<ReadMore />} />
=======  {/* 소셜 페이지 추가 */}
      <Route path="/userreport" element={<UserReport />} /> {/* 신고 페이지 */}
      <Route path="/Create" element={<Create />} />
  
      <Route path="/PlusMusic" element={<PlusMusic />} /> 
      <Route path="/Edit" element={<Edit />} /> 
      <Route path="/PlaylistDetail" element={<PlaylistDetail />} />
      <Route path="/PlaylistPage" element={<PlaylistPage />} />

      <Route path="/oauth-callback" element={<OAuthCallback />} />

    </Routes>

  </div>
  </ReadMoreDispatchContext.Provider>
  </ReadMoreStateContext.Provider>
  );
}
}

export default App;
