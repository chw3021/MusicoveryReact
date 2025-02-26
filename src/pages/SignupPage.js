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

  const handleSignup = async () => {
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
        <Button link={"/"} text={"취소"} />
      </div>
    </div>
  );
};

export default SignupPage;
