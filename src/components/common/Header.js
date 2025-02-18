import React from "react";
import Button from "./Button";
import "../../styles/Header.css";
import logo from "../../assets/logo.png"; // 로고 이미지 경로

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Musicovery Logo" className="logo" />
            <div className="nav">
                <Button text={"홈"} />
                <Button text={"소셜"} />
                <Button text={"게시판"} />
            </div>
        </div>
    );
};

export default Header;