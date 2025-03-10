import React, { useState } from "react";
import Header from "../components/common/Header";
import SocialHeader from "../components/common/SocialHeader";
import PostBody from "../components/post/PostBody";
import NoticeBody from "../components/post/NoticeBody";
import CustomerSupport from "../components/social/CustomerSupport";
import SidebarLayout from "../components/common/SidebarLayout";
import "../styles/PostPage.css";

const PostPage = () => {
    const [content, setContent] = useState('post');

    const handleContentChange = (contentType) => {
        setContent(contentType);
    };

    return (
        <div>
            <div className="post-page">
                <Header />
                <SidebarLayout>
                    <SocialHeader onContentChange={handleContentChange} />
                    <div className="post-list-container">
                        {content === 'post' && <PostBody />}
                        {content === 'notice' && <NoticeBody />}
                        {content === 'customerSupport' && <CustomerSupport />}
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
};

export default PostPage;