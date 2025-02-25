import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Header from "../common/Header";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/FriendsList.css";

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const userInfo = useUserInfo();

    useEffect(() => {
        if (userInfo) {
            fetchFriends();
            fetchFriendRequests();
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

    const fetchFriendRequests = async () => {
        try {
            const response = await axiosInstance.get(`/friends/friendOf?friendId=${userInfo.id}`);
            setFriendRequests(response.data);
        } catch (error) {
            console.error("친구 요청 목록을 가져오는 데 실패했습니다.", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/users/search?keyword=${searchKeyword}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("사용자 검색에 실패했습니다.", error);
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            await axiosInstance.post("/friends/add", { userId: userInfo.id, friendId });
            fetchFriends();
            setShowModal(false);
        } catch (error) {
            console.error("친구 추가에 실패했습니다.", error);
        }
    };

    const handleAcceptFriendRequest = async (friendRequestId) => {
        try {
            await axiosInstance.post("/friends/accept", null, { params: { friendRequestId } });
            fetchFriends();
            fetchFriendRequests();
        } catch (error) {
            console.error("친구 요청 수락에 실패했습니다.", error);
        }
    };

    const isFriendOrRequested = (userId) => {
        return friends.some(friend => friend.friend.id === userId) || 
               friendRequests.some(request => request.user.id === userId);
    };

    return (
        <div>
            <Header />
            <div className="friends-list-container">
                <h2>친구 목록</h2>
                <button onClick={() => setShowModal(true)} className="add-friend-button">친구 추가</button>
                <div className="friends-list">
                    {friends.map((friend) => (
                        <div key={friend.id} className="friend-item">
                            <p>
                                <strong>친구 ID:</strong> {friend.friend.id}
                            </p>
                            <p>
                                <strong>친구 별명:</strong> {friend.friend.nickname}
                            </p>
                            <p>
                                <strong>친구 상태:</strong> {friend.isAccepted ? "수락됨" : "대기 중"}
                            </p>
                        </div>
                    ))}
                </div>
                <h2>받은 친구 요청</h2>
                <div className="friend-requests-list">
                    {friendRequests.map((request) => (
                        <div key={request.id} className="friend-request-item">
                            <p>
                                <strong>요청한 사용자 ID:</strong> {request.user.id}
                            </p>
                            <button onClick={() => handleAcceptFriendRequest(request.id)}>수락</button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>친구 추가</h2>
                        <input
                            type="text"
                            placeholder="검색 (ID, 이메일, 닉네임)"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                        <div className="search-results">
                            {searchResults.map((user) => (
                                <div key={user.id} className="search-result-item">
                                    <p>
                                        <strong>ID:</strong> {user.id}
                                    </p>
                                    <p>
                                        <strong>이메일:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>닉네임:</strong> {user.nickname}
                                    </p>
                                    <button 
                                        onClick={() => handleAddFriend(user.id)} 
                                        disabled={isFriendOrRequested(user.id)}
                                    >
                                        {isFriendOrRequested(user.id) ? "요청됨" : "친구 추가"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsList;