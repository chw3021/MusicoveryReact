const defaultImage = `${process.env.REACT_APP_API_URL}/images/default.png`;

export const getImageUrl = (playlistPhoto) => {
    if (!playlistPhoto) {
        return defaultImage;
    }
    return playlistPhoto.startsWith("/images/") 
        ? `${process.env.REACT_APP_API_URL}${playlistPhoto}` 
        : playlistPhoto;
};

export const getDefaultImage = () => {
    return defaultImage;
};