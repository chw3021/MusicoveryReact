import axios from 'axios';

// 기본 axios 인스턴스 (인증이 필요없는 요청용)
export const baseAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // headers가 아닌 옵션으로 이동
});

// 인증이 필요한 요청을 위한 axios 인스턴스
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // headers가 아닌 옵션으로 이동
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('MUSICOVERY_ACCESS_TOKEN');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('MUSICOVERY_REFRESH_TOKEN');
            if (refreshToken) {
                try {
                    const response = await baseAxiosInstance.post('/api/spotify/refresh-token', {
                        refreshToken: refreshToken
                    });
                    const newToken = response.data.accessToken;
                    localStorage.setItem('MUSICOVERY_ACCESS_TOKEN', newToken);
                    
                    // 실패했던 요청 재시도
                    const originalRequest = error.config;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('MUSICOVERY_ACCESS_TOKEN');
                    localStorage.removeItem('MUSICOVERY_REFRESH_TOKEN');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;