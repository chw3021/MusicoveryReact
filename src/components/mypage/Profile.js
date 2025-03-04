import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 훅 가져오기
import "../../styles/Profile.css";

import defaultProfileImg from "../../assets/defaultProfileImg.png";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    id: "",
    nickname: "",
    profileImageUrl: "",
    bio: "",
  });

  const userInfo = useUserInfo(); // 사용자 정보 가져오기

  useEffect(() => {
    if (!userInfo || !userInfo.id) return; // 사용자 정보와 id가 없으면 요청하지 않음

    // localStorage에서 이전에 로드된 프로필 데이터 확인
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      // 이미 로딩된 프로필이 있다면 바로 사용
      setUserProfile(JSON.parse(storedProfile));
    } else {
      // 프로필 데이터를 서버에서 가져오는 경우
      const fetchUserProfile = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/auth/profile", // POST 방식 요청
            { id: userInfo.id } // 요청 본문에 id 포함
          );

          const profileData = response.data;
          setUserProfile(profileData); // 프로필 데이터 업데이트
          // 로드된 프로필 데이터를 localStorage에 저장
          localStorage.setItem("userProfile", JSON.stringify(profileData));
        } catch (error) {
          console.error("프로필을 가져오는 데 실패했습니다.", error);
        }
      };

      fetchUserProfile();
    }
  }, [userInfo]); // userInfo가 바뀔 때마다 다시 실행

  return (
    <div className="profile-container">
      <h2>프로필 정보</h2>
      <div className="profile-info">
        <div>
          <img
            src={userProfile.profileImageUrl || defaultProfileImg}
            alt="프로필 사진"
            className="profile-image"
          />
        </div>
        <div className="profile-details">
          <h2>{userProfile.nickname}</h2>
          <p>{userProfile.bio || "자기소개가 없습니다."}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
