import React, { createContext, useState } from 'react';

// 전역에서 접근 가능한 변수와 함수
let _isPlaying = false;
let _setIsPlaying = null;
let _debounceTimer = null;
let _lastSetFalseTime = 0;
const DEBOUNCE_DELAY = 500;

export const setIsPlayingFalse = () => {
  // 마지막으로 false로 설정한 시간 확인
  const now = Date.now();
  if (now - _lastSetFalseTime < DEBOUNCE_DELAY) {
    clearTimeout(_debounceTimer);
  }
  // 새로운 타이머 설정
  _debounceTimer = setTimeout(() => {
    if (_setIsPlaying) {
      _setIsPlaying(false);
    }
    _lastSetFalseTime = Date.now();
  }, DEBOUNCE_DELAY);
};


export const getIsPlaying = () => _isPlaying;
export const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가
  const [deviceReady, setDeviceReady] = useState(false); // 디바이스 초기화 상태 추가

  // isPlaying 값 변경할 때 래핑된 함수 사용
  const handleSetIsPlaying = (value) => {
    _isPlaying = value;
    setIsPlaying(value);
  };
  // 전역 변수 업데이트
  _isPlaying = isPlaying;
  _setIsPlaying = setIsPlaying;
  
  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying: handleSetIsPlaying, deviceReady, setDeviceReady }}>
      {children}
    </TrackContext.Provider>
  );
};