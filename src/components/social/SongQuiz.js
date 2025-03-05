import React, { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

const SongQuiz = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [playbackState, setPlaybackState] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const storedToken = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");

    useEffect(() => {
        if (!storedToken) return;

        const fetchQuizData = async () => {
            setIsLoading(true); // 요청 시작 시 로딩 상태 활성화
            try {
                const response = await fetch("http://localhost:8080/api/spotify-quiz/data", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("퀴즈 데이터:", data);
                setSongs(data.tracks.items); // data.tracks.items로 수정
                setCurrentSong(data.tracks.items[0]); // 첫 번째 곡을 설정
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false); // 요청 완료 후 로딩 상태 비활성화
            }
        };

        fetchQuizData();
    }, [storedToken]);

    useEffect(() => {
        if (timeLeft > 0 && isPlaying) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setShowHint(true);
        }
    }, [timeLeft, isPlaying]);

    const handleHint = () => {
        setShowHint(true);
        setIsPlaying(true);
        setTimeout(() => {
            setIsPlaying(false);
        }, 3000);
    };

    const handleAnswerSubmit = () => {
        if (userInput.toLowerCase().trim() === currentSong?.title?.toLowerCase().trim()) {
            setScore(score + 1);
            setUserInput("");
            const nextIndex = songs.indexOf(currentSong) + 1;
            if (nextIndex < songs.length) {
                setCurrentSong(songs[nextIndex]);
                setTimeLeft(30);
                setShowHint(false);
            } else {
                alert("퀴즈가 종료되었습니다! 총 점수: " + score);
            }
        } else {
            alert("틀렸습니다! 다시 시도해보세요.");
        }
    };

    return (
        <div className="song-quiz">
            <h1>노래 맞추기 퀴즈</h1>
            <p>남은 시간: {timeLeft}초</p>
            {showHint && <p>힌트: {currentSong?.hint}</p>}
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="노래 제목을 입력하세요"
            />
            <button onClick={handleAnswerSubmit}>제출</button>
            {timeLeft === 0 && <button onClick={handleHint}>힌트 보기</button>}
            {isLoading && <p>로딩 중...</p>} {/* 로딩 중 메시지 */}
            <SpotifyWebPlayer
                token={storedToken}
                uris={currentSong?.uri ? [currentSong.uri] : []}
                play={isPlaying}
                callback={(state) => {
                    setPlaybackState(state);
                    if (!state.isPlaying) {
                        setIsPlaying(false);
                    }
                }}
                showSaveIcon={false}
                syncExternalDevice={true}
                syncExternalDeviceInterval={5}
                robustness="SW"
                styles={{
                    activeColor: '#1DB954',
                    bgColor: '#000000',
                    color: '#ffffff',
                    loaderColor: '#1DB954',
                    sliderColor: '#1DB954',
                    sliderHandleColor: '#ffffff',
                    height: 100,
                }}
            />
        </div>
    );
};

export default SongQuiz;
