import React, { useState, useEffect } from 'react';
import axiosInstance from "../../api/axiosInstance";
import { getFormattedDate } from "../../utils/util";
import Button from "../common/Button";
import Music from "../music/Music";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import useMusicSearch from "../../hooks/useMusicSearch";
import "../../styles/KeywordRecommendation.css";
import { getDefaultImage } from '../../utils/imageUtils';

function SurpriseRecommendation() {
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const { handlePlay, isPremium } = useMusicSearch();

  const [state, setState] = useState({
    recommendations: [],
    loading: false,
    playlistTitle: '',
    playlistComment: '',
    playlistPhoto: null,
    playlistDate: getFormattedDate(new Date()),
    showSaveForm: false,
    user: userInfo,
  });

  // 최대 파일 크기 설정 (예: 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (userInfo) {
      setState((prevState) => ({
        ...prevState,
        user: userInfo,
      }));
    }
  }, [userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("파일 크기가 너무 큽니다. 최대 5MB 이하의 파일을 업로드해주세요.");
      return;
    }
    setState((prev) => ({
      ...prev,
      playlistPhoto: file,
    }));
  };

  const handleChangeDate = (e) => {
    setState((prev) => ({
      ...prev,
      playlistDate: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axiosInstance.get('/recommendation/surprise'); // 백엔드 API 엔드포인트 변경
      const parsedRecommendations = response.data.map(item => JSON.parse(item).tracks.items[0]);
      setState((prev) => ({
        ...prev,
        recommendations: parsedRecommendations,
        loading: false,
        showSaveForm: true,
      }));
      //console.log("추천된 트랙 목록:", parsedRecommendations);
    } catch (error) {
      console.error('추천 목록을 가져오는 중 오류 발생:', error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSave = () => {
    if (!state.playlistTitle || !state.playlistComment || !state.playlistDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("playlistTitle", state.playlistTitle);
    formData.append("playlistComment", state.playlistComment);
    formData.append("playlistDate", state.playlistDate);
    formData.append("isPublic", false);
    formData.append("userId", state.user.userId);
    formData.append("tracks", state.recommendations.map(track => track.uri));
    if (state.playlistPhoto) {
      formData.append("playlistPhoto", state.playlistPhoto);
    } else {
      formData.append("playlistPhoto",getDefaultImage());
    }

    axiosInstance.post("/playlist/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        //console.log("✅ 플레이리스트 생성 완료:", response.data);
        navigate("/PlaylistPage");
      })
      .catch(error => {
        console.error("❌ 플레이리스트 생성 실패:", error);
        if (error.response) {
          console.error("📌 응답 데이터:", error.response.data);
          console.error("📌 상태 코드:", error.response.status);
        }
      });
  };

  const removeTrack = (trackId) => {
    setState((prev) => ({
      ...prev,
      recommendations: prev.recommendations.filter(track => track.id !== trackId),
    }));
  };

  return (
    <div className="keyword-recommendation">
      <div className="form-container">
        <div className="form-group2">
          <Button text="Surprise 추천 받기" onClick={handleSubmit} />
        </div>
      </div>

      <div className="results-container">
        {state.loading ? (
          <div>로딩 중...</div>
        ) : (
          <div>
            {state.recommendations.length > 0 && (
              <div className="keyword-recommendations">
                <h5>추천된 트랙 목록</h5>
                <ul>
                  {state.recommendations.map((track, index) => (
                    <li className="keyword-recommendations-list-item" key={index}>
                      <Music track={track} handlePlay={handlePlay} isPremium={isPremium} />
                      <button onClick={() => removeTrack(track.id)}>❌</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {state.showSaveForm && (
              <div className="playlist-save-form">
                <h5>플레이리스트 생성</h5>
                <div className="form-group">
                  <label htmlFor="playlistDate">생성일자 ▶ </label>
                  <input
                    type="date"
                    name="playlistDate"
                    value={state.playlistDate}
                    onChange={handleChangeDate}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="playlistPhoto">대표 사진 ▶ </label>
                  <input
                    type="file"
                    name="playlistPhoto"
                    onChange={handleFileChange}
                    accept="image/*" // 이미지 파일만 허용
                  />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="playlistTitle"
                        value={state.playlistTitle}
                        onChange={handleChange}
                        placeholder="플레이리스트 제목을 입력하세요...(25자이내)"
                        maxLength="25"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="playlistComment"
                        value={state.playlistComment}
                        onChange={handleChange}
                        placeholder="플레이리스트 설명을 입력하세요...(300자이내)"
                        maxLength="300"
                    ></textarea>
                </div>
                <Button text="생성하기" onClick={handleSave} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SurpriseRecommendation;