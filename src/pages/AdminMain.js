import React from "react";
import AdminHeader from "../components/admin/AdminHeader";

const AdminMain = () => {
    return (
        <div>
            <AdminHeader />
            <div>
                <h1>관리자 페이지</h1>
                <p>여기에서 사용자 관리 및 신고 내용을 확인할 수 있습니다.</p>
            </div>
        </div>
    );
};

export default AdminMain;
