import React, { useEffect } from "react";

function VerifyPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close(); // 현재 창 닫기
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 해제
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>인증에 성공했습니다!</h1>
      <p>5초 후에 창이 자동으로 닫힙니다.</p>
    </div>
  );
}

export default VerifyPage;
