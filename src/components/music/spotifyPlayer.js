import axiosInstance from '../../api/axiosInstance';

export const play = async ({ spotify_uri, deviceId, position = 0 }) => {
    try {
        await axiosInstance.put(
            `/api/spotify/play?device_id=${deviceId}`,
            {
                uris: [spotify_uri],
                position_ms: position
            }
        );
    } catch (error) {
        console.error('Failed to play track:', error);
        throw error;
    }
};

export const pause = async () => {
    try {
        await axiosInstance.put('/api/spotify/pause');
    } catch (error) {
        console.error('Failed to pause track:', error);
        throw error;
    }
};