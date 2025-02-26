import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { getFormattedDate } from "../../utils/util";
import "../../styles/KeywordRecommendation.css";
import Button from "../common/Button";
import Music from "../music/Music";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 임포트
import useMusicSearch from "../../hooks/useMusicSearch"; // useMusicSearch 훅 임포트
import { getDefaultImage } from "../../utils/imageUtils";

const AIRecommendations = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo(); // 사용자 정보 가져오기
    const { handlePlay, isPremium } = useMusicSearch(); // useMusicSearch 훅 사용

    const [state, setState] = useState({
        recommendations: [],
        loading: false,
        playlistTitle: '',
        playlistComment: '',
        playlistPhoto: null,
        playlistDate: getFormattedDate(new Date()),
        showSaveForm: false,
        user: userInfo,
        aiFailed: false, // AI 추천 실패 여부
        surpriseLoading: false, // 깜짝 추천 로딩 상태
    });

    // 최대 파일 크기 설정 (예: 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    // userInfo가 변경될 때마다 상태 업데이트
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
            const response = await axiosInstance.get(`/recommendation/ai?userId=${state.user.userId}`);
            console.log("추천된 트랙 목록:", response);
            if (response.status === 204) {
                // AI 추천 실패
                //console.log("AI 추천 실패: 서버에서 빈 응답을 받았습니다.");
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    showSaveForm: false,
                    aiFailed: true, // AI 추천 실패 설정
                }));
                // AI 모델 학습 호출
                trainModel();
                // 깜짝 추천 가져오기
                getSurpriseRecommendations();
            } else {
                const parsedRecommendations = response.data.tracks;
                setState((prev) => ({
                    ...prev,
                    recommendations: parsedRecommendations,
                    loading: false,
                    showSaveForm: true,
                    aiFailed: false, // AI 추천 성공 설정
                }));
            }
        } catch (error) {
            console.error("추천 요청 실패:", error);
            setState((prev) => ({ ...prev, loading: false, aiFailed: true })); // AI 추천 실패 설정
            // 깜짝 추천 가져오기
            //getSurpriseRecommendations();
        }
    };
    const trainModel = async () => {
        try {
            const response = await axiosInstance.post('/recommendation/train');
            console.log("AI 모델 학습 결과:", response.data);
        } catch (error) {
            console.error("AI 모델 학습 중 오류 발생:", error);
        }
    };

    const getSurpriseRecommendations = async () => {
        setState((prev) => ({ ...prev, surpriseLoading: true }));
        try {
            const response = await axiosInstance.get('/recommendation/surprise');
            const parsedRecommendations = response.data.map(item => JSON.parse(item).tracks.items[0]);
            setState((prev) => ({
                ...prev,
                recommendations: parsedRecommendations,
                surpriseLoading: false,
                showSaveForm: true,
            }));
            console.log("깜짝 추천된 트랙 목록:", parsedRecommendations);
        } catch (error) {
            console.error('깜짝 추천 목록을 가져오는 중 오류 발생:', error);
            setState((prev) => ({ ...prev, surpriseLoading: false }));
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
            formData.append("playlistPhoto", getDefaultImage());
        }

        axiosInstance.post("/playlist/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            console.log("✅ 플레이리스트 생성 완료:", response.data);
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
                <div className="form-group">
                    <Button text="AI 추천 받기" onClick={handleSubmit} />
                </div>
            </div>
            
            <div className="results-container">
                {state.loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <div>
                        {state.aiFailed && (
                            <div className="ai-failed">
                                <p>AI 추천 데이터가 부족합니다.. 깜짝 추천을 대신 제공합니다.</p>
                                {state.surpriseLoading ? (
                                    <div>깜짝 추천 로딩 중...</div>
                                ) : null}
                            </div>
                        )}
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
                                <h5>플레이리스트 저장</h5>
                                <div className="form-group">
                                    <label htmlFor="playlistDate">생성일자</label>
                                    <input
                                        type="date"
                                        name="playlistDate"
                                        value={state.playlistDate}
                                        onChange={handleChangeDate}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="playlistPhoto">플레이리스트 사진</label>
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
                                        placeholder="플레이리스트 제목을 입력하세요..."
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="playlistComment"
                                        value={state.playlistComment}
                                        onChange={handleChange}
                                        placeholder="플레이리스트 설명을 입력하세요..."
                                    ></textarea>
                                </div>
                                <Button text="저장하기" onClick={handleSave} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIRecommendations;