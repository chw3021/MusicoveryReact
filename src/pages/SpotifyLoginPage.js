import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SpotifyLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 'code' 파라미터 가져오기
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      // 백엔드로 Spotify 인증 코드 전송
      axiosInstance
        .post("/auth/spotify-callback", { code })
        .then((response) => {
          // 인증 성공 시, 받은 토큰을 로컬스토리지에 저장
          const data = response.data;
          localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);
          // 메인 페이지로 리다이렉트
          navigate("/main");
        })
        .catch((error) => {
          console.error("Spotify 로그인 오류:", error);
          // 로그인 페이지로 리다이렉트
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>Spotify 로그인 중...</div>;
};

export default SpotifyLoginPage;
