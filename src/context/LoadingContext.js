import React, { createContext, useState, useEffect, useContext } from 'react';
import { setGlobalLoadingCallback } from '../utils/loadingStore.js'; // named import

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 전역으로 로딩 상태를 컨트롤할 수 있는 콜백 등록
    setGlobalLoadingCallback((loading) => {
      setIsLoading(loading);
    });
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};