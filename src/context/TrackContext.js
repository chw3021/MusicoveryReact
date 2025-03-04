import React, { createContext, useState } from 'react';

export const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};