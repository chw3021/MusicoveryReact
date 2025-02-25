import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/CustomerSupport.css"; // CSS 파일 임포트

const CustomerSupport = () => {
    const [question, setQuestion] = useState("");
    const userInfo = useUserInfo(); // useUserInfo 훅 사용

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!userInfo) {
                alert("로그인이 필요합니다.");
                return;
            }

            const data = {
                user: { 
                    ...userInfo
                    ,email: userInfo.email
                }, // User 객체 전체를 전달
                question: question,
            };

            const response = await axiosInstance.post("/customersupport/inquiry", data);
            console.log("문의사항 제출 성공:", response.data);
            alert("문의사항이 정상적으로 제출되었습니다.");
            setQuestion(""); // 제출 후 입력 필드 초기화
        } catch (error) {
            console.error("문의사항 제출 실패:", error);
            alert("문의사항 제출에 실패했습니다.");
        }
    };

    return (
        <div className="customer-support-container">
            <h1>문의사항</h1>
            <form onSubmit={handleSubmit} className="customer-support-form">
                <div className="form-group">
                    <label htmlFor="question">문의 내용:</label>
                    <textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows="5"
                        cols="50"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">문의사항 제출</button>
            </form>
        </div>
    );
};

export default CustomerSupport;