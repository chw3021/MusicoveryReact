import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance"; // axios 인스턴스
import "../../styles/ProfileEdit.css";

const ProfileEdit = ({ Id }) => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    // 기존 프로필 정보 불러오기
    axios
      .get(`/auth/profile/${Id}`)
      .then((response) => {
        const { nickname, profileImageUrl, bio } = response.data;
        setNickname(nickname);
        setProfileImage(profileImageUrl);
        setBio(bio);
      })
      .catch((error) =>
        console.error("프로필 정보를 불러오는 중 오류 발생:", error)
      );
  }, [Id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      await axios.put(`/auth/profile/${Id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("프로필이 성공적으로 업데이트되었습니다!");
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
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="프로필 미리보기"
            />
          )}
        </label>

        <label>
          소개글:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>

        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
