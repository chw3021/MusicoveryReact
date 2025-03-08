import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/ProfileEdit.css";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { useNavigate } from "react-router-dom";

function ProfileEdit({ setActiveTab }) {
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  const [userProfile, setUserProfile] = useState({
    id: "",
    nickname: "",
    bio: "",
    profileImageUrl: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultProfileImg);

  useEffect(() => {
    if (!userInfo || !userInfo.id) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/profile",
          {
            id: userInfo.id,
          }
        );

        const profileData = response.data;
        setUserProfile(profileData);

        // 서버에서 받은 profileImageUrl이 있으면 절대 경로로 설정
        const profileImageUrl = profileData.profileImageUrl
          ? `http://localhost:8080/images/${profileData.profileImageUrl}`
          : defaultProfileImg;

        setPreviewImage(profileImageUrl);
      } catch (error) {
        console.error("프로필을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserProfile();
  }, [userInfo]);

  const handleInputChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // 파일 미리보기 설정
    }
  };

  const handleDeleteImage = async () => {
    if (!userInfo?.id) return;

    try {
      await axios.delete(
        `http://localhost:8080/auth/profile/${userInfo.id}/delete-image`
      );

      // UI 업데이트
      setUserProfile({ ...userProfile, profileImageUrl: null });
      setPreviewImage(defaultProfileImg);
      setProfileImage(null);

      alert("프로필 이미지가 삭제되었습니다.");
    } catch (error) {
      console.error("프로필 이미지 삭제 오류:", error);
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?.id) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "userProfileDTO",
      new Blob(
        [
          JSON.stringify({
            nickname: userProfile.nickname,
            bio: userProfile.bio,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/auth/profile/${userInfo.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // localStorage 업데이트
      localStorage.setItem("userProfile", JSON.stringify(response.data));

      alert("프로필이 성공적으로 업데이트되었습니다!");
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
            name="nickname"
            value={userProfile.nickname}
            onChange={handleInputChange}
          />
        </label>

        <>
          <label>
            프로필 이미지:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <div className="image-preview-container">
            <img
              src={previewImage}
              alt="프로필 미리보기"
              className="profile-preview"
            />
          </div>
          {userProfile.profileImageUrl && (
            <button
              type="button"
              onClick={handleDeleteImage}
              className="delete-image-btn"
            >
              프로필 이미지 삭제
            </button>
          )}
        </>
        <label>
          소개글:
          <input
            type="text"
            name="bio"
            value={userProfile.bio}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
