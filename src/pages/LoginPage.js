import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/common/Header";
import axiosInstance, { baseAxiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // 스타일 추가

const LoginPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 랜덤 비밀번호 생성 함수
  const generateRandomPassword = (length = 12) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  const handleUserAuthentication = useCallback(
    async (accessToken) => {
      try {
        const response = await axiosInstance.get("/api/spotify/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response.data;

        console.log(userData);

        const randomPassword = generateRandomPassword();

        const userDTO = {
          userId: userData.id,
          email: userData.email,
          passwd: randomPassword,
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

        localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
        setUserInfo(user);

        navigate("/");
      } catch (error) {
        console.error("사용자 인증 에러:", error);
        navigate("/Login");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");
    if (token && !userInfo) {
      handleUserAuthentication(token);
    }
  }, [handleUserAuthentication, userInfo]);

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

  const handleEmailLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        passwd: password,
      });
      const user = response.data;
      localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
      setUserInfo(user);
      navigate("/");
    } catch (error) {
      console.error("이메일 로그인 에러:", error);
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h1>로그인</h1>
        <div className="login-form">
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
          <div className="login-buttons">
            <button className="loginpagebtn" onClick={handleEmailLogin}>
              로그인
            </button>
            <button className="loginpagebtn signupbtn" onClick={goToSignup}>
              회원가입
            </button>
          </div>
        </div>
        <hr />
        <h2>소셜 로그인</h2>
        <button className="loginpagebtn" onClick={getAccessToken}>
          스포티파이로 로그인
        </button>
        {/* {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>} */}
      </div>
    </div>
  );
};

export default LoginPage;
