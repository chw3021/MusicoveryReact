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

  const [passwordMatch, setPasswordMatch] = useState(null); // 비밀번호 일치 여부
  const [passwordValid, setPasswordValid] = useState(null); // 비밀번호 유효성 검사
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("MUSICOVERY_USER"));
    if (storedUser) {
      setUserInfo(storedUser);
      setFormData({
        email: storedUser.email,
        passwd: "",
        confirmPasswd: "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "passwd") {
      setPasswordValid(passwordRegex.test(value));
    }

    if (name === "confirmPasswd") {
      setPasswordMatch(value === formData.passwd);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 칸이 비어 있으면 경고 메시지를 표시하고 중단
    if (formData.passwd && !formData.confirmPasswd) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }

    // 비밀번호가 일치하지 않는 경우 경고 메시지를 표시하고 중단
    if (passwordMatch === false) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 조건이 유효하지 않은 경우 경고 메시지를 표시하고 중단
    if (formData.passwd && !passwordValid) {
      alert("비밀번호 조건을 만족하지 않습니다.");
      return;
    }

    const updatedData = {
      email: userInfo.email,
      passwd: formData.passwd.trim() !== "" ? formData.passwd : undefined,
      phone: formData.phone.trim() !== "" ? formData.phone : userInfo.phone,
      address:
        formData.address.trim() !== "" ? formData.address : userInfo.address,
    };

    try {
      const response = await axiosInstance.put(
        `/auth/update/${userInfo.id}`,
        updatedData
      );
      const updatedUser = response.data;

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
          {formData.passwd && (
            <span
              style={{
                color: passwordValid ? "green" : "red",
                fontSize: "0.9rem",
              }}
            >
              {passwordValid
                ? "사용 가능한 비밀번호입니다."
                : "비밀번호는 최소 8자 이상, 대소문자 및 숫자를 포함해야 합니다."}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPasswd">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPasswd"
            name="confirmPasswd"
            value={formData.confirmPasswd}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
          {formData.confirmPasswd && (
            <span
              style={{
                color: passwordMatch ? "green" : "red",
                fontSize: "0.9rem",
              }}
            >
              {passwordMatch
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </span>
          )}
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
