import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance"; // axios 인스턴스 임포트
import "../../styles/InfoEdit.css";
import { useNavigate } from "react-router-dom";

function InfoEdit({ setActiveTab }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    passwd: "",
    confirmPasswd: "",
    phone: "",
    address: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(null); // 비밀번호 일치 여부 상태 (null: 검사 안함, true: 일치, false: 불일치)

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("MUSICOVERY_USER"));
    if (storedUser) {
      setUserInfo(storedUser);
      setFormData({
        email: storedUser.email,
        passwd: "", // 비밀번호는 수정할 수 있도록 빈 값으로 설정
        confirmPasswd: "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 비밀번호 확인 필드가 변경될 때 비밀번호와 일치하는지 체크
    if (name === "confirmPasswd") {
      setPasswordMatch(value === formData.passwd);
    }
  };

  // 개인정보 수정 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordMatch === false) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 기존 정보를 유지하면서 비어있는 값은 업데이트하지 않도록 설정
    const updatedData = {
      email: userInfo.email, // 이메일은 수정 불가이므로 유지
      passwd: formData.passwd.trim() !== "" ? formData.passwd : undefined,
      phone: formData.phone.trim() !== "" ? formData.phone : userInfo.phone,
      address:
        formData.address.trim() !== "" ? formData.address : userInfo.address,
    };

    try {
      // 백엔드로 수정된 정보  보내기
      const response = await axiosInstance.put(
        `/auth/update/${userInfo.id}`,
        updatedData
      );
      const updatedUser = response.data;

      // 성공적으로 수정된 정보 업데이트
      localStorage.setItem("MUSICOVERY_USER", JSON.stringify(updatedUser));
      alert("정보가 성공적으로 수정되었습니다.");
      setActiveTab("home");
      navigate("/mypage");
    } catch (error) {
      console.error("정보 수정 중 오류 발생:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mypage-section">
      <h2>개인정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwd">비밀번호</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            placeholder="비밀번호 변경"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPasswd">
            비밀번호 확인
            {passwordMatch === false && (
              <span style={{ color: "red" }}>
                비밀번호가 일치하지 않습니다.
              </span>
            )}
            {passwordMatch === true && (
              <span style={{ color: "green" }}>비밀번호가 일치합니다.</span>
            )}
          </label>

          <input
            type="password"
            id="confirmPasswd"
            name="confirmPasswd"
            value={formData.confirmPasswd}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default InfoEdit;
