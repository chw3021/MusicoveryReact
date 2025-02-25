// // src/pages/SpotifyCallbackPage.js
// import React, { useEffect } from "react";

// const SpotifyCallbackPage = () => {
//   useEffect(() => {
//     // 페이지가 로드될 때 실행되는 로직
//     if (window.postMessage) {
//       console.log("postMessage available");

//       // URL에서 code 파라미터 가져오기
//       const urlParams = new URLSearchParams(window.location.search);
//       const authCode = urlParams.get("code");

//       if (authCode) {
//         console.log("Received auth code:", authCode);
//         // 이곳에서 받은 authCode로 서버에 요청을 보내거나 필요한 작업을 할 수 있습니다.
//         // 예: 서버로 액세스 토큰 요청
//       } else {
//         console.error("Spotify authentication failed. No code found.");
//       }
//     } else {
//       console.error("postMessage is not available");
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Spotify 로그인 처리 중...</h1>
//     </div>
//   );
// };

// export default SpotifyCallbackPage;
