import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/DeleteAccount.css";

function DeleteAccount() {
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleDeleteClick = () => {
    setShowPasswordInput(true);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmDelete = async () => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      await axios.delete("http://localhost:8080/auth/delete", {
        data: { id: userInfo.id, password },
      });

      // 로컬 스토리지에서 사용자 정보 삭제 후 홈으로 이동
      localStorage.removeItem("MUSICOVERY_ACCESS_TOKEN");
      localStorage.removeItem("MUSICOVERY_REFRESH_TOKEN");
      localStorage.removeItem("MUSICOVERY_USER");

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("회원 탈퇴에 실패했습니다. 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="mypage-section">
      <h2>회원 탈퇴</h2>
      <p>정말 탈퇴하시겠습니까?</p>

      {!showPasswordInput ? (
        <button className="delete-button" onClick={handleDeleteClick}>
          회원 탈퇴
        </button>
      ) : (
        <div className="password-confirm">
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handleChange}
          />
          <button
            className="confirm-delete-button"
            onClick={handleConfirmDelete}
          >
            탈퇴 확인
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
