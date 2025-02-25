import { useState } from "react";
import Header from "../common/Header";
import "../../styles/Quiz.css";
import axiosInstance from "../../api/axiosInstance";
import Nav from "../common/Nav";

const Quiz = () => {
    const [artist, setArtist] = useState("");
    const [songs, setSongs] = useState([]);
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const [userInput, setUserInput] = useState("");
    const [synth, setSynth] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showFetchLyricsButton, setShowFetchLyricsButton] = useState(false); // 추가된 상태

    const handleFetchSongs = async (event) => {
        event.preventDefault();
        if (!artist.trim()) {
            console.error("가수명을 입력하세요.");
            return;
        }

        setLoading(true); // 로딩 시작
        try {
            const response = await axiosInstance.get(`/api/quizlist`, { params: { artist } });
            if (response.data.length === 0) {
                console.error("노래 목록이 없습니다.");
                return;
            }

            const shuffledSongs = response.data.sort(() => 0.5 - Math.random());
            const selectedSongs = shuffledSongs.slice(0, 10);
            setSongs(selectedSongs);
            console.log("노래 목록:", selectedSongs);
            setShowFetchLyricsButton(true); // 버튼 표시 설정
        } catch (error) {
            console.error("노래 목록을 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const handleSubmitGuess = async (event) => {
        event.preventDefault();
        const normalizedInput = userInput.trim().toLowerCase();
        const normalizedTitle = currentTitle.toLowerCase();
    
        try {
            const response = await axiosInstance.get('/api/sometitle', {
                params: {
                    title: currentTitle
                }
            });
    
            const alternativeTitles = response.data || [];
            const normalizedAlternatives = alternativeTitles.map(title => title.trim().toLowerCase());
    
            if (normalizedInput === normalizedTitle || normalizedAlternatives.includes(normalizedInput)) {
                alert("정답입니다! 같은 아티스트의 다른 곡을 맞춰보세요.");
                if (synth) {
                    synth.cancel();
                    setIsSpeaking(false);
                }
                setUserInput("");
                fetchLyrics();
            } else {
                alert("틀렸습니다. 다시 시도해 보세요.");
                setUserInput("");
            }
        } catch (error) {
            console.error("대체 제목을 가져오는 중 오류 발생:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const fetchLyrics = async () => {
        if (songs.length === 0) {
            console.error("노래 목록이 없습니다.");
            return;
        }

        setLoading(true);
        try {
            const randomSong = songs[Math.floor(Math.random() * songs.length)];
            const encodedArtist = encodeURIComponent(randomSong.artist);
            const encodedTitle = encodeURIComponent(randomSong.title);

            const response = await axiosInstance.get(`/api/lyrics`, {
                params: { artist: encodedArtist, title: encodedTitle }
            });

            setLyrics(response.data.lyrics);
            setCurrentTitle(randomSong.title);
            speakLyrics(response.data.lyrics);

            console.log("제목:", randomSong.title);
        } catch (error) {
            console.error("가사를 불러오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    const speakLyrics = (lyricsText) => {
        if (!lyricsText) {
            console.error("읽을 가사가 없습니다.");
            return;
        }

        const speechSynth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(lyricsText);

        utterance.lang = "ko-KR";
        utterance.rate = 0.9;
        utterance.pitch = Math.random() * (1.5 - 0.8) + 0.8;
        utterance.volume = 1.0;

        setSynth(speechSynth);
        setIsSpeaking(true);
        speechSynth.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false);
        };
    };

    const handleStopSpeaking = () => {
        if (synth) {
            synth.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="quiz-container">
            <Header />
            <div className="social-layout">
                <Nav />
                <div className="content-wrapper">
                    <div className="quiz-content">
                        <h2 className="quiz-title">🎵 AI 가사 맞히기 퀴즈</h2>
                        <div className="search-box">
                            <input 
                                type="text" 
                                className="search-input"
                                placeholder="가수명을 입력하세요" 
                                value={artist} 
                                onChange={(e) => setArtist(e.target.value)}
                            />
                            <button className="quiz-button" onClick={handleFetchSongs}>노래 가져오기</button>
                        </div>
                        {showFetchLyricsButton && ( // 조건부 렌더링
                            <button className="quiz-button" onClick={fetchLyrics} disabled={loading || isSpeaking}>
                                {loading ? "가져오는 중..." : "🎵 AI 음성 재생"}
                            </button>
                        )}
                        {isSpeaking && (
                            <button className="quiz-button" onClick={handleStopSpeaking}>
                                음성 멈추기
                            </button>
                        )}
                        {currentTitle && (
                            <form onSubmit={handleSubmitGuess}>
                                <input
                                    type="text"
                                    className="guess-input"
                                    placeholder="노래 제목을 맞혀보세요"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                />
                                <button className="quiz-button" type="submit">확인</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
