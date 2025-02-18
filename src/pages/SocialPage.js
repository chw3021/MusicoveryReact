import React from "react";
import Header from "../components/common/Header"; // Header import
import Button from "../components/common/Button";
import "../styles/SocialPage.css";

const SocialPage = () => {
    return (
        <div>
            {/* 기존의 header 클래스는 Header 컴포넌트로 대체 */}
            <Header />
            <div className="social-content">
                <h1>소셜 페이지</h1>
                <p>친구들과 소통하고 다양한 소셜 기능을 이용해 보세요.</p>
                <div className="social-buttons">
                    <Button text="친구 목록" link="/fiendslist" />
                    <Button text="퀴즈" link="/quiz" />
                    <Button text="스트리밍" link="/streaming" />
                    <Button text="첼린지" link="/challenge" />
                    <Button text="문의사항" link="/customersupport" />
                    <Button text="신고" link="/userreport" />
                </div>
            </div>
        </div>
    );
};

export default SocialPage;
