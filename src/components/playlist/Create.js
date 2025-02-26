import { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/util";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import MusicSearch from "../music/MusicSearch"; // MusicSearch 컴포넌트 임포트
import "../playlist/Create.css";
import Music from "../music/Music";
import axiosInstance from "../../api/axiosInstance"; // axiosInstance 임포트
import useUserInfo from "../../hooks/useUserInfo"; // useUserInfo 임포트
import useMusicSearch from "../../hooks/useMusicSearch"; // useMusicSearch 훅 임포트
import { getDefaultImage } from "../../utils/imageUtils";

const Create = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo(); // 사용자 정보 가져오기
    const { handlePlay, isPremium } = useMusicSearch(); // useMusicSearch 훅 사용
    const [state, setState] = useState({
        playlistTitle: '',
        playlistComment: '',
        playlistPhoto: null,
        musicCheckbox: false,
        selectedMusic: '',
        selectedConcept: '',
        playlistDate: getFormattedDate(new Date()),
        selectedTracks: [], // 선택된 트랙 리스트 추가
        user: userInfo, // 사용자 정보 추가
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

    const handleSubmit = () => {
        if (!state.playlistTitle || !state.playlistComment || !state.playlistDate || state.selectedTracks.length <= 0) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("playlistTitle", state.playlistTitle);
        formData.append("playlistComment", state.playlistComment);
        formData.append("playlistDate", state.playlistDate);
        formData.append("isPublic", false);
        formData.append("userId", state.user.userId);
        formData.append("tracks", state.selectedTracks.map(track => track.uri));
        if (state.playlistPhoto) {
            formData.append("playlistPhoto", state.playlistPhoto);
        }
        else{
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

    const handleChangeDate = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setState({
            ...state,
            playlistDate: getFormattedDate(new Date(e.target.value)),
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            playlistComment: e.target.value,
        });
    };

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
        setState((prev) => ({
            ...prev,
            playlistPhoto: file,
        }));
    };

    const handleTrackSelect = (track) => {
        setState((prev) => ({
            ...prev,
            selectedTracks: [...prev.selectedTracks, track],
        }));
    };

    const removeTrack = (trackId) => {
        setState((prev) => ({
            ...prev,
            selectedTracks: prev.selectedTracks.filter(track => track.id !== trackId),
        }));
    };

    return (
        <div className="create-container">
            <div className="create-layout">
                <div className="create-left">
                    <MusicSearch onSelectTrack={handleTrackSelect} />
                    <div className="playlist-info">
                        <div className="create_section">
                            <h5 id="textCreated">생성일자</h5>
                            <input
                                type="date"
                                value={state.playlistDate}
                                onChange={handleChangeDate}
                                name="playlistDate"
                                id="DateClick"
                            />
                        </div>
                        <div className="create_title_section">
                            <input
                                type="text"
                                className="form-control"
                                name="playlistTitle"
                                value={state.playlistTitle}
                                placeholder="플레이리스트 제목을 입력하세요..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="create_explain_section">
                            <textarea
                                className="form-control board-textarea"
                                rows="8"
                                name="playlistComment"
                                value={state.playlistComment}
                                placeholder="플레이리스트 설명을 입력하세요...[300자이내]"
                                onChange={handleChangeContent}
                            ></textarea>
                        </div>
                        <div className="create_section">
                            <div className="fileinputBtn">
                                <input
                                    type="file"
                                    className="form-control"
                                    name="playlistPhoto"
                                    onChange={handleFileChange}
                                    accept="image/*" // 이미지 파일만 허용
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-right">
                    <h5>선택된 트랙 목록</h5>
                    <ul>
                        {state.selectedTracks.map((track, index) => (
                            <li key={index}>
                                <Music track={track} handlePlay={handlePlay} isPremium={isPremium} />
                                <button onClick={() => removeTrack(track.id)}>제거</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="Edit_Btn">
                <Button text="취소" link={"/PlaylistPage"}/>
                <Button text="생성하기!" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Create;