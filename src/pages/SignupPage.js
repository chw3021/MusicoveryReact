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
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [passwdMessage, setPasswdMessage] = useState("");
  const [isPasswdValid, setIsPasswdValid] = useState(false);

  // 닉네임 정규식: 2~20자 이내의 한글, 영문, 숫자만 허용 (특수문자 허용)
  const nicknameRegex =
    /^[a-zA-Z가-힣0-9!@#$%^&*()_+~`|}{[\]:;?><,./-=]{2,20}$/;
  // 비밀번호 정규식: 최소 8자, 대소문자 및 숫자 포함
  const passwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+~`|}{[\]:;?><,./-=]{8,}$/;

  const handleSignup = async () => {
    if (!isEmailSent) {
      alert(
        "이메일 인증이 완료되지 않았습니다. 인증 후 회원가입을 진행해주세요."
      );
      return;
    }

    if (!isNicknameValid || !isPasswdValid) {
      alert("입력한 정보가 올바르지 않습니다. 다시 확인해주세요.");
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
        alert(error.response.data.message);
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
      alert(response.data.message);
      setIsEmailSent(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error("이메일 인증 실패:", error);
        alert("이메일 인증 메일 발송에 실패했습니다.");
      }
    }
  };

  const checkNickname = async (value) => {
    if (!nicknameRegex.test(value)) {
      setNicknameMessage(
        "닉네임은 2~20자 이내의 한글, 영문, 숫자만 허용됩니다."
      );
      setIsNicknameValid(false);
      return;
    }

    try {
      const response = await axios.get(`/auth/signup/check-nickname`, {
        params: { nickname: value },
      });
      setNicknameMessage(response.data.message);
      setIsNicknameValid(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNicknameMessage(error.response.data.message);
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

  const handlePasswdChange = (e) => {
    const value = e.target.value;
    setPasswd(value);

    if (!passwdRegex.test(value)) {
      setPasswdMessage(
        "비밀번호는 최소 8자, 대소문자 및 숫자를 포함해야 합니다."
      );
      setIsPasswdValid(false);
    } else {
      setPasswdMessage("");
      setIsPasswdValid(true);
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
            onChange={handlePasswdChange}
            className="signup-input"
          />
          <span
            className={`signup-message ${isPasswdValid ? "valid" : "invalid"}`}
          >
            {passwdMessage}
          </span>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            className="signup-input nickname-input"
          />
          <span
            className={`signup-message ${
              isNicknameValid ? "valid" : "invalid"
            }`}
          >
            {nicknameMessage}
          </span>
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
          <button onClick={handleSignup} className="common-button">
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
