import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/CustomerSupport.css";

const CustomerSupport = () => {
    const [question, setQuestion] = useState("");
    const [inquiries, setInquiries] = useState([]);
    const userInfo = useUserInfo();

    useEffect(() => {
        if (userInfo) {
            fetchInquiries();
        }
    }, [userInfo]);

    const fetchInquiries = async () => {
        try {
            const response = await axiosInstance.get(`/customersupport/inquiries?userId=${userInfo.id}`);
            setInquiries(response.data);
        } catch (error) {
            console.error("문의사항 목록을 가져오는 데 실패했습니다.", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!userInfo) {
                alert("로그인이 필요합니다.");
                return;
            }

            const data = {
                userId: userInfo.id,
                question: question,
            };

            const response = await axiosInstance.post("/customersupport/inquiry", data);
            console.log("문의사항 제출 성공:", response.data);
            alert("문의사항이 정상적으로 제출되었습니다.");
            setQuestion("");
            fetchInquiries(); // 문의사항 제출 후 목록 갱신
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

            <div className="inquiry-list-container">
                <h2>내 문의사항 목록</h2>
                <div className="inquiry-list">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="inquiry-item">
                            <p>
                                <strong>문의 내용:</strong> {inquiry.question}
                            </p>
                            <p>
                                <strong>작성일:</strong> {new Date(inquiry.createdAt).toLocaleString()}
                            </p>
                            {inquiry.response && (
                                <p>
                                    <strong>답변:</strong> {inquiry.response}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerSupport;