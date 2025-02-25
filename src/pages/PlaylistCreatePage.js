import React, { useState } from "react";
import Create from "../components/playlist/Create";
import KeywordRecommendation from "../components/recommendations/KeywordRecommendation";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import "../styles/playlistCreatePage.css";
import AIRecommendations from "../components/recommendations/AIRecommendations";
import SurpriseRecommendation from "../components/recommendations/SurpriseRecommendation";

const PlaylistCreatePage = () => {
    const [activeComponent, setActiveComponent] = useState("create");

    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="select_section2">
            <Header />
            <div className="select_section">
                <div className="component_switcher">
                    <Button text="직접 만들기" onClick={() => handleComponentChange("create")} />
                    <Button text="자동 생성" onClick={() => handleComponentChange("keywordRecommendation")} />
                    <Button text="AI 생성" onClick={() => handleComponentChange("aiRecommendation")} />
                    <Button text="깜짝 추천" onClick={() => handleComponentChange("surpriseRecommendation")} />
                </div>
                <div className="component_container">
                    {activeComponent === "keywordRecommendation" && <KeywordRecommendation />}
                    {activeComponent === "aiRecommendation" && <AIRecommendations />}
                    {activeComponent === "surpriseRecommendation" && <SurpriseRecommendation />}
                   <div className="component_style">
                    {activeComponent === "create" && <Create />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCreatePage;