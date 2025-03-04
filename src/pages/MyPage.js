import React, { useState } from "react";
import "../styles/MyPage.css";
import Header from "../components/common/Header";

function MyPage() {
  const [activeTab, setActiveTab] = useState("profile"); // 기본 탭: 프로필 수정

  const menuItems = [
    { id: "profile", label: "📝 프로필 수정" },
    { id: "info", label: "🔐 개인정보 수정" },
    { id: "delete", label: "❌ 회원 탈퇴" },
  ];

  function ProfileEdit() {
    return (
      <div className="mypage-section">
        <h2>프로필 수정</h2>
        <p>닉네임, 프로필 사진 변경 가능</p>
      </div>
    );
  }

  function InfoEdit() {
    return (
      <div className="mypage-section">
        <h2>개인정보 수정</h2>
        <p>이메일, 비밀번호 변경 가능</p>
      </div>
    );
  }

  function DeleteAccount() {
    return (
      <div className="mypage-section">
        <h2>회원 탈퇴</h2>
        <p>정말 탈퇴하시겠습니까?</p>
        <button className="delete-button">회원 탈퇴</button>
      </div>
    );
  }

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
