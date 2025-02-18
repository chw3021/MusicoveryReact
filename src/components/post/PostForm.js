import React, { useState } from "react";
import "../../styles/PostForm.css";

const PostForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
    };

    return (
        <div className="post-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">작성</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;