/* eslint-disable prettier/prettier */
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';


const Home = () => {
    // global state
    // const [state] = useContext(AuthContext);
    const [posts, getAllPosts] = useContext(PostContext);
    // const [refreshing, setRefreshing] = useState(false);


    //refresh controll
    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     getAllPosts();
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 100);
    // }, []);

    return (
        <View style={styles.container}>
            <ScrollView
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />
            // }
            >
                {posts ? (
                    <PostCard posts={posts} />
                ) :
                    (
                        <Text>Loading</Text>
                    )
                }
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

export default Home;