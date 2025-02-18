import React, { useState } from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";

const PostBody = ({ posts, onCreate }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSelectPost = (post) => {
        setSelectedPost(post);
    };

    const handleBack = () => {
        setSelectedPost(null);
        setIsCreating(false);
    };

    const handleCreate = (post) => {
        onCreate(post);
        setIsCreating(false);
    };

    if (isCreating) {
        return <PostForm onSubmit={handleCreate} onCancel={handleBack} />;
    }

    if (selectedPost) {
        return <PostDetail post={selectedPost} onBack={handleBack} />;
    }

    return <PostList posts={posts} onSelectPost={handleSelectPost} />;
};

export default PostBody;