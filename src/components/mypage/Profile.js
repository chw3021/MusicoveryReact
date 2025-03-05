import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/Profile.css";

import defaultProfileImg from "../../assets/defaultProfileImg.png";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    id: "",
    nickname: "",
    profileImageUrl: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  const userInfo = useUserInfo(); // 사용자 정보 가져오기

  useEffect(() => {
    if (!userInfo || !userInfo.id) return; // 사용자 정보와 id가 없으면 요청하지 않음

    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/profile",
          { id: userInfo.id }
        );

        setUserProfile(response.data);
        setLoading(false); // 데이터 로딩이 끝났으면 로딩 상태 변경
      } catch (error) {
        console.error("프로필을 가져오는 데 실패했습니다.", error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 종료
      }
    };

    fetchUserProfile();
  }, [userInfo]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 프로필 이미지 URL이 없으면 기본 이미지 사용
  const profileImageUrl = userProfile.profileImageUrl
    ? `http://localhost:8080/images/${userProfile.profileImageUrl}`
    : defaultProfileImg;

  return (
    <div className="profile-container">
      <h2>프로필 정보</h2>
      <div className="profile-info">
        <div>
          <img
            src={profileImageUrl}
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
