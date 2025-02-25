// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const OAuthCallback = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const token = params.get('token');

//         if (token) {
//             // 토큰을 로컬 스토리지에 저장
//             localStorage.setItem('MUSICOVERY_ACCESS_TOKEN', token);
//             // 홈으로 리다이렉션
//             navigate('/');
//         }
//     }, [navigate, location]);

//     return <div>인증 처리 중...</div>;
// };

// export default OAuthCallback;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      axiosInstance
        .post("/auth/spotify-callback", { code })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);

          // 로그인 후 처리된 내용을 부모 윈도우나 다른 타겟 윈도우로 전달
          const targetWindow = window.opener; // 예시: 팝업에서 부모 윈도우로 메시지 전달

          if (targetWindow) {
            targetWindow.postMessage("Spotify login successful", "*");
          } else {
            console.error(
              "Target window is null or not available for postMessage"
            );
          }

          navigate("/"); // 성공 후 홈 페이지로 이동
        })
        .catch((error) => {
          console.error("Spotify 로그인 오류:", error);
          navigate("/Login");
        });
    }
  }, [navigate, location]);

  return <div>Spotify 로그인 중...</div>;
};

export default OAuthCallback;
