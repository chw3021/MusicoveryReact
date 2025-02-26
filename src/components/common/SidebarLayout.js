import React from "react";
import MusicSearch from "../music/MusicSearch";
import "../../styles/SidebarLayout.css";
import FriendsList from "../social/FriendsList";

const SidebarLayout = ({ children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <MusicSearch onSelectTrack={()=>{}}/>
                <FriendsList />
            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;