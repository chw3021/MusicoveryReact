import React from "react";
import Button from "./Button";
import "../../styles/SocialHeader.css";

const SocialHeader = () => {
    return (
        <div className="social-header">
            <Button text={"게시판홈"} />
            <Button text={"공지사항"} />
            <Button text={"커뮤니티"} />
            <Button text={"문의사항"} />
        </div>
    );
};

export default SocialHeader;