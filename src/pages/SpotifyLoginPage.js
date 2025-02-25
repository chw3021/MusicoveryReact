import React, { useEffect } from "react";
import Button from "../components/common/Button"; // Button 컴포넌트 임포트
import Header from "../components/common/Header";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SpotifyLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리 파라미터에서 Spotify 인증 코드 받아오기
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      console.log("받은 인증 코드:", code); // 받은 인증 코드 확인
      handleSpotifyCallback(code);
    }
  }, []);

  const handleSpotifyLogin = () => {
    const clientId = "432fcaefc80a48469e536fa91cc55064"; // 직접 입력
    const redirectUri = "http://localhost:8080/api/spotify/callback"; // 리디렉션 URI 직접 입력
    const scope = "user-read-private user-read-email"; // 필요한 권한 설정
    const responseType = "code"; // 응답 타입

    // 스포티파이 로그인 페이지로 리디렉션 (OAuth 인증)
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&response_type=${responseType}`;
  };

  const handleSpotifyCallback = async (code) => {
    try {
      console.log("Spotify 인증 코드로 토큰 요청 중...");

      // 인증 코드로 토큰 요청
      const response = await axiosInstance.post("/auth/spotify-callback", {
        code,
      });
      console.log("서버 응답:", response.data); // 서버에서 받은 응답 확인

      if (response.data.token) {
        localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", response.data.token);
        localStorage.setItem(
          "MUSICOVERY_REFRESH_TOKEN",
          response.data.refreshToken
        );

        // 사용자 정보 처리
        const userResponse = await axiosInstance.get("/api/spotify/userInfo", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        const userData = userResponse.data;
        const userDTO = {
          userId: userData.id,
          email: userData.email,
          passwd: "1234", // 사용자 비밀번호는 필요에 맞게 설정
          profileImageUrl:
            userData.images.length > 0 ? userData.images[0].url : null,
          bio: userData.bio || "d",
          nickname: userData.display_name,
          phone: "11", // 필요 시 추가 정보 입력
          address: "f", // 필요 시 추가 정보 입력
          isActive: true,
          spotifyConnected: true,
          googleConnected: false,
        };

        const userLoginResponse = await axiosInstance.post(
          "/auth/spotify-login",
          userDTO
        );
        const user = userLoginResponse.data;

        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
        navigate("/"); // 로그인 후 홈 화면으로 이동
      } else {
        console.error("토큰 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("Spotify 로그인 처리 오류:", error);
      // 서버에서 어떤 오류가 발생했는지 확인하고, 상세 메시지 출력
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      }
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <h1>스포티파이 로그인</h1>
      <Button
        text="스포티파이로 로그인"
        onClick={handleSpotifyLogin}
        color="custom-color"
        link="#" // 실제로는 버튼 클릭 시 로그인 동작을 처리하므로 링크는 사용되지 않음
      />
    </div>
  );
};

export default SpotifyLoginPage;
