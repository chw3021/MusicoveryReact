// React에서 Spotify 사용자 정보 요청
const getUserInfo = async () => {
    const accessToken = localStorage.getItem('access_token');  // 또는 쿠키에서 가져올 수도 있음
    const response = await fetch('http://localhost:8080/spotify/userInfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      console.error('Failed to fetch user information');
      return;
    }
  
    const userInfo = await response.json();
    console.log(userInfo);  // 사용자 정보 출력
    // 그 외 로직 처리...
  };
  