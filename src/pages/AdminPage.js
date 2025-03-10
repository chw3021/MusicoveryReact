import React, { useState } from "react";
import Header from "../components/common/Header";
import "../styles/AdminPage.css";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserManagement from "../components/admin/UserManagement";
import ReportManagement from "../components/admin/ReportManagement";
import AdminSupport from "../components/admin/AdminSupport";

const AdminPage = () => {
    const [activeSection, setActiveSection] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "📊 대시보드" },
        { id: "users", label: "👤 사용자 관리" },
        { id: "report", label: "🚨 신고 관리" },
        { id: "support", label: "📞 고객 지원" }
    ];

    const sections = {
        dashboard: <AdminDashboard setActiveSection={setActiveSection} />,
        users: <UserManagement />,
        report: <ReportManagement />,
        support: <AdminSupport />,
    };

    return (
        <div>
            <Header />
            <div className="admin-container">
                <aside className="sidebar">
                    <h2>관리자 메뉴</h2>
                    <ul>
                        {menuItems.map(({ id, label }) => (
                            <li
                                key={id}
                                className={activeSection === id ? "active" : ""}
                                onClick={() => setActiveSection(id)}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="content">{sections[activeSection] || sections.dashboard}</main>
            </div>
        </div>
    );
};

export default AdminPage;
