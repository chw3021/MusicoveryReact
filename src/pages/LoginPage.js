import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/common/Header";
import axiosInstance, { baseAxiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // 스타일 추가
import { logout } from "../components/auth/auth";

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

        console.log(response);

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
          isActive: true, // isActive는 true로 설정
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
        if (error.response && error.response.data) {
          // 서버에서 반환된 에러 메시지 확인
          if (
            error.response.data.message ===
            "비활성화된 계정입니다. 관리자에게 문의하세요."
          ) {
            alert("비활성화된 계정입니다. 관리자에게 문의하세요.");
          } else {
            // 다른 에러 메시지 처리
            alert(error.response.data.message);
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }

        // 로그인 페이지로 이동
        logout();
        // navigate("/login");
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

      const accessToken = response.data.accessToken;
      const user = response.data;
      localStorage.setItem("MUSICOVERY_USER", JSON.stringify(user));
      localStorage.setItem("LOCAL_ACCESS_TOKEN", accessToken);
      setUserInfo(user);
      navigate("/");
    } catch (error) {
      console.error("이메일 로그인 에러:", error);

      // 서버에서 비활성화된 계정 오류를 받았을 때
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "비활성화된 계정입니다. 관리자에게 문의하세요."
      ) {
        setErrorMessage("비활성화된 계정입니다. 관리자에게 문의하세요.");
      } else if (error.response && error.response.data) {
        // 서버에서 반환된 다른 오류 메시지 처리
        setErrorMessage(error.response.data.message);
      } else {
        // 기본 오류 메시지 처리
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    }
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-wrapper">
          <h2>로그인</h2>
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
              <button className="common-button" onClick={handleEmailLogin}>
                로그인
              </button>
              <button className="common-button signupbtn" onClick={goToSignup}>
                회원가입
              </button>
            </div>
          </div>
          <hr />
          <h2>소셜 로그인</h2>
          <button className="common-button" onClick={getAccessToken}>
            스포티파이로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
