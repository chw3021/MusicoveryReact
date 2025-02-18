import React from "react";
import Button from "./Button";
import "../../styles/Header.css";
import logo from "../../assets/logo.png"; // 로고 이미지 경로
import { useNavigate } from "react-router-dom";
<link rel="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"></link>




const Header = () =>{
const navigate = useNavigate();


const goHome = () =>{
    navigate("/Home");
}
    return(
        <div className="header">
        <div id="forFont">Musicovery</div>
        <Button text={"홈"}  />
        <Button text={"소셜"} />
        <Button text={"게시판"} />
        </div>
    );
}

export default Header;