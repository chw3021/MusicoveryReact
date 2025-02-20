import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Header from "../common/Header";
import "../playlist/Create.css";
import Button from "../common/Button";
import genreSeeds from "../../assets/genre-seeds.json"; // 장르 리스트 파일 임포트

const KeywordRecommendation = () => {
    const [state, setState] = useState({
        genre: '',
        bpm: '',
        mood: '',
        selectedGenres: [],
        recommendations: [],
        loading: false,
        playlistTitle: '',
        playlistComment: '',
        showSaveForm: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
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
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const response = await axiosInstance.post('/recommendation/keyword', {
                genre: state.selectedGenres.join(','),
                bpm: state.bpm,
                mood: state.mood,
            });
            setState((prev) => ({
                ...prev,
                recommendations: response.data,
                loading: false,
                showSaveForm: true,
            }));
        } catch (error) {
            console.error("추천 요청 실패:", error);
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleSave = () => {
        // 플레이리스트 저장 로직 추가
        console.log("플레이리스트 저장:", state.playlistTitle, state.playlistComment);
    };

    return (
        <div className="select_section">
            <div className="two_section">
                <div className="BackgroundColor_section">
                    <div className="text_area">
                        <div className="main_text">
                            <h5 id="selectText">키워드 기반 플레이리스트 생성</h5>
                        </div>

                        <div className="create_section">
                            <h5 id="textCreated">장르</h5>
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
                            <div className="selectedGenres">
                                {state.selectedGenres.map((genre, index) => (
                                    <div key={index} className="genreTag">
                                        {genre}
                                        <button onClick={() => handleGenreRemove(genre)}>x</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="create_section">
                            <h5 id="textCreated">BPM</h5>
                            <input
                                type="number"
                                name="bpm"
                                value={state.bpm}
                                onChange={handleChange}
                                placeholder="BPM을 입력하세요..."
                            />
                        </div>

                        <div className="create_section">
                            <h5 id="textCreated">분위기</h5>
                            <select
                                name="mood"
                                value={state.mood}
                                onChange={handleChange}
                                placeholder="분위기를 선택하세요..."
                            >
                                <option value="">분위기 선택</option>
                                <option value="신나는">신나는</option>
                                <option value="잔잔한">잔잔한</option>
                                <option value="우울한">우울한</option>
                                <option value="행복한">행복한</option>
                            </select>
                        </div>

                        <div className="create_section2">
                            <div className="Edit_Btn">
                                <Button text="생성하기!" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="BackgroundColor_section2">
                    {state.loading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <div>
                            {state.recommendations.length > 0 && (
                                <div>
                                    <h5>추천된 트랙 목록</h5>
                                    <ul>
                                        {state.recommendations.map((track, index) => (
                                            <li key={index}>{track}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {state.showSaveForm && (
                                <div>
                                    <h5>플레이리스트 저장</h5>
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
        </div>
    );
};

export default KeywordRecommendation;