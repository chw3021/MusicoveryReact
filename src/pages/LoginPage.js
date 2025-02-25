import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // 일반 로그인
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        passwd,
      });

      const data = response.data;
      localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  // Spotify OAuth 로그인
  const handleSpotifyLogin = () => {
    const redirectUri = `${process.env.REACT_APP_API_URL}/api/spotify/callback`;
    const clientId = "432fcaefc80a48469e536fa91cc55064";
    const scopes = "user-read-email";

    // Spotify 인증 URL로 리디렉션
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}`;
  };

  // Spotify 인증 처리 (OAuth Callback에서 사용할 함수)
  const handleSpotifyCallback = async (code) => {
    try {
      // 인증 코드로 토큰 요청
      const response = await axiosInstance.post("/auth/spotify-callback", {
        code,
      });

      const data = response.data;
      localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);
      localStorage.setItem("MUSICOVERY_REFRESH_TOKEN", data.refreshToken);

      // 사용자 정보 처리
      const userResponse = await axiosInstance.get("/api/spotify/userInfo", {
        headers: {
          Authorization: `Bearer ${data.token}`,
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
    } catch (error) {
      console.error("Spotify 로그인 처리 오류:", error);
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="login-wrapper">
        <h2 className="login-title">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Button
          onClick={handleLogin}
          className="hero-button1"
          text="로그인"
          disabled={!email || !passwd}
        />
        <Button
          onClick={handleSpotifyLogin}
          className="hero-button1"
          text="스포티파이로 로그인"
        />
      </div>
    </div>
  );
};

export default LoginPage;
