import React, { useEffect, useState } from 'react';
import axiosInstance,{ baseAxiosInstance }  from '../../api/axiosInstance';

const OAuth = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                console.log('getAccessToken 시작');
                const response = await baseAxiosInstance.get('/api/spotify/getUserAccessToken');
                console.log('인증 URL 받음:', response.data);
                
                const authWindow = window.open(response.data, 'SpotifyAuth', 'width=600,height=600');

                const handleMessage = async (event) => {
                    console.log('메시지 수신:', event.data, '출처:', event.origin);
                    if (event.origin === 'http://localhost:8080' && event.data.type === 'auth_complete') {
                        console.log('인증 완료 메시지 받음');
                        
                        // 토큰 저장
                        localStorage.setItem('MUSICOVERY_ACCESS_TOKEN', event.data.accessToken);
                        localStorage.setItem('MUSICOVERY_REFRESH_TOKEN', event.data.refreshToken);
                        
                        console.log('저장된 토큰:', localStorage.getItem('MUSICOVERY_ACCESS_TOKEN'));
                        authWindow.close();
                        await fetchUserInfo();
                        
                        window.removeEventListener('message', handleMessage);
                    }
                };

                window.addEventListener('message', handleMessage);
            } catch (error) {
                console.error('인증 과정 에러:', error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
                console.log('fetchUserInfo 호출됨, 토큰:', token);
                
                if (!token) {
                    console.log('토큰 없음');
                    return;
                }

                const response = await axiosInstance.get('/api/spotify/userInfo');
                console.log('사용자 정보 받음:', response.data);
                setUserInfo(response.data);
            } catch (error) {
                console.error('사용자 정보 조회 에러:', error);
            }
        };

        // 초기 실행 시 토큰 확인
        const token = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
        console.log('초기 토큰 확인:', token);

        if (token) {
            fetchUserInfo();
        } else {
            console.log('토큰 없음, 인증 시작');
            getAccessToken();
        }

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('message', () => {});
        };
    }, []);

    return (
        <div>
            <h1>Spotify User Info</h1>
            {userInfo ? (
                <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            ) : (
                <p>Loading... {console.log('렌더링 중')}</p>
            )}
        </div>
    );
};
export default OAuth;