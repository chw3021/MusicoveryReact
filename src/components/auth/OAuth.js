import React, { useEffect, useState } from "react";
import axiosInstance, { baseAxiosInstance } from "../../api/axiosInstance";

const OAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        console.log("getAccessToken 시작");
        const response = await baseAxiosInstance.get(
          "/api/spotify/getUserAccessToken"
        );
        console.log("인증 URL 받음:", response.data);

        const authWindow = window.open(
          response.data,
          "SpotifyAuth",
          "width=600,height=600"
        );

        const handleMessage = async (event) => {
          console.log("메시지 수신:", event.data, "출처:", event.origin);
          if (
            event.origin === `${process.env.REACT_APP_API_URL}` &&
            event.data.type === "auth_complete"
          ) {
            console.log("인증 완료 메시지 받음");

            // 토큰 저장
            localStorage.setItem(
              "MUSICOVERY_ACCESS_TOKEN",
              event.data.accessToken
            );
            localStorage.setItem(
              "MUSICOVERY_REFRESH_TOKEN",
              event.data.refreshToken
            );

            console.log(
              "저장된 토큰:",
              localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")
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

    const handleUserAuthentication = async (accessToken) => {
      try {
        const response = await axiosInstance.get("/api/spotify/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response.data;
        console.log("사용자 정보 받음:", userData);
        // UserDTO 형식에 맞게 변환
        const userDTO = {
          userId: userData.id,
          email: userData.email,
          passwd: "",
          profileImageUrl:
            userData.images.length > 0 ? userData.images[0].url : null,
          bio: userData.bio || "",
          nickname: userData.display_name,
          phone: "", // 필요 시 추가 정보 입력
          address: "", // 필요 시 추가 정보 입력
          isActive: true,
          spotifyConnected: true,
          googleConnected: false,
        };

        // 사용자 정보가 없으면 회원가입, 있으면 로그인 처리
        const userResponse = await axiosInstance.post(
          "/auth/spotify-login",
          userDTO
        );
        const user = userResponse.data;
        console.log("로그인/회원가입 처리된 사용자 정보:", user);

        // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
        setUserInfo(user);
      } catch (error) {
        console.error("사용자 인증 에러:", error);
      }
    };

    // 초기 실행 시 토큰 확인
    const token = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");
    console.log("초기 토큰 확인:", token);

    if (token) {
      handleUserAuthentication(token);
    } else {
      console.log("토큰 없음, 인증 시작");
      getAccessToken();
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("message", () => {});
    };
  }, []);

  return (
    <div>
      <h1>Spotify User Info</h1>
      {userInfo ? (
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      ) : (
        <p>Loading... {console.log("렌더링 중")}</p>
      )}
    </div>
  );
};

export default OAuth;
