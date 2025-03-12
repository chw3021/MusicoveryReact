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
  const [trackList, setTrackList] = useState([]); // 트랙 리스트 추가
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 재생 중인 트랙의 인덱스
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceReady, setDeviceReady] = useState(false);

  // 현재 트랙 계산
  const currentTrack = trackList.length > 0 ? trackList[currentIndex] : null;

  // 트랙 리스트에 트랙 추가
  const addTrackToList = (track) => {
    // 이미 리스트에 있는지 확인
    const existingIndex = trackList.findIndex(t => t.id === track.id);
    
    if (existingIndex >= 0) {
      // 이미 리스트에 있으면 해당 인덱스로 이동
      setCurrentIndex(existingIndex);
    } else {
      // 없으면 리스트에 추가하고 마지막 인덱스로 이동
      setTrackList([...trackList, track]);
      setCurrentIndex(trackList.length);
    }
  };


  // 여러 트랙을 한번에 리스트에 추가하는 함수 추가
  const addTracksToList = (tracks) => {
    if (!tracks || tracks.length === 0) return;
    
    // 중복 제거: 이미 리스트에 있는 트랙 필터링
    const uniqueTracks = tracks.filter(
      track => !trackList.some(t => t.id === track.id)
    );
    
    if (uniqueTracks.length === 0) {
      // 이미 모든 트랙이 리스트에 있으면 첫 번째 트랙으로 이동
      setCurrentIndex(trackList.findIndex(t => t.id === tracks[0].id));
    } else {
      // 새로운 트랙이 있으면 리스트에 추가
      const newTrackList = [...trackList, ...uniqueTracks];
      setTrackList(newTrackList);
      // 추가된 첫 번째 트랙 위치로 이동
      setCurrentIndex(trackList.length);
    }
  };

  // 다음 트랙으로 이동
  const nextTrack = () => {
    if (trackList.length > 0) {
      setCurrentIndex((currentIndex + 1) % trackList.length);
    }
  };

  // 이전 트랙으로 이동
  const previousTrack = () => {
    if (trackList.length > 0) {
      setCurrentIndex((currentIndex - 1 + trackList.length) % trackList.length);
    }
  };

  // 특정 인덱스의 트랙으로 이동
  const goToTrack = (index) => {
    if (index >= 0 && index < trackList.length) {
      setCurrentIndex(index);
    }
  };

  // 트랙 리스트 초기화
  const clearTrackList = () => {
    setTrackList([]);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  // isPlaying 값 변경할 때 래핑된 함수 사용
  const handleSetIsPlaying = (value) => {
    _isPlaying = value;
    setIsPlaying(value);
  };
  
  // 전역 변수 업데이트
  _isPlaying = isPlaying;
  _setIsPlaying = setIsPlaying;
  
  return (
    <TrackContext.Provider value={{ 
      trackList, 
      currentTrack, 
      currentIndex, 
      addTrackToList, 
      addTracksToList,
      nextTrack, 
      previousTrack, 
      goToTrack, 
      clearTrackList,
      isPlaying, 
      setIsPlaying: handleSetIsPlaying, 
      deviceReady, 
      setDeviceReady 
    }}>
      {children}
    </TrackContext.Provider>
  );
};