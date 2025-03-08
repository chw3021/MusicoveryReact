import React from 'react';
import '../../styles/Loading.css';
import loadingIcon from '../../assets/loading.svg'; // 로딩 아이콘 경로

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-icon">
                <img src={loadingIcon} alt="Loading..." />
            </div>
        </div>
    );
};

export default Loading;