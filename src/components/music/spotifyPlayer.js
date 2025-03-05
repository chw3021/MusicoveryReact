import axios from 'axios';

export const transferPlayback = async (deviceId) => {
    try {
        const url = 'https://api.spotify.com/v1/me/player';
        await axios.put(
            url,
            {
                device_ids: [deviceId],
                play: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('MUSICOVERY_ACCESS_TOKEN')}`
                }
            }
        );
    } catch (error) {
        console.error('Failed to transfer playback:', error);
        throw error;
    }
};

export const play = async ({ spotify_uri, deviceId, position = 0 }) => {
    try {
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
        
        await axios.put(
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
        await axios.put('https://api.spotify.com/v1/me/player/pause', null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('MUSICOVERY_ACCESS_TOKEN')}`
            }
        });
    } catch (error) {
        console.error('Failed to pause track:', error);
        throw error;
    }
};