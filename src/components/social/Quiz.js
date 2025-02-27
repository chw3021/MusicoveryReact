import { useState, useEffect } from "react";
import Header from "../common/Header";
import axiosInstance from "../../api/axiosInstance";
import Nav from "../common/Nav";
import SidebarLayout from "../common/SidebarLayout";
import "../../styles/Quiz.css";

const Quiz = () => {
    const [artist, setArtist] = useState("");
    const [songs, setSongs] = useState([]);
    const [matchedSongs, setMatchedSongs] = useState([]); // 맞춘 노래 목록
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const [userInput, setUserInput] = useState("");
    const [synth, setSynth] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showFetchLyricsButton, setShowFetchLyricsButton] = useState(false);
    const [rankings, setRankings] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [user, setUser] = useState(null);


    // 유저 정보 가져오기
    useEffect(() => {
        const fetchUser = async () => {
            // localStorage에서 user 정보 가져오기 (있으면 API 호출 안함)
            const cachedUser = localStorage.getItem("user");
            if (cachedUser) {
                setUser(JSON.parse(cachedUser));
                return;
            }
    
            try {
                const response = await axiosInstance.get("/api/spotify/userInfo");
                setUser(response.data);
                
                // localStorage에 저장 (다음 요청 최소화)
                localStorage.setItem("user", JSON.stringify(response.data));
            } catch (error) {
                console.error("유저 정보를 가져오는 데 실패:", error);
            }
        };
    
        fetchUser();
    }, []);

    const handleFetchSongs = async (event) => {
        event.preventDefault();
        if (!artist.trim()) {
            console.error("가수명을 입력하세요.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/quizlist`, { params: { artist } });
            if (response.data.length === 0) {
                console.error("노래 목록이 없습니다.");
                return;
            }
    
            // 제목을 정제하여 저장
            const cleanedSongs = response.data.map(song => ({
                ...song,
                title: song.title
                    .split(/[([{['"]/)[0] // 여러 구분자로 나누기
                    .replace(/[\(\)\[\]{}'"]/g, '') // 괄호와 따옴표 제거
                    .trim()
            }));
    
            const shuffledSongs = cleanedSongs.sort(() => 0.5 - Math.random());
            const selectedSongs = shuffledSongs.slice(0, 10);
            setSongs(selectedSongs);
            console.log("노래 목록:", selectedSongs);
            setShowFetchLyricsButton(true);
        } catch (error) {
            console.error("노래 목록을 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };
    // 랭킹 저장 함수 추가
    const saveRanking = async (timeTaken) => {
        try {
            const songInfo = `${artist} - ${currentTitle}`; // "아티스트 - 노래 제목" 형식으로 변환

            const response = await axiosInstance.post('/api/ranking', {
                username: user?.display_name, // Spotify에서 가져온 사용자 이름
                songTitle: songInfo, // 노래 정보
                timeTaken: timeTaken // 정답까지 걸린 시간 (밀리초 단위)
            });  // 백엔드에 랭킹 저장 요청
    
            console.log("랭킹 저장 완료:", response.data);
    
            // 🎯 랭킹 목록 다시 불러오기
            fetchRankings();
        } catch (error) {
            console.error("랭킹 저장 중 오류 발생:", error);
        }
    };

    const handleSubmitGuess = async (event) => {
        event.preventDefault();
        const normalizedInput = userInput.trim().toLowerCase();
        const normalizedTitle = currentTitle.toLowerCase();
    
        try {
            console.log(`/api/sometitle 요청: title=${currentTitle}`);
            const response = await axiosInstance.get('/api/sometitle', {
                params: { title: currentTitle }
            });
            console.log(`/api/sometitle 응답:`, response.data);
    
            const alternativeTitles = response.data || [];
            const normalizedAlternatives = alternativeTitles.map(title => title.trim().toLowerCase());
    
            if (normalizedInput === normalizedTitle || normalizedAlternatives.includes(normalizedInput)) {
                alert("정답입니다! 같은 아티스트의 다른 곡을 맞춰보세요.");
    
                if (synth) {
                    synth.cancel();
                    setIsSpeaking(false);
                }
                setUserInput("");
    
                // 맞춘 노래를 matchedSongs에 추가
                setMatchedSongs(prev => [...prev, currentTitle]);
    
                // 🕒 정답까지 걸린 시간 계산 (밀리초 단위)
                const timeTaken = startTime ? Date.now() - startTime : 0;
    
                // 🎯 랭킹 저장 API 호출
                saveRanking(timeTaken);
    
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
            // 맞춘 노래를 제외한 나머지 노래 중에서 랜덤 선택
            const remainingSongs = songs.filter(song => !matchedSongs.includes(song.title));
            if (remainingSongs.length === 0) {
                console.log("모든 노래를 맞추셨습니다!");
                return;
            }
            const randomSong = remainingSongs[Math.floor(Math.random() * remainingSongs.length)];
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
            if (error.response && error.response.status === 429) {
                console.error("요청 제한 초과. 잠시 후 다시 시도해주세요.");
                alert("서버에 과도한 요청을 보내고 있습니다. 잠시 후 다시 시도해주세요.");
                setTimeout(fetchLyrics, 5000);
            } else {
                console.error("가사를 불러오는 중 오류 발생:", error);
            }
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
        utterance.rate = Math.random() * (10 - 0.1) + 0.1;  // 음성의 속도 0.1 ~ 10 사이의 랜덤 값
        utterance.pitch = Math.random() * (2 - 0.1) + 0.1;  // 음성의 피치 0.1 ~ 2 사이의 랜덤 값
        utterance.volume = 1.0;

        setSynth(speechSynth);
        setIsSpeaking(true);
        speechSynth.speak(utterance);

        utterance.onstart = () => {
            setIsSpeaking(true);
            setStartTime(Date.now());  // 🕒 시작 시간 기록
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };
        //synth.speak(utterance);
    };

    const handleStopSpeaking = () => {
        if (synth) {
            synth.cancel();
            setIsSpeaking(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target.name === 'artist') {
                handleFetchSongs(event);
            } else if (event.target.name === 'userInput') {
                handleSubmitGuess(event);
            }
        }
    };

    const fetchRankings = async () => {
        try {
            const response = await axiosInstance.get("/api/ranking/top5"); // 백엔드에서 랭킹 데이터 가져오기
            setRankings(response.data);
        } catch (error) {
            console.error("랭킹 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    return (
        <div className="quiz-container">
            <Header />
            <SidebarLayout>
            <div className="quiz-social-layout">
                <div className="content-wrapper">
                    <div className="quiz-content">
                        <h2 className="quiz-title">🎵 AI 가사 맞히기 퀴즈</h2>
                    <div className="oneLineView">
                        <div className="search-box">
                            <div className="search-label-box">
                                <input 
                                    type="text" 
                                    className="search-input"
                                    placeholder="가수명을 입력하세요" 
                                    value={artist} 
                                    onChange={(e) => setArtist(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    name="artist"
                                />
                                <button className="quiz-button2" onClick={handleFetchSongs}>🔍찾기</button>
                            </div>
                            <div className="quiz-button-box">
                                        
                                {showFetchLyricsButton && (
                                    <button className="quiz-button" onClick={fetchLyrics} disabled={loading || isSpeaking}>
                                        {loading ? "가져오는 중..." : "🎵 AI 음성 재생"}
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* 🔥 랭킹 추가된 부분 */}
                        <div className="rankingPart">
                            <h3>🏆 랭킹</h3>
                            <ul className="ranking-list">
                                {rankings.length > 0 ? (
                                    rankings.map((rank, index) => (
                                        <li key={rank.id} className="ranking-item">
                                            <span>{index + 1}위:</span>
                                            <div className="rank-userinfo-item-text">{rank.username} ({rank.songTitle})</div>
                                            <span>{rank.timeTaken / 1000}초</span>
                                        </li>
                                    ))
                                ) : (
                                    <li>랭킹 데이터가 없습니다.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                       
                    
                    <div className="stopBtnplace">
                        {isSpeaking && (
                            <button className="quiz-button" onClick={handleStopSpeaking}>
                                음성 멈추기
                            </button>
                        )}
                    </div>
                        {currentTitle && (
                            <div className="guess-box">
                                <input 
                                    type="text"
                                    className="guess-input"
                                    placeholder="노래 제목을 맞혀보세요"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    name="userInput"
                                />
                                <button className="quiz-button2" type="submit" onClick={handleSubmitGuess}>확인</button>
                            </div>
                        )}
                    </div>
                </div>
                <Nav />
            </div>
            </SidebarLayout>
        </div>
    );
};

export default Quiz;
