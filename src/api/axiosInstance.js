import axios from 'axios';

// 기본 axios 인스턴스 (인증이 필요없는 요청용)
export const baseAxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// 인증이 필요한 요청을 위한 axios 인스턴스
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
    
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들
let refreshSubscribers = [];

// 토큰 갱신 후 대기 중인 요청들 실행
const onRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
};

// 토큰 갱신 대기열에 추가
const addSubscriber = (cb) => {
    refreshSubscribers.push(cb);
};

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
        const originalRequest = error.config;
        console.log('에러 발생:', error.response?.status, error.response?.data);

        // 토큰 만료 에러 (직접 401 또는 서버에서 전달된 500) && 아직 재시도하지 않은 요청
        if ((error.response?.status === 401 || 
            (error.response?.status === 500 && error.response?.data?.message?.includes('401 Unauthorized'))) && 
            !originalRequest._retry) {
            console.log('토큰 만료 감지, 갱신 시도');
            
            if (isRefreshing) {
                console.log('이미 토큰 갱신 진행 중, 대기열에 추가');
                return new Promise(resolve => {
                    addSubscriber(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;
            
            try {
                const refreshToken = localStorage.getItem('MUSICOVERY_REFRESH_TOKEN');
                if (!refreshToken) {
                    throw new Error('리프레시 토큰이 없습니다');
                }
            
                console.log('토큰 갱신 요청 시작');
                const response = await baseAxiosInstance.post('/api/spotify/refresh-token', {
                    refreshToken: refreshToken
                });
            
                if (!response.data || !response.data.accessToken) {
                    throw new Error('새로운 액세스 토큰을 받지 못했습니다');
                }
            
                const newToken = response.data.accessToken;
                console.log('새로운 토큰 발급됨:', newToken.substring(0, 10) + '...');
                localStorage.setItem('MUSICOVERY_ACCESS_TOKEN', newToken);
                
                // 대기 중인 요청들 실행
                onRefreshed(newToken);
                
                // 원래 요청 재시도
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);

            } catch (refreshError) {
                console.error('토큰 갱신 실패:', refreshError);
                // 토큰 관련 데이터 전부 삭제
                localStorage.removeItem('MUSICOVERY_ACCESS_TOKEN');
                localStorage.removeItem('MUSICOVERY_REFRESH_TOKEN');
                
                // 사용자에게 알림 후 로그인 페이지로 이동
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                window.location.href = '/';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // 401 이외의 에러는 그대로 반환
        return Promise.reject(error);
    }
);

export default axiosInstance;