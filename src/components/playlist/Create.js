import { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/util";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import MusicSearch from "../music/MusicSearch"; // MusicSearch 컴포넌트 임포트
import "../playlist/Create.css";

const Create = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        playlistTitle: '',
        playlistComment: '',
        playlistPhoto: null,
        musicCheckbox: false,
        selectedMusic: '',
        selectedConcept: '',
        playlistDate: getFormattedDate(new Date()),
        selectedTracks: [], // 선택된 트랙 리스트 추가
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                playlistDate: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleCancel = () => {
        navigate(-1);
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
        setState((prev) => ({
            ...prev,
            playlistPhoto: e.target.files[0],
        }));
    };

    const handleTrackSelect = (track) => {
        setState((prev) => ({
            ...prev,
            selectedTracks: [...prev.selectedTracks, track],
        }));
    };

    const options = Array.from({ length: 194 }, (_, index) => 30 + index * 5);

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
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-right">
                    <h5>선택된 트랙 목록</h5>
                    <ul>
                        {state.selectedTracks.map((track, index) => (
                            <li key={index}>{track.name} - {track.artist}</li>
                        ))}
                    </ul>
                </div>
            </div>
                <div className="Edit_Btn">
                    <Button text="취소" link={"/PlaylistPage"} onClick={handleCancel} />
                    <Button text="생성하기!" link={"/PlaylistPage"} onClick={handleSubmit} />
                </div>
        </div>
    );
};

export default Create;