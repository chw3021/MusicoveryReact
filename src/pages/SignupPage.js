import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
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
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 인증 여부 상태 추가

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
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const handleEmailVerification = async () => {
    try {
      const signupData = { email };
      await axios.post("/auth/signup/verify-email", signupData);
      alert("이메일 인증 메일이 발송되었습니다.");
      setIsEmailSent(true); // 이메일 전송 여부 상태 업데이트
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 메일 발송에 실패했습니다.");
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="signup-wrapper">
        <h2>회원가입</h2>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleEmailVerification}
            text={"이메일 인증"}
            disabled={!email} // 이메일이 없으면 버튼 비활성화
            style={{ marginLeft: "10px" }} // 버튼과 입력란 간격 조정
          />
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleSignup} text={"회원가입"} />
        {isEmailSent ? (
          <p>이메일 인증이 발송되었습니다. 인증을 완료해주세요.</p>
        ) : null}
        <Button link={"/"} text={"취소"} />
      </div>
    </div>
  );
};

export default SignupPage;
