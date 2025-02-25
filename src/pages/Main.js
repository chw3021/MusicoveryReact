import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <main>
        {/* 여기에 홈페이지 내용 */}
        <Outlet />
      </main>
    </div>
  );
};

export default Main;