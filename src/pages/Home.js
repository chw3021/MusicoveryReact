//홈화면

// import Edit from "./Edit";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import React, { useState, useEffect } from "react";
import OAuth from "../components/auth/OAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../components/auth/auth";

// import useReadMore from "../hooks/useReadMore.js";
// import useReadMore from "../hooks/"
// import PlaylistPage from "./PlaylistPage";

import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  // const onClickHere = () =>{
  //     navigate("/playlistPage");
  // }
  const [showOAuth, setShowOAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const user = localStorage.getItem("MUSICOVERY_USER");
    setIsLoggedIn(!!user); // 유저 정보가 있으면 true, 없으면 false
  }, []);

  const handleLoginClick = () => {
    setShowOAuth(true);
  };

  const handleLogoutClick = () => {
    logout();
    setIsLoggedIn(false); // 로그아웃 시 상태 업데이트
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

  const adminLoginClick = () => {
    navigate("/admin");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="container">
      <Header />
      <div className="hero">
        <div className="hero-content">
          <Button link={"/PlaylistPage"} text={"내 플레이리스트"} />
          <h1>Heading</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
          <p>
            {" "}
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* 로그인 상태에 따라 버튼 표시 */}
          {!isLoggedIn ? (
            <>
              <button className="hero-button1" onClick={goToLogin}>
                로그인
              </button>
              <button className="hero-button2" onClick={goToSignup}>
                회원가입
              </button>
            </>
          ) : (
            <button className="hero-button1" onClick={handleLogoutClick}>
              로그아웃
            </button>
          )}

          <hr></hr>
          <button className="hero-button1" onClick={handleLoginClick}>
            임시 로그인(스포티파이로 로그인)
          </button>
          <button
            href="#/admin"
            className="hero-button3"
            onClick={adminLoginClick}
          >
            임시 관리자페이지
          </button>

          {showOAuth && <OAuth />}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
