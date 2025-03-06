import React, { useCallback, useState, useEffect } from "react";
import "../../styles/SpotifyConnect.css";
import axiosInstance, { baseAxiosInstance } from "../../api/axiosInstance";
import { logout } from "../auth/auth";

function SpotifyConnect() {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("MUSICOVERY_USER"));
    if (storedUser) {
      setUserInfo(storedUser); // 저장된 사용자 정보가 있으면 상태에 저장
    }
  }, []);

  const handleUserAuthentication = useCallback(async (accessToken) => {
    try {
      const response = await axiosInstance.get("/api/spotify/userInfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = response.data;

      const userDTO = {
        userId: userData.id,
        email: userData.email,
        profileImageUrl:
          userData.images.length > 0 ? userData.images[0].url : null,
        bio: userData.bio || "",
        nickname: userData.display_name,
        phone: "",
        address: "",
        isActive: true,
        spotifyConnected: true,
        googleConnected: false,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const userResponse = await axiosInstance.post(
        "/auth/spotify-login",
        userDTO
      );
      const user = userResponse.data;

      localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user)); // 로컬 스토리지에 저장
      setUserInfo(user); // 상태 업데이트
    } catch (error) {
      console.error("사용자 인증 에러:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message ===
          "비활성화된 계정입니다. 관리자에게 문의하세요."
            ? "비활성화된 계정입니다. 관리자에게 문의하세요."
            : error.response.data.message;
        alert(errorMessage);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }

      logout(); // 로그아웃 처리
    }
  }, []);

  const handleSpotifyConnect = async () => {
    setIsLoading(true); // 로딩 상태 시작
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
          event.origin === process.env.REACT_APP_API_URL &&
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
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // userInfo.userId가 null이 아니면 버튼 비활성화
  const isSpotifyConnected = userInfo?.userId != null;

  return (
    <div className="spotify-connect">
      <h2>스포티파이 연동</h2>
      <p>스포티파이 계정을 연동하여 음악을 관리하고 추천을 받으세요!</p>
      <button
        className={`connect-button ${
          isSpotifyConnected ? "connected-button" : ""
        }`} // 연동 완료 시 클래스 추가
        onClick={handleSpotifyConnect}
        disabled={isSpotifyConnected || isLoading} // userId가 null이 아니거나 로딩 중이면 버튼 비활성화
      >
        {isLoading
          ? "연동 중..."
          : isSpotifyConnected
          ? "연동 완료"
          : "스포티파이 연동하기"}
      </button>
    </div>
  );
}

export default SpotifyConnect;
