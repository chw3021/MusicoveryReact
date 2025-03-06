export const logout = () => {
    localStorage.removeItem('MUSICOVERY_ACCESS_TOKEN');
    localStorage.removeItem('MUSICOVERY_REFRESH_TOKEN');
    localStorage.removeItem('MUSICOVERY_USER');
    localStorage.removeItem('LOCAL_ACCESS_TOKEN');
    window.location.href = '/';
};