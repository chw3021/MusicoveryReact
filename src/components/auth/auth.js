export const logout = () => {
    localStorage.removeItem('MUSICOVERY_ACCESS_TOKEN');
    localStorage.removeItem('MUSICOVERY_REFRESH_TOKEN');
    window.location.href = '/';
};