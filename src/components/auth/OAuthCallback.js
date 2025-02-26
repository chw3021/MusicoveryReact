import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("MUSICOVERY_ACCESS_TOKEN", token);
      // 홈으로 리다이렉션
      navigate("/");
    }
  }, [navigate, location]);

  return <div>인증 처리 중...</div>;
};

export default OAuthCallback;
