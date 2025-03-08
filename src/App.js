import React, { useContext } from 'react';
import "./App.css";

import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import SpotifyPlayerWrapper from './components/common/SpotifyPlayerWrapper';
import { TrackProvider } from './context/TrackContext';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import Loading from './components/common/Loading';


function AppInner() {
  // 로딩 상태를 useContext로 가져오기
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className="App">
      {isLoading && <Loading />}
      <RouterProvider router={root} />
      <SpotifyPlayerWrapper />
    </div>
  );
}

function App() {
  return (
    <LoadingProvider>
      <TrackProvider>
        <AppInner />
      </TrackProvider>
    </LoadingProvider>
  );
}

export default App;
