import React from "react";
import MusicSearch from "../music/MusicSearch";
import "../../styles/Layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <MusicSearch />
            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;