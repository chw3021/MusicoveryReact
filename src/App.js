import React, { useState } from 'react';
import "./App.css";

import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import SpotifyPlayerWrapper from './components/common/SpotifyPlayerWrapper';
import { TrackProvider } from './context/TrackContext';



function App() {

  
  return (
    <TrackProvider>
      <div className="App">
        <RouterProvider router={root} />
        <SpotifyPlayerWrapper />
      </div>
    </TrackProvider>
  );
}

export default App;
