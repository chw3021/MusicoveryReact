//홈화면

// import Edit from "./Edit";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import React, { useState } from "react";
import OAuth from "../components/auth/OAuth";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../components/auth/auth";
// import useReadMore from "../hooks/useReadMore.js";
// import useReadMore from "../hooks/"
// import PlaylistPage from "./PlaylistPage";

const Home = () =>{
    const navigate = useNavigate();

    // const onClickHere = () =>{
    //     navigate("/playlistPage");
    // }
    const [showOAuth, setShowOAuth] = useState(false);


    const handleLoginClick = () => {
        setShowOAuth(true);
    };

    const handleLogoutClick = () => {
        logout();
    };


    return ( 
        <div className="container">
            <Header />  
            {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}

            
            <div className="hero">
                <div className="hero-content">
                <Button link={"/PlaylistPage"} 
                text={"내라이브러리로 가기화면보려고만든거예여삭제하면안대여!!!"} />
                    <h1>Heading</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
                    <p> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" className="hero-button1">로그인</a>
                    <a href="#" className="hero-button2">회원가입</a>
                    <hr></hr>
                    <button className="hero-button1" onClick={handleLoginClick}>임시 로그인(스포티파이로 로그인)</button>
                    <button className="hero-button2" onClick={handleLogoutClick}>
                        임시 로그아웃
                    </button>
                    {showOAuth && <OAuth />}
                {/* <PlaylistPage onClick={goPlaylistPage} />     */}
                </div>
            </div>
            {/* <ReadMoreList data={filteredData} />  이게 새로 만들기*/}
            
        </div>
  
    );
}
export default Home;