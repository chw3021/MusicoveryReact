/**
 * tracks 데이터를 파싱하고 변환하는 함수
 * @param {string|object} tracks - tracks 데이터 (문자열 또는 객체)
 * @returns {Array} - 변환된 track 리스트
 */
export const parseTracks = (tracks) => {
    // tracks가 문자열이면 JSON으로 파싱
    let parsedTracks = typeof tracks === "string" ? JSON.parse(tracks) : tracks;

    // tracks.items에서 track 정보만 추출
    const trackList = parsedTracks.items.map(item => ({
        id: item.track.id, // track.id 추가
        ...item.track, // track 객체 전체 추가
    }));

    return trackList;
};