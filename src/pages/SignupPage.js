import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import axios from "../api/axiosInstance";
import "../styles/Signup.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSignup = async () => {
    if (!isEmailSent) {
      alert(
        "이메일 인증이 완료되지 않았습니다. 인증 후 회원가입을 진행해주세요."
      );
      return;
    }

    const signupData = {
      email,
      passwd,
      nickname,
      phone,
      address,
    };

    try {
      await axios.post("/auth/signup", signupData);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); // 이미 사용중인 이메일입니다.
      } else {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  const handleEmailVerification = async () => {
    try {
      const signupData = { email };
      const response = await axios.post(
        "/auth/signup/verify-email",
        signupData
      );
      alert(response.data.message); // 이메일 인증 메일이 발송되었습니다.
      setIsEmailSent(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); // 이미 사용중인 이메일입니다.
      } else {
        console.error("이메일 인증 실패:", error);
        alert("이메일 인증 메일 발송에 실패했습니다.");
      }
    }
  };

  // const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const checkNickname = async (value) => {
    try {
      const response = await axios.get(`/auth/signup/check-nickname`, {
        params: { nickname: value },
      });
      setNicknameMessage(response.data.message); // 사용 가능한 닉네임입니다.
      setIsNicknameValid(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNicknameMessage(error.response.data.message); // 이미 사용중인 닉네임입니다.
        setIsNicknameValid(false);
      } else {
        console.error("닉네임 중복 확인 실패:", error);
        setNicknameMessage("닉네임 중복 확인에 실패했습니다.");
        setIsNicknameValid(false);
      }
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (value.trim() !== "") {
      checkNickname(value);
    } else {
      setNicknameMessage("");
      setIsNicknameValid(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="signup-container">
        <div className="signup-wrapper">
          <h2>회원가입</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
            />
            <button
              onClick={handleEmailVerification}
              disabled={!email}
              className="common-button"
            >
              이메일 인증
            </button>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            className="signup-input"
          />
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            className="signup-input nickname-input"
          />
          <p
            className={`nickname-message ${
              isNicknameValid ? "valid" : "invalid"
            }`}
          >
            {nicknameMessage}
          </p>
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="signup-input"
          />
          <input
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="signup-input"
          />
          <button onClick={handleSignup} className="common-button ">
            회원가입
          </button>
          <button onClick={() => navigate("/login")} className="common-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
