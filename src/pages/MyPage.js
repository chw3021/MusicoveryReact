import React, { useState } from "react";
import "../styles/MyPage.css";
import Header from "../components/common/Header";
import ProfileEdit from "../components/mypage/ProfileEdit";
import InfoEdit from "../components/mypage/InfoEdit";
import DeleteAccount from "../components/mypage/DeleteAccount";

function MyPage() {
  const [activeTab, setActiveTab] = useState("profile"); // 기본 탭: 프로필 수정

  const menuItems = [
    { id: "profile", label: "📝 프로필 수정" },
    { id: "info", label: "🔐 개인정보 수정" },
    { id: "delete", label: "❌ 회원 탈퇴" },
  ];

  return (
    <>
      <Header />
      <div className="mypage-container">
        {/* 사이드바 */}
        <aside className="mypage-sidebar">
          <h2>마이페이지</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={activeTab === item.id ? "active" : ""}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* 컨텐츠 영역 */}
        <main className="mypage-content">
          {activeTab === "profile" && <ProfileEdit />}
          {activeTab === "info" && <InfoEdit />}
          {activeTab === "delete" && <DeleteAccount />}
        </main>
      </div>
    </>
  );
}

export default MyPage;
