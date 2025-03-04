import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 403) {
    const url = args[0];
    const options = args[1];

    if (url.includes('https://api.spotify.com/v1/me/player/play') && options && options.body) {
      try {
        const body = JSON.parse(options.body);
        const trackUri = body.uris && body.uris[0];
        if (trackUri) {
          const trackId = trackUri.split(':').pop();
          const trackUrl = `https://open.spotify.com/track/${trackId}`;
          const userConfirmed = window.confirm("해당 트랙은 현재 재생할 수 없습니다. Spotify에서 확인하시겠습니까?");
          if (userConfirmed) {
            window.open(trackUrl, '_blank');
          }
        }
      } catch (e) {
        console.error("Failed to parse request body:", e);
      }
    }
  }

  return response;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();