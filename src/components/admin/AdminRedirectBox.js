import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminRedirectBox.css";

const AdminRedirectBox = () => {
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("MUSICOVERY_USER"));
    console.log("admin:", JSON.stringify(userData)); // 수정된 부분
    if (userData?.admin) {
      setShowBox(true); // admin인 경우 팝업을 표시
    }
  }, []);

  const handleNavigate = (path, closeBox = true) => {
    if (closeBox) {
      setShowBox(false); // 이동 후 팝업을 닫음
    }
    navigate(path);
  };

  if (!showBox) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-box">
        <p>관리자 계정으로 로그인하셨습니다.</p>
        <button onClick={() => handleNavigate("/", true)}>홈으로 이동</button>
        <button onClick={() => handleNavigate("/admin", false)}>
          관리자 페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default AdminRedirectBox;
