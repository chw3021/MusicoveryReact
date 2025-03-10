import React, { useState, useEffect } from "react";
import "../../styles/UserManagement.css";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("regdate");
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // 한 페이지당 최대 10명

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, sortBy]);

    // 유저 목록 불러오기
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("http://localhost:8080/admin/users", {
                params: { search: searchTerm, sort: sortBy }
            });
            setUsers(data || []);
            setCurrentPage(1);
        } catch (error) {
            console.error("유저 목록 가져오기 실패:", error);
        }
        setLoading(false);
    };

    // 유저 상태 변경 (정지 <-> 활성화)
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

    // 현재 페이지의 유저 목록
    const indexOfLastUser = currentPage * usersPerPage;
    const currentUsers = users.slice(indexOfLastUser - usersPerPage, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="user-management">
            <h2>👤 사용자 관리</h2>

            {/* 검색 & 정렬 */}
            <div className="user-controls">
                <input 
                    type="text" 
                    placeholder="유저 검색 (닉네임)" 
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
                        <th>이메일</th>
                        <th>닉네임</th>
                        <th>가입일</th>
                        <th>상태</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="5" className="loading-text">유저를 불러오는 중입니다...</td></tr>
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map((user) => {
                            const isActive = user.active === true; // true면 활성화, false면 정지됨
                            return (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.nickname}</td>
                                    <td>{new Date(user.regdate).toISOString().split("T")[0]}</td>
                                    <td className={isActive ? "status-active" : "status-inactive"}>
                                        {isActive ? "정상" : "정지됨"}
                                    </td>
                                    <td>
                                        <button className="action-button view-button" onClick={() => setSelectedUser(user)}>
                                            보기
                                        </button>
                                        <button
                                            className={`action-button ${isActive ? "deactivate-button" : "activate-button"}`}
                                            onClick={() => handleToggleUserStatus(user.id)}
                                        >
                                            {isActive ? "정지" : "활성화"}
                                        </button>
                                        <button className="action-button important delete-button" onClick={() => handleDeleteUser(user.id)}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr><td colSpan="5">유저 정보가 없습니다.</td></tr>
                    )}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>◀</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentPage(i + 1)} 
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>▶</button>
            </div>

            {/* 유저 상세 모달 */}
            {selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>유저 상세 정보</h3>
                        <p><b>아이디:</b> {selectedUser.id}</p>
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
