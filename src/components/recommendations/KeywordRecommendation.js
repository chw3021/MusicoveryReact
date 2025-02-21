import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { getFormattedDate } from "../../utils/util";
import "../../styles/KeywordRecommendation.css";
import Button from "../common/Button";
import genreSeeds from "../../assets/genre-seeds.json"; // 장르 리스트 파일 임포트
import Music from "../music/Music";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 임포트
import useMusicSearch from "../../hooks/useMusicSearch"; // useMusicSearch 훅 임포트

const KeywordRecommendation = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo(); // 사용자 정보 가져오기
    const { handlePlay, isPremium } = useMusicSearch(); // useMusicSearch 훅 사용

    const [state, setState] = useState({
        genre: '',
        bpm: '',
        mood: '',
        selectedGenres: [],
        recommendations: [],
        loading: false,
        playlistTitle: '',
        playlistComment: '',
        playlistPhoto: null, // 사진 필드 추가
        playlistDate: getFormattedDate(new Date()),
        showSaveForm: false,
        user: userInfo, // 사용자 정보 추가
    });

    // userInfo가 변경될 때마다 상태 업데이트
    useEffect(() => {
        if (userInfo) {
            setState((prevState) => ({
                ...prevState,
                user: userInfo,
            }));
        }
    }, [userInfo]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setState((prev) => ({
            ...prev,
            playlistPhoto: e.target.files[0],
        }));
    };

    const handleChangeDate = (e) => {
        setState((prev) => ({
            ...prev,
            playlistDate: e.target.value,
        }));
    };

    const handleGenreSelect = (e) => {
        const { value } = e.target;
        if (value && !state.selectedGenres.includes(value)) {
            setState((prev) => ({
                ...prev,
                selectedGenres: [...prev.selectedGenres, value],
                genre: '',
            }));
        }
    };

    const handleGenreRemove = (genre) => {
        setState((prev) => ({
            ...prev,
            selectedGenres: prev.selectedGenres.filter((g) => g !== genre),
        }));
    };

    const handleSubmit = async () => {
        if (!state.selectedGenres.length || !state.bpm || !state.mood) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));
        try {
            const response = await axiosInstance.post('/recommendation/keyword', {
                genre: state.selectedGenres.join(','),
                bpm: state.bpm,
                mood: state.mood,
            });
            const parsedRecommendations = response.data.map(item => JSON.parse(item).tracks.items[0]);
            setState((prev) => ({
                ...prev,
                recommendations: parsedRecommendations,
                loading: false,
                showSaveForm: true,
            }));
            console.log("추천된 트랙 목록:", parsedRecommendations);

        } catch (error) {
            console.error("추천 요청 실패:", error);
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
                    <label htmlFor="genre">장르</label>
                    <select
                        name="genre"
                        value={state.genre}
                        onChange={handleGenreSelect}
                        placeholder="장르를 선택하세요..."
                    >
                        <option value="">장르 선택</option>
                        {genreSeeds.genres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="selected-genres">
                    {state.selectedGenres.map((genre, index) => (
                        <div key={index} className="genre-tag">
                            {genre}
                            <button onClick={() => handleGenreRemove(genre)}>x</button>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label htmlFor="bpm">BPM</label>
                    <input
                        type="number"
                        name="bpm"
                        value={state.bpm}
                        onChange={handleChange}
                        placeholder="BPM을 입력하세요..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mood">분위기</label>
                    <select
                        name="mood"
                        value={state.mood}
                        onChange={handleChange}
                        placeholder="분위기를 선택하세요..."
                    >
                        <option value="">분위기 선택</option>
                        <option value="신나는">신나는</option>
                        <option value="행복한">행복한</option>
                        <option value="잔잔한">잔잔한</option>
                        <option value="우울한">우울한</option>
                    </select>
                </div>
                <div className="form-group">
                    <Button text="생성하기!" onClick={handleSubmit} />
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
                                        <li key={index}>
                                            <Music track={track} handlePlay={handlePlay} isPremium={isPremium} />
                                            <button onClick={() => removeTrack(track.id)}>제거</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {state.showSaveForm && (
                            <div>
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
                                <input
                                    type="text"
                                    name="playlistTitle"
                                    value={state.playlistTitle}
                                    onChange={handleChange}
                                    placeholder="플레이리스트 제목을 입력하세요..."
                                />
                                <textarea
                                    name="playlistComment"
                                    value={state.playlistComment}
                                    onChange={handleChange}
                                    placeholder="플레이리스트 설명을 입력하세요..."
                                ></textarea>
                                <Button text="저장하기" onClick={handleSave} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeywordRecommendation;