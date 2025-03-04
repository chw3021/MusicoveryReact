import axiosInstance from '../../api/axiosInstance';

export const play = async ({ spotify_uri, deviceId, position = 0 }) => {
    try {
        const url = deviceId 
            ? `/music/play?deviceId=${deviceId}&musicId=${spotify_uri.split(':')[2]}`
            : `/music/play?musicId=${spotify_uri.split(':')[2]}`;
        
        await axiosInstance.put(
            url,
            {
                uris: [spotify_uri],
                position_ms: position
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('MUSICOVERY_ACCESS_TOKEN')}`
                }
            }
        );
    } catch (error) {
        console.error('Failed to play track:', error);
        throw error;
    }
};

export const pause = async () => {
    try {
        await axiosInstance.put('/api/spotify/pause', null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('MUSICOVERY_ACCESS_TOKEN')}`
            }
        });
    } catch (error) {
        console.error('Failed to pause track:', error);
        throw error;
    }
};