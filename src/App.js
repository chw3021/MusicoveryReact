import React, { useContext } from 'react';
import "./App.css";

import { HashRouter } from "react-router-dom"; // HashRouter 임포트
import root from "./router/root";
import SpotifyPlayerWrapper from './components/common/SpotifyPlayerWrapper';
import { TrackProvider } from './context/TrackContext';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import Loading from './components/common/Loading';
import RootRoutes from "./router/root"; // RootRoutes 임포트


function AppInner() {
  // 로딩 상태를 useContext로 가져오기
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className="App">
      {isLoading && <Loading />}
      <HashRouter>
        <RootRoutes /> {/* RouterProvider 대신 RootRoutes 사용 */}
      </HashRouter>
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