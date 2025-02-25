import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const fetchSpotifyUser = async () => {
        try {
          const response = await axiosInstance.post("/auth/spotify-login", {
            code,
          });

          const data = response.data;
          localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", data.token);
          navigate("/main");
        } catch (error) {
          console.error("스포티파이 로그인 실패:", error);
          alert("로그인 실패. 다시 시도해주세요.");
          navigate("/login");
        }
      };

      fetchSpotifyUser();
    }
  }, [navigate]);

  return <div>스포티파이 로그인 중...</div>;
};

export default SpotifyCallback;
