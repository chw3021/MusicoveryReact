import React from "react";
import Header from "../components/common/Header";
import SocialHeader from "../components/common/SocialHeader";
import PostBody from "../components/post/PostBody";
import SidebarLayout from "../components/common/SidebarLayout";
import "../styles/PostPage.css";

const PostPage = () => {
    return (
        <div>
            <div className="post-page">
                <Header />
                <SidebarLayout>
                    <SocialHeader />
                    <div className="post-list-container">
                        <PostBody />
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
};

export default PostPage;