import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import useUserInfo from "../../hooks/useUserInfo";
import { logout } from "../auth/auth";

import informationImg from "../../assets/information.png";
import logoImage from "../../assets/logo.png"; // 이미지 import
import "animate.css";

const Header = ({ isHomePage = false }) => {
  const userInfo = useUserInfo();
  // const headerRef = useRef(null);
  // const navListRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHomePage) {
      const logoElement = document.querySelector(`.${styles.logo}`);

      if (logoElement) {
        logoElement.classList.add("animate__animated", "animate__backInRight");

        const handleAnimationEnd = (event) => {
          if (event.animationName === "backInRight") {
            logoElement.classList.remove("animate__backInRight");
            logoElement.classList.add("animate__jello");
          }
          logoElement.removeEventListener("animationend", handleAnimationEnd);
        };

        logoElement.addEventListener("animationend", handleAnimationEnd);

        // 클린업 함수
        return () => {
          if (logoElement) {
            logoElement.classList.remove(
              "animate__animated",
              "animate__backInRight",
              "animate__jello"
            );
            logoElement.removeEventListener("animationend", handleAnimationEnd);
          }
        };
      }
    }
  }, [isHomePage]); // isHomePage가 변경될 때만 실행

  // 추가된 useEffect - DOM이 완전히 렌더링된 후 스타일 보완
  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행
    const resetStyles = () => {
      const navItems = document.querySelectorAll(`.${styles.navItem}`);
      navItems.forEach((item) => {
        const button = item.querySelector("button");
        if (button) {
          // 버튼 스타일 리셋 (DOM 수준에서)
          button.style.width = ""; // 리셋하여 CSS가 적용되게 함
        }
      });
    };

    // 초기 렌더링과 페이지 전환 후에 스타일 리셋
    resetStyles();

    // 페이지 전환 이벤트 리스너
    window.addEventListener("popstate", resetStyles);

    return () => {
      window.removeEventListener("popstate", resetStyles);
    };
  }, []);

  const handleNavigation = (link) => {
    navigate(link);
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={logoImage}
          alt="Musicovery Logo"
          className={styles.logoImage}
        />
        <div className={styles.audioVisualizer}>
          <div className={styles.visualizerBar}></div>
          <div className={styles.visualizerBar}></div>
          <div className={styles.visualizerBar}></div>
          <div className={styles.visualizerBar}></div>
          <div className={styles.visualizerBar}></div>
        </div>
      </div>
      <div className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button
              className={styles.navButton}
              onClick={() => handleNavigation("/")}
            >
              홈
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={styles.navButton}
              onClick={() => handleNavigation("/social")}
            >
              소셜
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={styles.navButton}
              onClick={() => handleNavigation("/post")}
            >
              게시판
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.userInfo}>
        {userInfo ? (
          <div className={styles.userDetails}>
            <img
              className={styles.mypageBtn}
              src={informationImg}
              alt="mypage"
              onClick={goToMypage}
            ></img>
            <button className={styles.ctaButton} onClick={handleLogoutClick}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className={styles.userText}>로그인되지 않음</div>
        )}
      </div>
    </header>
  );
};

export default Header;
