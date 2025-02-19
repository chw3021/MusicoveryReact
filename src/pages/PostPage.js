import React from "react";
import Header from "../components/common/Header";
import SocialHeader from "../components/common/SocialHeader";
import PostBody from "../components/post/PostBody";
import Layout from "../components/common/SidebarLayout";
import "../styles/PostPage.css";

const PostPage = () => {
    return (
        <div>
            <div className="post-page">
                <Header />
                <Layout>
                    <SocialHeader />
                    <div className="post-list-container">
                        <PostBody />
                    </div>
                </Layout>
            </div>
        </div>
    );
};

export default PostPage;