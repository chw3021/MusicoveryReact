import React, { useState } from "react";
import Header from "../components/common/Header";
import "../styles/AdminPage.css";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserManagement from "../components/admin/UserManagement";
import ReportManagement from "../components/admin/ReportManagement";


const AdminPage = () => {
    const [activeSection, setActiveSection] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "📊 대시보드" },
        { id: "users", label: "👤 사용자 관리" },
        { id: "report", label: "🚨  신고 관리" },
        { id: "support", label: "📞 고객 지원" }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <AdminDashboard setActiveSection={setActiveSection} />;
            case "users":
                return <UserManagement />;
            case "report":
                return <ReportManagement />;
            case "support":
                return <div>📞 고객 지원</div>;
            default:
                return <AdminDashboard setActiveSection={setActiveSection} />;
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
