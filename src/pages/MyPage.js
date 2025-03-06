import React, { useState } from "react";
import "../styles/MyPage.css";
import Header from "../components/common/Header";
import Profile from "../components/mypage/Profile";
import ProfileEdit from "../components/mypage/ProfileEdit";
import InfoEdit from "../components/mypage/InfoEdit";
import DeleteAccount from "../components/mypage/DeleteAccount";
import SpotifyConnect from "../components/mypage/SpotifyConnect";

function MyPage() {
  const [activeTab, setActiveTab] = useState("home"); // 기본 탭: 홈

  const menuItems = [
    { id: "home", label: "🏠 홈" },
    { id: "profile", label: "📝 프로필 수정" },
    { id: "info", label: "🔐 개인정보 수정" },
    { id: "spotify", label: "🎧 스포티파이 연동" },
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
          {activeTab === "home" && <Profile />}
          {activeTab === "profile" && (
            <ProfileEdit setActiveTab={setActiveTab} />
          )}

          {activeTab === "info" && <InfoEdit setActiveTab={setActiveTab} />}
          {activeTab === "spotify" && <SpotifyConnect />}
          {activeTab === "delete" && <DeleteAccount />}
        </main>
      </div>
    </>
  );
}

export default MyPage;
