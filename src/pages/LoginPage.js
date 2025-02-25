import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import "../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios 기본 URL 설정 (필요에 따라 수정)
axios.defaults.baseURL = "http://localhost:8080";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // 로그인 성공 시 토큰 저장
        localStorage.setItem("token", response.data.token);

        // 메인 페이지로 이동
        navigate("/main");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
        } else {
          setErrorMessage(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } else {
        setErrorMessage("네트워크 오류가 발생했습니다.");
      }
    }
  };

  const handleSignup = () => {
    navigate("/Signup");
  };

  const handleSpotifyLogin = () => {
    window.location.href = "/oauth2/authorization/spotify";
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Button
          onClick={handleLogin}
          className="hero-button1"
          text={"로그인"}
          disabled={!email || !password} // 이메일과 비밀번호가 비어있으면 비활성화
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
