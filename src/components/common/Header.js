import React from "react";
import Button from "./Button";
import styles from "../../styles/Header.module.css";
import useUserInfo from "../../hooks/useUserInfo";
import { getImageUrl } from "../../utils/imageUtils";

const Header = () => {
    const userInfo = useUserInfo();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                Musicovery
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
