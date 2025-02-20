import React from "react";
import Button from "./Button";
import "../../styles/SocialHeader.css";

const SocialHeader = () => {
    return (
        <div className="social-header">
            <Button text={"게시판홈"} color= "blue"/>
            <Button text={"공지사항"} color= "blue"/>
            <Button text={"커뮤니티"} color= "blue"/>
            <Button text={"문의사항"}  color= "blue"/>
        </div>
    );
};

export default SocialHeader;