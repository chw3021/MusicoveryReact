import React, { useEffect, useState } from "react";
import Button from "./Button";
import styles from "../../styles/Header.module.css";
import logo from "../../assets/logo.png"; // 로고 이미지 경로
import useUserInfo from "../../hooks/useUserInfo";


const Header = () => {
    const userInfo = useUserInfo();
    return (
        <div className={styles.headerMain}>
            <div className={styles.header}>
                <img src={logo} alt="Musicovery Logo" className={styles.logo} />
                
                <div className={styles.userInfo}>
                    {userInfo ? (
                        <div className={styles.userDetails}>
                            {userInfo.profileImageUrl && (
                                <img src={userInfo.profileImageUrl} alt="Profile" className={styles.profileImage} />
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
                <div className={styles.nav}>
                    <Button text={"홈"} link={"/"} />
                    <Button text={"소셜"} link={"/social"} />
                    <Button text={"게시판"} link={"/post"} />
                </div>
            </div>
            <div className={styles.blueLine}>
                <section className={styles.section_midnight}></section>
            </div>
        </div>
    );
}

export default Header;