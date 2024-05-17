/* eslint-disable prettier/prettier */

import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Myposts = () => {
    // sgtate
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState();

    const getUserPost = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/post/get-user-post');
            setLoading(false);
            setPosts(data?.userPosts);
        } catch (error) {
            setLoading(false);
            console.log(error);
            Alert.alert(error || error?.message);
        }
    };

    //initial posts
    useEffect(() => {
        getUserPost()
    }, []);



    return (
        <View style={styles.container}>
            <ScrollView>
                <PostCard posts={posts} myPostScreen={true} />
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <View style={{ backgroundColor: '#fff' }}>
                <FooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default Myposts;