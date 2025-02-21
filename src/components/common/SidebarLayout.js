import React from "react";
import MusicSearch from "../music/MusicSearch";
import "../../styles/SidebarLayout.css";

const SidebarLayout = ({ children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <MusicSearch onSelectTrack={()=>{}}/>
            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;