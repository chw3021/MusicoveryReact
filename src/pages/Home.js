import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import OAuth from "../components/auth/OAuth";
import { logout } from "../components/auth/auth";
import "../styles/Home.css";

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

    useEffect(() => {
        const user = localStorage.getItem("MUSICOVERY_USER");
        setIsLoggedIn(!!user);
    }, []);

    const transitionToSection = (sectionIndex) => {
        setIsAnimating(true);
        setCurrentSection(sectionIndex);
        createWaveEffect();
        setTimeout(() => {
            setIsAnimating(false);
        }, scrollCooldown);
    };

    const createWaveEffect = () => {
        const wave = document.createElement("div");
        wave.className = "wave-effect";
        document.body.appendChild(wave);
        setTimeout(() => {
            wave.remove();
        }, 2000); // 애니메이션 시간보다 약간 더 길게 설정
    };

    useEffect(() => {
        const handleWheel = (e) => {
            const now = Date.now();
            if (now - lastScrollTime < scrollCooldown || isAnimating) return;

            if (e.deltaY > 0 && currentSection < totalSections - 1) {
                transitionToSection(currentSection + 1);
                lastScrollTime = now;
            } else if (e.deltaY < 0 && currentSection > 0) {
                transitionToSection(currentSection - 1);
                lastScrollTime = now;
            }
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
        progressFill.style.width = `${((currentSection + 1) / totalSections) * 100}%`;
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

    return (
        <div className="home-container">
            <Header />
            <div className="scroll-container" ref={scrollContainerRef}>
                <section className="section hero-section hero" data-index="0">
                    <div className="hero-content">
                        <h1 className="hero-title">Discover Your Sound</h1>
                        <p className="hero-subtitle">Personalized playlists curated just for you, based on your unique taste in music.</p>
                        <Button link={"/PlaylistPage"} text={"내 플레이리스트"} />
                        {!isLoggedIn ? (
                            <>
                                <button className="cta-button" onClick={goToLogin}>로그인</button>
                                <button className="cta-button" onClick={goToSignup}>회원가입</button>
                            </>
                        ) : (
                            <button className="cta-button" onClick={handleLogoutClick}>로그아웃</button>
                        )}
                        <button className="cta-button" onClick={handleLoginClick}>임시 로그인(스포티파이로 로그인)</button>
                        <button className="cta-button" onClick={adminLoginClick}>임시 관리자페이지</button>
                        {showOAuth && <OAuth />}
                    </div>
                </section>
                <section className="section" data-index="1">
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
            <div className="nav-arrow prev">
                <div className="arrow-icon"></div>
            </div>
            <div className="nav-arrow next">
                <div className="arrow-icon"></div>
            </div>
            <canvas className="slice-canvas"></canvas>
            <Outlet />
        </div>
    );
};

export default Home;