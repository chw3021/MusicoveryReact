import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import axiosInstance, { baseAxiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // ✅ useCallback으로 감싸기
  const handleUserAuthentication = useCallback(
    async (accessToken) => {
      try {
        const response = await axiosInstance.get("/api/spotify/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response.data;

        // UserDTO 형식에 맞게 변환
        const userDTO = {
          userId: userData.id,
          email: userData.email,
          passwd: "1234",
          profileImageUrl:
            userData.images.length > 0 ? userData.images[0].url : null,
          bio: userData.bio || "d",
          nickname: userData.display_name,
          phone: "11",
          address: "f",
          isActive: true,
          spotifyConnected: true,
          googleConnected: false,
          createdAt: new Date().toISOString().slice(0, 10),
        };

        // 사용자 정보가 없으면 회원가입, 있으면 로그인 처리
        const userResponse = await axiosInstance.post(
          "/auth/spotify-login",
          userDTO
        );
        const user = userResponse.data;

        // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
        setUserInfo(user); // 🔥 userInfo에 저장

        // 로그인 후 홈으로 이동
        navigate("/");
      } catch (error) {
        console.error("사용자 인증 에러:", error);
        navigate("/Login");
      }
    },
    [navigate]
  ); // 🔑 navigate를 의존성 배열에 포함

  useEffect(() => {
    const token = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");

    // 🔥 토큰이 있고 userInfo가 없는 경우에만 인증 처리
    if (token && !userInfo) {
      handleUserAuthentication(token);
    }
  }, [handleUserAuthentication, userInfo]); // 🔥 handleUserAuthentication과 userInfo를 의존성으로 추가

  // 스포티파이 액세스 토큰 요청
  const getAccessToken = async () => {
    try {
      const response = await baseAxiosInstance.get(
        "/api/spotify/getUserAccessToken"
      );

      const authWindow = window.open(
        response.data,
        "SpotifyAuth",
        "width=600,height=600"
      );

      const handleMessage = async (event) => {
        if (
          event.origin === `${process.env.REACT_APP_API_URL}` &&
          event.data.type === "auth_complete"
        ) {
          localStorage.setItem(
            "MUSICOVERY_ACCESS_TOKEN",
            event.data.accessToken
          );
          localStorage.setItem(
            "MUSICOVERY_REFRESH_TOKEN",
            event.data.refreshToken
          );
          authWindow.close();
          await handleUserAuthentication(event.data.accessToken);

          window.removeEventListener("message", handleMessage);
        }
      };

      window.addEventListener("message", handleMessage);
    } catch (error) {
      console.error("인증 과정 에러:", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>스포티파이 로그인</h1>
      <Button text="스포티파이로 로그인" onClick={getAccessToken} />
      {/* 🔥 userInfo가 있을 때만 사용자 정보 출력 */}
      {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
    </div>
  );
};

export default LoginPage;
