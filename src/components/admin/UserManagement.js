import React, { useState, useEffect } from "react";
import "../../styles/UserManagement.css";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("regdate");
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, sortBy]);

    // 유저 목록 가져오기
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/admin/users`, {
                params: { search: searchTerm, sort: sortBy }
            });
            setUsers(response.data || []);
        } catch (error) {
            console.error("유저 목록 가져오기 실패:", error);
        }
        setLoading(false);
    };

    // 유저 정지/해제
    const handleToggleUserStatus = async (userId) => {
        if (!window.confirm("해당 유저의 상태를 변경하시겠습니까?")) return;
        try {
            await axios.put(`http://localhost:8080/admin/users/${userId}/status`);
            alert("유저 상태가 변경되었습니다.");
            fetchUsers();
        } catch (error) {
            console.error("유저 상태 변경 실패:", error);
            alert("유저 상태 변경에 실패했습니다.");
        }
    };

    // 유저 삭제
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("해당 유저를 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/admin/users/${userId}`);
            alert("유저가 삭제되었습니다.");
            fetchUsers();
        } catch (error) {
            console.error("유저 삭제 실패:", error);
            alert("유저 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="user-management">
            <h2>👤 사용자 관리</h2>

            {/* 검색 & 정렬 */}
            <div className="user-controls">
                <input 
                    type="text" 
                    placeholder="유저 검색 (아이디, 닉네임)" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="regdate">가입일순</option>
                    <option value="nickname">이름순</option>
                </select>
            </div>

            {/* 유저 테이블 */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>닉네임</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>상태</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="loading-text">유저를 불러오는 중입니다...</td>
                        </tr>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.nickname}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.regdate).toISOString().split("T")[0]}</td>
                                <td>{user.isBanned ? "정지됨" : "정상"}</td>
                                <td>
                                    <button onClick={() => setSelectedUser(user)}>보기</button>
                                    <button onClick={() => handleToggleUserStatus(user.userId)}>
                                        {user.isBanned ? "해제" : "정지"}
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.userId)}>삭제</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">유저 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 유저 상세 모달 */}
            {selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>유저 상세 정보</h3>
                        <p><b>아이디:</b> {selectedUser.userId}</p>
                        <p><b>닉네임:</b> {selectedUser.nickname}</p>
                        <p><b>이메일:</b> {selectedUser.email}</p>
                        <p><b>가입일:</b> {new Date(selectedUser.regdate).toISOString().split("T")[0]}</p>
                        <button onClick={() => setSelectedUser(null)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
