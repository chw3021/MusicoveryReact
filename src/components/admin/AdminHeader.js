import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <div>
            <img src="/assets/logo.svg" alt="Musicovery Logo" />
            <nav>
                <Link to="/">홈</Link>
                <Link to="/social">소셜</Link>
                <Link to="/post">게시판</Link>
                <Link to="/admin">관리자</Link>
            </nav>
        </div>
    );
};

export default AdminHeader;
