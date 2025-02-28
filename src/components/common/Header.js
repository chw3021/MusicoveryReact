import React, { useEffect } from "react";
import Button from "./Button";
import styles from "../../styles/Header.module.css";
import useUserInfo from "../../hooks/useUserInfo";
import { getImageUrl } from "../../utils/imageUtils";

import logoImage from '../../assets/logo.png';  // 이미지 import
import 'animate.css';

const Header = () => {
    const userInfo = useUserInfo();

    useEffect(() => {
        const logoElement = document.querySelector(`.${styles.logo}`);
        
        // 첫 번째 애니메이션: animate__backInRight
        logoElement.classList.add('animate__animated', 'animate__backInRight'); 
    
        // 첫 번째 애니메이션이 끝난 후, 두 번째 애니메이션 시작
        logoElement.addEventListener("animationend", function handleAnimationEnd(event) {
            if (event.animationName === 'backInRight') {
                logoElement.classList.remove('animate__backInRight');  // 첫 번째 애니메이션 클래스 제거
                logoElement.classList.add('animate__jello');  // 두 번째 애니메이션 추가
            }
            
            // 애니메이션이 끝난 후 이벤트 리스너 제거
            logoElement.removeEventListener('animationend', handleAnimationEnd);
        });
    }, []);  // 컴포넌트가 처음 렌더링될 때만 실행
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            <img src={logoImage} alt="Musicovery Logo" className={styles.logoImage} />
            {/* Musicovery */}
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
                    <li className={styles.navItem}><Button text={"홈"} link={"/"} /></li>
                    <li className={styles.navItem}><Button text={"소셜"} link={"/social"} /></li>
                    <li className={styles.navItem}><Button text={"게시판"} link={"/post"} /></li>
                </ul>
            </div>
            <div className={styles.userInfo}>
                {userInfo ? (
                    <div className={styles.userDetails}>
                        {userInfo.profileImageUrl && (
                            <img src={getImageUrl(userInfo.profileImageUrl)} alt="Profile" className={styles.profileImage} />
                        )}
                        <div className={styles.userText}>
                            <div>스포티파이 닉네임: {userInfo.nickname}</div>
                            <div>이메일: {userInfo.email}</div>
                            <div>아이디: {userInfo.userId}</div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.userText}>로그인되지 않음</div>
                )}
            </div>
        </header>
    );
}

export default Header;
