import React, { useState } from "react";
import Header from "../components/common/Header";
import "../styles/AdminPage.css";
import AdminDashboard from "../components/admin/AdminDashboard";

const AdminPage = () => {
    const [activeSection, setActiveSection] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "📊 대시보드" },
        { id: "users", label: "👤 사용자 관리" },
        { id: "content", label: "📝 콘텐츠 관리" },
        { id: "support", label: "📞 고객 지원" }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <AdminDashboard />;
            case "users":
                return <div>👤 사용자 관리</div>;
            case "content":
                return <div>📝 콘텐츠 관리</div>;
            case "support":
                return <div>📞 고객 지원</div>;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div>
            <Header />
            <div className="admin-container">
                <aside className="sidebar">
                    <h2>관리자 메뉴</h2>
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                className={activeSection === item.id ? "active" : ""}
                                onClick={() => setActiveSection(item.id)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="content">{renderContent()}</main>
            </div>
        </div>
    );
};

export default AdminPage;
