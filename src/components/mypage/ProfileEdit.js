import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance"; // axios 인스턴스
import useUserInfo from "../../hooks/useUserInfo"; // 사용자 정보 가져오기
import "../../styles/ProfileEdit.css";
import defaultProfileImg from "../../assets/defaultProfileImg.png"; // 기본 프로필 이미지
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const userInfo = useUserInfo(); // ✅ setUserInfo 사용 가능

  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState(defaultProfileImg);

  useEffect(() => {
    if (userInfo?.id) {
      setNickname(userInfo.nickname || "");
      setBio(userInfo.bio || "");
      setPreviewImage(userInfo.profileImageUrl || defaultProfileImg);
    }
  }, [userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?.id) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const formData = new FormData();
    const userProfileDTO = {
      nickname: nickname,
      bio: bio,
      profileImageUrl: userInfo.profileImageUrl,
    };
    const userProfileBlob = new Blob([JSON.stringify(userProfileDTO)], {
      type: "application/json",
    });
    formData.append("userProfileDTO", userProfileBlob);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put(
        `/auth/profile/${userInfo.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ localStorage 업데이트
      localStorage.setItem("MUSICOVERY_USER", JSON.stringify(response.data));

      alert("프로필이 성공적으로 업데이트되었습니다!");

      // ✅ 마이페이지 이동
      setActiveTab("home");
      navigate("/mypage");
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>프로필 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          닉네임:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <label>
          프로필 이미지:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <img
            src={previewImage}
            alt="프로필 미리보기"
            className="profile-preview"
          />
        </label>

        <label>
          소개글:
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
