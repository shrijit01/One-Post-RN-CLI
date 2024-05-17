/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    //get all posts
    const getAllPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/post/get-all-post');
            setLoading(false);
            setPosts(data?.posts);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // initial post
    useEffect(() => {
        getAllPosts();
    }, []);


    return (
        <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };