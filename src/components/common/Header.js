import React from "react";
import Button from "./Button";
import styles from "../../styles/Header.module.css";
import logo from "../../assets/logo.png"; // 로고 이미지 경로


const Header = () => {
    return (
        <div className={styles.headerMain}>
            <div className={styles.header}>
                <img src={logo} alt="Musicovery Logo" className={styles.logo} />
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