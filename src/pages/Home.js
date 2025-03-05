import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import OAuth from "../components/auth/OAuth";
import { logout } from "../components/auth/auth";
import "../styles/Home.css";
import "animate.css";

const Home = () => {
  const navigate = useNavigate();
  const [showOAuth, setShowOAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 3;
  const scrollContainerRef = useRef(null);
  const scrollCooldown = 1000; // 1초 쿨다운
  const [isAnimating, setIsAnimating] = useState(false);
  let lastScrollTime = Date.now();
  const [isShattering, setIsShattering] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("MUSICOVERY_USER");
    setIsLoggedIn(!!user);
  }, []);

  const transitionToSection = (sectionIndex) => {
    if (currentSection !== sectionIndex) {
      setIsAnimating(true);

      // 첫 페이지에서 두번째 페이지로 넘어갈 때만 깨짐 효과 적용
      if (currentSection === 0 && sectionIndex === 1) {
        handlePageShatter(); // 페이지 깨짐 효과 실행

        // 애니메이션 후에 실제 섹션 변경
        setTimeout(() => {
          setCurrentSection(sectionIndex);
          setIsAnimating(false);
        }, 1000); // 깨짐 애니메이션 지속 시간과 맞춤
      } else if (currentSection === 1 && sectionIndex === 2) {
        handlePageFlip(); // 페이지 뒤집힘 효과 실행

        // 애니메이션 후에 실제 섹션 변경
        setTimeout(() => {
          setCurrentSection(sectionIndex);
          setIsAnimating(false);
        }, 1000); // 뒤집힘 애니메이션 지속 시간과 맞춤
      } else {
        // 다른 페이지 전환에서는 즉시 전환 (또는 다른 효과 적용)
        setCurrentSection(sectionIndex);
        createWaveEffect();
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // 일반 전환은 더 짧은 시간
      }
    }
  };

  // 페이지 깨짐 효과 함수
  const handlePageShatter = () => {
    setIsShattering(true);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.classList.add("shattering");
      scrollContainer.classList.add("explosion"); // explosion 애니메이션 클래스 추가
    }

    setTimeout(() => {
      setIsShattering(false);
      if (scrollContainer) {
        scrollContainer.classList.remove("shattering");
        scrollContainer.classList.remove("explosion"); // 애니메이션 클래스 제거
      }
    }, 1000);
  };

  // 페이지 뒤집힘 효과 함수
  const handlePageFlip = () => {
    const container = document.createElement("div");
    container.className = "page-transition-container";

    for (let i = 0; i < 7; i++) {
      const piece = document.createElement("div");
      piece.className = "page-piece";
      container.appendChild(piece);
    }

    document.body.appendChild(container);

    setTimeout(() => {
      document.body.removeChild(container);
    }, 1000); // 애니메이션 시간과 일치시킴
  };

  // 휠 이벤트 처리 함수
  const createWaveEffect = () => {
    const wave = document.createElement("div");
    wave.className = "wave-effect";
    document.body.appendChild(wave);
    setTimeout(() => {
      wave.remove();
    }, 2000); // 애니메이션 시간보다 약간 더 길게 설정
  };

  // 개선된 조각 생성 함수
  const createShatterPieces = () => {
    const pieces = [];
    const numPieces = 900; // 더 많은 조각들

    // 화면 크기 기준으로 조각들 생성
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < numPieces; i++) {
      // 화면 전체에 랜덤하게 배치
      const startX = Math.random() * screenWidth;
      const startY = Math.random() * screenHeight;

      // 바깥쪽으로 퍼지는 움직임 계산
      const centerX = screenWidth / 2;
      const centerY = screenHeight / 2;

      // 중앙에서 바깥쪽으로 향하는 벡터 계산
      const dirX = startX - centerX;
      const dirY = startY - centerY;

      // 거리에 비례하는 이동 거리 계산
      const distance = Math.sqrt(dirX * dirX + dirY * dirY);
      const normalizedDirX = dirX / distance;
      const normalizedDirY = dirY / distance;

      const moveX = normalizedDirX * (300 + Math.random() * 500);
      const moveY = normalizedDirY * (300 + Math.random() * 500);

      // 랜덤 회전
      const randomRotation = Math.random() * 720 - 360;

      // 랜덤 색상 클래스
      const colorClass = `color${Math.floor(Math.random() * 4) + 1}`;

      pieces.push(
        <div
          key={i}
          className={`shatter-piece ${colorClass}`}
          style={{
            left: `${startX}px`,
            top: `${startY}px`,
            width: `${10 + Math.random() * 40}px`, // 다양한 크기
            height: `${10 + Math.random() * 40}px`,
            "--x": `${moveX}px`,
            "--y": `${moveY}px`,
            "--r": `${randomRotation}deg`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`, // 조금씩 다른 애니메이션 속도
          }}
        />
      );
    }
    return pieces;
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating) return;
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        transitionToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        transitionToSection(currentSection - 1);
      }
      lastScrollTime = now;
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("wheel", handleWheel);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, totalSections, isAnimating]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.style.transform = `translateX(-${currentSection * 100}vw)`;

    const progressText = document.querySelector(".progress-text");
    const progressFill = document.querySelector(".progress-fill");

    progressText.textContent = `0${currentSection + 1}/0${totalSections}`;
    progressFill.style.width = `${
      ((currentSection + 1) / totalSections) * 100
    }%`;
  }, [currentSection, totalSections]);

  const handleLoginClick = () => {
    setShowOAuth(true);
  };

  const handleLogoutClick = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const adminLoginClick = () => {
    navigate("/admin");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const handlePrevClick = () => {
    if (currentSection > 0) {
      transitionToSection(currentSection - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSection < totalSections - 1) {
      transitionToSection(currentSection + 1);
    }
  };
  return (
    <div className="home-container">
      <Header />
      <div className="scroll-container" ref={scrollContainerRef}>
        <section
          className={`section hero-section hero ${
            isShattering ? "shattering" : ""
          }`}
          data-index="0"
        >
          <div className="hero-content ">
            <h1 className="hero-title">Discover Your Sound</h1>
            <p className="hero-subtitle">
              Personalized playlists curated just for you, based on your unique
              taste in music.
            </p>
            <Button link={"/PlaylistPage"} text={"내 플레이리스트"} />
            {!isLoggedIn ? (
              <>
                <button className="cta-button" onClick={goToLogin}>
                  로그인
                </button>
                <button className="cta-button" onClick={goToSignup}>
                  회원가입
                </button>
              </>
            ) : (
              <>
                <button className="cta-button" onClick={handleLogoutClick}>
                  로그아웃
                </button>
                <button className="cta-button" onClick={goToMypage}>
                  마이페이지
                </button>
              </>
            )}
            <button className="cta-button" onClick={handleLoginClick}>
              임시 로그인(스포티파이로 로그인)
            </button>
            <button className="cta-button" onClick={adminLoginClick}>
              임시 관리자페이지
            </button>

            {showOAuth && <OAuth />}
          </div>
        </section>
        <section className={`section`} data-index="1">
          <h2 className="section-title">Trending Playlists</h2>
          <div className="playlists-container">
            <div className="playlist-card"></div>
            <div className="playlist-card"></div>
            <div className="playlist-card"></div>
          </div>
        </section>
        <section className="section" data-index="2">
          <h2 className="section-title">New Releases</h2>
          <div className="playlists-container">
            <div className="playlist-card"></div>
            <div className="playlist-card"></div>
            <div className="playlist-card"></div>
          </div>
        </section>
      </div>

      <div className="scroll-nav"></div>

      <div className="progress-container">
        <div className="progress-text">01/03</div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <div className="nav-arrow prev" onClick={handlePrevClick}>
        <div className="arrow-icon"></div>
      </div>
      <div className="nav-arrow next" onClick={handleNextClick}>
        <div className="arrow-icon"></div>
      </div>

      <div className="shatter-effect-container">
        <div className={`shatter-effect ${isShattering ? "active" : ""}`}>
          {isShattering && createShatterPieces()}
        </div>
      </div>

      <canvas className="slice-canvas"></canvas>

      <Outlet />
    </div>
  );
};

export default Home;
