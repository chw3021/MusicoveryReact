import React from "react";
import Button from "./Button";
import "../../styles/SocialHeader.css";

const SocialHeader = ({ onContentChange }) => {
    return (
        <div className="social-header">
            <Button text={"게시판홈"} color="blue" onClick={() => onContentChange('post')} />
            <Button text={"문의사항"} color="blue" onClick={() => onContentChange('customerSupport')} />
        </div>
    );
};

export default SocialHeader;