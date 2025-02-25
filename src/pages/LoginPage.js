import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // axiosInstance 불러오기

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        passwd,
      });

      // 요청이 성공한 경우
      const data = response.data;
      localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);

      // 로그인 성공 후 main 페이지로 이동
      navigate("/");
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
        if (error.response.status === 401) {
          setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
        } else {
          setErrorMessage(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } else {
        // 요청 자체가 실패한 경우
        setErrorMessage("네트워크 오류가 발생했습니다.");
      }
    }
  };

  const handleSignup = () => {
    navigate("/Signup");
  };

  const handleSpotifyLogin = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080"; // 기본 값 설정
    const redirectUri = `${baseUrl}/api/spotify/callback`; // 콜백 URI 설정

    // Spotify API 설정
    const clientId = "432fcaefc80a48469e536fa91cc55064"; // application.properties에서 가져온 Spotify client id
    const scopes = "user-read-email"; // 필요한 스코프 (예: user-read-email)

    // Spotify OAuth 요청 URL
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}`;
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
          text={"로그인"}
          disabled={!email || !passwd}
        />
        <Button
          onClick={handleSignup}
          className="hero-button1"
          text={"회원가입"}
        />
        <Button
          onClick={handleSpotifyLogin}
          className="hero-button1"
          text={"스포티파이로 로그인"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
