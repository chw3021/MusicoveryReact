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
import { getDefaultImage } from "../../utils/imageUtils";

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
        previewURL: null, // 이미지 미리보기 URL
    });

    const [showBpmInfo, setShowBpmInfo] = useState(false); // BPM 설명 박스 표시 여부 상태

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > MAX_FILE_SIZE) {
          alert("파일 크기가 너무 큽니다. 최대 5MB 이하의 파일을 업로드해주세요.");
          return;
        }
    
        // 파일리더 API를 사용하여 이미지 미리보기 URL 생성
        const reader = new FileReader();
        reader.onloadend = () => {
          setState((prev) => ({
            ...prev,
            playlistPhoto: file,
            previewURL: reader.result, // 미리보기 URL 설정
          }));
        };
    
        if (file) {
          reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        } else {
          setState((prev) => ({
            ...prev,
            playlistPhoto: null,
            previewURL: null, // 파일 선택 취소 시 미리보기 URL 초기화
          }));
        }
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
        if (state.selectedGenres.length <= 0 || !state.bpm || !state.mood) {
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
        } else {
            formData.append("playlistPhoto", getDefaultImage());
        }

        axiosInstance.post("/playlist/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            navigate("/PlaylistPage");
        })
        .catch(error => {
            console.error("플레이리스트 생성 실패:", error);
            if (error.response) {
                console.error("응답 데이터:", error.response.data);
                console.error("상태 코드:", error.response.status);
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
            <div className="keyword-form-container">
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
                    <label htmlFor="bpm">BPM
                        <button onClick={() => setShowBpmInfo(!showBpmInfo)}>?</button> {/* 설명 버튼 추가 */}
                    </label>
                    <input
                        type="number"
                        name="bpm"
                        value={state.bpm}
                        onChange={handleChange}
                        className="bpm-form-input"
                        placeholder="BPM을 입력하세요..."
                        min="30"     // 최소값 30
                        max="990"    // 최대값 990
                        step="5"     //5씩 상승
                    />
                    
                </div>
                <div>
                    {showBpmInfo && <div className="bpm-info-box">
                        BPM이란? Beats per minute의 약자로 1분에 비트가 몇 번 반복되는지를 세는 단위이다.<br />
                [ 고르기 쉽게 알려주는 BPM종류! ]<br />
                붐뱁 : 80(160)~100(200)<br />
                트랩 : 4/4박자 기준: 50~80 , 2/ 2박자 기준: 100~160 <br />
                디스코 : 110~130 <br />
                한국 댄스가요: 125 ~ 290+ ,
                일본 댄스가요: 140~170+<br />
                정통 트로트 : 60~90, 세미 트로트 : 90~120, 댄스 트로트: 120~140, 뽕짝 트로트 : 140+<br />
                라틴 팝: 65~110<br />
                유로비트: 145~165<br />
                하우스 및 이로부터 큰 영향을 받은 차트뮤직: 120~134,
                하드 하우스: 130~140<br />
                디트로이트 테크노 이후의 테크노: 130~150<br />
                하드 테크노 및 슈란츠: 145~170+<br />
                앰비언트 테크노: 100~120+<br />
                빅 비트: 90~140<br />
                트랜스 : 130~145<br />
                프로그레시브 트랜스: 130 초 ,더치/업리프팅 : 130~140<br />
                싸이트랜스같이 매니악한 방계장르 : 140 ~ 160+<br />
                덥스텝: 70~140<br />
                드럼스텝 및 하프타임 드럼 앤 베이스: 80~120+<br />
                퓨처 베이스: 70~120<br />
                드럼 앤 베이스 및 정글계열: 160~180+
                올드스쿨 레이브: 130~150<br />
                데스 메탈: 130~350+<br />
                퓨너럴 둠 메탈: 30~100<br />
                하드코어 테크노: 170~200+<br />
                개버류: 180~300+<br />
                프렌치코어: 200~225<br />
                메인스트림 하드코어: 150 ~ 180+<br />
                스피드코어(스플리터코어, 엑스트라톤 포함): 300~999 <br />
                하드스타일: 150~160</div>} {/* 설명 박스 */}
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
                <div className="form-group-button">
                    <Button text="생성하기" onClick={handleSubmit} />
                </div>
            </div>

            <div className="results-container">
                {state.loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <div>
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
                                    {/* 이미지 미리보기 */}
                                    {state.previewURL && (
                                      <img src={state.previewURL} alt="미리보기" style={{ width: '100px', height: '100px' }} />
                                    )}
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