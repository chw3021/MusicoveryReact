import React from "react";
import MusicSearch from "../music/MusicSearch";
import "../../styles/SidebarLayout.css";
import FriendsList from "../social/FriendsList";

const SidebarLayout = ({ children }) => {
    return (
        <div className="sidebar-layout-layout">
            <div className="sidebar-layout-sidebar">
                <MusicSearch onSelectTrack={()=>{}}/>
                <FriendsList />
            </div>
            <div className="sidebar-layout-main-content">
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;