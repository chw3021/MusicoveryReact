import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Header from "../common/Header";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/FriendsList.css";

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const userInfo = useUserInfo();

    useEffect(() => {
        if (userInfo) {
            fetchFriends();
        }
    }, [userInfo]);

    const fetchFriends = async () => {
        try {
            const response = await axiosInstance.get(`/friends/list?userId=${userInfo.id}`);
            setFriends(response.data);
        } catch (error) {
            console.error("친구 목록을 가져오는 데 실패했습니다.", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="friends-list-container">
                <h2>친구 목록</h2>
                <div className="friends-list">
                    {friends.map((friend) => (
                        <div key={friend.id} className="friend-item">
                            <p>
                                <strong>친구 ID:</strong> {friend.friend.id}
                            </p>
                            <p>
                                <strong>친구 상태:</strong> {friend.isAccepted ? "수락됨" : "대기 중"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendsList;