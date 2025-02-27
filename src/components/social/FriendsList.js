import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import useUserInfo from "../../hooks/useUserInfo";
import "../../styles/FriendsList.css";
import { useNavigate } from "react-router-dom";

const FriendsList = () => {
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState("search"); // 'search', 'pending', 'requests'
    const userInfo = useUserInfo();

    useEffect(() => {
        if (userInfo) {
            fetchFriends();
            fetchFriendRequests();
            fetchPendingRequests();
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
            const response = await axiosInstance.get(`/friends/friendRequests?friendId=${userInfo.id}`);
            setFriendRequests(response.data);
        } catch (error) {
            console.error("친구 요청 목록을 가져오는 데 실패했습니다.", error);
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const response = await axiosInstance.get(`/friends/pendingRequests?userId=${userInfo.id}`);
            setPendingRequests(response.data);
        } catch (error) {
            console.error("내가 요청한 친구 목록을 가져오는 데 실패했습니다.", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/friends/search?keyword=${searchKeyword}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("사용자 검색에 실패했습니다.", error);
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            await axiosInstance.post("/friends/add", { userId: userInfo.id, friendId });
            fetchFriends();
            fetchPendingRequests();
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

    const handleDeleteFriend = async (friendId) => {
        try {
            await axiosInstance.delete("/friends/delete", { params: { userId: userInfo.id, friendId } });
            fetchFriends();
        } catch (error) {
            console.error("친구 삭제에 실패했습니다.", error);
        }
    };

    const isFriendOrRequested = (userId) => {
        return friends.some(friend => friend.friend.id === userId) || 
               friendRequests.some(request => request.user.id === userId) ||
               pendingRequests.some(request => request.friend.id === userId);
    };

    const handleFriendClick = (friend) => {
        navigate("/playlistPage", { state: { friendInfo: friend } });
    };


    return (
        <div>
            <div className="friends-list-container">
                <h2>친구 목록</h2>
                <button onClick={() => setShowModal(true)} className="add-friend-button">친구 추가</button>
                <div className="friends-list">
                    {friends.map((friend) => (
                        <div key={friend.id} className="friend-item" onClick={() => handleFriendClick(friend.friend.id === userInfo.id ? friend.user : friend.friend)}>
                            <p>
                                <strong>친구 별명 :</strong> {friend.friend.id === userInfo.id ? friend.user.nickname : friend.friend.nickname}
                                <button className="delete-button" onClick={() => handleDeleteFriend(friend.friend.id)}>❌</button>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <div className="modal-tabs">
                            <button 
                                className={`modal-tab-button ${activeTab === "search" ? "active" : ""}`}
                                onClick={() => setActiveTab("search")}
                            >
                                친구 검색
                            </button>
                            <button 
                                className={`modal-tab-button ${activeTab === "pending" ? "active" : ""}`}
                                onClick={() => setActiveTab("pending")}
                            >
                                요청한 목록
                            </button>
                            <button 
                                className={`modal-tab-button ${activeTab === "requests" ? "active" : ""}`}
                                onClick={() => setActiveTab("requests")}
                            >
                                받은 친구 요청
                            </button>
                        </div>

                        {activeTab === "search" && (
                            <div className="friendlist-search-tab">
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
                        )}

                        {activeTab === "pending" && (
                            <div className="friendlist-pending-tab">
                                <h2>요청한 목록</h2>
                                <div className="pending-requests-list">
                                    {pendingRequests.length === 0 ? (
                                        <p>요청한 목록이 없습니다.</p>
                                    ) : (
                                        pendingRequests.map((request) => (
                                            console.log(request),
                                            <div key={request.id} className="pending-request-item">
                                                <p>
                                                    <strong>요청한 사용자 ID:</strong> {request.friend.nickname}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "requests" && (
                            <div className="friendlist-requests-tab">
                                <h2>받은 친구 요청</h2>
                                <div className="friend-requests-list">
                                    {friendRequests.length === 0 ? (
                                        <p>받은 요청이 없습니다.</p>
                                    ) : (
                                        
                                        friendRequests.map((request) => (
                                            console.log(request),
                                            <div key={request.id} className="friend-request-item">
                                                
                                                <p>
                                                    <strong>요청한 사용자:</strong> {request.friend.nickname}
                                                    <button className="accept-button" onClick={() => handleAcceptFriendRequest(request.id)}>✅</button>
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsList;