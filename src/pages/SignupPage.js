import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Header from "../components/common/Header";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = () => {
    // 회원가입 로직
    const signupData = {
      email,
      password,
      nickname,
      phone,
      address,
    };
    console.log("회원가입 시도:", signupData);
  };

  return (
    <div className="container">
      <Header />
      <div className="signup-wrapper">
        <h2>회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button link={"/auth/signup"} className="Button" text={"회원가입"} />
        <Button link={"/"} className="Button outline" text={"취소"} />
      </div>
    </div>
  );
};

export default SignupPage;
